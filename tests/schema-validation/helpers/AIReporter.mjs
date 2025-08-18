class AIReporter {
    static generateReport( { validationResults } ) {
        const summary = AIReporter.#generateSummary( { validationResults } )
        const results = validationResults.map( result => AIReporter.#formatResult( result ) )

        return {
            validation_summary: summary,
            results: results,
            ai_metadata: {
                report_version: "1.0.0",
                error_categories: AIReporter.#getErrorCategories(),
                generated_at: new Date().toISOString()
            }
        }
    }


    static #generateSummary( { validationResults } ) {
        const totalSchemas = validationResults.length
        const validSchemas = validationResults.filter( r => r.valid ).length
        const invalidSchemas = totalSchemas - validSchemas
        const totalErrors = validationResults.reduce( ( sum, r ) => sum + (r.errors?.length || 0), 0 )
        const totalWarnings = validationResults.reduce( ( sum, r ) => sum + (r.warnings?.length || 0), 0 )

        return {
            total_schemas: totalSchemas,
            valid_schemas: validSchemas,
            invalid_schemas: invalidSchemas,
            total_errors: totalErrors,
            total_warnings: totalWarnings,
            validation_timestamp: new Date().toISOString(),
            success_rate: totalSchemas > 0 ? Math.round((validSchemas / totalSchemas) * 100) : 0
        }
    }


    static #formatResult( validationResult ) {
        const { schemaFile, namespace, valid, rawMessages = [] } = validationResult

        if( valid ) {
            return {
                schema_file: schemaFile,
                namespace: namespace,
                valid: true,
                errors: [],
                warnings: []
            }
        }

        const { errors, warnings } = AIReporter.#categorizeMessages( { messages: rawMessages, schemaFile, namespace } )

        return {
            schema_file: schemaFile,
            namespace: namespace,
            valid: false,
            errors: errors,
            warnings: warnings
        }
    }


    static #categorizeMessages( { messages, schemaFile, namespace } ) {
        const errors = []
        const warnings = []

        messages.forEach( message => {
            const formattedError = AIReporter.#formatMessage( { message, schemaFile, namespace } )
            
            if( formattedError.severity === 'WARNING' ) {
                warnings.push( formattedError )
            } else {
                errors.push( formattedError )
            }
        } )

        return { errors, warnings }
    }


    static #formatMessage( { message, schemaFile, namespace } ) {
        const errorType = AIReporter.#detectErrorType( message )
        const field = AIReporter.#extractField( message )
        const currentValue = AIReporter.#extractCurrentValue( message )
        
        return {
            type: errorType,
            severity: AIReporter.#getSeverity( errorType ),
            field: field,
            message: message,
            current_value: currentValue,
            ai_instruction: AIReporter.#getAIInstruction( { errorType, field, message } ),
            quick_fix: AIReporter.#getQuickFix( { errorType, field, message, currentValue } ),
            context: AIReporter.#getContext( { field, schemaFile } ),
            field_path: field ? `schema.${field}` : 'schema'
        }
    }


    static #detectErrorType( message ) {
        const patterns = [
            [ /flowMCP.*not valid.*format/i, 'FLOWMCP_VERSION_ERROR' ],
            [ /flowMCP.*not compatible/i, 'FLOWMCP_VERSION_ERROR' ],
            [ /not valid.*URL/i, 'URL_ERROR' ],
            [ /Missing required key/i, 'STRUCTURE_ERROR' ],
            [ /Unknown key/i, 'STRUCTURE_ERROR' ],
            [ /Expected.*to be/i, 'TYPE_ERROR' ],
            [ /Unknown method/i, 'METHOD_ERROR' ],
            [ /Unknown location/i, 'LOCATION_ERROR' ],
            [ /primitive.*not known/i, 'PRIMITIVE_ERROR' ],
            [ /option.*unknown/i, 'OPTION_ERROR' ],
            [ /Missing parameter.*route/i, 'ROUTE_PARAMETER_ERROR' ],
            [ /Unknown handler/i, 'HANDLER_ERROR' ],
            [ /Missing required parameter/i, 'TEST_PARAMETER_ERROR' ],
            [ /Unknown parameter/i, 'TEST_PARAMETER_ERROR' ],
            [ /Missing value for/i, 'VALUE_ERROR' ],
            [ /tags.*not valid/i, 'TAG_ERROR' ],
            [ /namespace.*not valid/i, 'NAMESPACE_ERROR' ],
            [ /serverParam/i, 'SERVER_PARAM_ERROR' ]
        ]

        for( const [ pattern, type ] of patterns ) {
            if( pattern.test( message ) ) {
                return type
            }
        }

        return 'UNKNOWN_ERROR'
    }


    static #extractField( message ) {
        const patterns = [
            /^([^.]+)\.([^:]+):/,      // "Schema.namespace.field:"
            /^([^:]+):/,               // "field:"
            /for ([^.]+)\.([^.\s]+)/,  // "for schema.field"
            /key: ([^.\s]+)/           // "key: fieldname"
        ]

        for( const pattern of patterns ) {
            const match = message.match( pattern )
            if( match ) {
                return match[match.length - 1] // Letztes gefangenes Element
            }
        }

        return null
    }


    static #extractCurrentValue( message ) {
        const patterns = [
            /"([^"]+)"/,                    // Quoted values
            /is ([^.]+)\./,                 // "is value."
            /Unknown method \(([^)]+)\)/,   // "Unknown method (value)"
            /Unknown location \(([^)]+)\)/  // "Unknown location (value)"
        ]

        for( const pattern of patterns ) {
            const match = message.match( pattern )
            if( match ) {
                return match[1]
            }
        }

        return null
    }


    static #getSeverity( errorType ) {
        const criticalErrors = [
            'FLOWMCP_VERSION_ERROR',
            'STRUCTURE_ERROR',
            'SYNTAX_ERROR',
            'URL_ERROR',
            'NAMESPACE_ERROR'
        ]

        const warnings = [
            'TEST_PARAMETER_ERROR'
        ]

        if( criticalErrors.includes( errorType ) ) {
            return 'ERROR'
        } else if( warnings.includes( errorType ) ) {
            return 'WARNING'
        } else {
            return 'ERROR'
        }
    }


    static #getAIInstruction( { errorType, field, message } ) {
        const instructions = {
            'FLOWMCP_VERSION_ERROR': 'Fix the FlowMCP version to follow semantic versioning format (x.x.x)',
            'URL_ERROR': 'Correct the URL to be a valid HTTP/HTTPS URL with proper format',
            'STRUCTURE_ERROR': field ? `Add the missing required field '${field}' to the schema` : 'Fix the schema structure by adding missing required fields',
            'TYPE_ERROR': `Change the field type to match the expected format`,
            'METHOD_ERROR': 'Use a valid HTTP method (GET or POST)',
            'LOCATION_ERROR': 'Use a valid parameter location (body, query, or insert)',
            'PRIMITIVE_ERROR': 'Use a valid z-object primitive (string(), number(), boolean(), etc.)',
            'OPTION_ERROR': 'Use valid z-object options (min(), max(), optional(), etc.)',
            'ROUTE_PARAMETER_ERROR': 'Add the missing parameter to the parameters array or define it as a server parameter',
            'HANDLER_ERROR': 'Add the missing handler function to the handlers object',
            'TEST_PARAMETER_ERROR': 'Add the missing parameter to the test or remove it if not needed',
            'VALUE_ERROR': 'Provide a value for the required field',
            'TAG_ERROR': 'Fix the tag format to match namespace.routeName pattern',
            'NAMESPACE_ERROR': 'Use a valid namespace with only letters',
            'SERVER_PARAM_ERROR': 'Add the required server parameter to requiredServerParams array'
        }

        return instructions[errorType] || 'Review and fix the validation error according to FlowMCP specification'
    }


    static #getQuickFix( { errorType, field, message, currentValue } ) {
        const fixes = {
            'FLOWMCP_VERSION_ERROR': currentValue ? 
                `Change flowMCP: "${currentValue}" to flowMCP: "1.2.0"` :
                'Add flowMCP: "1.2.0" to schema',
            'URL_ERROR': currentValue ?
                `Fix URL format: root: "${currentValue}" should be a valid URL like "https://api.example.com"` :
                'Add a valid root URL like root: "https://api.example.com"',
            'STRUCTURE_ERROR': field ?
                `Add ${field} property to schema` :
                'Add missing required properties to schema',
            'METHOD_ERROR': currentValue ?
                `Change requestMethod: "${currentValue}" to requestMethod: "GET" or "POST"` :
                'Set requestMethod to "GET" or "POST"',
            'LOCATION_ERROR': currentValue ?
                `Change location: "${currentValue}" to one of: "body", "query", "insert"` :
                'Set location to "body", "query", or "insert"',
            'PRIMITIVE_ERROR': currentValue ?
                `Change primitive: "${currentValue}" to valid primitive like "string()", "number()", "boolean()"` :
                'Use valid primitive like "string()", "number()", "boolean()"',
            'NAMESPACE_ERROR': currentValue ?
                `Change namespace: "${currentValue}" to contain only letters` :
                'Set namespace to contain only letters'
        }

        return fixes[errorType] || 'Review FlowMCP documentation for correct format'
    }


    static #getContext( { field, schemaFile } ) {
        if( !field ) return null

        const contextMap = {
            'namespace': 'Top-level schema identifier',
            'name': 'Human-readable schema name',
            'flowMCP': 'FlowMCP specification version',
            'root': 'Base URL for all requests',
            'routes': 'Available API endpoints',
            'handlers': 'Request/response processing functions',
            'requestMethod': 'HTTP method for the route',
            'description': 'Human-readable description',
            'parameters': 'Route parameter definitions',
            'primitive': 'Zod validation primitive type',
            'options': 'Zod validation options'
        }

        return contextMap[field] || `Field in ${schemaFile}`
    }


    static #getErrorCategories() {
        return [
            'FLOWMCP_VERSION_ERROR',
            'URL_ERROR', 
            'STRUCTURE_ERROR',
            'TYPE_ERROR',
            'METHOD_ERROR',
            'LOCATION_ERROR',
            'PRIMITIVE_ERROR',
            'OPTION_ERROR',
            'ROUTE_PARAMETER_ERROR',
            'HANDLER_ERROR',
            'TEST_PARAMETER_ERROR',
            'VALUE_ERROR',
            'TAG_ERROR',
            'NAMESPACE_ERROR',
            'SERVER_PARAM_ERROR',
            'UNKNOWN_ERROR'
        ]
    }


    static formatForConsole( { report, verbose = false } ) {
        const { validation_summary, results } = report
        let output = []

        // Summary
        output.push( `\n📊 Schema Validation Summary` )
        output.push( `${'─'.repeat(50)}` )
        output.push( `Total Schemas: ${validation_summary.total_schemas}` )
        output.push( `✅ Valid: ${validation_summary.valid_schemas}` )
        output.push( `❌ Invalid: ${validation_summary.invalid_schemas}` )
        output.push( `🚨 Total Errors: ${validation_summary.total_errors}` )
        output.push( `⚠️  Total Warnings: ${validation_summary.total_warnings}` )
        output.push( `📈 Success Rate: ${validation_summary.success_rate}%` )

        // Invalid schemas details
        const invalidResults = results.filter( r => !r.valid )
        if( invalidResults.length > 0 ) {
            output.push( `\n❌ Invalid Schemas:` )
            output.push( `${'─'.repeat(50)}` )

            invalidResults.forEach( result => {
                output.push( `\n📁 ${result.schema_file}` )
                output.push( `   Namespace: ${result.namespace}` )
                
                if( result.errors.length > 0 ) {
                    output.push( `   🚨 Errors (${result.errors.length}):` )
                    result.errors.forEach( ( error, index ) => {
                        output.push( `      ${index + 1}. ${error.type}: ${error.message}` )
                        if( verbose ) {
                            output.push( `         💡 ${error.ai_instruction}` )
                            output.push( `         🔧 ${error.quick_fix}` )
                        }
                    } )
                }

                if( result.warnings.length > 0 ) {
                    output.push( `   ⚠️  Warnings (${result.warnings.length}):` )
                    result.warnings.forEach( ( warning, index ) => {
                        output.push( `      ${index + 1}. ${warning.type}: ${warning.message}` )
                    } )
                }
            } )
        }

        // Valid schemas (only in verbose mode)
        if( verbose ) {
            const validResults = results.filter( r => r.valid )
            if( validResults.length > 0 ) {
                output.push( `\n✅ Valid Schemas:` )
                output.push( `${'─'.repeat(50)}` )
                validResults.forEach( result => {
                    output.push( `   📁 ${result.schema_file} (${result.namespace})` )
                } )
            }
        }

        return output.join( '\n' )
    }
}


export { AIReporter }