export const schema = {
    namespace: "dip",
    name: "DIP Bundestag Proceedings",
    description: "German Bundestag Documentation and Information System (DIP) API providing access to Vorgaenge (proceedings), Vorgangspositionen (proceeding positions), Aktivitaeten (activities), and Personen (members of parliament)",
    docs: ["https://dip.bundestag.de/über-dip/hilfe/api"],
    tags: ["parliament", "germany", "opendata", "legislation", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://search.dip.bundestag.de/api/v1",
    requiredServerParams: ["DIP_API_KEY"],
    headers: {},
    routes: {
        listVorgaenge: {
            requestMethod: "GET",
            description: "Search and list Vorgaenge (legislative proceedings) of the German Bundestag. Filter by legislative period, date range, type, or descriptor.",
            route: "/vorgang",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.vorgangstyp", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.beratungsstand", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.deskriptor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Vorgaenge of current legislative period", "f.wahlperiode": 20 },
                { _description: "Search Vorgaenge by descriptor", "f.deskriptor": "Klimaschutz", "f.wahlperiode": 20 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatVorgaenge" }
            ]
        },
        getVorgang: {
            requestMethod: "GET",
            description: "Get a single Vorgang (legislative proceeding) by its ID from the German Bundestag. Returns full proceeding details including related documents and activities.",
            route: "/vorgang/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Vorgang by ID", id: 306510 }
            ],
            modifiers: []
        },
        listVorgangspositionen: {
            requestMethod: "GET",
            description: "Search and list Vorgangspositionen (proceeding positions) of the German Bundestag. Filter by legislative period or date range.",
            route: "/vorgangsposition",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Vorgangspositionen of current period", "f.wahlperiode": 20 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPositionen" }
            ]
        },
        getVorgangsposition: {
            requestMethod: "GET",
            description: "Get a single Vorgangsposition (proceeding position) by its ID from the German Bundestag.",
            route: "/vorgangsposition/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Vorgangsposition by ID", id: 362553 }
            ],
            modifiers: []
        },
        listAktivitaeten: {
            requestMethod: "GET",
            description: "Search and list Aktivitaeten (parliamentary activities) of the German Bundestag. Filter by legislative period, date range, person, or document type.",
            route: "/aktivitaet",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.titel", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.dokumentart", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Aktivitaeten of current period", "f.wahlperiode": 20 },
                { _description: "List Aktivitaeten by date range", "f.datum.start": "2024-01-01", "f.datum.end": "2024-06-30" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatAktivitaeten" }
            ]
        },
        getAktivitaet: {
            requestMethod: "GET",
            description: "Get a single Aktivitaet (parliamentary activity) by its ID from the German Bundestag.",
            route: "/aktivitaet/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Aktivitaet by ID", id: 944899 }
            ],
            modifiers: []
        },
        listPersonen: {
            requestMethod: "GET",
            description: "Search and list Personen (members of parliament) in the German Bundestag. Filter by legislative period or name.",
            route: "/person",
            parameters: [
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "f.wahlperiode", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "f.datum.start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.datum.end", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "f.person", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cursor", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "List Personen of current period", "f.wahlperiode": 20 },
                { _description: "Search Personen by name", "f.person": "Merz" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPersonen" }
            ]
        },
        getPerson: {
            requestMethod: "GET",
            description: "Get a single Person (member of parliament) by their ID from the German Bundestag. Returns full biographical and political details.",
            route: "/person/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "apikey", value: "{{DIP_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get Person by ID", id: 857 }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatVorgaenge: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { struct, payload } }

            const vorgaenge = raw.documents
                .map( ( doc ) => {
                    const result = {
                        id: doc.id || null,
                        vorgangstyp: doc.vorgangstyp || null,
                        titel: doc.titel || null,
                        datum: doc.datum || null,
                        wahlperiode: doc.wahlperiode || null,
                        beratungsstand: doc.beratungsstand || null,
                        initiative: doc.initiative || null,
                        aktualisiert: doc.aktualisiert || null
                    }

                    return result
                } )

            struct.data = {
                count: vorgaenge.length,
                cursor: raw.cursor || null,
                vorgaenge
            }

            return { struct, payload }
        },
        formatPositionen: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { struct, payload } }

            const positionen = raw.documents
                .map( ( doc ) => {
                    const result = {
                        id: doc.id || null,
                        vorgangId: doc.vorgang_id || null,
                        titel: doc.titel || null,
                        datum: doc.datum || null,
                        aktivitaetsart: doc.aktivitaetsart || null,
                        aktualisiert: doc.aktualisiert || null
                    }

                    return result
                } )

            struct.data = {
                count: positionen.length,
                cursor: raw.cursor || null,
                positionen
            }

            return { struct, payload }
        },
        formatAktivitaeten: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { struct, payload } }

            const aktivitaeten = raw.documents
                .map( ( doc ) => {
                    const result = {
                        id: doc.id || null,
                        dokumentart: doc.dokumentart || null,
                        titel: doc.titel || null,
                        datum: doc.datum || null,
                        wahlperiode: doc.wahlperiode || null,
                        aktualisiert: doc.aktualisiert || null
                    }

                    return result
                } )

            struct.data = {
                count: aktivitaeten.length,
                cursor: raw.cursor || null,
                aktivitaeten
            }

            return { struct, payload }
        },
        formatPersonen: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { struct, payload } }

            const personen = raw.documents
                .map( ( doc ) => {
                    const result = {
                        id: doc.id || null,
                        nachname: doc.nachname || null,
                        vorname: doc.vorname || null,
                        titel: doc.titel || null,
                        typ: doc.typ || null,
                        wahlperiode: doc.wahlperiode || null,
                        basisdatum: doc.basisdatum || null,
                        aktualisiert: doc.aktualisiert || null
                    }

                    return result
                } )

            struct.data = {
                count: personen.length,
                cursor: raw.cursor || null,
                personen
            }

            return { struct, payload }
        }
    }
}
