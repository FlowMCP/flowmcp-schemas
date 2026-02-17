// Split from ethscriptions-com/ethscriptions-api.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// 11 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'ethscriptions',
    name: 'Ethscriptions API V2 (Part 1)',
    description: 'Access the Ethscriptions protocol for Ethereum-based digital artifacts — list, search, and inspect ethscriptions, transfers, tokens, and indexer status via the V2 API.',
    version: '2.0.0',
    docs: ['https://api.ethscriptions.com/v2', 'https://github.com/0xFacet/ethscriptions-indexer'],
    tags: ['nft', 'ethereum', 'inscriptions', 'cacheTtlDaily'],
    root: 'https://api.ethscriptions.com/v2',
    routes: {
        listEthscriptions: {
            method: 'GET',
            path: '/ethscriptions',
            description: 'Retrieve a list of ethscriptions with various filtering options Returns structured JSON response data.',
            parameters: [
                { position: { key: 'current_owner', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'creator', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'initial_owner', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'mimetype', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'token_tick', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'token_protocol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'after_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'before_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(newest_first,oldest_first)', options: ['default(newest_first)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(25)', 'optional()'] } },
                { position: { key: 'page_key', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getEthscription: {
            method: 'GET',
            path: '/ethscriptions/:id',
            description: 'Get detailed information about a specific ethscription by transaction hash or number',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getEthscriptionData: {
            method: 'GET',
            path: '/ethscriptions/:id/data',
            description: 'Retrieve the raw content data of an ethscription via Ethscriptions — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getEthscriptionAttachment: {
            method: 'GET',
            path: '/ethscriptions/:id/attachment',
            description: 'Retrieve the raw attachment data of an ethscription via Ethscriptions — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        checkEthscriptionExists: {
            method: 'GET',
            path: '/ethscriptions/exists/:sha',
            description: 'Check if an ethscription exists by its content SHA hash via Ethscriptions — query by sha.',
            parameters: [
                { position: { key: 'sha', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        checkMultipleEthscriptionsExistence: {
            method: 'POST',
            path: '/ethscriptions/exists_multi',
            description: 'Check existence of multiple ethscriptions by SHA hashes (max 100). Required: shas.',
            parameters: [
                { position: { key: 'shas', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['min(1)', 'max(100)'] } }
            ]
        },
        listTransfers: {
            method: 'GET',
            path: '/ethscription_transfers',
            description: 'List ethscription transfers with filtering options via Ethscriptions. Supports from_address, to_address, transaction_hash filters.',
            parameters: [
                { position: { key: 'from_address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'to_address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'ethscription_token_tick', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ethscription_token_protocol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(newest_first,oldest_first)', options: ['default(newest_first)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(25)', 'optional()'] } },
                { position: { key: 'page_key', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        listTokens: {
            method: 'GET',
            path: '/tokens',
            description: 'List ethscription tokens with filtering options via Ethscriptions. Supports protocol, tick, sort_by filters.',
            parameters: [
                { position: { key: 'protocol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'tick', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(newest_first,oldest_first)', options: ['default(newest_first)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(25)', 'optional()'] } },
                { position: { key: 'page_key', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        }
    }
}
