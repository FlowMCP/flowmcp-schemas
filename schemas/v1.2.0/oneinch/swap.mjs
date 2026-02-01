const schema = {
    namespace: 'oneinch',
    name: '1inch Swap API',
    description: '1inch DEX aggregator API for token swap quotes and execution across multiple EVM chains',
    docs: [ 'https://business.1inch.com/portal/documentation' ],
    tags: [ 'defi', 'dex', 'swap', 'aggregator' ],
    flowMCP: '1.2.0',
    root: 'https://api.1inch.dev',
    requiredServerParams: [ 'ONEINCH_API_KEY' ],
    headers: {
        'Authorization': 'Bearer {{ONEINCH_API_KEY}}'
    },
    routes: {
        getQuote: {
            requestMethod: 'GET',
            description: 'Get the best swap quote for a token pair on a specific chain. Returns estimated output amount and routing info.',
            route: '/swap/v6.0/:chainId/quote',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("1")' ] } },
                { position: { key: 'src', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'dst', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'fee', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'protocols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'gasPrice', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'complexityLevel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'parts', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'mainRouteParts', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'gasLimit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Quote WETH to USDC on Ethereum', chainId: '1', src: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', dst: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount: '1000000000000000000' }
            ],
            modifiers: []
        },
        getSwap: {
            requestMethod: 'GET',
            description: 'Get swap transaction data for execution. Returns calldata, tx value, gas estimate, and routing info.',
            route: '/swap/v6.0/:chainId/swap',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("1")' ] } },
                { position: { key: 'src', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'dst', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'slippage', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(0)', 'max(50)', 'default(1)' ] } },
                { position: { key: 'protocols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'fee', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'gasPrice', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'disableEstimate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'allowPartialFill', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Swap WETH to USDC on Ethereum', chainId: '1', src: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', dst: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount: '1000000000000000000', from: '0x0000000000000000000000000000000000000000', slippage: 1, disableEstimate: 'true' }
            ],
            modifiers: []
        },
        getSpotPrices: {
            requestMethod: 'GET',
            description: 'Get spot prices for tokens on a specific chain. Returns USD prices for the given token addresses.',
            route: '/price/v1.1/:chainId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("1")' ] } },
                { position: { key: 'tokens', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)' ] } },
                { position: { key: 'currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get WETH price on Ethereum', chainId: '1', tokens: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' }
            ],
            modifiers: []
        },
        getTokens: {
            requestMethod: 'GET',
            description: 'Get the list of tokens available for swapping on a specific chain.',
            route: '/token/v1.2/:chainId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("1")' ] } }
            ],
            tests: [
                { _description: 'Get tokens on Ethereum', chainId: '1' }
            ],
            modifiers: []
        },
        getGasPrice: {
            requestMethod: 'GET',
            description: 'Get current gas price recommendations for a specific chain.',
            route: '/gas-price/v1.5/:chainId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("1")' ] } }
            ],
            tests: [
                { _description: 'Get Ethereum gas price', chainId: '1' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
