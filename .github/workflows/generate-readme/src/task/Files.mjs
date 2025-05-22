import fs from 'fs/promises'
import path from 'path'



class Files {
    static async getAllFiles( { dir } ) {
        const entries = await fs.readdir( dir, { withFileTypes: true } )
        let results = await Promise.all( 
            entries
                .map( async ( entry ) => {
                    const fullPath = path.join( dir, entry.name )
                    if( entry.isDirectory() ) { return await Files.getAllFiles( { dir: fullPath } )
                    } else { return { fullPath, 'name': entry.name } }
                } )
        )
     
        results = results
            .flat()
            .filter( ( { fullPath } ) => fullPath.endsWith( '.mjs' ) )
            .map( ( { fullPath, name } ) => {
                const schemaFolder = path.basename( path.dirname( fullPath ) ) 
                const schemaName = path.basename( name, '.mjs' )
                return { fullPath, name, schemaFolder, schemaName }
            } )
    
        return results
    }


    static async getSchemaDetails( { files } ) {
        const preparedParams = await files
            .reduce( async( accPromise, file ) => {
                const acc = await accPromise
                const { fullPath, name: fileName, schemaFolder, schemaName } = file
                const { schema } = await import( './../../../../../' + fullPath );
                const { namespace, routes, tags, requiredServerParams } = schema
                const routeNames = Object.keys( routes )
                const result = { schemaFolder, fileName, schemaName, namespace, tags, requiredServerParams, routeNames }
                acc.push( result )

                return acc
            }, Promise.resolve( [] ) )

        return preparedParams
    }
}


export { Files }