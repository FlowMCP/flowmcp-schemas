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
            parameters: []
        },
        getPoolTvl: {
            method: 'GET',
            path: '/chart/{{pool}}',
            description: 'Get detailed information about a specific liquidity pool by its ID. Required: pool.',
            parameters: [
                { position: { key: 'pool', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
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
