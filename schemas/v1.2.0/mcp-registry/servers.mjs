export const schema = {
    namespace: "mcpRegistry",
    name: "MCP Server Registry",
    description: "Browse and search the official Model Context Protocol server registry to discover available MCP servers",
    docs: ["https://registry.modelcontextprotocol.io/", "https://modelcontextprotocol.io/"],
    tags: ["mcp", "registry", "ai", "tools"],
    flowMCP: "1.2.0",
    root: "https://registry.modelcontextprotocol.io/v0",
    requiredServerParams: [],
    headers: {},
    routes: {
        listServers: {
            requestMethod: "GET",
            description: "List MCP servers from the official registry with cursor-based pagination",
            route: "/servers",
            parameters: [
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(30)", "optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List first 5 servers", count: 5 }
            ],
            modifiers: [{ phase: "post", handlerName: "formatServerList" }]
        },
        searchServers: {
            requestMethod: "GET",
            description: "Search MCP servers by name or keyword using the registry endpoint",
            route: "/servers",
            parameters: [
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(30)", "optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List servers for search", count: 10 }
            ],
            modifiers: [{ phase: "post", handlerName: "formatServerList" }]
        }
    },
    handlers: {
        formatServerList: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.servers ) {
                    return { struct, payload }
                }

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

                struct.data = {
                    source: "MCP Server Registry",
                    serverCount: servers.length,
                    nextCursor: nextCursor || null,
                    servers
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting server list: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
