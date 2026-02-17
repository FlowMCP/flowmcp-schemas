// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 63 lines

export const main = {
    namespace: 'solanatracker',
    name: 'PnL Analytics API',
    description: 'Retrieve profit and loss analytics for Solana wallets via Solana Tracker — full PnL breakdown, per-token PnL, and first-buyer analysis for any wallet address.',
    version: '2.0.0',
    docs: ['https://docs.solanatracker.io'],
    tags: ['solana', 'pnl', 'portfolio', 'cacheTtlFrequent'],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        profitAndLossData: {
            method: 'GET',
            path: '/pnl/:wallet',
            description: 'Get Profit and Loss data for all positions of a wallet.',
            parameters: [
                { position: { key: 'wallet', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'showHistoricPnL', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'holdingCheck', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'hideDetails', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ]
        },
        pnlForSpecificToken: {
            method: 'GET',
            path: '/pnl/:wallet/:token',
            description: 'Get Profit and Loss data for a specific token in a wallet.',
            parameters: [
                { position: { key: 'wallet', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        firstBuyers: {
            method: 'GET',
            path: '/first-buyers/:token',
            description: 'Get the first 100 buyers of a token, with full PnL breakdown per wallet. Required: token.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const pnlRoutes = {
        getWalletPnL: {
          method: "GET",
          path: "/pnl/{wallet}",
          description: "Get full PnL data for a wallet, including all positions.",
          queryParams: [
            "showHistoricPnL (optional): Include 1d, 7d, 30d intervals (BETA)",
            "holdingCheck (optional): Verify current holdings in wallet",
            "hideDetails (optional): Only return summary"
          ],
          matchesSchemaRoute: "profitAndLossData", // → schema.routes.profitAndLossData
          profitAndLossData: {
            requestMethod: "GET",
            description: "Get Profit and Loss data for all positions of a wallet via Solana Tracker — query by wallet.",
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
              { _description: "Test profitAndLossData", wallet: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK" }
            ],
            modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
          },
        },
        getTokenPnL: {
          method: "GET",
          path: "/pnl/{wallet}/{token}",
          description: "Get PnL for a specific token in a wallet.",
          matchesSchemaRoute: "pnlForSpecificToken", // → schema.routes.pnlForSpecificToken
          pnlForSpecificToken: {
            requestMethod: "GET",
            description: "Get Profit and Loss data for a specific token in a wallet via Solana Tracker — query by wallet and token.",
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
              { _description: "Test pnlForSpecificToken", wallet: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump." }
            ],
            modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
          },
        },
        getFirstBuyers: {
          method: "GET",
          path: "/first-buyers/{token}",
          description: "Get the first 100 buyers of a token, with full PnL breakdown per wallet.",
          matchesSchemaRoute: null // ❌ nicht im schema.mjs vorhanden
        }
      };

    return {
        profitAndLossData: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        pnlForSpecificToken: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        firstBuyers: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        }
    }
}
