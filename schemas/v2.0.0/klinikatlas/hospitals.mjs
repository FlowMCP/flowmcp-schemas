// Rewritten: ICD/OPS/Places/States routes moved to medical-codes.mjs and german-places.mjs
// Category: handlers-clean
// Note: The API serves a static JSON file — no server-side filtering.
// All search/filter routes fetch the full dataset and filter client-side.
// executeRequest handlers receive userParams via payload.userParams (not payload directly).

export const main = {
    namespace: 'klinikatlas',
    name: 'Klinikatlas Hospitals',
    description: 'Search and browse German hospital locations from the Federal Hospital Atlas (Bundes-Klinik-Atlas) with filtering by name, city, and geographic proximity',
    version: '2.0.0',
    docs: ['https://klinikatlas.api.bund.dev/'],
    tags: ['healthcare', 'germany', 'hospitals', 'cacheTtlDaily'],
    root: 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json',
    routes: {
        getAllHospitals: {
            method: 'GET',
            path: '/locations.json',
            description: 'Get all hospital locations in Germany with pagination. Use limit/offset to page through ~1600 hospitals.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(2000)', 'default(100)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'All hospital locations in Germany (~708KB, ~1600 entries, updated infrequently)'
            },
            tests: [
                { _description: 'First 50 hospitals', limit: 50 }
            ]
        },
        searchHospitals: {
            method: 'GET',
            path: '/locations.json',
            description: 'Search hospitals by name, city, or postal code. Filtering happens client-side on the full dataset.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'city', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'zip', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters client-side'
            },
            tests: [
                { _description: 'Search by name', name: 'Charit' }
            ]
        },
        getHospitalsByCity: {
            method: 'GET',
            path: '/locations.json',
            description: 'Get all hospitals in a specific city. Filtering happens client-side.',
            parameters: [
                { position: { key: 'city', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters by city client-side'
            },
            tests: [
                { _description: 'Hospitals in Munich', city: 'München' }
            ]
        },
        getHospitalsNearby: {
            method: 'GET',
            path: '/locations.json',
            description: 'Find hospitals near geographic coordinates within a radius. Filtering by distance happens client-side.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(47)', 'max(55.5)'] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(5.5)', 'max(15.5)'] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(10)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters by proximity client-side'
            },
            tests: [
                { _description: 'Near Berlin center', lat: 52.52, lon: 13.405, radius: 5.0 }
            ]
        },
        getStateStatistics: {
            method: 'GET',
            path: '/states.json',
            description: 'Get healthcare statistics per federal state including case numbers, caregiver counts, and hospital counts. Small dataset (17 entries), returned in full.',
            parameters: [],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'State-level healthcare statistics (17 entries, updated annually)'
            },
            tests: [
                { _description: 'State statistics' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const _cacheLocations = { data: null, timestamp: null, ttl: 3600000 }

    const fetchLocations = async () => {
        const now = Date.now()
        if( _cacheLocations.data && _cacheLocations.timestamp && ( now - _cacheLocations.timestamp ) < _cacheLocations.ttl ) {
            return { locations: _cacheLocations.data, fromCache: true }
        }

        const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/locations.json' )
        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()
        _cacheLocations.data = data
        _cacheLocations.timestamp = now

        return { locations: data, fromCache: false }
    }

    const normalizeHospital = ( loc ) => {
        const normalized = {
            name: loc.name || null,
            street: loc.street || null,
            city: loc.city || null,
            zip: loc.zip || null,
            phone: loc.phone || null,
            mail: loc.mail || null,
            beds: loc.beds_number || null,
            latitude: parseFloat( loc.latitude ) || null,
            longitude: parseFloat( loc.longitude ) || null,
            link: loc.link || null
        }

        return normalized
    }

    const haversineKm = ( { lat1, lon1, lat2, lon2 } ) => {
        const toRad = ( deg ) => deg * Math.PI / 180
        const R = 6371
        const dLat = toRad( lat2 - lat1 )
        const dLon = toRad( lon2 - lon1 )
        const a = Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
            Math.cos( toRad( lat1 ) ) * Math.cos( toRad( lat2 ) ) *
            Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
        const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) )
        const distance = R * c

        return distance
    }

    return {
        getAllHospitals: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { locations, fromCache } = await fetchLocations()

                    if( !Array.isArray( locations ) ) {
                        struct.data = locations
                        return { struct }
                    }

                    const limit = userParams.limit || 100
                    const offset = userParams.offset || 0
                    const sliced = locations.slice( offset, offset + limit )
                    const normalized = sliced
                        .map( ( loc ) => normalizeHospital( loc ) )

                    struct.data = {
                        source: 'Klinikatlas Hospitals',
                        totalCount: locations.length,
                        returnedCount: normalized.length,
                        offset,
                        limit,
                        fromCache,
                        hospitals: normalized
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error fetching hospitals: ${error.message}` )
                }

                return { struct }
            }
        },
        searchHospitals: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { locations, fromCache } = await fetchLocations()

                    if( !Array.isArray( locations ) ) {
                        struct.data = locations
                        return { struct }
                    }

                    const q = ( userParams.q || '' ).toLowerCase()
                    const name = ( userParams.name || '' ).toLowerCase()
                    const city = ( userParams.city || '' ).toLowerCase()
                    const zip = userParams.zip || ''

                    const filtered = locations
                        .filter( ( loc ) => {
                            const locStr = JSON.stringify( loc ).toLowerCase()
                            const locName = ( loc.name || '' ).toLowerCase()
                            const locCity = ( loc.city || '' ).toLowerCase()
                            const locZip = loc.zip || ''

                            if( q && !locStr.includes( q ) ) { return false }
                            if( name && !locName.includes( name ) ) { return false }
                            if( city && !locCity.includes( city ) ) { return false }
                            if( zip && !locZip.startsWith( zip ) ) { return false }

                            return true
                        } )
                        .map( ( loc ) => normalizeHospital( loc ) )

                    struct.data = {
                        source: 'Klinikatlas Hospitals',
                        query: { q: q || null, name: name || null, city: city || null, zip: zip || null },
                        totalCount: locations.length,
                        matchCount: filtered.length,
                        fromCache,
                        hospitals: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error searching hospitals: ${error.message}` )
                }

                return { struct }
            }
        },
        getHospitalsByCity: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { locations, fromCache } = await fetchLocations()

                    if( !Array.isArray( locations ) ) {
                        struct.data = locations
                        return { struct }
                    }

                    const city = ( userParams.city || '' ).toLowerCase()

                    const filtered = locations
                        .filter( ( loc ) => {
                            const locCity = ( loc.city || '' ).toLowerCase()

                            return locCity.includes( city )
                        } )
                        .map( ( loc ) => normalizeHospital( loc ) )

                    struct.data = {
                        source: 'Klinikatlas Hospitals',
                        filter: { city: userParams.city },
                        totalCount: locations.length,
                        matchCount: filtered.length,
                        fromCache,
                        hospitals: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error filtering hospitals by city: ${error.message}` )
                }

                return { struct }
            }
        },
        getHospitalsNearby: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { locations, fromCache } = await fetchLocations()

                    if( !Array.isArray( locations ) ) {
                        struct.data = locations
                        return { struct }
                    }

                    const targetLat = userParams.lat
                    const targetLon = userParams.lon
                    const radiusKm = userParams.radius || 10

                    const filtered = locations
                        .filter( ( loc ) => {
                            const locLat = parseFloat( loc.latitude )
                            const locLon = parseFloat( loc.longitude )

                            if( isNaN( locLat ) || isNaN( locLon ) ) { return false }

                            const dist = haversineKm( {
                                lat1: targetLat,
                                lon1: targetLon,
                                lat2: locLat,
                                lon2: locLon
                            } )

                            return dist <= radiusKm
                        } )
                        .map( ( loc ) => {
                            const normalized = normalizeHospital( loc )
                            normalized.distanceKm = Math.round(
                                haversineKm( {
                                    lat1: targetLat,
                                    lon1: targetLon,
                                    lat2: normalized.latitude,
                                    lon2: normalized.longitude
                                } ) * 100
                            ) / 100

                            return normalized
                        } )
                        .sort( ( a, b ) => a.distanceKm - b.distanceKm )

                    struct.data = {
                        source: 'Klinikatlas Hospitals',
                        filter: { lat: targetLat, lon: targetLon, radiusKm },
                        totalCount: locations.length,
                        matchCount: filtered.length,
                        fromCache,
                        hospitals: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error filtering hospitals by location: ${error.message}` )
                }

                return { struct }
            }
        },
        getStateStatistics: {
            executeRequest: async ( { struct } ) => {
                try {
                    const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/states.json' )
                    if( !response.ok ) {
                        throw new Error( `HTTP ${response.status}: ${response.statusText}` )
                    }

                    const data = await response.json()

                    if( !Array.isArray( data ) ) {
                        struct.data = data
                        return { struct }
                    }

                    const states = data
                        .map( ( s ) => {
                            const result = {
                                name: s.name || null,
                                cases: s.cases_number || 0,
                                caregivers: s.caregivers_number || 0,
                                doctors: s.doctors_number || 0,
                                hospitals: s.location_number || 0
                            }

                            return result
                        } )

                    struct.data = {
                        source: 'Klinikatlas State Statistics',
                        stateCount: states.length,
                        states
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error fetching state statistics: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
