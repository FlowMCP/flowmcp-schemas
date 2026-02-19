const chainEnum = 'enum(solana,ethereum,arbitrum,avalanche,bsc,optimism,polygon,base,zksync,sui)'

const schema = {
    namespace: 'birdeye',
    name: 'Birdeye Token Analytics API',
    description: 'Fetch real-time and historical token data from Birdeye — prices, OHLCV candles, token security checks, trending tokens, and token search across Solana and EVM chains.',
    docs: ['https://docs.birdeye.so'],
    tags: ['crypto', 'solana', 'analytics', 'defi', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://public-api.birdeye.so',
    requiredServerParams: ['BIRDEYE_API_KEY'],
    headers: {
        'X-API-KEY': '{{BIRDEYE_API_KEY}}'
    },
    routes: {
        getTokenPrice: {
            requestMethod: 'GET',
            description: 'Get current price for a token by contract address. Returns price, 24h change, and update timestamp. Supports all Birdeye chains.',
            route: '/defi/price',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(solana)', 'optional()'] } },
                { position: { key: 'include_liquidity', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get SOL price on Solana', address: 'So11111111111111111111111111111111111111112' },
                { _description: 'Get WETH price on Ethereum', address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', chain: 'ethereum' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'setChainHeader' }
            ]
        },
        getHistoryPrice: {
            requestMethod: 'GET',
            description: 'Get historical price data for a token with configurable time range and interval. Returns array of price points with timestamps.',
            route: '/defi/history_price',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'address_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(token,pair)', options: ['default(token)', 'optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,3m,5m,15m,30m,1H,2H,4H,6H,8H,12H,1D,3D,1W,1M)', options: ['default(1H)'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(solana)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get SOL hourly price history', address: 'So11111111111111111111111111111111111111112', type: '1H' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'setChainHeader' }
            ]
        },
        getOHLCV: {
            requestMethod: 'GET',
            description: 'Get OHLCV candlestick data for a token. Returns open, high, low, close, volume per candle with configurable timeframe.',
            route: '/defi/ohlcv',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,3m,5m,15m,30m,1H,2H,4H,6H,8H,12H,1D,3D,1W,1M)', options: ['default(1H)'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(solana)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get SOL 1-hour OHLCV candles', address: 'So11111111111111111111111111111111111111112', type: '1H' },
                { _description: 'Get SOL daily OHLCV candles', address: 'So11111111111111111111111111111111111111112', type: '1D' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'setChainHeader' }
            ]
        },
        getTrendingTokens: {
            requestMethod: 'GET',
            description: 'Get trending tokens ranked by trade volume, price change, or number of trades. Returns token address, symbol, name, price, and volume data.',
            route: '/defi/token_trending',
            parameters: [
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(rank,volume24hUSD,liquidity)', options: ['default(rank)', 'optional()'] } },
                { position: { key: 'sort_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['default(desc)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(20)', 'optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(solana)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get top 20 trending tokens on Solana' },
                { _description: 'Get top 10 trending tokens on Ethereum', limit: 10, chain: 'ethereum' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'setChainHeader' }
            ]
        },
        searchToken: {
            requestMethod: 'GET',
            description: 'Search for tokens by keyword (name, symbol, or address). Returns matching tokens with price, volume, and market data.',
            route: '/defi/v3/search',
            parameters: [
                { position: { key: 'keyword', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(volume_24h_usd,market_cap,fdv,liquidity)', options: ['default(volume_24h_usd)', 'optional()'] } },
                { position: { key: 'sort_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['default(desc)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(20)', 'optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(solana)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for BONK token on Solana', keyword: 'BONK' },
                { _description: 'Search for USDC token on Solana', keyword: 'USDC' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'setChainHeader' }
            ]
        }
    },
    handlers: {
        setChainHeader: async ( { struct, payload, userParams } ) => {
            const chain = userParams['chain'] || 'solana'
            payload.headers['x-chain'] = chain

            return { struct, payload }
        }
    }
}


export { schema }
