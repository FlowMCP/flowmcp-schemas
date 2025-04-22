import { getSchemas, getEnv, getAllServerParams } from './helpers/utils.mjs'
import { FlowMCP } from 'flowmcp'


const dirPath = './schemas'
const schemas = getSchemas( { dirPath } )
    .filter( a => !a.path.includes( 'whale-alert'))
const { allServerParams } = await getAllServerParams( { 
    schemas,
    'envPath': `./../../../.env`
} )

const _tests = []
await Promise.all( 
    schemas
    .map( async ( _schema ) => {
        const { schema } = await import( _schema.path )
        const tests = FlowMCP.getAllTests( { schema } )
        console.log( 'tests', tests )
    } )
)




/*
for( const _schema of schemas ) {
    const { folderName, path } = _schema
    console.log( `FolderName: ${folderName}` )
    const { schema } = await import( path )
    const tests = FlowMCP.getAllTests( { schema } )
    const { requiredServerParams } = schema
console.log( `Required Server Params: ${requiredServerParams}` )
    const serverParams = getEnv( {
        'path': `./../../../.env`,
        'selection': requiredServerParams.map( ( param ) => [ param, param ] )
    })
    console.log( serverParams )


    const { routeName, description, userParams } = tests[ 0 ]
    
    const { status, messages, data } = await FlowMCP
        .fetch( { schema, userParams, serverParams, routeName
        } )
    console.log( `Status ${status}` )
}
*/



