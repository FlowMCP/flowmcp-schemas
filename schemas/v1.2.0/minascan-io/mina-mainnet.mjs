const schema = {
    namespace: "minascanMainnet",
    name: "MinaScan Mainnet GraphQL API",
    description: "Access Mina Protocol mainnet blockchain data through MinaScan's GraphQL endpoint.",
    docs: ["https://api.minascan.io", "https://minaprotocol.com"],
    tags: ["production", "blockchain", "explorer", "mina", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.minascan.io/node/mainnet/v1/graphql",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
        getMinaMainnetSchema: {
            requestMethod: "POST",
            description: "Get the complete GraphQL schema structure from MinaScan mainnet endpoint. Returns structured JSON response data.",
            route: "/",
            parameters: [],
            tests: [
                { _description: "Fetch MinaScan mainnet GraphQL schema introspection" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetSchemaQuery" }
            ]
        },
        getMinaMainnetQuery: {
            requestMethod: "POST",
            description: "Execute a custom GraphQL query against the MinaScan mainnet endpoint. Required: query.",
            route: "/",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get mainnet sync status", query: "{ syncStatus daemonStatus { chainId blockchainLength uptimeSecs stateHash } }" },
                { _description: "Get mainnet best chain blocks", query: "{ bestChain(maxLength: 3) { stateHash protocolState { consensusState { blockHeight } } } }" },
                { _description: "Get mainnet genesis constants", query: "{ genesisConstants { accountCreationFee coinbase } }" }
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