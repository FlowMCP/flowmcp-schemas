export const main = {
    namespace: 'aqicn',
    name: 'AQICN World Air Quality Index',
    description: 'Real-time air quality data from 10,000+ monitoring stations worldwide. Provides AQI values, PM2.5, PM10, O3, NO2, SO2, CO concentrations, and health recommendations.',
    version: '3.0.0',
    docs: ['https://aqicn.org/json-api/doc/'],
    tags: ['environment', 'air-quality', 'health', 'pollution', 'cacheTtlFrequent'],
    root: 'https://api.waqi.info',
    requiredServerParams: ['AQICN_API_TOKEN'],
    headers: {},
    tools: {
        getCityAqi: {
            method: 'GET',
            path: '/feed/:city/',
            description: 'Get real-time air quality index (AQI) for a city by name. Returns AQI value, dominant pollutant, individual pollutant concentrations (PM2.5, PM10, O3, NO2, SO2, CO), and weather data.',
            parameters: [
                { position: { key: 'city', value: '{{CITY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get AQI for Beijing', CITY: 'beijing' },
                { _description: 'Get AQI for London', CITY: 'london' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                aqi: { type: 'number' },
                                idx: { type: 'number' },
                                city: { type: 'object' },
                                dominentpol: { type: 'string' },
                                iaqi: { type: 'object' },
                                time: { type: 'object' },
                                forecast: { type: 'object' },
                                attributions: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        },
        getGeoAqi: {
            method: 'GET',
            path: '/feed/geo::latitude;:longitude/',
            description: 'Get real-time AQI for a geographic coordinate. Returns the nearest monitoring station data with full pollutant breakdown.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get AQI for Berlin coordinates', LATITUDE: '52.52', LONGITUDE: '13.405' },
                { _description: 'Get AQI for New York coordinates', LATITUDE: '40.71', LONGITUDE: '-74.01' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                aqi: { type: 'number' },
                                idx: { type: 'number' },
                                city: { type: 'object' },
                                iaqi: { type: 'object' },
                                time: { type: 'object' }
                            }
                        }
                    }
                }
            }
        },
        searchStations: {
            method: 'GET',
            path: '/search/',
            description: 'Search for air quality monitoring stations by keyword. Returns a list of matching stations with their current AQI and location.',
            parameters: [
                { position: { key: 'keyword', value: '{{KEYWORD}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for Munich stations', KEYWORD: 'munich' },
                { _description: 'Search for Tokyo stations', KEYWORD: 'tokyo' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    uid: { type: 'number' },
                                    aqi: { type: 'string' },
                                    station: { type: 'object' },
                                    time: { type: 'object' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getStationById: {
            method: 'GET',
            path: '/feed/@:stationId/',
            description: 'Get real-time AQI data for a specific monitoring station by its unique station ID.',
            parameters: [
                { position: { key: 'stationId', value: '{{STATION_ID}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Shanghai station data', STATION_ID: '1437' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                aqi: { type: 'number' },
                                idx: { type: 'number' },
                                city: { type: 'object' },
                                iaqi: { type: 'object' },
                                time: { type: 'object' }
                            }
                        }
                    }
                }
            }
        }
    }
}
