const schema = {
    namespace: "context7",
    name: "Context7 Library Docs",
    description: "Accesses searchable documentation and examples for programming libraries using Context7.",
    docs: ["https://context7.com/docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://context7.com/api",
    requiredServerParams: [],
    headers: {
        "X-Context7-Source": "mcp-server"
    },
    routes: {
        searchLibraryId: {
            requestMethod: "GET",
            description: "Resolves a library name into a Context7-compatible library ID and returns top matches.",
            route: "/v1/search",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Resolve React library", query: "n8n" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifySearchLibraryResults" }
            ]
        },
        getLibraryDocs: {
            requestMethod: "GET",
            description: "Fetches documentation for a specific library using its Context7-compatible library ID.",
            route: "/v1/{{libraryId}}",
            parameters: [
                { position: { key: "libraryId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "tokens", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: [ "optional()"] } },
                { position: { key: "topic", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [ "optional()"] } },
                // { position: { key: "folders", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [ "optional()"] } }
            ],
            tests: [
                { _description: "Get docs for nextjs", libraryId: "/n8n-io/n8n", tokens: 12000  }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResults" }
            ]
        }
    },
    handlers: {
        modifySearchLibraryResults: async ({ struct, payload }) => {
            if( struct['data'].results === undefined ) {
                struct.status = false
                struct.messages.push( "No results found" )
                return { struct, payload }
            }
            struct['data'] = struct['data']['results']

            return { struct, payload }
        },
        modifyResults: async ({ struct, payload }) => {
            return { struct, payload }
        }
    }
};


export { schema };
