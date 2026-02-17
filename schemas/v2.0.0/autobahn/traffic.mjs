// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'autobahn',
    name: 'Autobahn App API',
    description: 'Real-time traffic data for German motorways including roadworks, warnings, closures, webcams, and electric charging stations',
    version: '2.0.0',
    docs: ['https://autobahn.api.bund.dev/'],
    tags: ['traffic', 'germany', 'infrastructure', 'cacheTtlFrequent'],
    root: 'https://verkehr.autobahn.de/o/autobahn',
    routes: {
        listRoads: {
            method: 'GET',
            path: '/',
            description: 'List all available German motorway identifiers (A1, A2, etc.) Returns structured JSON response data.',
            parameters: []
        },
        getRoadworks: {
            method: 'GET',
            path: '/:roadId/services/roadworks',
            description: 'Get current roadworks and construction sites for a specific motorway. Required: roadId.',
            parameters: [
                { position: { key: 'roadId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getWarnings: {
            method: 'GET',
            path: '/:roadId/services/warning',
            description: 'Get current traffic warnings for a specific motorway via Autobahn API — query by roadId.',
            parameters: [
                { position: { key: 'roadId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getClosures: {
            method: 'GET',
            path: '/:roadId/services/closure',
            description: 'Get current road closures for a specific motorway via Autobahn API — query by roadId.',
            parameters: [
                { position: { key: 'roadId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getChargingStations: {
            method: 'GET',
            path: '/:roadId/services/electric_charging_station',
            description: 'Get electric vehicle charging stations along a specific motorway. Required: roadId.',
            parameters: [
                { position: { key: 'roadId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getWebcams: {
            method: 'GET',
            path: '/:roadId/services/webcam',
            description: 'Get traffic webcams along a specific motorway via Autobahn API — query by roadId.',
            parameters: [
                { position: { key: 'roadId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    listRoads: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.roads ) { return { response }}

            response = {
            totalRoads: raw.roads.length,
            roads: raw.roads
            }

            return { response }
        }
    },
    getRoadworks: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.roadworks ) { return { response }}

            const roadworks = raw.roadworks
            .map( ( item ) => {
            const { identifier, title, subtitle, extent, isBlocked, description, future } = item

            return {
            id: identifier,
            title,
            subtitle,
            isBlocked: isBlocked === 'true',
            isFuture: future,
            extent,
            details: ( description || [] ).filter( ( d ) => d.length > 0 )
            }
            } )

            response = {
            totalRoadworks: roadworks.length,
            roadworks
            }

            return { response }
        }
    },
    getWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.warning ) { return { response }}

            const warnings = raw.warning
            .map( ( item ) => {
            const { identifier, title, subtitle, extent, isBlocked, description, display_type } = item

            return {
            id: identifier,
            title,
            subtitle,
            type: display_type,
            isBlocked: isBlocked === 'true',
            extent,
            details: ( description || [] ).filter( ( d ) => d.length > 0 )
            }
            } )

            response = {
            totalWarnings: warnings.length,
            warnings
            }

            return { response }
        }
    },
    getClosures: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.closure ) { return { response }}

            const closures = raw.closure
            .map( ( item ) => {
            const { identifier, title, subtitle, extent, isBlocked, description, future } = item

            return {
            id: identifier,
            title,
            subtitle,
            isBlocked: isBlocked === 'true',
            isFuture: future,
            extent,
            details: ( description || [] ).filter( ( d ) => d.length > 0 )
            }
            } )

            response = {
            totalClosures: closures.length,
            closures
            }

            return { response }
        }
    },
    getChargingStations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.electric_charging_station ) { return { response }}

            const stations = raw.electric_charging_station
            .map( ( item ) => {
            const { identifier, title, subtitle, point, description } = item

            return {
            id: identifier,
            title,
            subtitle,
            coordinates: point,
            details: ( description || [] ).filter( ( d ) => d.length > 0 )
            }
            } )

            response = {
            totalStations: stations.length,
            stations
            }

            return { response }
        }
    },
    getWebcams: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.webcam ) { return { response }}

            const webcams = raw.webcam
            .map( ( item ) => {
            const { identifier, title, subtitle, point, description, operator, imageurl } = item

            return {
            id: identifier,
            title,
            subtitle,
            coordinates: point,
            operator,
            imageUrl: imageurl,
            details: ( description || [] ).filter( ( d ) => d.length > 0 )
            }
            } )

            response = {
            totalWebcams: webcams.length,
            webcams
            }

            return { response }
        }
    }
} )
