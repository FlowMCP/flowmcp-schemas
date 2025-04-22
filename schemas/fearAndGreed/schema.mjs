export const schema = {
    name: "FearGreedIndex",
    description: "Fetches and analyzes the Crypto Fear & Greed Index from alternative.me.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.alternative.me/fng",
    requiredServerParams: [],
    headers: {},
    routes: {
      getCurrentFng: {
        requestMethod: "GET",
        description: "Retrieve the latest Fear & Greed Index.",
        route: "/",
        parameters: [],
        tests: [
          { _description: "Get current FNG value" }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatCurrentFng" }
        ]
      },
      getHistoricalFng: {
        requestMethod: "GET",
        description: "Get historical Fear & Greed Index values for past days.",
        route: "/",
        parameters: [
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(7)"] }
          }
        ],
        tests: [
          { _description: "Fetch FNG for past 5 days", days: 5 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatHistoricalFng" }
        ]
      },
      analyzeFngTrend: {
        requestMethod: "GET",
        description: "Analyze the trend of the Fear & Greed Index over a number of days.",
        route: "/",
        parameters: [
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(7)"] }
          }
        ],
        tests: [
          { _description: "Analyze FNG trend for last 10 days", days: 10 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatFngTrend" }
        ]
      }
    },
    handlers: {
      formatCurrentFng: async ({ struct, payload }) => {
        struct.fng = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      formatHistoricalFng: async ({ struct, payload }) => {
        struct.history = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      formatFngTrend: async ({ struct, payload }) => {
        struct.analysis = payload?.content?.[0]?.text || "";
        return { struct, payload };
      }
    }
  };
  