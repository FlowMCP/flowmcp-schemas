const topTradersRoutes = {
    getTopTradersAll: {
      method: "GET",
      path: "/top-traders/all",
      description: "Get the most profitable traders across all tokens.",
      queryParams: [
        "expandPnl (optional): Include detailed PnL data for each token",
        "sortBy (optional): Sort by 'total' or 'winPercentage'"
      ],
      matchesSchemaRoute: "topTraders", // → schema.routes.topTraders
      topTraders: {
        requestMethod: "GET",
        description: "Get the most profitable traders",
        route: "/top-traders/all",
        parameters: [],
        tests: [
          { _description: "Test topTraders" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTopTradersAllPaged: {
      method: "GET",
      path: "/top-traders/all/{page}",
      description: "Same as /top-traders/all, but paginated.",
      matchesSchemaRoute: "topTraders", // same base route handled by same endpoint
      topTraders: {
        requestMethod: "GET",
        description: "Get the most profitable traders",
        route: "/top-traders/all",
        parameters: [],
        tests: [
          { _description: "Test topTraders" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getTopTradersForToken: {
      method: "GET",
      path: "/top-traders/{token}",
      description: "Get top 100 traders by PnL for a specific token.",
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    }
  };


const schema = {
    namespace: "solanatracker",
    name: "TopTradersAPI",
    description: "Provides access to the most profitable traders across all tokens, with support for pagination and token-specific queries.",
    docs: ["https://docs.solanatracker.io"],
    tags: ["solana", "trading", "leaderboard"],
    flowMCP: "1.2.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
      'x-api-key': "{{SOLANA_TRACKER_API_KEY}}",
      'Content-Type': "application/json"
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
    },
    routes: {
      topTradersAll: {
        requestMethod: "GET",
        description: "Get the most profitable traders across all tokens via Solana Tracker. Supports expandPnl, sortBy filters.",
        route: "/top-traders/all",
        parameters: [
          {
            position: {
              key: "expandPnl",
              value: "{{USER_PARAM}}",
              location: "query"
            },
            z: {
              primitive: "boolean()",
              options: ["optional()"]
            }
          },
          {
            position: {
              key: "sortBy",
              value: "{{USER_PARAM}}",
              location: "query"
            },
            z: {
              primitive: "enum(total,winPercentage)",
              options: ["optional()"]
            }
          }
        ],
        tests: [
          { _description: "Test topTradersAll" }
        ],
        modifiers: [
          { phase: "post", handlerName: "parseExecute" }
        ]
      },
      topTradersAllPaged: {
        requestMethod: "GET",
        description: "Get the most profitable traders across all tokens, paginated by page number. Required: page.",
        route: "/top-traders/all/:page",
        parameters: [
          {
            position: {
              key: "page",
              value: "{{USER_PARAM}}",
              location: "insert"
            },
            z: {
              primitive: "number()",
              options: ["min(1)"]
            }
          }
        ],
        tests: [
          { _description: "Test topTradersAllPaged", page: 1 }
        ],
        modifiers: [
          { phase: "post", handlerName: "parseExecute" }
        ]
      },
      topTradersByToken: {
        requestMethod: "GET",
        description: "Get the top 100 most profitable traders for a specific token. via Solana Tracker.",
        route: "/top-traders/:token",
        parameters: [
          {
            position: {
              key: "token",
              value: "{{USER_PARAM}}",
              location: "insert"
            },
            z: {
              primitive: "string()",
              options: ["min(2)", "max(20)"]
            }
          }
        ],
        tests: [
          { _description: "Test topTradersByToken", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [
          { phase: "post", handlerName: "parseExecute" }
        ]
      }
    }
  };

  
  export { schema }