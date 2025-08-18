import fs from 'fs'
import path from 'path'

import { FlowMCP } from 'flowmcp'
import { Print } from "../helpers/Print.mjs"


function getServerParams( { path, requiredServerParams } ) {
    const selection = requiredServerParams
        .map( ( serverParam ) => [ serverParam, serverParam ] )

    const result = fs
        .readFileSync( path, 'utf-8' )
        .split( "\n" )
        .map( line => line.split( '=' ) )
        .reduce( ( acc, [ k, v ] ) => {
            const find = selection.find( ( [ _, value ] ) => value === k )
            if( find ) {  acc[ find[ 0 ] ] = v  }
            return acc
        }, {} )

    selection
        .forEach( ( row ) => {
            const [ key, _ ] = row
            if( !result[ key ]  ) { console.log( `Missing ${key} in .env file` ) } 
            return true
        } )

    return result
}


async function loadAllNewSchemas( { baseDir = './tests/new-schemas/' } ) {
    const schemas = []
    
    function findSchemaFiles( { dir } ) {
        const entries = fs.readdirSync( dir, { withFileTypes: true } )
        
        entries
            .forEach( ( entry ) => {
                const fullPath = path.join( dir, entry.name )
                
                if( entry.isDirectory() ) {
                    findSchemaFiles( { dir: fullPath } )
                } else if( entry.name.endsWith( '.mjs' ) ) {
                    schemas.push( fullPath )
                }
            } )
    }
    
    findSchemaFiles( { dir: baseDir } )
    
    const loadedSchemas = []
    
    for( const schemaPath of schemas ) {
        try {
            const module = await import( path.resolve( schemaPath ) )
            const schema = module.schema
            
            if( schema && schema.namespace ) {
                loadedSchemas.push( {
                    schema: schema,
                    namespace: schema.namespace,
                    fileName: path.basename( schemaPath ),
                    filePath: schemaPath
                } )
            } else {
                Print.warn( `Schema in ${schemaPath} has no valid namespace` )
            }
        } catch( error ) {
            Print.warn( `Failed to load schema from ${schemaPath}: ${error.message}` )
        }
    }
    
    return loadedSchemas
}


function findEnvFile() {
    const possiblePaths = [
        './.env',
        '../.env',
        '../../.env',
        '../../../.env'
    ]
    
    for( const envPath of possiblePaths ) {
        if( fs.existsSync( envPath ) ) {
            return envPath
        }
    }
    
    return './.env'
}


function parseCliArgs() {
    const args = process.argv.slice( 2 )
    const options = {
        namespace: null,
        delay: 1000
    }
    
    args
        .forEach( ( arg ) => {
            if( arg.startsWith( '--namespace=' ) ) {
                options.namespace = arg.split( '=' )[1]
            } else if( arg.startsWith( '--delay=' ) ) {
                options.delay = parseInt( arg.split( '=' )[1] ) || 1000
            } else if( arg === '--help' || arg === '-h' ) {
                printHelp()
                process.exit( 0 )
            }
        } )
    
    return options
}


function printHelp() {
    console.log( `
📋 FlowMCP New Schema Tester

Usage: node test-new-schemas.mjs [options]

Options:
  --namespace=NAME     Test only specific namespace
  --delay=MS           Delay between tests in milliseconds (default: 1000)
  --help, -h           Show this help

Examples:
  node test-new-schemas.mjs
  node test-new-schemas.mjs --namespace=berlinBSR
  node test-new-schemas.mjs --delay=500
` )
}


async function runSchemaTests() {
    const options = parseCliArgs()
    
    Print.log( `🔍 Loading schemas from tests/new-schemas/...` )
    
    const allSchemas = await loadAllNewSchemas( { baseDir: './tests/new-schemas/' } )
    
    const filteredSchemas = options.namespace
        ? allSchemas.filter( ( item ) => item.namespace === options.namespace )
        : allSchemas
    
    if( filteredSchemas.length === 0 ) {
        if( options.namespace ) {
            Print.warn( `No schemas found for namespace: ${options.namespace}` )
        } else {
            Print.warn( `No schemas found in tests/new-schemas/` )
        }
        return
    }
    
    Print.log( `📦 Found ${filteredSchemas.length} schemas to test` )
    Print.log( `` )
    
    const envPath = findEnvFile()
    let totalTests = 0
    let successfulTests = 0
    let failedTests = 0
    
    await filteredSchemas
        .reduce( ( promise, struct ) => promise.then( async () => {
            const { schema, namespace, fileName } = struct
            
            Print.log( `📦 ${namespace} → ${fileName}` )
            
            const allTests = FlowMCP.getAllTests( { schema } )
            
            if( allTests.length === 0 ) {
                Print.warn( `  No tests found for ${namespace}` )
                return
            }
            
            await allTests
                .reduce( ( testPromise, test ) => testPromise.then( async () => {
                    const { routeName, userParams } = test
                    totalTests++
                    
                    try {
                        const serverParams = schema.requiredServerParams && schema.requiredServerParams.length > 0
                            ? getServerParams( {
                                'path': envPath,
                                'requiredServerParams': schema.requiredServerParams
                            } )
                            : {}
                        
                        const { status, messages, dataAsString } = await FlowMCP
                            .fetch( { schema, userParams, routeName, serverParams } )
                        
                        // Nur String "null" als Fehler betrachten, leere Arrays sind OK
                        const actualStatus = status && dataAsString !== 'null' && dataAsString !== 'undefined'
                        
                        if( actualStatus ) {
                            successfulTests++
                        } else {
                            failedTests++
                        }
                        
                        // Bessere Fehlermeldung für String "null" Fälle
                        const finalMessages = !status 
                            ? messages // Echte HTTP-Fehler: originale messages verwenden
                            : (dataAsString === 'null' || dataAsString === 'undefined')
                                ? ['API returns string "null" - possibly no data or broken endpoint']
                                : messages
                        
                        Print.row( { 
                            status: actualStatus, 
                            messages: finalMessages, 
                            dataAsString, 
                            routeName 
                        } )
                        
                        await Print.delay( options.delay )
                        
                    } catch( error ) {
                        failedTests++
                        Print.row( { 
                            status: false, 
                            messages: [`Error: ${error.message}`], 
                            dataAsString: null, 
                            routeName 
                        } )
                    }
                } ), Promise.resolve() )
        } ), Promise.resolve() )
    
    Print.log( `\n📊 Test Summary:` )
    Print.log( `   Total Tests: ${totalTests}` )
    Print.log( `   Successful: ${successfulTests}` )
    Print.log( `   Failed: ${failedTests}` )
    Print.log( `   Success Rate: ${totalTests > 0 ? Math.round( ( successfulTests / totalTests ) * 100 ) : 0}%` )
    
    if( failedTests > 0 ) {
        Print.log( `\n⚠️  Some tests failed. Check logs above for details.` )
        process.exit( 1 )
    } else {
        Print.log( `\n🎉 All tests passed!` )
        process.exit( 0 )
    }
}


if( import.meta.url === `file://${process.argv[1]}` ) {
    runSchemaTests().catch( error => {
        console.error( `💥 Unexpected error: ${error.message}` )
        console.error( error.stack )
        process.exit( 1 )
    } )
}


export { runSchemaTests, loadAllNewSchemas }