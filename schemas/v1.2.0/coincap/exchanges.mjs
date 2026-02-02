export const schema = {
    namespace: "coincap",
    name: "CoinCapExchanges",
    description: "Access cryptocurrency exchange data from CoinCap — list all exchanges with volume rankings or retrieve detailed metadata for a specific exchange by ID.",
    docs: ["https://pro.coincap.io/api-docs"],
    tags: ["crypto", "exchanges", "marketdata", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://rest.coincap.io/v3",
    requiredServerParams: ["COINCAP_API_KEY"],
    headers: {
        Authorization: "Bearer {{COINCAP_API_KEY}}"
    },
    routes: {
      listExchanges: {
        requestMethod: "GET",
        description: "Retrieve a list of exchanges via CoinCap. Supports limit, offset filters. Returns structured JSON response data.",
        route: "/exchanges",
        parameters: [
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(10)", "optional()"] } },
          { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(0)", "optional()"] } }
        ],
        tests: [
          { _description: "List 5 exchanges", limit: 5 },
          { _description: "List exchanges with offset", offset: 2 }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getExchangeById: {
        requestMethod: "GET",
        description: "Retrieve details for a specific exchange via CoinCap — query by exchange. Returns structured JSON response data.",
        route: "/exchanges/:exchange",
        parameters: [
          { position: { key: "exchange", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Fetch Binance.US exchange", exchange: "binanceus" }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
        modifyResult: async ({ struct, payload }) => {
            return { struct, payload }
        }
    }
  };
  