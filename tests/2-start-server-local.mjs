import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { FlowMCP, Server } from 'flowmcp'

import { fileURLToPath } from 'url'
import path from 'path'


const { serverMetadata, scriptRootFolder, schemasRootFolder, localEnvPath } = {
    'serverMetadata': {
        'name': 'Test',
        'description': 'This is a development server for testing purposes.',
        'version': '1.2.0', 
    },
    'scriptRootFolder': path.dirname( fileURLToPath( import.meta.url ) ),
    'schemasRootFolder': './../schemas/v1.2.0/',
    'localEnvPath': './../../../.env',
}


Server
    .getArgvParameters( {
        'argv': process.argv,
        'claudeArgv': '--launched-by=claude',
        'includeNamespaces': [],
        'excludeNamespaces': [],
        'activateTags': [],
    } )
    .prepare( { scriptRootFolder, schemasRootFolder, localEnvPath } )
    .then( async( schemas ) => {
        const server = new McpServer( serverMetadata )
        schemas
            .forEach( ( { serverParams, schema, activateTags } ) => {
                FlowMCP.activateServerTools( { server, schema, serverParams, activateTags, 'silent': false } )
            } )
        try { 
            const transport = new StdioServerTransport()
            const connection = await server.connect( transport ) 
            console.log( 'Server started successfully.', connection === undefined  )
        } 
        catch( err ) { console.error( 'Failed to start server:', err ) }
        return true
    } )
    .catch( ( e ) => {
        console.error( 'Error:', e )
        process.exit( 1 )
    } )