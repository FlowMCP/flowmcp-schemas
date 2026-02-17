// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coinmarketcap',
    name: 'CMCCryptoFearAndGreed',
    description: 'Retrieve the CoinMarketCap Crypto Fear and Greed Index — latest sentiment reading plus historical time-series data for market psychology tracking.',
    version: '2.0.0',
    docs: ['https://coinmarketcap.com/api/documentation/v1/'],
    tags: ['crypto', 'sentiment', 'index', 'cacheTtlFrequent'],
    root: 'https://pro-api.coinmarketcap.com',
    requiredServerParams: ['CMC_API_KEY'],
    headers: {
        'X-CMC_PRO_API_KEY': '{{CMC_API_KEY}}'
    },
    routes: {
        getFearAndGreedHistorical: {
            method: 'GET',
            path: '/v3/fear-and-greed/historical',
            description: 'Fetch historical CMC Crypto Fear and Greed values via CoinMarketCap. Supports start, limit filters.',
            parameters: [
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'optional()'] } }
            ]
        },
        getFearAndGreedLatest: {
            method: 'GET',
            path: '/v3/fear-and-greed/latest',
            description: 'Fetch the latest CMC Crypto Fear and Greed value via CoinMarketCap. Returns structured JSON response data.',
            parameters: []
        }
    }
}
