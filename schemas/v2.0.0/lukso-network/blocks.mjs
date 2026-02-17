// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"

export const main = {
    namespace: 'luksonetwork',
    name: 'LUKSO BlockScout Blocks',
    description: 'Retrieve block data from LUKSO BlockScout — list blocks, get block details by number or hash, view block transactions, and block withdrawals.',
    version: '2.0.0',
    docs: ['https://explorer.execution.mainnet.lukso.network/api-docs', 'https://explorer.execution.testnet.lukso.network/api-docs'],
    tags: ['lukso', 'blocks', 'explorer', 'cacheTtlFrequent'],
    root: 'https://explorer.execution.--chain--.lukso.network/api/v2',
    routes: {
        getBlocks: {
            method: 'GET',
            path: '/blocks',
            description: 'List recent blocks (optional filtering) via LUKSO BlockScout. Supports type filters.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getBlockById: {
            method: 'GET',
            path: '/blocks/:block_id',
            description: 'Get detailed info for a block via LUKSO BlockScout — query by block id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'block_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getBlockTransactions: {
            method: 'GET',
            path: '/blocks/:block_id/transactions',
            description: 'Get transactions within a block via LUKSO BlockScout — query by block id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'block_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getBlockWithdrawals: {
            method: 'GET',
            path: '/blocks/:block_id/withdrawals',
            description: 'Get withdrawals from a block via LUKSO BlockScout — query by block id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'block_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getBlocks: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            struct.url = struct.url.replace("--chain--", alias[payload.chainName]);
            return { struct }
        }
    },
    getBlockById: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            struct.url = struct.url.replace("--chain--", alias[payload.chainName]);
            return { struct }
        }
    },
    getBlockTransactions: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            struct.url = struct.url.replace("--chain--", alias[payload.chainName]);
            return { struct }
        }
    },
    getBlockWithdrawals: {
        preRequest: async ( { struct, payload } ) => {
            const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
            struct.url = struct.url.replace("--chain--", alias[payload.chainName]);
            return { struct }
        }
    }
} )
