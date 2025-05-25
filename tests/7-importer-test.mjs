import { SchemaImporter } from './../src/index.mjs'


const allSchemas = await SchemaImporter.init()
const selection = SchemaImporter.get( { 'selection': [] } )


console.log( 'All schemas imported:', allSchemas )
