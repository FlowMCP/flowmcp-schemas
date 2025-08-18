import fs from 'fs'

import { SchemaImporter } from "../../src/index.mjs"
import { FlowMCP } from 'flowmcp'
import { Print } from "./../helpers/Print.mjs"


function getServerParams( { path, requiredServerParams } ) {
    const selection = requiredServerParams
        .map( ( serverParam ) => [ serverParam, serverParam ] )

    const result = fs
        .readFileSync( path, 'utf-8' )
        .split( "\n" )
        .map( line => line.split( '=' ) )
        .reduce( ( acc, [ k, v ] ) => {
            const find = selection.find( ( [ _, value ] ) => value === k )
            if( find ) {  acc[ find[ 0 ] ] = v  }
            return acc
        }, {} )

    selection
        .forEach( ( row ) => {
            const [ key, _ ] = row
            if( !result[ key ]  ) { console.log( `Missing ${key} in .env file` ) } 
            return true
        } )

    return result
}


const availableSchemas = await SchemaImporter
    .loadFromFolder( {
        schemaRootFolder: "./../schemas/v1.2.0",
        excludeSchemasWithImports: false,
        excludeSchemasWithRequiredServerParams: false,
        addAdditionalMetaData: true
    } )
const targetNamespace = process.argv[2] || 'chainlinkMulticall'
const filteredSchemas = availableSchemas
    .filter( ( item ) => item['schema']['namespace'] === targetNamespace )

console.log(`Found ${filteredSchemas.length} schemas for namespace: ${targetNamespace}`)
if( filteredSchemas.length === 0 ) {
    console.log('Available namespaces:', availableSchemas.map(s => s.schema.namespace).filter((v, i, a) => a.indexOf(v) === i))
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
                    'path': './../../.env',
                    'requiredServerParams': schema.requiredServerParams
                } )

                const { status, messages, dataAsString } = await FlowMCP
                    .fetch({ schema, userParams, routeName, serverParams } )
                Print.row( { status, messages, dataAsString, routeName } )
                await Print.delay( 1000 )
            } ), Promise.resolve() )
    } ), Promise.resolve() )