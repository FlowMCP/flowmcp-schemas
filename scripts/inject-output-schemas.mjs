/**
 * Read successful captures, generate output schemas via OutputSchemaGenerator,
 * and inject them into v2.0.0 schema files.
 *
 * By default only processes routes WITHOUT postRequest handlers (raw response = final response).
 * Use --include-handlers to also inject output schemas for routes with postRequest handlers.
 *
 * Usage:
 *   node scripts/inject-output-schemas.mjs --dry-run
 *   node scripts/inject-output-schemas.mjs --apply
 *   node scripts/inject-output-schemas.mjs --namespace=coingecko-com --apply
 *   node scripts/inject-output-schemas.mjs --include-handlers --dry-run
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const args = process.argv.slice( 2 )
const dryRun = args.includes( '--dry-run' ) || !args.includes( '--apply' )
const verbose = args.includes( '--verbose' )
const includeHandlers = args.includes( '--include-handlers' )
const nsFilter = args.find( ( a ) => a.startsWith( '--namespace=' ) )?.split( '=' )[1] || null

const V2_DIR = path.resolve( 'schemas/v2.0.0' )
const CAPTURE_DIR = path.resolve( '.captures/v2.0.0' )


// ──────────────────────────────────────────────
// OutputSchemaGenerator (inline copy from core)
// ──────────────────────────────────────────────

class OutputSchemaGenerator {
    static generate( { response, mimeType = 'application/json' } ) {
        const schema = OutputSchemaGenerator
            .#analyzeValue( { value: response, depth: 1 } )

        const output = { mimeType, schema }

        return { output }
    }


    static #analyzeValue( { value, depth } ) {
        if( value === null || value === undefined ) {
            const schema = { type: 'string', description: '', nullable: true }

            return schema
        }

        if( Array.isArray( value ) ) {
            const schema = OutputSchemaGenerator
                .#analyzeArray( { value, depth } )

            return schema
        }

        if( typeof value === 'object' ) {
            const schema = OutputSchemaGenerator
                .#analyzeObject( { value, depth } )

            return schema
        }

        const schema = { type: typeof value, description: '' }

        return schema
    }


    static #analyzeObject( { value, depth } ) {
        const keys = Object.keys( value )

        if( keys.length === 0 ) {
            const schema = { type: 'object', description: '' }

            return schema
        }

        if( depth >= 4 ) {
            const schema = { type: 'object', description: '' }

            return schema
        }

        const properties = {}

        keys
            .forEach( ( key ) => {
                const fieldValue = value[ key ]

                if( fieldValue === null ) {
                    const detectedType = OutputSchemaGenerator
                        .#guessTypeFromKey( { key } )
                    properties[ key ] = { type: detectedType, description: '', nullable: true }
                } else {
                    properties[ key ] = OutputSchemaGenerator
                        .#analyzeValue( { value: fieldValue, depth: depth + 1 } )
                }
            } )

        const schema = { type: 'object', properties }

        return schema
    }


    static #analyzeArray( { value, depth } ) {
        if( value.length === 0 ) {
            const schema = { type: 'array', description: '', items: { type: 'string', description: '' } }

            return schema
        }

        const firstItem = value[ 0 ]
        const items = OutputSchemaGenerator
            .#analyzeValue( { value: firstItem, depth: depth + 1 } )

        const schema = { type: 'array', items, description: '' }

        return schema
    }


    static #guessTypeFromKey( { key } ) {
        const numberHints = [
            'price', 'amount', 'balance', 'cap', 'volume', 'count',
            'total', 'fee', 'rate', 'supply', 'value', 'size',
            'height', 'width', 'index', 'number', 'timestamp',
            'decimals', 'market_cap', 'marketCap'
        ]

        const lowerKey = key.toLowerCase()

        const isNumber = numberHints
            .some( ( hint ) => {
                const match = lowerKey.includes( hint )

                return match
            } )

        if( isNumber ) {
            const type = 'number'

            return type
        }

        const booleanHints = [
            'is', 'has', 'can', 'should', 'enabled', 'active',
            'verified', 'valid', 'visible', 'hidden', 'frozen'
        ]

        const isBoolean = booleanHints
            .some( ( hint ) => {
                const match = lowerKey.startsWith( hint ) || lowerKey === hint

                return match
            } )

        if( isBoolean ) {
            const type = 'boolean'

            return type
        }

        const type = 'string'

        return type
    }
}


// ──────────────────────────────────────────────
// Build handler map per schema
// ──────────────────────────────────────────────

async function getHandlerRoutes( { filePath } ) {
    try {
        const mod = await import( pathToFileURL( filePath ).href )
        if( !mod.handlers || typeof mod.handlers !== 'function' ) {
            return new Set()
        }

        const handlerMap = mod.handlers( { sharedLists: {}, libraries: {} } )
        const routes = new Set()

        Object.entries( handlerMap )
            .forEach( ( [ routeName, handler ] ) => {
                if( handler && typeof handler === 'object' && handler.postRequest ) {
                    routes.add( routeName )
                }
            } )

        return routes
    } catch {
        return new Set()
    }
}


// ──────────────────────────────────────────────
// Serialize output schema as JS code
// ──────────────────────────────────────────────

function serializeOutput( { output, indent = '            ' } ) {
    const lines = []
    lines.push( `${indent}output: {` )
    lines.push( `${indent}    mimeType: '${output.mimeType}',` )
    lines.push( `${indent}    schema: ${serializeSchemaValue( { value: output.schema, baseIndent: indent + '    ' } )}` )
    lines.push( `${indent}}` )

    const result = lines.join( '\n' )

    return result
}


function serializeSchemaValue( { value, baseIndent } ) {
    if( typeof value !== 'object' || value === null ) {
        if( typeof value === 'string' ) {
            return `'${value}'`
        }

        return String( value )
    }

    if( value.type === 'object' && value.properties ) {
        const propLines = []
        propLines.push( '{' )
        propLines.push( `${baseIndent}    type: 'object',` )

        if( value.description ) {
            propLines.push( `${baseIndent}    description: '${escapeStr( value.description )}',` )
        }

        propLines.push( `${baseIndent}    properties: {` )

        const propEntries = Object.entries( value.properties )
        propEntries
            .forEach( ( [ key, propSchema ], idx ) => {
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( key ) ? key : `'${key}'`
                const propStr = serializePropertyInline( { schema: propSchema } )
                const comma = idx < propEntries.length - 1 ? ',' : ''
                propLines.push( `${baseIndent}        ${safeKey}: ${propStr}${comma}` )
            } )

        propLines.push( `${baseIndent}    }` )
        propLines.push( `${baseIndent}}` )

        const result = propLines.join( '\n' )

        return result
    }

    if( value.type === 'array' && value.items ) {
        const itemsStr = serializeSchemaValue( { value: value.items, baseIndent: baseIndent + '    ' } )
        const lines = []
        lines.push( '{' )
        lines.push( `${baseIndent}    type: 'array',` )

        if( value.description ) {
            lines.push( `${baseIndent}    description: '${escapeStr( value.description )}',` )
        }

        lines.push( `${baseIndent}    items: ${itemsStr}` )
        lines.push( `${baseIndent}}` )

        const result = lines.join( '\n' )

        return result
    }

    // Simple type
    const parts = [`type: '${value.type}'`]

    if( value.description ) {
        parts.push( `description: '${escapeStr( value.description )}'` )
    }

    if( value.nullable ) {
        parts.push( 'nullable: true' )
    }

    const result = `{ ${parts.join( ', ' )} }`

    return result
}


function serializePropertyInline( { schema } ) {
    if( schema.type === 'object' && schema.properties ) {
        // Nested object — inline properties
        const propEntries = Object.entries( schema.properties )
        const propStrs = propEntries
            .map( ( [ key, propSchema ] ) => {
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( key ) ? key : `'${key}'`
                const inner = serializePropertyInline( { schema: propSchema } )

                return `${safeKey}: ${inner}`
            } )

        const result = `{ type: 'object', properties: { ${propStrs.join( ', ' )} } }`

        return result
    }

    if( schema.type === 'array' && schema.items ) {
        const itemsStr = serializePropertyInline( { schema: schema.items } )
        const result = `{ type: 'array', items: ${itemsStr} }`

        return result
    }

    const parts = [`type: '${schema.type}'`]

    if( schema.description ) {
        parts.push( `description: '${escapeStr( schema.description )}'` )
    }

    if( schema.nullable ) {
        parts.push( 'nullable: true' )
    }

    const result = `{ ${parts.join( ', ' )} }`

    return result
}


function escapeStr( s ) {
    return s.replace( /'/g, "\\'" ).replace( /\n/g, '\\n' )
}


// ──────────────────────────────────────────────
// Find injection point in route block
// ──────────────────────────────────────────────

function findRouteTestsEnd( { content, routeName } ) {
    // Find routeName: { or 'routeName': {
    const patterns = [
        new RegExp( `\\b${escapeRegex( routeName )}\\s*:\\s*\\{` ),
        new RegExp( `'${escapeRegex( routeName )}'\\s*:\\s*\\{` )
    ]

    let routeStart = -1
    let matchLen = 0

    patterns
        .some( ( pat ) => {
            const m = content.match( pat )
            if( m ) {
                routeStart = m.index
                matchLen = m[0].length
            }

            return m
        } )

    if( routeStart === -1 ) {
        return { index: -1, reason: 'route not found' }
    }

    // Find the opening brace of the route
    const braceStart = routeStart + matchLen - 1

    // Find the tests: block within this route
    const routeContent = content.slice( braceStart )
    const testsMatch = routeContent.match( /\btests\s*:\s*\[/ )

    if( !testsMatch ) {
        return { index: -1, reason: 'tests block not found' }
    }

    const testsStart = braceStart + testsMatch.index + testsMatch[0].length - 1
    const bracketEnd = findMatchingBracket( { content, start: testsStart } )

    if( bracketEnd === -1 ) {
        return { index: -1, reason: 'tests bracket not matched' }
    }

    // Check for trailing comma after ]
    let insertAfter = bracketEnd + 1
    if( content[insertAfter] === ',' ) {
        insertAfter++
    }

    return { index: insertAfter, reason: null }
}


function findMatchingBracket( { content, start } ) {
    let depth = 0
    let inString = false
    let stringChar = ''

    let i = start
    while( i < content.length ) {
        const ch = content[i]

        if( inString ) {
            if( ch === '\\' ) {
                i += 2
                continue
            }
            if( ch === stringChar ) {
                inString = false
            }
            i++
            continue
        }

        if( ch === "'" || ch === '"' || ch === '`' ) {
            inString = true
            stringChar = ch
            i++
            continue
        }

        if( ch === '[' ) { depth++ }
        if( ch === ']' ) {
            depth--
            if( depth === 0 ) {
                return i
            }
        }

        i++
    }

    return -1
}


function escapeRegex( str ) {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' )
}


// ──────────────────────────────────────────────
// Check if route already has output
// ──────────────────────────────────────────────

function routeHasOutput( { content, routeName } ) {
    // Use the precise injection point logic to check
    const { index, reason } = findRouteTestsEnd( { content, routeName } )

    if( index === -1 ) { return false }

    // Check if there's already an output: block right after the tests end
    // Look at the next ~200 chars after the tests block (whitespace + output: {)
    const afterTests = content.slice( index, index + 200 )
    const outputMatch = afterTests.match( /^\s*\n\s*output\s*:\s*\{/ )

    return !!outputMatch
}


// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

console.log( '\nFlowMCP Output Schema Injector' )
console.log( `Mode: ${dryRun ? 'DRY-RUN' : 'APPLY'}` )
if( includeHandlers ) { console.log( 'Include handlers: YES' ) }
if( nsFilter ) { console.log( `Filter: ${nsFilter}` ) }
console.log( '' )

const stats = {
    capturesRead: 0,
    capturesSuccessful: 0,
    capturesSkippedFailed: 0,
    capturesSkippedHandler: 0,
    capturesSkippedExisting: 0,
    schemasInjected: 0,
    routesInjected: 0,
    errors: []
}

// Collect all captures grouped by schema file
const capturesByFile = {}

const namespaces = fs.existsSync( CAPTURE_DIR )
    ? fs.readdirSync( CAPTURE_DIR )
        .filter( ( d ) => fs.statSync( path.join( CAPTURE_DIR, d ) ).isDirectory() )
        .filter( ( d ) => !nsFilter || d === nsFilter )
        .sort()
    : []

namespaces
    .forEach( ( namespace ) => {
        const nsDir = path.join( CAPTURE_DIR, namespace )
        const schemaDirs = fs.readdirSync( nsDir )
            .filter( ( d ) => fs.statSync( path.join( nsDir, d ) ).isDirectory() )

        schemaDirs
            .forEach( ( schemaSlug ) => {
                const captureDir = path.join( nsDir, schemaSlug )
                const files = fs.readdirSync( captureDir )
                    .filter( ( f ) => f.endsWith( '.json' ) )

                files
                    .forEach( ( captureFile ) => {
                        stats.capturesRead++
                        const capturePath = path.join( captureDir, captureFile )
                        const capture = JSON.parse( fs.readFileSync( capturePath, 'utf8' ) )

                        // Skip failed captures
                        if( capture.response.status < 200 || capture.response.status >= 400 || capture.response.parseError ) {
                            stats.capturesSkippedFailed++
                            return
                        }

                        stats.capturesSuccessful++

                        const schemaFile = `${schemaSlug}.mjs`
                        const fileKey = `${namespace}/${schemaFile}`

                        if( !capturesByFile[fileKey] ) {
                            capturesByFile[fileKey] = {
                                namespace,
                                schemaFile,
                                filePath: path.join( V2_DIR, namespace, schemaFile ),
                                routes: {}
                            }
                        }

                        // Only keep first successful capture per route
                        if( !capturesByFile[fileKey].routes[capture.route] ) {
                            capturesByFile[fileKey].routes[capture.route] = capture.response.data
                        }
                    } )
            } )
    } )

console.log( `Captures read: ${stats.capturesRead}` )
console.log( `Successful: ${stats.capturesSuccessful}` )
console.log( `Failed (skipped): ${stats.capturesSkippedFailed}` )
console.log( `Schema files to process: ${Object.keys( capturesByFile ).length}` )
console.log( '' )


// Process each schema file
const processAll = async () => {
    const fileEntries = Object.entries( capturesByFile ).sort( ( a, b ) => a[0].localeCompare( b[0] ) )

    await fileEntries.reduce( ( chain, [ fileKey, info ] ) => chain.then( async () => {
        const { filePath, routes } = info

        if( !fs.existsSync( filePath ) ) {
            stats.errors.push( `${fileKey}: file not found` )
            return
        }

        // Get handler routes
        const handlerRoutes = await getHandlerRoutes( { filePath } )

        let content = fs.readFileSync( filePath, 'utf8' )
        let modified = false
        let injectedCount = 0

        const routeEntries = Object.entries( routes ).sort( ( a, b ) => a[0].localeCompare( b[0] ) )

        routeEntries
            .forEach( ( [ routeName, responseData ] ) => {
                // Skip routes with postRequest handlers (unless --include-handlers)
                if( handlerRoutes.has( routeName ) && !includeHandlers ) {
                    stats.capturesSkippedHandler++
                    if( verbose ) { console.log( `  SKIP ${fileKey} :: ${routeName} — has postRequest handler` ) }
                    return
                }

                // Skip if already has output
                if( routeHasOutput( { content, routeName } ) ) {
                    stats.capturesSkippedExisting++
                    if( verbose ) { console.log( `  SKIP ${fileKey} :: ${routeName} — already has output` ) }
                    return
                }

                // Generate output schema
                const { output } = OutputSchemaGenerator.generate( { response: responseData } )

                // Serialize
                const outputBlock = serializeOutput( { output } )

                // Find injection point
                const { index, reason } = findRouteTestsEnd( { content, routeName } )

                if( index === -1 ) {
                    stats.errors.push( `${fileKey} :: ${routeName} — ${reason}` )
                    return
                }

                if( dryRun ) {
                    console.log( `  + ${fileKey} :: ${routeName} — ${output.schema.type}` )
                    if( verbose && output.schema.properties ) {
                        const keys = Object.keys( output.schema.properties )
                        console.log( `    fields: ${keys.slice( 0, 8 ).join( ', ' )}${keys.length > 8 ? '...' : ''}` )
                    }
                    injectedCount++
                    return
                }

                // Inject output block after tests
                const before = content.slice( 0, index )
                const after = content.slice( index )
                content = before + '\n' + outputBlock + ',' + after
                modified = true
                injectedCount++
            } )

        if( modified && !dryRun ) {
            fs.writeFileSync( filePath, content )
            stats.schemasInjected++
            console.log( `  ✓ ${fileKey} — ${injectedCount} output schemas injected` )
        } else if( injectedCount > 0 && dryRun ) {
            stats.schemasInjected++
        }

        stats.routesInjected += injectedCount
    } ), Promise.resolve() )
}

await processAll()

console.log( '' )
console.log( '--- Summary ---' )
console.log( `Captures read:           ${stats.capturesRead}` )
console.log( `Successful captures:     ${stats.capturesSuccessful}` )
console.log( `Skipped (failed):        ${stats.capturesSkippedFailed}` )
console.log( `Skipped (handler):       ${stats.capturesSkippedHandler}` )
console.log( `Skipped (existing):      ${stats.capturesSkippedExisting}` )
console.log( `Schema files modified:   ${stats.schemasInjected}` )
console.log( `Routes injected:         ${stats.routesInjected}` )
if( stats.errors.length > 0 ) {
    console.log( `\nErrors (${stats.errors.length}):` )
    stats.errors.slice( 0, 20 ).forEach( ( e ) => console.log( `  ${e}` ) )
}
if( dryRun ) {
    console.log( '\nDry-run complete. Use --apply to inject output schemas.' )
}
