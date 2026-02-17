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
            ],
            tests: [
                { _description: 'List latest ethscriptions', max_results: 5 },
                { _description: 'Filter ethscriptions by mimetype', mimetype: 'text/plain', max_results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { transaction_hash: { type: 'string' }, block_number: { type: 'string' }, transaction_index: { type: 'string' }, block_timestamp: { type: 'string' }, block_blockhash: { type: 'string' }, event_log_index: { type: 'number', nullable: true }, ethscription_number: { type: 'string' }, creator: { type: 'string' }, initial_owner: { type: 'string' }, current_owner: { type: 'string' }, previous_owner: { type: 'string' }, content_uri: { type: 'string' }, content_sha: { type: 'string' }, esip6: { type: 'boolean' }, mimetype: { type: 'string' }, media_type: { type: 'string' }, mime_subtype: { type: 'string' }, gas_price: { type: 'string' }, gas_used: { type: 'string' }, transaction_fee: { type: 'string' }, value: { type: 'string' }, attachment_sha: { type: 'string', nullable: true }, attachment_content_type: { type: 'string', nullable: true }, b64_content: { type: 'string' } } } },
                        pagination: { type: 'object', properties: { page_key: { type: 'string' }, has_more: { type: 'boolean' } } }
                    }
                }
            },
        },
        getEthscription: {
            method: 'GET',
            path: '/ethscriptions/:id',
            description: 'Get detailed information about a specific ethscription by transaction hash or number',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get ethscription #1 details', id: '1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { transaction_hash: { type: 'string' }, block_number: { type: 'string' }, transaction_index: { type: 'string' }, block_timestamp: { type: 'string' }, block_blockhash: { type: 'string' }, event_log_index: { type: 'number', nullable: true }, ethscription_number: { type: 'string' }, creator: { type: 'string' }, initial_owner: { type: 'string' }, current_owner: { type: 'string' }, previous_owner: { type: 'string' }, content_uri: { type: 'string' }, content_sha: { type: 'string' }, esip6: { type: 'boolean' }, mimetype: { type: 'string' }, media_type: { type: 'string' }, mime_subtype: { type: 'string' }, gas_price: { type: 'string' }, gas_used: { type: 'string' }, transaction_fee: { type: 'string' }, value: { type: 'string' }, attachment_sha: { type: 'string', nullable: true }, attachment_content_type: { type: 'string', nullable: true }, ethscription_transfers: { type: 'array', items: { type: 'object' } }, b64_content: { type: 'string' } } }
                    }
                }
            },
        },
        getEthscriptionData: {
            method: 'GET',
            path: '/ethscriptions/:id/data',
            description: 'Retrieve the raw content data of an ethscription via Ethscriptions — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            output: {
                mimeType: 'image/png',
                schema: { type: 'string', format: 'binary', description: 'Raw ethscription content data (image/text/binary)' }
            },
            tests: [
                { _description: 'Get raw data of ethscription #1', id: '1' }
            ],
        },
        getEthscriptionAttachment: {
            method: 'GET',
            path: '/ethscriptions/:id/attachment',
            description: 'Retrieve the raw attachment data of an ethscription via Ethscriptions — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get attachment of ethscription #1', id: '1' }
            ],
        },
        checkEthscriptionExists: {
            method: 'GET',
            path: '/ethscriptions/exists/:sha',
            description: 'Check if an ethscription exists by its content SHA hash via Ethscriptions — query by sha.',
            parameters: [
                { position: { key: 'sha', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Check ethscription existence by SHA',
                    sha: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { exists: { type: 'boolean' }, ethscription: { type: 'string', nullable: true } } }
                    }
                }
            },
        },
        checkMultipleEthscriptionsExistence: {
            method: 'POST',
            path: '/ethscriptions/exists_multi',
            description: 'Check existence of multiple ethscriptions by SHA hashes (max 100). Required: shas.',
            parameters: [
                { position: { key: 'shas', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['min(1)', 'max(100)'] } }
            ],
            tests: [
                {
                    _description: 'Check multiple ethscription SHAs',
                    shas: ['a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2']
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2: { type: 'string', nullable: true } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'List recent ethscription transfers', max_results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { ethscription_transaction_hash: { type: 'string' }, transaction_hash: { type: 'string' }, from_address: { type: 'string' }, to_address: { type: 'string' }, block_number: { type: 'string' }, block_timestamp: { type: 'string' }, block_blockhash: { type: 'string' }, event_log_index: { type: 'string' }, transfer_index: { type: 'string' }, transaction_index: { type: 'string' }, enforced_previous_owner: { type: 'string' } } } },
                        pagination: { type: 'object', properties: { page_key: { type: 'string' }, has_more: { type: 'boolean' } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'List ethscription tokens', max_results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { deploy_ethscription_transaction_hash: { type: 'string' }, deploy_block_number: { type: 'string' }, deploy_transaction_index: { type: 'string' }, protocol: { type: 'string' }, tick: { type: 'string' }, max_supply: { type: 'string' }, total_supply: { type: 'string' }, mint_amount: { type: 'string' } } } },
                        pagination: { type: 'object', properties: { page_key: { type: 'string' }, has_more: { type: 'boolean' } } }
                    }
                }
            },
        }
    }
}
