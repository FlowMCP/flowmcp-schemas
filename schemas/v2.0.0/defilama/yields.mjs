// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'defillama',
    name: 'DeFi Llama Liquidity Pools',
    description: 'Access DeFi Llama liquidity pool analytics — query current pool yields (APY, TVL, rewards) and historical TVL chart data for individual pools.',
    version: '2.0.0',
    docs: ['https://docs.llama.fi'],
    tags: ['defi', 'yields', 'farming', 'cacheTtlFrequent'],
    root: 'https://yields.llama.fi',
    routes: {
        getPools: {
            method: 'GET',
            path: '/pools',
            description: 'Retrieve a list of all liquidity pools from DeFi Llama (first 30) via defillama.',
            parameters: [],
            tests: [
                { _description: 'Test fetching pools' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'array', items: { type: 'object', properties: { chain: { type: 'string' }, project: { type: 'string' }, symbol: { type: 'string' }, tvlUsd: { type: 'number' }, apyBase: { type: 'number' }, apyReward: { type: 'string', nullable: true }, apy: { type: 'number' }, rewardTokens: { type: 'string', nullable: true }, pool: { type: 'string' }, apyPct1D: { type: 'number' }, apyPct7D: { type: 'number' }, apyPct30D: { type: 'number' }, stablecoin: { type: 'boolean' }, ilRisk: { type: 'string' }, exposure: { type: 'string' }, predictions: { type: 'object' }, poolMeta: { type: 'string', nullable: true }, mu: { type: 'number' }, sigma: { type: 'number' }, count: { type: 'number' }, outlier: { type: 'boolean' }, underlyingTokens: { type: 'array', items: { type: 'string' } }, il7d: { type: 'string', nullable: true }, apyBase7d: { type: 'string', nullable: true }, apyMean30d: { type: 'number' }, volumeUsd1d: { type: 'number', nullable: true }, volumeUsd7d: { type: 'number', nullable: true }, apyBaseInception: { type: 'string', nullable: true } } } }
                    }
                }
            },
        },
        getPoolTvl: {
            method: 'GET',
            path: '/chart/:pool',
            description: 'Get detailed information about a specific liquidity pool by its ID. Required: pool.',
            parameters: [
                { position: { key: 'pool', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Test pool chart data', pool: '747c1d2a-c668-4682-b9f9-296708a3dd90' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'array', items: { type: 'object', properties: { timestamp: { type: 'string' }, tvlUsd: { type: 'number' }, apy: { type: 'number' }, apyBase: { type: 'number' }, apyReward: { type: 'string', nullable: true }, il7d: { type: 'string', nullable: true }, apyBase7d: { type: 'string', nullable: true } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getPoolTvl: {
        postRequest: async ( { response, struct, payload } ) => {
            if( response['status'] === 'success' ) {
            response = response['data']
            } else {
            throw new Error( `Fetch Error` )
            }

            return { response }
        }
    }
} )
