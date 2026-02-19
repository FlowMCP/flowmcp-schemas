// Split from hospitals.mjs — German places search/lookup + states
// Category: handlers-clean
// Note: The API serves static JSON files — no server-side filtering.
// All search/filter routes fetch the full dataset and filter client-side.
// Place fields are minified: p=postalCode, c=city, m=municipality, d=district, lt=latitude, ln=longitude
// executeRequest handlers receive userParams via payload.userParams (not payload directly).

export const main = {
    namespace: 'klinikatlas',
    name: 'Klinikatlas German Places',
    description: 'Search German cities, postal codes, districts, and federal states from the Bundes-Klinik-Atlas geographic reference data',
    version: '2.0.0',
    docs: ['https://klinikatlas.api.bund.dev/'],
    tags: ['healthcare', 'germany', 'geography', 'places', 'cacheTtlDaily'],
    root: 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json',
    routes: {
        searchPlaces: {
            method: 'GET',
            path: '/german-places.json',
            description: 'Search German places by city name, postal code prefix, or district. Filtering happens client-side on the full dataset (~82K entries).',
            parameters: [
                { position: { key: 'city', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'zip', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)', 'optional()'] } },
                { position: { key: 'district', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(50)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'German places with coordinates (~8.2MB, ~82K entries, static reference data)'
            },
            tests: [
                { _description: 'Search Berlin', city: 'Berlin' },
                { _description: 'Search by zip prefix 101', zip: '101', limit: 20 }
            ]
        },
        getPlaceByZip: {
            method: 'GET',
            path: '/german-places.json',
            description: 'Exact postal code lookup. Returns all places matching the 5-digit German postal code.',
            parameters: [
                { position: { key: 'zip', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(5)'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters for exact postal code match'
            },
            tests: [
                { _description: 'Exact zip 10115', zip: '10115' }
            ]
        },
        getPlacesByDistrict: {
            method: 'GET',
            path: '/german-places.json',
            description: 'Get all places in a specific district (Landkreis). Filtering happens client-side.',
            parameters: [
                { position: { key: 'district', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(100)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters by district client-side'
            },
            tests: [
                { _description: 'District München', district: 'München' }
            ]
        },
        getPlacesNearby: {
            method: 'GET',
            path: '/german-places.json',
            description: 'Find places near geographic coordinates within a radius. Filtering by distance happens client-side.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(47)', 'max(55.5)'] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(5.5)', 'max(15.5)'] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0.5)', 'max(50)', 'default(5)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(50)', 'optional()'] } }
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
        getGermanStates: {
            method: 'GET',
            path: '/german-states.json',
            description: 'Get all 16 German federal states with their geographic center coordinates.',
            parameters: [],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'German federal states with coordinates (16 entries, static)'
            },
            tests: [
                { _description: 'German states' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const _cachePlaces = { data: null, timestamp: null, ttl: 3600000 }

    const fetchPlaces = async () => {
        const now = Date.now()
        if( _cachePlaces.data && _cachePlaces.timestamp && ( now - _cachePlaces.timestamp ) < _cachePlaces.ttl ) {
            return { places: _cachePlaces.data, fromCache: true }
        }

        const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/german-places.json' )
        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()
        _cachePlaces.data = data
        _cachePlaces.timestamp = now

        return { places: data, fromCache: false }
    }

    const normalizePlace = ( place ) => {
        const normalized = {
            postalCode: place.p || null,
            city: place.c || null,
            municipality: place.m || null,
            district: place.d || null,
            latitude: parseFloat( place.lt ) || null,
            longitude: parseFloat( place.ln ) || null
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
        searchPlaces: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { places, fromCache } = await fetchPlaces()

                    if( !Array.isArray( places ) ) {
                        struct.data = places
                        return { struct }
                    }

                    const city = ( userParams.city || '' ).toLowerCase()
                    const zip = userParams.zip || ''
                    const district = ( userParams.district || '' ).toLowerCase()
                    const limit = userParams.limit || 50

                    const filtered = places
                        .filter( ( place ) => {
                            const placeCity = ( place.c || '' ).toLowerCase()
                            const placeZip = place.p || ''
                            const placeDistrict = ( place.d || '' ).toLowerCase()

                            if( city && !placeCity.includes( city ) ) { return false }
                            if( zip && !placeZip.startsWith( zip ) ) { return false }
                            if( district && !placeDistrict.includes( district ) ) { return false }

                            return true
                        } )
                        .slice( 0, limit )
                        .map( ( place ) => normalizePlace( place ) )

                    struct.data = {
                        source: 'Klinikatlas German Places',
                        query: { city: city || null, zip: zip || null, district: district || null },
                        totalCount: places.length,
                        matchCount: filtered.length,
                        limit,
                        fromCache,
                        places: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error searching places: ${error.message}` )
                }

                return { struct }
            }
        },
        getPlaceByZip: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { places, fromCache } = await fetchPlaces()

                    if( !Array.isArray( places ) ) {
                        struct.data = places
                        return { struct }
                    }

                    const targetZip = userParams.zip || ''
                    const matches = places
                        .filter( ( place ) => ( place.p || '' ) === targetZip )
                        .map( ( place ) => normalizePlace( place ) )

                    struct.data = {
                        source: 'Klinikatlas German Places',
                        query: { zip: targetZip },
                        matchCount: matches.length,
                        fromCache,
                        places: matches
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error looking up postal code: ${error.message}` )
                }

                return { struct }
            }
        },
        getPlacesByDistrict: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { places, fromCache } = await fetchPlaces()

                    if( !Array.isArray( places ) ) {
                        struct.data = places
                        return { struct }
                    }

                    const district = ( userParams.district || '' ).toLowerCase()
                    const limit = userParams.limit || 100

                    const filtered = places
                        .filter( ( place ) => {
                            const placeDistrict = ( place.d || '' ).toLowerCase()

                            return placeDistrict.includes( district )
                        } )
                        .slice( 0, limit )
                        .map( ( place ) => normalizePlace( place ) )

                    struct.data = {
                        source: 'Klinikatlas German Places',
                        filter: { district: userParams.district },
                        totalCount: places.length,
                        matchCount: filtered.length,
                        limit,
                        fromCache,
                        places: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error filtering places by district: ${error.message}` )
                }

                return { struct }
            }
        },
        getPlacesNearby: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { places, fromCache } = await fetchPlaces()

                    if( !Array.isArray( places ) ) {
                        struct.data = places
                        return { struct }
                    }

                    const targetLat = userParams.lat
                    const targetLon = userParams.lon
                    const radiusKm = userParams.radius || 5
                    const limit = userParams.limit || 50

                    const filtered = places
                        .filter( ( place ) => {
                            const placeLat = parseFloat( place.lt )
                            const placeLon = parseFloat( place.ln )

                            if( isNaN( placeLat ) || isNaN( placeLon ) ) { return false }

                            const dist = haversineKm( {
                                lat1: targetLat,
                                lon1: targetLon,
                                lat2: placeLat,
                                lon2: placeLon
                            } )

                            return dist <= radiusKm
                        } )
                        .map( ( place ) => {
                            const normalized = normalizePlace( place )
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
                        .slice( 0, limit )

                    struct.data = {
                        source: 'Klinikatlas German Places',
                        filter: { lat: targetLat, lon: targetLon, radiusKm },
                        totalCount: places.length,
                        matchCount: filtered.length,
                        limit,
                        fromCache,
                        places: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error filtering places by location: ${error.message}` )
                }

                return { struct }
            }
        },
        getGermanStates: {
            executeRequest: async ( { struct } ) => {
                try {
                    const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/german-states.json' )
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
                                name: s.state || null,
                                latitude: parseFloat( s.lat ) || null,
                                longitude: parseFloat( s.lon ) || null
                            }

                            return result
                        } )

                    struct.data = {
                        source: 'Klinikatlas German States',
                        stateCount: states.length,
                        states
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error fetching German states: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
