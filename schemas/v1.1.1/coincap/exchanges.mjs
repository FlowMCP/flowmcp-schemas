export const schema = {
    name: "CoinCapExchanges",
    description: "Access exchange data from CoinCap including metadata and volume",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://rest.coincap.io/v3",
    requiredServerParams: ["COINCAP_API_KEY"],
    headers: {
        Authorization: "Bearer {{COINCAP_API_KEY}}"
    },
    routes: {
      listExchanges: {
        requestMethod: "GET",
        description: "Retrieve a list of exchanges",
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
        description: "Retrieve details for a specific exchange",
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
  