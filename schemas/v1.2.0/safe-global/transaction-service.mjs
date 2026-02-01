const schema = {
    namespace: 'safe-global',
    name: 'Safe Transaction Service API',
    description: 'Safe (formerly Gnosis Safe) Transaction Service API for multisig wallet data, transactions, and balances',
    docs: [ 'https://docs.safe.global/core-api/transaction-service-overview' ],
    tags: [ 'multisig', 'wallet', 'transactions', 'safe' ],
    flowMCP: '1.2.0',
    root: 'https://safe-transaction-mainnet.safe.global/api',
    requiredServerParams: [],
    headers: {},
    routes: {
        getSafeInfo: {
            requestMethod: 'GET',
            description: 'Get current information about a Safe including owners, threshold, nonce, and modules.',
            route: '/v1/safes/:address/',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } }
            ],
            tests: [
                { _description: 'Get Ethereum Foundation Safe info', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }
            ],
            modifiers: []
        },
        getMultisigTransactions: {
            requestMethod: 'GET',
            description: 'Get all multisig transactions for a Safe address including confirmations and execution status.',
            route: '/v1/safes/:address/multisig-transactions/',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'executed', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get recent multisig transactions', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', limit: 5 }
            ],
            modifiers: []
        },
        getAllTransactions: {
            requestMethod: 'GET',
            description: 'Get all transactions (multisig, module, incoming) for a Safe address.',
            route: '/v1/safes/:address/all-transactions/',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } },
                { position: { key: 'executed', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get all transactions', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', limit: 5 }
            ],
            modifiers: []
        },
        getBalances: {
            requestMethod: 'GET',
            description: 'Get token balances (native + ERC-20) held by a Safe address with USD values.',
            route: '/v1/safes/:address/balances/usd/',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'trusted', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("true")', 'optional()' ] } },
                { position: { key: 'exclude_spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("true")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Safe balances in USD', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }
            ],
            modifiers: []
        },
        getTransfers: {
            requestMethod: 'GET',
            description: 'Get incoming and outgoing transfers (ETH, ERC-20, ERC-721) for a Safe address.',
            route: '/v1/safes/:address/transfers/',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Safe transfers', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', limit: 5 }
            ],
            modifiers: []
        },
        getDelegates: {
            requestMethod: 'GET',
            description: 'Get the list of delegates for a Safe address.',
            route: '/v2/delegates/',
            parameters: [
                { position: { key: 'safe', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Safe delegates', safe: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
