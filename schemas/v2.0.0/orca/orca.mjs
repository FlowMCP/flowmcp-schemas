const schema = {
    namespace: 'orca',
    name: 'Orca Whirlpool API',
    description: 'Fetches concentrated liquidity pool data, token listings, and individual whirlpool details from Orca DEX on Solana',
    docs: ['https://orca-so.github.io/whirlpools/', 'https://docs.orca.so'],
    tags: ['defi', 'solana', 'dex', 'clmm', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api.mainnet.orca.so',
    requiredServerParams: [],
    headers: {},
    routes: {
        getWhirlpools: {
            requestMethod: 'GET',
            description: 'List all Orca whirlpool concentrated liquidity pools with TVL, volume, APR, fee rates, and token pair information. via orca.',
            route: '/v1/whirlpool/list',
            parameters: [],
            tests: [
                { _description: 'Get all Orca whirlpool pools' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizeWhirlpools' }
            ]
        },
        getWhirlpoolByAddress: {
            requestMethod: 'GET',
            description: 'Get detailed data for a single Orca whirlpool by its on-chain address including price, TVL, volume, APR, and token pair details. via orca.',
            route: '/v1/whirlpool/:address',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } }
            ],
            tests: [
                { _description: 'Get SOL/USDC whirlpool details', address: 'Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE' }
            ],
            modifiers: []
        },
        getTokens: {
            requestMethod: 'GET',
            description: 'List all tokens available on Orca DEX with mint address, symbol, name, decimals, and whitelist status. via orca.',
            route: '/v1/token/list',
            parameters: [],
            tests: [
                { _description: 'Get all tokens listed on Orca' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizeTokens' }
            ]
        }
    },
    handlers: {
        summarizeWhirlpools: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const { whirlpools } = struct.data
            if( !Array.isArray( whirlpools ) ) {
                return { struct, payload }
            }

            const topPools = whirlpools
                .filter( ( pool ) => pool['whitelisted'] === true )
                .sort( ( a, b ) => b['tvl'] - a['tvl'] )
                .slice( 0, 50 )
                .map( ( pool ) => {
                    const result = {
                        address: pool['address'],
                        pair: `${pool['tokenA']['symbol']}/${pool['tokenB']['symbol']}`,
                        price: pool['price'],
                        tvl: pool['tvl'],
                        volumeDay: pool['volume']['day'],
                        volumeWeek: pool['volume']['week'],
                        feeAprDay: pool['feeApr']['day'],
                        totalAprDay: pool['totalApr']['day'],
                        lpFeeRate: pool['lpFeeRate'],
                        tickSpacing: pool['tickSpacing']
                    }

                    return result
                } )

            struct.data = {
                totalWhirlpools: whirlpools.length,
                whitelistedCount: whirlpools.filter( ( p ) => p['whitelisted'] ).length,
                topPoolsByTvl: topPools
            }

            return { struct, payload }
        },
        summarizeTokens: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const { tokens } = struct.data
            if( !Array.isArray( tokens ) ) {
                return { struct, payload }
            }

            const whitelistedTokens = tokens
                .filter( ( token ) => token['whitelisted'] === true )
                .map( ( token ) => {
                    const result = {
                        mint: token['mint'],
                        symbol: token['symbol'],
                        name: token['name'],
                        decimals: token['decimals'],
                        coingeckoId: token['coingeckoId'] || null
                    }

                    return result
                } )

            struct.data = {
                totalTokens: tokens.length,
                whitelistedCount: whitelistedTokens.length,
                whitelistedTokens
            }

            return { struct, payload }
        }
    }
}


export { schema }
