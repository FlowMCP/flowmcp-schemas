export const schema = {
    name: "TheGraph",
    description: "Interact with The Graph's hosted subgraphs via introspection and raw GraphQL querying.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://gateway.thegraph.com/api",
    requiredServerParams: ["THEGRAPH_API_KEY"],
    headers: {
      apiKey: "Bearer {{THEGRAPH_API_KEY}}"
    },
    routes: {
      getSubgraphSchema: {
        requestMethod: "POST",
        description: "Fetches the GraphQL schema of a subgraph using introspection.",
        route: "/:THEGRAPH_API_KEY/subgraphs/id/:subgraphId",
        parameters: [
          {
            position: { key: "subgraphId", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "asText", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()", "default(false)"] }
          }
        ],
        tests: [
          { _description: "Fetch schema for sample subgraph", subgraphId: "HMuAwufqP...", asText: false }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatSchemaResult" }
        ]
      },
      querySubgraph: {
        requestMethod: "POST",
        description: "Executes a raw GraphQL query against a subgraph.",
        route: "/:THEGRAPH_API_KEY/subgraphs/id/:subgraphId",
        parameters: [
          {
            position: { key: "subgraphId", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "query", value: "{{USER_PARAM}}", location: "body" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Query for sample subgraph with basic query",
            subgraphId: "HMuAwufqP...",
            query: "query { exampleEntity(first: 5) { id } }"
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatQueryResult" }
        ]
      }
    },
    handlers: {
      formatSchemaResult: async ({ struct, payload }) => {
        const result = payload?.content?.[0]?.text || "";
        struct.schema = result;
        return { struct, payload };
      },
      formatQueryResult: async ({ struct, payload }) => {
        const result = payload?.content?.[0]?.text || "";
        struct.data = result;
        return { struct, payload };
      }
    }
  };
  