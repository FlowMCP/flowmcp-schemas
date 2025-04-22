export const schema = {
    name: "SolanaTracker",
    description: "Comprehensive Solana analytics API for token, wallet, trade, price, and market data.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.solanatracker.io",
    requiredServerParams: [],
    headers: {},
    routes: {
      tokenInformation: {
        requestMethod: "GET",
        description: "Retrieve all information for a specific token.",
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
        modifiers: []
      },
  
      tokenHolders: {
        requestMethod: "GET",
        description: "Get the top 100 holders for a specific token.",
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
        modifiers: []
      },
  
      tokenAth: {
        requestMethod: "GET",
        description: "Retrieve the all time high price of a token (since data api started recording)",
        route: "/tokens/:tokenAddress/ath",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenAth", tokenAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: []
      },
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
        modifiers: []
      },
  
      latestTokens: {
        requestMethod: "GET",
        description: "Retrieve the latest 100 tokens.",
        route: "/tokens/latest",
        parameters: [],
        tests: [
          { _description: "Test latestTokens" }
        ],
        modifiers: []
      },
  
      trendingTokens: {
        requestMethod: "GET",
        description: "Get the top 100 trending tokens based on transaction volume in the past hour.",
        route: "/tokens/trending",
        parameters: [],
        tests: [
          { _description: "Test trendingTokens" }
        ],
        modifiers: []
      },
  
      priceInformation: {
        requestMethod: "GET",
        description: "Get price information for a single token.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test priceInformation", token: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      postPrice: {
        requestMethod: "POST",
        description: "Similar to GET /price, but accepts token address in the request body.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "body" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test postPrice", token: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      multiPriceInformation: {
        requestMethod: "GET",
        description: "Get price information for multiple tokens (up to 100).",
        route: "/price/multi",
        parameters: [
          {
            position: { key: "tokens", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "object()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test multiPriceInformation", tokens: ["CzLSuj..."] }
        ],
        modifiers: []
      },
      walletInformation: {
        requestMethod: "GET",
        description: "Get all tokens in a wallet with current value in USD.",
        route: "/wallet/:owner",
        parameters: [
          {
            position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test walletInformation", owner: "95z7osZ7LcAoF..." }
        ],
        modifiers: []
      },
  
      walletTrades: {
        requestMethod: "GET",
        description: "Get the latest trades of a wallet.",
        route: "/wallet/:owner/trades",
        parameters: [
          {
            position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test walletTrades", owner: "95z7osZ7LcAoF..." }
        ],
        modifiers: []
      },
  
      tokenTrades: {
        requestMethod: "GET",
        description: "Get the latest trades for a token across all pools.",
        route: "/trades/:tokenAddress",
        parameters: [
          {
            position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenTrades", tokenAddress: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      tradesByWallet: {
        requestMethod: "GET",
        description: "Get the latest trades for a specific token and wallet address.",
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
          { _description: "Test tradesByWallet", tokenAddress: "CzLSuj...", owner: "8bHMV..." }
        ],
        modifiers: []
      },
  
      chartData: {
        requestMethod: "GET",
        description: "",
        route: "/chart/:token",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test chartData", token: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      chartDataByPool: {
        requestMethod: "GET",
        description: "Get OLCVH (Open, Low, Close, Volume, High) data for charts.",
        route: "/chart/:token/:pool",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "pool", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "type", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "time_from", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          },
          {
            position: { key: "time_to", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test chartDataByPool", token: "CzLSuj...", pool: "9Tb2oh..." }
        ],
        modifiers: []
      },
      profitAndLossData: {
        requestMethod: "GET",
        description: "Get Profit and Loss data for all positions of a wallet.",
        route: "/pnl/:wallet",
        parameters: [
          {
            position: { key: "wallet", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "showHistoricPnL", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test profitAndLossData", wallet: "8bHMV..." }
        ],
        modifiers: []
      },
  
      pnlForSpecificToken: {
        requestMethod: "GET",
        description: "Get Profit and Loss data for a specific token in a wallet.",
        route: "/pnl/:wallet/:token",
        parameters: [
          {
            position: { key: "wallet", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test pnlForSpecificToken", wallet: "8bHMV...", token: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      topTraders: {
        requestMethod: "GET",
        description: "Get the most profitable traders",
        route: "/top-traders/all",
        parameters: [],
        tests: [
          { _description: "Test topTraders" }
        ],
        modifiers: []
      },
  
      tokenStats: {
        requestMethod: "GET",
        description: "Get detailed stats for a token over various time intervals.",
        route: "/stats/:token",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test tokenStats", token: "CzLSuj..." }
        ],
        modifiers: []
      },
  
      tokenStatsByPool: {
        requestMethod: "GET",
        description: "Get detailed stats for a token-pool pair over various time intervals.",
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
          { _description: "Test tokenStatsByPool", token: "CzLSuj...", pool: "9Tb2oh..." }
        ],
        modifiers: []
      }
    },
  
    handlers: {}
  };
      