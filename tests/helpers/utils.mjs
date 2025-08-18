import fs from 'fs'


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


function parseArgvInput( { 
    argv, 
    defaultEnvPath, 
    defaultSchemaRootFolder 
} ) {
    const messages = []
    const { envPath, schemaRootFolder, namespaces, fileNames } = [
        [ 'envPath',          'envPath=',          'string', false,  defaultEnvPath          ],
        [ 'schemaRootFolder', 'schemaRootFolder=', 'string', false,  defaultSchemaRootFolder ],
        [ 'namespaces',       'namespaces=',       'array',  false, []                      ],
        [ 'fileNames',        'fileNames=',        'array',  false, []                      ]
    ]
        .reduce( ( acc, [ key, prefix, type, required, defaultValue ] ) => {
            const value = argv.find( arg => arg.startsWith( prefix ) )
            if( value) {
                if( type === 'string' ) {
                    acc[ key ] = value.split( '=' )[ 1 ]
                } else if( type === 'array' ) {
                    acc[ key ] = value.split( '=' )[ 1 ].split( ',' ).map( item => item.trim().toLowerCase() )
                } 
            } else {
                if( required ) { messages.push( `Missing required argument: ${key}` ); return acc }
                acc[ key ] = defaultValue   
            }
            return acc
        }, {} )

    if( messages.length > 0 ) {
        console.error( messages.join( "\n" ) )
        process.exit( 1 )
    }

    return { envPath, schemaRootFolder, namespaces, fileNames }
}


function parseSimpleArgvInput( { 
    argv, 
    defaultEnvPath = '../../.env', 
    defaultSchemaRootFolder = './../tests/new-schemas' 
} ) {
    // Hilfe anzeigen
    if( argv.includes( '--help' ) || argv.includes( '-h' ) ) {
        console.log( `
📋 Schema Debug Tester

Usage: node test-schemas-debug.mjs [options]

Options:
  --namespace=NAME      Test only specific namespace
  --file=NAME          Test only specific file  
  --env=PATH           Path to .env file (default: ../../.env)
  --folder=PATH        Path to schemas folder (default: ./../tests/new-schemas)
  --verbose            Show detailed debug output
  --help, -h           Show this help

Examples:
  node test-schemas-debug.mjs                     # Test all schemas
  node test-schemas-debug.mjs --namespace=aave    # Test only aave
  node test-schemas-debug.mjs --file=honeypot.mjs # Test only honeypot.mjs
` )
        process.exit( 0 )
    }

    const result = {
        envPath: defaultEnvPath,
        schemaRootFolder: defaultSchemaRootFolder,
        namespace: null,
        fileName: null,
        verbose: false
    }

    argv.forEach( ( arg ) => {
        if( arg.startsWith( '--namespace=' ) ) {
            result.namespace = arg.split( '=' )[ 1 ].toLowerCase().trim()
        } else if( arg.startsWith( '--file=' ) ) {
            result.fileName = arg.split( '=' )[ 1 ].toLowerCase().trim()
        } else if( arg.startsWith( '--env=' ) ) {
            result.envPath = arg.split( '=' )[ 1 ]
        } else if( arg.startsWith( '--folder=' ) ) {
            result.schemaRootFolder = arg.split( '=' )[ 1 ]
        } else if( arg === '--verbose' || arg === '-v' ) {
            result.verbose = true
        }
    } )

    return result
}


export { getServerParams, parseArgvInput, parseSimpleArgvInput }