import { Pipeline } from '../../../flowmcp-core/src/v2/task/Pipeline.mjs'
import { resolve } from 'node:path'


const schemasDir = resolve( import.meta.dirname, '../../schemas/v2.0.0' )

const pilotSchemas = [
    'berlin-de/events.mjs',
    'coincap/assets.mjs',
    'dune-analytics/getResults.mjs'
]

let passed = 0
let failed = 0

console.log( '\n  v2.0.0 Full Pipeline Load Test\n' )

const results = pilotSchemas
    .map( async ( name ) => {
        const filePath = resolve( schemasDir, name )

        try {
            const result = await Pipeline
                .load( { filePath } )

            if( !result['status'] ) {
                console.log( `  FAIL  ${name}` )
                result['messages']
                    .forEach( ( msg ) => {
                        console.log( `        ${msg}` )
                    } )
                failed++

                return
            }

            const routeCount = Object.keys( result['main']['routes'] ).length
            const handlerCount = Object.keys( result['handlerMap'] ).length
            const warningCount = result['warnings'].length

            console.log( `  PASS  ${name}  (${routeCount} routes, ${handlerCount} handlers, ${warningCount} warnings)` )
            passed++
        } catch( err ) {
            console.log( `  FAIL  ${name} — ${err.message}` )
            failed++
        }
    } )

await Promise.all( results )

console.log( `\n  Results: ${passed} passed, ${failed} failed\n` )

if( failed > 0 ) {
    process.exit( 1 )
}
