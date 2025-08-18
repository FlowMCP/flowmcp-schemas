import fs from 'fs'
import path from 'path'


class SchemaLoader {
    static async loadAllNewSchemas( { baseDir = './tests/new-schemas/' } = {} ) {
        const schemaFiles = SchemaLoader.#findSchemaFiles( baseDir )
        const loadResults = []

        for( const schemaFile of schemaFiles ) {
            try {
                const loadResult = await SchemaLoader.loadSingleSchema( { schemaFile } )
                loadResults.push( loadResult )
            } catch( error ) {
                loadResults.push( {
                    schemaFile: schemaFile,
                    namespace: null,
                    schema: null,
                    loadError: error.message,
                    loaded: false
                } )
            }
        }

        return loadResults
    }


    static async loadSingleSchema( { schemaFile } ) {
        const absolutePath = path.resolve( schemaFile )
        
        if( !fs.existsSync( absolutePath ) ) {
            throw new Error( `Schema file not found: ${schemaFile}` )
        }

        try {
            // Dynamic import der Schema-Datei
            const { schema } = await import( `file://${absolutePath}` )
            
            if( !schema ) {
                throw new Error( `No schema export found in ${schemaFile}` )
            }

            return {
                schemaFile: schemaFile,
                namespace: schema.namespace || 'unknown',
                schema: schema,
                loadError: null,
                loaded: true
            }
        } catch( error ) {
            // Syntax-Fehler oder andere Import-Probleme
            throw new Error( `Failed to load schema from ${schemaFile}: ${error.message}` )
        }
    }


    static #findSchemaFiles( baseDir ) {
        const schemaFiles = []
        
        function scanDirectory( dir ) {
            if( !fs.existsSync( dir ) ) {
                return
            }

            const items = fs.readdirSync( dir, { withFileTypes: true } )
            
            items.forEach( item => {
                const fullPath = path.join( dir, item.name )
                
                if( item.isDirectory() ) {
                    // Rekursiv in Unterverzeichnisse
                    scanDirectory( fullPath )
                } else if( item.isFile() && item.name.endsWith( '.mjs' ) ) {
                    // Nur .mjs Dateien sammeln
                    schemaFiles.push( fullPath )
                }
            } )
        }

        scanDirectory( baseDir )
        
        // Sortiere für konsistente Reihenfolge
        return schemaFiles.sort()
    }


    static getSchemaStats( { loadResults } ) {
        const stats = {
            total_files: loadResults.length,
            loaded_successfully: 0,
            load_errors: 0,
            namespaces: new Set(),
            directories: new Set(),
            load_error_files: []
        }

        loadResults.forEach( result => {
            if( result.loaded ) {
                stats.loaded_successfully++
                if( result.namespace ) {
                    stats.namespaces.add( result.namespace )
                }
            } else {
                stats.load_errors++
                stats.load_error_files.push( {
                    file: result.schemaFile,
                    error: result.loadError
                } )
            }

            // Verzeichnis extrahieren
            const dir = path.dirname( result.schemaFile )
            stats.directories.add( dir )
        } )

        // Sets zu Arrays konvertieren für JSON-Serialisierung
        stats.namespaces = Array.from( stats.namespaces ).sort()
        stats.directories = Array.from( stats.directories ).sort()

        return stats
    }


    static filterSchemas( { loadResults, includeNamespaces = [], excludeNamespaces = [], onlyValid = false } ) {
        let filtered = loadResults.filter( result => result.loaded )

        if( includeNamespaces.length > 0 ) {
            filtered = filtered.filter( result => 
                includeNamespaces.includes( result.namespace )
            )
        }

        if( excludeNamespaces.length > 0 ) {
            filtered = filtered.filter( result => 
                !excludeNamespaces.includes( result.namespace )
            )
        }

        if( onlyValid ) {
            // Hier könnten wir eine Schnellvalidierung durchführen
            // Für jetzt lassen wir alle geladenen Schemas durch
        }

        return filtered
    }


    static groupByDirectory( { loadResults } ) {
        const grouped = {}

        loadResults.forEach( result => {
            const dir = path.dirname( result.schemaFile )
            const dirName = path.basename( dir )
            
            if( !grouped[dirName] ) {
                grouped[dirName] = {
                    directory: dir,
                    schemas: []
                }
            }
            
            grouped[dirName].schemas.push( result )
        } )

        return grouped
    }


    static formatLoadReport( { loadResults, verbose = false } ) {
        const stats = SchemaLoader.getSchemaStats( { loadResults } )
        let output = []

        output.push( `\n📁 Schema Loading Report` )
        output.push( `${'─'.repeat(50)}` )
        output.push( `Total Files Found: ${stats.total_files}` )
        output.push( `✅ Loaded Successfully: ${stats.loaded_successfully}` )
        output.push( `❌ Load Errors: ${stats.load_errors}` )
        output.push( `📂 Directories: ${stats.directories.length}` )
        output.push( `🏷️  Unique Namespaces: ${stats.namespaces.length}` )

        if( stats.load_errors > 0 ) {
            output.push( `\n❌ Load Errors:` )
            output.push( `${'─'.repeat(30)}` )
            stats.load_error_files.forEach( ( errorInfo, index ) => {
                output.push( `${index + 1}. ${errorInfo.file}` )
                output.push( `   Error: ${errorInfo.error}` )
            } )
        }

        if( verbose ) {
            output.push( `\n📂 By Directory:` )
            output.push( `${'─'.repeat(30)}` )
            const grouped = SchemaLoader.groupByDirectory( { loadResults } )
            Object.entries( grouped ).forEach( ( [ dirName, info ] ) => {
                const loadedCount = info.schemas.filter( s => s.loaded ).length
                const totalCount = info.schemas.length
                output.push( `${dirName}: ${loadedCount}/${totalCount} schemas` )
                
                if( verbose ) {
                    info.schemas.forEach( schema => {
                        const status = schema.loaded ? '✅' : '❌'
                        output.push( `   ${status} ${schema.namespace || 'unknown'} (${path.basename( schema.schemaFile )})` )
                    } )
                }
            } )

            output.push( `\n🏷️  Namespaces:` )
            output.push( `${'─'.repeat(30)}` )
            stats.namespaces.forEach( namespace => {
                output.push( `   • ${namespace}` )
            } )
        }

        return output.join( '\n' )
    }
}


export { SchemaLoader }