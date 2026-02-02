export const schema = {
    namespace: "coincap",
    name: "AssetsAPI",
    description: "Retrieve cryptocurrency asset data from CoinCap — prices, market caps, supply, volume, and historical data for thousands of tokens.",
    docs: ["https://pro.coincap.io/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://rest.coincap.io/v3",
    requiredServerParams: ["COINCAP_API_KEY"],
    headers: {
        Authorization: "Bearer {{COINCAP_API_KEY}}"
    },
    routes: {
      listAssets: {
        requestMethod: "GET",
        description: "Retrieve a list of assets via CoinCap. Supports search, ids, limit filters. Returns structured JSON response data.",
        route: "/assets",
        parameters: [
          { position: { key: "search", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(100)"] }},
          { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(0)"] }},
        ],
        tests: [
          { _description: "Fetch first 10 assets", limit: 10 },
          { _description: "Search for bitcoin", search: "bitcoin" }
        ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      singleAsset: {
        requestMethod: "GET",
        description: "Retrieve details for a specific asset via CoinCap — query by slug. Returns structured JSON response data.",
        route: "/assets/:slug",
        parameters: [
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] }}
        ],
        tests: [
          { _description: "Fetch Bitcoin data", slug: "bitcoin" }
        ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      assetMarkets: {
        requestMethod: "GET",
        description: "Retrieve market data for an asset via CoinCap — query by slug. Supports limit, offset filters.",
        route: "/assets/:slug/markets",
        parameters: [
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] }},
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(100)"] }},
          { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(0)"] }},
        ],
        tests: [
          { _description: "Markets for bitcoin", slug: "bitcoin" }
        ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      assetHistory: {
        requestMethod: "GET",
        description: "Retrieve historical data for an asset via CoinCap — query by slug. Supports start, end filters.",
        route: "/assets/:slug/history",
        parameters: [
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] }},
          { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(m1,m5,m15,m30,h1,h2,h6,h12,d1)", options: [] }},
          { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] }},
          { position: { key: "end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] }},
        ],
        tests: [
          { _description: "1-day history for bitcoin", slug: "bitcoin", interval: "d1" }
        ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      }
    },
    handlers: {
      modifyResult: async ({ struct, payload }) => {
        return { struct, payload }
      }
    }
  };
  