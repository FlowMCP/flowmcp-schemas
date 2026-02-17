// Live test for service.bund.de Tenders v2.0.0 — all 6 routes
// No API key required — public RSS feed
import { Pipeline } from '../../../flowmcp-core/src/v2/task/Pipeline.mjs'
import { Fetch } from '../../../flowmcp-core/src/v2/task/Fetch.mjs'
import { resolve } from 'node:path'


const schemasDir = resolve( import.meta.dirname, '../../schemas/v2.0.0' )

const testRoutes = [
    { route: 'searchTenders', params: { limit: 5 } },
    { route: 'searchTenders', params: { keyword: 'Software', state: 'berlin', limit: 5 } },
    { route: 'searchTenders', params: { category: 'bauleistungen', limit: 5 } },
    { route: 'getTendersByState', params: { state: 'berlin', limit: 5 } },
    { route: 'getTendersByState', params: { state: 'hamburg', keyword: 'IT', limit: 5 } },
    { route: 'getTendersByCategory', params: { category: 'informationstechnik', limit: 5 } },
    { route: 'getTendersByCategory', params: { category: 'dienstleistungen', state: 'bayern', limit: 5 } },
    { route: 'getAwardedContracts', params: { limit: 5 } },
    { route: 'getAwardedContracts', params: { state: 'berlin', limit: 5 } },
    { route: 'searchByKeyword', params: { keyword: 'Software', limit: 5 } },
    { route: 'searchByKeyword', params: { keyword: 'Reinigung', limit: 5 } },
    { route: 'getRecentTenders', params: { limit: 10 } },
    { route: 'getRecentTenders', params: { limit: 5 } }
]

let passed = 0
let failed = 0
const total = testRoutes.length

console.log( `\n  service.bund.de Tenders v2.0.0 Live Test (${total} routes)\n` )

const filePath = resolve( schemasDir, 'service-bund-de/tenders.mjs' )
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

            const itemCount = struct['data']?.items?.length ?? 0
            const type = struct['data']?.type || ''
            const firstTitle = itemCount > 0 ? struct['data'].items[0].title.substring( 0, 50 ) : 'no items'
            console.log( `  PASS  ${label}  [${type}, ${itemCount} items, "${firstTitle}..."]` )
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
