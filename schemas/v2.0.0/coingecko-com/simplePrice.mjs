// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoSimplePrice',
    description: 'Fetch current cryptocurrency prices via CoinGecko Simple API — get coin prices by ID or ERC20 token prices by contract address in multiple fiat currencies.',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'prices', 'conversion', 'cacheTtlRealtime'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getSimplePrice: {
            method: 'GET',
            path: '/simple/price',
            description: 'Fetch current price for one or more coins via CoinGecko. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: [] } },
                { position: { key: 'vs_currencies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getTokenPrice: {
            method: 'GET',
            path: '/simple/token_price/:id',
            description: 'Fetch token price by contract address and chain via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'contract_addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'vs_currencies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getSimplePrice: {
        postRequest: async ( { response, struct, payload } ) => {
            response = Object
            .entries( response )
            .map( ( [ id, prices ] ) => ( { id, prices } ) )return { response }
        }
    },
    getTokenPrice: {
        postRequest: async ( { response, struct, payload } ) => {
            response = Object
            .entries( response )
            .map( ( [ contract, prices ] ) => ( { contract, prices } ) )
            return { response }
        }
    }
} )
