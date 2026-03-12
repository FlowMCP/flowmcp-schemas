export const main = {
    namespace: 'ubaluftqualitaet',
    name: 'UBA Luftqualitaet',
    description: 'Access real-time and historical air quality data from the German Federal Environment Agency (Umweltbundesamt) — 400+ monitoring stations measuring PM10, PM2.5, NO2, O3, SO2, and CO across Germany.',
    version: '2.0.0',
    docs: ['https://luftqualitaet.api.bund.dev/', 'https://www.umweltbundesamt.de/en/data/air/air-data/stations'],
    tags: ['environment', 'air-quality', 'germany', 'government', 'health', 'cacheTtlFrequent'],
    root: 'https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v2',
    requiredServerParams: [],
    headers: {},
    routes: {
        getAirQuality: {
            method: 'GET',
            path: '/airquality/json',
            description: 'Get air quality index data for all or specific stations within a date and time range. Returns index values (very good to very poor) per station and hour.',
            parameters: [
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(24)'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(24)'] } },
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get air quality for a single day', date_from: '2025-01-15', time_from: 1, date_to: '2025-01-15', time_to: 24 },
                { _description: 'Get air quality for station 769 (Berlin)', date_from: '2025-01-15', time_from: 1, date_to: '2025-01-15', time_to: 24, station: 769 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        indices: {
                            type: 'object',
                            description: 'Index level definitions mapping index IDs to labels and colors'
                        },
                        data: {
                            type: 'object',
                            description: 'Air quality data keyed by station ID, containing hourly index values'
                        }
                    }
                }
            }
        },
        getAirQualityLimits: {
            method: 'GET',
            path: '/airquality/limits',
            description: 'Get the available date range limits for air quality data. Returns the earliest and latest dates for which air quality index data is available.',
            parameters: [],
            tests: [
                { _description: 'Get date limits for air quality data' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        min: { type: 'string', description: 'Earliest available date' },
                        max: { type: 'string', description: 'Latest available date' }
                    }
                }
            }
        },
        getMeasurements: {
            method: 'GET',
            path: '/measures/json',
            description: 'Get detailed measurement values (e.g. PM10 in ug/m3) for stations within a date/time range. Optionally filter by station, component, or scope.',
            parameters: [
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(24)'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(24)'] } },
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'component', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'scope', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all measurements for one day', date_from: '2025-01-15', time_from: 1, date_to: '2025-01-15', time_to: 24 },
                { _description: 'Get PM10 measurements for station 769', date_from: '2025-01-15', time_from: 1, date_to: '2025-01-15', time_to: 24, station: 769, component: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    description: 'Measurement data keyed by scope and station, containing hourly values with timestamps'
                }
            }
        },
        getComponents: {
            method: 'GET',
            path: '/components/json',
            description: 'List all measured air quality components (pollutants) such as PM10, PM2.5, NO2, O3, SO2, CO. Returns IDs, names, and units.',
            parameters: [
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,de)', options: ['optional()', 'default(en)'] } },
                { position: { key: 'index', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(id,code)', options: ['optional()', 'default(id)'] } }
            ],
            tests: [
                { _description: 'List all components in English' },
                { _description: 'List all components in German', lang: 'de' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    description: 'Components indexed by ID or code, each containing name, unit, and description'
                }
            }
        },
        getMetadata: {
            method: 'GET',
            path: '/meta/json',
            description: 'Get combined metadata for a specific use case including stations, components, scopes, networks, and date limits. The use parameter determines which metadata set is returned.',
            parameters: [
                { position: { key: 'use', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(airquality,measure,transgression,annualbalance,map)', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,de)', options: ['optional()', 'default(en)'] } },
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(24)'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(24)'] } }
            ],
            tests: [
                { _description: 'Get metadata for air quality index view', use: 'airquality' },
                { _description: 'Get metadata for measurement view', use: 'measure', lang: 'de' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stations: { type: 'object', description: 'Station metadata keyed by station ID' },
                        components: { type: 'object', description: 'Component metadata keyed by component ID' },
                        scopes: { type: 'object', description: 'Scope metadata (hourly, daily, annual)' },
                        networks: { type: 'object', description: 'Monitoring network metadata' },
                        limits: { type: 'object', description: 'Date range limits for the selected use case' }
                    }
                }
            }
        },
        getAnnualBalances: {
            method: 'GET',
            path: '/annualbalances/json',
            description: 'Get annual tabulation data for a specific pollutant component and year. Returns aggregated yearly statistics per station.',
            parameters: [
                { position: { key: 'component', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,de)', options: ['optional()', 'default(en)'] } }
            ],
            tests: [
                { _description: 'Get PM10 annual balances for 2023', component: 1, year: '2023' },
                { _description: 'Get NO2 annual balances for 2022', component: 3, year: '2022' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    description: 'Annual balance data keyed by station, containing yearly aggregated values and statistics'
                }
            }
        },
        getExceedances: {
            method: 'GET',
            path: '/transgressions/json',
            description: 'Get threshold exceedance data for a specific pollutant and year. Shows how often EU limit values were exceeded at each station with monthly breakdown.',
            parameters: [
                { position: { key: 'component', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,de)', options: ['optional()', 'default(en)'] } }
            ],
            tests: [
                { _description: 'Get PM10 exceedances for 2023', component: 1, year: '2023' },
                { _description: 'Get O3 exceedances for 2022', component: 5, year: '2022' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    description: 'Exceedance data per station with monthly transgression counts and threshold details'
                }
            }
        },
        getThresholds: {
            method: 'GET',
            path: '/thresholds/json',
            description: 'List all air quality thresholds and limit values used for index calculation or measurement evaluation. Includes EU and national regulatory limits.',
            parameters: [
                { position: { key: 'use', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(airquality,measure)', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,de)', options: ['optional()', 'default(en)'] } },
                { position: { key: 'component', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'scope', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get air quality index thresholds', use: 'airquality' },
                { _description: 'Get measurement thresholds for PM10', use: 'measure', component: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            component: { type: 'number', description: 'Component ID' },
                            scope: { type: 'number', description: 'Scope ID' },
                            min: { type: 'number', description: 'Lower threshold value' },
                            max: { type: 'number', description: 'Upper threshold value' },
                            index: { type: 'number', description: 'Index level (1-6)' }
                        }
                    }
                }
            }
        }
    }
}
