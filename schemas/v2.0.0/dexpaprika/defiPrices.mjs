// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexpaprika',
    name: 'DexPaprika DeFi Prices',
    description: 'Query decentralized exchange data including token prices, pools, liquidity, and transactions via dexpaprika.com',
    version: '2.0.0',
    docs: ['https://api.dexpaprika.com/docs'],
    tags: ['defi', 'prices', 'liquidity', 'cacheTtlRealtime'],
    root: 'https://api.dexpaprika.com',
    routes: {
        getNetworks: {
            method: 'GET',
            path: '/networks',
            description: 'Get all supported blockchain networks via DexPaprika. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch all supported networks' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            display_name: { type: 'string' }
                        }
                    }
                }
            },
        },
        getToken: {
            method: 'GET',
            path: '/networks/:network_id/tokens/:token_address',
            description: 'Get detailed token information on a specific network via DexPaprika — query by network id and token address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'token_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get WETH token on Ethereum',
                    network_id: 'ethereum',
                    token_address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        symbol: { type: 'string' },
                        chain: { type: 'string' },
                        decimals: { type: 'number' },
                        total_supply: { type: 'number' },
                        description: { type: 'string' },
                        website: { type: 'string' },
                        has_image: { type: 'boolean' },
                        added_at: { type: 'string' },
                        price_stats: { type: 'object', properties: { high_24h: { type: 'number' }, low_24h: { type: 'number' }, ath: { type: 'number' }, ath_date: { type: 'string' } } },
                        summary: { type: 'object', properties: { chain: { type: 'string' }, id: { type: 'string' }, price_usd: { type: 'number' }, fdv: { type: 'number' }, liquidity_usd: { type: 'number' }, pools: { type: 'number' }, '24h': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '6h': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '1h': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '30m': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '15m': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '5m': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } }, '1m': { type: 'object', properties: { volume: { type: 'number' }, volume_usd: { type: 'number' }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' }, buy_usd: { type: 'number' }, sell_usd: { type: 'number' }, last_price_usd_change: { type: 'number' } } } } },
                        last_updated: { type: 'string' }
                    }
                }
            },
        },
        getMultiPrices: {
            method: 'GET',
            path: '/networks/:network_id/multi/prices',
            description: 'Get prices for multiple tokens on a network via DexPaprika — query by network id.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokens', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get multi prices on Ethereum',
                    network_id: 'ethereum',
                    tokens: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            chain: { type: 'string' },
                            id: { type: 'string' },
                            price_usd: { type: 'number' }
                        }
                    }
                }
            },
        },
        getPool: {
            method: 'GET',
            path: '/networks/:network_id/pools/:pool_address',
            description: 'Get detailed pool information on a specific network via DexPaprika — query by network id and pool address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pool_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get Uniswap V3 USDC/WETH pool',
                    network_id: 'ethereum',
                    pool_address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        chain: { type: 'string' },
                        factory_id: { type: 'string' },
                        dex_id: { type: 'string' },
                        dex_name: { type: 'string' },
                        created_at_block_number: { type: 'number' },
                        fee: { type: 'number', nullable: true },
                        created_at: { type: 'string' },
                        tokens: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, chain: { type: 'string' }, type: { type: 'string' }, status: { type: 'string' }, decimals: { type: 'number' }, total_supply: { type: 'number' }, description: { type: 'string' }, website: { type: 'string' }, has_image: { type: 'boolean' }, added_at: { type: 'string' }, fdv: { type: 'string', nullable: true } } } },
                        token_reserves: { type: 'array', items: { type: 'object', properties: { token_id: { type: 'string' }, reserve: { type: 'number' }, reserve_usd: { type: 'string', nullable: true } } } },
                        last_price: { type: 'number', nullable: true },
                        last_price_usd: { type: 'number', nullable: true },
                        price_time: { type: 'number', nullable: true },
                        price_stats: { type: 'number', nullable: true },
                        '24h': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } },
                        '6h': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } },
                        '1h': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } },
                        '30m': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } },
                        '15m': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } },
                        '5m': { type: 'object', properties: { last_price_usd_change: { type: 'number', nullable: true }, volume_usd: { type: 'number', nullable: true }, buy_usd: { type: 'string', nullable: true }, sell_usd: { type: 'string', nullable: true }, sells: { type: 'number' }, buys: { type: 'number' }, txns: { type: 'number' } } }
                    }
                }
            },
        },
        getTokenPools: {
            method: 'GET',
            path: '/networks/:network_id/tokens/:token_address/pools',
            description: 'Get all pools for a specific token on a network via DexPaprika — query by network id and token address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'token_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'Get pools for WETH on Ethereum',
                    network_id: 'ethereum',
                    token_address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pools: { type: 'array', items: { type: 'string' } },
                        page_info: { type: 'object', properties: { limit: { type: 'number' }, page: { type: 'number' }, total_items: { type: 'number' }, total_pages: { type: 'number' } } }
                    }
                }
            },
        },
        getPoolTransactions: {
            method: 'GET',
            path: '/networks/:network_id/pools/:pool_address/transactions',
            description: 'Get recent transactions for a specific pool via DexPaprika — query by network id and pool address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pool_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'Get transactions for USDC/WETH pool',
                    network_id: 'ethereum',
                    pool_address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        transactions: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, log_index: { type: 'number' }, transaction_index: { type: 'number' }, factory_id: { type: 'string' }, pool_id: { type: 'string' }, chain: { type: 'string' }, sender: { type: 'string' }, recipient: { type: 'string' }, token_0: { type: 'string' }, token_0_symbol: { type: 'string' }, token_1: { type: 'string' }, token_1_symbol: { type: 'string' }, amount_0: { type: 'number' }, amount_1: { type: 'number' }, volume_0: { type: 'number' }, volume_1: { type: 'number' }, price_0: { type: 'number' }, price_1: { type: 'number' }, price_0_usd: { type: 'number' }, price_1_usd: { type: 'number' }, created_at_block_number: { type: 'number' }, created_at_block_hash: { type: 'string' }, created_at: { type: 'string' }, canonical_chain: { type: 'boolean' } } } },
                        page_info: { type: 'object', properties: { limit: { type: 'number' }, page: { type: 'number' }, total_items: { type: 'number' }, total_pages: { type: 'number' } } }
                    }
                }
            },
        },
        searchTokens: {
            method: 'GET',
            path: '/search',
            description: 'Search for tokens across all networks via DexPaprika. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Search for Ethereum token', query: 'ethereum' },
                { _description: 'Search for USDC token', query: 'usdc' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        tokens: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, chain: { type: 'string' }, type: { type: 'string' }, status: { type: 'string' }, decimals: { type: 'number' }, total_supply: { type: 'number' }, description: { type: 'string' }, website: { type: 'string' }, explorer: { type: 'string' }, price_usd: { type: 'number' }, liquidity_usd: { type: 'number' }, volume_usd: { type: 'number' }, price_usd_change: { type: 'number' } } } },
                        pools: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, dex_id: { type: 'string' }, dex_name: { type: 'string' }, chain: { type: 'string' }, created_at_block_number: { type: 'number' }, created_at: { type: 'string' }, volume_usd: { type: 'number' }, transactions: { type: 'number' }, price_usd: { type: 'number' }, last_price_change_usd_5m: { type: 'number' }, last_price_change_usd_1h: { type: 'number' }, last_price_change_usd_24h: { type: 'number' }, tokens: { type: 'array', items: { type: 'object' } } } } },
                        dexes: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
        }
    }
}
