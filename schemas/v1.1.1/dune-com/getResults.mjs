export const schema = {
    name: "DuneAnalytics",
    description: "Interface with Dune Analytics to execute and retrieve query results.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.dune.com/api/v1",
    requiredServerParams: ["DUNE_API_KEY"],
    headers: {
      "X-Dune-API-Key": "{{DUNE_API_KEY}}"
    },
    routes: {
      getLatestResult: {
        requestMethod: "GET",
        description: "Fetch latest result for a Dune query ID (returns CSV string).",
        route: "/query/:query_id/results",
        parameters: [
          {
            position: { key: "query_id", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "number()", options: [] }
          }
        ],
        tests: [
          { _description: "Retrieve latest result from query ID", query_id: 4032586 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatCSVResult" }
        ]
      },
/*
      runQuery: {
        requestMethod: "POST",
        description: "Execute a Dune query by ID and return results as CSV string.",
        route: "/query/execute/:query_id",
        parameters: [
          {
            position: { key: "query_id", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "number()", options: [] }
          }
        ],
        tests: [
          { _description: "Run query by ID and return results", query_id: 4856405 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatCSVResult" }
        ]
      }
*/
    },

    handlers: {
      formatCSVResult: async ({ struct, payload }) => {
        struct.csv = payload?.content?.[0]?.text || "";
        return { struct, payload };
      }
    }
  };
  