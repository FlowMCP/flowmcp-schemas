import { FlowMCP } from 'flowmcp'
const { SchemaImporter } = await import( './../../src/index.mjs' )



const schemas = await SchemaImporter
    .loadFromFolderWithImport( { outputType: 'onlySchema' } )

const { filteredArrayOfSchemas } = FlowMCP
    .filterArrayOfSchemas({
        arrayOfSchemas: schemas,
        includeNamespaces: ['cryptocompare', 'coingecko'],
        excludeNamespaces: [],
        activateTags: []
    } )


const item = filteredArrayOfSchemas[ 0 ]
console.log( { item } )