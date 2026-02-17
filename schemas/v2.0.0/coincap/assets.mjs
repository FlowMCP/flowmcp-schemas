// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coincap',
    name: 'AssetsAPI',
    description: 'Retrieve cryptocurrency asset data from CoinCap — prices, market caps, supply, volume, and historical data for thousands of tokens.',
    version: '2.0.0',
    docs: ['https://pro.coincap.io/api-docs'],
    tags: ['crypto', 'prices', 'marketdata', 'cacheTtlRealtime'],
    root: 'https://rest.coincap.io/v3',
    requiredServerParams: ['COINCAP_API_KEY'],
    headers: {
        Authorization: 'Bearer {{COINCAP_API_KEY}}'
    },
    routes: {
        listAssets: {
            method: 'GET',
            path: '/assets',
            description: 'Retrieve a list of assets via CoinCap. Supports search, ids, limit filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Fetch first 10 assets', limit: 10 },
                { _description: 'Search for bitcoin', search: 'bitcoin' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, rank: { type: 'string' }, symbol: { type: 'string' }, name: { type: 'string' }, supply: { type: 'string' }, maxSupply: { type: 'string' }, marketCapUsd: { type: 'string' }, volumeUsd24Hr: { type: 'string' }, priceUsd: { type: 'string' }, changePercent24Hr: { type: 'string' }, vwap24Hr: { type: 'string' }, explorer: { type: 'string' }, tokens: { type: 'object' } } } }
                    }
                }
            },
        },
        singleAsset: {
            method: 'GET',
            path: '/assets/:slug',
            description: 'Retrieve details for a specific asset via CoinCap — query by slug. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Fetch Bitcoin data', slug: 'bitcoin' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'object', properties: { id: { type: 'string' }, rank: { type: 'string' }, symbol: { type: 'string' }, name: { type: 'string' }, supply: { type: 'string' }, maxSupply: { type: 'string' }, marketCapUsd: { type: 'string' }, volumeUsd24Hr: { type: 'string' }, priceUsd: { type: 'string' }, changePercent24Hr: { type: 'string' }, vwap24Hr: { type: 'string' }, explorer: { type: 'string' }, tokens: { type: 'object' } } }
                    }
                }
            },
        },
        assetMarkets: {
            method: 'GET',
            path: '/assets/:slug/markets',
            description: 'Retrieve market data for an asset via CoinCap — query by slug. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Markets for bitcoin', slug: 'bitcoin' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { exchangeId: { type: 'string' }, baseId: { type: 'string' }, baseSymbol: { type: 'string' }, quoteId: { type: 'string' }, quoteSymbol: { type: 'string' }, priceUsd: { type: 'string' }, volumeUsd24Hr: { type: 'string' }, volumePercent: { type: 'string' } } } }
                    }
                }
            },
        },
        assetHistory: {
            method: 'GET',
            path: '/assets/:slug/history',
            description: 'Retrieve historical data for an asset via CoinCap — query by slug. Supports start, end filters.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(m1,m5,m15,m30,h1,h2,h6,h12,d1)', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: '1-day history for bitcoin', slug: 'bitcoin', interval: 'd1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { circulatingSupply: { type: 'number' }, priceUsd: { type: 'string' }, time: { type: 'number' }, date: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}
