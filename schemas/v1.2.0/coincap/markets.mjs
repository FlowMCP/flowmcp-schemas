export const schema = {
    namespace: "coincap",
    name: "CoinCapMarkets",
    description: "Access CoinCap market pair data — list trading pairs across exchanges with price, volume, spread, and exchange metadata. Supports filtering by exchange or asset.",
    docs: ["https://pro.coincap.io/api-docs"],
    tags: ["crypto", "markets", "trading"],
    flowMCP: "1.2.0",
    root: "https://rest.coincap.io/v3",
    requiredServerParams: ["COINCAP_API_KEY"],
    headers: {
        Authorization: "Bearer {{COINCAP_API_KEY}}"
    },
    routes: {
      listMarkets: {
        requestMethod: "GET",
        description: "Retrieve a list of markets with optional filters via CoinCap. Supports exchangeId, baseSymbol, baseId filters.",
        route: "/markets",
        parameters: [
          { position: { key: "exchangeId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "baseSymbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "baseId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "quoteSymbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "quoteId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "assetSymbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "assetId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(10)", "optional()"] } },
          { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(0)", "optional()"] } }
        ],
        tests: [
          { _description: "Default market list" },
          { _description: "Markets from BinanceUS", exchangeId: "binanceus" },
          { _description: "Markets for base asset BTC", baseSymbol: "BTC" },
          { _description: "Limit results to 5", limit: 5 }
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
  