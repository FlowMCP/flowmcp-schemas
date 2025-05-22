

import { getAllServerParams } from './helpers/utils.mjs'
import { FlowMCP } from 'flowmcp'
import { Print } from './helpers/Print.mjs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )
const { schemaPath, envPath } = {
    'schemaPath': path.resolve( __dirname, './../schemas/v1.2.0/defilama/api.mjs' ),
    'envPath': `./../../.env`,
}

const { allServerParams: serverParams } = await getAllServerParams( {
    'schemas': [ { 'path': schemaPath } ], 
    envPath 
} )
const { schema } = await import( schemaPath )
const tests = FlowMCP.getAllTests( { schema } )

Print.headline()
await FlowMCP
    .getAllTests( { schema } )
    .reduce( ( testPromise, test ) => testPromise.then( async () => {
        const { routeName, userParams } = test
        const { status, messages, dataAsString } = await FlowMCP
            .fetch({ schema, userParams, routeName, serverParams } )
        Print.row( { status, messages, dataAsString, routeName } )
        await Print.delay( 1000 )
    } ), Promise.resolve() )


