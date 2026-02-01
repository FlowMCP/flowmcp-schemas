const schema = {
    namespace: 'avalanche',
    name: 'Avalanche Data API',
    description: 'Avalanche Data API (formerly Glacier) for blockchain data including transactions, balances, blocks, and chain info',
    docs: [ 'https://developers.avacloud.io/data-api/overview' ],
    tags: [ 'blockchain', 'avalanche', 'transactions', 'balances' ],
    flowMCP: '1.2.0',
    root: 'https://data-api.avax.network/v1',
    requiredServerParams: [ 'AVALANCHE_DATA_API_KEY' ],
    headers: {
        'x-glacier-api-key': '{{AVALANCHE_DATA_API_KEY}}'
    },
    routes: {
        listChains: {
            requestMethod: 'GET',
            description: 'Get a list of all supported EVM chains with their chain IDs and metadata.',
            route: '/chains',
            parameters: [],
            tests: [
                { _description: 'List all supported chains' }
            ],
            modifiers: []
        },
        getChainInfo: {
            requestMethod: 'GET',
            description: 'Get detailed information about a specific chain including name, network, and explorer URL.',
            route: '/chains/:chainId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } }
            ],
            tests: [
                { _description: 'Get Avalanche C-Chain info', chainId: '43114' }
            ],
            modifiers: []
        },
        listTransactions: {
            requestMethod: 'GET',
            description: 'List transactions for a wallet address on a specific chain. Includes native, ERC-20, ERC-721, ERC-1155, and internal transactions.',
            route: '/chains/:chainId/addresses/:address/transactions',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(10)', 'optional()' ] } },
                { position: { key: 'startBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } },
                { position: { key: 'endBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } },
                { position: { key: 'sortOrder', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'List transactions for address on C-Chain', chainId: '43114', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
            ],
            modifiers: []
        },
        getTransaction: {
            requestMethod: 'GET',
            description: 'Get complete details of a specific transaction by hash.',
            route: '/chains/:chainId/transactions/:txHash',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'txHash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(66)', 'max(66)' ] } }
            ],
            tests: [
                { _description: 'Get a specific transaction', chainId: '43114', txHash: '0x3e9303f81be00b4af28515dab7b914bf3dbff209ea10e7071fa24d4af0a112d4' }
            ],
            modifiers: []
        },
        getNativeBalance: {
            requestMethod: 'GET',
            description: 'Get the native token balance (AVAX) for a wallet address on a specific chain.',
            route: '/chains/:chainId/addresses/:address/balances:getNative',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'blockNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get native balance on C-Chain', chainId: '43114', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
            ],
            modifiers: []
        },
        listErc20Balances: {
            requestMethod: 'GET',
            description: 'Get ERC-20 token balances for a wallet address on a specific chain.',
            route: '/chains/:chainId/addresses/:address/balances:listErc20',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(10)', 'optional()' ] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get ERC-20 balances on C-Chain', chainId: '43114', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
            ],
            modifiers: []
        },
        listErc20Transfers: {
            requestMethod: 'GET',
            description: 'Get ERC-20 token transfers for a wallet address on a specific chain.',
            route: '/chains/:chainId/addresses/:address/transactions:listErc20',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(10)', 'optional()' ] } },
                { position: { key: 'startBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } },
                { position: { key: 'endBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get ERC-20 transfers on C-Chain', chainId: '43114', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
            ],
            modifiers: []
        },
        getBlock: {
            requestMethod: 'GET',
            description: 'Get details about a specific block by block number or hash.',
            route: '/chains/:chainId/blocks/:blockId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'blockId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get a specific block on C-Chain', chainId: '43114', blockId: '6479329' }
            ],
            modifiers: []
        },
        listLatestBlocks: {
            requestMethod: 'GET',
            description: 'Get the latest blocks on a specific chain sorted by timestamp descending.',
            route: '/chains/:chainId/blocks',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(10)', 'optional()' ] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get latest blocks on C-Chain', chainId: '43114' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
