import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const V2 = path.resolve( 'schemas/v2.0.0' )
const namespaces = fs.readdirSync( V2 )
    .filter( ( d ) => d !== '_shared' && d[0] !== '.' )
    .filter( ( d ) => fs.statSync( path.join( V2, d ) ).isDirectory() )

let totalRoutes = 0
let withTests = 0
let missingTests = 0
const missingList = []

const processAll = async () => {
    await namespaces.reduce( ( chain, ns ) => chain.then( async () => {
        const files = fs.readdirSync( path.join( V2, ns ) )
            .filter( ( f ) => f.endsWith( '.mjs' ) )
        await files.reduce( ( fc, f ) => fc.then( async () => {
            try {
                const mod = await import( pathToFileURL( path.join( V2, ns, f ) ).href )
                const schema = mod.main || mod.default
                if ( !schema || !schema.routes ) { return }
                Object.entries( schema.routes )
                    .forEach( ( [ name, route ] ) => {
                        totalRoutes++
                        if ( route.tests && Array.isArray( route.tests ) && route.tests.length > 0 ) {
                            withTests++
                        } else {
                            missingTests++
                            missingList.push( `${ns}/${f} → ${name}` )
                        }
                    } )
            } catch ( e ) {
                console.log( `ERR ${ns}/${f}: ${e.message}` )
            }
        } ), Promise.resolve() )
    } ), Promise.resolve() )
}

await processAll()

console.log( `Total routes: ${totalRoutes}` )
console.log( `With tests:   ${withTests}` )
console.log( `Missing:      ${missingTests}` )
if ( missingList.length > 0 ) {
    console.log( '' )
    missingList.forEach( ( m ) => console.log( `  MISSING: ${m}` ) )
}
