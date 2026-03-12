export const main = {
    namespace: 'aqicn',
    name: 'AQICN',
    description: 'Access real-time air quality data from 10K+ monitoring stations worldwide via the World Air Quality Index (WAQI) API. Get AQI readings, pollutant levels (PM2.5, PM10, O3, NO2, SO2, CO), and forecasts by city name or geographic coordinates.',
    version: '2.0.0',
    docs: ['https://aqicn.org/json-api/doc/'],
    tags: ['air-quality', 'environment', 'pollution', 'health', 'aqi', 'cacheTtlFrequent'],
    root: 'https://api.waqi.info',
    requiredServerParams: ['AQICN_API_TOKEN'],
    headers: {},
    routes: {
        getFeedByCity: {
            method: 'GET',
            path: '/feed/:city/',
            description: 'Get real-time air quality data for a city. Returns AQI value, dominant pollutant, individual pollutant readings (PM2.5, PM10, O3, NO2, SO2, CO), weather data, and multi-day forecast.',
            parameters: [
                { position: { key: 'city', value: '{{CITY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get AQI for Beijing', city: 'beijing' },
                { _description: 'Get AQI for London', city: 'london' },
                { _description: 'Get AQI for New York', city: 'new-york' }
            ]
        },
        getFeedByGeo: {
            method: 'GET',
            path: '/feed/geo::lat;:lng/',
            description: 'Get real-time air quality data for the nearest monitoring station to the given latitude and longitude coordinates. Returns the same data structure as the city feed.',
            parameters: [
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lng', value: '{{LONGITUDE}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get AQI near Berlin', lat: '52.52', lng: '13.405' },
                { _description: 'Get AQI near Tokyo', lat: '35.6762', lng: '139.6503' }
            ]
        },
        getFeedByStationId: {
            method: 'GET',
            path: '/feed/@:stationId/',
            description: 'Get real-time air quality data for a specific monitoring station by its numeric station ID.',
            parameters: [
                { position: { key: 'stationId', value: '{{STATION_ID}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get AQI for station 1437 (Shanghai)', stationId: 1437 }
            ]
        },
        searchStations: {
            method: 'GET',
            path: '/search/',
            description: 'Search for air quality monitoring stations by keyword. Returns a list of matching stations with their AQI values, coordinates, and URLs.',
            parameters: [
                { position: { key: 'keyword', value: '{{KEYWORD}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token', value: '{{SERVER_PARAM:AQICN_API_TOKEN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search stations in Berlin', keyword: 'berlin' },
                { _description: 'Search stations in Paris', keyword: 'paris' }
            ]
        }
    }
}
