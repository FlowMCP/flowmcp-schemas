/**
 * Generate a comprehensive migration tracking document for all v2.0.0 routes.
 * One line per route with status columns for tests, output, captures, handlers.
 *
 * Output: schemas/v2.0.0/MIGRATION-STATUS.md
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const V2_DIR = path.resolve( 'schemas/v2.0.0' )
const CAPTURE_DIR = path.resolve( '.captures/v2.0.0' )
const OUTPUT_PATH = path.resolve( 'schemas/v2.0.0/MIGRATION-STATUS.md' )

// ──────────────────────────────────────────────
// Collect capture results
// ──────────────────────────────────────────────

function loadCaptures() {
    const captures = {}

    if( !fs.existsSync( CAPTURE_DIR ) ) { return captures }

    const walk = ( d ) => {
        fs.readdirSync( d )
            .forEach( ( f ) => {
                const p = path.join( d, f )
                if( fs.statSync( p ).isDirectory() ) { walk( p ); return }
                if( !f.endsWith( '.json' ) ) { return }

                const data = JSON.parse( fs.readFileSync( p, 'utf8' ) )
                const key = `${data.namespace}/${data.schema}.mjs::${data.route}`

                const isOk = data.response.status >= 200
                    && data.response.status < 400
                    && !data.response.parseError

                // Keep best result per route (success > failure)
                if( !captures[key] || ( isOk && !captures[key].ok ) ) {
                    let reason = null
                    if( !isOk ) {
                        reason = data.response.parseError || `HTTP ${data.response.status}`
                    }
                    captures[key] = { ok: isOk, status: data.response.status, reason }
                }
            } )
    }

    walk( CAPTURE_DIR )

    return captures
}


// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

console.log( 'Generating migration report...' )

const captures = loadCaptures()

const namespaces = fs.readdirSync( V2_DIR )
    .filter( ( d ) => d !== '_shared' && d[0] !== '.' && !d.endsWith( '.md' ) )
    .filter( ( d ) => fs.statSync( path.join( V2_DIR, d ) ).isDirectory() )
    .sort()

const allRows = []
const stats = {
    totalRoutes: 0,
    withTests: 0,
    withOutput: 0,
    captureOk: 0,
    captureFail: 0,
    captureNone: 0,
    hasHandler: 0,
    needsApiKey: 0,
    needsLibrary: 0,
    complete: 0
}

const processAll = async () => {
    await namespaces.reduce( ( chain, namespace ) => chain.then( async () => {
        const nsDir = path.join( V2_DIR, namespace )
        const files = fs.readdirSync( nsDir )
            .filter( ( f ) => f.endsWith( '.mjs' ) )
            .sort()

        await files.reduce( ( fc, fileName ) => fc.then( async () => {
            const filePath = path.join( nsDir, fileName )

            let mod
            try {
                mod = await import( pathToFileURL( filePath ).href )
            } catch( e ) {
                allRows.push( {
                    namespace,
                    file: fileName,
                    route: '(IMPORT ERROR)',
                    hasTests: false,
                    hasOutput: false,
                    capture: 'error',
                    captureReason: e.message.split( '\n' )[0],
                    hasHandler: false,
                    needsApiKey: false,
                    needsLibrary: false
                } )
                return
            }

            const schema = mod.main || mod.default
            if( !schema || !schema.routes ) { return }

            const needsApiKey = !!( schema.requiredServerParams && schema.requiredServerParams.length > 0 )
            const needsLibrary = !!( schema.requiredLibraries && schema.requiredLibraries.length > 0 )

            // Get handler map
            let handlerMap = null
            if( mod.handlers && typeof mod.handlers === 'function' ) {
                try {
                    handlerMap = mod.handlers( { sharedLists: {}, libraries: {} } )
                } catch {
                    // ok
                }
            }

            Object.entries( schema.routes )
                .forEach( ( [ routeName, route ] ) => {
                    stats.totalRoutes++

                    const hasTests = !!( route.tests && Array.isArray( route.tests ) && route.tests.length > 0 )
                    const hasOutput = !!route.output
                    const hasPostHandler = !!( handlerMap && handlerMap[routeName] && handlerMap[routeName].postRequest )
                    const hasExecHandler = !!( handlerMap && handlerMap[routeName] && handlerMap[routeName].executeRequest )

                    const captureKey = `${namespace}/${fileName.replace( '.mjs', '' )}.mjs::${routeName}`
                    const captureResult = captures[captureKey]

                    let capture = 'none'
                    let captureReason = null

                    if( captureResult ) {
                        capture = captureResult.ok ? 'ok' : 'fail'
                        captureReason = captureResult.reason
                    }

                    if( hasTests ) { stats.withTests++ }
                    if( hasOutput ) { stats.withOutput++ }
                    if( capture === 'ok' ) { stats.captureOk++ }
                    else if( capture === 'fail' ) { stats.captureFail++ }
                    else { stats.captureNone++ }
                    if( hasPostHandler || hasExecHandler ) { stats.hasHandler++ }
                    if( needsApiKey ) { stats.needsApiKey++ }
                    if( needsLibrary ) { stats.needsLibrary++ }

                    // A route is "complete" when it has tests AND either:
                    // - output schema injected
                    // - executeRequest handler (provides its own output)
                    // - postRequest handler with successful capture (handler transforms raw output)
                    const isComplete = hasTests && (
                        hasOutput
                        || hasExecHandler
                        || ( hasPostHandler && capture === 'ok' )
                    )
                    if( isComplete ) { stats.complete++ }

                    allRows.push( {
                        namespace,
                        file: fileName,
                        route: routeName,
                        hasTests,
                        hasOutput,
                        capture,
                        captureReason,
                        hasPostHandler,
                        hasExecHandler,
                        needsApiKey,
                        needsLibrary
                    } )
                } )
        } ), Promise.resolve() )
    } ), Promise.resolve() )
}

await processAll()


// ──────────────────────────────────────────────
// Generate Markdown
// ──────────────────────────────────────────────

const lines = []

lines.push( '# FlowMCP v2.0.0 — Migration Status' )
lines.push( '' )
lines.push( `Generated: ${new Date().toISOString().slice( 0, 16 )}` )
lines.push( '' )

// Summary
lines.push( '## Summary' )
lines.push( '' )
lines.push( `| Metric | Count | Percent |` )
lines.push( `|--------|------:|--------:|` )
lines.push( `| Total Routes | ${stats.totalRoutes} | 100% |` )
lines.push( `| With Tests | ${stats.withTests} | ${pct( stats.withTests, stats.totalRoutes )} |` )
lines.push( `| With Output Schema | ${stats.withOutput} | ${pct( stats.withOutput, stats.totalRoutes )} |` )
lines.push( `| Complete (Tests + Output) | ${stats.complete} | ${pct( stats.complete, stats.totalRoutes )} |` )
lines.push( `| Capture OK | ${stats.captureOk} | ${pct( stats.captureOk, stats.totalRoutes )} |` )
lines.push( `| Capture Failed | ${stats.captureFail} | ${pct( stats.captureFail, stats.totalRoutes )} |` )
lines.push( `| Not Captured | ${stats.captureNone} | ${pct( stats.captureNone, stats.totalRoutes )} |` )
lines.push( `| Has Handler (post/exec) | ${stats.hasHandler} | ${pct( stats.hasHandler, stats.totalRoutes )} |` )
lines.push( `| Needs API Key | ${stats.needsApiKey} | ${pct( stats.needsApiKey, stats.totalRoutes )} |` )
lines.push( `| Needs Library | ${stats.needsLibrary} | ${pct( stats.needsLibrary, stats.totalRoutes )} |` )
lines.push( '' )

// Status legend
lines.push( '## Legend' )
lines.push( '' )
lines.push( '| Column | Values |' )
lines.push( '|--------|--------|' )
lines.push( '| Tests | Y = has tests, **-** = missing |' )
lines.push( '| Output | Y = has output schema, **-** = missing |' )
lines.push( '| Capture | ok = API responded, fail = error, **-** = not attempted |' )
lines.push( '| Handler | post = postRequest, exec = executeRequest, **-** = none |' )
lines.push( '| Key | Y = needs API key, **-** = no key needed |' )
lines.push( '| Lib | Y = needs library, **-** = no library needed |' )
lines.push( '' )

// Group by namespace
let currentNs = ''

lines.push( '## Routes' )
lines.push( '' )

const nsGroups = {}

allRows
    .forEach( ( row ) => {
        if( !nsGroups[row.namespace] ) { nsGroups[row.namespace] = [] }
        nsGroups[row.namespace].push( row )
    } )

Object.entries( nsGroups )
    .sort( ( a, b ) => a[0].localeCompare( b[0] ) )
    .forEach( ( [ ns, rows ] ) => {
        const nsComplete = rows.filter( ( r ) => r.hasTests && r.hasOutput ).length
        const nsTotal = rows.length

        lines.push( `### ${ns} (${nsComplete}/${nsTotal} complete)` )
        lines.push( '' )
        lines.push( '| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |' )
        lines.push( '|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|' )

        rows
            .forEach( ( r ) => {
                const tests = r.hasTests ? 'Y' : '-'
                const output = r.hasOutput ? 'Y' : '-'

                let capture = '-'
                if( r.capture === 'ok' ) { capture = 'ok' }
                else if( r.capture === 'fail' ) { capture = 'fail' }

                let handler = '-'
                if( r.hasExecHandler ) { handler = 'exec' }
                else if( r.hasPostHandler ) { handler = 'post' }

                const key = r.needsApiKey ? 'Y' : '-'
                const lib = r.needsLibrary ? 'Y' : '-'

                let note = ''
                if( r.captureReason ) { note = r.captureReason }

                const shortFile = r.file.replace( '.mjs', '' )

                lines.push( `| ${shortFile} | ${r.route} | ${tests} | ${output} | ${capture} | ${handler} | ${key} | ${lib} | ${note} |` )
            } )

        lines.push( '' )
    } )


// Write file
const content = lines.join( '\n' )
fs.writeFileSync( OUTPUT_PATH, content )
console.log( `Written: ${OUTPUT_PATH}` )
console.log( `Total routes: ${stats.totalRoutes}` )
console.log( `Complete: ${stats.complete} (${pct( stats.complete, stats.totalRoutes )})` )


function pct( n, total ) {
    if( total === 0 ) { return '0%' }
    const result = Math.round( ( n / total ) * 100 ) + '%'

    return result
}
