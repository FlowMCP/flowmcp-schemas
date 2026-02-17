// Split from lukso-network/address.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"
// 12 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'luksonetwork',
    name: 'LUKSO BlockScout Addresses (Part 2)',
    description: 'Comprehensive address data on LUKSO via BlockScout — transactions, token transfers, internal txs, logs, balances, and coin balance history for any address.',
    version: '2.0.0',
    docs: ['https://explorer.execution.mainnet.lukso.network/api-docs', 'https://explorer.execution.testnet.lukso.network/api-docs'],
    tags: ['lukso', 'address', 'explorer', 'cacheTtlDaily'],
    root: 'https://explorer.execution.--chain--.lukso.network/api/v2',
    routes: {
        getTokenBalances: {
            method: 'GET',
            path: '/addresses/:address_hash/tokens',
            description: 'Token balances grouped via LUKSO BlockScout — query by address hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get token balances on LUKSO mainnet',
                    chainName: 'LUKSO_MAINNET',
                    address_hash: '0x7609bF8e9DE5446dBbD1C11ef7aBe00a17B4C5bB'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: { type: 'string' } },
                        next_page_params: { type: 'string', nullable: true }
                    }
                }
            },
        },
        getFlatTokenBalances: {
            method: 'GET',
            path: '/addresses/:address_hash/token-balances',
            description: 'All token balances (flat) via LUKSO BlockScout — query by address hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get flat token balances on LUKSO',
                    chainName: 'LUKSO_MAINNET',
                    address_hash: '0x7609bF8e9DE5446dBbD1C11ef7aBe00a17B4C5bB'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'string' }
                }
            },
        },
        getCoinBalanceHistory: {
            method: 'GET',
            path: '/addresses/:address_hash/coin-balance-history',
            description: 'Native coin balance history via LUKSO BlockScout — query by address hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get LYX balance history on LUKSO',
                    chainName: 'LUKSO_MAINNET',
                    address_hash: '0x7609bF8e9DE5446dBbD1C11ef7aBe00a17B4C5bB'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: { type: 'string' } },
                        next_page_params: { type: 'string', nullable: true }
                    }
                }
            },
        },
        getCoinBalanceByDay: {
            method: 'GET',
            path: '/addresses/:address_hash/coin-balance-history-by-day',
            description: 'Daily coin balance history via LUKSO BlockScout — query by address hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get daily LYX balance on LUKSO',
                    chainName: 'LUKSO_MAINNET',
                    address_hash: '0x7609bF8e9DE5446dBbD1C11ef7aBe00a17B4C5bB'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: { type: 'string' } },
                        days: { type: 'number' }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getTokenBalances: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        }
    },
    getFlatTokenBalances: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        }
    },
    getCoinBalanceHistory: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        }
    },
    getCoinBalanceByDay: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
            struct.url = struct.url.replace("--chain--", alias[payload.chainName])
            return { struct }
        }
    }
} )
