// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 44 lines

export const main = {
    namespace: 'solanatracker',
    name: 'TopTradersAPI',
    description: 'Provides access to the most profitable traders across all tokens, with support for pagination and token-specific queries.',
    version: '2.0.0',
    docs: ['https://docs.solanatracker.io'],
    tags: ['solana', 'trading', 'leaderboard', 'cacheTtlFrequent'],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        topTradersAll: {
            method: 'GET',
            path: '/top-traders/all',
            description: 'Get the most profitable traders across all tokens via Solana Tracker. Supports expandPnl, sortBy filters.',
            parameters: [
                { position: { key: 'expandPnl', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(total,winPercentage)', options: ['optional()'] } }
            ]
        },
        topTradersAllPaged: {
            method: 'GET',
            path: '/top-traders/all/:page',
            description: 'Get the most profitable traders across all tokens, paginated by page number. Required: page.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        topTradersByToken: {
            method: 'GET',
            path: '/top-traders/:token',
            description: 'Get the top 100 most profitable traders for a specific token. via Solana Tracker.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)', 'max(20)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

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

    return {
        topTradersAll: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }
                return { response }
            }
        },
        topTradersAllPaged: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }
                return { response }
            }
        },
        topTradersByToken: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }
                return { response }
            }
        }
    }
}
