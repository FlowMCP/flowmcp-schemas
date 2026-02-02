export const schema = {
    namespace: "coingecko",
    name: "CoinGeckoCategories",
    description: "Retrieve cryptocurrency category data from CoinGecko — list all available category IDs or get detailed market stats (market cap, volume, change) per category.",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
        getAvailableCoinCategoryIds: {
            requestMethod: "GET",
            description: "Fetch a short list of coin category names via CoinGecko. Returns structured JSON response data.",
            route: "/coins/categories/list",
            parameters: [],
            tests: [
                { _description: "Test getCoinCategoriesList - should return a list of category names" }
            ],
            modifiers: [
                { phase: "post", handlerName: "getAvailableCoinCategoryIds" }
            ]
          },
      getCoinCategoryDetailsByIds: {
        requestMethod: "GET",
        description: "Fetch the full list of coin categories including detailed metrics. Required: category_ids.",
        route: "/coins/categories",
        parameters: [
            { position: { key: "category_ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "array()", options: [] } }
        ],
        tests: [
            { _description: "Test getCoinCategories - should return a list of categories", category_ids: ["base-meme-coins", "meme-token"] }
        ],
        modifiers: [{ phase: "post", handlerName: "getCoinCategoryDetailsByIds" }]
      },

    },
    handlers: {
        getAvailableCoinCategoryIds: async ( { struct, payload, } ) => {
            struct.data = struct['data'] = {
                'category_ids': struct['data']
                    .map( ( c ) => c['category_id'] )
            }

            return { struct, payload };
        },
        getCoinCategoryDetailsByIds: async ( { struct, payload, userParams } ) => {
            const { category_ids } = userParams
            const itemsByCategory = category_ids
                .reduce( ( acc, id ) => {
                    const item = struct['data']
                        .filter( ( c ) => c['id'] === id )
                    acc[ id ] = item ? item[ 0 ] : null
                    return acc
                }, {} ) 
            struct['data'] = itemsByCategory

            return { struct, payload };
        }
    }
  };
  