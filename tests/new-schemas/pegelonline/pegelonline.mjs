export const main = {
    namespace: 'pegelonline',
    name: 'Pegelonline',
    description: 'Access real-time German water level data from the WSV (Federal Waterways) — 600+ gauging stations on rivers, canals, and lakes with historical measurements.',
    version: '2.0.0',
    docs: ['https://www.pegelonline.wsv.de/webservice/dokuRestapi'],
    tags: ['water', 'hydrology', 'germany', 'realtime', 'cacheTtlRealtime'],
    root: 'https://www.pegelonline.wsv.de',
    requiredServerParams: [],
    headers: {},
    routes: {
        getAllStations: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations.json',
            description: 'List all WSV gauging stations sorted by water body name. Optionally include current measurements and timeseries metadata.',
            parameters: [
                { position: { key: 'includeTimeseries', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } },
                { position: { key: 'includeCurrentMeasurement', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } },
                { position: { key: 'waters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'List first 20 stations', limit: 20 },
                { _description: 'List Rhine (RHEIN) stations with current measurements', waters: 'RHEIN', includeCurrentMeasurement: 'true', limit: 10 },
                { _description: 'List Elbe (ELBE) stations', waters: 'ELBE', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of gauging station objects',
                    items: {
                        type: 'object',
                        properties: {
                            uuid: { type: 'string', description: 'Unique station identifier (UUID)' },
                            number: { type: 'string', description: 'Official gauge number' },
                            shortname: { type: 'string', description: 'Short station name e.g. KÖLN' },
                            longname: { type: 'string', description: 'Full station name' },
                            km: { type: 'number', description: 'River kilometer position' },
                            agency: { type: 'string', description: 'Responsible WSA (Waterways and Shipping Authority)' },
                            longitude: { type: 'number', description: 'WGS84 longitude' },
                            latitude: { type: 'number', description: 'WGS84 latitude' },
                            water: {
                                type: 'object',
                                properties: {
                                    shortname: { type: 'string', description: 'Water body shortname e.g. RHEIN' },
                                    longname: { type: 'string', description: 'Water body full name' }
                                }
                            },
                            timeseries: { type: 'array', description: 'Available timeseries (only if includeTimeseries=true)' }
                        }
                    }
                }
            }
        },
        getStationById: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:uuid.json',
            description: 'Get full metadata for a specific gauging station by its UUID including location, agency, and available timeseries.',
            parameters: [
                { position: { key: 'uuid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'includeTimeseries', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } },
                { position: { key: 'includeCurrentMeasurement', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get KÖLN station on Rhine', uuid: 'a6ee8177-107b-47dd-bcfd-30960ccc6e9c' },
                { _description: 'Get BONN station with timeseries', uuid: '593647aa-9fea-43ec-a7d6-6476a76ae868', includeTimeseries: 'true' },
                { _description: 'Get MAINZ station on Rhine', uuid: 'a37a9aa3-45e9-4d90-9df6-109f3a28a5af' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        uuid: { type: 'string' },
                        number: { type: 'string' },
                        shortname: { type: 'string' },
                        longname: { type: 'string' },
                        km: { type: 'number' },
                        agency: { type: 'string' },
                        longitude: { type: 'number' },
                        latitude: { type: 'number' },
                        water: { type: 'object', properties: { shortname: { type: 'string' }, longname: { type: 'string' } } },
                        timeseries: { type: 'array', description: 'Available measurement timeseries' }
                    }
                }
            }
        },
        getCurrentMeasurement: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:uuid/W/currentmeasurement.json',
            description: 'Get the latest water level measurement (Wasserstand) for a specific station. Returns the most recent value in cm above gauge zero.',
            parameters: [
                { position: { key: 'uuid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get current water level at KÖLN (Rhine)', uuid: 'a6ee8177-107b-47dd-bcfd-30960ccc6e9c' },
                { _description: 'Get current water level at BONN (Rhine)', uuid: '593647aa-9fea-43ec-a7d6-6476a76ae868' },
                { _description: 'Get current water level at DÜSSELDORF (Rhine)', uuid: '8f7e5f92-1153-4f93-acba-ca48670c8ca9' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'string', description: 'ISO 8601 measurement timestamp' },
                        value: { type: 'number', description: 'Water level in cm above gauge zero (Pegelnull)' },
                        stateMnwMhw: { type: 'string', description: 'State relative to MNW/MHW reference levels' },
                        stateNswHsw: { type: 'string', description: 'State relative to NSw/HSw alert levels' }
                    }
                }
            }
        },
        getMeasurements: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:uuid/W/measurements.json',
            description: 'Get historical water level measurements for a station. Supports ISO 8601 absolute timestamps and relative durations (e.g. P7D for last 7 days).',
            parameters: [
                { position: { key: 'uuid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get last 7 days of water levels at KÖLN', uuid: 'a6ee8177-107b-47dd-bcfd-30960ccc6e9c', start: 'P7D' },
                { _description: 'Get last 15 days of water levels at BONN', uuid: '593647aa-9fea-43ec-a7d6-6476a76ae868', start: 'P15D' },
                { _description: 'Get water levels for specific date range at MAINZ', uuid: 'a37a9aa3-45e9-4d90-9df6-109f3a28a5af', start: '2025-01-01T00:00:00+01:00', end: '2025-01-07T00:00:00+01:00' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of timestamped measurement values',
                    items: {
                        type: 'object',
                        properties: {
                            timestamp: { type: 'string', description: 'ISO 8601 measurement timestamp' },
                            value: { type: 'number', description: 'Water level in cm above gauge zero' }
                        }
                    }
                }
            }
        },
        searchStationsByLocation: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations.json',
            description: 'Find gauging stations within a given radius around a geographic coordinate. Useful for discovering stations near a city or point of interest.',
            parameters: [
                { position: { key: 'latitude', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'longitude', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(200)'] } },
                { position: { key: 'includeCurrentMeasurement', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Find stations within 50km of Cologne (Köln)', latitude: 50.938361, longitude: 6.959974, radius: 50 },
                { _description: 'Find stations with current measurements within 30km of Frankfurt', latitude: 50.110924, longitude: 8.682127, radius: 30, includeCurrentMeasurement: 'true' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            uuid: { type: 'string' },
                            shortname: { type: 'string' },
                            longname: { type: 'string' },
                            km: { type: 'number' },
                            longitude: { type: 'number' },
                            latitude: { type: 'number' },
                            water: { type: 'object', properties: { shortname: { type: 'string' }, longname: { type: 'string' } } }
                        }
                    }
                }
            }
        },
        getAllWaters: {
            method: 'GET',
            path: '/webservices/rest-api/v2/waters.json',
            description: 'List all water bodies (rivers, canals, lakes) monitored by the WSV. Returns shortname and longname for each water body.',
            parameters: [
                { position: { key: 'includeStations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get all water bodies in the WSV network' },
                { _description: 'Get all water bodies with their associated stations', includeStations: 'true' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            shortname: { type: 'string', description: 'Water body code e.g. RHEIN, ELBE, DONAU' },
                            longname: { type: 'string', description: 'Full water body name' },
                            stations: { type: 'array', description: 'Associated stations (only if includeStations=true)' }
                        }
                    }
                }
            }
        }
    }
}
