export const main = {
    namespace: 'nagerdate',
    name: 'Nager.Date Public Holidays',
    description: 'Access public holiday data for 100+ countries worldwide via the Nager.Date API. Get holidays by year and country, upcoming holidays, long weekends, and available country list. Data covers official public holidays with local names and regional variants. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://date.nager.at/Api'],
    tags: ['reference', 'calendar', 'opendata', 'cacheTtlDaily'],
    root: 'https://date.nager.at',
    requiredServerParams: [],
    headers: {},
    tools: {
        getPublicHolidays: {
            method: 'GET',
            path: '/api/v3/publicholidays/:year/:countryCode',
            description: 'Get public holidays for a specific year and country. Returns date, local name, English name, type, and whether it applies globally or to specific counties/regions.',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'countryCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'US holidays 2024', year: 2024, countryCode: 'US' },
                { _description: 'German holidays 2024', year: 2024, countryCode: 'DE' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, localName: { type: 'string' }, name: { type: 'string' }, countryCode: { type: 'string' }, fixed: { type: 'boolean' }, global: { type: 'boolean' }, counties: { type: 'array' }, types: { type: 'array' } } } }
            }
        },
        getNextHolidays: {
            method: 'GET',
            path: '/api/v3/nextpublicholidays/:countryCode',
            description: 'Get upcoming public holidays for a country. Returns the next holidays from today onwards.',
            parameters: [
                { position: { key: 'countryCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Next US holidays', countryCode: 'US' },
                { _description: 'Next German holidays', countryCode: 'DE' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, localName: { type: 'string' }, name: { type: 'string' }, countryCode: { type: 'string' }, global: { type: 'boolean' }, types: { type: 'array' } } } }
            }
        },
        getLongWeekends: {
            method: 'GET',
            path: '/api/v3/longweekend/:year/:countryCode',
            description: 'Get long weekends (holiday + adjacent weekend days) for a specific year and country. Returns start date, end date, day count, and whether a bridge day is needed.',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'countryCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'German long weekends 2024', year: 2024, countryCode: 'DE' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { startDate: { type: 'string' }, endDate: { type: 'string' }, dayCount: { type: 'number' }, needBridgeDay: { type: 'boolean' } } } }
            }
        },
        listCountries: {
            method: 'GET',
            path: '/api/v3/availablecountries',
            description: 'List all available countries with their ISO 3166-1 alpha-2 country codes and names.',
            parameters: [],
            tests: [
                { _description: 'List all countries' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { countryCode: { type: 'string' }, name: { type: 'string' } } } }
            }
        }
    }
}
