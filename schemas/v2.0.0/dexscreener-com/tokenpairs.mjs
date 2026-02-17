// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexscreener',
    name: 'DexScreener Token Pairs API',
    description: 'Access token pair data, price information, and trading metrics from DexScreener across multiple DEX platforms',
    version: '2.0.0',
    docs: ['https://docs.dexscreener.com/api/reference'],
    tags: ['dex', 'trading', 'pairs', 'cacheTtlFrequent'],
    root: 'https://api.dexscreener.com',
    routes: {
        getTokenPairs: {
            method: 'GET',
            path: '/latest/dex/tokens/:tokenAddress',
            description: 'Get token pairs by token address on specific blockchain via DexScreener — query by tokenAddress.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get pairs for WETH token', tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
                { _description: 'Get pairs for USDC token', tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        schemaVersion: { type: 'string' },
                        pairs: { type: 'array', items: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object' }, quoteToken: { type: 'object' }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object' }, volume: { type: 'object' }, priceChange: { type: 'object' }, liquidity: { type: 'object' }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' } } } }
                    }
                }
            },
        },
        getLatestPairs: {
            method: 'GET',
            path: '/latest/dex/pairs/:chainId/:pairId',
            description: 'Get specific token pair by chain and pair address via DexScreener — query by chainId and pairId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'pairId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get specific pair on Ethereum',
                    chainId: 'ethereum',
                    pairId: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        schemaVersion: { type: 'string' },
                        pairs: { type: 'array', items: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object' }, quoteToken: { type: 'object' }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object' }, volume: { type: 'object' }, priceChange: { type: 'object' }, liquidity: { type: 'object' }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' }, info: { type: 'object' } } } },
                        pair: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } }, quoteToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object', properties: { m5: { type: 'object' }, h1: { type: 'object' }, h6: { type: 'object' }, h24: { type: 'object' } } }, volume: { type: 'object', properties: { h24: { type: 'number' }, h6: { type: 'number' }, h1: { type: 'number' }, m5: { type: 'number' } } }, priceChange: { type: 'object', properties: { m5: { type: 'number' }, h1: { type: 'number' }, h6: { type: 'number' }, h24: { type: 'number' } } }, liquidity: { type: 'object', properties: { usd: { type: 'number' }, base: { type: 'number' }, quote: { type: 'number' } } }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' }, info: { type: 'object', properties: { imageUrl: { type: 'string' }, openGraph: { type: 'string' }, websites: { type: 'array', items: { type: 'string' } }, socials: { type: 'array', items: { type: 'string' } } } } } }
                    }
                }
            },
        },
        getPairsByChain: {
            method: 'GET',
            path: '/orders/v1/:chainId/:sortBy',
            description: 'Get trending token pairs by chain via DexScreener — query by chainId and sortBy.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(volume,gainers,losers)', options: ['default(volume)'] } }
            ],
            tests: [
                { _description: 'Get trending pairs on Ethereum by volume', chainId: 'ethereum', sortBy: 'volume' },
                { _description: 'Get top gainers on BSC', chainId: 'bsc', sortBy: 'gainers' },
                { _description: 'Get trending pairs on Polygon', chainId: 'polygon', sortBy: 'volume' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        orders: { type: 'array', items: { type: 'string' } },
                        boosts: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
        },
        getSpecificPair: {
            method: 'GET',
            path: '/latest/dex/pairs/:chainId/:pairAddress',
            description: 'Get detailed information about a specific token pair by chain and address. Required: chainId, pairAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'pairAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get specific pair on Ethereum',
                    chainId: 'ethereum',
                    pairAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640'
                },
                { _description: 'Get specific pair on BSC', chainId: 'bsc', pairAddress: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        schemaVersion: { type: 'string' },
                        pairs: { type: 'array', items: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object' }, quoteToken: { type: 'object' }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object' }, volume: { type: 'object' }, priceChange: { type: 'object' }, liquidity: { type: 'object' }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' }, info: { type: 'object' } } } },
                        pair: { type: 'object', properties: { chainId: { type: 'string' }, dexId: { type: 'string' }, url: { type: 'string' }, pairAddress: { type: 'string' }, labels: { type: 'array', items: { type: 'string' } }, baseToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } }, quoteToken: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' } } }, priceNative: { type: 'string' }, priceUsd: { type: 'string' }, txns: { type: 'object', properties: { m5: { type: 'object' }, h1: { type: 'object' }, h6: { type: 'object' }, h24: { type: 'object' } } }, volume: { type: 'object', properties: { h24: { type: 'number' }, h6: { type: 'number' }, h1: { type: 'number' }, m5: { type: 'number' } } }, priceChange: { type: 'object', properties: { m5: { type: 'number' }, h1: { type: 'number' }, h6: { type: 'number' }, h24: { type: 'number' } } }, liquidity: { type: 'object', properties: { usd: { type: 'number' }, base: { type: 'number' }, quote: { type: 'number' } } }, fdv: { type: 'number' }, marketCap: { type: 'number' }, pairCreatedAt: { type: 'number' }, info: { type: 'object', properties: { imageUrl: { type: 'string' }, openGraph: { type: 'string' }, websites: { type: 'array', items: { type: 'string' } }, socials: { type: 'array', items: { type: 'string' } } } } } }
                    }
                }
            },
        }
    }
}
