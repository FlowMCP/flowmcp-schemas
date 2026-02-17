// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoCoins',
    description: 'Fetch coins list, markets, details, history, tickers, and token info from CoinGecko',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'prices', 'marketdata', 'cacheTtlDaily'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getCoinsList: {
            method: 'GET',
            path: '/coins/list',
            description: 'Fetch the list of all coins (id, symbol, name) via CoinGecko. Returns structured JSON response data.',
            parameters: []
        },
        getCoinsMarkets: {
            method: 'GET',
            path: '/coins/markets',
            description: 'Fetch market data for coins via CoinGecko. Supports ids filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'vs_currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getCoinById: {
            method: 'GET',
            path: '/coins/:id',
            description: 'Fetch detailed info for a specific coin via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getCoinMarketChart: {
            method: 'GET',
            path: '/coins/:id/market_chart',
            description: 'Fetch historical market chart data for a coin via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'vs_currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getCoinHistory: {
            method: 'GET',
            path: '/coins/:id/history',
            description: 'Fetch historical coin data by date via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getCoinTickers: {
            method: 'GET',
            path: '/coins/:id/tickers',
            description: 'Fetch all trading pairs (tickers) for a coin via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getCoinContractInfo: {
            method: 'GET',
            path: '/coins/:id/contract/:contract_address',
            description: 'Fetch coin information by contract address via CoinGecko — query by id and contract address.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'contract_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
