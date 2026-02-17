// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexscreener',
    name: 'dexscreener-tokeninfo',
    description: 'Search tokens and retrieve profile data from DexScreener — latest token profiles, pair search, token-to-pair lookups, and pool listings across all DEX chains.',
    version: '2.0.0',
    docs: ['https://docs.dexscreener.com/api/reference'],
    tags: ['defi', 'tokens', 'discovery', 'cacheTtlFrequent'],
    root: 'https://api.dexscreener.com',
    routes: {
        getLatestTokenProfiles: {
            method: 'GET',
            path: '/token-profiles/latest/v1',
            description: 'Get the latest token profiles via DexScreener. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch latest token profiles' }
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
                            icon: { type: 'string' },
                            header: { type: 'string' },
                            openGraph: { type: 'string' },
                            description: { type: 'string' },
                            cto: { type: 'boolean' }
                        }
                    }
                }
            },
        },
        searchPairs: {
            method: 'GET',
            path: '/latest/dex/search',
            description: 'Search pairs by query string via DexScreener. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Search pairs by query', q: 'SOL/USDC' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        schemaVersion: { type: 'string' },
                        pairs: { type: 'array', items: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object' }, quoteToken: { type: 'object' }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object' }, volume: { type: 'object' }, priceChange: { type: 'object' }, liquidity: { type: 'object' }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' }, info: { type: 'object' } } } }
                    }
                }
            },
        },
        getPairsByToken: {
            method: 'GET',
            path: '/tokens/v1/:chainId/:tokenAddress',
            description: 'Get pairs by token address via DexScreener — query by chainId and tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get token pairs', chainId: 'ethereum', tokenAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            chainId: { type: 'string' },
                            dexId: { type: 'string' },
                            url: { type: 'string' },
                            pairAddress: { type: 'string' },
                            labels: { type: 'array', items: { type: 'string' } },
                            baseToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } },
                            quoteToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } },
                            priceNative: { type: 'string' },
                            priceUsd: { type: 'string' },
                            txns: { type: 'object', properties: { m5: { type: 'object' }, h1: { type: 'object' }, h6: { type: 'object' }, h24: { type: 'object' } } },
                            volume: { type: 'object', properties: { h24: { type: 'number' }, h6: { type: 'number' }, h1: { type: 'number' }, m5: { type: 'number' } } },
                            priceChange: { type: 'object', properties: { m5: { type: 'number' }, h1: { type: 'number' }, h6: { type: 'number' }, h24: { type: 'number' } } },
                            liquidity: { type: 'object', properties: { usd: { type: 'number' }, base: { type: 'number' }, quote: { type: 'number' } } },
                            fdv: { type: 'number' },
                            marketCap: { type: 'number' },
                            pairCreatedAt: { type: 'number' },
                            info: { type: 'object', properties: { imageUrl: { type: 'string' }, header: { type: 'string' }, openGraph: { type: 'string' }, websites: { type: 'array', items: { type: 'object' } }, socials: { type: 'array', items: { type: 'object' } } } }
                        }
                    }
                }
            },
        },
        getTokenPools: {
            method: 'GET',
            path: '/token-pairs/v1/:chainId/:tokenAddress',
            description: 'Get token pools by chain and address via DexScreener — query by chainId and tokenAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get token pools', chainId: 'bsc', tokenAddress: '0xD279E8f1fE8F893e4b1CB18fAAeb4fc2a0d14444' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'string' }
                }
            },
        }
    }
}
