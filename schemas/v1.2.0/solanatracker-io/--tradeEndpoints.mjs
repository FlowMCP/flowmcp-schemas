const tradeRoutes = {
    getTokenTrades: {
      method: "GET",
      path: "/trades/{tokenAddress}",
      description: "Get the latest trades for a token across all pools.",
      queryParams: [
        "cursor (optional)",
        "showMeta (optional)",
        "parseJupiter (optional)",
        "hideArb (optional)",
        "sortDirection (optional)"
      ],
      matchesSchemaRoute: "tokenTrades", // ✅ schema.routes.tokenTrades
      tokenTrades: {
        requestMethod: "GET",
        description: "Get the latest trades for a token across all pools via Solana Tracker — query by tokenAddress.",
        route: "/trades/:tokenAddress",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenTrades", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTokenPoolTrades: {
      method: "GET",
      path: "/trades/{tokenAddress}/{poolAddress}",
      description: "Get the latest trades for a specific token and pool.",
      queryParams: [
        "cursor (optional)",
        "showMeta (optional)",
        "parseJupiter (optional)",
        "hideArb (optional)",
        "sortDirection (optional)"
      ],
      matchesSchemaRoute: null // ❌ nicht vorhanden im schema.mjs
    },
    getUserPoolTrades: {
      method: "GET",
      path: "/trades/{tokenAddress}/{poolAddress}/{owner}",
      description: "Get the latest trades for a specific token, pool, and user.",
      queryParams: [
        "cursor (optional)",
        "showMeta (optional)",
        "parseJupiter (optional)",
        "hideArb (optional)",
        "sortDirection (optional)"
      ],
      matchesSchemaRoute: null // ❌ nicht vorhanden im schema.mjs
    },
    getUserTokenTrades: {
      method: "GET",
      path: "/trades/{tokenAddress}/by-wallet/{owner}",
      description: "Get the latest trades for a token by a specific wallet.",
      queryParams: [
        "cursor (optional)",
        "showMeta (optional)",
        "parseJupiter (optional)",
        "hideArb (optional)",
        "sortDirection (optional)"
      ],
      matchesSchemaRoute: "tradesByWallet", // ✅ schema.routes.tradesByWallet
      tradesByWallet: {
        requestMethod: "GET",
        description: "Get the latest trades for a specific token and wallet address. Required: tokenAddress, owner. Optional filters: showMeta, parseJupiter, hideArb.",
        route: "/trades/:tokenAddress/by-wallet/:owner",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "showMeta", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          },
          {
            position: { key: "parseJupiter", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          },
          {
            position: { key: "hideArb", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test tradesByWallet", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump", owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    }
  };


const schema = {
    namespace: "solanatracker",
    name: "TokenTradeTracker",
    description: "Retrieve Solana DEX trade data via Solana Tracker — latest trades by token, pool, wallet, or combination. Supports pagination and Jupiter parse mode.",
    docs: ["https://docs.solanatracker.io"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
      'x-api-key': "{{SOLANA_TRACKER_API_KEY}}",
      'Content-Type': "application/json"
    },
    routes: {
      tokenTrades: {
        requestMethod: "GET",
        description: "Get the latest trades for a token across all pools.",
        route: "/trades/:tokenAddress",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Test tokenTrades", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tradesByWallet: {
        requestMethod: "GET",
        description: "Get the latest trades for a specific token and wallet address.",
        route: "/trades/:tokenAddress/by-wallet/:owner",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "showMeta", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
          { position: { key: "parseJupiter", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
          { position: { key: "hideArb", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } }
        ],
        tests: [
          {
            _description: "Test tradesByWallet",
            tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
            owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tokenPoolTrades: {
        requestMethod: "GET",
        description: "Get the latest trades for a specific token and pool via Solana Tracker — query by tokenAddress and poolAddress.",
        route: "/trades/:tokenAddress/:poolAddress",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "poolAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          {
            _description: "Test tokenPoolTrades",
            tokenAddress: "Token123",
            poolAddress: "Pool456"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      userPoolTrades: {
        requestMethod: "GET",
        description: "Get the latest trades for a specific token, pool, and user via Solana Tracker — query by tokenAddress and poolAddress and owner.",
        route: "/trades/:tokenAddress/:poolAddress/:owner",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "poolAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          {
            _description: "Test userPoolTrades",
            tokenAddress: "Token123",
            poolAddress: "Pool456",
            owner: "Wallet789"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      }
    },
    handlers: {
      parseExecute: async ({ struct, payload }) => {
        if( struct['data'].error ) {
          struct['status'] = false
          struct['messages'].push( struct['data'].error )
          return { struct, payload }
        }
        return { struct, payload };
      }
    }
  };
  

export { schema }