// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'dip',
    name: 'DIP Bundestag Documents',
    description: 'German Bundestag Documentation and Information System (DIP) API providing access to Drucksachen (printed papers) and Plenarprotokolle (plenary protocols) of the German parliament',
    version: '2.0.0',
    docs: ['https://dip.bundestag.de/über-dip/hilfe/api'],
    tags: ['parliament', 'germany', 'opendata', 'legislation', 'cacheTtlDaily'],
    root: 'https://search.dip.bundestag.de/api/v1',
    requiredServerParams: ['DIP_API_KEY'],
    routes: {
        listDrucksachen: {
            method: 'GET',
            path: '/drucksache?apikey={{DIP_API_KEY}}',
            description: 'Search and list Drucksachen (printed papers) of the German Bundestag. Filter by legislative period, date range, or title. Returns paginated results.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentnummer', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.zuordnung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BT,BR,BV,EK)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getDrucksache: {
            method: 'GET',
            path: '/drucksache/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Drucksache (printed paper) by its ID from the German Bundestag. Returns full document details.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        listDrucksacheTexts: {
            method: 'GET',
            path: '/drucksache-text?apikey={{DIP_API_KEY}}',
            description: 'Search and list full texts of Drucksachen from the German Bundestag. Filter by legislative period, date range, or title.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getDrucksacheText: {
            method: 'GET',
            path: '/drucksache-text/:id?apikey={{DIP_API_KEY}}',
            description: 'Get the full text of a single Drucksache by its ID from the German Bundestag.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        listPlenarprotokolle: {
            method: 'GET',
            path: '/plenarprotokoll?apikey={{DIP_API_KEY}}',
            description: 'Search and list Plenarprotokolle (plenary protocols) of the German Bundestag. Filter by legislative period, date range, or title.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentnummer', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.zuordnung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BT,BR,BV,EK)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getPlenarprotokoll: {
            method: 'GET',
            path: '/plenarprotokoll/:id?apikey={{DIP_API_KEY}}',
            description: 'Get a single Plenarprotokoll (plenary protocol) by its ID from the German Bundestag.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        },
        listPlenarprotokollTexts: {
            method: 'GET',
            path: '/plenarprotokoll-text?apikey={{DIP_API_KEY}}',
            description: 'Search and list full texts of Plenarprotokolle from the German Bundestag. Filter by legislative period or date range.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.titel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getPlenarprotokollText: {
            method: 'GET',
            path: '/plenarprotokoll-text/:id?apikey={{DIP_API_KEY}}',
            description: 'Get the full text of a single Plenarprotokoll by its ID from the German Bundestag.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    listDrucksachen: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: documents.length,
            cursor: raw.cursor || null,
            documents
            }

            return { response }
        }
    },
    listDrucksacheTexts: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: documents.length,
            cursor: raw.cursor || null,
            documents
            }

            return { response }
        }
    },
    listPlenarprotokolle: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: documents.length,
            cursor: raw.cursor || null,
            documents
            }

            return { response }
        }
    },
    listPlenarprotokollTexts: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.documents ) { return { response }}

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

            response = {
            count: documents.length,
            cursor: raw.cursor || null,
            documents
            }

            return { response }
        }
    }
} )
