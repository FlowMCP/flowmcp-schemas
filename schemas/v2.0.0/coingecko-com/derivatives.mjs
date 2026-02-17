// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGeckoDerivatives',
    description: 'Retrieve cryptocurrency derivatives data from CoinGecko — list derivative exchanges, get exchange details by ID, and fetch derivative products per exchange.',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/introduction'],
    tags: ['crypto', 'derivatives', 'trading', 'cacheTtlDaily'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getDerivativeExchangeIds: {
            method: 'GET',
            path: '/derivatives/exchanges',
            description: 'Fetch the list of derivative exchanges via CoinGecko. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Test getDerivativesExchanges - should return a list of derivative exchanges' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            id: { type: 'string' },
                            open_interest_btc: { type: 'number' },
                            trade_volume_24h_btc: { type: 'string' },
                            number_of_perpetual_pairs: { type: 'number' },
                            number_of_futures_pairs: { type: 'number' },
                            image: { type: 'string' },
                            year_established: { type: 'number' },
                            country: { type: 'string' },
                            description: { type: 'string' },
                            url: { type: 'string' }
                        }
                    }
                }
            },
        },
        getDerivativeExchangesByIds: {
            method: 'GET',
            path: '/derivatives/exchanges/',
            description: 'Fetch the list of derivative exchanges by IDs via CoinGecko. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'exchange_ids', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'array()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Test getExchangesByIds - should return a list of derivative exchanges by IDs',
                    exchange_ids: ['binance_futures', 'okex_futures']
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            id: { type: 'string' },
                            open_interest_btc: { type: 'number' },
                            trade_volume_24h_btc: { type: 'string' },
                            number_of_perpetual_pairs: { type: 'number' },
                            number_of_futures_pairs: { type: 'number' },
                            image: { type: 'string' },
                            year_established: { type: 'number' },
                            country: { type: 'string' },
                            description: { type: 'string' },
                            url: { type: 'string' }
                        }
                    }
                }
            },
        },
        getDerivativeProductsByExchangeId: {
            method: 'GET',
            path: '/derivatives/',
            description: 'Fetch the list of derivative products by exchange ID via CoinGecko. Supports minimal_output filters.',
            parameters: [
                { position: { key: 'exchange_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'minimal_output', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ],
            tests: [
                {
                    _description: 'Test getDerivativesByExchangeId - should return a list of derivative products by exchange ID',
                    exchange_id: 'binance_futures'
                },
                {
                    _description: 'Test getDerivativesByExchangeId - should return a list of derivative products by exchange ID',
                    exchange_id: 'binance_futures',
                    minimal_output: 'false'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            market: { type: 'string' },
                            symbol: { type: 'string' },
                            index_id: { type: 'string' },
                            price: { type: 'string' },
                            price_percentage_change_24h: { type: 'number' },
                            contract_type: { type: 'string' },
                            index: { type: 'number' },
                            basis: { type: 'number' },
                            spread: { type: 'number' },
                            funding_rate: { type: 'number' },
                            open_interest: { type: 'number' },
                            volume_24h: { type: 'number' },
                            last_traded_at: { type: 'number' },
                            expired_at: { type: 'string', nullable: true }
                        }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getDerivativeExchangeIds: {
        postRequest: async ( { response, struct, payload } ) => {
            response = {
            'exchange_ids': response
            .map( ( c ) => c['id'] )
            }
            return { response }
        }
    },
    getDerivativeExchangesByIds: {
        postRequest: async ( { response, struct, payload } ) => {
            const { exchange_ids } = payload
            response = exchange_ids
            .reduce( ( acc, id ) => {
            const item = response
            .filter( ( c ) => c['id'] === id )
            acc[ id ] = item ? item[ 0 ] : null
            return acc
            }, {} )

            return { response }
        }
    }
} )
