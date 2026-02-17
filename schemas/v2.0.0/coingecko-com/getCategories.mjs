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
            parameters: [],
            tests: [
                { _description: 'Test getCoinCategoriesList - should return a list of category names' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            category_id: { type: 'string' },
                            name: { type: 'string' }
                        }
                    }
                }
            },
        },
        getCoinCategoryDetailsByIds: {
            method: 'GET',
            path: '/coins/categories',
            description: 'Fetch the full list of coin categories including detailed metrics. Required: category_ids.',
            parameters: [
                { position: { key: 'category_ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Test getCoinCategories - should return a list of categories',
                    category_ids: ['base-meme-coins', 'meme-token']
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            market_cap: { type: 'number' },
                            market_cap_change_24h: { type: 'number' },
                            content: { type: 'string' },
                            top_3_coins_id: { type: 'array', items: { type: 'string' } },
                            top_3_coins: { type: 'array', items: { type: 'string' } },
                            volume_24h: { type: 'number' },
                            updated_at: { type: 'string' }
                        }
                    }
                }
            },
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
