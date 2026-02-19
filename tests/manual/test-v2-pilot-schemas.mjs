import { Pipeline } from '../../../flowmcp-core/src/v2/task/Pipeline.mjs'
import { MainValidator } from '../../../flowmcp-core/src/v2/task/MainValidator.mjs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'


const schemasDir = resolve( import.meta.dirname, '../../schemas/v2.0.0' )

const pilotSchemas = [
    { name: 'berlin-de/events.mjs', hasHandlers: false },
    { name: 'coincap/assets.mjs', hasHandlers: false },
    { name: 'dune-analytics/getResults.mjs', hasHandlers: true }
]

let passed = 0
let failed = 0

console.log( '\n  v2.0.0 Pilot Schema Verification\n' )

const results = pilotSchemas
    .map( async ( { name, hasHandlers } ) => {
        const filePath = resolve( schemasDir, name )
        const fileUrl = pathToFileURL( filePath ).href

        try {
            const mod = await import( fileUrl )
            const { main } = mod

            const { status, messages } = MainValidator
                .validate( { main } )

            if( !status ) {
                console.log( `  FAIL  ${name}` )
                messages
                    .forEach( ( msg ) => {
                        console.log( `        ${msg}` )
                    } )
                failed++

                return
            }

            if( hasHandlers && typeof mod.handlers !== 'function' ) {
                console.log( `  FAIL  ${name} — handlers export is not a function` )
                failed++

                return
            }

            if( hasHandlers ) {
                const handlerMap = mod.handlers( { sharedLists: {}, libraries: {} } )
                const routeNames = Object.keys( main['routes'] )
                const handlerKeys = Object.keys( handlerMap )
                const extraKeys = handlerKeys
                    .filter( ( k ) => !routeNames.includes( k ) )

                if( extraKeys.length > 0 ) {
                    console.log( `  FAIL  ${name} — handler keys not in routes: ${extraKeys.join( ', ' )}` )
                    failed++

                    return
                }
            }

            console.log( `  PASS  ${name}` )
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
