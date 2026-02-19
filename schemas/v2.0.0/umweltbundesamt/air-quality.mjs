// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Note: API returns station IDs as keys — postRequest handlers join metadata for readability.
// searchStations uses executeRequest with client-side filtering on cached station data.
// executeRequest handlers receive userParams via payload.userParams (not payload directly).

export const main = {
    namespace: 'umweltbundesamt',
    name: 'Umweltbundesamt Air Quality API',
    description: 'German Federal Environment Agency (Umweltbundesamt) air quality data including stations, pollutant measurements, and air quality index',
    version: '2.0.0',
    docs: ['https://luftqualitaet.api.bund.dev/'],
    tags: ['airquality', 'germany', 'environment', 'pollution'],
    root: 'https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v3',
    routes: {
        getStations: {
            method: 'GET',
            path: '/stations/json',
            description: 'Get all air quality monitoring stations in Germany. Returns station name, location, type, and operating state.',
            parameters: [
                { position: { key: 'use', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("airquality")', 'optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("en")', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 2592000,
                description: 'All German air quality monitoring stations (~400 stations, rarely changes)'
            },
            tests: [
                { _description: 'Get all air quality stations' }
            ]
        },
        searchStations: {
            method: 'GET',
            path: '/stations/json',
            description: 'Search air quality stations by city, federal state, station type, area type, or free text. Filtering happens client-side on cached station data.',
            parameters: [
                { position: { key: 'city', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'state', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'stationType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'areaType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 2592000,
                description: 'Fetches full station list, filters client-side'
            },
            tests: [
                { _description: 'Stations in Berlin', city: 'Berlin' },
                { _description: 'Traffic stations', stationType: 'traffic' }
            ]
        },
        getComponents: {
            method: 'GET',
            path: '/components/json',
            description: 'Get list of measured pollutant components (PM10, NO2, O3, SO2, CO, etc.) with units.',
            parameters: [],
            preload: {
                enabled: true,
                ttl: 2592000,
                description: 'Pollutant component list (~12 entries, static)'
            },
            tests: [
                { _description: 'Get all pollutant components' }
            ]
        },
        getAirQualityIndex: {
            method: 'GET',
            path: '/airquality/json',
            description: 'Get the air quality index for all stations at a specific date and time. Returns composite index and individual component values per station.',
            parameters: [
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'time_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'time_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get air quality index for recent date', date_from: '2026-01-31', date_to: '2026-01-31' }
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
            ],
            tests: [
                { _description: 'Get NO2 measurements for recent date', date_from: '2026-01-31', date_to: '2026-01-31', component: '5' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const _cacheStations = { data: null, timestamp: null, ttl: 3600000 }

    const fetchStations = async () => {
        const now = Date.now()
        if( _cacheStations.data && _cacheStations.timestamp && ( now - _cacheStations.timestamp ) < _cacheStations.ttl ) {
            return { raw: _cacheStations.data, fromCache: true }
        }

        const response = await fetch( 'https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v3/stations/json?use=airquality&lang=en' )
        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()
        _cacheStations.data = data
        _cacheStations.timestamp = now

        return { raw: data, fromCache: false }
    }

    const parseStation = ( { id, values } ) => {
        const parsed = {
            id,
            stationCode: values[ 1 ] || null,
            name: values[ 2 ] || null,
            city: values[ 3 ] || null,
            state: values[ 13 ] || null,
            longitude: values[ 7 ] || null,
            latitude: values[ 8 ] || null,
            areaType: values[ 15 ] || null,
            stationType: values[ 16 ] || null
        }

        return parsed
    }

    return {
        getStations: {
            postRequest: async ( { response, struct, payload } ) => {
                const raw = struct?.data
                if( !raw?.data ) { return { response } }

                const stations = Object.entries( raw.data )
                    .map( ( [ id, values ] ) => parseStation( { id, values } ) )

                response = {
                    stationCount: stations.length,
                    stations
                }

                return { response }
            }
        },
        searchStations: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { raw, fromCache } = await fetchStations()

                    if( !raw?.data ) {
                        struct.data = raw
                        return { struct }
                    }

                    const city = ( userParams.city || '' ).toLowerCase()
                    const state = ( userParams.state || '' ).toLowerCase()
                    const stationType = ( userParams.stationType || '' ).toLowerCase()
                    const areaType = ( userParams.areaType || '' ).toLowerCase()
                    const q = ( userParams.q || '' ).toLowerCase()

                    const allStations = Object.entries( raw.data )
                        .map( ( [ id, values ] ) => parseStation( { id, values } ) )

                    const filtered = allStations
                        .filter( ( station ) => {
                            const sCity = ( station.city || '' ).toLowerCase()
                            const sState = ( station.state || '' ).toLowerCase()
                            const sType = ( station.stationType || '' ).toLowerCase()
                            const sArea = ( station.areaType || '' ).toLowerCase()

                            if( city && !sCity.includes( city ) ) { return false }
                            if( state && !sState.includes( state ) ) { return false }
                            if( stationType && !sType.includes( stationType ) ) { return false }
                            if( areaType && !sArea.includes( areaType ) ) { return false }

                            if( q ) {
                                const stationStr = JSON.stringify( station ).toLowerCase()
                                if( !stationStr.includes( q ) ) { return false }
                            }

                            return true
                        } )

                    struct.data = {
                        source: 'Umweltbundesamt Stations',
                        query: {
                            city: city || null,
                            state: state || null,
                            stationType: stationType || null,
                            areaType: areaType || null,
                            q: q || null
                        },
                        totalCount: allStations.length,
                        matchCount: filtered.length,
                        fromCache,
                        stations: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error searching stations: ${error.message}` )
                }

                return { struct }
            }
        },
        getComponents: {
            postRequest: async ( { response, struct, payload } ) => {
                const raw = struct?.data
                if( !raw || typeof raw !== 'object' ) { return { response } }

                const components = Object.entries( raw )
                    .filter( ( [ key ] ) => key !== 'count' && key !== 'indices' )
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
        },
        getAirQualityIndex: {
            postRequest: async ( { response, struct, payload } ) => {
                const raw = struct?.data
                if( !raw?.data ) { return { response } }

                const measurements = Object.entries( raw.data )
                    .map( ( [ stationId, timestamps ] ) => {
                        const readings = Object.entries( timestamps )
                            .map( ( [ timestamp, values ] ) => {
                                const result = {
                                    timestamp,
                                    airQualityIndex: parseInt( values[ 0 ] ) || null,
                                    airQualityLabel: values[ 1 ] || null,
                                    pm10: parseFloat( values[ 2 ] ) || null,
                                    pm10Index: parseInt( values[ 3 ] ) || null,
                                    o3: parseFloat( values[ 4 ] ) || null,
                                    o3Index: parseInt( values[ 5 ] ) || null,
                                    no2: parseFloat( values[ 6 ] ) || null,
                                    no2Index: parseInt( values[ 7 ] ) || null
                                }

                                return result
                            } )

                        const result = {
                            stationId,
                            readings
                        }

                        return result
                    } )

                response = {
                    stationCount: measurements.length,
                    dateFrom: payload.date_from || null,
                    dateTo: payload.date_to || null,
                    measurements
                }

                return { response }
            }
        },
        getMeasurements: {
            postRequest: async ( { response, struct, payload } ) => {
                const raw = struct?.data
                if( !raw?.data ) { return { response } }

                const measurements = Object.entries( raw.data )
                    .map( ( [ stationId, timestamps ] ) => {
                        const readings = Object.entries( timestamps )
                            .map( ( [ timestamp, values ] ) => {
                                const result = {
                                    timestamp,
                                    value: parseFloat( values[ 0 ] ) || null,
                                    qualityFlag: parseInt( values[ 1 ] ) || null
                                }

                                return result
                            } )

                        const result = {
                            stationId,
                            readings
                        }

                        return result
                    } )

                response = {
                    stationCount: measurements.length,
                    component: payload.component || '5',
                    dateFrom: payload.date_from || null,
                    dateTo: payload.date_to || null,
                    measurements
                }

                return { response }
            }
        }
    }
}
