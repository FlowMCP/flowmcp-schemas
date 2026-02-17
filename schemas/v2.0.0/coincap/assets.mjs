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
            ]
        },
        singleAsset: {
            method: 'GET',
            path: '/assets/:slug',
            description: 'Retrieve details for a specific asset via CoinCap — query by slug. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        assetMarkets: {
            method: 'GET',
            path: '/assets/:slug/markets',
            description: 'Retrieve market data for an asset via CoinCap — query by slug. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ]
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
            ]
        }
    }
}
