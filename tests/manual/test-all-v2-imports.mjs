/**
 * Test all v2 schemas: import + handler factory invocation
 * Usage: node tests/manual/test-all-v2-imports.mjs [--group=1] [--groups=4]
 */
import { readdir } from 'fs/promises'
import { join, basename } from 'path'
import { pathToFileURL } from 'url'

const SCHEMA_DIR = new URL( '../../schemas/v2.0.0/', import.meta.url ).pathname
const LISTS_DIR = join( SCHEMA_DIR, '_lists' )

const args = process.argv.slice( 2 )
const groupArg = args.find( ( a ) => a.startsWith( '--group=' ) )
const groupsArg = args.find( ( a ) => a.startsWith( '--groups=' ) )
const currentGroup = groupArg ? parseInt( groupArg.split( '=' )[1] ) : 1
const totalGroups = groupsArg ? parseInt( groupsArg.split( '=' )[1] ) : 1

const loadSharedLists = async () => {
    const sharedLists = {}
    const files = await readdir( LISTS_DIR )
    const mjsFiles = files.filter( ( f ) => f.endsWith( '.mjs' ) )

    const loadPromises = mjsFiles
        .map( async ( file ) => {
            const mod = await import( pathToFileURL( join( LISTS_DIR, file ) ).href )
            const listData = mod.list || mod.default || mod
            const metaName = listData?.meta?.name || null
            const entries = listData?.entries || listData

            if( metaName ) {
                sharedLists[metaName] = entries
            }

            const fileKey = basename( file, '.mjs' )
            sharedLists[fileKey] = entries
        } )

    await Promise.all( loadPromises )

    return sharedLists
}

const loadLibraries = async () => {
    const libraries = {}
    const libNames = ['ethers', 'indicatorts', 'ccxt', '@erc725/erc725.js', '@thanpolas/univ3prices', 'pinata', 'zlib']

    const loadPromises = libNames
        .map( async ( name ) => {
            try {
                const mod = await import( name )
                libraries[name] = mod.default || mod
            } catch( _err ) {
                // Library not available — skip
            }
        } )

    await Promise.all( loadPromises )

    return libraries
}

const getProviderDirs = async () => {
    const entries = await readdir( SCHEMA_DIR, { withFileTypes: true } )
    const dirs = entries
        .filter( ( e ) => e.isDirectory() && !e.name.startsWith( '_' ) )
        .map( ( e ) => e.name )
        .sort()

    return dirs
}

const testProvider = async ( { provider, sharedLists, libraries } ) => {
    const providerDir = join( SCHEMA_DIR, provider )
    const files = await readdir( providerDir )
    const schemaFiles = files.filter( ( f ) => f.endsWith( '.mjs' ) && !f.startsWith( '--' ) )
    const results = []

    const testPromises = schemaFiles
        .map( async ( file ) => {
            const filePath = join( providerDir, file )
            const result = { provider, file, importOk: false, mainOk: false, handlersOk: false, handlerCallOk: false, noHandlers: false, error: null }

            try {
                const mod = await import( pathToFileURL( filePath ).href )
                result.importOk = true

                const { main, handlers } = mod
                if( !main || !main.routes ) {
                    result.error = 'Missing main or main.routes'
                    results.push( result )

                    return
                }
                result.mainOk = true
                result.namespace = main.namespace
                result.routeCount = Object.keys( main.routes ).length

                if( typeof handlers !== 'function' ) {
                    result.noHandlers = true
                    result.handlersOk = true
                    result.handlerCallOk = true
                    results.push( result )

                    return
                }
                result.handlersOk = true

                const schemaLibraries = {}
                const requiredLibs = main.requiredLibraries || []
                requiredLibs
                    .forEach( ( libName ) => {
                        if( libraries[libName] ) {
                            schemaLibraries[libName] = libraries[libName]
                        }
                    } )

                const handlerMap = handlers( { sharedLists, libraries: schemaLibraries } )
                result.handlerCallOk = true
                result.handlerRoutes = Object.keys( handlerMap )
            } catch( err ) {
                result.error = err.message
            }

            results.push( result )
        } )

    await Promise.all( testPromises )

    return results
}

const run = async () => {
    const sharedLists = await loadSharedLists()
    const libraries = await loadLibraries()
    const allProviders = await getProviderDirs()

    const libCount = Object.keys( libraries ).length
    const listCount = Object.keys( sharedLists ).length
    console.log( `Loaded: ${listCount} sharedList keys, ${libCount} libraries (${Object.keys( libraries ).join( ', ' )})` )

    const chunkSize = Math.ceil( allProviders.length / totalGroups )
    const startIdx = ( currentGroup - 1 ) * chunkSize
    const endIdx = Math.min( startIdx + chunkSize, allProviders.length )
    const myProviders = allProviders.slice( startIdx, endIdx )

    console.log( `Group ${currentGroup}/${totalGroups}: Testing ${myProviders.length} providers (${myProviders[0]} ... ${myProviders[myProviders.length - 1]})` )

    const allResults = []
    const testPromises = myProviders
        .map( async ( provider ) => {
            const results = await testProvider( { provider, sharedLists, libraries } )
            allResults.push( ...results )
        } )

    await Promise.all( testPromises )

    const passed = allResults.filter( ( r ) => r.handlerCallOk )
    const failed = allResults.filter( ( r ) => !r.handlerCallOk )
    const noHandlers = allResults.filter( ( r ) => r.noHandlers )

    console.log( `\n=== GROUP ${currentGroup} RESULTS ===` )
    console.log( `Total: ${allResults.length} | Pass: ${passed.length} (${noHandlers.length} without handlers) | Fail: ${failed.length}` )

    if( failed.length > 0 ) {
        console.log( '\nFAILED:' )
        failed
            .forEach( ( r ) => {
                console.log( `  ${r.provider}/${r.file}: ${r.error}` )
            } )
    }

    console.log( '\nPASSED:' )
    passed
        .forEach( ( r ) => {
            const tag = r.noHandlers ? ' [no handlers]' : ''
            console.log( `  ${r.provider}/${r.file} (${r.namespace}, ${r.routeCount} routes)${tag}` )
        } )

    console.log( `\n=== SUMMARY: ${passed.length}/${allResults.length} passed ===` )
}

run()
