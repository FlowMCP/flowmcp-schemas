// Schema for #181 — Avnu Starknet DEX Aggregator
// No API key required — fully public

export const main = {
    namespace: 'avnu',
    name: 'Avnu Starknet DEX',
    description: 'Get swap quotes, token listings and liquidity sources on Starknet via Avnu DEX aggregator. No API key required.',
    version: '2.0.0',
    docs: ['https://doc.avnu.fi/', 'https://starknet.api.avnu.fi/'],
    tags: ['starknet', 'defi', 'swap', 'cacheTtlRealtime'],
    root: 'https://starknet.api.avnu.fi',
    routes: {
        getSwapQuote: {
            method: 'GET',
            path: '/swap/v2/quotes',
            description: 'Get optimal swap quotes on Starknet. Amounts must be in hex format (e.g. 0xde0b6b3a7640000 for 1 ETH). Returns routes and buy amount.',
            parameters: [
                { position: { key: 'sellTokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'buyTokenAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'sellAmount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)', 'regex(^0x[a-fA-F0-9]+$)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { quoteId: { type: 'string' }, sellTokenAddress: { type: 'string' }, buyTokenAddress: { type: 'string' }, sellAmount: { type: 'string' }, buyAmount: { type: 'string' }, buyAmountWithoutFees: { type: 'string' }, sellAmountInUsd: { type: 'number' }, buyAmountInUsd: { type: 'number' }, gasFeesInUsd: { type: 'number' }, avnuFeesInUsd: { type: 'number' }, integratorFeesInUsd: { type: 'number' }, priceRatioUsd: { type: 'number' }, routes: { type: 'array', items: { type: 'object' } }, liquiditySource: { type: 'string' }, estimatedAmount: { type: 'boolean' } } } } },
            tests: [
                { _description: 'Quote 1 ETH to USDC on Starknet', sellTokenAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', buyTokenAddress: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8', sellAmount: '0xde0b6b3a7640000' }
            ],
        },
        getTokens: {
            method: 'GET',
            path: '/swap/v2/tokens',
            description: 'List all tradable tokens on Avnu with name, symbol, decimals and address. Supports pagination.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { content: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, address: { type: 'string' }, decimals: { type: 'number' }, logoUri: { type: 'string' }, coingeckoId: { type: 'string' }, tags: { type: 'array', items: { type: 'string' } } } } }, totalPages: { type: 'number' }, totalElements: { type: 'number' }, last: { type: 'boolean' }, first: { type: 'boolean' } } } },
            tests: [
                { _description: 'First 10 tokens', page: 0, size: 10 },
                { _description: 'Search for USDC', search: 'USDC', size: 5 }
            ],
        },
        getSources: {
            method: 'GET',
            path: '/swap/v2/sources',
            description: 'List all available liquidity sources (DEXes) on Avnu. Returns name and type of each integrated protocol.',
            parameters: [],
            output: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, type: { type: 'string' } } } } },
            tests: [
                { _description: 'List all DEX sources' }
            ],
        }
    }
}
