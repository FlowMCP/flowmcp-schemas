// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coincap',
    name: 'CoinCapMarkets',
    description: 'Access CoinCap market pair data — list trading pairs across exchanges with price, volume, spread, and exchange metadata. Supports filtering by exchange or asset.',
    version: '2.0.0',
    docs: ['https://pro.coincap.io/api-docs'],
    tags: ['crypto', 'markets', 'trading', 'cacheTtlFrequent'],
    root: 'https://rest.coincap.io/v3',
    requiredServerParams: ['COINCAP_API_KEY'],
    headers: {
        Authorization: 'Bearer {{COINCAP_API_KEY}}'
    },
    routes: {
        listMarkets: {
            method: 'GET',
            path: '/markets',
            description: 'Retrieve a list of markets with optional filters via CoinCap. Supports exchangeId, baseSymbol, baseId filters.',
            parameters: [
                { position: { key: 'exchangeId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'baseSymbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'baseId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'quoteSymbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'quoteId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'assetSymbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'assetId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(10)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)', 'optional()'] } }
            ]
        }
    }
}
