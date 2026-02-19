// Schema for #182 — Cosmos Bank LCD REST API
// No API key required — public LCD endpoints via cosmos.directory

export const main = {
    namespace: 'cosmos',
    name: 'Cosmos Hub Bank & Staking',
    description: 'Query Cosmos Hub account balances, token supply, staking validators, delegations and governance proposals via public LCD REST API. No API key required.',
    version: '2.0.0',
    docs: ['https://cosmos.network/rpc/', 'https://rest.cosmos.directory/cosmoshub'],
    tags: ['cosmos', 'staking', 'governance', 'cacheTtlFrequent'],
    root: 'https://rest.cosmos.directory/cosmoshub',
    routes: {
        getBalances: {
            method: 'GET',
            path: '/cosmos/bank/v1beta1/balances/:address',
            description: 'Get all token balances for a Cosmos Hub address. Returns denom and amount for each token held.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(44)', 'regex(^cosmos1[a-z0-9]+$)'] } },
                { position: { key: 'pagination.limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { balances: { type: 'array', items: { type: 'object', properties: { denom: { type: 'string' }, amount: { type: 'string' } } } }, pagination: { type: 'object', properties: { next_key: { type: 'string', nullable: true }, total: { type: 'string' } } } } } },
            tests: [
                { _description: 'Get balances for Cosmos whale', address: 'cosmos1fl48vsnmsdzcv85q5d2q4z5ajdha8yu34mf0eh' }
            ],
        },
        getSupply: {
            method: 'GET',
            path: '/cosmos/bank/v1beta1/supply',
            description: 'Get the total supply of all tokens on Cosmos Hub. Paginated — use pagination.limit to control results.',
            parameters: [
                { position: { key: 'pagination.limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { supply: { type: 'array', items: { type: 'object', properties: { denom: { type: 'string' }, amount: { type: 'string' } } } }, pagination: { type: 'object', properties: { next_key: { type: 'string', nullable: true }, total: { type: 'string' } } } } } },
            tests: [
                { _description: 'Get top 5 supply denoms', 'pagination.limit': 5 }
            ],
        },
        getValidators: {
            method: 'GET',
            path: '/cosmos/staking/v1beta1/validators',
            description: 'List staking validators on Cosmos Hub. Filter by bonding status. Returns moniker, commission, tokens and delegator shares.',
            parameters: [
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BOND_STATUS_BONDED,BOND_STATUS_UNBONDED,BOND_STATUS_UNBONDING)', options: ['optional()', 'default(BOND_STATUS_BONDED)'] } },
                { position: { key: 'pagination.limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { validators: { type: 'array', items: { type: 'object', properties: { operator_address: { type: 'string' }, consensus_pubkey: { type: 'object' }, jailed: { type: 'boolean' }, status: { type: 'string' }, tokens: { type: 'string' }, delegator_shares: { type: 'string' }, description: { type: 'object', properties: { moniker: { type: 'string' }, identity: { type: 'string' }, website: { type: 'string' }, details: { type: 'string' } } }, commission: { type: 'object', properties: { commission_rates: { type: 'object', properties: { rate: { type: 'string' }, max_rate: { type: 'string' }, max_change_rate: { type: 'string' } } } } } } } }, pagination: { type: 'object' } } } },
            tests: [
                { _description: 'Top 5 bonded validators', status: 'BOND_STATUS_BONDED', 'pagination.limit': 5 }
            ],
        },
        getDelegations: {
            method: 'GET',
            path: '/cosmos/staking/v1beta1/delegations/:delegatorAddr',
            description: 'Get all staking delegations for a Cosmos Hub address. Returns validator address and delegation amount.',
            parameters: [
                { position: { key: 'delegatorAddr', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(44)', 'regex(^cosmos1[a-z0-9]+$)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { delegation_responses: { type: 'array', items: { type: 'object', properties: { delegation: { type: 'object', properties: { delegator_address: { type: 'string' }, validator_address: { type: 'string' }, shares: { type: 'string' } } }, balance: { type: 'object', properties: { denom: { type: 'string' }, amount: { type: 'string' } } } } } }, pagination: { type: 'object' } } } },
            tests: [
                { _description: 'Delegations for Cosmos address', delegatorAddr: 'cosmos1fl48vsnmsdzcv85q5d2q4z5ajdha8yu34mf0eh' }
            ],
        },
        getProposals: {
            method: 'GET',
            path: '/cosmos/gov/v1/proposals',
            description: 'List governance proposals on Cosmos Hub. Returns title, status, voting period and tally results.',
            parameters: [
                { position: { key: 'pagination.limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'pagination.reverse', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(true)'] } },
                { position: { key: 'proposal_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(PROPOSAL_STATUS_VOTING_PERIOD,PROPOSAL_STATUS_PASSED,PROPOSAL_STATUS_REJECTED,PROPOSAL_STATUS_DEPOSIT_PERIOD)', options: ['optional()'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { proposals: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, summary: { type: 'string' }, status: { type: 'string' }, submit_time: { type: 'string' }, deposit_end_time: { type: 'string' }, voting_start_time: { type: 'string' }, voting_end_time: { type: 'string' }, final_tally_result: { type: 'object', properties: { yes_count: { type: 'string' }, abstain_count: { type: 'string' }, no_count: { type: 'string' }, no_with_veto_count: { type: 'string' } } } } } }, pagination: { type: 'object' } } } },
            tests: [
                { _description: 'Latest 5 proposals', 'pagination.limit': 5, 'pagination.reverse': 'true' },
                { _description: 'Passed proposals', proposal_status: 'PROPOSAL_STATUS_PASSED', 'pagination.limit': 3 }
            ],
        },
        getCommunityPool: {
            method: 'GET',
            path: '/cosmos/distribution/v1beta1/community_pool',
            description: 'Get the Cosmos Hub community pool balances. Shows all token denominations and amounts available for governance spending.',
            parameters: [],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { pool: { type: 'array', items: { type: 'object', properties: { denom: { type: 'string' }, amount: { type: 'string' } } } } } } },
            tests: [
                { _description: 'Get community pool balances' }
            ],
        }
    }
}
