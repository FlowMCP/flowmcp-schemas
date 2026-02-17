// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'llama',
    name: 'DeFiYieldsServer',
    description: 'Fetch and analyze DeFi yield farming pools from DeFi Llama — search projects by name and query pool data including APY, TVL, and protocol details.',
    version: '2.0.0',
    docs: ['https://docs.llama.fi/pro-api'],
    tags: ['defi', 'pools', 'liquidity', 'cacheTtlFrequent'],
    root: 'https://yields.llama.fi',
    routes: {
        getProjectsByName: {
            method: 'GET',
            path: '/pools',
            description: 'Fetch DeFi yield pools overview, optionally filtering by blockchain or project name',
            parameters: [],
            tests: [
                { _description: 'Fetch all pools overview' }
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
        getPools: {
            method: 'GET',
            path: '/pools',
            description: 'Fetch DeFi yield pools, optionally filtering by blockchain or project name. Optional filters: chain, project.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'project', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch all pools' },
                { _description: 'Fetch pools filtered by chain', chain: 'Ethereum' },
                { _description: 'Fetch pools filtered by project', project: 'aave-v3' },
                { _description: 'Fetch pools filtered by chain and project', chain: 'Ethereum', project: 'lido' }
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
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getProjectsByName: {
        postRequest: async ( { response, struct, payload } ) => {
            const { data } = struct
            if( data?.status !== 'success' ) {
            throw new Error( data?.error || 'Unknown error' )
            }

            const d = data?.data || []
            const projects = d
            .reduce( ( acc, { chain, project } ) => {
            if( !Object.hasOwn( acc, chain ) ) {
            acc[ project ] = []
            }
            acc[ project ].push( chain )
            return acc
            }, {} )

            response = Object
            .entries( projects )
            .sort( ( [ a ], [ b ] ) => {
            if( a < b ) return -1
            if( a > b ) return 1
            return 0
            } )
            .reduce( ( acc, [ key, value ] ) => {
            acc[ key ] = value
            return acc
            }, {} )

            return { response }
        }
    },
    getPools: {
        postRequest: async ( { response, struct, payload } ) => {
            const { data } = struct
            if( data?.status !== 'success' ) {
            throw new Error( data?.error || 'Unknown error' )
            }

            response = data?.data || []
            response = [
            [ 'chain', payload['chain'] ],
            [ 'project', payload['project'] ],
            ]
            .reduce( ( acc, [ key, user] ) => {
            if( !user ) return acc
            if( key === 'chain' ) {
            acc = acc.filter( ( { chain } ) => chain === user )
            } else if( key === 'project' ) {
            acc = acc.filter( ( { project } ) => project === user )
            }

            return acc
            }, response )

            response = {
            'totalResults': response.length,
            'results': response
            }

            return { response }
        }
    }
} )
