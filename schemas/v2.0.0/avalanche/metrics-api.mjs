// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Namespace: "avalancheMetrics" -> "avalanchemetrics"

export const main = {
    namespace: 'avalanchemetrics',
    name: 'Avalanche Metrics API',
    description: 'Avalanche Metrics API for on-chain analytics including staking, throughput, gas, TPS, and validator metrics',
    version: '2.0.0',
    docs: ['https://metrics.avax.network'],
    tags: ['blockchain', 'avalanche', 'metrics', 'staking', 'analytics', 'cacheTtlDaily'],
    root: 'https://metrics.avax.network/v2',
    routes: {
        listChains: {
            method: 'GET',
            path: '/chains',
            description: 'Get a list of all supported EVM blockchains with their chain IDs. via avalancheMetrics.',
            parameters: []
        },
        getChainInfo: {
            method: 'GET',
            path: '/chains/:chainId',
            description: 'Get chain information for a specific supported blockchain via avalancheMetrics — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("43114")'] } }
            ]
        },
        getChainMetrics: {
            method: 'GET',
            path: '/chains/:chainId/metrics/:metric',
            description: 'Get metrics for an EVM chain (gasUsed, txCount, activeAddresses, tps, gasPrice, deployedContracts, cumulativeAddresses, etc.).',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("43114")'] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'timeInterval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getRollingWindowMetrics: {
            method: 'GET',
            path: '/chains/:chainId/rollingWindowMetrics/:metric',
            description: 'Get rolling window metrics for an EVM chain for short-term and long-term trend analysis.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("43114")'] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getStakingMetrics: {
            method: 'GET',
            path: '/networks/:network/metrics/:metric',
            description: 'Get staking metrics for a given network/subnet including total stake weight and delegation data.',
            parameters: [
                { position: { key: 'network', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("mainnet")'] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getValidatorMetrics: {
            method: 'GET',
            path: '/validators/metrics/:metric',
            description: 'Get metrics for all L1 validators including uptime, stake weight, and delegation info.',
            parameters: [
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getICMSummary: {
            method: 'GET',
            path: '/icm/summary',
            description: 'Get Interchain Messaging (ICM) summary metrics including message count and volume.',
            parameters: []
        },
        getICMTimeseries: {
            method: 'GET',
            path: '/icm/timeseries',
            description: 'Get Interchain Messaging (ICM) timeseries metrics for cross-chain message analytics.',
            parameters: [
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        }
    }
}
