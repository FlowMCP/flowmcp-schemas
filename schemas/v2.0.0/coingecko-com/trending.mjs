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
            parameters: []
        },
        getTrendingNfts: {
            method: 'GET',
            path: '/search/trending',
            description: 'Fetch the top trending NFT collections from CoinGecko based on recent search activity and market interest.',
            parameters: []
        },
        getTrendingCategories: {
            method: 'GET',
            path: '/search/trending',
            description: 'Fetch trending categories from CoinGecko. Returns structured JSON response data.',
            parameters: []
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
