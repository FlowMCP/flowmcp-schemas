// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'umweltbundesamt',
    name: 'Umweltbundesamt Air Quality API',
    description: 'German Federal Environment Agency (Umweltbundesamt) air quality data including stations, pollutant measurements, and air quality index',
    version: '2.0.0',
    docs: ['https://luftqualitaet.api.bund.dev/'],
    tags: ['airquality', 'germany', 'environment', 'pollution', 'cacheTtlFrequent'],
    root: 'https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v3',
    routes: {
        getStations: {
            method: 'GET',
            path: '/stations/json',
            description: 'Get all air quality monitoring stations in Germany. Returns station name, location, type, and operating state.',
            parameters: [
                { position: { key: 'use', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("airquality")', 'optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("en")', 'optional()'] } }
            ]
        },
        getComponents: {
            method: 'GET',
            path: '/components/json',
            description: 'Get list of measured pollutant components (PM10, NO2, O3, SO2, CO, etc.) with units.',
            parameters: []
        },
        getAirQualityIndex: {
            method: 'GET',
            path: '/airquality/json',
            description: 'Get the air quality index for all stations at a specific date and time. Returns composite index and individual component values.',
            parameters: [
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } }
            ]
        },
        getMeasurements: {
            method: 'GET',
            path: '/measures/json',
            description: 'Get measurement values for a specific pollutant component at all stations for a date range. Component IDs: 1=PM10, 2=CO, 3=O3, 4=SO2, 5=NO2.',
            parameters: [
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("1")', 'optional()'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("24")', 'optional()'] } },
                { position: { key: 'component', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("5")', 'optional()'] } },
                { position: { key: 'scope', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("1")', 'optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getStations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.data ) { return { response }}

            const stations = Object.entries( raw.data )
            .map( ( [ id, values ] ) => {
            const result = {
            id,
            stationCode: values[ 1 ] || null,
            name: values[ 2 ] || null,
            city: values[ 3 ] || null,
            state: values[ 13 ] || null,
            longitude: values[ 7 ] || null,
            latitude: values[ 8 ] || null,
            stationType: values[ 15 ] || null,
            areaType: values[ 16 ] || null
            }

            return result
            } )

            response = {
            stationCount: stations.length,
            stations
            }

            return { response }
        }
    },
    getComponents: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { response }}

            const components = Object.entries( raw )
            .map( ( [ id, values ] ) => {
            const result = {
            id,
            symbol: values[ 1 ] || null,
            displayName: values[ 2 ] || null,
            unit: values[ 3 ] || null,
            description: values[ 4 ] || null
            }

            return result
            } )

            response = {
            componentCount: components.length,
            components
            }

            return { response }
        }
    }
} )
