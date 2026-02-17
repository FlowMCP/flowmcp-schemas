// Split from ethscriptions-com/ethscriptions-api.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// 11 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'ethscriptions',
    name: 'Ethscriptions API V2 (Part 2)',
    description: 'Access the Ethscriptions protocol for Ethereum-based digital artifacts — list, search, and inspect ethscriptions, transfers, tokens, and indexer status via the V2 API.',
    version: '2.0.0',
    docs: ['https://api.ethscriptions.com/v2', 'https://github.com/0xFacet/ethscriptions-indexer'],
    tags: ['nft', 'ethereum', 'inscriptions', 'cacheTtlDaily'],
    root: 'https://api.ethscriptions.com/v2',
    routes: {
        getTokenDetails: {
            method: 'GET',
            path: '/tokens/:protocol/:tick',
            description: 'Get detailed information about a specific token including balances. Required: protocol, tick.',
            parameters: [
                { position: { key: 'protocol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tick', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getTokenHistoricalState: {
            method: 'GET',
            path: '/tokens/:protocol/:tick/historical_state',
            description: 'Get historical state of a token at a specific block number via Ethscriptions — query by protocol and tick.',
            parameters: [
                { position: { key: 'protocol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'tick', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'as_of_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        getIndexerStatus: {
            method: 'GET',
            path: '/status',
            description: 'Get current status of the ethscriptions indexer. Returns structured JSON response data.',
            parameters: []
        }
    }
}
