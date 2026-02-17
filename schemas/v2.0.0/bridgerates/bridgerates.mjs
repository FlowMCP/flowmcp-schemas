// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Namespace: "bridgeRates" -> "bridgerates"

export const main = {
    namespace: 'bridgerates',
    name: 'LiFi Bridge API',
    description: 'Fetches bridge quotes, supported chains, tools, and cross-chain transfer data from LiFi API',
    version: '2.0.0',
    docs: ['https://docs.li.fi/', 'https://li.quest/v1'],
    tags: ['bridge', 'crosschain', 'defi', 'cacheTtlRealtime'],
    root: 'https://li.quest/v1',
    routes: {
        getSupportedChains: {
            method: 'GET',
            path: '/chains',
            description: 'Get information about all currently supported chains for cross-chain transfers. via bridgeRates.',
            parameters: []
        },
        getSupportedTools: {
            method: 'GET',
            path: '/tools',
            description: 'Get information about the bridges and exchanges available through LiFi service. via bridgeRates.',
            parameters: []
        },
        getConnections: {
            method: 'GET',
            path: '/connections',
            description: 'Returns all possible connections based on chain filters. At least one filter parameter is required.',
            parameters: [
                { position: { key: 'fromChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fromToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getTransferStatus: {
            method: 'GET',
            path: '/status',
            description: 'Check the status of a cross-chain transfer by transaction hash. Required: txHash. Optional filters: fromChain, toChain, bridge.',
            parameters: [
                { position: { key: 'txHash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(66)'] } },
                { position: { key: 'fromChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'bridge', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        }
    }
}
