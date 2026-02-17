// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "mcpRegistry" -> "mcpregistry"

export const main = {
    namespace: 'mcpregistry',
    name: 'MCP Server Registry',
    description: 'Browse and search the official Model Context Protocol server registry to discover available MCP servers',
    version: '2.0.0',
    docs: ['https://registry.modelcontextprotocol.io/', 'https://modelcontextprotocol.io/'],
    tags: ['mcp', 'registry', 'ai', 'tools', 'cacheTtlDaily'],
    root: 'https://registry.modelcontextprotocol.io/v0',
    routes: {
        listServers: {
            method: 'GET',
            path: '/servers',
            description: 'List MCP servers from the official registry with cursor-based pagination. Optional filters: count, cursor.',
            parameters: [
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(30)', 'optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List first 5 servers', count: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        servers: { type: 'array', items: { type: 'object', properties: { server: { type: 'object' }, _meta: { type: 'object' } } } },
                        metadata: { type: 'object', properties: { nextCursor: { type: 'string' }, count: { type: 'number' } } }
                    }
                }
            },
        },
        searchServers: {
            method: 'GET',
            path: '/servers',
            description: 'Search MCP servers by name or keyword using the registry endpoint. Optional filters: count, cursor.',
            parameters: [
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(30)', 'optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List servers for search', count: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        servers: { type: 'array', items: { type: 'object', properties: { server: { type: 'object' }, _meta: { type: 'object' } } } },
                        metadata: { type: 'object', properties: { nextCursor: { type: 'string' }, count: { type: 'number' } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    listServers: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.servers ) {
            return { response }}

            const servers = raw.servers
            .map( ( entry ) => {
            const s = entry.server || {}
            const meta = entry._meta || {}
            const officialMeta = meta['io.modelcontextprotocol.registry/official'] || {}

            const packages = ( s.packages || [] )
            .map( ( pkg ) => {
            const result = {
            registryType: pkg.registryType,
            identifier: pkg.identifier,
            transportType: pkg.transport && pkg.transport.type
            }

            return result
            } )

            const remotes = ( s.remotes || [] )
            .map( ( remote ) => {
            const result = {
            type: remote.type,
            url: remote.url
            }

            return result
            } )

            const result = {
            name: s.name,
            description: s.description,
            version: s.version,
            repository: s.repository && s.repository.url,
            packages: packages.length > 0 ? packages : undefined,
            remotes: remotes.length > 0 ? remotes : undefined,
            status: officialMeta.status,
            publishedAt: officialMeta.publishedAt,
            isLatest: officialMeta.isLatest
            }

            return result
            } )

            const nextCursor = raw.metadata && raw.metadata.nextCursor

            response = {
            source: "MCP Server Registry",
            serverCount: servers.length,
            nextCursor: nextCursor || null,
            servers
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting server list: ${error.message}` )
            }

            return { response }
        }
    },
    searchServers: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.servers ) {
            return { response }}

            const servers = raw.servers
            .map( ( entry ) => {
            const s = entry.server || {}
            const meta = entry._meta || {}
            const officialMeta = meta['io.modelcontextprotocol.registry/official'] || {}

            const packages = ( s.packages || [] )
            .map( ( pkg ) => {
            const result = {
            registryType: pkg.registryType,
            identifier: pkg.identifier,
            transportType: pkg.transport && pkg.transport.type
            }

            return result
            } )

            const remotes = ( s.remotes || [] )
            .map( ( remote ) => {
            const result = {
            type: remote.type,
            url: remote.url
            }

            return result
            } )

            const result = {
            name: s.name,
            description: s.description,
            version: s.version,
            repository: s.repository && s.repository.url,
            packages: packages.length > 0 ? packages : undefined,
            remotes: remotes.length > 0 ? remotes : undefined,
            status: officialMeta.status,
            publishedAt: officialMeta.publishedAt,
            isLatest: officialMeta.isLatest
            }

            return result
            } )

            const nextCursor = raw.metadata && raw.metadata.nextCursor

            response = {
            source: "MCP Server Registry",
            serverCount: servers.length,
            nextCursor: nextCursor || null,
            servers
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting server list: ${error.message}` )
            }

            return { response }
        }
    }
} )
