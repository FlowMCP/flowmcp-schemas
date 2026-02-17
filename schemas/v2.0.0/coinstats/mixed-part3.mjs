// Split from coinstats/mixed.mjs
// Part 3 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// 18 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'cryptodata',
    name: 'Get Coins (Part 3)',
    description: 'Retrieve comprehensive data about all cryptocurrencies including prices, market cap, volume, price changes, supply info, trading metrics, and metadata.',
    version: '2.0.0',
    docs: ['https://your.api.documentation/coins'],
    tags: ['production', 'price', 'market', 'data', 'cacheTtlFrequent'],
    root: 'https://openapiv1.coinstats.app',
    requiredServerParams: ['COINSTATS_API_KEY'],
    headers: {
        'X-API-KEY': '{{COINSTATS_API_KEY}}',
        accept: 'application/json'
    },
    routes: {
        getMarketCap: {
            method: 'GET',
            path: '/markets',
            description: 'Get global cryptocurrency market data including total market cap, volume, and dominance metrics via cryptodata.',
            parameters: []
        },
        getCurrencies: {
            method: 'GET',
            path: '/currencies',
            description: 'Get a list of fiat currencies supported by CoinStats via cryptodata. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getMarketCap: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getCurrencies: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    }
} )
