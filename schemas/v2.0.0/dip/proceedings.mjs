// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'dip',
    name: 'DIP Bundestag Proceedings',
    description: 'German Bundestag Documentation and Information System (DIP) API providing access to Vorgaenge (proceedings), Vorgangspositionen (proceeding positions), Aktivitaeten (activities), and Personen (members of parliament)',
    version: '2.0.0',
    docs: ['https://dip.bundestag.de/über-dip/hilfe/api'],
    tags: ['parliament', 'germany', 'opendata', 'legislation', 'cacheTtlDaily'],
    root: 'https://search.dip.bundestag.de/api/v1',
    requiredServerParams: ['DIP_API_KEY'],
    routes: {
        listVorgaenge: {
            method: 'GET',
            path: '/vorgang?apikey={{DIP_API_KEY}}',
            description: 'Search and list Vorgaenge (legislative proceedings) of the German Bundestag. Filter by legislative period, date range, type, or descriptor.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.vorgangstyp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.beratungsstand', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.deskriptor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{documents:{type:'array',items:{type:'object',properties:{id:{type:'number'},typ:{type:'string'},titel:{type:'string'},wahlperiode:{type:'number'}}}},cursor:{type:'string'},numFound:{type:'number'}}}},
            tests: [
                { _description: 'List Vorgaenge of current legislative period', 'f.wahlperiode': 20 },
                { _description: 'Search Vorgaenge by descriptor', 'f.deskriptor': 'Klimaschutz', 'f.wahlperiode': 20 }
            ],
        },
        getVorgang: {
            method: 'GET',
            path: '/vorgang/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Vorgang (legislative proceeding) by its ID from the German Bundestag. Returns full proceeding details including related documents and activities.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{id:{type:'number'},typ:{type:'string'},titel:{type:'string'},wahlperiode:{type:'number'},aktualisiert:{type:'string'},beratungsstand:{type:'string'}}}},
            tests: [
                { _description: 'Get Vorgang by ID', id: 306510 }
            ],
        },
        listVorgangspositionen: {
            method: 'GET',
            path: '/vorgangsposition?apikey={{DIP_API_KEY}}',
            description: 'Search and list Vorgangspositionen (proceeding positions) of the German Bundestag. Filter by legislative period or date range.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{documents:{type:'array',items:{type:'object',properties:{id:{type:'number'},titel:{type:'string'},datum:{type:'string'}}}},cursor:{type:'string'},numFound:{type:'number'}}}},
            tests: [
                { _description: 'List Vorgangspositionen of current period', 'f.wahlperiode': 20 }
            ],
        },
        getVorgangsposition: {
            method: 'GET',
            path: '/vorgangsposition/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Vorgangsposition (proceeding position) by its ID from the German Bundestag.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{id:{type:'number'},titel:{type:'string'},datum:{type:'string'},aktivitaet_anzeige:{type:'string'}}}},
            tests: [
                { _description: 'Get Vorgangsposition by ID', id: 362553 }
            ],
        },
        listAktivitaeten: {
            method: 'GET',
            path: '/aktivitaet?apikey={{DIP_API_KEY}}',
            description: 'Search and list Aktivitaeten (parliamentary activities) of the German Bundestag. Filter by legislative period, date range, person, or document type.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{documents:{type:'array',items:{type:'object',properties:{id:{type:'number'},typ:{type:'string'},titel:{type:'string'},datum:{type:'string'}}}},cursor:{type:'string'},numFound:{type:'number'}}}},
            tests: [
                { _description: 'List Aktivitaeten of current period', 'f.wahlperiode': 20 },
                { _description: 'List Aktivitaeten by date range', 'f.datum.start': '2024-01-01', 'f.datum.end': '2024-06-30' }
            ],
        },
        getAktivitaet: {
            method: 'GET',
            path: '/aktivitaet/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Aktivitaet (parliamentary activity) by its ID from the German Bundestag.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{id:{type:'number'},typ:{type:'string'},titel:{type:'string'},datum:{type:'string'},wahlperiode:{type:'number'}}}},
            tests: [
                { _description: 'Get Aktivitaet by ID', id: 944899 }
            ],
        },
        listPersonen: {
            method: 'GET',
            path: '/person?apikey={{DIP_API_KEY}}',
            description: 'Search and list Personen (members of parliament) in the German Bundestag. Filter by legislative period or name.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.person', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{documents:{type:'array',items:{type:'object',properties:{id:{type:'number'},nachname:{type:'string'},vorname:{type:'string'},titel:{type:'string'},fraktion:{type:'string'}}}},cursor:{type:'string'},numFound:{type:'number'}}}},
            tests: [
                { _description: 'List Personen of current period', 'f.wahlperiode': 20 },
                { _description: 'Search Personen by name', 'f.person': 'Merz' }
            ],
        },
        getPerson: {
            method: 'GET',
            path: '/person/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Person (member of parliament) by their ID from the German Bundestag. Returns full biographical and political details.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{id:{type:'number'},nachname:{type:'string'},vorname:{type:'string'},titel:{type:'string'},fraktion:{type:'string'},wahlperiode:{type:'number'}}}},
            tests: [
                { _description: 'Get Person by ID', id: 857 }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    listVorgaenge: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: vorgaenge.length,
            cursor: raw.cursor || null,
            vorgaenge
            }

            return { response }
        }
    },
    listVorgangspositionen: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: positionen.length,
            cursor: raw.cursor || null,
            positionen
            }

            return { response }
        }
    },
    listAktivitaeten: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: aktivitaeten.length,
            cursor: raw.cursor || null,
            aktivitaeten
            }

            return { response }
        }
    },
    listPersonen: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: personen.length,
            cursor: raw.cursor || null,
            personen
            }

            return { response }
        }
    }
} )
