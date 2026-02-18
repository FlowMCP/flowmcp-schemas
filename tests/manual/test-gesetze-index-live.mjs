// Live test for Gesetze aus dem Internet — Law Index v2.0.0 — all 3 routes
// No API key required — public static site
import { Pipeline } from '../../../flowmcp-core/src/v2/task/Pipeline.mjs'
import { Fetch } from '../../../flowmcp-core/src/v2/task/Fetch.mjs'
import { resolve } from 'node:path'


const schemasDir = resolve( import.meta.dirname, '../../schemas/v2.0.0' )

const testRoutes = [
    { route: 'searchLaws', params: { q: 'Grundgesetz', limit: 5 } },
    { route: 'searchLaws', params: { q: 'BGB', limit: 5 } },
    { route: 'searchLaws', params: { q: 'Straf', limit: 10 } },
    { route: 'searchLaws', params: { q: 'HGB', limit: 5 } },
    { route: 'getLawList', params: { limit: 10 } },
    { route: 'getLawList', params: { letter: 'G', limit: 10 } },
    { route: 'getLawList', params: { letter: 'S', limit: 10 } },
    { route: 'getIndexStats', params: {} }
]

let passed = 0
let failed = 0
const total = testRoutes.length

console.log( `\n  Gesetze aus dem Internet — Law Index v2.0.0 Live Test (${total} routes)\n` )

const filePath = resolve( schemasDir, 'gesetze-de/law-index.mjs' )
let pipeline = null

try {
    pipeline = await Pipeline.load( { filePath } )
} catch( err ) {
    console.log( `  FAIL  Pipeline.load error: ${err.message}` )
    process.exit( 1 )
}

if( !pipeline['status'] ) {
    console.log( `  FAIL  Pipeline validation: ${pipeline['messages'].join( ', ' )}` )
    process.exit( 1 )
}

const { main, handlerMap } = pipeline

const routeResults = testRoutes
    .map( async ( { route, params } ) => {
        const paramSummary = Object.keys( params ).length > 0
            ? ` (${Object.entries( params ).map( ( [ k, v ] ) => `${k}=${v}` ).join( ', ' )})`
            : ''
        const label = `${route}${paramSummary}`

        try {
            const { struct } = await Fetch.execute( {
                main,
                handlerMap,
                userParams: params,
                serverParams: {},
                routeName: route
            } )

            if( !struct['status'] ) {
                console.log( `  FAIL  ${label}` )
                struct['messages']
                    .forEach( ( msg ) => {
                        console.log( `        ${msg}` )
                    } )
                failed++

                return
            }

            const dataKeys = struct['data'] ? Object.keys( struct['data'] ) : []
            const preview = dataKeys.slice( 0, 5 ).join( ', ' )
            console.log( `  PASS  ${label}  [${preview}]` )
            passed++
        } catch( err ) {
            console.log( `  FAIL  ${label} — ${err.message}` )
            failed++
        }
    } )

await Promise.all( routeResults )

console.log( `\n  Results: ${passed}/${total} passed, ${failed} failed\n` )

if( failed > 0 ) {
    process.exit( 1 )
}
