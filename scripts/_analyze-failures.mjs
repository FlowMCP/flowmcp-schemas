import fs from 'fs'
import path from 'path'

const dir = '.captures/v2.0.0'
const failures = []

const walk = ( d ) => {
    fs.readdirSync( d )
        .forEach( ( f ) => {
            const p = path.join( d, f )
            if( fs.statSync( p ).isDirectory() ) { walk( p ); return }
            if( !f.endsWith( '.json' ) ) { return }
            const data = JSON.parse( fs.readFileSync( p, 'utf8' ) )
            if( data.response.status >= 400 || data.response.parseError ) {
                const reason = data.response.parseError || 'HTTP ' + data.response.status + ' ' + data.response.statusText
                failures.push( {
                    ns: data.namespace,
                    schema: data.schema,
                    route: data.route,
                    idx: data.testIndex,
                    reason,
                    url: data.request.url,
                    method: data.request.method,
                    status: data.response.status,
                    rawData: data.response.data
                } )
            }
        } )
}

walk( dir )

// Group by reason category
const categories = {}

failures
    .forEach( ( f ) => {
        let cat = 'other'
        if( f.status === 429 ) { cat = '429-rate-limit' }
        else if( f.status === 400 ) { cat = '400-bad-request' }
        else if( f.status === 404 ) { cat = '404-not-found' }
        else if( f.status === 406 ) { cat = '406-not-acceptable' }
        else if( f.status === 500 ) { cat = '500-server-error' }
        else if( f.reason.includes( 'non-JSON' ) ) { cat = 'non-json' }
        else if( f.reason.includes( 'Unexpected' ) ) { cat = 'parse-error' }

        if( !categories[cat] ) { categories[cat] = [] }
        categories[cat].push( f )
    } )

Object.entries( categories )
    .sort()
    .forEach( ( [ cat, items ] ) => {
        console.log( '\n=== ' + cat.toUpperCase() + ' (' + items.length + ') ===' )
        items
            .forEach( ( f ) => {
                console.log( '  ' + f.ns + '/' + f.schema + ' :: ' + f.route + '[' + f.idx + ']' )
                console.log( '    ' + f.method + ' ' + f.url.slice( 0, 140 ) )
                if( f.rawData && f.rawData._rawText ) {
                    console.log( '    Response: ' + f.rawData._rawText.slice( 0, 150 ) )
                } else if( f.rawData && typeof f.rawData === 'object' ) {
                    const snippet = JSON.stringify( f.rawData ).slice( 0, 150 )
                    console.log( '    Data: ' + snippet )
                }
            } )
    } )

console.log( '\n--- Total: ' + failures.length + ' failures ---' )
