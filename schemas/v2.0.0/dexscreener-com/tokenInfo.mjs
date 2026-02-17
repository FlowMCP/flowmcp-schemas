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
            parameters: []
        },
        searchPairs: {
            method: 'GET',
            path: '/latest/dex/search',
            description: 'Search pairs by query string via DexScreener. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getPairsByToken: {
            method: 'GET',
            path: '/tokens/v1/:chainId/:tokenAddress',
            description: 'Get pairs by token address via DexScreener — query by chainId and tokenAddress. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getTokenPools: {
            method: 'GET',
            path: '/token-pairs/v1/:chainId/:tokenAddress',
            description: 'Get token pools by chain and address via DexScreener — query by chainId and tokenAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
