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
            parameters: [],
            tests: [
                { _description: 'Test getGlobalData - should return global market info' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { active_cryptocurrencies: { type: 'number' }, upcoming_icos: { type: 'number' }, ongoing_icos: { type: 'number' }, ended_icos: { type: 'number' }, markets: { type: 'number' }, total_market_cap: { type: 'object', properties: { btc: { type: 'number' }, eth: { type: 'number' }, ltc: { type: 'number' }, bch: { type: 'number' }, bnb: { type: 'number' }, eos: { type: 'number' }, xrp: { type: 'number' }, xlm: { type: 'number' }, link: { type: 'number' }, dot: { type: 'number' }, yfi: { type: 'number' }, sol: { type: 'number' }, usd: { type: 'number' }, aed: { type: 'number' }, ars: { type: 'number' }, aud: { type: 'number' }, bdt: { type: 'number' }, bhd: { type: 'number' }, bmd: { type: 'number' }, brl: { type: 'number' }, cad: { type: 'number' }, chf: { type: 'number' }, clp: { type: 'number' }, cny: { type: 'number' }, czk: { type: 'number' }, dkk: { type: 'number' }, eur: { type: 'number' }, gbp: { type: 'number' }, gel: { type: 'number' }, hkd: { type: 'number' }, huf: { type: 'number' }, idr: { type: 'number' }, ils: { type: 'number' }, inr: { type: 'number' }, jpy: { type: 'number' }, krw: { type: 'number' }, kwd: { type: 'number' }, lkr: { type: 'number' }, mmk: { type: 'number' }, mxn: { type: 'number' }, myr: { type: 'number' }, ngn: { type: 'number' }, nok: { type: 'number' }, nzd: { type: 'number' }, php: { type: 'number' }, pkr: { type: 'number' }, pln: { type: 'number' }, rub: { type: 'number' }, sar: { type: 'number' }, sek: { type: 'number' }, sgd: { type: 'number' }, thb: { type: 'number' }, try: { type: 'number' }, twd: { type: 'number' }, uah: { type: 'number' }, vef: { type: 'number' }, vnd: { type: 'number' }, zar: { type: 'number' }, xdr: { type: 'number' }, xag: { type: 'number' }, xau: { type: 'number' }, bits: { type: 'number' }, sats: { type: 'number' } } }, total_volume: { type: 'object', properties: { btc: { type: 'number' }, eth: { type: 'number' }, ltc: { type: 'number' }, bch: { type: 'number' }, bnb: { type: 'number' }, eos: { type: 'number' }, xrp: { type: 'number' }, xlm: { type: 'number' }, link: { type: 'number' }, dot: { type: 'number' }, yfi: { type: 'number' }, sol: { type: 'number' }, usd: { type: 'number' }, aed: { type: 'number' }, ars: { type: 'number' }, aud: { type: 'number' }, bdt: { type: 'number' }, bhd: { type: 'number' }, bmd: { type: 'number' }, brl: { type: 'number' }, cad: { type: 'number' }, chf: { type: 'number' }, clp: { type: 'number' }, cny: { type: 'number' }, czk: { type: 'number' }, dkk: { type: 'number' }, eur: { type: 'number' }, gbp: { type: 'number' }, gel: { type: 'number' }, hkd: { type: 'number' }, huf: { type: 'number' }, idr: { type: 'number' }, ils: { type: 'number' }, inr: { type: 'number' }, jpy: { type: 'number' }, krw: { type: 'number' }, kwd: { type: 'number' }, lkr: { type: 'number' }, mmk: { type: 'number' }, mxn: { type: 'number' }, myr: { type: 'number' }, ngn: { type: 'number' }, nok: { type: 'number' }, nzd: { type: 'number' }, php: { type: 'number' }, pkr: { type: 'number' }, pln: { type: 'number' }, rub: { type: 'number' }, sar: { type: 'number' }, sek: { type: 'number' }, sgd: { type: 'number' }, thb: { type: 'number' }, try: { type: 'number' }, twd: { type: 'number' }, uah: { type: 'number' }, vef: { type: 'number' }, vnd: { type: 'number' }, zar: { type: 'number' }, xdr: { type: 'number' }, xag: { type: 'number' }, xau: { type: 'number' }, bits: { type: 'number' }, sats: { type: 'number' } } }, market_cap_percentage: { type: 'object', properties: { btc: { type: 'number' }, eth: { type: 'number' }, usdt: { type: 'number' }, xrp: { type: 'number' }, bnb: { type: 'number' }, usdc: { type: 'number' }, sol: { type: 'number' }, trx: { type: 'number' }, steth: { type: 'number' }, doge: { type: 'number' } } }, market_cap_change_percentage_24h_usd: { type: 'number' }, volume_change_percentage_24h_usd: { type: 'number' }, updated_at: { type: 'number' } } }
                    }
                }
            },
        },
        getDeFiGlobalData: {
            method: 'GET',
            path: '/global/decentralized_finance_defi',
            description: 'Fetch global DeFi market data via CoinGecko. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Test getDeFiGlobalData - should return global DeFi stats' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { defi_market_cap: { type: 'string' }, eth_market_cap: { type: 'string' }, defi_to_eth_ratio: { type: 'string' }, trading_volume_24h: { type: 'string' }, defi_dominance: { type: 'string' }, top_coin_name: { type: 'string' }, top_coin_defi_dominance: { type: 'number' } } }
                    }
                }
            },
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
