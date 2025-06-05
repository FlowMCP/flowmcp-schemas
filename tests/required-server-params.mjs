import { SchemaImporter } from "../src/index.mjs"


const availableSchemas = await SchemaImporter
    .loadFromFolder( {
        excludeSchemasWithImports: false,
        excludeSchemasWithRequiredServerParams: false,
        addAdditionalMetaData: true,
    } )

const item = availableSchemas[ 0 ]
console.log( item )