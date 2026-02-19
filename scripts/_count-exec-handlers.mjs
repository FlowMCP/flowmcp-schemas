/**
 * Count executeRequest routes in schemas where handler factory crashes
 * due to missing sharedLists/libraries dependencies.
 */
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const V2_DIR = 'schemas/v2.0.0'
const namespaces = fs.readdirSync( V2_DIR )
    .filter( ( d ) => d[0] !== '.' && d !== '_shared' && !d.endsWith( '.md' ) )
    .filter( ( d ) => fs.statSync( path.join( V2_DIR, d ) ).isDirectory() )

let totalExec = 0
let totalPost = 0
const results = []

for ( const ns of namespaces ) {
    const files = fs.readdirSync( path.join( V2_DIR, ns ) ).filter( ( f ) => f.endsWith( '.mjs' ) )
    for ( const f of files ) {
        const filePath = path.join( V2_DIR, ns, f )
        const content = fs.readFileSync( filePath, 'utf8' )

        // Try to load handlers
        let mod
        try { mod = await import( pathToFileURL( path.resolve( filePath ) ).href ) } catch { continue }
        if ( !mod.handlers || typeof mod.handlers !== 'function' ) { continue }

        let handlerMap = null
        try {
            handlerMap = mod.handlers( { sharedLists: {}, libraries: {} } )
        } catch {
            // Handler crashed - analyze source code instead
            const schema = mod.main || mod.default
            if ( !schema || !schema.routes ) { continue }

            const routeNames = Object.keys( schema.routes )
            const execMatches = content.match( /executeRequest:\s*async/g ) || []
            const postMatches = content.match( /postRequest:\s*async/g ) || []

            // Try to match route names to handler types via source
            let execCount = 0
            let postCount = 0

            routeNames.forEach( ( routeName ) => {
                // Check if this route has executeRequest or postRequest in source
                const routePattern = new RegExp( routeName + '\\s*:\\s*\\{[^}]*executeRequest' )
                const postPattern = new RegExp( routeName + '\\s*:\\s*\\{[^}]*postRequest' )
                if ( routePattern.test( content ) ) { execCount++ }
                else if ( postPattern.test( content ) ) { postCount++ }
            } )

            if ( execCount > 0 || postCount > 0 ) {
                results.push( `${ns}/${f} → ${execCount} exec, ${postCount} post (handler crashed, source-analyzed)` )
                totalExec += execCount
                totalPost += postCount
            }
        }
    }
}

results.forEach( ( r ) => console.log( r ) )
console.log( `\nTotal crashed-handler routes: exec=${totalExec}, post=${totalPost}` )
