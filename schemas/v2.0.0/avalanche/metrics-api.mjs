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
            parameters: [],
            tests: [
                { _description: 'List supported chains' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        chains: { type: 'array', items: { type: 'object', properties: { evmChainId: { type: 'number' }, subnetId: { type: 'string' }, chainName: { type: 'string' }, blockchainId: { type: 'string' }, network: { type: 'string' } } } }
                    }
                }
            },
        },
        getChainInfo: {
            method: 'GET',
            path: '/chains/:chainId',
            description: 'Get chain information for a specific supported blockchain via avalancheMetrics — query by chainId.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("43114")'] } }
            ],
            tests: [
                { _description: 'Get C-Chain info', chainId: '43114' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        evmChainId: { type: 'number' },
                        subnetId: { type: 'string' },
                        chainName: { type: 'string' },
                        blockchainId: { type: 'string' },
                        network: { type: 'string' }
                    }
                }
            },
        },
        getChainMetrics: {
            method: 'GET',
            path: '/chains/:chainId/metrics/:metric',
            description: 'Get metrics for an EVM chain (activeAddresses, activeSenders, cumulativeTxCount, cumulativeAddresses, cumulativeContracts, gasUsed, txCount, deployedContracts, etc.).',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("43114")'] } },
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'timeInterval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get C-Chain gas usage', chainId: '43114', metric: 'gasUsed' },
                { _description: 'Get C-Chain active addresses', chainId: '43114', metric: 'activeAddresses' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { value: { type: 'number' }, timestamp: { type: 'number' } } } },
                        nextPageToken: { type: 'string' }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Get rolling gas usage', chainId: '43114', metric: 'gasUsed' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { lastHour: { type: 'number' }, lastDay: { type: 'number' }, lastWeek: { type: 'number' }, lastMonth: { type: 'number' }, last90Days: { type: 'number' }, lastYear: { type: 'number' }, allTime: { type: 'number' } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Get mainnet delegator count', network: 'mainnet', metric: 'delegatorCount' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { value: { type: 'number' }, timestamp: { type: 'number' } } } },
                        nextPageToken: { type: 'string' }
                    }
                }
            },
        },
        getValidatorMetrics: {
            method: 'GET',
            path: '/validators/metrics/:metric',
            description: 'Get metrics for all L1 validators including uptime, stake weight, and delegation info.',
            parameters: [
                { position: { key: 'metric', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get total validator fees daily', metric: 'totalValidatorFeesDaily' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { timestamp: { type: 'number' }, value: { type: 'number' } } } }
                    }
                }
            },
        },
        getICMSummary: {
            method: 'GET',
            path: '/icm/summary',
            description: 'Get Interchain Messaging (ICM) summary metrics including message count and volume. Requires at least one filter.',
            parameters: [
                { position: { key: 'network', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("mainnet")'] } }
            ],
            tests: [
                { _description: 'Get ICM summary for mainnet', network: 'mainnet' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { lastHour: { type: 'number' }, lastDay: { type: 'number' }, lastWeek: { type: 'number' }, lastMonth: { type: 'number' }, last90Days: { type: 'number' }, lastYear: { type: 'number' }, allTime: { type: 'number' } } } }
                    }
                }
            },
        },
        getICMTimeseries: {
            method: 'GET',
            path: '/icm/timeseries',
            description: 'Get Interchain Messaging (ICM) timeseries metrics for cross-chain message analytics. Requires at least one filter.',
            parameters: [
                { position: { key: 'network', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("mainnet")'] } },
                { position: { key: 'startTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endTimestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get ICM timeseries for mainnet', network: 'mainnet' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { value: { type: 'number' }, timestamp: { type: 'number' } } } },
                        nextPageToken: { type: 'string' }
                    }
                }
            },
        }
    }
}
