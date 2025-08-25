// Comprehensive validation tests for all schemas in v1.2.0
// Uses FlowMCP.validateSchema() to ensure all schemas are valid

let SchemaImporter
let FlowMCP

beforeAll( async () => {
    const schemaModule = await import( '../../src/index.mjs' )
    const flowModule = await import( 'flowmcp' )
    SchemaImporter = schemaModule.SchemaImporter
    FlowMCP = flowModule.FlowMCP
} )

describe( 'Schema Validation Tests - v1.2.0', () => {
    let allSchemas = []
    let invalidSchemas = []
    
    beforeAll( async () => {
        // Load all schemas from v1.2.0 directory
        const schemaResults = await SchemaImporter.loadFromFolder( {
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: false,
            excludeSchemasWithRequiredServerParams: false,
            addAdditionalMetaData: true
        } )
        
        allSchemas = schemaResults
    } )
    
    test( 'should load schemas from v1.2.0 directory', () => {
        expect( Array.isArray( allSchemas ) ).toBe( true )
        expect( allSchemas.length ).toBeGreaterThan( 0 )
        console.log( `\n📦 Found ${allSchemas.length} schemas to validate\n` )
    } )
    
    test( 'all schemas should pass FlowMCP validation', () => {
        invalidSchemas = []
        
        allSchemas.forEach( ( schemaData ) => {
            const { schema, fileName, folderName, absolutePath } = schemaData
            
            // Validate schema using FlowMCP
            const validation = FlowMCP.validateSchema( { schema } )
            
            if( !validation.status ) {
                invalidSchemas.push( {
                    path: `${folderName}/${fileName}`,
                    absolutePath,
                    namespace: schema?.namespace || 'unknown',
                    errors: validation.messages
                } )
            }
        } )
        
        // Report invalid schemas
        if( invalidSchemas.length > 0 ) {
            console.error( '\n❌ Invalid schemas found:\n' )
            invalidSchemas.forEach( ( { path, namespace, errors } ) => {
                console.error( `  📁 ${path} (namespace: ${namespace})` )
                errors.forEach( ( error ) => {
                    console.error( `     - ${error}` )
                } )
                console.error( '' )
            } )
            
            console.error( `\n📊 Summary: ${invalidSchemas.length} of ${allSchemas.length} schemas are invalid\n` )
        } else {
            console.log( `\n✅ All ${allSchemas.length} schemas are valid!\n` )
        }
        
        // Test fails if any schema is invalid
        expect( invalidSchemas.length ).toBe( 0 )
    } )
    
    test( 'each schema should have required fields', () => {
        const missingRequiredFields = []
        
        allSchemas.forEach( ( { schema, fileName, folderName } ) => {
            const requiredFields = [ 'namespace', 'name', 'description', 'flowMCP', 'routes' ]
            const missing = []
            
            requiredFields.forEach( ( field ) => {
                if( !schema[ field ] ) {
                    missing.push( field )
                }
            } )
            
            if( missing.length > 0 ) {
                missingRequiredFields.push( {
                    path: `${folderName}/${fileName}`,
                    missing
                } )
            }
        } )
        
        if( missingRequiredFields.length > 0 ) {
            console.error( '\n⚠️  Schemas with missing required fields:\n' )
            missingRequiredFields.forEach( ( { path, missing } ) => {
                console.error( `  ${path}: Missing ${missing.join( ', ' )}` )
            } )
        }
        
        expect( missingRequiredFields.length ).toBe( 0 )
    } )
    
    test( 'each schema should have at least one route', () => {
        const schemasWithoutRoutes = []
        
        allSchemas.forEach( ( { schema, fileName, folderName } ) => {
            if( !schema.routes || Object.keys( schema.routes ).length === 0 ) {
                schemasWithoutRoutes.push( `${folderName}/${fileName}` )
            }
        } )
        
        if( schemasWithoutRoutes.length > 0 ) {
            console.error( '\n⚠️  Schemas without routes:\n' )
            schemasWithoutRoutes.forEach( ( path ) => {
                console.error( `  ${path}` )
            } )
        }
        
        expect( schemasWithoutRoutes.length ).toBe( 0 )
    } )
    
    test( 'namespaces should be unique', () => {
        const namespaceMap = new Map()
        const duplicates = []
        
        allSchemas.forEach( ( { schema, fileName, folderName } ) => {
            const namespace = schema.namespace
            if( namespace ) {
                if( namespaceMap.has( namespace ) ) {
                    const existing = namespaceMap.get( namespace )
                    duplicates.push( {
                        namespace,
                        files: [ existing, `${folderName}/${fileName}` ]
                    } )
                } else {
                    namespaceMap.set( namespace, `${folderName}/${fileName}` )
                }
            }
        } )
        
        if( duplicates.length > 0 ) {
            console.error( '\n⚠️  Duplicate namespaces found:\n' )
            duplicates.forEach( ( { namespace, files } ) => {
                console.error( `  Namespace "${namespace}" appears in:` )
                files.forEach( ( file ) => {
                    console.error( `    - ${file}` )
                } )
            } )
        }
        
        expect( duplicates.length ).toBe( 0 )
    } )
    
    test( 'route parameters should have proper structure', () => {
        const routesWithInvalidParams = []
        
        allSchemas.forEach( ( { schema, fileName, folderName } ) => {
            if( schema.routes ) {
                Object.entries( schema.routes ).forEach( ( [ routeName, route ] ) => {
                    if( route.parameters && Array.isArray( route.parameters ) ) {
                        route.parameters.forEach( ( param, index ) => {
                            const issues = []
                            
                            // Check required parameter fields
                            if( !param.name ) issues.push( 'missing name' )
                            if( !param.type ) issues.push( 'missing type' )
                            if( !param.description ) issues.push( 'missing description' )
                            
                            if( issues.length > 0 ) {
                                routesWithInvalidParams.push( {
                                    path: `${folderName}/${fileName}`,
                                    route: routeName,
                                    paramIndex: index,
                                    issues
                                } )
                            }
                        } )
                    }
                } )
            }
        } )
        
        if( routesWithInvalidParams.length > 0 ) {
            console.error( '\n⚠️  Routes with invalid parameters:\n' )
            routesWithInvalidParams.forEach( ( { path, route, paramIndex, issues } ) => {
                console.error( `  ${path} > ${route} > param[${paramIndex}]: ${issues.join( ', ' )}` )
            } )
        }
        
        expect( routesWithInvalidParams.length ).toBe( 0 )
    } )
    
    test( 'should provide detailed validation summary', () => {
        const validCount = allSchemas.length - invalidSchemas.length
        const percentage = ( ( validCount / allSchemas.length ) * 100 ).toFixed( 1 )
        
        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '📊 VALIDATION SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( `Total schemas:   ${allSchemas.length}` )
        console.log( `Valid schemas:   ${validCount} (${percentage}%)` )
        console.log( `Invalid schemas: ${invalidSchemas.length}` )
        
        if( invalidSchemas.length > 0 ) {
            console.log( '\n❌ Failed schemas:' )
            invalidSchemas.forEach( ( { path, errors } ) => {
                console.log( `  - ${path} (${errors.length} errors)` )
            } )
        }
        
        console.log( '='.repeat( 60 ) + '\n' )
        
        // This test always passes, it's just for summary
        expect( true ).toBe( true )
    } )
} )