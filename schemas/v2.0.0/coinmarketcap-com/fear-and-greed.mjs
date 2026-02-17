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
            ],
            tests: [
                { _description: 'Fetch first 5 historical Fear and Greed values.', start: 1, limit: 5 },
                { _description: 'Fetch historical values without pagination parameters.' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'array', items: { type: 'object', properties: { timestamp: { type: 'string' }, value: { type: 'number' }, value_classification: { type: 'string' } } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'string' }, error_message: { type: 'string' }, elapsed: { type: 'number' }, credit_count: { type: 'number' } } }
                    }
                }
            },
        },
        getFearAndGreedLatest: {
            method: 'GET',
            path: '/v3/fear-and-greed/latest',
            description: 'Fetch the latest CMC Crypto Fear and Greed value via CoinMarketCap. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch latest Fear and Greed value.' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { value: { type: 'number' }, update_time: { type: 'string' }, value_classification: { type: 'string' } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'string' }, error_message: { type: 'string' }, elapsed: { type: 'number' }, credit_count: { type: 'number' } } }
                    }
                }
            },
        }
    }
}
