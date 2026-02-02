export const schema = {
    namespace: "dip",
    name: "DIP Bundestag Documents",
    description: "German Bundestag Documentation and Information System (DIP) API providing access to Drucksachen (printed papers) and Plenarprotokolle (plenary protocols) of the German parliament",
    docs: ["https://dip.bundestag.de/über-dip/hilfe/api"],
    tags: ["parliament", "germany", "opendata", "legislation", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://search.dip.bundestag.de/api/v1",
    requiredServerParams: ["DIP_API_KEY"],
    headers: {},
    routes: {
        listDrucksachen: {
            requestMethod: "GET",
            description: "Search and list Drucksachen (printed papers) of the German Bundestag. Filter by legislative period, date range, or title. Returns paginated results.",
            route: "/drucksache",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.dokumentnummer", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.zuordnung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(BT,BR,BV,EK)", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Drucksachen of current legislative period", "f.wahlperiode": 20 },
                { _description: "Search Drucksachen by title", "f.titel": "Klimaschutz", "f.wahlperiode": 20 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatList" }
            ]
        },
        getDrucksache: {
            requestMethod: "GET",
            description: "Get a single Drucksache (printed paper) by its ID from the German Bundestag. Returns full document details.",
            route: "/drucksache/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Drucksache by ID", id: 305038 }
            ],
            modifiers: []
        },
        listDrucksacheTexts: {
            requestMethod: "GET",
            description: "Search and list full texts of Drucksachen from the German Bundestag. Filter by legislative period, date range, or title.",
            route: "/drucksache-text",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Drucksache full texts", "f.wahlperiode": 20 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatList" }
            ]
        },
        getDrucksacheText: {
            requestMethod: "GET",
            description: "Get the full text of a single Drucksache by its ID from the German Bundestag.",
            route: "/drucksache-text/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Drucksache full text by ID", id: 305038 }
            ],
            modifiers: []
        },
        listPlenarprotokolle: {
            requestMethod: "GET",
            description: "Search and list Plenarprotokolle (plenary protocols) of the German Bundestag. Filter by legislative period, date range, or title.",
            route: "/plenarprotokoll",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.dokumentnummer", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.zuordnung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(BT,BR,BV,EK)", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Plenarprotokolle of current period", "f.wahlperiode": 20 },
                { _description: "List Plenarprotokolle by date range", "f.datum.start": "2024-01-01", "f.datum.end": "2024-12-31" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatList" }
            ]
        },
        getPlenarprotokoll: {
            requestMethod: "GET",
            description: "Get a single Plenarprotokoll (plenary protocol) by its ID from the German Bundestag.",
            route: "/plenarprotokoll/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Plenarprotokoll by ID", id: 118542 }
            ],
            modifiers: []
        },
        listPlenarprotokollTexts: {
            requestMethod: "GET",
            description: "Search and list full texts of Plenarprotokolle from the German Bundestag. Filter by legislative period or date range.",
            route: "/plenarprotokoll-text",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Plenarprotokoll full texts", "f.wahlperiode": 20 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatList" }
            ]
        },
        getPlenarprotokollText: {
            requestMethod: "GET",
            description: "Get the full text of a single Plenarprotokoll by its ID from the German Bundestag.",
            route: "/plenarprotokoll-text/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Plenarprotokoll full text by ID", id: 118542 }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatList: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { struct, payload } }

            const documents = raw.documents
                .map( ( doc ) => {
                    const result = {
                        id: doc.id || null,
                        dokumentnummer: doc.dokumentnummer || null,
                        typ: doc.typ || null,
                        titel: doc.titel || null,
                        datum: doc.datum || null,
                        wahlperiode: doc.wahlperiode || null,
                        aktualisiert: doc.aktualisiert || null
                    }

                    return result
                } )

            struct.data = {
                count: documents.length,
                cursor: raw.cursor || null,
                documents
            }

            return { struct, payload }
        }
    }
}
