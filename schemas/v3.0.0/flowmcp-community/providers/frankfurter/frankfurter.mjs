export const main = {
    namespace: 'frankfurter',
    name: 'Frankfurter Exchange Rates',
    description: 'Access foreign exchange rates published by the European Central Bank via the Frankfurter API. Get latest and historical rates for 30+ currencies. Query time series data between any two dates. Data updated daily around 16:00 CET. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://frankfurter.dev/docs'],
    tags: ['finance', 'currency', 'exchange', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.frankfurter.dev',
    requiredServerParams: [],
    headers: {},
    tools: {
        getLatest: {
            method: 'GET',
            path: '/v1/latest',
            description: 'Get the latest exchange rates. Optionally specify base currency and target currencies. Default base is EUR.',
            parameters: [
                { position: { key: 'base', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(EUR)'] } },
                { position: { key: 'symbols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Latest USD rates', base: 'USD' },
                { _description: 'EUR to GBP and JPY', base: 'EUR', symbols: 'GBP,JPY' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { amount: { type: 'number' }, base: { type: 'string' }, date: { type: 'string' }, rates: { type: 'object' } } }
            }
        },
        getHistorical: {
            method: 'GET',
            path: '/v1/:date',
            description: 'Get exchange rates for a specific historical date (YYYY-MM-DD). Data available from 1999-01-04 onwards. Optionally filter by base and target currencies.',
            parameters: [
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'base', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(EUR)'] } },
                { position: { key: 'symbols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Rates on 2024-01-02', date: '2024-01-02', base: 'USD' },
                { _description: 'EUR to GBP on 2023-06-15', date: '2023-06-15', symbols: 'GBP' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { amount: { type: 'number' }, base: { type: 'string' }, date: { type: 'string' }, rates: { type: 'object' } } }
            }
        },
        getTimeSeries: {
            method: 'GET',
            path: '/v1/:startDate..:endDate',
            description: 'Get exchange rate time series between two dates (YYYY-MM-DD..YYYY-MM-DD). Returns daily rates for the date range. Optionally filter by base and target currencies.',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'base', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(EUR)'] } },
                { position: { key: 'symbols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'USD to EUR Jan 2024', startDate: '2024-01-01', endDate: '2024-01-05', base: 'USD', symbols: 'EUR' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { amount: { type: 'number' }, base: { type: 'string' }, start_date: { type: 'string' }, end_date: { type: 'string' }, rates: { type: 'object' } } }
            }
        },
        listCurrencies: {
            method: 'GET',
            path: '/v1/currencies',
            description: 'List all available currencies with their full names. Returns currency codes (EUR, USD, GBP, etc.) mapped to currency names.',
            parameters: [],
            tests: [
                { _description: 'List all currencies' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object' }
            }
        }
    }
}
