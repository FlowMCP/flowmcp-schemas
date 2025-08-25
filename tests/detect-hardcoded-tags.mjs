#!/usr/bin/env node

// Detection script for hardcoded namespace.routeName tags in schemas
// Identifies all schemas that violate the FlowMCP tag validation rules

import { SchemaImporter } from '../src/index.mjs'
import { FlowMCP } from 'flowmcp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

console.log( '\n' + '='.repeat( 60 ) )
console.log( '🔍 HARDCODED TAG DETECTION - v1.2.0 Schemas' )
console.log( '='.repeat( 60 ) + '\n' )

async function detectHardcodedTags() {
    let totalSchemas = 0
    let schemasWithHardcodedTags = []
    let allHardcodedTags = []
    
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
        console.log( `✅ Found ${totalSchemas} schemas to analyze\n` )
        console.log( '─'.repeat( 60 ) + '\n' )
        
        // Pattern to detect hardcoded namespace.routeName tags
        const hardcodedTagPattern = /^[a-zA-Z]+\.[a-zA-Z]+$/
        
        console.log( '🔧 Analyzing tags...\n' )
        
        schemaResults.forEach( ( schemaData ) => {
            const { schema, fileName, folderName, absolutePath } = schemaData
            const schemaPath = `${folderName}/${fileName}`
            
            if( !schema.tags || !Array.isArray( schema.tags ) ) {
                return
            }
            
            const hardcodedTags = schema.tags.filter( ( tag ) => {
                return hardcodedTagPattern.test( tag )
            } )
            
            if( hardcodedTags.length > 0 ) {
                const routeNames = Object.keys( schema.routes || {} )
                
                const problematicTags = hardcodedTags.map( ( tag ) => {
                    const [ namespace, routeName ] = tag.split( '.' )
                    const routeExists = routeNames.includes( routeName )
                    
                    return {
                        tag,
                        namespace,
                        routeName,
                        routeExists,
                        problematic: namespace === schema.namespace
                    }
                } )
                
                schemasWithHardcodedTags.push( {
                    path: schemaPath,
                    namespace: schema.namespace,
                    hardcodedTags,
                    problematicTags,
                    routeNames,
                    allTags: schema.tags
                } )
                
                allHardcodedTags.push( ...hardcodedTags )
            }
            
            // Progress indicator
            if( schemasWithHardcodedTags.length % 5 === 0 && schemasWithHardcodedTags.length > 0 ) {
                process.stdout.write( '🔍' )
            }
        } )
        
        console.log( '\n\n' + '─'.repeat( 60 ) + '\n' )
        
        // Report findings
        if( schemasWithHardcodedTags.length > 0 ) {
            console.log( '❌ SCHEMAS WITH HARDCODED TAGS:\n' )
            
            schemasWithHardcodedTags.forEach( ( schema, index ) => {
                const { path, namespace, hardcodedTags, problematicTags, routeNames, allTags } = schema
                
                console.log( `${index + 1}. 📁 ${path}` )
                console.log( `   Namespace: ${namespace}` )
                console.log( `   Hardcoded tags: ${hardcodedTags.join( ', ' )}` )
                console.log( `   Available routes: ${routeNames.join( ', ' )}` )
                console.log( `   All tags: ${allTags.join( ', ' )}` )
                
                // Check which tags will break after filtering
                const willBreak = problematicTags.filter( t => t.problematic && t.routeExists )
                if( willBreak.length > 0 ) {
                    console.log( `   ⚠️  Will break after filtering: ${willBreak.map( t => t.tag ).join( ', ' )}` )
                }
                
                console.log( '' )
            } )
            
            // Pattern analysis
            const uniquePatterns = [ ...new Set( allHardcodedTags ) ].sort()
            console.log( '📊 UNIQUE HARDCODED TAG PATTERNS:\n' )
            uniquePatterns.forEach( ( pattern, index ) => {
                const count = allHardcodedTags.filter( t => t === pattern ).length
                console.log( `  ${index + 1}. "${pattern}" (used ${count} times)` )
            } )
            console.log( '' )
            
            // Generate TODO list
            console.log( '📋 TODO LIST FOR FIXES:\n' )
            schemasWithHardcodedTags.forEach( ( schema, index ) => {
                const { path, hardcodedTags } = schema
                console.log( `${index + 1}. Fix ${path}` )
                console.log( `   - Remove tags: ${hardcodedTags.join( ', ' )}` )
                console.log( `   - Replace with semantic tags (e.g., "defi", "nft", "price", etc.)` )
                console.log( '' )
            } )
            
        } else {
            console.log( '✅ No schemas with hardcoded namespace.routeName tags found!\n' )
        }
        
        // Final summary
        console.log( '='.repeat( 60 ) )
        console.log( '📊 DETECTION SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( `Total schemas analyzed:     ${totalSchemas}` )
        console.log( `Schemas with hardcoded tags: ${schemasWithHardcodedTags.length}` )
        console.log( `Unique hardcoded patterns:   ${[ ...new Set( allHardcodedTags ) ].length}` )
        console.log( `Total hardcoded tag usage:   ${allHardcodedTags.length}` )
        
        const percentage = ( ( schemasWithHardcodedTags.length / totalSchemas ) * 100 ).toFixed( 1 )
        console.log( `Affected percentage:         ${percentage}%` )
        console.log( '='.repeat( 60 ) + '\n' )
        
        // Exit with appropriate code
        if( schemasWithHardcodedTags.length > 0 ) {
            console.log( '❌ Hardcoded tags detected! Please fix the schemas above.\n' )
            
            // Output for automated processing
            console.log( '🤖 MACHINE READABLE OUTPUT:' )
            console.log( JSON.stringify( {
                totalSchemas,
                affectedSchemas: schemasWithHardcodedTags.length,
                affectedPaths: schemasWithHardcodedTags.map( s => s.path ),
                uniquePatterns: [ ...new Set( allHardcodedTags ) ]
            }, null, 2 ) )
            
            process.exit( 1 )
        } else {
            console.log( '✅ All schemas are clean!\n' )
            process.exit( 0 )
        }
        
    } catch( error ) {
        console.error( '💥 Fatal error during detection:' )
        console.error( error )
        process.exit( 1 )
    }
}

// Run detection
detectHardcodedTags()