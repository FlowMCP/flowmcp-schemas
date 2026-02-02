export const schema = {
    namespace: "coinmarketcap",
    name: "CoinMarketCap100",
    description: "Retrieve the CoinMarketCap 100 Index — latest index value and historical time-series data for the CMC100 benchmark of top cryptocurrencies.",
    docs: ["https://coinmarketcap.com/api/documentation/v1/"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://pro-api.coinmarketcap.com",
    requiredServerParams: ["CMC_API_KEY"],
    headers: {
      "X-CMC_PRO_API_KEY": "{{CMC_API_KEY}}"
    },
    routes: {
      getHistorical: {
        requestMethod: "GET",
        description: "Fetch a historical range of CoinMarketCap 100 Index values. Supports time_start, time_end, count filters.",
        route: "/v3/index/cmc100-historical",
        parameters: [
          { position: { key: "time_start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "time_end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(5m,15m,daily)", options: [, "optional()"] } }
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
        description: "Fetch the latest CoinMarketCap 100 Index value. Returns structured JSON response data.",
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
  