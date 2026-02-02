export const schema = {
    namespace: "vag",
    name: "VAG Nuernberg Transit API",
    description: "Real-time public transit data for Nuremberg (VAG) including stops, departures, and service information for buses, trams, and subway",
    docs: ["https://bundesapi.github.io/vag-api/"],
    tags: ["transit", "germany", "realtime", "nuremberg", "cacheTtlStatic"],
    flowMCP: "1.2.0",
    root: "https://start.vag.de/dm/api/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getStops: {
            requestMethod: "GET",
            description: "Get all public transit stops in the Nuremberg VGN network. Returns stop name, coordinates, and available transport modes.",
            route: "/haltestellen.json/VGN",
            parameters: [],
            tests: [
                { _description: "Get all VGN transit stops" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStops" }
            ]
        },
        getDepartures: {
            requestMethod: "GET",
            description: "Get real-time departures for a specific stop. Use VGN stop ID from getStops. Returns line, direction, scheduled and actual departure times.",
            route: "/abfahrten.json/VGN/:stopId",
            parameters: [
                { position: { key: "stopId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(\"510\")"] } }
            ],
            tests: [
                { _description: "Get departures for Nuernberg Hauptbahnhof", stopId: "510" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatDepartures" }
            ]
        }
    },
    handlers: {
        formatStops: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.Haltestellen ) { return { struct, payload } }

            const stops = raw.Haltestellen
                .map( ( stop ) => {
                    const result = {
                        name: stop.Haltestellenname,
                        vagId: stop.VAGKennung,
                        vgnId: stop.VGNKennung,
                        longitude: stop.Longitude,
                        latitude: stop.Latitude,
                        products: stop.Produkte
                    }

                    return result
                } )

            struct.data = {
                stopCount: stops.length,
                stops
            }

            return { struct, payload }
        },
        formatDepartures: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.Abfahrten ) { return { struct, payload } }

            const departures = raw.Abfahrten
                .map( ( dep ) => {
                    const result = {
                        line: dep.Linienname,
                        direction: dep.Richtungstext,
                        scheduledTime: dep.AbfahrtszeitSoll,
                        actualTime: dep.AbfahrtszeitIst,
                        product: dep.Produkt,
                        platform: dep.HaltesteigText || null,
                        delay: dep.Prognose === true
                    }

                    return result
                } )

            struct.data = {
                stopName: raw.Haltestellenname || null,
                departureCount: departures.length,
                departures,
                serviceInfo: raw.Sonderinformationen || []
            }

            return { struct, payload }
        }
    }
}
