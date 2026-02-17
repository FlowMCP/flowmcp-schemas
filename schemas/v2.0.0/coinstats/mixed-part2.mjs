// Split from coinstats/mixed.mjs
// Part 2 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// 18 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'cryptodata',
    name: 'Get Coins (Part 2)',
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
        getWalletBalance: {
            method: 'GET',
            path: '/wallet/balance',
            description: 'Get the balance data for a provided wallet address on a specific blockchain network.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'connectionId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getWalletBalances: {
            method: 'GET',
            path: '/wallet/balances?networks=all',
            description: 'Get the balance data for a provided wallet address on all CoinStats supported networks.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getExchanges: {
            method: 'GET',
            path: '/exchange/support',
            description: 'Get a list of supported exchange portfolio connections by CoinStats. via cryptodata.',
            parameters: []
        },
        getFiatCurrencies: {
            method: 'GET',
            path: '/fiats',
            description: 'Get a list of fiat currencies supported by CoinStats via cryptodata. Returns structured JSON response data.',
            parameters: []
        },
        getNewsSources: {
            method: 'GET',
            path: '/news/sources',
            description: 'Get the list of available cryptocurrency news sources via cryptodata. Returns structured JSON response data.',
            parameters: []
        },
        getNews: {
            method: 'GET',
            path: '/news',
            description: 'Get news articles with pagination via cryptodata. Supports page, limit, from filters.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getNewsByType: {
            method: 'GET',
            path: '/news/type/:type',
            description: 'Get news articles based on a type via cryptodata — query by type. Supports page, limit filters.',
            parameters: [
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum([\'handpicked\',\'trending\',\'latest\',\'bullish\',\'bearish\'])', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } }
            ]
        },
        getNewsById: {
            method: 'GET',
            path: '/news/:id',
            description: 'Get news by id via cryptodata — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getWalletBalance: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getWalletBalances: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getExchanges: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getFiatCurrencies: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsSources: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNews: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsByType: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsById: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    }
} )
