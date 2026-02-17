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
            ],
            tests: [
                { _description: 'Get SOL wrapped token info', tokenAddress: 'So11111111111111111111111111111111111111112' },
                { _description: 'Get BONK token info', tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, uri: { type: 'string' }, decimals: { type: 'number' }, hasFileMetaData: { type: 'boolean' }, image: { type: 'string' }, strictSocials: { type: 'object' }, creation: { type: 'object', properties: { creator: { type: 'string' }, created_tx: { type: 'string' }, created_time: { type: 'number' } } } } },
                        pools: { type: 'array', items: { type: 'object', properties: { liquidity: { type: 'object' }, price: { type: 'object' }, tokenSupply: { type: 'number' }, lpBurn: { type: 'number' }, tokenAddress: { type: 'string' }, marketCap: { type: 'object' }, market: { type: 'string' }, quoteToken: { type: 'string' }, decimals: { type: 'number' }, security: { type: 'object' }, deployer: { type: 'string' }, lastUpdated: { type: 'number' }, poolId: { type: 'string' } } } },
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
        tokenHolders: {
            method: 'GET',
            path: '/tokens/:tokenAddress/holders',
            description: 'Get the top 100 holders for a specific token.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get top 100 BONK holders', tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        accounts: { type: 'array', items: { type: 'object', properties: { wallet: { type: 'string' }, amount: { type: 'number' }, value: { type: 'object' }, percentage: { type: 'number' } } } }
                    }
                }
            },
        },
        topTokenHolders: {
            method: 'GET',
            path: '/tokens/:tokenAddress/holders/top',
            description: 'Get top 20 token holders via Solana Tracker — query by tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get top 20 BONK holders', tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            address: { type: 'string' },
                            amount: { type: 'number' },
                            percentage: { type: 'number' },
                            value: { type: 'object', properties: { quote: { type: 'number' }, usd: { type: 'number' } } }
                        }
                    }
                }
            },
        },
        allTimeHighPrice: {
            method: 'GET',
            path: '/tokens/:tokenAddress/ath',
            description: 'Get all-time high price of a token via Solana Tracker — query by tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get BONK all-time high price', tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        highest_price: { type: 'number' },
                        highest_market_cap: { type: 'number' },
                        timestamp: { type: 'number' },
                        pool_id: { type: 'string' }
                    }
                }
            },
        },
        tokensByDeployer: {
            method: 'GET',
            path: '/deployer/:wallet',
            description: 'Get all tokens deployed by a specific wallet via Solana Tracker — query by wallet.',
            parameters: [
                { position: { key: 'wallet', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get tokens deployed by Raydium', wallet: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        total: { type: 'number' },
                        pages: { type: 'number' },
                        page: { type: 'number' },
                        data: { type: 'array', items: { type: 'string' } },
                        graduated: { type: 'object', properties: { total: { type: 'number' }, totalUniqueTokens: { type: 'number' }, data: { type: 'array', items: { type: 'string' } } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Search for BONK token', query: 'bonk', limit: 5 },
                { _description: 'Search with liquidity filter', query: 'sol', minLiquidity: 10000, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, decimals: { type: 'number' }, image: { type: 'string' }, holders: { type: 'number' }, jupiter: { type: 'boolean' }, verified: { type: 'boolean' }, liquidityUsd: { type: 'number' }, marketCapUsd: { type: 'number' }, priceUsd: { type: 'number' }, lpBurn: { type: 'number' }, market: { type: 'string' }, freezeAuthority: { type: 'string', nullable: true }, mintAuthority: { type: 'string', nullable: true }, poolAddress: { type: 'string' }, buys: { type: 'number' }, sells: { type: 'number' }, totalTransactions: { type: 'number' }, volume: { type: 'number' }, volume_5m: { type: 'number' }, volume_15m: { type: 'number' }, volume_30m: { type: 'number' }, volume_1h: { type: 'number' }, volume_6h: { type: 'number' }, volume_12h: { type: 'number' }, volume_24h: { type: 'number' } } } },
                        total: { type: 'number' },
                        pages: { type: 'number' },
                        page: { type: 'number' },
                        nextCursor: { type: 'string' },
                        hasMore: { type: 'boolean' }
                    }
                }
            },
        },
        latestTokens: {
            method: 'GET',
            path: '/tokens/latest',
            description: 'Retrieve the latest 100 tokens.',
            parameters: [],
            tests: [
                { _description: 'Get latest 100 Solana tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, mint: { type: 'string' }, decimals: { type: 'number' }, uri: { type: 'string' }, hasFileMetaData: { type: 'boolean' }, description: { type: 'string' }, image: { type: 'string' }, showName: { type: 'boolean' }, createdOn: { type: 'string' }, strictSocials: { type: 'object' }, creation: { type: 'object' } } },
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
        multipleTokens: {
            method: 'POST',
            path: '/tokens/multi',
            description: 'Get multiple tokens by array of addresses (max 20) via Solana Tracker. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tokens', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['min(1)', 'max(20)'] } }
            ],
            tests: [
                {
                    _description: 'Get info for SOL and BONK tokens',
                    tokens: [
                        'So11111111111111111111111111111111111111112',
                        'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
                    ]
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        tokens: { type: 'object', properties: { So11111111111111111111111111111111111111112: { type: 'object', properties: { token: { type: 'object' }, pools: { type: 'array', items: { type: 'object' } }, events: { type: 'object' }, risk: { type: 'object' }, buys: { type: 'number' }, sells: { type: 'number' }, txns: { type: 'number' }, holders: { type: 'number' } } }, DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: { type: 'object', properties: { token: { type: 'object' }, pools: { type: 'array', items: { type: 'object' } }, events: { type: 'object' }, risk: { type: 'object' }, buys: { type: 'number' }, sells: { type: 'number' }, txns: { type: 'number' }, holders: { type: 'number' } } } } }
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
