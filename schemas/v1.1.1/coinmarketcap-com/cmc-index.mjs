export const schema = {
    name: "CoinMarketCap100",
    description: "Retrieve historical and latest CoinMarketCap 100 Index data.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://pro-api.coinmarketcap.com",
    requiredServerParams: ["CMC_API_KEY"],
    headers: {
      "X-CMC_PRO_API_KEY": "{{CMC_API_KEY}}"
    },
    routes: {
      getHistorical: {
        requestMethod: "GET",
        description: "Fetch a historical range of CoinMarketCap 100 Index values.",
        route: "/v3/index/cmc100-historical",
        parameters: [
          { position: { key: "time_start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "time_end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["enum(5m,15m,daily)", "optional()"] } }
        ],
        tests: [
          { _description: "Fetch historical data without specifying time." }
        ],
        modifiers: [
          { phase: "post", handlerName: "modify" }
        ]
      },
      getLatest: {
        requestMethod: "GET",
        description: "Fetch the latest CoinMarketCap 100 Index value.",
        route: "/v3/index/cmc100-latest",
        parameters: [],
        tests: [
          { _description: "Fetch latest data." }
        ],
        modifiers: [
          { phase: "post", handlerName: "modify" }
        ]
      }
    },
    handlers: {
      modify: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  