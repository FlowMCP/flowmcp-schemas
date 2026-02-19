export const main = {
    namespace: 'yahoofinance',
    name: 'YahooFinanceQuote',
    description: 'Get real-time quotes and market data from Yahoo Finance for stocks, crypto, forex, commodities, ETFs, and indices.',
    version: '2.0.0',
    docs: ['https://github.com/gadicc/yahoo-finance2'],
    tags: ['trading', 'stocks', 'crypto', 'forex', 'prices'],
    root: 'https://query2.finance.yahoo.com',
    requiredLibraries: ['yahoo-finance2'],
    routes: {
        getQuote: {
            method: 'GET',
            path: '/',
            description: 'Get current market quote for a single symbol. Returns price, change, volume, market cap, and asset-specific data. Supports stocks (AAPL), crypto (BTC-USD), forex (EURUSD=X), commodities (GC=F), ETFs (SPY), indices (^GSPC).',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get Apple stock quote', symbol: 'AAPL' },
                { _description: 'Get Bitcoin quote', symbol: 'BTC-USD' },
                { _description: 'Get EUR/USD forex quote', symbol: 'EURUSD=X' }
            ]
        },
        getQuoteBatch: {
            method: 'GET',
            path: '/',
            description: 'Get current market quotes for multiple symbols in a single request. Returns array of normalized quote objects.',
            parameters: [
                { position: { key: 'symbols', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get BTC and ETH quotes', symbols: 'BTC-USD,ETH-USD' },
                { _description: 'Get mixed asset quotes', symbols: 'AAPL,BTC-USD,GC=F' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const YahooFinance = libraries['yahoo-finance2']
    const yahooFinance = new YahooFinance( { suppressNotices: ['yahooSurvey'] } )

    function normalizeQuote( raw ) {
        const {
            symbol,
            shortName,
            longName,
            regularMarketPrice,
            regularMarketChange,
            regularMarketChangePercent,
            regularMarketVolume,
            marketCap,
            exchange,
            quoteType,
            currency,
            regularMarketDayHigh,
            regularMarketDayLow,
            regularMarketOpen,
            regularMarketPreviousClose,
            fiftyTwoWeekHigh,
            fiftyTwoWeekLow,
            averageDailyVolume3Month
        } = raw

        return {
            symbol: symbol || null,
            shortName: shortName || null,
            longName: longName || null,
            price: regularMarketPrice || null,
            change: regularMarketChange || null,
            changePercent: regularMarketChangePercent || null,
            volume: regularMarketVolume || null,
            marketCap: marketCap || null,
            exchange: exchange || null,
            quoteType: quoteType || null,
            currency: currency || null,
            dayHigh: regularMarketDayHigh || null,
            dayLow: regularMarketDayLow || null,
            open: regularMarketOpen || null,
            previousClose: regularMarketPreviousClose || null,
            fiftyTwoWeekHigh: fiftyTwoWeekHigh || null,
            fiftyTwoWeekLow: fiftyTwoWeekLow || null,
            avgVolume3Month: averageDailyVolume3Month || null
        }
    }

    return {
        getQuote: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { symbol } = userParams

                const result = await yahooFinance.quote( symbol )
                const normalized = normalizeQuote( result )

                struct['data'] = normalized
                struct['status'] = true

                return { struct }
            }
        },
        getQuoteBatch: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { symbols: symbolsString } = userParams

                const symbolList = symbolsString
                    .split( ',' )
                    .map( ( s ) => s.trim() )
                    .filter( ( s ) => s.length > 0 )

                const results = []
                const errors = []

                await Promise.all(
                    symbolList.map( async ( symbol ) => {
                        try {
                            const result = await yahooFinance.quote( symbol )
                            const normalized = normalizeQuote( result )
                            results.push( normalized )
                        } catch( e ) {
                            errors.push( { symbol, error: e.message || 'Unknown error' } )
                        }
                    } )
                )

                struct['data'] = { quotes: results, errors, totalRequested: symbolList.length, totalSuccess: results.length }
                struct['status'] = true

                return { struct }
            }
        }
    }
}
