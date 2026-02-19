import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'


const REPO_ROOT = new URL( '..', import.meta.url ).pathname
const SCHEMA_DIR = join( REPO_ROOT, 'schemas', 'v2.0.0' )
const BASE_DIR = 'schemas/v2.0.0'
const OUTPUT_ALL = join( SCHEMA_DIR, 'flowmcp-registry.json' )
const OUTPUT_STARTER = join( SCHEMA_DIR, 'flowmcp-registry-starter.json' )
const LISTS_DIR_NAME = '_lists'


async function collectMjsFiles( { dir } ) {
    const entries = await readdir( dir, { withFileTypes: true, recursive: true } )
    const files = entries
        .filter( ( entry ) => {
            const isMjs = entry.isFile() && entry.name.endsWith( '.mjs' )

            return isMjs
        } )
        .map( ( entry ) => {
            const fullPath = join( entry.parentPath || entry.path, entry.name )

            return fullPath
        } )

    return { files }
}


function separateFiles( { files } ) {
    const listFiles = files
        .filter( ( f ) => {
            const rel = relative( SCHEMA_DIR, f )
            const isList = rel.startsWith( `${LISTS_DIR_NAME}/` )

            return isList
        } )
    const sharedFiles = files
        .filter( ( f ) => {
            const rel = relative( SCHEMA_DIR, f )
            const isShared = rel.startsWith( '_shared/' )

            return isShared
        } )
    const schemaFiles = files
        .filter( ( f ) => {
            const rel = relative( SCHEMA_DIR, f )
            const isSpecial = rel.startsWith( `${LISTS_DIR_NAME}/` ) || rel.startsWith( '_shared/' )

            return !isSpecial
        } )

    return { listFiles, sharedFiles, schemaFiles }
}


function buildListEntries( { listFiles } ) {
    const entries = listFiles
        .map( ( filePath ) => {
            const relativePath = relative( SCHEMA_DIR, filePath ).split( sep ).join( '/' )
            const entry = { 'file': relativePath }

            return entry
        } )

    return { entries }
}


async function importSchema( { filePath } ) {
    try {
        const fileUrl = pathToFileURL( filePath ).href
        const mod = await import( fileUrl )
        const main = mod[ 'main' ] || null

        if( !main ) {
            console.warn( `  ⚠ No main export: ${filePath}` )

            return { 'main': null, 'handlersFn': null, 'error': null }
        }

        const handlersFn = mod[ 'handlers' ] || null

        return { main, handlersFn, 'error': null }
    } catch( err ) {
        return { 'main': null, 'handlersFn': null, 'error': err.message }
    }
}


function extractSharedListRefs( { main } ) {
    const sharedLists = main[ 'sharedLists' ] || []
    const refs = sharedLists
        .map( ( entry ) => {
            const ref = entry[ 'ref' ] || null

            return ref
        } )
        .filter( ( ref ) => ref !== null )

    return { refs }
}


function buildEntry( { main, handlersFn, filePath, listRefs } ) {
    const relativePath = relative( SCHEMA_DIR, filePath ).split( sep ).join( '/' )
    const namespace = main[ 'namespace' ] || relativePath.split( '/' )[ 0 ] || 'unknown'
    const name = main[ 'name' ] || namespace
    const requiredServerParams = main[ 'requiredServerParams' ] || []
    const requiredLibraries = main[ 'requiredLibraries' ] || []
    const hasHandlers = handlersFn !== null

    const entry = {
        namespace,
        'file': relativePath,
        name,
        requiredServerParams
    }

    if( requiredLibraries.length > 0 ) {
        entry[ 'requiredLibraries' ] = requiredLibraries
    }

    if( hasHandlers ) {
        entry[ 'hasHandlers' ] = true
    }

    if( listRefs.length > 0 ) {
        entry[ 'sharedLists' ] = listRefs
    }

    return { entry }
}


async function main() {
    console.log( `\nScanning ${BASE_DIR}...\n` )

    const { files } = await collectMjsFiles( { dir: SCHEMA_DIR } )
    const { listFiles, sharedFiles, schemaFiles } = separateFiles( { files } )
    console.log( `Found ${schemaFiles.length} schema files, ${listFiles.length} list files, ${sharedFiles.length} shared files\n` )

    const { entries: listEntries } = buildListEntries( { listFiles } )

    const entries = []
    const warnings = []
    const errors = []

    const importResults = await Promise.all(
        schemaFiles.map( async ( filePath ) => {
            const result = await importSchema( { filePath } )
            const { refs } = result[ 'main' ]
                ? extractSharedListRefs( { 'main': result[ 'main' ] } )
                : { 'refs': [] }

            return { filePath, 'listRefs': refs, ...result }
        } )
    )

    importResults
        .forEach( ( { filePath, listRefs, main: schemaMain, handlersFn, error } ) => {
            const rel = relative( SCHEMA_DIR, filePath )

            if( error ) {
                errors.push( `${rel}: ${error}` )

                return
            }

            if( !schemaMain ) {
                warnings.push( `${rel}: No main export found` )

                return
            }

            if( !schemaMain[ 'namespace' ] ) {
                warnings.push( `${rel}: Missing namespace, using folder name` )
            }

            if( !schemaMain[ 'name' ] ) {
                warnings.push( `${rel}: Missing name, using namespace` )
            }

            const { entry } = buildEntry( { 'main': schemaMain, handlersFn, filePath, listRefs } )
            entries.push( entry )
        } )

    entries.sort( ( a, b ) => {
        const comparison = a[ 'file' ].localeCompare( b[ 'file' ] )

        return comparison
    } )

    const namespaces = [ ...new Set( entries.map( ( entry ) => entry[ 'namespace' ] ) ) ]
    const schemasWithLists = entries
        .filter( ( entry ) => entry[ 'sharedLists' ] )
    const schemasWithHandlers = entries
        .filter( ( entry ) => entry[ 'hasHandlers' ] )

    const registryAll = {
        'name': 'flowmcp-schemas',
        'version': '2.0.0',
        'description': 'Official FlowMCP community schemas - Complete Collection (v2)',
        'schemaSpec': '2.0.0',
        'baseDir': BASE_DIR,
        'registryType': 'all',
        'shared': listEntries,
        'schemas': entries
    }

    const starterEntries = entries
        .filter( ( entry ) => {
            const noKeys = entry[ 'requiredServerParams' ].length === 0
            const noLibs = !entry[ 'requiredLibraries' ] || entry[ 'requiredLibraries' ].length === 0

            return noKeys && noLibs
        } )

    const registryStarter = {
        'name': 'flowmcp-schemas',
        'version': '2.0.0',
        'description': 'Official FlowMCP community schemas - Starter Collection (no API keys required, v2)',
        'schemaSpec': '2.0.0',
        'baseDir': BASE_DIR,
        'registryType': 'starter',
        'shared': listEntries,
        'schemas': starterEntries
    }

    const jsonAll = JSON.stringify( registryAll, null, 4 )
    await writeFile( OUTPUT_ALL, jsonAll + '\n', 'utf-8' )

    const jsonStarter = JSON.stringify( registryStarter, null, 4 )
    await writeFile( OUTPUT_STARTER, jsonStarter + '\n', 'utf-8' )

    console.log( `Registry written to ${BASE_DIR}/flowmcp-registry.json` )
    console.log( `  Schemas:      ${entries.length}` )
    console.log( `  Namespaces:   ${namespaces.length}` )
    console.log( `  Lists:        ${listEntries.length} files, ${schemasWithLists.length} schemas reference them` )
    console.log( `  Handlers:     ${schemasWithHandlers.length} schemas have handlers` )
    console.log( '' )
    console.log( `Starter written to ${BASE_DIR}/flowmcp-registry-starter.json` )
    console.log( `  Schemas:      ${starterEntries.length} (no API keys, no libraries)` )

    if( warnings.length > 0 ) {
        console.log( `\nWarnings (${warnings.length}):` )
        warnings
            .forEach( ( w ) => {
                console.log( `  ⚠ ${w}` )
            } )
    }

    if( errors.length > 0 ) {
        console.log( `\nErrors (${errors.length}):` )
        errors
            .forEach( ( e ) => {
                console.log( `  ✗ ${e}` )
            } )
    }

    console.log( '' )
}


main()
