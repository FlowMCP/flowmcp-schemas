export const schema = {
    namespace: "umweltbundesamt",
    name: "Umweltbundesamt Air Quality API",
    description: "German Federal Environment Agency (Umweltbundesamt) air quality data including stations, pollutant measurements, and air quality index",
    docs: ["https://luftqualitaet.api.bund.dev/"],
    tags: ["airquality", "germany", "environment", "pollution", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
        getStations: {
            requestMethod: "GET",
            description: "Get all air quality monitoring stations in Germany. Returns station name, location, type, and operating state.",
            route: "/stations/json",
            parameters: [
                { position: { key: "use", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"airquality\")", "optional()"] } },
                { position: { key: "lang", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"en\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get all air quality stations" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStations" }
            ]
        },
        getComponents: {
            requestMethod: "GET",
            description: "Get list of measured pollutant components (PM10, NO2, O3, SO2, CO, etc.) with units.",
            route: "/components/json",
            parameters: [],
            tests: [
                { _description: "Get all pollutant components" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatComponents" }
            ]
        },
        getAirQualityIndex: {
            requestMethod: "GET",
            description: "Get the air quality index for all stations at a specific date and time. Returns composite index and individual component values.",
            route: "/airquality/json",
            parameters: [
                { position: { key: "date_from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "time_from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"12\")", "optional()"] } },
                { position: { key: "date_to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "time_to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"12\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get air quality index for recent date", date_from: "2026-01-31", date_to: "2026-01-31" }
            ],
            modifiers: []
        },
        getMeasurements: {
            requestMethod: "GET",
            description: "Get measurement values for a specific pollutant component at all stations for a date range. Component IDs: 1=PM10, 2=CO, 3=O3, 4=SO2, 5=NO2.",
            route: "/measures/json",
            parameters: [
                { position: { key: "date_from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "date_to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "time_from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"1\")", "optional()"] } },
                { position: { key: "time_to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"24\")", "optional()"] } },
                { position: { key: "component", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"5\")", "optional()"] } },
                { position: { key: "scope", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"1\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get NO2 measurements for recent date", date_from: "2026-01-31", date_to: "2026-01-31", component: "5" }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatStations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.data ) { return { struct, payload } }

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

            struct.data = {
                stationCount: stations.length,
                stations
            }

            return { struct, payload }
        },
        formatComponents: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { struct, payload } }

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

            struct.data = {
                componentCount: components.length,
                components
            }

            return { struct, payload }
        }
    }
}
