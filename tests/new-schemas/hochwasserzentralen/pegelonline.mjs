export const main = {
    namespace: 'pegelonline',
    name: 'Pegelonline',
    description: 'Access real-time German water level data from the WSV (Federal Waterways and Shipping Administration) — 600+ gauging stations on rivers, canals, and coastal waters with 15-minute measurement intervals.',
    version: '2.0.0',
    docs: ['https://www.pegelonline.wsv.de/webservice/dokuRestapi'],
    tags: ['water', 'hydrology', 'germany', 'realtime', 'environment', 'cacheTtlRealtime'],
    root: 'https://www.pegelonline.wsv.de',
    requiredServerParams: [],
    headers: {},
    routes: {
        listStations: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations.json',
            description: 'List all WSV gauging stations. Filter by water body name to reduce response size. Without filter returns 700+ stations.',
            parameters: [
                { position: { key: 'waters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List all stations on the Rhine', waters: 'RHEIN' },
                { _description: 'List stations on the Elbe', waters: 'ELBE' }
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
                            shortname: { type: 'string', description: 'Short station name e.g. KOELN' },
                            longname: { type: 'string', description: 'Full station name' },
                            km: { type: 'number', description: 'River kilometer position' },
                            agency: { type: 'string', description: 'Responsible waterways authority' },
                            longitude: { type: 'number', description: 'WGS84 longitude' },
                            latitude: { type: 'number', description: 'WGS84 latitude' },
                            water: {
                                type: 'object',
                                properties: {
                                    shortname: { type: 'string', description: 'Water body short name e.g. RHEIN' },
                                    longname: { type: 'string', description: 'Water body full name' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getStation: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:station.json',
            description: 'Get detailed metadata for a specific gauging station by shortname or UUID. Includes location, agency, water body, and optionally timeseries and current measurement.',
            parameters: [
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'includeTimeseries', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } },
                { position: { key: 'includeCurrentMeasurement', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get Bonn station with timeseries', station: 'BONN', includeTimeseries: 'true', includeCurrentMeasurement: 'true' },
                { _description: 'Get Koeln station details', station: 'KOELN', includeCurrentMeasurement: 'true' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        uuid: { type: 'string', description: 'Unique station identifier' },
                        number: { type: 'string', description: 'Official gauge number' },
                        shortname: { type: 'string', description: 'Short station name' },
                        longname: { type: 'string', description: 'Full station name' },
                        km: { type: 'number', description: 'River kilometer' },
                        agency: { type: 'string', description: 'Responsible authority' },
                        longitude: { type: 'number' },
                        latitude: { type: 'number' },
                        water: { type: 'object', properties: { shortname: { type: 'string' }, longname: { type: 'string' } } },
                        timeseries: { type: 'array', description: 'Available timeseries (W=water level, Q=discharge)' }
                    }
                }
            }
        },
        getCurrentMeasurement: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:station/W/currentmeasurement.json',
            description: 'Get the latest water level measurement for a station. Returns value in cm above gauge zero with flood state classification.',
            parameters: [
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Current water level at Bonn (Rhine)', station: 'BONN' },
                { _description: 'Current water level at Dresden (Elbe)', station: 'DRESDEN' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'string', description: 'ISO 8601 measurement timestamp' },
                        value: { type: 'number', description: 'Water level in cm above gauge zero' },
                        stateMnwMhw: { type: 'string', description: 'State relative to mean low/high water (normal, low, high, very_high)' },
                        stateNswHsw: { type: 'string', description: 'State relative to navigational alert levels' }
                    }
                }
            }
        },
        getMeasurements: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:station/W/measurements.json',
            description: 'Get historical water level measurements. Use ISO 8601 durations (P1D, P7D, P30D) for relative time or absolute timestamps.',
            parameters: [
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Last 7 days of water levels at Bonn', station: 'BONN', start: 'P7D' },
                { _description: 'Last 24 hours at Koeln', station: 'KOELN', start: 'P1D' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Timestamped water level measurements at 15-minute intervals',
                    items: {
                        type: 'object',
                        properties: {
                            timestamp: { type: 'string', description: 'ISO 8601 timestamp' },
                            value: { type: 'number', description: 'Water level in cm above gauge zero' }
                        }
                    }
                }
            }
        },
        listWaters: {
            method: 'GET',
            path: '/webservices/rest-api/v2/waters.json',
            description: 'List all monitored water bodies (rivers, canals, coastal waters). Optionally include associated gauging stations.',
            parameters: [
                { position: { key: 'includeStations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'List all water bodies' }
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
                            stations: { type: 'array', description: 'Associated gauging stations (only with includeStations=true)' }
                        }
                    }
                }
            }
        },
        getDischarge: {
            method: 'GET',
            path: '/webservices/rest-api/v2/stations/:station/Q/measurements.json',
            description: 'Get discharge (Abfluss) measurements in cubic meters per second for a station. Not all stations provide discharge data.',
            parameters: [
                { position: { key: 'station', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Last 7 days of discharge at Bonn (Rhine)', station: 'BONN', start: 'P7D' },
                { _description: 'Last 24 hours of discharge at Koeln', station: 'KOELN', start: 'P1D' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            timestamp: { type: 'string', description: 'ISO 8601 timestamp' },
                            value: { type: 'number', description: 'Discharge in m3/s' }
                        }
                    }
                }
            }
        }
    }
}
