export const schema = {
    namespace: "berlinDenkmale",
    name: "Berlin Heritage Sites WFS API",
    description: "Berlin monument registry (Denkmalliste) providing heritage site locations, types, and database links via WFS from the State Monument Authority (Landesdenkmalamt Berlin). Covers 9,553 monuments including architectural monuments, garden monuments, ensembles, complexes, and ground monuments.",
    docs: ["https://daten.berlin.de/datensaetze/denkmale-wfs-12f0f9ed", "https://gdi.berlin.de/geonetwork/srv/api/records/65b2f04e-2e8c-393f-a848-b7d696508f1a"],
    tags: ["berlin", "geodata", "heritage", "monuments", "opendata", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://gdi.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getMonuments: {
            requestMethod: "GET",
            description: "List heritage sites from the Berlin monument registry. Returns monument ID, type, database link, and centroid coordinates. Use count to limit results and startIndex for pagination. Total dataset contains 9,553 monuments.",
            route: "/services/wfs/denkmale",
            parameters: [
                { position: { key: "service", value: "WFS", location: "query" } },
                { position: { key: "version", value: "2.0.0", location: "query" } },
                { position: { key: "request", value: "GetFeature", location: "query" } },
                { position: { key: "typeNames", value: "denkmale:denkmale", location: "query" } },
                { position: { key: "outputFormat", value: "application/json", location: "query" } },
                { position: { key: "srsName", value: "EPSG:4326", location: "query" } },
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(500)", "default(20)"] } },
                { position: { key: "startIndex", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Get first 5 heritage sites", count: 5 },
                { _description: "Get heritage sites with pagination", count: 3, startIndex: 100 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatMonuments" }
            ]
        },
        getMonumentsByType: {
            requestMethod: "GET",
            description: "Filter heritage sites by monument type. Valid types: Baudenkmal (architectural monument, 7,169), Gesamtanlage (complex/compound, 1,242), Gartendenkmal (garden monument, 564), Ensemble (ensemble, 511), Bodendenkmal (ground monument, 67).",
            route: "/services/wfs/denkmale",
            parameters: [
                { position: { key: "service", value: "WFS", location: "query" } },
                { position: { key: "version", value: "2.0.0", location: "query" } },
                { position: { key: "request", value: "GetFeature", location: "query" } },
                { position: { key: "typeNames", value: "denkmale:denkmale", location: "query" } },
                { position: { key: "outputFormat", value: "application/json", location: "query" } },
                { position: { key: "srsName", value: "EPSG:4326", location: "query" } },
                { position: { key: "CQL_FILTER", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(500)", "default(20)"] } },
                { position: { key: "startIndex", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Get garden monuments", CQL_FILTER: "typ='Gartendenkmal'", count: 5 },
                { _description: "Get ground monuments", CQL_FILTER: "typ='Bodendenkmal'", count: 5 },
                { _description: "Get ensembles", CQL_FILTER: "typ='Ensemble'", count: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "encodeCqlFilter" },
                { phase: "post", handlerName: "formatMonuments" }
            ]
        },
        getMonumentsByBbox: {
            requestMethod: "GET",
            description: "Get heritage sites within a geographic bounding box. Coordinates in WGS84 (EPSG:4326) as minLon,minLat,maxLon,maxLat. Central Berlin example: 13.37,52.51,13.40,52.53.",
            route: "/services/wfs/denkmale",
            parameters: [
                { position: { key: "service", value: "WFS", location: "query" } },
                { position: { key: "version", value: "2.0.0", location: "query" } },
                { position: { key: "request", value: "GetFeature", location: "query" } },
                { position: { key: "typeNames", value: "denkmale:denkmale", location: "query" } },
                { position: { key: "outputFormat", value: "application/json", location: "query" } },
                { position: { key: "srsName", value: "EPSG:4326", location: "query" } },
                { position: { key: "bbox", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(7)"] } },
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(500)", "default(50)"] } }
            ],
            tests: [
                { _description: "Get monuments in central Berlin (Mitte)", bbox: "13.37,52.51,13.40,52.52,EPSG:4326", count: 5 },
                { _description: "Get monuments around Charlottenburg Palace", bbox: "13.28,52.51,13.32,52.53,EPSG:4326", count: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatMonuments" }
            ]
        }
    },
    handlers: {
        encodeCqlFilter: async ( { struct, payload } ) => {
            const { userParams } = payload
            if( userParams?.CQL_FILTER ) {
                userParams.CQL_FILTER = encodeURIComponent( userParams.CQL_FILTER )
            }

            return { struct, payload }
        },
        formatMonuments: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const monuments = raw.features
                .map( ( feature ) => {
                    const { id, typ, link } = feature.properties || {}
                    const geom = feature.geometry || {}
                    const coords = geom.coordinates || []

                    let centroid = null
                    if( coords.length > 0 && coords[0].length > 0 && coords[0][0].length > 0 ) {
                        const ring = coords[0][0]
                        const lonSum = ring.reduce( ( sum, c ) => sum + c[0], 0 )
                        const latSum = ring.reduce( ( sum, c ) => sum + c[1], 0 )
                        centroid = {
                            longitude: Math.round( lonSum / ring.length * 1000000 ) / 1000000,
                            latitude: Math.round( latSum / ring.length * 1000000 ) / 1000000
                        }
                    }

                    const result = {
                        monumentId: id || null,
                        type: typ || null,
                        databaseLink: link || null,
                        centroid
                    }

                    return result
                } )

            struct.data = {
                totalMatched: raw.numberMatched || null,
                returned: monuments.length,
                monuments
            }

            return { struct, payload }
        }
    }
}
