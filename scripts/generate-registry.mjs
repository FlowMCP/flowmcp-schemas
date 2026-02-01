import { readdir, writeFile } from 'node:fs/promises'
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


function buildEntry( { schema, filePath } ) {
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

    return { entry }
}


async function main() {
    console.log( `\nScanning ${BASE_DIR}...\n` )

    const { files } = await collectMjsFiles( { dir: SCHEMA_DIR } )
    console.log( `Found ${files.length} .mjs files\n` )

    const entries = []
    const warnings = []
    const errors = []

    const importResults = await Promise.all(
        files.map( async ( filePath ) => {
            const result = await importSchema( { filePath } )

            return { filePath, ...result }
        } )
    )

    importResults
        .forEach( ( { filePath, schema, error } ) => {
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

            const { entry } = buildEntry( { schema, filePath } )
            entries.push( entry )
        } )

    entries.sort( ( a, b ) => {
        const comparison = a.file.localeCompare( b.file )

        return comparison
    } )

    const namespaces = [ ...new Set( entries.map( ( entry ) => entry.namespace ) ) ]

    const registry = {
        name: 'flowmcp-schemas',
        version: '1.0.0',
        description: 'Official FlowMCP community schemas - Complete Collection',
        schemaSpec: '1.2.0',
        baseDir: BASE_DIR,
        registryType: 'all',
        schemas: entries
    }

    const json = JSON.stringify( registry, null, 4 )
    await writeFile( OUTPUT_FILE, json + '\n', 'utf-8' )

    console.log( `Registry written to ${BASE_DIR}/flowmcp-registry-all.json` )
    console.log( `  Schemas:    ${entries.length}` )
    console.log( `  Namespaces: ${namespaces.length}` )

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
