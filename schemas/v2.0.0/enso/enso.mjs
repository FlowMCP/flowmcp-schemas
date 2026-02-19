const schema = {
    namespace: 'enso',
    name: 'Enso Finance DeFi Routing',
    description: 'Access Enso Finance intent-based DeFi routing API — find optimal swap routes across protocols, query supported protocols and networks, fetch token data and prices, and check chain volume.',
    docs: ['https://docs.enso.build'],
    tags: ['defi', 'routing', 'swap', 'multichain', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api.enso.build',
    requiredServerParams: ['ENSO_API_KEY'],
    headers: {
        'Authorization': 'Bearer {{ENSO_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        getRoute: {
            requestMethod: 'GET',
            description: 'Find the optimal swap route between two tokens on a given chain. Returns a ready-to-sign transaction object with amountOut, gas estimate, and route path.',
            route: '/api/v1/shortcuts/route',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'fromAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } },
                { position: { key: 'tokenIn', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'tokenOut', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amountIn', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'slippage', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(50)'] } },
                { position: { key: 'routingStrategy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(router,delegate)', options: ['optional()', 'default(router)'] } }
            ],
            tests: [
                { _description: 'Route 1 USDC to WETH on Ethereum', chainId: 1, fromAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', amountIn: '1000000' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        },
        getProtocols: {
            requestMethod: 'GET',
            description: 'Retrieve all DeFi protocols supported by Enso, optionally filtered by chain ID or protocol slug.',
            route: '/api/v1/protocols',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all protocols on Ethereum', chainId: 1 },
                { _description: 'Get Aave protocol info', slug: 'aave' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        },
        getNetworks: {
            requestMethod: 'GET',
            description: 'List all blockchain networks supported by Enso, with optional filtering by name or chain ID.',
            route: '/api/v1/networks',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all supported networks' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        },
        getTokens: {
            requestMethod: 'GET',
            description: 'Search for tokens with optional filters for chain, project, protocol, type, APY range, and TVL range. Supports cursor-based pagination.',
            route: '/api/v1/tokens',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'protocolSlug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(defi,base)', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get DeFi tokens on Ethereum', chainId: 1, type: 'defi' },
                { _description: 'Get base tokens on Arbitrum', chainId: 42161, type: 'base' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        },
        getTokenPrice: {
            requestMethod: 'GET',
            description: 'Get the current USD price of a token by its address and chain ID.',
            route: '/api/v1/prices/:chainId/:address',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ],
            tests: [
                { _description: 'Get USDC price on Ethereum', chainId: 1, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
                { _description: 'Get WETH price on Ethereum', chainId: 1, address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        },
        getAggregators: {
            requestMethod: 'GET',
            description: 'List all DEX aggregators supported by Enso, optionally filtered by chain ID.',
            route: '/api/v1/aggregators',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all aggregators' },
                { _description: 'Get aggregators on Ethereum', chainId: 1 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResponse' }
            ]
        }
    },
    handlers: {
        formatResponse: ( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}


export { schema }
