import { SchemaImporter } from './../src/index.mjs'


const allSchemas = await SchemaImporter
    .init( { 
        schemaRootFolder: "../schemas/v1.2.0/", 
        onlyWithoutImports: true,
        withMetaData: false, 
        withSchema: false 
    } )
const selection = SchemaImporter.get()


console.log( 'All schemas imported:', allSchemas )
