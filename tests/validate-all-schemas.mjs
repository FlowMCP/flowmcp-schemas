#!/usr/bin/env node

// Comprehensive validation script for all schemas in v1.2.0
// Uses FlowMCP.validateSchema() to ensure all schemas are valid

import { SchemaImporter } from '../src/index.mjs'
import { FlowMCP } from 'flowmcp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

console.log( '\n' + '='.repeat( 60 ) )
console.log( '🔍 SCHEMA VALIDATION TEST - v1.2.0' )
console.log( '='.repeat( 60 ) + '\n' )

async function validateAllSchemas() {
    let totalSchemas = 0
    let validSchemas = 0
    let invalidSchemas = []
    let errorDetails = []
    
    try {
        // Load all schemas from v1.2.0 directory
        console.log( '📦 Loading schemas from schemas/v1.2.0/...\n' )
        
        const schemaResults = await SchemaImporter.loadFromFolder( {
            schemaRootFolder: path.join( __dirname, '../schemas/v1.2.0/' ),
            excludeSchemasWithImports: false,
            excludeSchemasWithRequiredServerParams: false,
            addAdditionalMetaData: true
        } )
        
        totalSchemas = schemaResults.length
        console.log( `✅ Found ${totalSchemas} schemas to validate\n` )
        console.log( '─'.repeat( 60 ) + '\n' )
        
        // Validate each schema
        console.log( '🔧 Validating schemas...\n' )
        
        for( const schemaData of schemaResults ) {
            const { schema, fileName, folderName, absolutePath } = schemaData
            const schemaPath = `${folderName}/${fileName}`
            
            try {
                // Validate schema using FlowMCP
                const validation = FlowMCP.validateSchema( { schema } )
                
                if( validation.status ) {
                    validSchemas++
                    process.stdout.write( '✅' )
                } else {
                    invalidSchemas.push( schemaPath )
                    errorDetails.push( {
                        path: schemaPath,
                        namespace: schema?.namespace || 'unknown',
                        errors: validation.messages
                    } )
                    process.stdout.write( '❌' )
                }
            } catch( error ) {
                invalidSchemas.push( schemaPath )
                errorDetails.push( {
                    path: schemaPath,
                    namespace: schema?.namespace || 'unknown',
                    errors: [ `Validation error: ${error.message}` ]
                } )
                process.stdout.write( '⚠️' )
            }
            
            // Print progress
            if( ( validSchemas + invalidSchemas.length ) % 20 === 0 ) {
                process.stdout.write( '\n' )
            }
        }
        
        console.log( '\n\n' + '─'.repeat( 60 ) + '\n' )
        
        // Report results
        if( invalidSchemas.length > 0 ) {
            console.log( '❌ INVALID SCHEMAS FOUND:\n' )
            
            errorDetails.forEach( ( { path, namespace, errors } ) => {
                console.log( `  📁 ${path}` )
                console.log( `     Namespace: ${namespace}` )
                console.log( `     Errors:` )
                errors.forEach( ( error ) => {
                    console.log( `       - ${error}` )
                } )
                console.log( '' )
            } )
        }
        
        // Check for duplicate namespaces
        const namespaceMap = new Map()
        const duplicates = []
        
        schemaResults.forEach( ( { schema, fileName, folderName } ) => {
            const namespace = schema?.namespace
            if( namespace ) {
                if( namespaceMap.has( namespace ) ) {
                    const existing = namespaceMap.get( namespace )
                    const current = `${folderName}/${fileName}`
                    
                    // Check if this duplicate was already recorded
                    const existingDuplicate = duplicates.find( d => d.namespace === namespace )
                    if( existingDuplicate ) {
                        if( !existingDuplicate.files.includes( current ) ) {
                            existingDuplicate.files.push( current )
                        }
                    } else {
                        duplicates.push( {
                            namespace,
                            files: [ existing, current ]
                        } )
                    }
                } else {
                    namespaceMap.set( namespace, `${folderName}/${fileName}` )
                }
            }
        } )
        
        if( duplicates.length > 0 ) {
            console.log( '⚠️  DUPLICATE NAMESPACES:\n' )
            duplicates.forEach( ( { namespace, files } ) => {
                console.log( `  Namespace "${namespace}" appears in:` )
                files.forEach( ( file ) => {
                    console.log( `    - ${file}` )
                } )
                console.log( '' )
            } )
        }
        
        // Check for schemas without routes
        const schemasWithoutRoutes = []
        
        schemaResults.forEach( ( { schema, fileName, folderName } ) => {
            if( !schema.routes || Object.keys( schema.routes ).length === 0 ) {
                schemasWithoutRoutes.push( `${folderName}/${fileName}` )
            }
        } )
        
        if( schemasWithoutRoutes.length > 0 ) {
            console.log( '⚠️  SCHEMAS WITHOUT ROUTES:\n' )
            schemasWithoutRoutes.forEach( ( path ) => {
                console.log( `  - ${path}` )
            } )
            console.log( '' )
        }
        
        // Check for hardcoded namespace.routeName tags (CRITICAL!)
        const schemasWithHardcodedTags = []
        const hardcodedTagPattern = /^[a-zA-Z]+\.[a-zA-Z]+$/
        
        schemaResults.forEach( ( { schema, fileName, folderName } ) => {
            if( !schema.tags || !Array.isArray( schema.tags ) ) {
                return
            }
            
            const hardcodedTags = schema.tags.filter( ( tag ) => {
                return hardcodedTagPattern.test( tag )
            } )
            
            if( hardcodedTags.length > 0 ) {
                schemasWithHardcodedTags.push( {
                    path: `${folderName}/${fileName}`,
                    hardcodedTags
                } )
            }
        } )
        
        if( schemasWithHardcodedTags.length > 0 ) {
            console.log( '🚨 CRITICAL: SCHEMAS WITH HARDCODED TAGS:\n' )
            schemasWithHardcodedTags.forEach( ( { path, hardcodedTags } ) => {
                console.log( `  - ${path}: ${hardcodedTags.join( ', ' )}` )
            } )
            console.log( '\n  ⚠️  These tags will break schema validation after server-side filtering!' )
            console.log( '  ⚠️  Use semantic tags instead (e.g., "defi", "price", "oracle")' )
            console.log( '' )
        }
        
        // Final summary
        console.log( '='.repeat( 60 ) )
        console.log( '📊 VALIDATION SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( `Total schemas:     ${totalSchemas}` )
        console.log( `Valid schemas:     ${validSchemas} (${( ( validSchemas / totalSchemas ) * 100 ).toFixed( 1 )}%)` )
        console.log( `Invalid schemas:   ${invalidSchemas.length}` )
        console.log( `Duplicate namespaces: ${duplicates.length}` )
        console.log( `Schemas without routes: ${schemasWithoutRoutes.length}` )
        console.log( `Hardcoded tag schemas: ${schemasWithHardcodedTags.length}` )
        console.log( '='.repeat( 60 ) + '\n' )
        
        // Exit with error code if validation failed
        if( invalidSchemas.length > 0 || duplicates.length > 0 || schemasWithHardcodedTags.length > 0 ) {
            console.log( '❌ Validation failed! Please fix the issues above.\n' )
            process.exit( 1 )
        } else {
            console.log( '✅ All schemas are valid!\n' )
            process.exit( 0 )
        }
        
    } catch( error ) {
        console.error( '💥 Fatal error during validation:' )
        console.error( error )
        process.exit( 1 )
    }
}

// Run validation
validateAllSchemas()