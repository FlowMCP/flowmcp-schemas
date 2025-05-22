import path from 'path'
import { FlowMCP, Validation } from 'flowmcp'

import { getSchemas, getAllServerParams } from './helpers/utils.mjs'
import { Print } from './helpers/Print.mjs'


const { envPath, delayInMs, filePaths } = {
    'envPath': `./../../.env`,
    'delayInMs': 1000,
    'filePaths': [
        './old/2-generate-indicators/output/all',
        './old/5-defilama/',
        './old/6-twitter/',
        './old/7-reddit/',
        './old/8-coinstats/',
        './old/9-jupiter/',
        './old/10-polymarket/',
        './schemas/v1.2.0/poap',
        './old/13-glassnode/',
        './old/15-context-7/'
    ]
}

const dirPath = filePaths[ 9 ]
getSchemas( { dirPath } )
    .reduce( ( promise, _schema ) => promise.then( async () => {
        const { path: schemaPath } = _schema
        const { schema } = await import( schemaPath )
        const { name } = schema

        const validation = Validation.schema( { schema } )
        if( !validation ) { Print.warn('⚠️ Schema validation failed.\n'); return }

        const shortPath = schemaPath.split("schemas/")[ 1 ] || path.basename( schemaPath )
        Print.log( `\n📦 ${shortPath} → ${name}` )

        const { allServerParams: serverParams } = await 
            getAllServerParams( { 'schemas': [ _schema ],  envPath } )

        Print.headline()
        await FlowMCP
            .getAllTests( { schema } )
            .reduce( ( testPromise, test ) => testPromise.then( async () => {
                const { routeName, userParams } = test
                const { status, messages, dataAsString, data } = await FlowMCP
                    .fetch({ schema, userParams, routeName, serverParams } )
                Print.row( { status, messages, dataAsString, routeName } )
                await Print.delay( delayInMs )
            } ), Promise.resolve() )
    } ), Promise.resolve() )