const schema = {
  namespace: "thegraph",
  name: "TheGraphSubgraphTools",
  description: "Introspect and query The Graph subgraphs.",
  docs: ["https://thegraph.com/docs/en/"],
  tags: [],
  flowMCP: "1.2.0",
  root: "https://gateway.thegraph.com",
  requiredServerParams: ["THEGRAPH_API_KEY"],
  headers: {
    Authorization: "Bearer {{THEGRAPH_API_KEY}}"
  },
  routes: {
    getSubgraphSchema: {
      requestMethod: "POST",
      description: "Fetch the schema of a subgraph via introspection query.",
      route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/{{subgraphId}}",
      parameters: [
        {
          position: { key: "subgraphId", value: "{{USER_PARAM}}", location: "insert" },
          z: { primitive: "string()", options: [] }
        }
      ],
      modifiers: [
        { phase: "pre", handlerName: "setIntrospectionQuery" },
        { phase: "post", handlerName: "formatSchemaResult" }
      ],
      tests: [
        {
          _description: "Introspect Uniswap V3 subgraph",
          subgraphId: "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV"
        }
      ]
    },
    querySubgraph: {
      requestMethod: "POST",
      description: "Run a raw GraphQL query on a subgraph.",
      route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/{{subgraphId}}",
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
      modifiers: [
        { phase: "post", handlerName: "formatQueryResult" }
      ],
      tests: [
        {
          _description: "Sample query for entity data",
          subgraphId: "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
          query: "query { pools(first: 2) { id } }"
        }
      ]
    }
  },
  handlers: {
    setIntrospectionQuery: async ({ struct, payload }) => {
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
    formatSchemaResult: async ({ struct, payload }) => {
      const data = struct?.data?.data || {};
      if (!data.__schema) {
        struct.status = false;
        struct.messages = ["No schema returned."];
      } else {
        struct.status = true;
        struct.data = data.__schema;
      }
      return { struct, payload };
    },
    formatQueryResult: async ({ struct, payload }) => {
      const data = payload?.data?.data || {};
      if (!data) {
        struct.status = false;
        struct.messages = ["Query returned no data."];
      } else {
        struct.status = true;
        struct.data = JSON.stringify(data, null, 2);
      }
      return { struct, payload };
    }
  }
};

export { schema };
