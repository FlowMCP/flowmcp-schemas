// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoCategories',
    description: 'Retrieve cryptocurrency category data from CoinGecko — list all available category IDs or get detailed market stats (market cap, volume, change) per category.',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'categories', 'marketdata', 'cacheTtlDaily'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getAvailableCoinCategoryIds: {
            method: 'GET',
            path: '/coins/categories/list',
            description: 'Fetch a short list of coin category names via CoinGecko. Returns structured JSON response data.',
            parameters: []
        },
        getCoinCategoryDetailsByIds: {
            method: 'GET',
            path: '/coins/categories',
            description: 'Fetch the full list of coin categories including detailed metrics. Required: category_ids.',
            parameters: [
                { position: { key: 'category_ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getAvailableCoinCategoryIds: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response = {
            'category_ids': response
            .map( ( c ) => c['category_id'] )
            }

            return { response }
        }
    },
    getCoinCategoryDetailsByIds: {
        postRequest: async ( { response, struct, payload } ) => {
            const { category_ids } = payload
            const itemsByCategory = category_ids
            .reduce( ( acc, id ) => {
            const item = response
            .filter( ( c ) => c['id'] === id )
            acc[ id ] = item ? item[ 0 ] : null
            return acc
            }, {} )
            response = itemsByCategory

            return { response }
        }
    }
} )
