export const schema = {
    namespace: 'debridge',
    name: 'DeBridge DLN API',
    description: 'Cross-chain bridge quotes, supported chains, token lists, and order tracking via DeBridge Liquidity Network (DLN)',
    docs: ['https://docs.debridge.com'],
    tags: ['bridge', 'crosschain', 'defi', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api.dln.trade/v1.0',
    requiredServerParams: [],
    headers: {},
    routes: {
        getSupportedChains: {
            requestMethod: 'GET',
            description: 'Get all blockchain networks supported by DeBridge DLN with chain IDs and names.',
            route: '/supported-chains-info',
            parameters: [],
            tests: [
                { _description: 'Get all supported chains with IDs and names' }
            ],
            modifiers: []
        },
        getTokenList: {
            requestMethod: 'GET',
            description: 'Get all tokens available for bridging on a specific blockchain network.',
            route: '/token-list',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get tokens available on Ethereum', chainId: 1 },
                { _description: 'Get tokens available on Polygon', chainId: 137 }
            ],
            modifiers: []
        },
        getBridgeQuote: {
            requestMethod: 'GET',
            description: 'Get a cross-chain bridge quote including estimated output amount, fees, and cost breakdown. Does not generate transaction data.',
            route: '/dln/order/quote',
            parameters: [
                { position: { key: 'srcChainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'srcChainTokenIn', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'srcChainTokenInAmount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dstChainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'dstChainTokenOut', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'prependOperatingExpenses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Quote ETH from Ethereum to MATIC on Polygon', srcChainId: 1, srcChainTokenIn: '0x0000000000000000000000000000000000000000', srcChainTokenInAmount: '1000000000000000000', dstChainId: 137, dstChainTokenOut: '0x0000000000000000000000000000000000000000' },
                { _description: 'Quote ETH from Ethereum to BNB on BSC', srcChainId: 1, srcChainTokenIn: '0x0000000000000000000000000000000000000000', srcChainTokenInAmount: '1000000000000000000', dstChainId: 56, dstChainTokenOut: '0x0000000000000000000000000000000000000000' }
            ],
            modifiers: []
        },
        getOrderById: {
            requestMethod: 'GET',
            description: 'Get detailed data of a DLN cross-chain order by its order ID (0x-prefixed 64-char hex).',
            route: '/dln/order/:orderId',
            parameters: [
                { position: { key: 'orderId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(/^0x[0-9a-fA-F]{64}$/)'] } }
            ],
            tests: [
                { _description: 'Get order details by ID (returns error for unknown order)', orderId: '0x0000000000000000000000000000000000000000000000000000000000000001' }
            ],
            modifiers: []
        },
        getOrderStatus: {
            requestMethod: 'GET',
            description: 'Get the fulfillment status of a DLN cross-chain order by its order ID (0x-prefixed 64-char hex).',
            route: '/dln/order/:orderId/status',
            parameters: [
                { position: { key: 'orderId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(/^0x[0-9a-fA-F]{64}$/)'] } }
            ],
            tests: [
                { _description: 'Get order status by ID (returns error for unknown order)', orderId: '0x0000000000000000000000000000000000000000000000000000000000000001' }
            ],
            modifiers: []
        },
        getOrderIdsByTxHash: {
            requestMethod: 'GET',
            description: 'Get all DLN order IDs that were created in a specific transaction. Requires the creation transaction hash and source chain ID.',
            route: '/dln/tx/:txHash/order-ids',
            parameters: [
                { position: { key: 'txHash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(/^0x[0-9a-fA-F]{64}$/)'] } },
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get order IDs from a tx hash on Ethereum (returns empty for unknown tx)', txHash: '0x0000000000000000000000000000000000000000000000000000000000000001', chainId: 1 }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
