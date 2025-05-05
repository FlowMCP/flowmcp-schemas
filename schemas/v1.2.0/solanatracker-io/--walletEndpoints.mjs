const walletRoutes = {
    getWalletTokens: {
      method: "GET",
      path: "/wallet/{owner}",
      description: "Get all tokens in a wallet with value in USD and metadata.",
      matchesSchemaRoute: "walletInformation", // ✅ schema.routes.walletInformation
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
          { _description: "Test walletInformation", owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getWalletTokensBasic: {
      method: "GET",
      path: "/wallet/{owner}/basic",
      description: "Lightweight version: token balances and values without full metadata.",
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getWalletTokensPaged: {
      method: "GET",
      path: "/wallet/{owner}/page/{page}",
      description: "Paginated version: fetch wallet tokens page by page (250 per page).",
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getWalletTrades: {
      method: "GET",
      path: "/wallet/{owner}/trades",
      description: "Get latest trades for a wallet. Supports pagination via cursor.",
      queryParams: ["cursor (optional)"],
      matchesSchemaRoute: "walletTrades", // ✅ schema.routes.walletTrades
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
          { _description: "Test walletTrades", owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    }
}


const schema = {
    namespace: "solanatracker",
    name: "WalletExplorer",
    description: "API zur Abfrage von Token-Balances und Handelsdaten für Wallets.",
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
      walletInformation: {
        requestMethod: "GET",
        description: "Get all tokens in a wallet with current value in USD.",
        route: "/wallet/:owner",
        parameters: [
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Test walletInformation", owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      walletTokensBasic: {
        requestMethod: "GET",
        description: "Lightweight version: token balances and values without full metadata.",
        route: "/wallet/:owner/basic",
        parameters: [
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Test walletTokensBasic", owner: "TestWalletAddress" }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      walletTokensPaged: {
        requestMethod: "GET",
        description: "Paginated version: fetch wallet tokens page by page (250 per page).",
        route: "/wallet/:owner/page/:page",
        parameters: [
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "page", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Test walletTokensPaged", owner: "TestWalletAddress", page: 1 }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      walletTrades: {
        requestMethod: "GET",
        description: "Get the latest trades of a wallet.",
        route: "/wallet/:owner/trades",
        parameters: [
          { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Test walletTrades", owner: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
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