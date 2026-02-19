export const main = {
    namespace: 'yahoofinance',
    name: 'YahooFinanceSearch',
    description: 'Search for financial instruments by name or keyword via Yahoo Finance. Covers stocks, crypto, forex, ETFs, commodities, and indices across 90+ global exchanges.',
    version: '2.0.0',
    docs: ['https://github.com/gadicc/yahoo-finance2'],
    tags: ['trading', 'stocks', 'crypto', 'forex', 'search'],
    root: 'https://query2.finance.yahoo.com',
    requiredLibraries: ['yahoo-finance2'],
    routes: {
        searchSymbol: {
            method: 'GET',
            path: '/',
            description: 'Search for financial instruments by keyword. Returns matching symbols with name, exchange, and asset type (EQUITY, CRYPTOCURRENCY, ETF, FUTURE, INDEX, CURRENCY).',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'quotesCount', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['optional()', 'default(6)', 'min(1)', 'max(50)'] } }
            ],
            tests: [
                { _description: 'Search for Apple stock', query: 'Apple' },
                { _description: 'Search for Bitcoin', query: 'Bitcoin' },
                { _description: 'Search for Euro Dollar forex', query: 'EURUSD' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const YahooFinance = libraries['yahoo-finance2']
    const yahooFinance = new YahooFinance( { suppressNotices: ['yahooSurvey'] } )

    return {
        searchSymbol: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { query, quotesCount = 6 } = userParams

                const result = await yahooFinance.search( query, { quotesCount } )
                const { quotes = [] } = result

                const normalized = quotes
                    .map( ( quote ) => {
                        const { symbol, shortname, longname, exchange, quoteType, sector, industry, score, isYahooFinance } = quote

                        return {
                            symbol: symbol || null,
                            shortName: shortname || null,
                            longName: longname || null,
                            exchange: exchange || null,
                            quoteType: quoteType || null,
                            sector: sector || null,
                            industry: industry || null
                        }
                    } )

                struct['data'] = { quotes: normalized, totalResults: normalized.length }
                struct['status'] = true

                return { struct }
            }
        }
    }
}
