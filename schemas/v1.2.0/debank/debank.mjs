const schema = {
    namespace: 'debank',
    name: 'DeBank Open API',
    description: 'DeBank DeFi portfolio API for multichain balances, protocol positions, and token data',
    docs: [ 'https://docs.cloud.debank.com/en/readme/api-pro-reference' ],
    tags: [ 'defi', 'portfolio', 'balances', 'multichain' ],
    flowMCP: '1.2.0',
    root: 'https://pro-openapi.debank.com/v1',
    requiredServerParams: [ 'DEBANK_API_KEY' ],
    headers: {
        'AccessKey': '{{DEBANK_API_KEY}}'
    },
    routes: {
        getUserChainBalance: {
            requestMethod: 'GET',
            description: 'Get the total balance of a wallet address on a specific chain in USD.',
            route: '/user/chain_balance',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("eth")' ] } }
            ],
            tests: [
                { _description: 'Get Vitalik ETH balance', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain_id: 'eth' }
            ],
            modifiers: []
        },
        getUserTotalBalance: {
            requestMethod: 'GET',
            description: 'Get the total balance of a wallet address across all supported chains.',
            route: '/user/total_balance',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } }
            ],
            tests: [
                { _description: 'Get total balance across chains', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getUserTokenList: {
            requestMethod: 'GET',
            description: 'Get all token holdings for a wallet address on a specific chain.',
            route: '/user/token_list',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("eth")' ] } },
                { position: { key: 'is_all', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("false")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get token list on Ethereum', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain_id: 'eth' }
            ],
            modifiers: []
        },
        getUserProtocol: {
            requestMethod: 'GET',
            description: 'Get detailed portfolio positions of a user in a specific DeFi protocol on a chain.',
            route: '/user/protocol',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'protocol_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get Aave positions', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', protocol_id: 'aave3' }
            ],
            modifiers: []
        },
        getUserComplexProtocolList: {
            requestMethod: 'GET',
            description: 'Get all DeFi protocol positions for a user across all supported chains with full detail.',
            route: '/user/complex_protocol_list',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get all protocol positions', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getUserUsedChains: {
            requestMethod: 'GET',
            description: 'Get the list of chains where the wallet address has been active.',
            route: '/user/used_chain_list',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } }
            ],
            tests: [
                { _description: 'Get used chains', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
