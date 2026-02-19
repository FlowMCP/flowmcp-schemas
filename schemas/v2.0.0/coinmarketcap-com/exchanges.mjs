// Enhancement for #156 — CoinMarketCap Exchange Data
// Note: Trending, Gainers/Losers, OHLCV and News require paid plan (Hobbyist $29+)

export const main = {
    namespace: 'coinmarketcap',
    name: 'CoinMarketCap Exchanges',
    description: 'Query cryptocurrency exchange data — list exchanges, get exchange metadata, and retrieve exchange market pairs via CoinMarketCap API',
    version: '2.0.0',
    docs: ['https://coinmarketcap.com/api/documentation/v1/#tag/exchange'],
    tags: ['crypto', 'exchanges', 'marketdata', 'cacheTtlFrequent'],
    root: 'https://pro-api.coinmarketcap.com',
    requiredServerParams: ['CMC_API_KEY'],
    headers: {
        'X-CMC_PRO_API_KEY': '{{CMC_API_KEY}}'
    },
    routes: {
        getExchangeMap: {
            method: 'GET',
            path: '/v1/exchange/map',
            description: 'Get a paginated list of all cryptocurrency exchanges with CoinMarketCap IDs. Useful for mapping exchange names to IDs for other endpoints.',
            parameters: [
                { position: { key: 'listing_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(active,inactive,untracked)', options: ['optional()', 'default(active)'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(5000)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(id,volume_24h)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get first 5 active exchanges', limit: 5 },
                { _description: 'Get Binance by slug', slug: 'binance' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, slug: { type: 'string' }, is_active: { type: 'number' }, first_historical_data: { type: 'string' }, last_historical_data: { type: 'string' } } } }, status: { type: 'object', properties: { error_code: { type: 'number' }, error_message: { type: 'string', nullable: true } } } } } },
        },
        getExchangeInfo: {
            method: 'GET',
            path: '/v1/exchange/info',
            description: 'Get metadata for one or more exchanges including name, logo, description, URLs, and social links. Query by ID or slug.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get Binance info by slug', slug: 'binance' },
                { _description: 'Get exchange info by ID', id: '270' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object' }, status: { type: 'object', properties: { error_code: { type: 'number' }, error_message: { type: 'string', nullable: true } } } } } },
        },
        getExchangeAssets: {
            method: 'GET',
            path: '/v1/exchange/assets',
            description: 'Get a list of assets and their amounts held by an exchange wallet. Returns token balances including USD valuation.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Binance assets', id: '270' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { wallet_address: { type: 'string' }, balance: { type: 'number' }, platform: { type: 'object' } } } }, status: { type: 'object', properties: { error_code: { type: 'number' }, error_message: { type: 'string', nullable: true } } } } } },
        },
        getCryptoMap: {
            method: 'GET',
            path: '/v1/cryptocurrency/map',
            description: 'Get a mapping of all cryptocurrencies to CoinMarketCap IDs. Useful for resolving symbols and slugs to IDs.',
            parameters: [
                { position: { key: 'listing_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(active,inactive,untracked)', options: ['optional()', 'default(active)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(cmc_rank,id)', options: ['optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Map first 5 cryptos', limit: 5 },
                { _description: 'Find BTC by symbol', symbol: 'BTC' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, symbol: { type: 'string' }, slug: { type: 'string' }, rank: { type: 'number' }, is_active: { type: 'number' }, first_historical_data: { type: 'string' }, last_historical_data: { type: 'string' }, platform: { type: 'object', nullable: true } } } }, status: { type: 'object', properties: { error_code: { type: 'number' }, error_message: { type: 'string', nullable: true } } } } } },
        }
    }
}
