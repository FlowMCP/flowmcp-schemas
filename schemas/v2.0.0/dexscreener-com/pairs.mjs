// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexscreener',
    name: 'Dexscreener Pairs',
    description: 'Retrieve DEX trading pair data from DexScreener — pair details by chain and address, plus token buy/sell order checks across supported chains.',
    version: '2.0.0',
    docs: ['https://docs.dexscreener.com/api/reference'],
    tags: ['defi', 'trading', 'pairs', 'cacheTtlFrequent'],
    root: 'https://api.dexscreener.com',
    routes: {
        getPairByChainAndAddress: {
            method: 'GET',
            path: '/latest/dex/pairs/:chainId/:pairAddress',
            description: 'Get pair by chain and pair address via DexScreener — query by chainId and pairAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pairAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        checkTokenOrders: {
            method: 'GET',
            path: '/orders/v1/:chainId/:tokenAddress',
            description: 'Check token orders by chain and token address via DexScreener — query by chainId and tokenAddress.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
