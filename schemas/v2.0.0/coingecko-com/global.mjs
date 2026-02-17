// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoGlobal',
    description: 'Fetch global cryptocurrency market data from CoinGecko — total market cap, 24h volume, BTC/ETH dominance, plus DeFi-specific global metrics.',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'global', 'marketdata', 'cacheTtlFrequent'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getGlobalData: {
            method: 'GET',
            path: '/global',
            description: 'Fetch overall global market data via CoinGecko. Returns structured JSON response data.',
            parameters: []
        },
        getDeFiGlobalData: {
            method: 'GET',
            path: '/global/decentralized_finance_defi',
            description: 'Fetch global DeFi market data via CoinGecko. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getGlobalData: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response['data'] || []
            return { response }
        }
    },
    getDeFiGlobalData: {
        postRequest: async ( { response, struct, payload } ) => {
            response = response['data'] || []
            return { response }
        }
    }
} )
