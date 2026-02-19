// Enhancement for #159 — CoinGecko Search + OHLC

export const main = {
    namespace: 'coingecko',
    name: 'CoinGecko Search & OHLC',
    description: 'Search coins by keyword and fetch OHLC candlestick data for technical analysis via CoinGecko free API',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/search-data', 'https://docs.coingecko.com/reference/coins-id-ohlc'],
    tags: ['crypto', 'prices', 'marketdata', 'cacheTtlFrequent'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        searchCoins: {
            method: 'GET',
            path: '/search',
            description: 'Search for coins, exchanges, categories and NFTs by keyword. Returns matching results with id, name, symbol, market cap rank and thumb image.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Search for Bitcoin', query: 'bitcoin' },
                { _description: 'Search for Solana', query: 'solana' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        coins: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, api_symbol: { type: 'string' }, symbol: { type: 'string' }, market_cap_rank: { type: 'number' }, thumb: { type: 'string' }, large: { type: 'string' } } } },
                        exchanges: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, market_type: { type: 'string' }, thumb: { type: 'string' }, large: { type: 'string' } } } },
                        categories: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' } } } },
                        nfts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, thumb: { type: 'string' } } } }
                    }
                }
            },
        },
        getCoinOhlc: {
            method: 'GET',
            path: '/coins/:id/ohlc',
            description: 'Get OHLC candlestick data for a coin. Returns arrays of [timestamp, open, high, low, close]. Granularity depends on days: 1-2 days = 30min, 3-30 = 4h, 31+ = daily.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'vs_currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(usd)'] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(7)'] } }
            ],
            tests: [
                { _description: 'Bitcoin OHLC last 7 days in USD', id: 'bitcoin', vs_currency: 'usd', days: '7' },
                { _description: 'Ethereum OHLC last 30 days in USD', id: 'ethereum', vs_currency: 'usd', days: '30' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'number' }
                    }
                }
            },
        }
    }
}
