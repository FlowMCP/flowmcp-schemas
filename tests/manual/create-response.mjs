import fs from 'fs'
import path from 'path'
import { SchemaImporter } from "../../src/index.mjs"
import { FlowMCP } from 'flowmcp'
import { Print } from './../helpers/Print.mjs'
import { getServerParams, parseSimpleArgvInput } from './../helpers/utils.mjs'


const { envPath, schemaRootFolder, namespace, fileName, verbose } = parseSimpleArgvInput( { 
    argv: process.argv.slice( 2 ),
    defaultEnvPath: '../../.env',
    defaultSchemaRootFolder: '../schemas/v1.2.0'
} )

if( verbose ) {
    console.log( `=
 Debug Configuration:` )
    console.log( `  envPath:          ${envPath}` )
    console.log( `  schemaRootFolder: ${schemaRootFolder}` )
    console.log( `  namespace:        ${namespace || 'all'}` )
    console.log( `  fileName:         ${fileName || 'all'}` )
    console.log( '' )
}

const timestamp = Math.floor( Date.now() / 1000 )
const responseBaseFolder = `./.response/${timestamp}/v1.2.0`

// Tracking metrics
let totalDelay = 0
const responseMetrics = []

console.log( `=� Response Recording Session: ${timestamp}` )
console.log( `=� Base folder: ${responseBaseFolder}` )
console.log( '' )

const schemaImporterConfig = {
    schemaRootFolder,
    excludeSchemasWithImports: false,
    excludeSchemasWithRequiredServerParams: false,
    addAdditionalMetaData: true
}

const availableSchemas = await SchemaImporter
    .loadFromFolder( schemaImporterConfig )
const filteredSchemas = availableSchemas
    .filter( ( item ) => {
        if( namespace && item['schema']['namespace'].toLowerCase() !== namespace ) {
            return false
        }
        if( fileName && item['fileName'].toLowerCase() !== fileName ) {
            return false
        }
        return true
    } )

console.log( `=� Found ${filteredSchemas.length} schemas to test and record` )
if( filteredSchemas.length === 0 ) {
    console.log( 'Available namespaces:', availableSchemas.map( s => s.schema.namespace ).filter( ( v, i, a ) => a.indexOf( v ) === i ) )
    if( namespace ) {
        console.log( `No schema found with namespace: ${namespace}` )
    }
    if( fileName ) {
        console.log( `No schema found with filename: ${fileName}` )
    }
}

await filteredSchemas
    .reduce( ( promise, struct ) => promise.then( async () => {
        const { schema, namespace, fileName } = struct
        Print.log( `\n=� ${namespace} � ${fileName}` )
        
        const namespaceFolderPath = path.join( responseBaseFolder, namespace )
        fs.mkdirSync( namespaceFolderPath, { recursive: true } )
        
        await FlowMCP
            .getAllTests( { schema } )
            .reduce( ( testPromise, test, testIndex ) => testPromise.then( async () => {
                const { routeName, userParams } = test
                const serverParams = getServerParams( {
                    'path': envPath,
                    'requiredServerParams': schema.requiredServerParams
                } )

                // Measure response time
                const startTime = Date.now()
                const fullResponse = await FlowMCP
                    .fetch({ schema, userParams, routeName, serverParams } )
                const responseTime = Date.now() - startTime
                
                const { status, messages, dataAsString } = fullResponse
                Print.row( { status, messages, dataAsString, routeName } )
                
                // Originales Test-Objekt aus Schema extrahieren
                const originalTestObject = schema.routes[routeName]?.tests?.[testIndex] || {}
                
                // Track metrics
                responseMetrics.push( {
                    namespace,
                    routeName,
                    testIndex,
                    responseTime
                } )
                
                const markdownContent = createResponseMarkdown( {
                    namespace,
                    routeName,
                    testIndex,
                    userParams,
                    fullResponse,
                    testObject: originalTestObject,
                    responseTime
                } )
                
                // Sanitize filename by replacing invalid characters
                const sanitizedRouteName = routeName
                    .replace( /:/g, '_' )
                    .replace( /\//g, '_' )
                    .replace( /\\/g, '_' )
                    .replace( /\?/g, '_' )
                    .replace( /\*/g, '_' )
                    .replace( /"/g, '_' )
                    .replace( /</g, '_' )
                    .replace( />/g, '_' )
                    .replace( /\|/g, '_' )
                
                const fileName = `${sanitizedRouteName}-${testIndex}.md`
                const filePath = path.join( namespaceFolderPath, fileName )
                fs.writeFileSync( filePath, markdownContent )
                
                console.log( `    =� Saved: ${filePath} (Response time: ${responseTime}ms)` )
                const delayTime = 1000
                totalDelay += delayTime
                await Print.delay( delayTime )
            } ), Promise.resolve() )
    } ), Promise.resolve() )

console.log( `\n Response recording complete!` )
console.log( `=� All responses saved to: ${responseBaseFolder}` )
console.log( '' )
console.log( `=� Performance Metrics:` )
console.log( `  Total tests: ${responseMetrics.length}` )
console.log( `  Total delay used: ${totalDelay}ms (${(totalDelay / 1000).toFixed(1)}s)` )
const avgResponseTime = responseMetrics.reduce( ( sum, m ) => sum + m.responseTime, 0 ) / responseMetrics.length || 0
console.log( `  Average response time: ${avgResponseTime.toFixed(0)}ms` )
const minResponseTime = Math.min( ...responseMetrics.map( m => m.responseTime ) )
const maxResponseTime = Math.max( ...responseMetrics.map( m => m.responseTime ) )
console.log( `  Min response time: ${minResponseTime}ms` )
console.log( `  Max response time: ${maxResponseTime}ms` )

// Save metrics summary
const metricsPath = path.join( responseBaseFolder, 'metrics.json' )
fs.writeFileSync( metricsPath, JSON.stringify( {
    timestamp,
    totalTests: responseMetrics.length,
    totalDelay,
    avgResponseTime,
    minResponseTime,
    maxResponseTime,
    details: responseMetrics
}, null, 2 ) )
console.log( `\n=� Metrics saved to: ${metricsPath}` )


function createResponseMarkdown( { namespace, routeName, testIndex, userParams, fullResponse, testObject, responseTime } ) {
    const timestamp = new Date().toISOString()
    
    return `# Test Response: ${namespace} - ${routeName}

## Test Details
- **Namespace:** ${namespace}
- **Route:** ${routeName}
- **Test Index:** ${testIndex}
- **Timestamp:** ${timestamp}
- **Response Time:** ${responseTime}ms
- **Parameters:** 
\`\`\`json
${JSON.stringify( userParams, null, 2 )}
\`\`\`

## Schema Test Definition
\`\`\`json
${JSON.stringify( testObject, null, 2 )}
\`\`\`

## Response Data
\`\`\`json
${JSON.stringify( fullResponse, null, 2 )}
\`\`\`
`
}