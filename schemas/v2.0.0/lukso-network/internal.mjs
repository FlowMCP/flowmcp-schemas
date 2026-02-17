// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"

export const main = {
    namespace: 'luksonetwork',
    name: 'LUKSO BlockScout Meta',
    description: 'LUKSO BlockScout internal endpoints — latest main page transactions and blocks, node health, JSON-RPC config, and Celestia blob metadata.',
    version: '2.0.0',
    docs: ['https://explorer.execution.mainnet.lukso.network/api-docs', 'https://explorer.execution.testnet.lukso.network/api-docs'],
    tags: ['lukso', 'internal', 'explorer', 'cacheTtlDaily'],
    root: 'https://explorer.execution.--chain--.lukso.network/api/v2',
    routes: {
        getMainPageTransactions: {
            method: 'GET',
            path: '/main-page/transactions',
            description: 'Latest transactions for main page via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } }
            ],
            tests: [
                { _description: 'Main page txs', chainName: 'LUKSO_MAINNET' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            priority_fee: { type: 'string' },
                            raw_input: { type: 'string' },
                            is_pending_update: { type: 'boolean' },
                            result: { type: 'string' },
                            hash: { type: 'string' },
                            max_fee_per_gas: { type: 'string' },
                            revert_reason: { type: 'string', nullable: true },
                            confirmation_duration: { type: 'array', items: { type: 'number' } },
                            transaction_burnt_fee: { type: 'string' },
                            type: { type: 'number' },
                            token_transfers_overflow: { type: 'string', nullable: true },
                            confirmations: { type: 'number' },
                            position: { type: 'number' },
                            max_priority_fee_per_gas: { type: 'string' },
                            transaction_tag: { type: 'string', nullable: true },
                            created_contract: { type: 'string', nullable: true },
                            value: { type: 'string' },
                            from: { type: 'object', properties: { ens_domain_name: { type: 'string', nullable: true }, hash: { type: 'string' }, implementations: { type: 'array', items: { type: 'string' } }, is_contract: { type: 'boolean' }, is_scam: { type: 'boolean' }, is_verified: { type: 'boolean' }, metadata: { type: 'string', nullable: true }, name: { type: 'string', nullable: true }, private_tags: { type: 'array', items: { type: 'string' } }, proxy_type: { type: 'string', nullable: true }, public_tags: { type: 'array', items: { type: 'string' } }, reputation: { type: 'string' }, watchlist_names: { type: 'array', items: { type: 'string' } } } },
                            gas_used: { type: 'string' },
                            status: { type: 'string' },
                            to: { type: 'object', properties: { ens_domain_name: { type: 'string', nullable: true }, hash: { type: 'string' }, implementations: { type: 'array', items: { type: 'string' } }, is_contract: { type: 'boolean' }, is_scam: { type: 'boolean' }, is_verified: { type: 'boolean' }, metadata: { type: 'string', nullable: true }, name: { type: 'string' }, private_tags: { type: 'array', items: { type: 'string' } }, proxy_type: { type: 'string', nullable: true }, public_tags: { type: 'array', items: { type: 'string' } }, reputation: { type: 'string' }, watchlist_names: { type: 'array', items: { type: 'string' } } } },
                            authorization_list: { type: 'array', items: { type: 'string' } },
                            method: { type: 'string' },
                            fee: { type: 'object', properties: { type: { type: 'string' }, value: { type: 'string' } } },
                            actions: { type: 'array', items: { type: 'string' } },
                            gas_limit: { type: 'string' },
                            gas_price: { type: 'string' },
                            decoded_input: { type: 'object', properties: { method_call: { type: 'string' }, method_id: { type: 'string' }, parameters: { type: 'array', items: { type: 'object' } } } },
                            token_transfers: { type: 'string', nullable: true },
                            base_fee_per_gas: { type: 'string' },
                            timestamp: { type: 'string' },
                            nonce: { type: 'number' },
                            historic_exchange_rate: { type: 'number', nullable: true },
                            transaction_types: { type: 'array', items: { type: 'string' } },
                            exchange_rate: { type: 'number', nullable: true },
                            block_number: { type: 'number' },
                            has_error_in_internal_transactions: { type: 'boolean', nullable: true }
                        }
                    }
                }
            },
        },
        getMainPageBlocks: {
            method: 'GET',
            path: '/main-page/blocks',
            description: 'Latest blocks for main page via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } }
            ],
            tests: [
                { _description: 'Main page blocks', chainName: 'LUKSO_TESTNET' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            base_fee_per_gas: { type: 'string' },
                            burnt_fees: { type: 'string' },
                            burnt_fees_percentage: { type: 'number', nullable: true },
                            difficulty: { type: 'string' },
                            gas_limit: { type: 'string' },
                            gas_target_percentage: { type: 'number' },
                            gas_used: { type: 'string' },
                            gas_used_percentage: { type: 'number' },
                            hash: { type: 'string' },
                            height: { type: 'number' },
                            internal_transactions_count: { type: 'number', nullable: true },
                            is_pending_update: { type: 'boolean' },
                            miner: { type: 'object', properties: { ens_domain_name: { type: 'string', nullable: true }, hash: { type: 'string' }, implementations: { type: 'array', items: { type: 'object' } }, is_contract: { type: 'boolean' }, is_scam: { type: 'boolean' }, is_verified: { type: 'boolean' }, metadata: { type: 'string', nullable: true }, name: { type: 'string' }, private_tags: { type: 'array', items: { type: 'string' } }, proxy_type: { type: 'string' }, public_tags: { type: 'array', items: { type: 'string' } }, reputation: { type: 'string' }, watchlist_names: { type: 'array', items: { type: 'string' } } } },
                            nonce: { type: 'string' },
                            parent_hash: { type: 'string' },
                            priority_fee: { type: 'string' },
                            rewards: { type: 'array', items: { type: 'string' } },
                            size: { type: 'number' },
                            timestamp: { type: 'string' },
                            total_difficulty: { type: 'number', nullable: true },
                            transaction_fees: { type: 'string' },
                            transactions_count: { type: 'number' },
                            type: { type: 'string' },
                            uncles_hashes: { type: 'array', items: { type: 'string' } },
                            withdrawals_count: { type: 'number', nullable: true }
                        }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getMainPageTransactions: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            if( struct['status'] === false ) {}
            return { response }
        }
    },
    getMainPageBlocks: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            if( struct['status'] === false ) {}
            return { response }
        }
    }
} )
