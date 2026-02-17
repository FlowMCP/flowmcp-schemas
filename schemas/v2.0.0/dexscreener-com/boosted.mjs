// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexscreener',
    name: 'dexscreener-boosted',
    description: 'Discover trending boosted tokens on DexScreener — latest and most actively boosted token listings across all DEX chains.',
    version: '2.0.0',
    docs: ['https://docs.dexscreener.com/api/reference'],
    tags: ['defi', 'trading', 'boosted', 'cacheTtlFrequent'],
    root: 'https://api.dexscreener.com',
    routes: {
        getLatestBoostedTokens: {
            method: 'GET',
            path: '/token-boosts/latest/v1',
            description: 'Get the latest boosted tokens via DexScreener. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch latest boosted tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            chainId: { type: 'string' },
                            tokenAddress: { type: 'string' },
                            description: { type: 'string' },
                            icon: { type: 'string' },
                            header: { type: 'string' },
                            openGraph: { type: 'string' },
                            links: { type: 'array', items: { type: 'object' } },
                            totalAmount: { type: 'number' },
                            amount: { type: 'number' }
                        }
                    }
                }
            },
        },
        getMostActiveBoostedTokens: {
            method: 'GET',
            path: '/token-boosts/top/v1',
            description: 'Get tokens with most active boosts via DexScreener. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch most active boosted tokens' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            chainId: { type: 'string' },
                            tokenAddress: { type: 'string' },
                            description: { type: 'string' },
                            icon: { type: 'string' },
                            header: { type: 'string' },
                            openGraph: { type: 'string' },
                            links: { type: 'array', items: { type: 'object' } },
                            totalAmount: { type: 'number' }
                        }
                    }
                }
            },
        }
    }
}
