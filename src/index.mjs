import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


class SchemaImporter {
    static #schemas = []


    static get() {
        return this.#schemas
    } 


    static async init( { 
        schemaRootFolder="../schemas/v1.2.0/", 
        withMetaData=true, 
        withSchema=false } = {} 
    ) {
        const __filename = fileURLToPath( import.meta.url )
        const __dirname = path.dirname( __filename )
        const schemaPath = path.resolve( __dirname, schemaRootFolder )

        if( !fs.existsSync( schemaPath ) ) {
            throw new Error( `Schema root folder does not exist: ${schemaPath}` )
        }

        const schemas = this
            .#getSchemas( { 'dirPath': schemaPath } )
            .filter( ( { absolutePath } ) => absolutePath.endsWith( '.mjs' ) )

        if( schemas.length === 0 ) {
            throw new Error( `No schemas found in the directory: ${schemaPath}` )
        }

        if( !withMetaData ) { 
            this.#schemas = schemas
            return true
        }

        const schemasWithMeta = await this
            .#getMetaData( { schemas, withSchema } )
        this.#schemas = schemasWithMeta

        return schemasWithMeta
    }


    static async #getMetaData( { schemas, withSchema } ) {
        const all = await Promise.all(
            schemas
                .map( async ( { folderName, absolutePath } ) => {
                    const { schema } = await import( absolutePath )
                    const { namespace, routes, tags, requiredServerParams } = schema
                    const routeNames = Object.keys( routes )
                    const schemaFolder = path.basename( path.dirname( absolutePath ) ) 
                    const schemaName = path.basename( absolutePath, '.mjs' )
                    const fileName = path.basename( absolutePath )

                    const result = { schemaFolder, fileName, schemaName, namespace, tags, requiredServerParams, routeNames }
                    withSchema ? result['schema'] = schema : null

                    return result
                } )
        )

        return all
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


    static #getSchemas( { dirPath } ) {
        const result = this.#getAllFiles( { dirPath } )
            .filter( ( file ) => !file.endsWith( '.DS_Store' ) )
            .map( ( file ) => ( {
                folderName: path.basename( path.dirname( file ) ),
                absolutePath: path.resolve( file )
            } ) )

        return result
    }
}


export { SchemaImporter }