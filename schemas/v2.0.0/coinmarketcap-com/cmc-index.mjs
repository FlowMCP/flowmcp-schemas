// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coinmarketcap',
    name: 'CoinMarketCap100',
    description: 'Retrieve the CoinMarketCap 100 Index — latest index value and historical time-series data for the CMC100 benchmark of top cryptocurrencies.',
    version: '2.0.0',
    docs: ['https://coinmarketcap.com/api/documentation/v1/'],
    tags: ['crypto', 'index', 'marketdata', 'cacheTtlDaily'],
    root: 'https://pro-api.coinmarketcap.com',
    requiredServerParams: ['CMC_API_KEY'],
    headers: {
        'X-CMC_PRO_API_KEY': '{{CMC_API_KEY}}'
    },
    routes: {
        getHistorical: {
            method: 'GET',
            path: '/v3/index/cmc100-historical',
            description: 'Fetch a historical range of CoinMarketCap 100 Index values. Supports time_start, time_end, count filters.',
            parameters: [
                { position: { key: 'time_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'time_end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,15m,daily)', options: [, 'optional()'] } }
            ],
            tests: [
                { _description: 'Fetch historical data without specifying time.' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'array', items: { type: 'object', properties: { value: { type: 'number' }, update_time: { type: 'string' }, constituents: { type: 'array', items: { type: 'object' } } } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'string' }, error_message: { type: 'string' }, elapsed: { type: 'number' }, credit_count: { type: 'number' } } }
                    }
                }
            },
        },
        getLatest: {
            method: 'GET',
            path: '/v3/index/cmc100-latest',
            description: 'Fetch the latest CoinMarketCap 100 Index value. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch latest data.' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { value: { type: 'number' }, value_24h_percentage_change: { type: 'number' }, last_update: { type: 'string' }, next_update: { type: 'string' }, constituents: { type: 'array', items: { type: 'object' } } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'string' }, error_message: { type: 'string' }, elapsed: { type: 'number' }, credit_count: { type: 'number' } } }
                    }
                }
            },
        }
    }
}
