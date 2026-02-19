/**
 * Migrate tests from v1.2.0 schemas to v2.0.0 schemas.
 *
 * Strategy:
 * 1. Dynamic import() each v1.2.0 schema to get test objects as real JS
 * 2. Serialize each test to a formatted string
 * 3. Text-inject into the v2.0.0 file after the output block (or parameters block)
 *
 * Usage:
 *   node scripts/migrate-tests-to-v2.mjs --dry-run    # Preview only
 *   node scripts/migrate-tests-to-v2.mjs --apply       # Write changes
 *   node scripts/migrate-tests-to-v2.mjs --verbose     # Show details
 *   node scripts/migrate-tests-to-v2.mjs --namespace=coingecko-com --apply
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const args = process.argv.slice( 2 )
const dryRun = args.includes( '--dry-run' ) || !args.includes( '--apply' )
const verbose = args.includes( '--verbose' )
const nsFilter = args.find( ( a ) => a.startsWith( '--namespace=' ) )?.split( '=' )[1] || null

const V1_DIR = path.resolve( 'schemas/v1.2.0' )
const V2_DIR = path.resolve( 'schemas/v2.0.0' )

const stats = {
    v1FilesScanned: 0,
    v2FilesFound: 0,
    v2FilesNotFound: 0,
    routesMigrated: 0,
    routesSkipped: 0,
    testsTotal: 0,
    filesWritten: 0,
    errors: []
}

/**
 * Serialize a test object to a single-line or multi-line JS string.
 * Keeps it readable and consistent with FlowMCP formatting.
 */
function serializeTest( { testObj, indent } ) {
    const entries = Object.entries( testObj )
        .map( ( [ key, value ] ) => {
            // Quote keys that contain dots or other special chars
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( key ) ? key : `'${key}'`
            if ( typeof value === 'string' ) {
                return `${safeKey}: '${value.replace( /'/g, "\\'" )}'`
            }
            if ( Array.isArray( value ) ) {
                const items = value.map( ( v ) => typeof v === 'string' ? `'${v}'` : String( v ) )
                return `${safeKey}: [${items.join( ', ' )}]`
            }
            if ( typeof value === 'object' && value !== null ) {
                return `${safeKey}: ${JSON.stringify( value )}`
            }
            return `${safeKey}: ${value}`
        } )

    const singleLine = `{ ${entries.join( ', ' )} }`

    if ( singleLine.length <= 120 ) {
        return `${indent}${singleLine}`
    }

    // Multi-line for long tests
    const inner = entries
        .map( ( e ) => `${indent}    ${e}` )
        .join( ',\n' )

    return `${indent}{\n${inner}\n${indent}}`
}

/**
 * Build the tests block string for injection.
 */
function buildTestsBlock( { tests, routeIndent } ) {
    const testIndent = routeIndent + '    '
    const serialized = tests
        .map( ( testObj ) => serializeTest( { testObj, indent: testIndent } ) )
        .join( ',\n' )

    return `${routeIndent}tests: [\n${serialized}\n${routeIndent}],`
}

/**
 * Find the injection point in a v2.0.0 file for a given route.
 * Returns the index after the output block or parameters block.
 */
function findInjectionPoint( { content, routeName } ) {
    // Find the route start
    const routePattern = `${routeName}: {`
    const routeIdx = content.indexOf( routePattern )
    if ( routeIdx === -1 ) {
        return { idx: -1, reason: 'route not found' }
    }

    // Find the end boundary: next route or closing of routes object
    const afterRoute = routeIdx + routeName.length
    const nextRouteMatch = content.slice( afterRoute ).match( /\n {8}\w+: \{/ )
    const boundary = nextRouteMatch
        ? afterRoute + nextRouteMatch.index
        : content.length

    const routeSlice = content.slice( routeIdx, boundary )

    // Check if already has tests
    if ( routeSlice.includes( 'tests:' ) ) {
        return { idx: -1, reason: 'already has tests' }
    }

    // Strategy 1: Find output block end
    const outputIdx = routeSlice.indexOf( 'output:' )
    if ( outputIdx !== -1 ) {
        const absOutputIdx = routeIdx + outputIdx
        const braceStart = content.indexOf( '{', absOutputIdx )
        const braceEnd = findMatchingBrace( { content, startIdx: braceStart } )
        if ( braceEnd !== -1 ) {
            return { idx: braceEnd + 1 }
        }
    }

    // Strategy 2: Find parameters block end
    const paramsIdx = routeSlice.indexOf( 'parameters:' )
    if ( paramsIdx !== -1 ) {
        const absParamsIdx = routeIdx + paramsIdx
        const bracketStart = content.indexOf( '[', absParamsIdx )
        const bracketEnd = findMatchingBracket( { content, startIdx: bracketStart } )
        if ( bracketEnd !== -1 ) {
            return { idx: bracketEnd + 1 }
        }
    }

    return { idx: -1, reason: 'no injection point' }
}

function findMatchingBrace( { content, startIdx } ) {
    let depth = 0
    let idx = startIdx
    while ( idx < content.length ) {
        if ( content[idx] === '{' ) { depth++ }
        if ( content[idx] === '}' ) {
            depth--
            if ( depth === 0 ) { return idx }
        }
        // Skip strings to avoid false matches
        if ( content[idx] === "'" ) {
            idx++
            while ( idx < content.length && content[idx] !== "'" ) {
                if ( content[idx] === '\\' ) { idx++ }
                idx++
            }
        }
        idx++
    }
    return -1
}

function findMatchingBracket( { content, startIdx } ) {
    let depth = 0
    let idx = startIdx
    while ( idx < content.length ) {
        if ( content[idx] === '[' ) { depth++ }
        if ( content[idx] === ']' ) {
            depth--
            if ( depth === 0 ) { return idx }
        }
        if ( content[idx] === "'" ) {
            idx++
            while ( idx < content.length && content[idx] !== "'" ) {
                if ( content[idx] === '\\' ) { idx++ }
                idx++
            }
        }
        idx++
    }
    return -1
}

// Main
console.log( `\nFlowMCP Test Migration v1.2.0 -> v2.0.0` )
console.log( `Mode: ${dryRun ? 'DRY-RUN' : 'APPLY'}` )
if ( nsFilter ) { console.log( `Filter: ${nsFilter}` ) }
console.log( '' )

const v1Namespaces = fs.readdirSync( V1_DIR )
    .filter( ( d ) => !d.startsWith( '_' ) && !d.startsWith( '.' ) )
    .filter( ( d ) => fs.statSync( path.join( V1_DIR, d ) ).isDirectory() )
    .filter( ( d ) => !nsFilter || d === nsFilter )

const processNamespaces = async () => {
    const results = []

    await v1Namespaces.reduce( ( chain, namespace ) => chain.then( async () => {
        const v1Dir = path.join( V1_DIR, namespace )
        const v2Dir = path.join( V2_DIR, namespace )

        if ( !fs.existsSync( v2Dir ) ) {
            if ( verbose ) { console.log( `SKIP namespace ${namespace} — no v2 folder` ) }
            return
        }

        const v1Files = fs.readdirSync( v1Dir )
            .filter( ( f ) => f.endsWith( '.mjs' ) )

        await v1Files.reduce( ( fileChain, fileName ) => fileChain.then( async () => {
            stats.v1FilesScanned++
            const v1Path = path.join( v1Dir, fileName )
            const v2Path = path.join( v2Dir, fileName )

            if ( !fs.existsSync( v2Path ) ) {
                stats.v2FilesNotFound++
                if ( verbose ) { console.log( `  MISS ${namespace}/${fileName}` ) }
                return
            }

            stats.v2FilesFound++

            // Dynamic import v1.2.0 schema
            let schema
            try {
                const mod = await import( pathToFileURL( v1Path ).href )
                schema = mod.schema || mod.default
            } catch ( e ) {
                stats.errors.push( `${namespace}/${fileName}: import failed — ${e.message}` )
                if ( verbose ) { console.log( `  ERR  ${namespace}/${fileName} — ${e.message}` ) }
                return
            }

            if ( !schema || !schema.routes ) {
                if ( verbose ) { console.log( `  SKIP ${namespace}/${fileName} — no routes` ) }
                return
            }

            // Extract tests per route
            const routeTests = {}
            Object.entries( schema.routes )
                .forEach( ( [ routeName, route ] ) => {
                    if ( route.tests && Array.isArray( route.tests ) && route.tests.length > 0 ) {
                        routeTests[routeName] = route.tests
                    }
                } )

            if ( Object.keys( routeTests ).length === 0 ) {
                stats.routesSkipped++
                if ( verbose ) { console.log( `  EMPTY ${namespace}/${fileName}` ) }
                return
            }

            // Inject into v2.0.0 file
            let v2Content = fs.readFileSync( v2Path, 'utf-8' )
            let injectedCount = 0

            Object.entries( routeTests )
                .forEach( ( [ routeName, tests ] ) => {
                    const { idx, reason } = findInjectionPoint( { content: v2Content, routeName } )

                    if ( idx === -1 ) {
                        if ( verbose ) { console.log( `    ${reason}: ${routeName}` ) }
                        stats.routesSkipped++
                        return
                    }

                    const testsBlock = buildTestsBlock( { tests, routeIndent: '            ' } )

                    // Ensure comma before tests block
                    const before = v2Content.slice( 0, idx )
                    const trimmedBefore = before.trimEnd()
                    const needsComma = !trimmedBefore.endsWith( ',' )
                    const prefix = needsComma ? ',\n' : '\n'
                    v2Content = before + prefix + testsBlock + v2Content.slice( idx )
                    injectedCount++
                    stats.routesMigrated++
                    stats.testsTotal += tests.length
                } )

            if ( injectedCount > 0 ) {
                if ( !dryRun ) {
                    fs.writeFileSync( v2Path, v2Content )
                    stats.filesWritten++
                }
                const testCount = Object.values( routeTests )
                    .reduce( ( sum, t ) => sum + t.length, 0 )
                console.log( `  ${dryRun ? 'WOULD' : 'WROTE'} ${namespace}/${fileName} — ${injectedCount} routes, ${testCount} tests` )
            }
        } ), Promise.resolve() )
    } ), Promise.resolve() )
}

await processNamespaces()

console.log( '' )
console.log( '--- Summary ---' )
console.log( `v1 files scanned:    ${stats.v1FilesScanned}` )
console.log( `v2 files matched:    ${stats.v2FilesFound}` )
console.log( `v2 files not found:  ${stats.v2FilesNotFound}` )
console.log( `Routes migrated:     ${stats.routesMigrated}` )
console.log( `Routes skipped:      ${stats.routesSkipped}` )
console.log( `Tests total:         ${stats.testsTotal}` )
console.log( `Files written:       ${stats.filesWritten}` )
if ( stats.errors.length > 0 ) {
    console.log( `\nErrors (${stats.errors.length}):` )
    stats.errors.forEach( ( e ) => console.log( `  ${e}` ) )
}
if ( dryRun ) {
    console.log( '\nDry-run complete. Use --apply to write changes.' )
}
