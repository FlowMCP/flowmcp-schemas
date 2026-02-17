// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'defillama',
    name: 'DeFi Llama MCP',
    description: 'Access DeFi protocol analytics from DeFi Llama — list all tracked protocols, get per-protocol TVL history, and query chain-level TVL aggregates.',
    version: '2.0.0',
    docs: ['https://docs.llama.fi'],
    tags: ['defi', 'tvl', 'protocols', 'cacheTtlFrequent'],
    root: 'https://api.llama.fi',
    routes: {
        getProtocols: {
            method: 'GET',
            path: '/protocols',
            description: 'Retrieve a list of all DeFi protocols from DeFi Llama (first 20) Returns structured JSON response data.',
            parameters: []
        },
        getProtocolTvl: {
            method: 'GET',
            path: '/protocol/:protocol',
            description: 'Get TVL data for a specific DeFi protocol via defillama — query by protocol. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'protocol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getChainTvl: {
            method: 'GET',
            path: '/v2/historicalChainTvl/:chain',
            description: 'Retrieve historical TVL data for a specific blockchain via defillama — query by chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
