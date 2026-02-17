// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'pegelonline',
    name: 'Pegel-Online API',
    description: 'German federal waterway gauging stations API providing real-time water levels, measurements, and station data from the WSV',
    version: '2.0.0',
    docs: ['https://pegel-online.api.bund.dev/'],
    tags: ['water', 'germany', 'environment', 'hydrology', 'cacheTtlFrequent'],
    root: 'https://www.pegelonline.wsv.de/webservices/rest-api/v2',
    routes: {
        getStations: {
            method: 'GET',
            path: '/stations.json',
            description: 'Get all gauging stations. Optionally filter by waterway name. Returns station name, location, agency, and associated water body.',
            parameters: [
                { position: { key: 'waters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("20")', 'optional()'] } }
            ]
        },
        getStationDetail: {
            method: 'GET',
            path: '/stations/:uuid.json?includeTimeseries=true&includeCurrentMeasurement=true',
            description: 'Get detailed information for a specific station including timeseries and current measurements. Use station UUID from getStations.',
            parameters: [
                { position: { key: 'uuid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getWaters: {
            method: 'GET',
            path: '/waters.json',
            description: 'Get list of all waterways (rivers, canals, lakes) with gauging stations. via pegelonline.',
            parameters: []
        },
        getCurrentMeasurement: {
            method: 'GET',
            path: '/stations/:uuid/:timeseries/currentmeasurement.json',
            description: 'Get the current water level measurement for a specific station and timeseries. Timeseries shortname is typically W (water level) or Q (discharge).',
            parameters: [
                { position: { key: 'uuid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'timeseries', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("W")'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getStations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const stations = raw
            .map( ( station ) => {
            const result = {
            uuid: station.uuid,
            name: station.shortname || station.longname,
            km: station.km,
            agency: station.agency,
            longitude: station.longitude,
            latitude: station.latitude,
            water: station.water?.shortname || null
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
    getStationDetail: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { response }}

            const timeseries = ( raw.timeseries || [] )
            .map( ( ts ) => {
            const result = {
            shortname: ts.shortname,
            longname: ts.longname,
            unit: ts.unit,
            currentValue: ts.currentMeasurement?.value || null,
            currentTimestamp: ts.currentMeasurement?.timestamp || null,
            state: ts.currentMeasurement?.stateMnwMhw || null
            }

            return result
            } )

            response = {
            uuid: raw.uuid,
            name: raw.shortname || raw.longname,
            km: raw.km,
            agency: raw.agency,
            longitude: raw.longitude,
            latitude: raw.latitude,
            water: raw.water?.shortname || null,
            timeseries
            }

            return { response }
        }
    },
    getWaters: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            response = {
            waterCount: raw.length,
            waters: raw
            .map( ( w ) => {
            const result = { shortname: w.shortname, longname: w.longname }

            return result
            } )
            }

            return { response }
        }
    }
} )
