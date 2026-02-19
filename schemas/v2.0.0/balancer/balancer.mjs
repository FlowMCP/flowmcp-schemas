const chainEnum = 'enum(MAINNET,ARBITRUM,POLYGON,BASE,AVALANCHE,GNOSIS,OPTIMISM,ZKEVM,FANTOM,SONIC,MODE,FRAXTAL)'

const schema = {
    namespace: 'balancer',
    name: 'Balancer Protocol API',
    description: 'Query Balancer DeFi protocol via GraphQL — list liquidity pools with TVL, volume, and APR, get detailed pool data, fetch token prices, and retrieve protocol-wide metrics across multiple chains.',
    docs: ['https://docs.balancer.fi/data-and-analytics/data-and-analytics/balancer-api/balancer-api.html'],
    tags: ['defi', 'amm', 'liquidity', 'pools', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api-v3.balancer.fi',
    requiredServerParams: [],
    headers: { 'Content-Type': 'application/json' },
    routes: {
        getTopPools: {
            requestMethod: 'POST',
            description: 'Get top Balancer liquidity pools ordered by TVL, volume, or APR. Supports filtering by chain and pagination.',
            route: '/',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(MAINNET)', 'optional()'] } },
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)', 'optional()'] } },
                { position: { key: 'skip', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(totalLiquidity,volume24h,apr,fees24h,totalShares)', options: ['default(totalLiquidity)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get top 10 pools on Mainnet by TVL', chain: 'MAINNET', first: 10 },
                { _description: 'Get top 5 pools on Arbitrum by volume', chain: 'ARBITRUM', first: 5, orderBy: 'volume24h' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildGetTopPools' },
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getPoolById: {
            requestMethod: 'POST',
            description: 'Get detailed data for a specific Balancer pool by ID and chain, including token weights, balances, fees, and APR breakdown.',
            route: '/',
            parameters: [
                { position: { key: 'poolId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(MAINNET)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get pool details for a Mainnet weighted pool', poolId: '0x3de27efa2f1aa663ae5d458857e731c129069f29000200000000000000000588', chain: 'MAINNET' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildGetPoolById' },
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getTokenPrices: {
            requestMethod: 'POST',
            description: 'Get current token prices from Balancer pools for a specific chain. Returns address, price, and last update timestamp.',
            route: '/',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(MAINNET)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get current token prices on Mainnet', chain: 'MAINNET' },
                { _description: 'Get current token prices on Arbitrum', chain: 'ARBITRUM' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildGetTokenPrices' },
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getProtocolMetrics: {
            requestMethod: 'POST',
            description: 'Get aggregated protocol metrics for Balancer across specified chains — total liquidity, 24h swap volume, fees, pool count, and number of liquidity providers.',
            route: '/',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(MAINNET)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get protocol metrics for Mainnet', chain: 'MAINNET' },
                { _description: 'Get protocol metrics for Base', chain: 'BASE' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildGetProtocolMetrics' },
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getSwapPaths: {
            requestMethod: 'POST',
            description: 'Query the Balancer Smart Order Router (SOR) to find optimal swap paths between two tokens on a specific chain.',
            route: '/',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: chainEnum, options: ['default(MAINNET)'] } },
                { position: { key: 'tokenIn', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenOut', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'swapAmount', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'swapType', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(EXACT_IN,EXACT_OUT)', options: ['default(EXACT_IN)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get swap paths for 1 WETH to USDC on Mainnet', chain: 'MAINNET', tokenIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', tokenOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', swapAmount: '1', swapType: 'EXACT_IN' }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildGetSwapPaths' },
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        }
    },
    handlers: {
        buildGetTopPools: async ( { struct, payload, userParams } ) => {
            const { chain, first, skip, orderBy } = userParams
            const query = `query GetTopPools($first: Int, $skip: Int, $orderBy: GqlPoolOrderBy, $chain: [GqlChain!]) {
  poolGetPools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: desc, where: { chainIn: $chain }) {
    id
    address
    name
    type
    chain
    protocolVersion
    poolTokens {
      address
      symbol
      weight
    }
    dynamicData {
      totalLiquidity
      volume24h
      fees24h
      swapFee
      totalShares
      aprItems {
        title
        apr
        type
      }
    }
    staking {
      gauge {
        gaugeAddress
      }
    }
  }
}`
            payload.body = { query, variables: { first, skip, orderBy, chain: [chain] } }

            return { struct, payload }
        },
        buildGetPoolById: async ( { struct, payload, userParams } ) => {
            const { poolId, chain } = userParams
            const query = `query GetPoolById($id: String!, $chain: GqlChain!) {
  poolGetPool(id: $id, chain: $chain) {
    id
    address
    name
    type
    chain
    protocolVersion
    poolTokens {
      address
      symbol
      name
      weight
      balance
      decimals
    }
    dynamicData {
      totalLiquidity
      volume24h
      fees24h
      swapFee
      totalShares
      aprItems {
        id
        title
        apr
        type
      }
    }
    staking {
      gauge {
        gaugeAddress
      }
    }
  }
}`
            payload.body = { query, variables: { id: poolId, chain } }

            return { struct, payload }
        },
        buildGetTokenPrices: async ( { struct, payload, userParams } ) => {
            const { chain } = userParams
            const query = `query GetTokenPrices($chains: [GqlChain!]!) {
  tokenGetCurrentPrices(chains: $chains) {
    address
    chain
    price
    updatedAt
  }
}`
            payload.body = { query, variables: { chains: [chain] } }

            return { struct, payload }
        },
        buildGetProtocolMetrics: async ( { struct, payload, userParams } ) => {
            const { chain } = userParams
            const query = `query GetProtocolMetrics($chains: [GqlChain!]!) {
  protocolMetricsAggregated(chains: $chains) {
    totalLiquidity
    swapVolume24h
    swapFee24h
    poolCount
    numLiquidityProviders
  }
}`
            payload.body = { query, variables: { chains: [chain] } }

            return { struct, payload }
        },
        buildGetSwapPaths: async ( { struct, payload, userParams } ) => {
            const { chain, tokenIn, tokenOut, swapAmount, swapType } = userParams
            const query = `query GetSwapPaths($chain: GqlChain!, $tokenIn: String!, $tokenOut: String!, $swapAmount: AmountHumanReadable!, $swapType: GqlSorSwapType!) {
  sorGetSwapPaths(chain: $chain, tokenIn: $tokenIn, tokenOut: $tokenOut, swapAmount: $swapAmount, swapType: $swapType) {
    tokenIn
    tokenInAmount
    tokenOut
    tokenOutAmount
    effectivePrice
    effectivePriceReversed
    priceImpact {
      priceImpact
      error
    }
    routes {
      share
      tokenIn
      tokenInAmount
      tokenOut
      tokenOutAmount
      hops {
        tokenIn
        tokenInAmount
        tokenOut
        tokenOutAmount
        pool {
          id
          type
        }
      }
    }
    protocolVersion
  }
}`
            payload.body = { query, variables: { chain, tokenIn, tokenOut, swapAmount, swapType } }

            return { struct, payload }
        },
        extractGraphQL: async ( { struct, payload } ) => {
            const data = struct['data']

            if( data && data['data'] ) {
                const keys = Object.keys( data['data'] )
                struct['data'] = keys.length === 1 ? data['data'][keys[0]] : data['data']
            }

            if( data && data['errors'] ) {
                struct['status'] = false
                const messages = data['errors']
                    .map( ( error ) => {
                        const msg = error['message']

                        return msg
                    } )
                struct['messages'] = messages
            }

            return { struct, payload }
        }
    }
}


export { schema }
