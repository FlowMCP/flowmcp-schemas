const schema = {
    namespace: "luksoNetwork",
    name: "LuksoMainnetSubgraph",
    description: "Query the LUKSO Mainnet blockchain via GraphQL — introspect the schema and run custom queries against the LUKSO subgraph explorer.",
    docs: ["https://explorer.execution.testnet.lukso.network/graphiql", "https://explorer.execution.mainnet.lukso.network/graphiql"],
    tags: ["lukso", "graphql", "explorer", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.mainnet.lukso.network/api",
    requiredServerParams: [],
    headers: {},
    routes: {
      getLuksoExplorerSchema: {
        requestMethod: "POST",
        description: "Execute a GraphQL query against the LUKSO mainnet subgraph via LUKSO BlockScout.",
        route: "/v1/graphql",
        parameters: [
            { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { _description: "Simple entity fetch", query: "query { _meta { block { number } } }" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "insertQuery" },
          { phase: "post", handlerName: "getLuksoExplorerSchema" }
        ]
      },
      fectchLuksoExplorer: {
        requestMethod: "POST",
        description: "Run a raw GraphQL query on a lukso explorer via LUKSO BlockScout. Returns structured JSON response data.",
        route: "/v1/graphql",
        parameters: [
          { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] }
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ],
        tests: [
          { 
            _description: "Sample query for entity data", 
            "query": "query { transaction(hash: \"0x4bfc02eff230de3ae789102369bc302569ed23822f9cb253af9020851e7766ac\") { hash fromAddressHash toAddressHash value gasUsed status blockNumber } }"
        }
        ]
      }
    },
    handlers: {
        insertQuery: async ({ struct, payload }) => {
            const query = `
              query IntrospectionQuery {
                __schema {
                  types {
                    name
                    kind
                    fields {
                      name
                    }
                  }
                }
              }
            `
            payload['body'] = { query }
            return { struct, payload }
        },
        getLuksoExplorerSchema: async ({ struct, payload }) => {
            const data = struct?.data?.data || {};
            if (!data.__schema) {
              struct.status = false
              struct.messages = ["No schema returned."];
            } else {
              struct.status = true;
              struct.data = data.__schema;
            }
            return { struct, payload }
        },
        modifyResult: async ({ struct, payload }) => {
            if( struct['data']?.errors ) {
                struct.status = false
                struct.messages = struct['data']?.errors.map(e => e.message)
            }

            return { struct, payload }
        }
    }
  }
  
  export { schema }