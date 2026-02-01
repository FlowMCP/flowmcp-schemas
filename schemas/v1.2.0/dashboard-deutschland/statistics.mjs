export const schema = {
    namespace: "dashboardDeutschland",
    name: "Dashboard Deutschland API",
    description: "DESTATIS Dashboard Deutschland providing German economic indicators, labour market data, energy statistics, trade figures, and financial market data",
    docs: ["https://bundesapi.github.io/dashboard-deutschland-api/"],
    tags: ["statistics", "germany", "economy", "destatis"],
    flowMCP: "1.2.0",
    root: "https://www.dashboard-deutschland.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getDashboards: {
            requestMethod: "GET",
            description: "Get all available dashboards with their categories and tile layouts. Returns dashboard name, description, and tile IDs for use with getIndicator.",
            route: "/api/dashboard/get",
            parameters: [],
            tests: [
                { _description: "Get all dashboards" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatDashboards" }
            ]
        },
        getIndicator: {
            requestMethod: "GET",
            description: "Get statistical indicator data by tile ID. Use tile IDs from getDashboards or known IDs like tile_1667811574092 (GDP), tile_1667460685909 (retail), tile_1666960424161 (Baltic Dry Index).",
            route: "/api/tile/indicators",
            parameters: [
                { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get GDP indicator", ids: "tile_1667811574092" },
                { _description: "Get oil price indicator", ids: "tile_1667995478843" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatIndicators" }
            ]
        },
        getGeoData: {
            requestMethod: "GET",
            description: "Get GeoJSON data of all German federal states for mapping.",
            route: "/geojson/de-all.geo.json",
            parameters: [],
            tests: [
                { _description: "Get Germany GeoJSON" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatGeoData" }
            ]
        }
    },
    handlers: {
        formatDashboards: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const dashboards = raw
                .map( ( d ) => {
                    const tiles = ( d.layoutTiles || [] )
                        .map( ( t ) => {
                            const result = { id: t.id }

                            return result
                        } )

                    return {
                        id: d.id,
                        name: d.name,
                        nameEn: d.nameEn || null,
                        description: d.description || null,
                        tileCount: tiles.length,
                        tileIds: tiles
                    }
                } )

            struct.data = {
                dashboardCount: dashboards.length,
                dashboards
            }

            return { struct, payload }
        },
        formatIndicators: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const indicators = raw
                .map( ( item ) => {
                    const result = {
                        id: item.id,
                        title: item.title || null,
                        date: item.date || null
                    }

                    return result
                } )

            struct.data = {
                indicatorCount: indicators.length,
                indicators
            }

            return { struct, payload }
        },
        formatGeoData: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.features ) { return { struct, payload } }

            const states = raw.features
                .map( ( f ) => {
                    const result = {
                        name: f.properties?.name || null,
                        id: f.properties?.id || null
                    }

                    return result
                } )

            struct.data = {
                type: raw.type,
                stateCount: states.length,
                states
            }

            return { struct, payload }
        }
    }
}
