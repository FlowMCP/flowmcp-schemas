import { FlowMCP } from 'flowmcp'

import { SchemaLoader } from './helpers/SchemaLoader.mjs'
import { AIReporter } from './helpers/AIReporter.mjs'


async function validateSingleSchema( { 
    schemaFile,
    outputFormat = 'both', // 'console', 'json', 'both'
    verbose = true
} ) {
    console.log( `🔍 Validating schema: ${schemaFile}` )
    
    try {
        // 1. Schema laden
        const loadResult = await SchemaLoader.loadSingleSchema( { schemaFile } )
        
        if( !loadResult.loaded ) {
            console.error( `❌ Failed to load schema: ${loadResult.loadError}` )
            process.exit( 1 )
        }

        const { namespace, schema } = loadResult
        console.log( `📦 Loaded schema: ${namespace}` )

        // 2. Validierung durchführen
        console.log( `🔬 Running FlowMCP validation...` )
        const { status, messages } = FlowMCP.validateSchema( { schema } )

        // 3. Validierungsergebnis vorbereiten
        const validationResults = [
            {
                schemaFile: schemaFile,
                namespace: namespace,
                valid: status,
                rawMessages: messages || []
            }
        ]

        // 4. AI-Report generieren
        const aiReport = AIReporter.generateReport( { validationResults } )
        const singleResult = aiReport.results[0]

        // 5. Ergebnis ausgeben
        if( outputFormat === 'console' || outputFormat === 'both' ) {
            printDetailedConsoleReport( { singleResult, schema, verbose } )
        }

        if( outputFormat === 'json' || outputFormat === 'both' ) {
            console.log( `\n📄 JSON Report:` )
            console.log( JSON.stringify( aiReport, null, 2 ) )
        }

        // 6. Exit-Code setzen
        if( singleResult.valid ) {
            console.log( `\n🎉 Schema is valid!` )
            process.exit( 0 )
        } else {
            console.log( `\n💥 Schema validation failed` )
            process.exit( 1 )
        }

    } catch( error ) {
        console.error( `💥 Unexpected error: ${error.message}` )
        if( verbose ) {
            console.error( error.stack )
        }
        process.exit( 1 )
    }
}


function printDetailedConsoleReport( { singleResult, schema, verbose } ) {
    const { schemaFile, namespace, valid, errors, warnings } = singleResult

    console.log( `\n📊 Detailed Validation Report` )
    console.log( `${'─'.repeat(60)}` )
    console.log( `File: ${schemaFile}` )
    console.log( `Namespace: ${namespace}` )
    console.log( `Valid: ${valid ? '✅ YES' : '❌ NO'}` )
    console.log( `Errors: ${errors.length}` )
    console.log( `Warnings: ${warnings.length}` )

    // Schema-Metadaten anzeigen
    if( verbose && schema ) {
        console.log( `\n📋 Schema Metadata:` )
        console.log( `${'─'.repeat(30)}` )
        console.log( `Name: ${schema.name || 'N/A'}` )
        console.log( `Description: ${schema.description || 'N/A'}` )
        console.log( `FlowMCP Version: ${schema.flowMCP || 'N/A'}` )
        console.log( `Root URL: ${schema.root || 'N/A'}` )
        console.log( `Routes: ${schema.routes ? Object.keys( schema.routes ).length : 0}` )
        console.log( `Handlers: ${schema.handlers ? Object.keys( schema.handlers ).length : 0}` )
        console.log( `Required Server Params: ${schema.requiredServerParams?.length || 0}` )
        
        if( schema.tags && schema.tags.length > 0 ) {
            console.log( `Tags: ${schema.tags.join( ', ' )}` )
        }
    }

    // Fehler-Details
    if( errors.length > 0 ) {
        console.log( `\n🚨 Errors (${errors.length}):` )
        console.log( `${'─'.repeat(30)}` )
        
        errors.forEach( ( error, index ) => {
            console.log( `\n${index + 1}. ${error.type}` )
            console.log( `   Field: ${error.field || 'unknown'}` )
            console.log( `   Path: ${error.field_path}` )
            console.log( `   Message: ${error.message}` )
            
            if( error.current_value ) {
                console.log( `   Current Value: "${error.current_value}"` )
            }
            
            console.log( `   💡 AI Instruction: ${error.ai_instruction}` )
            console.log( `   🔧 Quick Fix: ${error.quick_fix}` )
            
            if( error.context ) {
                console.log( `   📖 Context: ${error.context}` )
            }
        } )
    }

    // Warning-Details
    if( warnings.length > 0 ) {
        console.log( `\n⚠️  Warnings (${warnings.length}):` )
        console.log( `${'─'.repeat(30)}` )
        
        warnings.forEach( ( warning, index ) => {
            console.log( `\n${index + 1}. ${warning.type}` )
            console.log( `   Field: ${warning.field || 'unknown'}` )
            console.log( `   Message: ${warning.message}` )
            console.log( `   💡 Suggestion: ${warning.ai_instruction}` )
        } )
    }

    // Route-Details (nur wenn verbose und Schema valide)
    if( verbose && valid && schema && schema.routes ) {
        console.log( `\n🛤️  Routes (${Object.keys( schema.routes ).length}):` )
        console.log( `${'─'.repeat(30)}` )
        
        Object.entries( schema.routes ).forEach( ( [ routeName, route ] ) => {
            console.log( `   • ${routeName}: ${route.requestMethod} ${route.route}` )
            console.log( `     Description: ${route.description || 'N/A'}` )
            console.log( `     Parameters: ${route.parameters?.length || 0}` )
            console.log( `     Tests: ${route.tests?.length || 0}` )
            console.log( `     Modifiers: ${route.modifiers?.length || 0}` )
        } )
    }
}


// CLI Parameter verarbeiten
function parseCliArgs() {
    const args = process.argv.slice( 2 )
    
    if( args.length === 0 || args.includes( '--help' ) || args.includes( '-h' ) ) {
        printHelp()
        process.exit( 0 )
    }

    const options = {
        schemaFile: null,
        outputFormat: 'both',
        verbose: true
    }

    // Erstes Argument ohne -- ist die Schema-Datei
    const schemaFileArg = args.find( arg => !arg.startsWith( '--' ) )
    if( !schemaFileArg ) {
        console.error( `❌ Schema file is required` )
        printHelp()
        process.exit( 1 )
    }
    options.schemaFile = schemaFileArg

    // Weitere Optionen verarbeiten
    args.forEach( arg => {
        switch( arg ) {
            case '--quiet':
            case '-q':
                options.verbose = false
                break
            case '--json':
                options.outputFormat = 'json'
                break
            case '--console':
                options.outputFormat = 'console'
                break
            case '--both':
                options.outputFormat = 'both'
                break
        }
    } )

    return options
}


function printHelp() {
    console.log( `
🔬 AI Schema Validator

Validate a single FlowMCP schema with AI-optimized error reporting.

Usage: node ai-schema-validator.mjs <schema-file> [options]

Arguments:
  schema-file               Path to the .mjs schema file to validate

Options:
  --json                    Output only JSON format
  --console                 Output only console format
  --both                    Output both formats (default)
  --quiet, -q              Less verbose output
  --help, -h               Show this help

Examples:
  node ai-schema-validator.mjs tests/new-schemas/berlin-de/bsr-services.mjs
  node ai-schema-validator.mjs tests/new-schemas/passport-xyz/humanity-score.mjs --json
  node ai-schema-validator.mjs broken-schema.mjs --quiet
` )
}


// Hauptfunktion ausführen wenn direkt aufgerufen
if( import.meta.url === `file://${process.argv[1]}` ) {
    const options = parseCliArgs()
    validateSingleSchema( options ).catch( error => {
        console.error( `💥 Unexpected error: ${error.message}` )
        console.error( error.stack )
        process.exit( 1 )
    } )
}


export { validateSingleSchema }