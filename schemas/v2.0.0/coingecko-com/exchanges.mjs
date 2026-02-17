// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoExchanges',
    description: 'Fetch exchanges list, exchange details, and exchange trading pairs from CoinGecko',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'exchanges', 'marketdata', 'cacheTtlDaily'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getExchangesList: {
            method: 'GET',
            path: '/exchanges/list',
            description: 'Fetch the list of all supported exchanges via CoinGecko. Returns structured JSON response data.',
            parameters: []
        },
        getExchangeById: {
            method: 'GET',
            path: '/exchanges/:id',
            description: 'Fetch details of a specific exchange via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getExchangeTickers: {
            method: 'GET',
            path: '/exchanges/:id/tickers',
            description: 'Fetch trading pairs (tickers) for a specific exchange via CoinGecko — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getExchangeById: {
        postRequest: async ( { response, struct, payload } ) => {
            response['tickers'] = response['tickers']
            .map( ( t ) => {
            const { base, target, last, volume } = t
            const result = { base, target, last_price: last, volume }
            return result
            } )

            return { response }
        }
    },
    getExchangeTickers: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response['tickers']


            return { response }
        }
    }
} )
