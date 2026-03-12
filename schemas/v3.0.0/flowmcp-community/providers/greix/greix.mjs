export const main = {
    namespace: 'greix',
    name: 'GREIX German Real Estate Index',
    description: 'Access the German Real Estate Index (GREIX) by ECONtribute. Query residential property price data spanning 60+ years (1963-2024) across 27 major German cities. Covers single-family houses, multi-family houses, and apartments with annual and quarterly price indices, inflation adjustment, and neighborhood-level granularity. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://greix.de/'],
    tags: ['real-estate', 'germany', 'economics', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.greixx.net/api-v1',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    tools: {
        listCities: {
            method: 'GET',
            path: '/cities/',
            description: 'List all 27+ German cities in the GREIX database. Returns city IDs, names, and short codes. Major cities include Berlin, Frankfurt, Munich, Hamburg, Cologne, Dortmund, Dresden, and more.',
            parameters: [],
            tests: [
                { _description: 'List all GREIX cities' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, short_name: { type: 'string' } } } }
            }
        },
        getCity: {
            method: 'GET',
            path: '/cities/:cityId/',
            description: 'Get details for a specific city by ID. Use listCities to find city IDs. Example: Berlin=1, Frankfurt=2, Dortmund=3, Cologne=4.',
            parameters: [
                { position: { key: 'cityId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Berlin details', cityId: 1 },
                { _description: 'Get Frankfurt details', cityId: 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, short_name: { type: 'string' } } }
            }
        },
        listPropertyTypes: {
            method: 'GET',
            path: '/property-types/',
            description: 'List available property types: Single-family house (EFH, id=1), Multi-family house (MFH, id=2), Apartment (ETW, id=3). Use these IDs in metric queries.',
            parameters: [],
            tests: [
                { _description: 'List all property types' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, short_name: { type: 'string' } } } }
            }
        },
        listNeighborhoods: {
            method: 'GET',
            path: '/neighborhoods/',
            description: 'List all neighborhoods across all cities. Returns 200+ neighborhoods with UUIDs, names, and parent city data. Use neighborhood IDs for neighborhood-level metrics.',
            parameters: [],
            tests: [
                { _description: 'List all neighborhoods' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, short_name: { type: 'string' }, city: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, short_name: { type: 'string' } } } } } }
            }
        },
        getCityPricePeriod: {
            method: 'GET',
            path: '/cities/period/',
            description: 'Get price data time range for selected cities and property types. Returns the minimum and maximum years of available data. Use comma-separated IDs for multiple cities/property types.',
            parameters: [
                { position: { key: 'cities', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'prop_types', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'from_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2015)'] } },
                { position: { key: 'to_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2024)'] } },
                { position: { key: 'inflation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'data_index', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(sqm,absolute)', options: ['optional()', 'default(sqm)'] } },
                { position: { key: 'per_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Berlin + Frankfurt price period for houses', cities: '1,2', prop_types: '1', from_year: 2015, to_year: 2024, inflation: false, data_index: 'sqm', per_year: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { year_min: { type: 'number' }, year_max: { type: 'number' } } }
            }
        },
        getCityMetrics: {
            method: 'GET',
            path: '/cities/metrics/',
            description: 'Get detailed price metrics for cities over time. Returns chart data with price indices or absolute prices per sqm, optional inflation adjustment. Use comma-separated city IDs for comparison. Data covers 1963-2024.',
            parameters: [
                { position: { key: 'cities', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'prop_types', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'from_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2015)'] } },
                { position: { key: 'to_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2024)'] } },
                { position: { key: 'inflation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'data_index', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(sqm,absolute)', options: ['optional()', 'default(sqm)'] } },
                { position: { key: 'per_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Berlin + Frankfurt apartment prices 2015-2024', cities: '1,2', prop_types: '3', from_year: 2015, to_year: 2024, inflation: false, data_index: 'sqm', per_year: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { period: { type: 'object', properties: { year_min: { type: 'number' }, year_max: { type: 'number' } } }, chart_line_keys: { type: 'object' }, chart_legend: { type: 'object' }, data: { type: 'object' }, additional_data: { type: 'object' } } }
            }
        },
        getNeighborhoodMetricsMap: {
            method: 'GET',
            path: '/neighborhoods/metrics-map/',
            description: 'Get neighborhood-level price metrics for a city, suitable for map visualization. Returns time-series data for all neighborhoods in the selected city.',
            parameters: [
                { position: { key: 'city', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'prop_types', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'from_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2015)'] } },
                { position: { key: 'to_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(2024)'] } },
                { position: { key: 'inflation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'data_index', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(sqm,absolute)', options: ['optional()', 'default(sqm)'] } }
            ],
            tests: [
                { _description: 'Berlin neighborhood price map data', city: 1, prop_types: '1', from_year: 2015, to_year: 2024, inflation: false, data_index: 'sqm' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { year_min: { type: 'number' }, year_max: { type: 'number' }, chart_legend: { type: 'object' }, chart_line_keys: { type: 'array' }, data: { type: 'array' }, additional_data: { type: 'array' } } }
            }
        }
    }
}
