// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "duneAnalytics" -> "duneanalytics"

export const main = {
    namespace: 'duneanalytics',
    name: 'DexAndContracts',
    description: 'Provides insights into DEX trading pairs, trending contracts, and market share across chains via Dune Analytics.',
    version: '2.0.0',
    docs: ['https://docs.dune.com/api-reference/overview/introduction'],
    tags: ['analytics', 'contracts', 'trending', 'cacheTtlFrequent'],
    root: 'https://api.dune.com/api/v1',
    requiredServerParams: ['DUNE_API_KEY'],
    headers: {
        'X-Dune-Api-Key': '{{DUNE_API_KEY}}'
    },
    routes: {
        getDexPairStats: {
            method: 'GET',
            path: '/dex/pairs/:chain',
            description: 'Get DEX pair statistics for a given blockchain via Dune Analytics — query by chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get DEX pairs for optimism', chain: 'optimism', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { rows: { type: 'array', items: { type: 'object' } }, metadata: { type: 'object' } } }
                    }
                }
            },
        },
        getTrendingContracts: {
            method: 'GET',
            path: '/trends/evm/contracts/:chain',
            description: 'Get trending contracts deployed on EVM chains based on the last 30 days. Required: chain, limit. Optional filters: sort_by, filters, columns.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get trending contracts on base', chain: 'base', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { rows: { type: 'array', items: { type: 'object' } }, metadata: { type: 'object' } } }
                    }
                }
            },
        },
        getMarketShare: {
            method: 'GET',
            path: '/marketshare/:market/:chain',
            description: 'Get DEX or NFT market share on a specific chain via Dune Analytics — query by market and chain.',
            parameters: [
                { position: { key: 'market', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(dex,nft)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get DEX market share for polygon', market: 'dex', chain: 'polygon', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { rows: { type: 'array', items: { type: 'object' } }, metadata: { type: 'object' } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getDexPairStats: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.pairs = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    },
    getTrendingContracts: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.contracts = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    },
    getMarketShare: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.market = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    }
} )
