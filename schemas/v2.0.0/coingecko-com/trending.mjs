// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoTrending',
    description: 'Retrieve trending cryptocurrency data from CoinGecko — currently trending coins, trending NFT collections, and trending market categories with price and volume.',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'trending', 'discovery', 'cacheTtlFrequent'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getTrendingCoins: {
            method: 'GET',
            path: '/search/trending',
            description: 'Fetch the top trending cryptocurrency coins from CoinGecko based on recent search activity and market interest.',
            parameters: [],
            tests: [
                { _description: 'Test getTrendingCoins - should return a list of trending coins' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        coins: { type: 'array', items: { type: 'object', properties: { item: { type: 'object' } } } },
                        nfts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, thumb: { type: 'string' }, nft_contract_id: { type: 'number' }, native_currency_symbol: { type: 'string' }, floor_price_in_native_currency: { type: 'number' }, floor_price_24h_percentage_change: { type: 'number' }, data: { type: 'object' } } } },
                        categories: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, market_cap_1h_change: { type: 'number' }, slug: { type: 'string' }, coins_count: { type: 'string' }, data: { type: 'object' } } } }
                    }
                }
            },
        },
        getTrendingNfts: {
            method: 'GET',
            path: '/search/trending',
            description: 'Fetch the top trending NFT collections from CoinGecko based on recent search activity and market interest.',
            parameters: [],
            tests: [
                { _description: 'Test getTrendingNfts - should return a list of trending NFTs' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        coins: { type: 'array', items: { type: 'object', properties: { item: { type: 'object' } } } },
                        nfts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, thumb: { type: 'string' }, nft_contract_id: { type: 'number' }, native_currency_symbol: { type: 'string' }, floor_price_in_native_currency: { type: 'number' }, floor_price_24h_percentage_change: { type: 'number' }, data: { type: 'object' } } } },
                        categories: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, market_cap_1h_change: { type: 'number' }, slug: { type: 'string' }, coins_count: { type: 'string' }, data: { type: 'object' } } } }
                    }
                }
            },
        },
        getTrendingCategories: {
            method: 'GET',
            path: '/search/trending',
            description: 'Fetch trending categories from CoinGecko. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Test getTrendingCategories - should return a list of trending categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        coins: { type: 'array', items: { type: 'object', properties: { item: { type: 'object' } } } },
                        nfts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, thumb: { type: 'string' }, nft_contract_id: { type: 'number' }, native_currency_symbol: { type: 'string' }, floor_price_in_native_currency: { type: 'number' }, floor_price_24h_percentage_change: { type: 'number' }, data: { type: 'object' } } } },
                        categories: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, market_cap_1h_change: { type: 'number' }, slug: { type: 'string' }, coins_count: { type: 'string' }, data: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getTrendingCoins: {
        postRequest: async ( { response, struct, payload } ) => {
            const items = response['coins']
            .map( ( item ) => {
            item = item['item']
            delete item['small']
            delete item['large']
            item['data']['price_change_percentage_24h'] = item['data']['price_change_percentage_24h']['usd']
            Object
            .entries( item['data'] )
            .forEach( ( [ key, value ] ) => {
            item[ `_data.${key}` ] = value
            delete item['data'][ key ]
            } )
            delete item['data']
            return item
            } )

            response = {
            'total': items.length,
            'items': items
            }

            return { response }
        }
    },
    getTrendingNfts: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response['nfts']
            .map( ( item ) => {
            Object
            .entries( item['data'] )
            .forEach( ( [ key, value ] ) => {
            item[ `_data.${key}` ] = value
            delete item['data'][ key ]
            } )
            delete item['data']
            return item
            } )

            return { response }
        }
    },
    getTrendingCategories: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response['categories']
            .map( ( item ) => {
            item['data']['market_cap_change_percentage_24h'] = item['data']['market_cap_change_percentage_24h']['usd']
            Object
            .entries( item['data'] )
            .forEach( ( [ key, value ] ) => {
            item[ `_data.${key}` ] = value
            delete item['data'][ key ]
            } )
            delete item['data']
            return item
            } )

            return { response }
        }
    }
} )
