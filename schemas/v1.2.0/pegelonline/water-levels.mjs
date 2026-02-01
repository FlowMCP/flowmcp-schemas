export const schema = {
    namespace: "pegelonline",
    name: "Pegel-Online API",
    description: "German federal waterway gauging stations API providing real-time water levels, measurements, and station data from the WSV",
    docs: ["https://pegel-online.api.bund.dev/"],
    tags: ["water", "germany", "environment", "hydrology"],
    flowMCP: "1.2.0",
    root: "https://www.pegelonline.wsv.de/webservices/rest-api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
        getStations: {
            requestMethod: "GET",
            description: "Get all gauging stations. Optionally filter by waterway name. Returns station name, location, agency, and associated water body.",
            route: "/stations.json",
            parameters: [
                { position: { key: "waters", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"20\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get stations on the Rhine", waters: "RHEIN", limit: "5" },
                { _description: "Get all stations limited to 5", limit: "5" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStations" }
            ]
        },
        getStationDetail: {
            requestMethod: "GET",
            description: "Get detailed information for a specific station including timeseries and current measurements. Use station UUID from getStations.",
            route: "/stations/:uuid.json",
            parameters: [
                { position: { key: "uuid", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "includeTimeseries", value: "true", location: "query" } },
                { position: { key: "includeCurrentMeasurement", value: "true", location: "query" } }
            ],
            tests: [
                { _description: "Get Konstanz-Rhein station detail", uuid: "e020e651-e422-46d3-ae28-34887c5a4a8e" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStationDetail" }
            ]
        },
        getWaters: {
            requestMethod: "GET",
            description: "Get list of all waterways (rivers, canals, lakes) with gauging stations.",
            route: "/waters.json",
            parameters: [],
            tests: [
                { _description: "Get all waterways" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWaters" }
            ]
        },
        getCurrentMeasurement: {
            requestMethod: "GET",
            description: "Get the current water level measurement for a specific station and timeseries. Timeseries shortname is typically W (water level) or Q (discharge).",
            route: "/stations/:uuid/:timeseries/currentmeasurement.json",
            parameters: [
                { position: { key: "uuid", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "timeseries", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(\"W\")"] } }
            ],
            tests: [
                { _description: "Get current water level for Konstanz-Rhein", uuid: "e020e651-e422-46d3-ae28-34887c5a4a8e", timeseries: "W" }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatStations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

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

            struct.data = {
                stationCount: stations.length,
                stations
            }

            return { struct, payload }
        },
        formatStationDetail: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { struct, payload } }

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

            struct.data = {
                uuid: raw.uuid,
                name: raw.shortname || raw.longname,
                km: raw.km,
                agency: raw.agency,
                longitude: raw.longitude,
                latitude: raw.latitude,
                water: raw.water?.shortname || null,
                timeseries
            }

            return { struct, payload }
        },
        formatWaters: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            struct.data = {
                waterCount: raw.length,
                waters: raw
                    .map( ( w ) => {
                        const result = { shortname: w.shortname, longname: w.longname }

                        return result
                    } )
            }

            return { struct, payload }
        }
    }
}
