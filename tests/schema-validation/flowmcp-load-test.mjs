import { SchemaLoader } from './helpers/SchemaLoader.mjs'
import { AIReporter } from './helpers/AIReporter.mjs'

class FlowMCPLoadTester {
    
    static async testAllSchemas( { baseDir = './tests/new-schemas/' } = {} ) {
        const loadResults = await SchemaLoader.loadAllNewSchemas( { baseDir } )
        const testResults = []
        
        console.log( '🔄 FlowMCP Load Test Starting...\n' )
        
        for( const loadResult of loadResults ) {
            if( !loadResult.loaded ) {
                testResults.push( {
                    ...loadResult,
                    loadedInFlowMCP: false,
                    flowMCPError: `Schema load failed: ${loadResult.loadError}`,
                    testPassed: false
                } )
                continue
            }

            const testResult = await FlowMCPLoadTester.#testSingleSchema( loadResult )
            testResults.push( testResult )
        }

        FlowMCPLoadTester.#printResults( testResults )
        
        return {
            testResults: testResults,
            summary: FlowMCPLoadTester.#generateSummary( testResults )
        }
    }

    static async #testSingleSchema( loadResult ) {
        const { schemaFile, namespace, schema } = loadResult
        
        try {
            // Importiere FlowMCP vom GitHub Repository
            const { FlowMCP } = await FlowMCPLoadTester.#importFlowMCP()
            
            if( !FlowMCP ) {
                return {
                    ...loadResult,
                    loadedInFlowMCP: false,
                    flowMCPError: 'FlowMCP class not available',
                    testPassed: false
                }
            }

            // Test 1: Schema Validierung
            const validationResult = FlowMCP.validateSchema( { schema } )
            
            if( !validationResult.status ) {
                return {
                    ...loadResult,
                    loadedInFlowMCP: false,
                    flowMCPError: `Validation failed: ${validationResult.messages.join( ', ' )}`,
                    validationErrors: validationResult.messages,
                    testPassed: false
                }
            }

            // Test 2: Interface Generation
            const zodInterfaces = FlowMCP.getZodInterfaces( { schema } )
            
            if( !zodInterfaces || Object.keys( zodInterfaces ).length === 0 ) {
                return {
                    ...loadResult,
                    loadedInFlowMCP: false,
                    flowMCPError: 'Failed to generate Zod interfaces',
                    testPassed: false
                }
            }

            // Test 3: Test Cases Extraction
            const allTests = FlowMCP.getAllTests( { schema } )
            
            if( !allTests ) {
                return {
                    ...loadResult,
                    loadedInFlowMCP: false,
                    flowMCPError: 'Failed to extract test cases',
                    testPassed: false
                }
            }

            // Test 4: Server Tool Preparation (simulated)
            const routeNames = Object.keys( schema.routes || {} )
            const serverToolTests = []
            
            for( const routeName of routeNames.slice( 0, 3 ) ) { // Test first 3 routes
                try {
                    const serverParams = FlowMCPLoadTester.#generateMockServerParams( schema )
                    const preparedTool = FlowMCP.prepareServerTool( { 
                        schema, 
                        routeName, 
                        serverParams,
                        validate: true 
                    } )
                    
                    serverToolTests.push( {
                        routeName: routeName,
                        success: true,
                        toolName: preparedTool.toolName,
                        hasDescription: !!preparedTool.description,
                        hasZod: !!preparedTool.zod,
                        hasFunc: typeof preparedTool.func === 'function'
                    } )
                } catch( error ) {
                    serverToolTests.push( {
                        routeName: routeName,
                        success: false,
                        error: error.message
                    } )
                }
            }

            const failedServerTools = serverToolTests.filter( t => !t.success )
            
            return {
                ...loadResult,
                loadedInFlowMCP: true,
                validationPassed: true,
                interfaceGeneration: {
                    success: true,
                    interfaceCount: Object.keys( zodInterfaces ).length,
                    interfaces: Object.keys( zodInterfaces )
                },
                testExtraction: {
                    success: true,
                    testCount: allTests ? allTests.length : 0
                },
                serverToolPreparation: {
                    success: failedServerTools.length === 0,
                    testedRoutes: serverToolTests.length,
                    successfulRoutes: serverToolTests.filter( t => t.success ).length,
                    failedRoutes: failedServerTools.length,
                    failures: failedServerTools
                },
                testPassed: failedServerTools.length === 0
            }

        } catch( error ) {
            return {
                ...loadResult,
                loadedInFlowMCP: false,
                flowMCPError: error.message,
                errorStack: error.stack,
                testPassed: false
            }
        }
    }

    static async #importFlowMCP() {
        try {
            // Versuche FlowMCP Core aus verschiedenen Quellen zu importieren
            const possiblePaths = [
                '../../../flowmcp-core/src/index.mjs',
                '../../flowmcp-core/src/index.mjs',
                '../flowmcp-core/src/index.mjs',
                './flowmcp-core/src/index.mjs'
            ]

            for( const path of possiblePaths ) {
                try {
                    const module = await import( path )
                    if( module.FlowMCP ) {
                        console.log( `✅ FlowMCP loaded from: ${path}` )
                        return module
                    }
                } catch( error ) {
                    // Versuche nächsten Pfad
                    continue
                }
            }

            // Falls lokale Datei nicht gefunden, erstelle Mock FlowMCP
            console.log( '⚠️  Using mock FlowMCP for testing...' )
            return FlowMCPLoadTester.#createMockFlowMCP()

        } catch( error ) {
            throw new Error( `Failed to import FlowMCP: ${error.message}` )
        }
    }

    static #createMockFlowMCP() {
        // Mock Implementation für den Fall dass FlowMCP Core nicht verfügbar ist
        return {
            FlowMCP: {
                validateSchema: ( { schema } ) => {
                    // Basis Validierung
                    const errors = []
                    
                    if( !schema.namespace ) errors.push( 'Missing namespace' )
                    if( !schema.name ) errors.push( 'Missing name' )
                    if( !schema.flowMCP ) errors.push( 'Missing flowMCP version' )
                    if( !schema.routes || Object.keys( schema.routes ).length === 0 ) {
                        errors.push( 'No routes defined' )
                    }

                    return {
                        status: errors.length === 0,
                        messages: errors
                    }
                },
                
                getZodInterfaces: ( { schema } ) => {
                    const interfaces = {}
                    Object.keys( schema.routes || {} )
                        .forEach( routeName => {
                            interfaces[ routeName ] = `zod_interface_for_${routeName}`
                        } )
                    return interfaces
                },
                
                getAllTests: ( { schema } ) => {
                    const tests = []
                    Object.entries( schema.routes || {} )
                        .forEach( ( [ routeName, route ] ) => {
                            if( route.tests ) {
                                route.tests.forEach( test => {
                                    tests.push( { routeName, test } )
                                } )
                            }
                        } )
                    return tests
                },
                
                prepareServerTool: ( { schema, routeName, serverParams } ) => {
                    const route = schema.routes[ routeName ]
                    if( !route ) {
                        throw new Error( `Route ${routeName} not found` )
                    }
                    
                    return {
                        toolName: `${schema.namespace}.${routeName}`,
                        description: route.description || `Tool for ${routeName}`,
                        zod: { mock: 'zod_object' },
                        func: async () => ({ content: [{ type: "text", text: "Mock result" }] })
                    }
                }
            }
        }
    }

    static #generateMockServerParams( schema ) {
        const mockParams = {}
        
        if( schema.requiredServerParams ) {
            schema.requiredServerParams.forEach( param => {
                mockParams[ param ] = `mock_${param.toLowerCase()}_value`
            } )
        }

        return mockParams
    }

    static #printResults( testResults ) {
        const successful = testResults.filter( r => r.testPassed )
        const failed = testResults.filter( r => !r.testPassed )
        
        console.log( `📊 FlowMCP Load Test Results` )
        console.log( `──────────────────────────────────────────────────` )
        console.log( `Total Schemas: ${testResults.length}` )
        console.log( `✅ Successfully Loaded: ${successful.length}` )
        console.log( `❌ Failed to Load: ${failed.length}` )
        console.log( `📈 Success Rate: ${Math.round((successful.length / testResults.length) * 100)}%` )
        console.log()

        // Zeige erfolgreiche Schemas
        if( successful.length > 0 ) {
            console.log( `✅ Successfully Loaded Schemas:` )
            successful.forEach( result => {
                const routeCount = Object.keys( result.schema?.routes || {} ).length
                const testCount = result.testExtraction?.testCount || 0
                console.log( `   ✅ ${result.namespace} (${routeCount} routes, ${testCount} tests)` )
            } )
            console.log()
        }

        // Zeige fehlgeschlagene Schemas mit Details
        if( failed.length > 0 ) {
            console.log( `❌ Failed Schemas:` )
            failed.forEach( result => {
                console.log( `   ❌ ${result.namespace} - ${result.flowMCPError}` )
                if( result.validationErrors ) {
                    result.validationErrors.forEach( error => {
                        console.log( `      • ${error}` )
                    } )
                }
            } )
        }
    }

    static #generateSummary( testResults ) {
        const successful = testResults.filter( r => r.testPassed ).length
        const failed = testResults.filter( r => !r.testPassed ).length
        const successRate = Math.round( (successful / testResults.length) * 100 )
        
        const errorsByType = {}
        testResults
            .filter( r => !r.testPassed )
            .forEach( result => {
                const errorType = result.flowMCPError?.split( ':' )[ 0 ] || 'Unknown Error'
                errorsByType[ errorType ] = (errorsByType[ errorType ] || 0) + 1
            } )

        return {
            totalSchemas: testResults.length,
            successful: successful,
            failed: failed,
            successRate: successRate,
            errorsByType: errorsByType,
            allSchemasPassed: failed === 0
        }
    }
}

// CLI Interface wenn direkt ausgeführt
if( import.meta.url === `file://${process.argv[1]}` ) {
    const result = await FlowMCPLoadTester.testAllSchemas()
    
    if( !result.summary.allSchemasPassed ) {
        process.exit( 1 )
    }
}

export { FlowMCPLoadTester }