// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Namespace: "oneInch" -> "oneinch"

export const main = {
    namespace: 'oneinch',
    name: '1inch Swap API',
    description: 'Get swap quotes and generate swap transaction data across 13+ EVM chains using the 1inch aggregation protocol',
    version: '2.0.0',
    docs: ['https://business.1inch.com/portal/documentation/apis/swap/introduction', 'https://1inch.io/'],
    tags: ['defi', 'swap', 'ethereum', 'trading', 'cacheTtlRealtime'],
    root: 'https://api.1inch.dev/swap/v6.0',
    requiredServerParams: ['ONEINCH_API_KEY'],
    headers: {
        Authorization: 'Bearer {{ONEINCH_API_KEY}}'
    },
    routes: {
        getQuote: {
            method: 'GET',
            path: '/:chainId/quote',
            description: 'Get a swap quote with estimated output amount for a token pair on a specific chain',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'src', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'dst', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'fee', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(3)', 'optional()'] } },
                { position: { key: 'protocols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getSwap: {
            method: 'GET',
            path: '/:chainId/swap',
            description: 'Generate swap transaction data ready for on-chain execution via oneInch — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'src', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'dst', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'slippage', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(50)'] } },
                { position: { key: 'protocols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getTokens: {
            method: 'GET',
            path: '/:chainId/tokens',
            description: 'List all tokens available for swapping on a specific chain via oneInch — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        getApprove: {
            method: 'GET',
            path: '/:chainId/approve/transaction',
            description: 'Get the approve transaction calldata for token allowance to the 1inch router. Required: chainId, tokenAddress. Optional filters: amount.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getAllowance: {
            method: 'GET',
            path: '/:chainId/approve/allowance',
            description: 'Check current allowance of a token for the 1inch router via oneInch — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ]
        }
    }
}
