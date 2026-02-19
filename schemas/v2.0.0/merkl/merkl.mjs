export const schema = {
    namespace: 'merkl',
    name: 'Merkl Rewards API',
    description: 'DeFi rewards distribution and opportunity discovery across 50+ chains. Query active reward campaigns with APR/TVL, user rewards, supported chains, and token metadata. Used by Uniswap, Aave, Velodrome and others.',
    docs: ['https://docs.merkl.xyz'],
    tags: ['defi', 'rewards', 'yield', 'multichain'],
    flowMCP: '1.2.0',
    root: 'https://api.merkl.xyz/v4',
    requiredServerParams: [],
    headers: {},
    routes: {
        getOpportunities: {
            requestMethod: 'GET',
            description: 'Search active reward campaigns (opportunities) with APR, TVL, daily rewards, and token details. Filter by chain, action type, status, or protocol.',
            route: '/opportunities',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'action', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(POOL,HOLD,LEND,BORROW)', options: ['optional()'] } },
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(LIVE,SOON,PAST)', options: ['optional()'] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'items', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(50)'] } }
            ],
            tests: [
                { _description: 'Get live lending opportunities on Ethereum', chainId: 1, status: 'LIVE', action: 'LEND', items: 3 },
                { _description: 'Get live pool opportunities on Arbitrum', chainId: 42161, status: 'LIVE', action: 'POOL', items: 3 }
            ],
            modifiers: []
        },
        getUserRewards: {
            requestMethod: 'GET',
            description: 'Get all reward data for a wallet address on a specific chain, including earned amounts, pending rewards, claimed totals, and merkle proofs for claiming.',
            route: '/users/:address/rewards',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(/^0x[0-9a-f]{40}$/)'] } },
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get rewards for a wallet on Ethereum', address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', chainId: 1 },
                { _description: 'Get rewards for a wallet on Arbitrum', address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', chainId: 42161 }
            ],
            modifiers: []
        },
        getChains: {
            requestMethod: 'GET',
            description: 'Get all blockchain networks supported by Merkl with chain IDs, names, icons, and active campaign counts.',
            route: '/chains',
            parameters: [],
            tests: [
                { _description: 'Get all supported chains with metadata' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
