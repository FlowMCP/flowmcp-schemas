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
            parameters: [],
            tests: [
                { _description: 'Test getExchangesList - should return a list of exchanges' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' }
                        }
                    }
                }
            },
        },
        getExchangeById: {
            method: 'GET',
            path: '/exchanges/:id',
            description: 'Fetch details of a specific exchange via CoinGecko — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Test getExchangeById - should return Binance details', id: 'binance' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        year_established: { type: 'number' },
                        country: { type: 'string' },
                        description: { type: 'string' },
                        url: { type: 'string' },
                        image: { type: 'string' },
                        facebook_url: { type: 'string' },
                        reddit_url: { type: 'string' },
                        telegram_url: { type: 'string' },
                        slack_url: { type: 'string' },
                        other_url_1: { type: 'string' },
                        other_url_2: { type: 'string' },
                        twitter_handle: { type: 'string' },
                        has_trading_incentive: { type: 'boolean' },
                        centralized: { type: 'boolean' },
                        public_notice: { type: 'string' },
                        alert_notice: { type: 'string' },
                        trust_score: { type: 'number' },
                        trust_score_rank: { type: 'number' },
                        coins: { type: 'number' },
                        pairs: { type: 'number' },
                        trade_volume_24h_btc: { type: 'number' },
                        tickers: { type: 'array', items: { type: 'object', properties: { base: { type: 'string' }, target: { type: 'string' }, market: { type: 'object' }, last: { type: 'number' }, volume: { type: 'number' }, converted_last: { type: 'object' }, converted_volume: { type: 'object' }, trust_score: { type: 'string' }, bid_ask_spread_percentage: { type: 'number' }, timestamp: { type: 'string' }, last_traded_at: { type: 'string' }, last_fetch_at: { type: 'string' }, is_anomaly: { type: 'boolean' }, is_stale: { type: 'boolean' }, trade_url: { type: 'string' }, token_info_url: { type: 'string', nullable: true }, coin_id: { type: 'string' }, target_coin_id: { type: 'string' }, coin_mcap_usd: { type: 'number' } } } },
                        status_updates: { type: 'array', items: { type: 'object', properties: { description: { type: 'string' }, category: { type: 'string' }, created_at: { type: 'string' }, user: { type: 'string' }, user_title: { type: 'string' }, pin: { type: 'boolean' }, project: { type: 'object' } } } }
                    }
                }
            },
        },
        getExchangeTickers: {
            method: 'GET',
            path: '/exchanges/:id/tickers',
            description: 'Fetch trading pairs (tickers) for a specific exchange via CoinGecko — query by id.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Test getExchangeTickers - should return tickers for Binance', id: 'binance' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        tickers: { type: 'array', items: { type: 'object', properties: { base: { type: 'string' }, target: { type: 'string' }, market: { type: 'object' }, last: { type: 'number' }, volume: { type: 'number' }, converted_last: { type: 'object' }, converted_volume: { type: 'object' }, trust_score: { type: 'string' }, bid_ask_spread_percentage: { type: 'number' }, timestamp: { type: 'string' }, last_traded_at: { type: 'string' }, last_fetch_at: { type: 'string' }, is_anomaly: { type: 'boolean' }, is_stale: { type: 'boolean' }, trade_url: { type: 'string' }, token_info_url: { type: 'string', nullable: true }, coin_id: { type: 'string' }, target_coin_id: { type: 'string' }, coin_mcap_usd: { type: 'number' } } } }
                    }
                }
            },
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
