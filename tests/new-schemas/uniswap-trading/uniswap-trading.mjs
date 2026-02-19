const schema = {
    namespace: 'uniswapTrading',
    name: 'Uniswap Trading API',
    description: 'Get swap quotes with gas estimation, routing info, price impact, and check token approval status via the Uniswap Trading API. Supports EVM multi-chain swaps across Ethereum, Arbitrum, Base, Polygon, Optimism, and more.',
    docs: ['https://docs.uniswap.org/api/trading/integration-guide', 'https://api-docs.uniswap.org/api-reference/swapping/quote'],
    tags: ['defi', 'swap', 'trading', 'evm', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://trade-api.gateway.uniswap.org/v1',
    requiredServerParams: ['UNISWAP_API_KEY'],
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': '{{UNISWAP_API_KEY}}'
    },
    routes: {
        getQuote: {
            requestMethod: 'POST',
            description: 'Get a swap quote including estimated output amount, gas fees in USD, optimal route, price impact, and Permit2 data. Supports classic AMM routing (v2/v3/v4) and UniswapX intent-based routing.',
            route: '/quote',
            parameters: [
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(EXACT_INPUT,EXACT_OUTPUT)', options: ['default(EXACT_INPUT)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenInChainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'tokenOutChainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'tokenIn', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenOut', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'swapper', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'slippageTolerance', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(0)', 'max(100)', 'optional()'] } },
                { position: { key: 'routingPreference', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(BEST_PRICE,FASTEST)', options: ['default(BEST_PRICE)', 'optional()'] } },
                { position: { key: 'urgency', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(normal,fast,urgent)', options: ['default(urgent)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Quote 1 WETH to USDC on Ethereum (exact input)', type: 'EXACT_INPUT', amount: '1000000000000000000', tokenInChainId: 1, tokenOutChainId: 1, tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', swapper: '0x0000000000000000000000000000000000000001' },
                { _description: 'Quote 1000 USDC to WETH on Base', type: 'EXACT_INPUT', amount: '1000000000', tokenInChainId: 8453, tokenOutChainId: 8453, tokenIn: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', tokenOut: '0x4200000000000000000000000000000000000006', swapper: '0x0000000000000000000000000000000000000001' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatQuoteResponse' }
            ]
        },
        checkApproval: {
            requestMethod: 'POST',
            description: 'Check if token approval (Permit2) is required before executing a swap. Returns an approval transaction if needed, or null if the token is already approved.',
            route: '/check_approval',
            parameters: [
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'includeGasInfo', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['default(true)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Check USDC approval on Ethereum', walletAddress: '0x0000000000000000000000000000000000000001', token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount: '1000000000', chainId: 1 },
                { _description: 'Check USDC approval on Base with gas info', walletAddress: '0x0000000000000000000000000000000000000001', token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', amount: '1000000000', chainId: 8453, includeGasInfo: true }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatQuoteResponse: async ( { struct, payload } ) => {
            const data = struct['data']

            if( !data || !data['quote'] ) {
                return { struct, payload }
            }

            const { quote, routing, requestId } = data
            const result = { requestId, routing }

            if( routing === 'CLASSIC' ) {
                const { input, output, gasFeeUSD, routeString, priceImpact, slippage } = quote
                result['input'] = input
                result['output'] = output
                result['gasFeeUSD'] = gasFeeUSD
                result['routeString'] = routeString
                result['priceImpact'] = priceImpact
                result['slippage'] = slippage
            } else {
                result['quote'] = quote
            }

            if( data['permitData'] ) {
                result['permitData'] = 'present'
            }

            struct['data'] = result

            return { struct, payload }
        }
    }
}


export { schema }
