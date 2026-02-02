export const schema = {
    namespace: "coinmarketcap",
    name: "CMCCryptoFearAndGreed",
    description: "Retrieve the CoinMarketCap Crypto Fear and Greed Index — latest sentiment reading plus historical time-series data for market psychology tracking.",
    docs: ["https://coinmarketcap.com/api/documentation/v1/"],
    tags: ["crypto", "sentiment", "index", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://pro-api.coinmarketcap.com",
    requiredServerParams: ["CMC_API_KEY"],
    headers: {
      "X-CMC_PRO_API_KEY": "{{CMC_API_KEY}}"
    },
    routes: {
      getFearAndGreedHistorical: {
        requestMethod: "GET",
        description: "Fetch historical CMC Crypto Fear and Greed values via CoinMarketCap. Supports start, limit filters.",
        route: "/v3/fear-and-greed/historical",
        parameters: [
          { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(500)", "optional()"] } }
        ],
        tests: [
          { _description: "Fetch first 5 historical Fear and Greed values.", start: 1, limit: 5 },
          { _description: "Fetch historical values without pagination parameters." }
        ],
        modifiers: [
          { phase: "post", handlerName: "modify" }
        ]
      },
      getFearAndGreedLatest: {
        requestMethod: "GET",
        description: "Fetch the latest CMC Crypto Fear and Greed value via CoinMarketCap. Returns structured JSON response data.",
        route: "/v3/fear-and-greed/latest",
        parameters: [],
        tests: [
          { _description: "Fetch latest Fear and Greed value." }
        ],
        modifiers: [
          { phase: "post", handlerName: "modify" }
        ]
      }
    },
    handlers: {
      modify: async ({ struct, payload }) => {
        return { struct, payload }
      }
    }
  };
  