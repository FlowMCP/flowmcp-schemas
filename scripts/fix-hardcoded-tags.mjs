#!/usr/bin/env node

// Batch fix script for removing hardcoded namespace.routeName tags
// Replaces them with semantic tags based on schema content

import { SchemaImporter } from '../src/index.mjs'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

console.log( '\n' + '='.repeat( 60 ) )
console.log( '🔧 BATCH FIX: Remove Hardcoded Tags' )
console.log( '='.repeat( 60 ) + '\n' )

// Semantic tag mapping based on schema analysis
const semanticTagMappings = {
    'aave': ['defi', 'lending', 'protocol'],
    'bicscan': ['security', 'risk', 'scanning'],
    'bitget': ['exchange', 'trading', 'price'],
    'blockberry': ['blockchain', 'explorer', 'mina'],
    'bridgeRates': ['bridge', 'crosschain', 'defi'],
    'cryptoOrderbook': ['trading', 'orderbook', 'exchange'],
    'chainlink': ['oracle', 'price', 'feeds'],
    'chainlinkMulticall': ['oracle', 'price', 'feeds'],
    'chainlist': ['blockchain', 'rpc', 'network'],
    'chartImg': ['charts', 'visualization', 'trading'],
    'coingecko': ['price', 'market', 'stablecoins'],
    'cryptodata': ['price', 'market', 'data'],
    'cryptowizards': ['analytics', 'trading', 'backtest'],
    'dexscreener': ['dex', 'trading', 'pairs'],
    'ens': ['domain', 'identity', 'ethereum'],
    'epo': ['patents', 'research', 'search'],
    'ethscriptions': ['nft', 'ethereum', 'inscriptions'],
    'goldskyNouns': ['dao', 'governance', 'nft'],
    'honeypot': ['security', 'token', 'validation'],
    'medium': ['content', 'social', 'feeds'],
    'minascanDevnet': ['blockchain', 'explorer', 'mina'],
    'minascanMainnet': ['blockchain', 'explorer', 'mina'],
    'newsapi': ['news', 'media', 'content'],
    'passportOnchain': ['identity', 'attestation', 'gitcoin'],
    'simdune': ['token', 'sei', 'analytics'],
    'snapshot': ['dao', 'governance', 'voting'],
    'spaceid': ['domain', 'identity', 'web3'],
    'stolpersteineBerl': ['memorial', 'history', 'berlin'],
    'swaggerhub': ['api', 'documentation', 'registry'],
    'uniswap': ['dex', 'trading', 'defi'],
    'webcareer': ['jobs', 'career', 'web3']
}

async function fixHardcodedTags() {
    let totalFixed = 0
    let totalSchemas = 0
    let errors = []
    
    try {
        // Load all schemas
        console.log( '📦 Loading schemas from schemas/v1.2.0/...\n' )
        
        const schemaResults = await SchemaImporter.loadFromFolder( {
            schemaRootFolder: path.join( __dirname, '../schemas/v1.2.0/' ),
            excludeSchemasWithImports: false,
            excludeSchemasWithRequiredServerParams: false,
            addAdditionalMetaData: true
        } )
        
        totalSchemas = schemaResults.length
        
        // Pattern to detect hardcoded namespace.routeName tags
        const hardcodedTagPattern = /^[a-zA-Z]+\.[a-zA-Z]+$/
        
        console.log( '🔧 Processing schemas...\n' )
        
        for( const schemaData of schemaResults ) {
            const { schema, fileName, folderName, absolutePath } = schemaData
            const schemaPath = `${folderName}/${fileName}`
            
            if( !schema.tags || !Array.isArray( schema.tags ) ) {
                continue
            }
            
            // Check if schema has hardcoded tags
            const hardcodedTags = schema.tags.filter( ( tag ) => {
                return hardcodedTagPattern.test( tag )
            } )
            
            if( hardcodedTags.length === 0 ) {
                continue
            }
            
            console.log( `🔄 Fixing ${schemaPath}...` )
            console.log( `   Removing: ${hardcodedTags.join( ', ' )}` )
            
            // Get semantic tags for this namespace
            const semanticTags = semanticTagMappings[ schema.namespace ] || ['data', 'api']
            
            // Filter out hardcoded tags, keep semantic ones
            const cleanTags = schema.tags.filter( ( tag ) => {
                return !hardcodedTagPattern.test( tag )
            } )
            
            // Add semantic tags if not already present
            semanticTags.forEach( ( tag ) => {
                if( !cleanTags.includes( tag ) ) {
                    cleanTags.push( tag )
                }
            } )
            
            console.log( `   Replacing with: ${cleanTags.join( ', ' )}` )
            
            try {
                // Read the file content
                const fileContent = await fs.readFile( absolutePath, 'utf8' )
                
                // Create the replacement tags array string
                const oldTagsLine = `tags: [${schema.tags.map( t => `"${t}"` ).join( ', ' )}]`
                const newTagsLine = `tags: [${cleanTags.map( t => `"${t}"` ).join( ', ' )}]`
                
                // Replace the tags line
                const updatedContent = fileContent.replace( oldTagsLine, newTagsLine )
                
                if( updatedContent === fileContent ) {
                    // Try alternative format matching
                    const altOldPattern = `tags: \\[\\s*${schema.tags.map( t => `"${t.replace( /[.*+?^${}()|[\\]\\\\]/g, '\\\\$&' )}"` ).join( ',\\s*' )}\\s*\\]`
                    const altRegex = new RegExp( altOldPattern )
                    const altUpdatedContent = fileContent.replace( altRegex, newTagsLine )
                    
                    if( altUpdatedContent !== fileContent ) {
                        await fs.writeFile( absolutePath, altUpdatedContent, 'utf8' )
                        totalFixed++
                        console.log( `   ✅ Fixed (alternative match)` )
                    } else {
                        errors.push( `Failed to match tags pattern in ${schemaPath}` )
                        console.log( `   ❌ Failed to match pattern` )
                    }
                } else {
                    // Write the updated content
                    await fs.writeFile( absolutePath, updatedContent, 'utf8' )
                    totalFixed++
                    console.log( `   ✅ Fixed` )
                }
                
            } catch( error ) {
                errors.push( `Error processing ${schemaPath}: ${error.message}` )
                console.log( `   ❌ Error: ${error.message}` )
            }
            
            console.log( '' )
        }
        
        // Summary
        console.log( '='.repeat( 60 ) )
        console.log( '📊 BATCH FIX SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( `Total schemas processed: ${totalSchemas}` )
        console.log( `Schemas fixed:           ${totalFixed}` )
        console.log( `Errors:                  ${errors.length}` )
        console.log( '='.repeat( 60 ) + '\n' )
        
        if( errors.length > 0 ) {
            console.log( '❌ ERRORS ENCOUNTERED:\n' )
            errors.forEach( ( error, index ) => {
                console.log( `${index + 1}. ${error}` )
            } )
            console.log( '' )
        }
        
        if( totalFixed > 0 ) {
            console.log( `✅ Successfully fixed ${totalFixed} schemas!` )
            console.log( '🔄 Run validation to verify fixes...\n' )
        } else {
            console.log( '📝 No schemas needed fixing.\n' )
        }
        
        process.exit( errors.length > 0 ? 1 : 0 )
        
    } catch( error ) {
        console.error( '💥 Fatal error during batch fix:' )
        console.error( error )
        process.exit( 1 )
    }
}

// Run the batch fix
fixHardcodedTags()