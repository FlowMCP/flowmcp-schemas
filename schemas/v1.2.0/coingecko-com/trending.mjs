export const schema = {
    namespace: "coingecko",
    name: "CoinGeckoTrending",
    description: "Retrieve trending coins, NFTs, and categories from CoinGecko trending search",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTrendingCoins: {
            requestMethod: "GET",
            description: "Fetch trending coins from CoinGecko",
            route: "/search/trending",
            parameters: [ ],
            tests: [
                { _description: "Test getTrendingCoins - should return a list of trending coins" }
            ],
            modifiers: [
                { phase: "post", handlerName: "extractTrendingCoins" }
            ]
        },
        getTrendingNfts: {
            requestMethod: "GET",
            description: "Fetch trending NFTs from CoinGecko",
            route: "/search/trending",
            parameters: [ 
            ],
            tests: [
               { _description: "Test getTrendingNfts - should return a list of trending NFTs" }
            ],
            modifiers: [
                { phase: "post", handlerName: "extractTrendingNfts" }
            ]
        },
        getTrendingCategories: {
            requestMethod: "GET",
            description: "Fetch trending categories from CoinGecko",
            route: "/search/trending",
            parameters: [ 
            ],
            tests: [
                { _description: "Test getTrendingCategories - should return a list of trending categories" }
            ],
            modifiers: [
               { phase: "post", handlerName: "extractTrendingCategories" }
            ]
        }
    },
    handlers: {
        extractTrendingCoins: async ( { struct, payload } ) => {
            const items = struct['data']['coins']
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

            struct['data'] = {
                'total': items.length,
                'items': items
            }

            return { struct, payload };
        },
        extractTrendingNfts: async ( { struct, payload, userParams } ) => {
            struct['data'] = struct['data']['nfts']
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

            return { struct, payload }
        },
        extractTrendingCategories: async ( { struct, payload, userParams } ) => {
            struct['data'] = struct['data']['categories']
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

            return { struct, payload }
        }
    }
}
  