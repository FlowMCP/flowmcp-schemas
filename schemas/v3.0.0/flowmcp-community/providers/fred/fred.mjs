export const main = {
    namespace: 'fred',
    name: 'FRED',
    description: 'Access Federal Reserve Economic Data (FRED) from the St. Louis Fed. Search and retrieve economic time series, categories, and releases covering GDP, employment, inflation, and more.',
    version: '3.0.0',
    docs: ['https://fred.stlouisfed.org/docs/api/fred/'],
    tags: ['economics', 'finance', 'statistics', 'government', 'cacheTtlDaily'],
    root: 'https://api.stlouisfed.org',
    requiredServerParams: ['FRED_API_KEY'],
    headers: {},
    tools: {
        searchSeries: {
            method: 'GET',
            path: '/fred/series/search',
            description: 'Search for economic data series by keywords. Returns matching series with metadata including title, frequency, units, and seasonal adjustment.',
            parameters: [
                { position: { key: 'api_key', value: '{{SERVER_PARAM:FRED_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'file_type', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search_text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for GDP series', search_text: 'GDP' },
                { _description: 'Search for unemployment data', search_text: 'unemployment rate', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { seriess: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, frequency: { type: 'string' }, units: { type: 'string' } } } } } }
            },
        },
        getSeriesObservations: {
            method: 'GET',
            path: '/fred/series/observations',
            description: 'Get data values for an economic data series. Returns time series observations with date and value pairs.',
            parameters: [
                { position: { key: 'api_key', value: '{{SERVER_PARAM:FRED_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'file_type', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'series_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'observation_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'observation_end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100000)', 'max(100000)'] } }
            ],
            tests: [
                { _description: 'Get US GDP observations', series_id: 'GDP', observation_start: '2020-01-01', observation_end: '2024-12-31' },
                { _description: 'Get unemployment rate data', series_id: 'UNRATE', observation_start: '2023-01-01' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { observations: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, value: { type: 'string' } } } } } }
            },
        },
        getSeriesInfo: {
            method: 'GET',
            path: '/fred/series',
            description: 'Get metadata for an economic data series including title, frequency, units, seasonal adjustment, and date range.',
            parameters: [
                { position: { key: 'api_key', value: '{{SERVER_PARAM:FRED_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'file_type', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'series_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get GDP series info', series_id: 'GDP' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { seriess: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, frequency_short: { type: 'string' }, units_short: { type: 'string' } } } } } }
            },
        },
        getReleases: {
            method: 'GET',
            path: '/fred/releases',
            description: 'List all releases of economic data. A release groups related data series (e.g., Employment Situation, Consumer Price Index).',
            parameters: [
                { position: { key: 'api_key', value: '{{SERVER_PARAM:FRED_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'file_type', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'List all FRED releases', limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { releases: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, link: { type: 'string' } } } } } }
            },
        },
        getCategory: {
            method: 'GET',
            path: '/fred/category/children',
            description: 'Get child categories for a parent category. Use category_id 0 for the root. Categories organize series into a hierarchy (e.g., Money Banking & Finance > Interest Rates).',
            parameters: [
                { position: { key: 'api_key', value: '{{SERVER_PARAM:FRED_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'file_type', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'category_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get root categories', category_id: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { categories: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, parent_id: { type: 'number' } } } } } }
            },
        }
    }
}
