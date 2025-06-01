import { SchemaImporter } from "../src/index.mjs"
import { Print } from "./helpers/Print.mjs"

const availableSchemas = await SchemaImporter
    .get( {
        schemaRootFolder: "../schemas/v1.2.0/",
        onlyWithoutImports: false,
        withMetaData: true,
        withSchema: true
    } )

const overview = availableSchemas
    .reduce( ( acc, item, index, arr ) => {
        const { namespace, hasImport, requiredServerParams, schema } = item
        const { routes } = schema
        acc['namespaces'].add( namespace )
        acc['totalFiles'] += 1
        acc['totalRoutes'] += Object.keys( routes ).length
        hasImport ? acc['totalWithImport'] += 1 : null
        requiredServerParams.length > 0 ? acc['totalWithServerParams'] += 1 : null

        if( arr.length - 1 === index ) {
            acc['namespaces'] = Array.from( acc['namespaces'] ).length
        }

        return acc
    }, {
        'namespaces': new Set(),
        'totalFiles': 0,
        'totalRoutes': 0,
        'totalWithImport': 0,
        'totalWithServerParams': 0
    } )


Print
    .headline( 'Schema Importer Overview')
    .header()

Object
    .entries( overview )
    .forEach(( [ key, value ] ) => Print.row( { key, value } ) ) 