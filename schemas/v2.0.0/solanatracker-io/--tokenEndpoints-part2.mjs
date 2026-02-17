// Split from solanatracker-io/--tokenEndpoints.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 15 routes (v2 max: 8) — needs splitting
// Module-level code: 177 lines

export const main = {
    namespace: 'solanatracker',
    name: 'TokenAPI (Part 2)',
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
        trendingTokens: {
            method: 'GET',
            path: '/tokens/trending',
            description: 'Get the top 100 trending tokens based on transaction volume in the past hour.',
            parameters: [],
            tests: [
                { _description: 'Get top 100 trending Solana tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, isMutable: { type: 'boolean' }, description: { type: 'string' }, image: { type: 'string' }, showName: { type: 'boolean' }, extensions: { type: 'object' }, website: { type: 'string' }, twitter: { type: 'string' }, telegram: { type: 'string' }, tags: { type: 'array', items: { type: 'string' } }, creator: { type: 'object' }, createdOn: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, creation: { type: 'object' } } },
                            pools: { type: 'array', items: { type: 'object' } },
                            events: { type: 'object', properties: { '1m': { type: 'object' }, '5m': { type: 'object' }, '15m': { type: 'object' }, '30m': { type: 'object' }, '1h': { type: 'object' }, '2h': { type: 'object' }, '3h': { type: 'object' }, '4h': { type: 'object' }, '5h': { type: 'object' }, '6h': { type: 'object' }, '12h': { type: 'object' }, '24h': { type: 'object' } } },
                            risk: { type: 'object', properties: { snipers: { type: 'object' }, insiders: { type: 'object' }, bundlers: { type: 'object' }, top10: { type: 'number' }, dev: { type: 'object' }, fees: { type: 'object' }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'object' } }, score: { type: 'number' } } },
                            holders: { type: 'number' },
                            buysCount: { type: 'number' },
                            sellsCount: { type: 'number' }
                        }
                    }
                }
            },
        },
        tokensByVolume: {
            method: 'GET',
            path: '/tokens/volume',
            description: 'Get top 100 tokens by volume (default timeframe) via Solana Tracker. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get top 100 Solana tokens by volume' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, isMutable: { type: 'boolean' }, description: { type: 'string' }, image: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, strictSocials: { type: 'object' }, creation: { type: 'object' } } },
                            pools: { type: 'array', items: { type: 'object' } },
                            events: { type: 'object', properties: { '1m': { type: 'object' }, '5m': { type: 'object' }, '15m': { type: 'object' }, '30m': { type: 'object' }, '1h': { type: 'object' }, '2h': { type: 'object' }, '3h': { type: 'object' }, '4h': { type: 'object' }, '5h': { type: 'object' }, '6h': { type: 'object' }, '12h': { type: 'object' }, '24h': { type: 'object' } } },
                            risk: { type: 'object', properties: { snipers: { type: 'object' }, insiders: { type: 'object' }, bundlers: { type: 'object' }, top10: { type: 'number' }, dev: { type: 'object' }, fees: { type: 'object' }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'object' } }, score: { type: 'number' } } },
                            buys: { type: 'number' },
                            sells: { type: 'number' },
                            txns: { type: 'number' },
                            holders: { type: 'number' },
                            totalVolume: { type: 'number' }
                        }
                    }
                }
            },
        },
        tokenOverview: {
            method: 'GET',
            path: '/tokens/multi/all',
            description: 'Overview of latest, graduating, and graduated tokens via Solana Tracker. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get overview of latest and graduated tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latest: { type: 'array', items: { type: 'object', properties: { token: { type: 'object' }, pools: { type: 'array', items: { type: 'object' } }, events: { type: 'object' }, risk: { type: 'object' }, buys: { type: 'number' }, sells: { type: 'number' }, txns: { type: 'number' }, holders: { type: 'number' } } } },
                        graduating: { type: 'array', items: { type: 'object', properties: { token: { type: 'object' }, pools: { type: 'array', items: { type: 'object' } }, events: { type: 'object' }, risk: { type: 'object' }, buys: { type: 'number' }, sells: { type: 'number' }, txns: { type: 'number' }, holders: { type: 'number' } } } },
                        graduated: { type: 'array', items: { type: 'object', properties: { token: { type: 'object' }, pools: { type: 'array', items: { type: 'object' } }, events: { type: 'object' }, risk: { type: 'object' }, buys: { type: 'number' }, sells: { type: 'number' }, txns: { type: 'number' }, holders: { type: 'number' } } } }
                    }
                }
            },
        },
        graduatedTokens: {
            method: 'GET',
            path: '/tokens/multi/graduated',
            description: 'Overview of all graduated tokens (Pumpvision/Moonshot) via Solana Tracker. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all graduated tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, description: { type: 'string' }, showName: { type: 'boolean' }, image: { type: 'string' }, createdOn: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, strictSocials: { type: 'object' }, creation: { type: 'object' } } },
                            pools: { type: 'array', items: { type: 'object' } },
                            events: { type: 'object', properties: { '1m': { type: 'object' }, '5m': { type: 'object' }, '15m': { type: 'object' }, '30m': { type: 'object' }, '1h': { type: 'object' }, '2h': { type: 'object' }, '3h': { type: 'object' }, '4h': { type: 'object' }, '5h': { type: 'object' }, '6h': { type: 'object' }, '12h': { type: 'object' }, '24h': { type: 'object' } } },
                            risk: { type: 'object', properties: { snipers: { type: 'object' }, insiders: { type: 'object' }, bundlers: { type: 'object' }, top10: { type: 'number' }, dev: { type: 'object' }, fees: { type: 'object' }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'object' } }, score: { type: 'number' } } },
                            buys: { type: 'number' },
                            sells: { type: 'number' },
                            txns: { type: 'number' },
                            holders: { type: 'number' }
                        }
                    }
                }
            },
        },
        tokenByPool: {
            method: 'GET',
            path: '/tokens/by-pool/:poolAddress',
            description: 'Get token by pool address via Solana Tracker — query by poolAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'poolAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get token by Raydium SOL-USDC pool', poolAddress: '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, hasFileMetaData: { type: 'boolean' }, image: { type: 'string' }, strictSocials: { type: 'object' }, creation: { type: 'object', properties: { creator: { type: 'string' }, created_tx: { type: 'string' }, created_time: { type: 'number' } } } } },
                        pools: { type: 'array', items: { type: 'object', properties: { poolId: { type: 'string' }, liquidity: { type: 'object' }, price: { type: 'object' }, tokenSupply: { type: 'number' }, lpBurn: { type: 'number' }, tokenAddress: { type: 'string' }, marketCap: { type: 'object' }, market: { type: 'string' }, raydium: { type: 'object' }, quoteToken: { type: 'string' }, decimals: { type: 'number' }, security: { type: 'object' }, lastUpdated: { type: 'number' }, deployer: { type: 'string', nullable: true }, txns: { type: 'object' } } } },
                        events: { type: 'object', properties: { '1m': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '5m': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '15m': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '30m': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '1h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '2h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '3h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '4h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '5h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '6h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '12h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } }, '24h': { type: 'object', properties: { priceChangePercentage: { type: 'number' } } } } },
                        risk: { type: 'object', properties: { snipers: { type: 'object', properties: { count: { type: 'number' }, totalBalance: { type: 'number' }, totalPercentage: { type: 'number' }, wallets: { type: 'array', items: { type: 'string' } } } }, insiders: { type: 'object', properties: { count: { type: 'number' }, totalBalance: { type: 'number' }, totalPercentage: { type: 'number' }, wallets: { type: 'array', items: { type: 'string' } } } }, top10: { type: 'number' }, dev: { type: 'object', properties: { percentage: { type: 'number' }, amount: { type: 'number' } } }, fees: { type: 'object', properties: { totalTrading: { type: 'number' }, totalTips: { type: 'number' }, total: { type: 'number' } } }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'string' } }, score: { type: 'number' }, jupiterVerified: { type: 'boolean' } } },
                        buys: { type: 'number' },
                        sells: { type: 'number' },
                        txns: { type: 'number' },
                        holders: { type: 'number' }
                    }
                }
            },
        },
        trendingTokensByTimeframe: {
            method: 'GET',
            path: '/tokens/trending/:timeframe',
            description: 'Get trending tokens by specific timeframe (e.g., 5m, 24h) via Solana Tracker — query by timeframe.',
            parameters: [
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get trending tokens in last 24h', timeframe: '24h' },
                { _description: 'Get trending tokens in last 5 minutes', timeframe: '5m' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, decimals: { type: 'number' }, uri: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, description: { type: 'string' }, image: { type: 'string' }, showName: { type: 'boolean' }, createdOn: { type: 'string' }, twitter: { type: 'string' }, website: { type: 'string' }, creation: { type: 'object' } } },
                            pools: { type: 'array', items: { type: 'object' } },
                            events: { type: 'object', properties: { '1m': { type: 'object' }, '5m': { type: 'object' }, '15m': { type: 'object' }, '30m': { type: 'object' }, '1h': { type: 'object' }, '2h': { type: 'object' }, '3h': { type: 'object' }, '4h': { type: 'object' }, '5h': { type: 'object' }, '6h': { type: 'object' }, '12h': { type: 'object' }, '24h': { type: 'object' } } },
                            risk: { type: 'object', properties: { snipers: { type: 'object' }, insiders: { type: 'object' }, top10: { type: 'number' }, dev: { type: 'object' }, fees: { type: 'object' }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'string' } }, score: { type: 'number' }, jupiterVerified: { type: 'boolean' } } },
                            holders: { type: 'number' },
                            buysCount: { type: 'number' },
                            sellsCount: { type: 'number' }
                        }
                    }
                }
            },
        },
        tokensByVolumeTimeframe: {
            method: 'GET',
            path: '/tokens/volume/:timeframe',
            description: 'Get top 100 tokens by volume for a specific timeframe via Solana Tracker — query by timeframe.',
            parameters: [
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get tokens by volume in last 24h', timeframe: '24h' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, description: { type: 'string' }, image: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, strictSocials: { type: 'object' }, creation: { type: 'object' } } },
                            pools: { type: 'array', items: { type: 'object' } },
                            events: { type: 'object', properties: { '1m': { type: 'object' }, '5m': { type: 'object' }, '15m': { type: 'object' }, '30m': { type: 'object' }, '1h': { type: 'object' }, '2h': { type: 'object' }, '3h': { type: 'object' }, '4h': { type: 'object' }, '5h': { type: 'object' }, '6h': { type: 'object' }, '12h': { type: 'object' }, '24h': { type: 'object' } } },
                            risk: { type: 'object', properties: { snipers: { type: 'object' }, insiders: { type: 'object' }, top10: { type: 'number' }, dev: { type: 'object' }, fees: { type: 'object' }, rugged: { type: 'boolean' }, risks: { type: 'array', items: { type: 'string' } }, score: { type: 'number' }, jupiterVerified: { type: 'boolean' } } },
                            buys: { type: 'number' },
                            sells: { type: 'number' },
                            txns: { type: 'number' },
                            holders: { type: 'number' },
                            totalVolume: { type: 'number' }
                        }
                    }
                }
            },
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
        trendingTokens: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        tokensByVolume: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        tokenOverview: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        graduatedTokens: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        tokenByPool: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        trendingTokensByTimeframe: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        },
        tokensByVolumeTimeframe: {
            postRequest: async ( { response, struct, payload } ) => {
                if( response.error ) {
                throw new Error( response.error )
                }

                return { response }
            }
        }
    }
}
