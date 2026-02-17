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
            ],
            tests: [
                {
                    _description: 'Quote 1 ETH to USDC on Ethereum',
                    chainId: 1,
                    src: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                    dst: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    amount: '1000000000000000000'
                }
            ],
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
            ],
            tests: [
                {
                    _description: 'Swap 1 ETH to USDC',
                    chainId: 1,
                    src: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                    dst: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    amount: '1000000000000000000',
                    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
                    slippage: 1
                }
            ],
        },
        getTokens: {
            method: 'GET',
            path: '/:chainId/tokens',
            description: 'List all tokens available for swapping on a specific chain via oneInch — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'List Ethereum tokens', chainId: 1 }
            ],
        },
        getApprove: {
            method: 'GET',
            path: '/:chainId/approve/transaction',
            description: 'Get the approve transaction calldata for token allowance to the 1inch router. Required: chainId, tokenAddress. Optional filters: amount.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Approve USDC on Ethereum', chainId: 1, tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
            ],
        },
        getAllowance: {
            method: 'GET',
            path: '/:chainId/approve/allowance',
            description: 'Check current allowance of a token for the 1inch router via oneInch — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ],
            tests: [
                {
                    _description: 'Check USDC allowance',
                    chainId: 1,
                    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
                }
            ],
        }
    }
}
