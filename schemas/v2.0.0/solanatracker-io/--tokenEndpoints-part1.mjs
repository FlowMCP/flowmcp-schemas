// Split from solanatracker-io/--tokenEndpoints.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 15 routes (v2 max: 8) — needs splitting
// Module-level code: 177 lines

export const main = {
    namespace: 'solanatracker',
    name: 'TokenAPI (Part 1)',
    description: 'Provides endpoints for retrieving information about tokens, their holders, search capabilities, and statistical metrics like volume and trending status.',
    version: '2.0.0',
    docs: ['https://docs.solanatracker.io'],
    tags: ['solana', 'tokens', 'discovery', 'cacheTtlFrequent'],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        tokenInformation: {
            method: 'GET',
            path: '/tokens/:tokenAddress',
            description: 'Retrieve all information for a specific token.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        tokenHolders: {
            method: 'GET',
            path: '/tokens/:tokenAddress/holders',
            description: 'Get the top 100 holders for a specific token.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        topTokenHolders: {
            method: 'GET',
            path: '/tokens/:tokenAddress/holders/top',
            description: 'Get top 20 token holders via Solana Tracker — query by tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        allTimeHighPrice: {
            method: 'GET',
            path: '/tokens/:tokenAddress/ath',
            description: 'Get all-time high price of a token via Solana Tracker — query by tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        tokensByDeployer: {
            method: 'GET',
            path: '/deployer/:wallet',
            description: 'Get all tokens deployed by a specific wallet via Solana Tracker — query by wallet.',
            parameters: [
                { position: { key: 'wallet', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        search: {
            method: 'GET',
            path: '/search',
            description: 'Advanced token search with filtering and pagination via Solana Tracker. Supports page, limit, minLiquidity filters.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'minLiquidity', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'maxLiquidity', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'market', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        latestTokens: {
            method: 'GET',
            path: '/tokens/latest',
            description: 'Retrieve the latest 100 tokens.',
            parameters: []
        },
        multipleTokens: {
            method: 'POST',
            path: '/tokens/multi',
            description: 'Get multiple tokens by array of addresses (max 20) via Solana Tracker. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

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

    return {
        tokenHolders: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        topTokenHolders: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        allTimeHighPrice: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        tokensByDeployer: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        search: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        latestTokens: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        multipleTokens: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        }
    }
}
