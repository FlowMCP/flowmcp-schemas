import { SchemaImporter } from "../src/index.mjs"


await [
    { excludeSchemasWithImports: true,  excludeSchemasWithRequiredServerParams: true,  _description: '' },
    { excludeSchemasWithImports: true,  excludeSchemasWithRequiredServerParams: false, _description: '' },
    { excludeSchemasWithImports: false, excludeSchemasWithRequiredServerParams: true,  _description: '' },
    { excludeSchemasWithImports: false, excludeSchemasWithRequiredServerParams: false, _description: '' }
]
    .reduce( ( promise, struct ) => promise.then( async () => {
        const { excludeSchemasWithImports, excludeSchemasWithRequiredServerParams, _description } = struct
        const availableSchemas = await SchemaImporter
            .loadFromFolder( {
                excludeSchemasWithImports,
                excludeSchemasWithRequiredServerParams,
                addAdditionalMetaData: true,
            } )

        console.log(`Schemas imported (${_description ?? 'No description'}): ${availableSchemas.length}`);
    } ), Promise.resolve() )