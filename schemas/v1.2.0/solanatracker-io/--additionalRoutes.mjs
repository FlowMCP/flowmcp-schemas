const additionalRoutes = {
    getTokenStats: {
      method: "GET",
      path: "/stats/{token}",
      description: "Get detailed stats for a token over multiple time intervals (e.g., 1m, 5m, 15m, 24h).",
      matchesSchemaRoute: "tokenStats", // → schema.routes.tokenStats
      tokenStats: {
        requestMethod: "GET",
        description: "Get detailed stats for a token over various time intervals via Solana Tracker — query by token.",
        route: "/stats/:token",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenStats", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTokenPoolStats: {
      method: "GET",
      path: "/stats/{token}/{pool}",
      description: "Get detailed stats for a specific token and pool pair over various time intervals.",
      matchesSchemaRoute: "tokenStatsByPool", // → schema.routes.tokenStatsByPool
      tokenStatsByPool: {
        requestMethod: "GET",
        description: "Get detailed stats for a token-pool pair over various time intervals. Required: token, pool.",
        route: "/stats/:token/:pool",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "pool", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenStatsByPool", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump", pool: "9Tb2ohu5P16BpBarqd3N27WnkF51Ukfs8Z1GzzLDxVZW" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      }
    }
  };


const schema = {
    namespace: "solanatracker",
    name: "TokenStatsAPI",
    description: "Provides detailed statistics for tokens and token-pool pairs over multiple time intervals.",
    docs: ["https://docs.solanatracker.io"],
    tags: ["solana", "analytics", "tokens"],
    flowMCP: "1.2.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
      'x-api-key': "{{SOLANA_TRACKER_API_KEY}}",
      'Content-Type': "application/json"
    },
    routes: {
      tokenStats: {
        requestMethod: "GET",
        description: "Get detailed stats for a token over various time intervals.",
        route: "/stats/:token",
        parameters: [
          { position: { key: "token", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Test tokenStats", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [
          { phase: "post", handlerName: "parseExecute" }
        ]
      },
      tokenStatsByPool: {
        requestMethod: "GET",
        description: "Get detailed stats for a token-pool pair over various time intervals.",
        route: "/stats/:token/:pool",
        parameters: [
          { position: { key: "token", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "pool", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Test tokenStatsByPool", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump", pool: "9Tb2ohu5P16BpBarqd3N27WnkF51Ukfs8Z1GzzLDxVZW" }
        ],
        modifiers: [
          { phase: "post", handlerName: "parseExecute" }
        ]
      }
    },
    handlers: {
      parseExecute: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  

export { schema }