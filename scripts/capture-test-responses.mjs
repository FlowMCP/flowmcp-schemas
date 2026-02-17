/**
 * Execute route tests against real APIs and capture responses.
 * Without --env: only processes schemas without requiredServerParams.
 * With --env: also processes schemas whose API keys are present in the env file.
 *
 * The captured responses are the input for OutputSchemaGenerator.
 *
 * Usage:
 *   node scripts/capture-test-responses.mjs --dry-run
 *   node scripts/capture-test-responses.mjs --apply
 *   node scripts/capture-test-responses.mjs --env=../../flowmcp-core.env --apply
 *   node scripts/capture-test-responses.mjs --env=../../flowmcp-core.env --namespace=etherscan --apply
 *   node scripts/capture-test-responses.mjs --apply --delay=2000
 *   node scripts/capture-test-responses.mjs --namespace=coingecko-com --apply --skip-ok --delay=5000
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const args = process.argv.slice( 2 )
const dryRun = args.includes( '--dry-run' ) || !args.includes( '--apply' )
const verbose = args.includes( '--verbose' )
const skipOk = args.includes( '--skip-ok' )
const nsFilter = args.find( ( a ) => a.startsWith( '--namespace=' ) )?.split( '=' )[1] || null
const delayMs = parseInt( args.find( ( a ) => a.startsWith( '--delay=' ) )?.split( '=' )[1] || '1000' )
const envPath = args.find( ( a ) => a.startsWith( '--env=' ) )?.split( '=' )[1] || null


// ──────────────────────────────────────────────
// Env File Loader
// ──────────────────────────────────────────────

function loadEnvFile( { filePath } ) {
    const resolved = path.resolve( filePath )
    if ( !fs.existsSync( resolved ) ) {
        console.error( `ERROR: env file not found: ${resolved}` )
        process.exit( 1 )
    }

    const envVars = {}
    const content = fs.readFileSync( resolved, 'utf8' )

    content.split( '\n' )
        .forEach( ( line ) => {
            const trimmed = line.trim()
            if ( !trimmed || trimmed.startsWith( '#' ) ) { return }
            const eqIndex = trimmed.indexOf( '=' )
            if ( eqIndex === -1 ) { return }
            const key = trimmed.slice( 0, eqIndex ).trim()
            const value = trimmed.slice( eqIndex + 1 ).trim()
            if ( key && value ) {
                envVars[key] = value
            }
        } )

    return envVars
}

const serverParams = envPath ? loadEnvFile( { filePath: envPath } ) : {}


// ──────────────────────────────────────────────
// Server Param Resolution
// ──────────────────────────────────────────────

function resolveServerParams( { text } ) {
    const result = text.replace( /\{\{([A-Z_]+)\}\}/g, ( match, key ) => {
        const value = serverParams[key]

        return value || match
    } )

    return result
}

const V2_DIR = path.resolve( 'schemas/v2.0.0' )
const CAPTURE_DIR = path.resolve( '.captures/v2.0.0' )
const SHARED_DIR = path.resolve( 'schemas/v1.2.0/_shared' )


// ──────────────────────────────────────────────
// Shared Lists Loader (for preRequest handlers)
// ──────────────────────────────────────────────

const sharedLists = {}

if ( fs.existsSync( SHARED_DIR ) ) {
    const sharedFiles = fs.readdirSync( SHARED_DIR )
        .filter( ( f ) => f.endsWith( '.mjs' ) )

    await sharedFiles.reduce( ( chain, fileName ) => chain.then( async () => {
        const refName = fileName.replace( '.mjs', '' )
        try {
            const mod = await import( pathToFileURL( path.join( SHARED_DIR, fileName ) ).href )
            const exportValues = Object.values( mod )
            const arrayExport = exportValues.find( ( v ) => Array.isArray( v ) )
            if ( arrayExport ) {
                sharedLists[refName] = arrayExport
            } else {
                sharedLists[refName] = mod
            }
        } catch ( e ) {
            if ( verbose ) { console.log( `  WARN: shared list ${refName}: ${e.message}` ) }
        }
    } ), Promise.resolve() )
}


// ──────────────────────────────────────────────
// Known URL slug mappings (for preRequest replacements)
// ──────────────────────────────────────────────

const SLUG_MAPS = {
    '--chain--': {
        LUKSO_MAINNET: 'mainnet',
        LUKSO_TESTNET: 'testnet'
    }
}


// ──────────────────────────────────────────────
// URL Construction
// ──────────────────────────────────────────────

function buildRequestUrl( { root, routePath, parameters, testObj } ) {
    let url = resolveServerParams( { text: root + routePath } )

    // Resolve known slug patterns (e.g., --chain--)
    Object.entries( SLUG_MAPS )
        .forEach( ( [ placeholder, mapping ] ) => {
            if ( url.includes( placeholder ) ) {
                const matchingParam = parameters
                    .find( ( p ) => {
                        const testVal = testObj[p.position.key]
                        return testVal && mapping[testVal]
                    } )
                if ( matchingParam ) {
                    const testVal = testObj[matchingParam.position.key]
                    url = url.replace( placeholder, mapping[testVal] )
                }
            }
        } )

    // Check for unresolved placeholders
    const unresolvedServer = url.match( /\{\{[A-Z_]+\}\}/g )
    if ( unresolvedServer ) {
        return { url: null, reason: `unresolved server params: ${unresolvedServer.join( ', ' )}` }
    }
    const unresolvedSlug = url.match( /--[a-z-]+--/g )
    if ( unresolvedSlug ) {
        return { url: null, reason: `unresolved slug: ${unresolvedSlug.join( ', ' )}` }
    }

    // Replace :param inserts in path
    const queryParams = new URLSearchParams()
    const bodyParams = {}

    parameters
        .forEach( ( param ) => {
            const { key, value: paramValue, location } = param.position

            // Use test value if provided, otherwise resolve server param placeholder
            let value = testObj[key]
            if ( ( value === undefined || value === null ) && paramValue && paramValue.includes( '{{' ) ) {
                const resolved = resolveServerParams( { text: paramValue } )
                if ( !resolved.includes( '{{' ) ) {
                    value = resolved
                }
            }
            if ( value === undefined || value === null ) { return }

            if ( location === 'insert' ) {
                url = url.replace( `:${key}`, encodeURIComponent( String( value ) ) )
            } else if ( location === 'query' ) {
                if ( Array.isArray( value ) ) {
                    queryParams.set( key, value.join( ',' ) )
                } else {
                    queryParams.set( key, String( value ) )
                }
            } else if ( location === 'body' ) {
                bodyParams[key] = value
            }
        } )

    // Append query params
    const queryString = queryParams.toString()
    if ( queryString ) {
        url += ( url.includes( '?' ) ? '&' : '?' ) + queryString
    }

    const hasBody = Object.keys( bodyParams ).length > 0

    return { url, bodyParams: hasBody ? bodyParams : null, reason: null }
}


// ──────────────────────────────────────────────
// Schema Qualification
// ──────────────────────────────────────────────

function qualifiesForCapture( { schema, handlers } ) {
    // Check server params: skip if required but not provided via --env
    if ( schema.requiredServerParams && schema.requiredServerParams.length > 0 ) {
        const missing = schema.requiredServerParams
            .filter( ( key ) => !serverParams[key] )
        if ( missing.length > 0 ) {
            return { ok: false, reason: `missing API keys: ${missing.join( ', ' )}` }
        }
    }

    // Must not require libraries
    if ( schema.requiredLibraries && schema.requiredLibraries.length > 0 ) {
        return { ok: false, reason: 'requires libraries' }
    }

    // Check for executeRequest handlers
    if ( handlers ) {
        const hasExecute = Object.values( handlers )
            .some( ( h ) => h && typeof h === 'object' && h.executeRequest )
        if ( hasExecute ) {
            return { ok: false, reason: 'has executeRequest handlers' }
        }
    }

    return { ok: true }
}


// ──────────────────────────────────────────────
// Request Execution
// ──────────────────────────────────────────────

async function executeTest( { method, url, headers, bodyParams } ) {
    const fetchOpts = {
        method: method || 'GET',
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'FlowMCP-TestCapture/1.0',
            ...( headers || {} )
        }
    }

    // Resolve server params in headers, remove any still unresolved
    Object.entries( fetchOpts.headers )
        .forEach( ( [ key, val ] ) => {
            if ( typeof val === 'string' && val.includes( '{{' ) ) {
                const resolved = resolveServerParams( { text: val } )
                if ( resolved.includes( '{{' ) ) {
                    delete fetchOpts.headers[key]
                } else {
                    fetchOpts.headers[key] = resolved
                }
            }
        } )

    if ( bodyParams && ( method === 'POST' || method === 'PUT' ) ) {
        fetchOpts.body = JSON.stringify( bodyParams )
        // Only set Content-Type if not already provided by schema headers
        const hasContentType = Object.keys( fetchOpts.headers )
            .some( ( k ) => k.toLowerCase() === 'content-type' )
        if ( !hasContentType ) {
            fetchOpts.headers['Content-Type'] = 'application/json'
        }
    }

    const startTime = Date.now()
    const response = await fetch( url, fetchOpts )
    const duration = Date.now() - startTime

    let data = null
    let parseError = null
    const contentType = response.headers.get( 'content-type' ) || ''

    try {
        if ( contentType.includes( 'application/json' ) || contentType.includes( 'text/json' ) || contentType.includes( '+json' ) ) {
            data = await response.json()
        } else {
            const text = await response.text()
            try {
                data = JSON.parse( text )
            } catch {
                data = { _rawText: text.slice( 0, 5000 ) }
                parseError = 'non-JSON response'
            }
        }
    } catch ( e ) {
        parseError = e.message
    }

    return {
        status: response.status,
        statusText: response.statusText,
        contentType,
        duration,
        data,
        parseError
    }
}


// ──────────────────────────────────────────────
// Save Capture
// ──────────────────────────────────────────────

function saveCapture( { namespace, schemaFile, routeName, testIndex, testObj, request, response } ) {
    const schemaSlug = schemaFile.replace( '.mjs', '' )
    const dir = path.join( CAPTURE_DIR, namespace, schemaSlug )
    fs.mkdirSync( dir, { recursive: true } )

    const fileName = `${routeName}_${testIndex}.json`
    const filePath = path.join( dir, fileName )

    const capture = {
        namespace,
        schema: schemaSlug,
        route: routeName,
        testIndex,
        test: testObj,
        request,
        response: {
            status: response.status,
            statusText: response.statusText,
            contentType: response.contentType,
            duration: response.duration,
            parseError: response.parseError || null,
            data: response.data
        },
        capturedAt: new Date().toISOString()
    }

    fs.writeFileSync( filePath, JSON.stringify( capture, null, 2 ) )

    return filePath
}


// ──────────────────────────────────────────────
// Delay helper
// ──────────────────────────────────────────────

function delay( ms ) {
    return new Promise( ( resolve ) => { setTimeout( resolve, ms ) } )
}


// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

console.log( `\nFlowMCP Test Response Capture` )
console.log( `Mode: ${dryRun ? 'DRY-RUN (no requests)' : 'APPLY (live requests)'}` )
console.log( `Delay: ${delayMs}ms between requests` )
if ( envPath ) { console.log( `Env: ${path.resolve( envPath )} (${Object.keys( serverParams ).length} keys loaded)` ) }
if ( skipOk ) { console.log( 'Skip OK: YES (only re-capture failed)' ) }
if ( nsFilter ) { console.log( `Filter: ${nsFilter}` ) }
console.log( '' )

const stats = {
    schemasScanned: 0,
    schemasQualified: 0,
    schemasSkipped: 0,
    testsExecuted: 0,
    testsSucceeded: 0,
    testsFailed: 0,
    testsSkipped: 0,
    capturesSaved: 0,
    errors: []
}

const namespaces = fs.readdirSync( V2_DIR )
    .filter( ( d ) => d !== '_shared' && d[0] !== '.' )
    .filter( ( d ) => fs.statSync( path.join( V2_DIR, d ) ).isDirectory() )
    .filter( ( d ) => !nsFilter || d === nsFilter )
    .sort()

const processAll = async () => {
    await namespaces.reduce( ( chain, namespace ) => chain.then( async () => {
        const nsDir = path.join( V2_DIR, namespace )
        const files = fs.readdirSync( nsDir )
            .filter( ( f ) => f.endsWith( '.mjs' ) )
            .sort()

        await files.reduce( ( fileChain, fileName ) => fileChain.then( async () => {
            stats.schemasScanned++

            const filePath = path.join( nsDir, fileName )
            let mod
            try {
                mod = await import( pathToFileURL( filePath ).href )
            } catch ( e ) {
                stats.errors.push( `${namespace}/${fileName}: import failed — ${e.message}` )
                return
            }

            const schema = mod.main || mod.default
            if ( !schema || !schema.routes ) { return }

            // Build handler map with shared lists for qualification + preRequest
            let handlerMap = null
            if ( mod.handlers && typeof mod.handlers === 'function' ) {
                try {
                    handlerMap = mod.handlers( { sharedLists, libraries: {} } )
                } catch {
                    // Handler factory might fail without proper deps — that's ok for qualification
                }
            }

            const { ok, reason } = qualifiesForCapture( { schema, handlers: handlerMap } )
            if ( !ok ) {
                stats.schemasSkipped++
                if ( verbose ) { console.log( `  SKIP ${namespace}/${fileName} — ${reason}` ) }
                return
            }

            stats.schemasQualified++

            // Process each route
            const routeEntries = Object.entries( schema.routes )
            await routeEntries.reduce( ( routeChain, [ routeName, route ] ) => routeChain.then( async () => {
                if ( !route.tests || !Array.isArray( route.tests ) || route.tests.length === 0 ) {
                    return
                }

                // Check if this specific route has executeRequest
                if ( handlerMap && handlerMap[routeName] && handlerMap[routeName].executeRequest ) {
                    if ( verbose ) { console.log( `    SKIP ${routeName} — has executeRequest` ) }
                    stats.testsSkipped += route.tests.length
                    return
                }

                await route.tests.reduce( ( testChain, testObj, testIndex ) => testChain.then( async () => {
                    // Skip if existing capture is successful
                    if ( skipOk ) {
                        const schemaSlug = fileName.replace( '.mjs', '' )
                        const capFile = path.join( CAPTURE_DIR, namespace, schemaSlug, `${routeName}_${testIndex}.json` )
                        if ( fs.existsSync( capFile ) ) {
                            try {
                                const existing = JSON.parse( fs.readFileSync( capFile, 'utf8' ) )
                                if ( existing.response.status >= 200 && existing.response.status < 400 && !existing.response.parseError ) {
                                    if ( verbose ) { console.log( `  SKIP ${namespace}/${fileName} :: ${routeName}[${testIndex}] — existing OK capture` ) }
                                    stats.testsSkipped++
                                    return
                                }
                            } catch { /* re-capture if parse fails */ }
                        }
                    }

                    let { url, bodyParams, reason: urlReason } = buildRequestUrl( {
                        root: schema.root,
                        routePath: route.path,
                        parameters: route.parameters || [],
                        testObj
                    } )

                    if ( !url ) {
                        if ( verbose ) { console.log( `    SKIP ${routeName}[${testIndex}] — ${urlReason}` ) }
                        stats.testsSkipped++
                        return
                    }

                    // Run preRequest handler if available
                    if ( handlerMap && handlerMap[routeName] && handlerMap[routeName].preRequest ) {
                        try {
                            const struct = { url, method: route.method || 'GET', body: bodyParams }
                            const payload = { ...testObj }
                            const result = await handlerMap[routeName].preRequest( { struct, payload } )
                            if ( result && result.struct ) {
                                if ( result.struct.url ) { url = result.struct.url }
                                if ( result.struct.body ) { bodyParams = result.struct.body }
                            }
                        } catch ( e ) {
                            if ( verbose ) { console.log( `    WARN: preRequest ${routeName}: ${e.message}` ) }
                        }
                    }

                    if ( dryRun ) {
                        console.log( `  ${route.method || 'GET'} ${url}` )
                        console.log( `    → ${namespace}/${fileName} :: ${routeName}[${testIndex}]` )
                        stats.testsExecuted++
                        return
                    }

                    // Live execution
                    try {
                        const response = await executeTest( {
                            method: route.method || 'GET',
                            url,
                            headers: schema.headers || {},
                            bodyParams
                        } )

                        stats.testsExecuted++

                        if ( response.status >= 200 && response.status < 400 && response.data && !response.parseError ) {
                            stats.testsSucceeded++
                            const savedPath = saveCapture( {
                                namespace,
                                schemaFile: fileName,
                                routeName,
                                testIndex,
                                testObj,
                                request: { method: route.method || 'GET', url },
                                response
                            } )
                            stats.capturesSaved++
                            console.log( `  ✓ ${namespace}/${fileName} :: ${routeName}[${testIndex}] — ${response.status} (${response.duration}ms)` )
                        } else {
                            stats.testsFailed++
                            const msg = response.parseError || `HTTP ${response.status} ${response.statusText}`
                            console.log( `  ✗ ${namespace}/${fileName} :: ${routeName}[${testIndex}] — ${msg}` )
                            // Still save failed responses for analysis
                            saveCapture( {
                                namespace,
                                schemaFile: fileName,
                                routeName,
                                testIndex,
                                testObj,
                                request: { method: route.method || 'GET', url },
                                response
                            } )
                        }

                        // Rate limiting
                        await delay( delayMs )

                    } catch ( e ) {
                        stats.testsFailed++
                        stats.errors.push( `${namespace}/${fileName} :: ${routeName}[${testIndex}] — ${e.message}` )
                        console.log( `  ✗ ${namespace}/${fileName} :: ${routeName}[${testIndex}] — ${e.message}` )
                    }
                } ), Promise.resolve() )
            } ), Promise.resolve() )
        } ), Promise.resolve() )
    } ), Promise.resolve() )
}

await processAll()

console.log( '' )
console.log( '--- Summary ---' )
console.log( `Schemas scanned:    ${stats.schemasScanned}` )
console.log( `Schemas qualified:  ${stats.schemasQualified}` )
console.log( `Schemas skipped:    ${stats.schemasSkipped}` )
console.log( `Tests executed:     ${stats.testsExecuted}` )
console.log( `Tests succeeded:    ${stats.testsSucceeded}` )
console.log( `Tests failed:       ${stats.testsFailed}` )
console.log( `Tests skipped:      ${stats.testsSkipped}` )
console.log( `Captures saved:     ${stats.capturesSaved}` )
if ( stats.errors.length > 0 ) {
    console.log( `\nErrors (${stats.errors.length}):` )
    stats.errors.slice( 0, 20 ).forEach( ( e ) => console.log( `  ${e}` ) )
    if ( stats.errors.length > 20 ) { console.log( `  ... and ${stats.errors.length - 20} more` ) }
}
if ( dryRun ) {
    console.log( '\nDry-run complete. Use --apply to execute requests.' )
}
