export const schema = {
    namespace: "mudab",
    name: "MUDAB Marine Environment Database API",
    description: "German Federal Institute of Hydrology (BfG) marine environment database providing monitoring data from coastal states and research institutions",
    docs: ["https://mudab.api.bund.dev/"],
    tags: ["marine", "germany", "environment", "monitoring", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://geoportal.bafg.de/mudab/rest/BaseController/FilterElements",
    requiredServerParams: [],
    headers: {
        "Content-Type": "application/json"
    },
    routes: {
        getStations: {
            requestMethod: "POST",
            description: "Get all marine monitoring stations. Returns station name, type, and compartment.",
            route: "/STATION_SMALL",
            parameters: [],
            tests: [
                { _description: "Get all marine stations" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStations" }
            ]
        },
        getParameters: {
            requestMethod: "POST",
            description: "Get all measured parameters including pollutants, nutrients, and biological indicators with their parameter groups.",
            route: "/MV_PARAMETER",
            parameters: [],
            tests: [
                { _description: "Get all measurement parameters" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatParameters" }
            ]
        },
        getProjectStations: {
            requestMethod: "POST",
            description: "Get monitoring stations associated with specific research projects. Returns structured JSON response data.",
            route: "/PROJECTSTATION_SMALL",
            parameters: [],
            tests: [
                { _description: "Get project stations" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatGeneric" }
            ]
        }
    },
    handlers: {
        formatStations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { struct, payload } }

            const key = Object.keys( raw )[ 0 ]
            const stations = raw[ key ] || []

            const formatted = stations
                .slice( 0, 200 )
                .map( ( s ) => {
                    const result = {
                        id: s.metadataid,
                        name: s.STATNAME_ST || s.NAME_PS,
                        type: s.STATIONTYPE_ST || null,
                        compartment: s.COMPT_DS || null
                    }

                    return result
                } )

            struct.data = {
                totalStations: stations.length,
                stationCount: formatted.length,
                stations: formatted
            }

            return { struct, payload }
        },
        formatParameters: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { struct, payload } }

            const key = Object.keys( raw )[ 0 ]
            const params = raw[ key ] || []

            const formatted = params
                .slice( 0, 200 )
                .map( ( p ) => {
                    const result = {
                        id: p.metadataid,
                        parameter: p.PARAMETER,
                        name: p.PARAM_NAME,
                        group: p.PARAMGROUP_NAME || p.PARGROUP,
                        compartment: p.COMPT_DS || null
                    }

                    return result
                } )

            struct.data = {
                totalParameters: params.length,
                parameterCount: formatted.length,
                parameters: formatted
            }

            return { struct, payload }
        },
        formatGeneric: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { struct, payload } }

            const key = Object.keys( raw )[ 0 ]
            const items = raw[ key ] || []

            struct.data = {
                key,
                totalItems: items.length,
                items: items.slice( 0, 100 )
            }

            return { struct, payload }
        }
    }
}
