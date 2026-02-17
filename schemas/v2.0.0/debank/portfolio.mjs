// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'debank',
    name: 'DeBank Portfolio API',
    description: 'Track DeFi portfolio data including token balances, protocol positions and total balance across all major chains via DeBank',
    version: '2.0.0',
    docs: ['https://docs.cloud.debank.com/', 'https://debank.com/'],
    tags: ['defi', 'portfolio', 'wallet', 'crypto', 'cacheTtlFrequent'],
    root: 'https://pro-openapi.debank.com/v1',
    requiredServerParams: ['DEBANK_ACCESS_KEY'],
    headers: {
        AccessKey: '{{DEBANK_ACCESS_KEY}}'
    },
    routes: {
        getTotalBalance: {
            method: 'GET',
            path: '/user/total_balance',
            description: 'Get total USD balance of a wallet address across all supported chains. Required: id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ],
            tests: [
                { _description: 'Get Vitalik total balance', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
        },
        getUsedChains: {
            method: 'GET',
            path: '/user/used_chain_list',
            description: 'Get list of chains that a wallet address has interacted with Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ],
            tests: [
                { _description: 'Get Vitalik used chains', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
        },
        getTokenList: {
            method: 'GET',
            path: '/user/token_list',
            description: 'Get all token balances of a wallet address on a specific chain. Required: id, chain_id. Optional filters: is_all.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } },
                { position: { key: 'is_all', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get Ethereum tokens for Vitalik', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain_id: 'eth' }
            ],
        },
        getProtocolList: {
            method: 'GET',
            path: '/user/simple_protocol_list',
            description: 'Get DeFi protocol positions and balances for a wallet on a specific chain. Required: id, chain_id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get Ethereum protocol positions', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain_id: 'eth' }
            ],
        },
        getAllProtocols: {
            method: 'GET',
            path: '/user/all_simple_protocol_list',
            description: 'Get all DeFi protocol positions across all chains for a wallet Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ],
            tests: [
                { _description: 'Get all protocol positions for Vitalik', id: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
        },
        getTokenInfo: {
            method: 'GET',
            path: '/token',
            description: 'Get detailed token information including price, logo and market data. Required: chain_id, id.',
            parameters: [
                { position: { key: 'chain_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get USDC token info on Ethereum', chain_id: 'eth', id: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
            ],
        }
    }
}
