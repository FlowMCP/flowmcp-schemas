import { FlowMCP } from 'flowmcp'

import { SchemaLoader } from './helpers/SchemaLoader.mjs'
import { AIReporter } from './helpers/AIReporter.mjs'


async function validateNewSchemas( { 
    baseDir = './tests/new-schemas/',
    outputFormat = 'console', // 'console', 'json', 'both'
    verbose = false,
    includeNamespaces = [],
    excludeNamespaces = []
} = {} ) {
    console.log( `🔍 Loading schemas from ${baseDir}...` )
    
    // 1. Alle Schema-Dateien laden
    const loadResults = await SchemaLoader.loadAllNewSchemas( { baseDir } )
    
    if( verbose ) {
        const loadReport = SchemaLoader.formatLoadReport( { loadResults, verbose: true } )
        console.log( loadReport )
    }

    // 2. Erfolgreich geladene Schemas filtern
    const filteredResults = SchemaLoader.filterSchemas( { 
        loadResults, 
        includeNamespaces, 
        excludeNamespaces,
        onlyValid: false 
    } )

    console.log( `\n✅ Successfully loaded ${filteredResults.length} schemas` )
    console.log( `🔬 Starting validation...` )

    // 3. Validierung durchführen
    const validationResults = []
    
    for( const loadResult of filteredResults ) {
        const { schemaFile, namespace, schema } = loadResult
        
        try {
            // FlowMCP Validierung ausführen
            const { status, messages } = FlowMCP.validateSchema( { schema } )
            
            validationResults.push( {
                schemaFile: schemaFile,
                namespace: namespace,
                valid: status,
                rawMessages: messages || []
            } )
            
            // Fortschritt anzeigen
            const statusIcon = status ? '✅' : '❌'
            console.log( `   ${statusIcon} ${namespace} (${schemaFile})` )
            
        } catch( error ) {
            // Validation selbst fehlgeschlagen (sehr ungewöhnlich)
            validationResults.push( {
                schemaFile: schemaFile,
                namespace: namespace,
                valid: false,
                rawMessages: [ `Validation failed: ${error.message}` ]
            } )
            console.log( `   💥 ${namespace} - Validation Error: ${error.message}` )
        }
    }

    // 4. Load-Fehler zu Validierungsergebnissen hinzufügen
    const loadErrorResults = loadResults
        .filter( result => !result.loaded )
        .map( result => ({
            schemaFile: result.schemaFile,
            namespace: result.namespace || 'unknown',
            valid: false,
            rawMessages: [ `Load error: ${result.loadError}` ]
        }) )
    
    validationResults.push( ...loadErrorResults )

    // 5. AI-optimierten Report generieren
    const aiReport = AIReporter.generateReport( { validationResults } )

    // 6. Ausgabe je nach Format
    if( outputFormat === 'console' || outputFormat === 'both' ) {
        const consoleOutput = AIReporter.formatForConsole( { report: aiReport, verbose } )
        console.log( consoleOutput )
    }

    if( outputFormat === 'json' || outputFormat === 'both' ) {
        console.log( `\n📄 JSON Report:` )
        console.log( JSON.stringify( aiReport, null, 2 ) )
    }

    // 7. Exit-Code setzen basierend auf Ergebnissen
    const hasErrors = aiReport.validation_summary.invalid_schemas > 0
    if( hasErrors ) {
        console.log( `\n💥 Validation completed with ${aiReport.validation_summary.total_errors} errors` )
        process.exit( 1 )
    } else {
        console.log( `\n🎉 All schemas are valid!` )
        process.exit( 0 )
    }
}


// CLI Parameter verarbeiten
function parseCliArgs() {
    const args = process.argv.slice( 2 )
    const options = {
        baseDir: './tests/new-schemas/',
        outputFormat: 'console',
        verbose: false,
        includeNamespaces: [],
        excludeNamespaces: []
    }

    args.forEach( ( arg, index ) => {
        switch( arg ) {
            case '--verbose':
            case '-v':
                options.verbose = true
                break
            case '--json':
                options.outputFormat = 'json'
                break
            case '--both':
                options.outputFormat = 'both'
                break
            case '--help':
            case '-h':
                printHelp()
                process.exit( 0 )
                break
            default:
                if( arg.startsWith( '--base-dir=' ) ) {
                    options.baseDir = arg.split( '=' )[1]
                } else if( arg.startsWith( '--include=' ) ) {
                    options.includeNamespaces = arg.split( '=' )[1].split( ',' ).filter( Boolean )
                } else if( arg.startsWith( '--exclude=' ) ) {
                    options.excludeNamespaces = arg.split( '=' )[1].split( ',' ).filter( Boolean )
                }
                break
        }
    } )

    return options
}


function printHelp() {
    console.log( `
📝 FlowMCP Schema Validator

Usage: node validate-new-schemas.mjs [options]

Options:
  --verbose, -v              Show detailed output
  --json                     Output only JSON format
  --both                     Output both console and JSON
  --base-dir=PATH           Schema directory (default: ./tests/new-schemas/)
  --include=NS1,NS2         Only validate specific namespaces
  --exclude=NS1,NS2         Exclude specific namespaces
  --help, -h                Show this help

Examples:
  node validate-new-schemas.mjs
  node validate-new-schemas.mjs --verbose
  node validate-new-schemas.mjs --json
  node validate-new-schemas.mjs --include=berlinBSR,berlinVHS
  node validate-new-schemas.mjs --exclude=experimental
` )
}


// Hauptfunktion ausführen wenn direkt aufgerufen
if( import.meta.url === `file://${process.argv[1]}` ) {
    const options = parseCliArgs()
    validateNewSchemas( options ).catch( error => {
        console.error( `💥 Unexpected error: ${error.message}` )
        console.error( error.stack )
        process.exit( 1 )
    } )
}


export { validateNewSchemas }