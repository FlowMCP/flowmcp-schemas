export const schema = {
    namespace: "strahlenschutz",
    name: "BfS Strahlenschutz ODL API",
    description: "German Federal Office for Radiation Protection (BfS) ambient dose rate monitoring data via WFS/OGC service with 1685 measuring stations across Germany",
    docs: ["https://strahlenschutz.api.bund.dev/"],
    tags: ["radiation", "germany", "environment", "safety"],
    flowMCP: "1.2.0",
    root: "https://www.imis.bfs.de/ogc/opendata/ows",
    requiredServerParams: [],
    headers: {},
    routes: {
        getLatestReadings: {
            requestMethod: "GET",
            description: "Get the latest 1-hour ambient dose rate readings from all measuring stations. Returns station name, location, radiation value in microsieverts per hour, and measurement timestamp.",
            route: "/",
            parameters: [
                { position: { key: "service", value: "WFS", location: "query" } },
                { position: { key: "version", value: "1.1.0", location: "query" } },
                { position: { key: "request", value: "GetFeature", location: "query" } },
                { position: { key: "typeName", value: "opendata:odlinfo_odl_1h_latest", location: "query" } },
                { position: { key: "outputFormat", value: "application/json", location: "query" } },
                { position: { key: "maxFeatures", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"50\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get latest radiation readings (50 stations)" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatReadings" }
            ]
        },
        getStationTimeseries: {
            requestMethod: "GET",
            description: "Get 1-hour radiation timeseries data for a specific station. Use the station kenn value from getLatestReadings as viewparams (e.g. kenn:031020004).",
            route: "/",
            parameters: [
                { position: { key: "service", value: "WFS", location: "query" } },
                { position: { key: "version", value: "1.1.0", location: "query" } },
                { position: { key: "request", value: "GetFeature", location: "query" } },
                { position: { key: "typeName", value: "opendata:odlinfo_timeseries_odl_1h", location: "query" } },
                { position: { key: "outputFormat", value: "application/json", location: "query" } },
                { position: { key: "viewparams", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "sortBy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"end_measure+D\")", "optional()"] } },
                { position: { key: "maxFeatures", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"24\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get 24h timeseries for station Pruem", viewparams: "kenn:072322961" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatReadings" }
            ]
        }
    },
    handlers: {
        formatReadings: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.features ) { return { struct, payload } }

            const readings = raw.features
                .map( ( feature ) => {
                    const { properties, geometry } = feature
                    const result = {
                        id: properties.id || null,
                        name: properties.name || null,
                        kenn: properties.kenn || null,
                        value: properties.value,
                        unit: properties.unit || 'µSv/h',
                        startMeasure: properties.start_measure || null,
                        endMeasure: properties.end_measure || null,
                        siteStatus: properties.site_status_text || null,
                        coordinates: geometry?.coordinates || null
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || readings.length,
                readingCount: readings.length,
                readings
            }

            return { struct, payload }
        }
    }
}
