// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'blockberry',
    name: 'Blockberry Mina Mainnet API',
    description: 'Mina blockchain data API for blocks, accounts, and ZkApps (working endpoints only)',
    version: '2.0.0',
    docs: ['https://docs.blockberry.one/', 'https://docs.blockberry.one/reference/mina-mainnet-quickstart'],
    tags: ['production', 'blockchain', 'explorer', 'mina', 'cacheTtlDaily'],
    root: 'https://api.blockberry.one/mina-mainnet/v1',
    requiredServerParams: ['BLOCKBERRY_API_KEY'],
    headers: {
        accept: 'application/json',
        'x-api-key': '{{BLOCKBERRY_API_KEY}}'
    },
    routes: {
        getDashboardInfo: {
            method: 'GET',
            path: '/info',
            description: 'Get key Mina blockchain parameters including price, supply, block height, and validator count',
            parameters: []
        },
        getAccountByHash: {
            method: 'GET',
            path: '/accounts/{publicKeyHash}',
            description: 'Get detailed account information by public key hash via Blockberry. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'publicKeyHash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getAccountBalance: {
            method: 'GET',
            path: '/accounts/{publicKeyHash}/balance',
            description: 'Get current balance for a specific Mina account via Blockberry. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'publicKeyHash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getBlocks: {
            method: 'GET',
            path: '/blocks',
            description: 'Get list of Mina blocks (canonical and orphaned) with pagination. Optional filters: page, size, orderBy, sortBy, type.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['default(DESC)', 'optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(HEIGHT,TIMESTAMP)', options: ['default(HEIGHT)', 'optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ALL,CANONICAL,ORPHANED)', options: ['default(ALL)', 'optional()'] } }
            ]
        },
        getZkAppTransactions: {
            method: 'GET',
            path: '/zkapps/transactions',
            description: 'Get list of ZkApp transactions with filtering options via Blockberry. Supports page, size filters.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } }
            ]
        },
        getZkAppByAddress: {
            method: 'GET',
            path: '/zkapps/{address}',
            description: 'Get ZkApp information by account address via Blockberry. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
