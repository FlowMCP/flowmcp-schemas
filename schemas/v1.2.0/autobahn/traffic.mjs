export const schema = {
    namespace: "autobahn",
    name: "Autobahn App API",
    description: "Real-time traffic data for German motorways including roadworks, warnings, closures, webcams, and electric charging stations",
    docs: ["https://autobahn.api.bund.dev/"],
    tags: ["traffic", "germany", "infrastructure"],
    flowMCP: "1.2.0",
    root: "https://verkehr.autobahn.de/o/autobahn",
    requiredServerParams: [],
    headers: {},
    routes: {
        listRoads: {
            requestMethod: "GET",
            description: "List all available German motorway identifiers (A1, A2, etc.)",
            route: "/",
            parameters: [],
            tests: [
                { _description: "List all motorways" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatRoadList" }
            ]
        },
        getRoadworks: {
            requestMethod: "GET",
            description: "Get current roadworks and construction sites for a specific motorway",
            route: "/:roadId/services/roadworks",
            parameters: [
                { position: { key: "roadId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get roadworks on A1", roadId: "A1" },
                { _description: "Get roadworks on A7", roadId: "A7" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatRoadworks" }
            ]
        },
        getWarnings: {
            requestMethod: "GET",
            description: "Get current traffic warnings for a specific motorway",
            route: "/:roadId/services/warning",
            parameters: [
                { position: { key: "roadId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get warnings on A1", roadId: "A1" },
                { _description: "Get warnings on A3", roadId: "A3" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarnings" }
            ]
        },
        getClosures: {
            requestMethod: "GET",
            description: "Get current road closures for a specific motorway",
            route: "/:roadId/services/closure",
            parameters: [
                { position: { key: "roadId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get closures on A1", roadId: "A1" },
                { _description: "Get closures on A5", roadId: "A5" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatClosures" }
            ]
        },
        getChargingStations: {
            requestMethod: "GET",
            description: "Get electric vehicle charging stations along a specific motorway",
            route: "/:roadId/services/electric_charging_station",
            parameters: [
                { position: { key: "roadId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get charging stations on A1", roadId: "A1" },
                { _description: "Get charging stations on A9", roadId: "A9" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatChargingStations" }
            ]
        },
        getWebcams: {
            requestMethod: "GET",
            description: "Get traffic webcams along a specific motorway",
            route: "/:roadId/services/webcam",
            parameters: [
                { position: { key: "roadId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get webcams on A9", roadId: "A9" },
                { _description: "Get webcams on A3", roadId: "A3" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWebcams" }
            ]
        }
    },
    handlers: {
        formatRoadList: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.roads ) { return { struct, payload } }

            struct.data = {
                totalRoads: raw.roads.length,
                roads: raw.roads
            }

            return { struct, payload }
        },
        formatRoadworks: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.roadworks ) { return { struct, payload } }

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

            struct.data = {
                totalRoadworks: roadworks.length,
                roadworks
            }

            return { struct, payload }
        },
        formatWarnings: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.warning ) { return { struct, payload } }

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

            struct.data = {
                totalWarnings: warnings.length,
                warnings
            }

            return { struct, payload }
        },
        formatClosures: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.closure ) { return { struct, payload } }

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

            struct.data = {
                totalClosures: closures.length,
                closures
            }

            return { struct, payload }
        },
        formatChargingStations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.electric_charging_station ) { return { struct, payload } }

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

            struct.data = {
                totalStations: stations.length,
                stations
            }

            return { struct, payload }
        },
        formatWebcams: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.webcam ) { return { struct, payload } }

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

            struct.data = {
                totalWebcams: webcams.length,
                webcams
            }

            return { struct, payload }
        }
    }
}
