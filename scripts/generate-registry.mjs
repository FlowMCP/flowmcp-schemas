import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'


const REPO_ROOT = new URL( '..', import.meta.url ).pathname
const SCHEMA_DIR = join( REPO_ROOT, 'schemas', 'v1.2.0' )
const BASE_DIR = 'schemas/v1.2.0'
const OUTPUT_FILE = join( SCHEMA_DIR, 'flowmcp-registry-all.json' )


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
    const sharedFiles = files
        .filter( ( f ) => {
            const isShared = relative( SCHEMA_DIR, f ).startsWith( '_shared/' )

            return isShared
        } )
    const schemaFiles = files
        .filter( ( f ) => {
            const isShared = relative( SCHEMA_DIR, f ).startsWith( '_shared/' )

            return !isShared
        } )

    return { sharedFiles, schemaFiles }
}


function buildSharedEntries( { sharedFiles } ) {
    const entries = sharedFiles
        .map( ( filePath ) => {
            const relativePath = relative( SCHEMA_DIR, filePath ).split( sep ).join( '/' )
            const entry = { file: relativePath }

            return entry
        } )

    return { entries }
}


async function detectSharedImports( { filePath } ) {
    const content = await readFile( filePath, 'utf-8' )
    const sharedImports = content
        .split( '\n' )
        .filter( ( line ) => {
            const trimmed = line.trim()
            const isSharedImport = trimmed.startsWith( 'import ' ) && trimmed.includes( '_shared/' )

            return isSharedImport
        } )
        .map( ( line ) => {
            const match = line.match( /_shared\/([^'"`]+)/ )
            const file = match ? `_shared/${match[ 1 ]}` : null

            return file
        } )
        .filter( ( file ) => file !== null )

    return { sharedImports }
}


async function importSchema( { filePath } ) {
    try {
        const fileUrl = pathToFileURL( filePath ).href
        const mod = await import( fileUrl )
        const schema = mod.schema

        if( !schema ) {
            console.warn( `  ⚠ No schema export: ${filePath}` )

            return { schema: null, error: null }
        }

        return { schema, error: null }
    } catch( err ) {
        return { schema: null, error: err.message }
    }
}


function buildEntry( { schema, filePath, sharedImports } ) {
    const relativePath = relative( SCHEMA_DIR, filePath ).split( sep ).join( '/' )
    const namespace = schema.namespace || relativePath.split( '/' )[ 0 ] || 'unknown'
    const name = schema.name || namespace
    const requiredServerParams = schema.requiredServerParams || []

    const entry = {
        namespace,
        file: relativePath,
        name,
        requiredServerParams
    }

    if( sharedImports.length > 0 ) {
        entry[ 'shared' ] = sharedImports
    }

    return { entry }
}


async function main() {
    console.log( `\nScanning ${BASE_DIR}...\n` )

    const { files } = await collectMjsFiles( { dir: SCHEMA_DIR } )
    const { sharedFiles, schemaFiles } = separateFiles( { files } )
    console.log( `Found ${schemaFiles.length} schema files, ${sharedFiles.length} shared files\n` )

    const { entries: sharedEntries } = buildSharedEntries( { sharedFiles } )

    const entries = []
    const warnings = []
    const errors = []

    const importResults = await Promise.all(
        schemaFiles.map( async ( filePath ) => {
            const result = await importSchema( { filePath } )
            const { sharedImports } = await detectSharedImports( { filePath } )

            return { filePath, sharedImports, ...result }
        } )
    )

    importResults
        .forEach( ( { filePath, sharedImports, schema, error } ) => {
            const rel = relative( SCHEMA_DIR, filePath )

            if( error ) {
                errors.push( `${rel}: ${error}` )

                return
            }

            if( !schema ) {
                warnings.push( `${rel}: No schema export found` )

                return
            }

            if( !schema.namespace ) {
                warnings.push( `${rel}: Missing namespace, using folder name` )
            }

            if( !schema.name ) {
                warnings.push( `${rel}: Missing name, using namespace` )
            }

            const { entry } = buildEntry( { schema, filePath, sharedImports } )
            entries.push( entry )
        } )

    entries.sort( ( a, b ) => {
        const comparison = a.file.localeCompare( b.file )

        return comparison
    } )

    const namespaces = [ ...new Set( entries.map( ( entry ) => entry.namespace ) ) ]
    const schemasWithShared = entries
        .filter( ( entry ) => entry[ 'shared' ] )

    const registry = {
        name: 'flowmcp-schemas',
        version: '1.0.0',
        description: 'Official FlowMCP community schemas - Complete Collection',
        schemaSpec: '1.2.0',
        baseDir: BASE_DIR,
        registryType: 'all',
        shared: sharedEntries,
        schemas: entries
    }

    const json = JSON.stringify( registry, null, 4 )
    await writeFile( OUTPUT_FILE, json + '\n', 'utf-8' )

    console.log( `Registry written to ${BASE_DIR}/flowmcp-registry-all.json` )
    console.log( `  Schemas:    ${entries.length}` )
    console.log( `  Namespaces: ${namespaces.length}` )
    console.log( `  Shared:     ${sharedEntries.length} files, ${schemasWithShared.length} schemas reference them` )

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
