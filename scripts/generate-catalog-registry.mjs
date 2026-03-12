import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, relative, sep, dirname, basename } from 'node:path'
import { pathToFileURL } from 'node:url'


const REPO_ROOT = new URL( '..', import.meta.url ).pathname
const CATALOG_DIR = join( REPO_ROOT, 'schemas', 'v3.0.0', 'flowmcp-community' )
const PROVIDERS_DIR = join( CATALOG_DIR, 'providers' )
const LISTS_DIR = join( CATALOG_DIR, '_lists' )
const AGENTS_DIR = join( CATALOG_DIR, 'agents' )
const OUTPUT_FILE = join( CATALOG_DIR, 'registry.json' )


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


async function collectAgents( { agentsDir } ) {
    let dirs = []

    try {
        const entries = await readdir( agentsDir, { withFileTypes: true } )
        dirs = entries
            .filter( ( entry ) => {
                const isDir = entry.isDirectory()

                return isDir
            } )
            .map( ( entry ) => {
                const name = entry.name

                return name
            } )
    } catch( err ) {
        return { agents: [] }
    }

    const agents = []

    await Promise.allSettled(
        dirs
            .map( async ( dirName ) => {
                const manifestPath = join( agentsDir, dirName, 'manifest.json' )

                try {
                    const content = await readFile( manifestPath, 'utf-8' )
                    const manifest = JSON.parse( content )
                    const agent = {
                        name: manifest[ 'name' ] || dirName,
                        description: manifest[ 'description' ] || '',
                        manifest: `agents/${dirName}/manifest.json`
                    }
                    agents.push( agent )
                } catch( err ) {
                    console.warn( `  Warning: Cannot read ${manifestPath}: ${err.message}` )
                }
            } )
    )

    agents.sort( ( a, b ) => {
        const comparison = a[ 'name' ].localeCompare( b[ 'name' ] )

        return comparison
    } )

    return { agents }
}


function buildSharedEntries( { files } ) {
    const entries = files
        .map( ( filePath ) => {
            const fileName = basename( filePath, '.mjs' )
            const camelName = fileName
                .split( '-' )
                .map( ( part, index ) => {
                    if( index === 0 ) {
                        return part
                    }

                    const capitalized = part.charAt( 0 ).toUpperCase() + part.slice( 1 )

                    return capitalized
                } )
                .join( '' )

            const relativePath = `_lists/${basename( filePath )}`
            const entry = { file: relativePath, name: camelName }

            return entry
        } )

    entries.sort( ( a, b ) => {
        const comparison = a[ 'name' ].localeCompare( b[ 'name' ] )

        return comparison
    } )

    return { entries }
}


async function buildSchemaEntries( { files } ) {
    const entries = []
    const warnings = []
    const errors = []

    await Promise.allSettled(
        files
            .map( async ( filePath ) => {
                const relativePath = relative( CATALOG_DIR, filePath ).split( sep ).join( '/' )

                try {
                    const fileUrl = pathToFileURL( filePath ).href
                    const mod = await import( fileUrl )
                    const main = mod[ 'main' ] || null

                    if( !main ) {
                        warnings.push( `${relativePath}: No main export` )

                        return
                    }

                    const namespace = main[ 'namespace' ] || basename( dirname( filePath ) )
                    const name = main[ 'name' ] || namespace
                    const requiredServerParams = main[ 'requiredServerParams' ] || []
                    const requiredLibraries = main[ 'requiredLibraries' ] || []
                    const hasHandlers = mod[ 'handlers' ] !== undefined
                    const sharedLists = ( main[ 'sharedLists' ] || [] )
                        .map( ( ref ) => {
                            const listName = ref[ 'ref' ] || ref

                            return listName
                        } )

                    const entry = {
                        namespace,
                        file: relativePath,
                        name,
                        requiredServerParams,
                        hasHandlers,
                        sharedLists
                    }

                    if( requiredLibraries.length > 0 ) {
                        entry[ 'requiredLibraries' ] = requiredLibraries
                    }

                    entries.push( entry )
                } catch( err ) {
                    errors.push( `${relativePath}: ${err.message}` )
                }
            } )
    )

    entries.sort( ( a, b ) => {
        const comparison = a[ 'file' ].localeCompare( b[ 'file' ] )

        return comparison
    } )

    return { entries, warnings, errors }
}


async function main() {
    console.log( '\nGenerating v3 catalog registry...\n' )

    const { files: listFiles } = await collectMjsFiles( { dir: LISTS_DIR } )
    const { entries: sharedEntries } = buildSharedEntries( { files: listFiles } )
    console.log( `  Shared lists: ${sharedEntries.length}` )

    const { files: schemaFiles } = await collectMjsFiles( { dir: PROVIDERS_DIR } )
    const { entries: schemaEntries, warnings, errors } = await buildSchemaEntries( { files: schemaFiles } )
    console.log( `  Provider schemas: ${schemaEntries.length}` )

    const namespaces = [ ...new Set( schemaEntries.map( ( entry ) => entry[ 'namespace' ] ) ) ]
    console.log( `  Namespaces: ${namespaces.length}` )

    const { agents } = await collectAgents( { agentsDir: AGENTS_DIR } )
    console.log( `  Agents: ${agents.length}` )

    const registry = {
        name: 'flowmcp-community',
        version: '3.0.0',
        description: 'Official FlowMCP community catalog',
        schemaSpec: '3.0.0',
        shared: sharedEntries,
        schemas: schemaEntries,
        agents
    }

    const json = JSON.stringify( registry, null, 4 )
    await writeFile( OUTPUT_FILE, json + '\n', 'utf-8' )

    console.log( `\n  Registry written to: registry.json` )

    if( warnings.length > 0 ) {
        console.log( `\n  Warnings (${warnings.length}):` )
        warnings
            .forEach( ( w ) => {
                console.log( `    ${w}` )
            } )
    }

    if( errors.length > 0 ) {
        console.log( `\n  Errors (${errors.length}):` )
        errors
            .forEach( ( e ) => {
                console.log( `    ${e}` )
            } )
    }

    console.log( '' )
}


main()
