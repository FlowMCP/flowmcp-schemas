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
            ]
        },
        getLatestPairs: {
            method: 'GET',
            path: '/latest/dex/pairs/:chainId/:pairId',
            description: 'Get specific token pair by chain and pair address via DexScreener — query by chainId and pairId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'pairId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getPairsByChain: {
            method: 'GET',
            path: '/orders/v1/:chainId/:sortBy',
            description: 'Get trending token pairs by chain via DexScreener — query by chainId and sortBy.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(volume,gainers,losers)', options: ['default(volume)'] } }
            ]
        },
        getSpecificPair: {
            method: 'GET',
            path: '/latest/dex/pairs/:chainId/:pairAddress',
            description: 'Get detailed information about a specific token pair by chain and address. Required: chainId, pairAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)', options: [] } },
                { position: { key: 'pairAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
