// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'dexpaprika',
    name: 'DexPaprika DeFi Prices',
    description: 'Query decentralized exchange data including token prices, pools, liquidity, and transactions via dexpaprika.com',
    version: '2.0.0',
    docs: ['https://api.dexpaprika.com/docs'],
    tags: ['defi', 'prices', 'liquidity', 'cacheTtlRealtime'],
    root: 'https://api.dexpaprika.com',
    routes: {
        getNetworks: {
            method: 'GET',
            path: '/networks',
            description: 'Get all supported blockchain networks via DexPaprika. Returns structured JSON response data.',
            parameters: []
        },
        getToken: {
            method: 'GET',
            path: '/networks/:network_id/tokens/:token_address',
            description: 'Get detailed token information on a specific network via DexPaprika — query by network id and token address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'token_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getMultiPrices: {
            method: 'GET',
            path: '/networks/:network_id/multi/prices',
            description: 'Get prices for multiple tokens on a network via DexPaprika — query by network id.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getPool: {
            method: 'GET',
            path: '/networks/:network_id/pools/:pool_address',
            description: 'Get detailed pool information on a specific network via DexPaprika — query by network id and pool address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pool_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getTokenPools: {
            method: 'GET',
            path: '/networks/:network_id/tokens/:token_address/pools',
            description: 'Get all pools for a specific token on a network via DexPaprika — query by network id and token address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'token_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } }
            ]
        },
        getPoolTransactions: {
            method: 'GET',
            path: '/networks/:network_id/pools/:pool_address/transactions',
            description: 'Get recent transactions for a specific pool via DexPaprika — query by network id and pool address.',
            parameters: [
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pool_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } }
            ]
        },
        searchTokens: {
            method: 'GET',
            path: '/search',
            description: 'Search for tokens across all networks via DexPaprika. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
