import path from 'path'
import { FlowMCP, Validation } from 'flowmcp'

import { getSchemas, getAllServerParams } from './helpers/utils.mjs'
import { Print } from './helpers/Print.mjs'


const { schemaRootFolder, envPath, delayInMs } = {
    'schemaRootFolder': './schemas/v1.2.0/',
    'envPath': `./../../.env`,
    'delayInMs': 1000,
}

getSchemas( { dirPath: schemaRootFolder } )
    .filter( ( a ) => {
        const filePath = a.path
        const dirName = path.dirname( filePath )
        const lastFolder = path.basename( dirName )
        return lastFolder.substring( 0, 1 ).toLowerCase() > 'm' 
    } )
    .reduce( ( promise, _schema ) => promise.then( async () => {
        const { path: schemaPath } = _schema
        const { schema } = await import( schemaPath )
        const { name } = schema

        const validation = Validation.schema( { schema } )
        if( !validation ) { Print.warn('⚠️ Schema validation failed.\n'); return }

        const shortPath = schemaPath.split("schemas/")[1] || path.basename( schemaPath )
        Print.log( `\n📦 ${shortPath} → ${name}` )

        const { allServerParams: serverParams } = await 
            getAllServerParams( { 'schemas': [ _schema ],  envPath } )

        Print.headline()
        await FlowMCP
            .getAllTests( { schema } )
            .reduce( ( testPromise, test ) => testPromise.then( async () => {
                const { routeName, userParams } = test
                const { status, messages, dataAsString } = await FlowMCP
                    .fetch({ schema, userParams, routeName, serverParams } )
                Print.row( { status, messages, dataAsString, routeName } )
                await Print.delay( delayInMs )
            } ), Promise.resolve() )
    } ), Promise.resolve() )