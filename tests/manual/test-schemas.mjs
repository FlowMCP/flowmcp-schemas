import path from 'path'
import { SchemaImporter } from "../../src/index.mjs"
import { FlowMCP } from 'flowmcp'
import { Print } from './../helpers/Print.mjs'
import { getServerParams, parseSimpleArgvInput } from './../helpers/utils.mjs'


const { envPath, schemaRootFolder, namespace, fileName, verbose } = parseSimpleArgvInput( { 
    argv: process.argv.slice( 2 ),
    defaultEnvPath: '../../.env',
    defaultSchemaRootFolder: './../tests/new-schemas'
} )

if( verbose ) {
    console.log( `🔍 Debug Configuration:` )
    console.log( `  envPath:          ${envPath}` )
    console.log( `  schemaRootFolder: ${schemaRootFolder}` )
    console.log( `  namespace:        ${namespace || 'all'}` )
    console.log( `  fileName:         ${fileName || 'all'}` )
    console.log( '' )
}

const schemaImporterConfig = {
    schemaRootFolder,
    excludeSchemasWithImports: false,
    excludeSchemasWithRequiredServerParams: false,
    addAdditionalMetaData: true
}

const availableSchemas = await SchemaImporter
    .loadFromFolder( schemaImporterConfig )
const filteredSchemas = availableSchemas
    .filter( ( item ) => {
        if( namespace && item['schema']['namespace'].toLowerCase() !== namespace ) {
            return false
        }
        if( fileName && item['fileName'].toLowerCase() !== fileName ) {
            return false
        }
        return true
    } )

console.log( `📦 Found ${filteredSchemas.length} schemas to test` )
if( filteredSchemas.length === 0 ) {
    console.log( 'Available namespaces:', availableSchemas.map( s => s.schema.namespace ).filter( ( v, i, a ) => a.indexOf( v ) === i ) )
    if( namespace ) {
        console.log( `No schema found with namespace: ${namespace}` )
    }
    if( fileName ) {
        console.log( `No schema found with filename: ${fileName}` )
    }
}

await filteredSchemas
    .reduce( ( promise, struct ) => promise.then( async () => {
        const { schema, namespace, fileName } = struct
        Print.log( `\n📦 ${namespace} → ${fileName}` )
        await FlowMCP
            .getAllTests( { schema } )
            .reduce( ( testPromise, test ) => testPromise.then( async () => {
                const { routeName, userParams } = test
                const serverParams = getServerParams( {
                    'path': envPath,
                    'requiredServerParams': schema.requiredServerParams
                } )

                const { status, messages, dataAsString } = await FlowMCP
                    .fetch({ schema, userParams, routeName, serverParams } )
                Print.row( { status, messages, dataAsString, routeName } )
                await Print.delay( 1000 )
            } ), Promise.resolve() )
    } ), Promise.resolve() )