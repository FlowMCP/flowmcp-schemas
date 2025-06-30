import fs from 'fs'

import { SchemaImporter } from "../src/index.mjs"
import { FlowMCP } from 'flowmcp'
import { Print } from "./helpers/Print.mjs"


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
        excludeSchemasWithImports: false,
        excludeSchemasWithRequiredServerParams: false,
        addAdditionalMetaData: true
    } )
const filteredSchemas = availableSchemas
    .filter( ( item ) => item['schema']['namespace'] === 'chainlinkMulticall' )

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