// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'wormholescan',
    name: 'Wormhole Metrics API',
    description: 'Query cross-chain bridge metrics from Wormholescan — activity stats, money flow, top assets by volume, top chain pairs, top corridors, and KPI summaries.',
    version: '2.0.0',
    docs: ['https://wormholescan.io', 'https://docs.wormholescan.io'],
    tags: ['data', 'api', 'cacheTtlFrequent'],
    root: 'https://api.wormholescan.io',
    routes: {
        getCrossChainActivity: {
            method: 'GET',
            path: '/api/v1/x-chain-activity',
            description: 'Returns cross-chain volume between source and destination chains. Required: timeSpan, by. Optional filters: apps.',
            parameters: [
                { position: { key: 'timeSpan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(7d,30d,90d,1y,all-time)', options: ['default(7d)'] } },
                { position: { key: 'by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(notional,motional)', options: ['default(notional)'] } },
                { position: { key: 'apps', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getMoneyFlow: {
            method: 'GET',
            path: '/api/v1/x-chain-activity/tops',
            description: 'Returns top money flow data by chain and volume via Wormholescan. Supports from, to, appId filters.',
            parameters: [
                { position: { key: 'timespan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1h,1d,1mo,1y)', options: ['default(1d)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'appId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sourceChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'targetChain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getTopAssetsByVolume: {
            method: 'GET',
            path: '/api/v1/top-assets-by-volume',
            description: 'Returns top assets by transfer volume via Wormholescan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'timeSpan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(7d,15d,30d)', options: ['default(7d)'] } }
            ]
        },
        getTopChainPairsByNumTransfers: {
            method: 'GET',
            path: '/api/v1/top-chain-pairs-by-num-transfers',
            description: 'Returns top chain pairs by number of transfers via Wormholescan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'timeSpan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(7d,15d,30d)', options: ['default(7d)'] } }
            ]
        },
        getTopSymbolsByVolume: {
            method: 'GET',
            path: '/api/v1/top-symbols-by-volume',
            description: 'Returns top transferred token symbols by volume via Wormholescan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'timeSpan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(7d,15d,30d)', options: ['default(7d)'] } }
            ]
        },
        getTopCorridors: {
            method: 'GET',
            path: '/api/v1/top-100-corridors',
            description: 'Returns top 100 token corridors by number of transfers via Wormholescan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'timeSpan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(2d,7d)', options: ['default(2d)'] } }
            ]
        },
        getKpiList: {
            method: 'GET',
            path: '/api/v1/scorecards',
            description: 'Returns Wormhole KPIs including volume, message count, and TVL. via Wormholescan.',
            parameters: []
        }
    }
}
