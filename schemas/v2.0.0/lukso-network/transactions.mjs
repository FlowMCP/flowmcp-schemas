// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"

export const main = {
    namespace: 'luksonetwork',
    name: 'LUKSO BlockScout Transactions',
    description: 'Fetch transaction data from LUKSO BlockScout — list transactions, get details by hash, token transfers, internal txs, logs, raw traces, and state changes.',
    version: '2.0.0',
    docs: ['https://explorer.execution.mainnet.lukso.network/api-docs', 'https://explorer.execution.testnet.lukso.network/api-docs'],
    tags: ['lukso', 'transactions', 'explorer', 'cacheTtlFrequent'],
    root: 'https://explorer.execution.--chain--.lukso.network/api/v2',
    routes: {
        getTransactions: {
            method: 'GET',
            path: '/transactions',
            description: 'List transactions (filterable) via LUKSO BlockScout. Supports type filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getTransactionByHash: {
            method: 'GET',
            path: '/transactions/:transaction_hash',
            description: 'Details of a transaction via LUKSO BlockScout — query by transaction hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        },
        getTokenTransfersByTransactionHash: {
            method: 'GET',
            path: '/transactions/:transaction_hash/token-transfers',
            description: 'Token transfers in transaction via LUKSO BlockScout — query by transaction hash.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        },
        getInternalTransactions: {
            method: 'GET',
            path: '/transactions/:transaction_hash/internal-transactions',
            description: 'Internal txs in transaction via LUKSO BlockScout — query by transaction hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        },
        getLogs: {
            method: 'GET',
            path: '/transactions/:transaction_hash/logs',
            description: 'Logs from transaction via LUKSO BlockScout — query by transaction hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        },
        getRawTrace: {
            method: 'GET',
            path: '/transactions/:transaction_hash/raw-trace',
            description: 'Raw trace of transaction via LUKSO BlockScout — query by transaction hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        },
        getStateChanges: {
            method: 'GET',
            path: '/transactions/:transaction_hash/state-changes',
            description: 'State changes in transaction via LUKSO BlockScout — query by transaction hash. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getTransactions: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getTransactionByHash: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getTokenTransfersByTransactionHash: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getInternalTransactions: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getLogs: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getRawTrace: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    },
    getStateChanges: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            const { chainName } = payload
            struct['url'] = struct['url']
            .replace( "--chain--", alias[ chainName ] )
            return { struct }
        }
    }
} )
