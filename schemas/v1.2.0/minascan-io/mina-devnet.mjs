const schema = {
    namespace: "minascanDevnet",
    name: "MinaScan Devnet GraphQL API",
    description: "Access Mina Protocol devnet blockchain data through MinaScan's GraphQL endpoint.",
    docs: ["https://api.minascan.io", "https://minaprotocol.com"],
    tags: ["production", "blockchain", "explorer", "mina", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.minascan.io/node/devnet/v1/graphql",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
        getMinaDevnetSchema: {
            requestMethod: "POST",
            description: "Get the complete GraphQL schema structure from MinaScan devnet endpoint. Returns structured JSON response data.",
            route: "/",
            parameters: [],
            tests: [
                { _description: "Fetch MinaScan devnet GraphQL schema introspection" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetSchemaQuery" }
            ]
        },
        getMinaDevnetQuery: {
            requestMethod: "POST",
            description: "Execute a custom GraphQL query against the MinaScan devnet endpoint. Required: query.",
            route: "/",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get network sync status", query: "{ syncStatus daemonStatus { chainId blockchainLength uptimeSecs stateHash } }" },
                { _description: "Get best chain blocks", query: "{ bestChain(maxLength: 3) { stateHash protocolState { consensusState { blockHeight } } } }" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildCustomQuery" }
            ]
        }
    },
    handlers: {
        buildGetSchemaQuery: async ({ struct, payload }) => {
            payload.body = {
                query: `query IntrospectionQuery {
  __schema {
    queryType {
      name
      fields {
        name
        description
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
        args {
          name
          description
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
          defaultValue
        }
      }
    }
    types {
      kind
      name
      description
      fields {
        name
        description
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
}`
            };
            return { struct, payload };
        },
        buildCustomQuery: async ({ struct, payload, userParams }) => {
            const { query } = userParams;
            payload.body = {
                query: query
            };
            return { struct, payload };
        }
    }
};

export { schema };