import fs from "fs"
import { SchemaImporter } from "../../src/index.mjs"
import path from "path"


const config = {
    'excludeSchemasWithImports': true,
    'excludeSchemasWithRequiredServerParams': true,
    'addAdditionalMetaData': true
}
const { 
    excludeSchemasWithImports, 
    excludeSchemasWithRequiredServerParams, 
    addAdditionalMetaData 
} = config


let arrayOfSchemas = await SchemaImporter
    .loadFromFolder( {
        excludeSchemasWithImports,
        excludeSchemasWithRequiredServerParams,
        addAdditionalMetaData,
    } )
arrayOfSchemas = arrayOfSchemas
    .map( ( schemaItem ) => {
        const { absolutePath, namespace } = schemaItem
        const relativePath = path.relative( path.resolve( './' ), absolutePath )
        const modulImportPath = 'schemaimporter/' + relativePath
        const internalImport = './../../' + relativePath
        const filename = relativePath.split('/').pop().replace( '.mjs', '' )
        const id = `${namespace}_${filename}`

        const result = {
            id,
            relativePath,
            modulImportPath,
            internalImport,
            ...schemaItem
        }
        delete result['absolutePath']
        delete result['schema']
        result['loadSchema'] = `{{function_loadSchema_${id}()}}`
        return result
    } )

let content = ''
content += 'const allSchemas = '
content += JSON.stringify( arrayOfSchemas, null, 4 )
content += '\n\n'
arrayOfSchemas
    .forEach( ( { id, internalImport } ) => {
        let value = ''
        value += `async() => {\n`
        value += `\t\t    const { schema } = await import( '${internalImport}' )\n`
        value += `\t\t    return { schema }\n`
        value += `\t\t}`
        content = content.replaceAll(
            `"{{function_loadSchema_${id}()}}"`,
            value
        )
    } )
content += '\nexport { allSchemas }\n'

const staticFilePath = './src/data/static-import.mjs'
fs.writeFileSync(
    staticFilePath,
    content,
    'utf-8'
)


const schemas = await SchemaImporter
    .loadFromFolderStatic( { 
        excludeSchemasWithImports,
        excludeSchemasWithRequiredServerParams,
        addAdditionalMetaData,
        outputType: 'onlySchema' 
    } )
console.log( `Schemas Total: `, schemas.length )
console.log( `Filepath:      ${staticFilePath}` )
console.log( `Schemas:       ${schemas.length}` )
console.log( 'Success!')
// console.log( schema )

import { FlowMCP} from 'flowmcp'
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
const server = new McpServer({
    name: "FlowMCP Schema Server",
    version: "1.0.0",
});
schemas
    .forEach( ( schema ) => {
        console.log( 'Schema: ', schema.namespace )
        FlowMCP.activateServerTools({
            server,
            schema,
            serverParams: []
        } )
    } )



