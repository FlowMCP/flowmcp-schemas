/**
 * Analyze remaining incomplete routes and categorize by what's needed.
 */
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const V2_DIR = path.resolve( 'schemas/v2.0.0' )
const CAPTURE_DIR = path.resolve( '.captures/v2.0.0' )

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
                const isOk = data.response.status >= 200 && data.response.status < 300
                if( !captures[key] || ( isOk && !captures[key].ok ) ) {
                    captures[key] = { ok: isOk, status: data.response.status, reason: data.response.parseError || null }
                }
            } )
    }
    walk( CAPTURE_DIR )
    return captures
}

const captures = loadCaptures()
const namespaces = fs.readdirSync( V2_DIR )
    .filter( ( d ) => d[0] !== '.' && d !== '_shared' && !d.endsWith( '.md' ) )
    .filter( ( d ) => fs.statSync( path.join( V2_DIR, d ) ).isDirectory() )

const categories = {
    postNeedCapture: [],
    noHandlerNoOutput: [],
    noHandlerHasCapture: []
}

for( const ns of namespaces ) {
    const files = fs.readdirSync( path.join( V2_DIR, ns ) ).filter( ( f ) => f.endsWith( '.mjs' ) )
    for( const fileName of files ) {
        const filePath = path.join( V2_DIR, ns, fileName )
        let mod
        try { mod = await import( pathToFileURL( filePath ).href ) } catch { continue }
        const schema = mod.main || mod.default
        if( !schema || !schema.routes ) { continue }

        // Try handler map
        let handlerMap = null
        let sourceTypes = null
        if( mod.handlers && typeof mod.handlers === 'function' ) {
            try {
                handlerMap = mod.handlers( { sharedLists: {}, libraries: {} } )
            } catch {
                const source = fs.readFileSync( filePath, 'utf8' )
                const hIdx = source.indexOf( 'export const handlers' )
                if( hIdx !== -1 ) {
                    const hs = source.slice( hIdx )
                    sourceTypes = {}
                    const rNames = Object.keys( schema.routes )
                    const positions = rNames
                        .map( ( rn ) => ( { name: rn, idx: hs.indexOf( rn + ':' ) } ) )
                        .filter( ( p ) => p.idx !== -1 )
                        .sort( ( a, b ) => a.idx - b.idx )
                    positions.forEach( ( pos, i ) => {
                        const end = i < positions.length - 1 ? positions[i + 1].idx : hs.length
                        const snippet = hs.slice( pos.idx, end )
                        sourceTypes[pos.name] = {
                            exec: snippet.includes( 'executeRequest' ),
                            post: snippet.includes( 'postRequest' )
                        }
                    } )
                }
            }
        }

        Object.entries( schema.routes )
            .forEach( ( [ routeName, route ] ) => {
                const hasTests = !!( route.tests && Array.isArray( route.tests ) && route.tests.length > 0 )
                const hasOutput = !!route.output
                let hasPost = !!( handlerMap && handlerMap[routeName] && handlerMap[routeName].postRequest )
                let hasExec = !!( handlerMap && handlerMap[routeName] && handlerMap[routeName].executeRequest )
                if( !handlerMap && sourceTypes && sourceTypes[routeName] ) {
                    hasExec = sourceTypes[routeName].exec
                    hasPost = sourceTypes[routeName].post
                }

                const capKey = `${ns}/${fileName.replace( '.mjs', '' )}.mjs::${routeName}`
                const cap = captures[capKey]
                const capOk = cap && cap.ok

                const isComplete = hasTests && ( hasOutput || hasExec || ( hasPost && capOk ) )
                if( !isComplete ) {
                    const needsKey = !!( schema.requiredServerParams && schema.requiredServerParams.length > 0 )
                    const entry = `${ns}/${fileName}::${routeName}` + ( needsKey ? ` [KEY: ${schema.requiredServerParams.join( ',' )}]` : '' )

                    if( hasPost && !capOk ) {
                        const reason = cap ? `HTTP ${cap.status}` : 'not captured'
                        categories.postNeedCapture.push( `${entry} (${reason})` )
                    } else if( !hasPost && !hasExec && !hasOutput ) {
                        if( capOk ) {
                            categories.noHandlerHasCapture.push( entry )
                        } else {
                            categories.noHandlerNoOutput.push( entry )
                        }
                    }
                }
            } )
    }
}

console.log( '=== POST HANDLER but no successful capture ===' )
console.log( `(${categories.postNeedCapture.length} routes)` )
categories.postNeedCapture.forEach( ( r ) => console.log( '  ' + r ) )

console.log( '\n=== NO HANDLER, NO OUTPUT (need output schema injection) ===' )
console.log( `(${categories.noHandlerNoOutput.length} routes)` )
categories.noHandlerNoOutput.forEach( ( r ) => console.log( '  ' + r ) )

console.log( '\n=== NO HANDLER but has OK capture (can inject output) ===' )
console.log( `(${categories.noHandlerHasCapture.length} routes)` )
categories.noHandlerHasCapture.forEach( ( r ) => console.log( '  ' + r ) )

console.log( `\nTotal incomplete: ${categories.postNeedCapture.length + categories.noHandlerNoOutput.length + categories.noHandlerHasCapture.length}` )
