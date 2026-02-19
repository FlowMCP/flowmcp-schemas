const schema = {
    namespace: 'meteora',
    name: 'Meteora DLMM API',
    description: 'Fetches dynamic liquidity market maker pool data, token pair groups, OHLCV candles, volume history, and protocol metrics from Meteora on Solana',
    docs: ['https://docs.meteora.ag/api-reference/dlmm/overview'],
    tags: ['defi', 'solana', 'amm', 'dlmm', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://dlmm.datapi.meteora.ag',
    requiredServerParams: [],
    headers: {},
    routes: {
        getPools: {
            requestMethod: 'GET',
            description: 'List all Meteora DLMM pools with TVL, volume, APR, fee rates, and token pair information. Supports pagination, search, sorting, and filtering. via meteora.',
            route: '/pools',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'default(1)', 'optional()'] } },
                { position: { key: 'page_size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(1000)', 'default(10)', 'optional()'] } },
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'max(200)', 'optional()'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(volume_24h:desc)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get first page of DLMM pools sorted by 24h volume', page: 1, page_size: 5 },
                { _description: 'Search for SOL pools', query: 'SOL', page_size: 5 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizePools' }
            ]
        },
        getPoolByAddress: {
            requestMethod: 'GET',
            description: 'Get detailed metadata and current state for a single Meteora DLMM pool by its on-chain address including price, TVL, volume, APR, fee configuration, and token details. via meteora.',
            route: '/pools/:address',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } }
            ],
            tests: [
                { _description: 'Get TRUMP-USDC pool details', address: '9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2' }
            ],
            modifiers: []
        },
        getPoolGroups: {
            requestMethod: 'GET',
            description: 'List pool groups aggregated by token pair with total TVL, volume, fee-to-TVL ratio, and pool count per group. Supports pagination, search, and sorting. via meteora.',
            route: '/pools/groups',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'default(1)', 'optional()'] } },
                { position: { key: 'page_size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)', 'optional()'] } },
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'max(200)', 'optional()'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(volume_24h:desc)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get top pool groups by volume', page: 1, page_size: 5 },
                { _description: 'Search for USDC pool groups', query: 'USDC', page_size: 5 }
            ],
            modifiers: []
        },
        getPoolGroupByMints: {
            requestMethod: 'GET',
            description: 'Get all pools belonging to a specific token pair group identified by lexically ordered mint addresses. Supports pagination and sorting. via meteora.',
            route: '/pools/groups/:lexical_order_mints',
            parameters: [
                { position: { key: 'lexical_order_mints', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'default(1)', 'optional()'] } },
                { position: { key: 'page_size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get pools for SOL-USDC group', lexical_order_mints: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-So11111111111111111111111111111111111111112' }
            ],
            modifiers: []
        },
        getPoolOhlcv: {
            requestMethod: 'GET',
            description: 'Get OHLCV price candles for a single Meteora DLMM pool over a configurable time range and interval. via meteora.',
            route: '/pools/:address/ohlcv',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,30m,1h,2h,4h,12h,24h)', options: ['default(24h)', 'optional()'] } },
                { position: { key: 'start_time', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'end_time', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get 24h OHLCV candles for TRUMP-USDC pool', address: '9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2' },
                { _description: 'Get 1h OHLCV candles for TRUMP-USDC pool', address: '9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2', timeframe: '1h' }
            ],
            modifiers: []
        },
        getPoolVolumeHistory: {
            requestMethod: 'GET',
            description: 'Get historical trading volume for a single Meteora DLMM pool aggregated into configurable time buckets. via meteora.',
            route: '/pools/:address/volume/history',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,30m,1h,2h,4h,12h,24h)', options: ['default(24h)', 'optional()'] } },
                { position: { key: 'start_time', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'end_time', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get 24h volume history for TRUMP-USDC pool', address: '9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2' }
            ],
            modifiers: []
        },
        getProtocolMetrics: {
            requestMethod: 'GET',
            description: 'Get aggregated protocol-level metrics across all Meteora DLMM pools including total TVL, 24h volume, 24h fees, and cumulative totals. via meteora.',
            route: '/stats/protocol_metrics',
            parameters: [],
            tests: [
                { _description: 'Get Meteora DLMM protocol overview metrics' }
            ],
            modifiers: []
        }
    },
    handlers: {
        summarizePools: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const { data: pools, total, pages, current_page } = struct.data
            if( !Array.isArray( pools ) ) {
                return { struct, payload }
            }

            const topPools = pools
                .map( ( pool ) => {
                    const result = {
                        address: pool['address'],
                        name: pool['name'],
                        tokenX: pool['token_x'] ? pool['token_x']['symbol'] : null,
                        tokenY: pool['token_y'] ? pool['token_y']['symbol'] : null,
                        tvl: pool['tvl'],
                        currentPrice: pool['current_price'],
                        apr: pool['apr'],
                        farmApr: pool['farm_apr'],
                        volume24h: pool['volume'] ? pool['volume']['24h'] : null,
                        fees24h: pool['fees'] ? pool['fees']['24h'] : null,
                        binStep: pool['pool_config'] ? pool['pool_config']['bin_step'] : null
                    }

                    return result
                } )

            struct.data = {
                total,
                pages,
                currentPage: current_page,
                pools: topPools
            }

            return { struct, payload }
        }
    }
}


export { schema }
