const tokenEndpoints = {
    getTokenInfo: {
      method: "GET",
      path: "/tokens/{tokenAddress}",
      description: "Get Token Information",
      matchesSchemaRoute: "tokenInformation", // ✅ schema.routes.tokenInformation
      tokenInformation: {
        requestMethod: "GET",
        description: "Retrieve all information for a specific token via Solana Tracker — query by tokenAddress.",
        route: "/tokens/:tokenAddress",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenInformation", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'pre', 'handlerName': 'beforeExecute' } ]
      },
    },
    getTokenByPool: {
      method: "GET",
      path: "/tokens/by-pool/{poolAddress}",
      description: "Get Token by Pool Address",
      matchesSchemaRoute: "tokenByPool" // ✅ schema.routes.tokenByPool
    },
    getTokenHolders: {
      method: "GET",
      path: "/tokens/{tokenAddress}/holders",
      description: "Get top 100 token holders and total amount",
      matchesSchemaRoute: "tokenHolders", // ✅ schema.routes.tokenHolders
      tokenHolders: {
        requestMethod: "GET",
        description: "Get the top 100 holders for a specific token via Solana Tracker — query by tokenAddress.",
        route: "/tokens/:tokenAddress/holders",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenHolders", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTop20TokenHolders: {
      method: "GET",
      path: "/tokens/{tokenAddress}/holders/top",
      description: "Get top 20 token holders",
      matchesSchemaRoute: "topTokenHolders" // ✅ schema.routes.topTokenHolders
    },
    getAllTimeHigh: {
      method: "GET",
      path: "/tokens/{tokenAddress}/ath",
      description: "Get all-time high price of a token",
      matchesSchemaRoute: "allTimeHighPrice" // ✅ schema.routes.allTimeHighPrice
    },
    getTokensByDeployer: {
      method: "GET",
      path: "/deployer/{wallet}",
      description: "Get all tokens deployed by a specific wallet",
      matchesSchemaRoute: "tokensByDeployer" // ✅ schema.routes.tokensByDeployer
    },
    searchTokens: {
      method: "GET",
      path: "/search",
      description: "Advanced token search with filtering and pagination",
      matchesSchemaRoute: "tokenSearch", // ✅ schema.routes.tokenSearch
      search: {
        requestMethod: "GET",
        description: "The /search endpoint provides a flexible search interface for pools and tokens with support for multiple filtering criteria and pagination.",
        route: "/search",
        parameters: [
          {
            position: { key: "query", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "page", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          },
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          },
          {
            position: { key: "minLiquidity", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          },
          {
            position: { key: "maxLiquidity", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          },
          {
            position: { key: "market", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test search", query: "soybean", market: "pumpfun" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getLatestTokens: {
      method: "GET",
      path: "/tokens/latest",
      description: "Get the latest 100 tokens",
      matchesSchemaRoute: "latestTokens", // ✅ schema.routes.latestTokens
      latestTokens: {
        requestMethod: "GET",
        description: "Retrieve the latest 100 tokens via Solana Tracker. Returns structured JSON response data.",
        route: "/tokens/latest",
        parameters: [],
        tests: [
          { _description: "Test latestTokens" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getMultipleTokens: {
      method: "POST",
      path: "/tokens/multi",
      description: "Get multiple tokens by array of addresses (max 20)",
      matchesSchemaRoute: "multipleTokens" // ✅ schema.routes.multipleTokens
    },
    getTrendingTokens: {
      method: "GET",
      path: "/tokens/trending",
      description: "Get top 100 trending tokens (default: 1h)",
      matchesSchemaRoute: "trendingTokens", // ✅ schema.routes.trendingTokens
      trendingTokens: {
        requestMethod: "GET",
        description: "Get the top 100 trending tokens based on transaction volume in the past hour. via Solana Tracker.",
        route: "/tokens/trending",
        parameters: [],
        tests: [
          { _description: "Test trendingTokens" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTrendingTokensByTimeframe: {
      method: "GET",
      path: "/tokens/trending/{timeframe}",
      description: "Get trending tokens by specific timeframe (e.g., 5m, 24h)",
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getTokensByVolume: {
      method: "GET",
      path: "/tokens/volume",
      description: "Get top 100 tokens by volume (default timeframe)",
      matchesSchemaRoute: "tokensByVolume" // ✅ schema.routes.tokensByVolume
    },
    getTokensByVolumeTimeframe: {
      method: "GET",
      path: "/tokens/volume/{timeframe}",
      description: "Get top 100 tokens by volume for a specific timeframe",
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getTokenOverview: {
      method: "GET",
      path: "/tokens/multi/all",
      description: "Overview of latest, graduating, and graduated tokens",
      matchesSchemaRoute: "tokenOverview" // ✅ schema.routes.tokenOverview
    },
    getGraduatedTokens: {
      method: "GET",
      path: "/tokens/multi/graduated",
      description: "Overview of all graduated tokens (Pumpvision/Moonshot)",
      matchesSchemaRoute: "graduatedTokens" // ✅ schema.routes.graduatedTokens
    }
  };


const schema = {
    namespace: "solanatracker",
    name: "TokenAPI",
    description: "Provides endpoints for retrieving information about tokens, their holders, search capabilities, and statistical metrics like volume and trending status.",
    docs: ["https://docs.solanatracker.io"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
      'x-api-key': "{{SOLANA_TRACKER_API_KEY}}",
      'Content-Type': "application/json"
    },
    handlers: {
      beforeExecute: async ({ struct, payload }) => {
        return { struct, payload };
      },
      parseExecute: async ({ struct, payload }) => {
        if( struct['data'].error ) {
          struct['status'] = false
          struct['messages'].push( struct['data'].error )
          return { struct, payload }
        }

        return { struct, payload };
      }
    },
    routes: {
      tokenInformation: {
        requestMethod: "GET",
        description: "Retrieve all information for a specific token.",
        route: "/tokens/:tokenAddress",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test tokenInformation", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" } ],
        modifiers: [ { phase: "pre", handlerName: "beforeExecute" } ]
      },
      tokenHolders: {
        requestMethod: "GET",
        description: "Get the top 100 holders for a specific token.",
        route: "/tokens/:tokenAddress/holders",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test tokenHolders", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      topTokenHolders: {
        requestMethod: "GET",
        description: "Get top 20 token holders via Solana Tracker — query by tokenAddress. Returns structured JSON response data.",
        route: "/tokens/:tokenAddress/holders/top",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test topTokenHolders", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      allTimeHighPrice: {
        requestMethod: "GET",
        description: "Get all-time high price of a token via Solana Tracker — query by tokenAddress. Returns structured JSON response data.",
        route: "/tokens/:tokenAddress/ath",
        parameters: [
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test allTimeHighPrice", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tokensByDeployer: {
        requestMethod: "GET",
        description: "Get all tokens deployed by a specific wallet via Solana Tracker — query by wallet.",
        route: "/deployer/:wallet",
        parameters: [
          { position: { key: "wallet", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test tokensByDeployer", wallet: "wallet123" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      search: {
        requestMethod: "GET",
        description: "Advanced token search with filtering and pagination via Solana Tracker. Supports page, limit, minLiquidity filters.",
        route: "/search",
        parameters: [
          { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "minLiquidity", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "maxLiquidity", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
          { position: { key: "market", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [ { _description: "Test search", query: "soybean", market: "pumpfun" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      latestTokens: {
        requestMethod: "GET",
        description: "Retrieve the latest 100 tokens.",
        route: "/tokens/latest",
        parameters: [],
        tests: [ { _description: "Test latestTokens" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      multipleTokens: {
        requestMethod: "POST",
        description: "Get multiple tokens by array of addresses (max 20) via Solana Tracker. Returns structured JSON response data.",
        route: "/tokens/multi",
        parameters: [],
        tests: [ { _description: "Test multipleTokens" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      trendingTokens: {
        requestMethod: "GET",
        description: "Get the top 100 trending tokens based on transaction volume in the past hour.",
        route: "/tokens/trending",
        parameters: [],
        tests: [ { _description: "Test trendingTokens" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ],
      },
      tokensByVolume: {
        requestMethod: "GET",
        description: "Get top 100 tokens by volume (default timeframe) via Solana Tracker. Returns structured JSON response data.",
        route: "/tokens/volume",
        parameters: [],
        tests: [ { _description: "Test tokensByVolume" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tokenOverview: {
        requestMethod: "GET",
        description: "Overview of latest, graduating, and graduated tokens via Solana Tracker. Returns structured JSON response data.",
        route: "/tokens/multi/all",
        parameters: [],
        tests: [ { _description: "Test tokenOverview" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      graduatedTokens: {
        requestMethod: "GET",
        description: "Overview of all graduated tokens (Pumpvision/Moonshot) via Solana Tracker. Returns structured JSON response data.",
        route: "/tokens/multi/graduated",
        parameters: [],
        tests: [ { _description: "Test graduatedTokens" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tokenByPool: {
        requestMethod: "GET",
        description: "Get token by pool address via Solana Tracker — query by poolAddress. Returns structured JSON response data.",
        route: "/tokens/by-pool/:poolAddress",
        parameters: [
          { position: { key: "poolAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test tokenByPool", poolAddress: "pool123" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      trendingTokensByTimeframe: {
        requestMethod: "GET",
        description: "Get trending tokens by specific timeframe (e.g., 5m, 24h) via Solana Tracker — query by timeframe.",
        route: "/tokens/trending/:timeframe",
        parameters: [
          { position: { key: "timeframe", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test trendingTokensByTimeframe", timeframe: "24h" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      tokensByVolumeTimeframe: {
        requestMethod: "GET",
        description: "Get top 100 tokens by volume for a specific timeframe via Solana Tracker — query by timeframe.",
        route: "/tokens/volume/:timeframe",
        parameters: [
          { position: { key: "timeframe", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [ { _description: "Test tokensByVolumeTimeframe", timeframe: "7d" } ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      }
    }
  };

  
export { schema }