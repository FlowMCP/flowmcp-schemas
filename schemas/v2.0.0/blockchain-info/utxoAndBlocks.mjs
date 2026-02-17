// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'blockchaininfo',
    name: 'Bitcoin UTXO Analytics',
    description: 'Provides insights into Bitcoin UTXOs and block statistics using blockchain.info endpoints.',
    version: '2.0.0',
    docs: ['https://www.blockchain.com/api/blockchain_api'],
    tags: ['bitcoin', 'blockchain', 'utxo', 'cacheTtlDaily'],
    root: 'https://blockchain.info',
    routes: {
        getUTXO: {
            method: 'GET',
            path: '/unspent',
            description: 'Fetch UTXO summary for a Bitcoin address via blockchaininfo. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'active', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^([13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{39,59})$)'] } }
            ]
        },
        getBlockStats: {
            method: 'GET',
            path: '/block-height/:block_height?format=json',
            description: 'Fetch block statistics for a given block height via blockchaininfo — query by block height.',
            parameters: [
                { position: { key: 'block_height', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(0)'] } }
            ]
        }
    }
}
