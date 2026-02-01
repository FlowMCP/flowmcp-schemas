export const schema = {
    namespace: "dwd",
    name: "DWD WarnWetter API",
    description: "German Weather Service (Deutscher Wetterdienst) weather forecasts and station data via the WarnWetter app API",
    docs: ["https://dwd.api.bund.dev/"],
    tags: ["weather", "germany", "forecast"],
    flowMCP: "1.2.0",
    root: "https://app-prod-ws.warnwetter.de/v30",
    requiredServerParams: [],
    headers: {},
    routes: {
        getStationOverview: {
            requestMethod: "GET",
            description: "Get extended weather forecast overview for a station. Returns hourly forecasts, daily summaries, warnings, and three-hour summaries.",
            route: "/stationOverviewExtended",
            parameters: [
                { position: { key: "stationIds", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"10382\")"] } }
            ],
            tests: [
                { _description: "Get Berlin Tegel station forecast", stationIds: "10382" },
                { _description: "Get Hamburg station forecast", stationIds: "10147" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStationOverview" }
            ]
        }
    },
    handlers: {
        formatStationOverview: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { struct, payload } }

            const stations = Object.entries( raw )
                .map( ( [ stationId, data ] ) => {
                    const result = {
                        stationId,
                        forecastStart: data.forecastStart || null,
                        days: data.days || null,
                        warnings: data.warnings || []
                    }

                    return result
                } )

            struct.data = {
                stationCount: stations.length,
                stations
            }

            return { struct, payload }
        }
    }
}
