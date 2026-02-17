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
            parameters: [],
            tests: [
                { _description: 'Get global crypto market data' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        marketCap: { type: 'number' },
                        volume: { type: 'number' },
                        btcDominance: { type: 'number' },
                        marketCapChange: { type: 'number' },
                        volumeChange: { type: 'number' },
                        btcDominanceChange: { type: 'number' }
                    }
                }
            },
        },
        getCurrencies: {
            method: 'GET',
            path: '/currencies',
            description: 'Get a list of fiat currencies supported by CoinStats via cryptodata. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'List all supported currencies' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object', properties: { USD: { type: 'number' }, AUD: { type: 'number' }, BGN: { type: 'number' }, BRL: { type: 'number' }, CAD: { type: 'number' }, CHF: { type: 'number' }, CNY: { type: 'number' }, CZK: { type: 'number' }, DKK: { type: 'number' }, EUR: { type: 'number' }, GBP: { type: 'number' }, HKD: { type: 'number' }, HRK: { type: 'number' }, HUF: { type: 'number' }, IDR: { type: 'number' }, ILS: { type: 'number' }, INR: { type: 'number' }, ISK: { type: 'number' }, JPY: { type: 'number' }, KRW: { type: 'number' }, MXN: { type: 'number' }, MYR: { type: 'number' }, NOK: { type: 'number' }, NZD: { type: 'number' }, PHP: { type: 'number' }, PLN: { type: 'number' }, RON: { type: 'number' }, RUB: { type: 'number' }, SEK: { type: 'number' }, SGD: { type: 'number' }, THB: { type: 'number' }, TRY: { type: 'number' }, ZAR: { type: 'number' }, AMD: { type: 'number' }, IRR: { type: 'number' }, NGN: { type: 'number' }, SAR: { type: 'number' }, PKR: { type: 'number' }, HTG: { type: 'number' }, TWD: { type: 'number' }, PAB: { type: 'number' }, LKR: { type: 'number' }, UAH: { type: 'number' }, PEN: { type: 'number' }, MAD: { type: 'number' }, BOB: { type: 'number' }, AOA: { type: 'number' }, MDL: { type: 'number' }, SDG: { type: 'number' }, COP: { type: 'number' }, CRC: { type: 'number' }, DOP: { type: 'number' }, BDT: { type: 'number' }, GEL: { type: 'number' }, ETB: { type: 'number' }, VND: { type: 'number' }, BHD: { type: 'number' }, AED: { type: 'number' }, ARS: { type: 'number' }, KWD: { type: 'number' }, EPG: { type: 'number' }, CFA: { type: 'number' }, CLP: { type: 'number' } } }
                    }
                }
            },
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
