// Split from coinstats/mixed.mjs
// Part 1 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// 18 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'cryptodata',
    name: 'Get Coins (Part 1)',
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
        getCoins: {
            method: 'GET',
            path: '/coins',
            description: 'Get comprehensive data about all cryptocurrencies: Price, market cap, and volume. Price changes (1h, 24h, 7d). Supply information. Trading metrics. Social links and metadata.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(\'USD\')'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'blockchains', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'includeRiskScore', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'categories', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sortDir', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum([\'asc\',\'desc\'])', options: ['optional()'] } },
                { position: { key: 'marketCap-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'marketCap-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'marketCap-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'fullyDilutedValuation-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'fullyDilutedValuation-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'fullyDilutedValuation-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'volume-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'volume-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'volume-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1h-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1h-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1h-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1d-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1d-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange1d-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange7d-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange7d-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'priceChange7d-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'availableSupply-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'availableSupply-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'availableSupply-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'totalSupply-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'totalSupply-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'totalSupply-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'rank-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'rank-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'rank-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'price-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'price-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'price-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'riskScore-greaterThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'riskScore-equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'riskScore-lessThan', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ]
        },
        getCoinById: {
            method: 'GET',
            path: '/coins/:coinId',
            description: 'Get detailed information about a specific cryptocurrency based on its unique identifier.',
            parameters: [
                { position: { key: 'coinId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getCoinChartById: {
            method: 'GET',
            path: '/coins/:coinId/charts',
            description: 'Get chart data for a specific cryptocurrency based on its unique identifier, specifying different time ranges.',
            parameters: [
                { position: { key: 'coinId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum([\'all\',\'24h\',\'1w\',\'1m\',\'3m\',\'6m\',\'1y\'])', options: [] } }
            ]
        },
        getCoinAvgPrice: {
            method: 'GET',
            path: '/coins/price/avg',
            description: 'Get the historical average price for a specific cryptocurrency based on its unique identifier and a specific date.',
            parameters: [
                { position: { key: 'coinId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'timestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ]
        },
        getCoinExchangePrice: {
            method: 'GET',
            path: '/coins/price/exchange',
            description: 'Get the historical price data for a specific cryptocurrency on a particular exchange.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'timestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ]
        },
        getTickerExchanges: {
            method: 'GET',
            path: '/tickers/exchanges',
            description: 'Get a list of supported exchanges via cryptodata. Returns structured JSON response data.',
            parameters: []
        },
        getTickerMarkets: {
            method: 'GET',
            path: '/tickers/markets',
            description: 'Get a list of tickers for a specific cryptocurrency across different exchanges. Optional filters: page, limit, exchange, fromCoin, toCoin, coinId, onlyVerified.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fromCoin', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toCoin', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'coinId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'onlyVerified', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ]
        },
        getBlockchains: {
            method: 'GET',
            path: '/wallet/blockchains',
            description: 'Get a list of supported blockchains by CoinStats via cryptodata. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getCoins: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getCoinById: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getCoinChartById: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getCoinAvgPrice: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getCoinExchangePrice: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getTickerExchanges: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getTickerMarkets: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getBlockchains: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    }
} )
