// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'polymarket',
    name: 'Polymarket Predictions',
    description: 'Access prediction market data from Polymarket via the CLOB API — list active markets with filters or retrieve detailed info for a specific market by condition ID.',
    version: '2.0.0',
    docs: ['https://docs.polymarket.com'],
    tags: ['prediction', 'markets', 'trading', 'cacheTtlFrequent'],
    root: 'https://clob.polymarket.com',
    routes: {
        getMarkets: {
            method: 'GET',
            path: '/markets',
            description: 'List prediction markets with optional filters via Polymarket. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(active,resolved)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)'] } }
            ]
        },
        getMarketInfo: {
            method: 'GET',
            path: '/markets/:condition_id',
            description: 'Get detailed information about a specific prediction market via Polymarket — query by condition id.',
            parameters: [
                { position: { key: 'condition_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
