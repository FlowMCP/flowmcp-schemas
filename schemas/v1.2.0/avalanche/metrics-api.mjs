const schema = {
    namespace: 'avalancheMetrics',
    name: 'Avalanche Metrics API',
    description: 'Avalanche Metrics API for on-chain analytics including staking, throughput, gas, TPS, and validator metrics',
    docs: [ 'https://metrics.avax.network' ],
    tags: [ 'blockchain', 'avalanche', 'metrics', 'staking', 'analytics' , "cacheTtlDaily"],
    flowMCP: '1.2.0',
    root: 'https://metrics.avax.network/v2',
    requiredServerParams: [],
    headers: {},
    routes: {
        listChains: {
            requestMethod: 'GET',
            description: 'Get a list of all supported EVM blockchains with their chain IDs. via avalancheMetrics.',
            route: '/chains',
            parameters: [],
            tests: [
                { _description: 'List supported chains' }
            ],
            modifiers: []
        },
        getChainInfo: {
            requestMethod: 'GET',
            description: 'Get chain information for a specific supported blockchain via avalancheMetrics — query by chainId.',
            route: '/chains/:chainId',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } }
            ],
            tests: [
                { _description: 'Get C-Chain info', chainId: '43114' }
            ],
            modifiers: []
        },
        getChainMetrics: {
            requestMethod: 'GET',
            description: 'Get metrics for an EVM chain (gasUsed, txCount, activeAddresses, tps, gasPrice, deployedContracts, cumulativeAddresses, etc.).',
            route: '/chains/:chainId/metrics/:metric',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'timeInterval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get C-Chain gas usage', chainId: '43114', metric: 'gasUsed' },
                { _description: 'Get C-Chain TPS', chainId: '43114', metric: 'tps' }
            ],
            modifiers: []
        },
        getRollingWindowMetrics: {
            requestMethod: 'GET',
            description: 'Get rolling window metrics for an EVM chain for short-term and long-term trend analysis.',
            route: '/chains/:chainId/rollingWindowMetrics/:metric',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("43114")' ] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get rolling gas usage', chainId: '43114', metric: 'gasUsed' }
            ],
            modifiers: []
        },
        getStakingMetrics: {
            requestMethod: 'GET',
            description: 'Get staking metrics for a given network/subnet including total stake weight and delegation data.',
            route: '/networks/:network/metrics/:metric',
            parameters: [
                { position: { key: 'network', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("mainnet")' ] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get mainnet staking metrics', network: 'mainnet', metric: 'totalStakeWeight' }
            ],
            modifiers: []
        },
        getValidatorMetrics: {
            requestMethod: 'GET',
            description: 'Get metrics for all L1 validators including uptime, stake weight, and delegation info.',
            route: '/validators/metrics/:metric',
            parameters: [
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get validator count metric', metric: 'validatorCount' }
            ],
            modifiers: []
        },
        getICMSummary: {
            requestMethod: 'GET',
            description: 'Get Interchain Messaging (ICM) summary metrics including message count and volume.',
            route: '/icm/summary',
            parameters: [],
            tests: [
                { _description: 'Get ICM summary' }
            ],
            modifiers: []
        },
        getICMTimeseries: {
            requestMethod: 'GET',
            description: 'Get Interchain Messaging (ICM) timeseries metrics for cross-chain message analytics.',
            route: '/icm/timeseries',
            parameters: [
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get ICM timeseries' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
