// Live test for DESTATIS v2.0.0 schemas — catalogue + data
// Runs each route's first test case through the full v2 pipeline
import { Pipeline } from '../../../flowmcp-core/src/v2/task/Pipeline.mjs'
import { Fetch } from '../../../flowmcp-core/src/v2/task/Fetch.mjs'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'


const envPath = resolve( import.meta.dirname, '../../../../flowmcp-core.env' )
const envContent = readFileSync( envPath, 'utf-8' )
const serverParams = {}

envContent
    .split( '\n' )
    .filter( ( line ) => line.trim() && !line.startsWith( '#' ) )
    .forEach( ( line ) => {
        const idx = line.indexOf( '=' )
        if( idx === -1 ) { return }
        const key = line.slice( 0, idx ).trim()
        const value = line.slice( idx + 1 ).trim()
        serverParams[ key ] = value
    } )


const schemasDir = resolve( import.meta.dirname, '../../schemas/v2.0.0' )

const testSchemas = [
    {
        file: 'destatis/catalogue.mjs',
        routes: [
            { route: 'search', params: { term: 'Bevoelkerung' } },
            { route: 'listTables', params: { selection: '12411*', pagelength: 5 } },
            { route: 'listStatistics', params: { selection: '*', pagelength: 5 } },
            { route: 'getTableMetadata', params: { name: '12411-0001' } },
            { route: 'getStatisticMetadata', params: { name: '12411' } },
            { route: 'getQualitySigns', params: {} }
        ]
    },
    {
        file: 'destatis/data.mjs',
        routes: [
            { route: 'getTableData', params: { name: '12411-0001', startyear: '2023', endyear: '2023' } },
            { route: 'getVariableMetadata', params: { name: 'BEVSTD' } },
            { route: 'listVariables', params: { selection: 'BEV*', pagelength: 10 } },
            { route: 'listValues', params: { selection: 'BEVSTD*', pagelength: 10 } }
        ]
    }
]

let passed = 0
let failed = 0
const total = testSchemas
    .reduce( ( acc, s ) => acc + s.routes.length, 0 )

console.log( `\n  DESTATIS v2.0.0 Live Test (${total} routes)\n` )

const schemaResults = testSchemas
    .map( async ( { file, routes } ) => {
        const filePath = resolve( schemasDir, file )

        let pipeline = null
        try {
            pipeline = await Pipeline.load( { filePath } )
        } catch( err ) {
            console.log( `  FAIL  ${file} — Pipeline.load error: ${err.message}` )
            failed += routes.length

            return
        }

        if( !pipeline['status'] ) {
            console.log( `  FAIL  ${file} — Pipeline validation: ${pipeline['messages'].join( ', ' )}` )
            failed += routes.length

            return
        }

        const { main, handlerMap } = pipeline

        const routeResults = routes
            .map( async ( { route, params } ) => {
                const label = `${file} → ${route}`
                try {
                    const { struct } = await Fetch.execute( {
                        main,
                        handlerMap,
                        userParams: params,
                        serverParams,
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
    } )

await Promise.all( schemaResults )

console.log( `\n  Results: ${passed}/${total} passed, ${failed} failed\n` )

if( failed > 0 ) {
    process.exit( 1 )
}
