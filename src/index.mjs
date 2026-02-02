import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


class SchemaImporter {
    static async loadFromFolder( {
        schemaRootFolder = "./../schemas/v1.2.0/",
        excludeSchemasWithImports = true,
        excludeSchemasWithRequiredServerParams = false,
        addAdditionalMetaData = false,
        outputType = null // [ 'onlyPath', 'onlySchema' ]
    } ) {
        let schemas = []
        schemas = SchemaImporter.#getSchemaPaths( { schemaRootFolder } )
        schemas = SchemaImporter.#addHasImports( { schemas, excludeSchemasWithImports } )
        if( outputType === 'onlyPath' ) { return schemas }

        schemas = await SchemaImporter.#addSchemas( { schemas } )
        schemas = SchemaImporter.#excludeSchemasWithRequiredServerParams( { schemas, excludeSchemasWithRequiredServerParams } )
        schemas = SchemaImporter.#addSchemaMetaData( { schemas, addAdditionalMetaData } )
        if( outputType === 'onlySchema' ) { schemas = schemas.map( ( item ) => item['schema'] ) }

        return schemas
    } 


    static async loadFromFolderStatic( {
        schemaRootFolder = "./../schemas/v1.2.0/",
        excludeSchemasWithImports = true,
        excludeSchemasWithRequiredServerParams = false,
        addAdditionalMetaData = false,
        outputType = null // [ 'onlyPath', 'onlySchema' ]
    } ) {
        const { allSchemas } = await import( './data/static-import.mjs' )
        let schemas = allSchemas
            .filter( ( { relativePath } ) => relativePath.includes( schemaRootFolder.replace( './../schemas/', '' ) ) )
            .filter( ( { hasImport } ) => excludeSchemasWithImports === true ? hasImport === false : true )
            .filter( ( { requiredServerParams } ) => excludeSchemasWithRequiredServerParams === true ? ( requiredServerParams.length === 0 ) : true )
        if( outputType === 'onlyPath' ) { return schemas }

        let index = 0
        for( const { loadSchema } of schemas ) {
            const { schema } = await loadSchema()
            schemas[ index ]['schema'] = schema
            index++
        }
        if( outputType === 'onlySchema' ) { schemas = schemas.map( ( item ) => item['schema'] ) }

        return schemas
    }


    static #getSchemaPaths( { schemaRootFolder } ) {
        const __filename = fileURLToPath( import.meta.url )
        const __dirname = path.dirname( __filename )
        const schemaPath = path.resolve( __dirname, schemaRootFolder )

        if( !fs.existsSync( schemaPath ) ) {
            throw new Error( `Schema root folder does not exist: ${schemaPath}` )
        }

        const result = this.#getAllFiles( { dirPath: schemaPath } )
            .filter( ( file ) => !file.endsWith( '.DS_Store' ) )
            .map( ( file ) => ( {
                folderName: path.basename( path.dirname( file ) ),
                absolutePath: path.resolve( file )
            } ) )
            .filter( ( { absolutePath } ) => absolutePath.endsWith( '.mjs' ) )
            .filter( ( { absolutePath } ) => !absolutePath.includes( '/_shared/' ) )
        
        return result
    }


    static #addHasImports( { schemas, excludeSchemasWithImports } ) {
        schemas = schemas
            .map( ( schema ) => {
                const { absolutePath } = schema
                const hasImport = fs
                    .readFileSync(absolutePath, "utf-8")
                    .split("\n")
                    .some( ( line ) => {
                        const trimmed = line.trim()
                        const isStaticImport = trimmed.startsWith( "import " )
                        const isSharedImport = trimmed.includes( '_shared/' )
                        const isDynamicImport =
                            line.indexOf( "import(" ) !== -1 ||
                            line.indexOf( "import (" ) !== -1
                        return ( isStaticImport && !isSharedImport ) || isDynamicImport
                    } )
                schema['hasImport'] = hasImport

                return schema
            } )
            .filter( ( schema ) => {
                if( excludeSchemasWithImports === true ) {
                    const { hasImport } = schema
                    if( hasImport === true ) { return false }
                }
                return true
            } )

        return schemas
    }


    static async #addSchemas( { schemas, withSchema } ) {
        const result = await Promise.all(
            schemas
                .map( async ( item ) => {
                    const { absolutePath } = item
                    const { schema } = await import( absolutePath )
                    item['schema'] = schema
                    return item
                } )
        )

        return result
    }


    static #addSchemaMetaData( { schemas,  addAdditionalMetaData } ) {
        if( addAdditionalMetaData === false ) { return schemas }

        schemas = schemas
            .map( ( item ) => {
                const { schema, absolutePath } = item
                const { namespace, routes, tags, requiredServerParams } = schema
                item = { ...item, namespace, tags, requiredServerParams }
                item['routeNames'] = Object.keys( routes )
                item['schemaFolder'] = path.basename( path.dirname( absolutePath ) ) 
                item['schemaName'] = path.basename( absolutePath, '.mjs' )
                item['fileName'] = path.basename( absolutePath )
                return item
            } )

        return schemas
    }


    static #getAllFiles( { dirPath, arrayOfFiles = [] }) {
        const files = fs.readdirSync( dirPath )
        files
            .filter( ( file ) => !file.endsWith( '.DS_Store' ) )
            .forEach( ( file ) => {
                const fullPath = path.join( dirPath, file )
                if( fs.statSync( fullPath ).isDirectory() ) {
                    this.#getAllFiles( { dirPath: fullPath, arrayOfFiles } )
                } else {
                    arrayOfFiles.push( fullPath )
                }
            } )

        return arrayOfFiles
    }


    static #excludeSchemasWithRequiredServerParams( { schemas, excludeSchemasWithRequiredServerParams } ) {
        if( excludeSchemasWithRequiredServerParams === false ) { return schemas }
        schemas = schemas
            .filter( ( item ) => {
                const { schema: { requiredServerParams } } = item
                if( !requiredServerParams ) { 
                    console.log( `Schema ${item.fileName} has no requiredServerParams` ); 
                    return false 
                }
                if( requiredServerParams.length > 0 ) {
                    return false 
                }
                return true
            } )

        return schemas
    }
}


export { SchemaImporter }