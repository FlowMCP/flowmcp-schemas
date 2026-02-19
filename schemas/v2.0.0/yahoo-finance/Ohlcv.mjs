export const main = {
    namespace: 'yahoofinance',
    name: 'YahooFinanceOhlcv',
    description: 'Fetch OHLCV candlestick data from Yahoo Finance for stocks, crypto, forex, commodities, ETFs, and indices. Daily data available back to 1970 for major instruments.',
    version: '2.0.0',
    docs: ['https://github.com/gadicc/yahoo-finance2'],
    tags: ['trading', 'ohlcv', 'stocks', 'crypto', 'forex', 'charts'],
    root: 'https://query2.finance.yahoo.com',
    requiredLibraries: ['yahoo-finance2'],
    routes: {
        getOhlcv: {
            method: 'GET',
            path: '/',
            description: 'Fetch OHLCV candlestick data for any Yahoo Finance symbol. Returns normalized arrays of openings, closings, highs, lows, volumes, and timestamps. Supports stocks (AAPL), crypto (BTC-USD), forex (EURUSD=X), commodities (GC=F), ETFs (SPY), indices (^GSPC).',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo)', options: ['optional()', 'default(1d)'] } },
                { position: { key: 'period1', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'period2', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get AAPL daily OHLCV for last 30 days', symbol: 'AAPL', interval: '1d', period1: '2026-01-19' },
                { _description: 'Get BTC-USD weekly OHLCV', symbol: 'BTC-USD', interval: '1wk', period1: '2025-01-01' },
                { _description: 'Get Gold futures daily', symbol: 'GC=F', interval: '1d', period1: '2026-01-01' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const YahooFinance = libraries['yahoo-finance2']
    const yahooFinance = new YahooFinance( { suppressNotices: ['yahooSurvey'] } )

    return {
        getOhlcv: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { symbol, interval = '1d', period1, period2 } = userParams

                const options = { period1 }
                if( period2 ) { options['period2'] = period2 }
                if( interval ) { options['interval'] = interval }

                const result = await yahooFinance.chart( symbol, options )
                const { quotes = [] } = result

                const data = quotes
                    .reduce( ( acc, quote ) => {
                        const { date, open, high, low, close, volume } = quote

                        if( open === null || close === null ) { return acc }

                        acc['openings'].push( open )
                        acc['closings'].push( close )
                        acc['highs'].push( high )
                        acc['lows'].push( low )
                        acc['volumes'].push( volume || 0 )
                        acc['timestamps'].push( date.getTime() )
                        acc['dates'].push( date.toISOString() )

                        return acc
                    }, {
                        openings: [],
                        closings: [],
                        highs: [],
                        lows: [],
                        volumes: [],
                        timestamps: [],
                        dates: []
                    } )

                data['symbol'] = symbol
                data['interval'] = interval
                data['count'] = data['openings'].length

                struct['data'] = data
                struct['status'] = true

                return { struct }
            }
        }
    }
}
