export const main = {
    namespace: 'dipbundestag',
    name: 'DIP Bundestag',
    description: 'Access the German Bundestag documentation and information system (DIP). Search parliamentary proceedings, printed documents, plenary protocols, activities, and politician profiles.',
    version: '3.0.0',
    docs: ['https://dip.bundestag.de/%C3%BCber-dip/hilfe/api', 'https://search.dip.bundestag.de/api/v1/swagger-ui/'],
    tags: ['politics', 'germany', 'parliament', 'legislation', 'opendata', 'cacheTtlDaily'],
    root: 'https://search.dip.bundestag.de/api/v1',
    requiredServerParams: ['DIP_BUNDESTAG_API_KEY'],
    headers: {
        'Authorization': 'ApiKey {{DIP_BUNDESTAG_API_KEY}}'
    },
    tools: {
        listVorgaenge: {
            method: 'GET',
            path: '/vorgang',
            description: 'List parliamentary proceedings (Vorgaenge) with filters for date range, electoral period, and document type. Returns metadata on legislative processes.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'List proceedings from electoral period 20', 'f.wahlperiode': 20 },
                { _description: 'List proceedings in date range', 'f.datum.start': '2024-01-01', 'f.datum.end': '2024-01-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numFound: { type: 'number' },
                        documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, vorgangstyp: { type: 'string' }, titel: { type: 'string' }, wahlperiode: { type: 'number' }, datum: { type: 'string' } } } },
                        cursor: { type: 'string' }
                    }
                }
            },
        },
        getVorgang: {
            method: 'GET',
            path: '/vorgang/:id',
            description: 'Get detailed metadata on a specific parliamentary proceeding by its ID, including linked documents and plenary protocols.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'Get proceeding with ID 300000', id: 300000 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        vorgangstyp: { type: 'string' },
                        titel: { type: 'string' },
                        wahlperiode: { type: 'number' },
                        initiative: { type: 'array' },
                        datum: { type: 'string' }
                    }
                }
            },
        },
        listDrucksachen: {
            method: 'GET',
            path: '/drucksache',
            description: 'List printed parliamentary documents (Drucksachen) such as bills, motions, and inquiries. Filter by electoral period, date, and document type.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.drucksachetyp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentnummer', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'List documents from electoral period 20', 'f.wahlperiode': 20 },
                { _description: 'List documents by date range', 'f.datum.start': '2024-06-01', 'f.datum.end': '2024-06-30' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numFound: { type: 'number' },
                        documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, drucksachetyp: { type: 'string' }, dokumentnummer: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' } } } },
                        cursor: { type: 'string' }
                    }
                }
            },
        },
        getDrucksache: {
            method: 'GET',
            path: '/drucksache/:id',
            description: 'Get metadata on a specific printed document by its ID, including title, type, authors, and linked proceedings.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'Get document with ID 250000', id: 250000 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        drucksachetyp: { type: 'string' },
                        dokumentnummer: { type: 'string' },
                        titel: { type: 'string' },
                        datum: { type: 'string' },
                        autoren_anzeige: { type: 'array' }
                    }
                }
            },
        },
        listPlenarprotokolle: {
            method: 'GET',
            path: '/plenarprotokoll',
            description: 'List plenary session protocols of the Bundestag. Filter by electoral period and date range.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.dokumentnummer', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'List plenary protocols from period 20', 'f.wahlperiode': 20 },
                { _description: 'List plenary protocols for January 2024', 'f.datum.start': '2024-01-01', 'f.datum.end': '2024-01-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numFound: { type: 'number' },
                        documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, datum: { type: 'string' }, titel: { type: 'string' }, wahlperiode: { type: 'number' } } } },
                        cursor: { type: 'string' }
                    }
                }
            },
        },
        listPersonen: {
            method: 'GET',
            path: '/person',
            description: 'List persons (politicians) registered in the Bundestag system. Filter by electoral period and date range.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'List persons from electoral period 20', 'f.wahlperiode': 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numFound: { type: 'number' },
                        documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, titel: { type: 'string' }, vorname: { type: 'string' }, nachname: { type: 'string' }, namenszusatz: { type: 'string' } } } },
                        cursor: { type: 'string' }
                    }
                }
            },
        },
        getPerson: {
            method: 'GET',
            path: '/person/:id',
            description: 'Get master data on a specific person (politician) by their ID, including name, titles, and biographical data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'Get person with ID 857', id: 857 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        titel: { type: 'string' },
                        vorname: { type: 'string' },
                        nachname: { type: 'string' },
                        namenszusatz: { type: 'string' },
                        typ: { type: 'string' },
                        wahlperiode: { type: 'number' }
                    }
                }
            },
        },
        listAktivitaeten: {
            method: 'GET',
            path: '/aktivitaet',
            description: 'List parliamentary activities with filters for date range, electoral period, and linked documents or protocols.',
            parameters: [
                { position: { key: 'f.wahlperiode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.datum.start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.datum.end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'f.drucksache', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'f.plenarprotokoll', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'enum(json,xml)', options: ['default(json)'] } }
            ],
            tests: [
                { _description: 'List activities from electoral period 20', 'f.wahlperiode': 20 },
                { _description: 'List activities in date range', 'f.datum.start': '2024-03-01', 'f.datum.end': '2024-03-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numFound: { type: 'number' },
                        documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, aktivitaetsart: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' } } } },
                        cursor: { type: 'string' }
                    }
                }
            },
        }
    }
}
