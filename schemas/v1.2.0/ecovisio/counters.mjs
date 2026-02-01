export const schema = {
    namespace: "ecovisio",
    name: "Eco-Visio Counter API",
    description: "Eco-Counter bicycle and pedestrian counting stations API providing traffic counting data from automated sensors across German cities and worldwide",
    docs: ["https://eco-visio.api.bund.dev/"],
    tags: ["mobility", "germany", "cycling", "pedestrian"],
    flowMCP: "1.2.0",
    root: "https://www.eco-visio.net/api/aladdin/1.0.0",
    requiredServerParams: [],
    headers: {},
    routes: {
        getCountersByOrganization: {
            requestMethod: "GET",
            description: "Get all counting stations for a public organization by its ID. Known German IDs: 888 (Rostock), 4586 (global bike display), 6116 (Schwerin), 6997 (Greifswald), 6811 (Boeblingen). Returns station name, coordinates, and photo URLs.",
            route: "/pbl/publicwebpageplus/:idOrganisme",
            parameters: [
                { position: { key: "idOrganisme", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get Rostock counting stations", idOrganisme: "888" },
                { _description: "Get global bike counter display", idOrganisme: "4586" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatCounters" }
            ]
        }
    },
    handlers: {
        formatCounters: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const counters = raw
                .slice( 0, 200 )
                .map( ( counter ) => {
                    const result = {
                        id: counter.idPdc || null,
                        name: counter.nom || null,
                        latitude: counter.lat || null,
                        longitude: counter.lon || null,
                        startDate: counter.debut || null,
                        periodStart: counter.debutPeriode || null,
                        mainType: counter.mainPratique || null
                    }

                    return result
                } )

            struct.data = {
                totalCounters: raw.length,
                counterCount: counters.length,
                counters
            }

            return { struct, payload }
        }
    }
}
