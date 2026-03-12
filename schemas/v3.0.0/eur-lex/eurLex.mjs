export const main = {
    namespace: 'eurlex',
    name: 'EUR-Lex CELLAR SPARQL',
    description: 'Query the EU legislation database via SPARQL on the CELLAR repository. Access EU regulations, directives, decisions, and treaties using the CDM (Common Data Model) ontology. Search by keyword, CELEX number, EuroVoc subject, or date. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://publications.europa.eu/en/web/cellar', 'https://op.europa.eu/en/web/eu-vocabularies/cdm'],
    tags: ['law', 'government', 'europe', 'sparql', 'cacheTtlDaily'],
    root: 'https://publications.europa.eu',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/sparql-results+json'
    },
    tools: {
        searchRegulations: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Search EU regulations by keyword in title. Returns CELEX number, title, date, and document URI.',
            parameters: [
                { position: { key: 'keyword', value: '{{KEYWORD}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search regulations about data protection', keyword: 'data protection', limit: 10 },
                { _description: 'Search regulations about agriculture', keyword: 'agriculture', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { celex: { type: 'string' }, title: { type: 'string' }, date: { type: 'string' }, uri: { type: 'string' } } } } } }
            }
        },
        searchDirectives: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Search EU directives by keyword in title. Returns CELEX number, title, date, and document URI.',
            parameters: [
                { position: { key: 'keyword', value: '{{KEYWORD}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search directives about environment', keyword: 'environment', limit: 10 },
                { _description: 'Search directives about energy', keyword: 'energy', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { celex: { type: 'string' }, title: { type: 'string' }, date: { type: 'string' }, uri: { type: 'string' } } } } } }
            }
        },
        lookupByCelex: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Look up a specific EU legal document by its CELEX number (e.g. "32016R0679" for GDPR, "32000L0060" for Water Framework Directive). Returns title, date, type, and EuroVoc subjects.',
            parameters: [
                { position: { key: 'celex', value: '{{CELEX}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up GDPR regulation', celex: '32016R0679' },
                { _description: 'Look up Water Framework Directive', celex: '32000L0060' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, date: { type: 'string' }, type: { type: 'string' }, subjects: { type: 'array', items: { type: 'string' } } } } } } }
            }
        },
        recentLegislation: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Get recent EU legislation by type (regulation, directive, or decision). Returns CELEX, title, and date ordered by most recent first.',
            parameters: [
                { position: { key: 'type', value: '{{TYPE}}', location: 'query' }, z: { primitive: 'enum(regulation,directive,decision)', options: ['optional()', 'default(regulation)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Recent EU regulations', type: 'regulation', limit: 10 },
                { _description: 'Recent EU directives', type: 'directive', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { celex: { type: 'string' }, title: { type: 'string' }, date: { type: 'string' }, uri: { type: 'string' } } } } } }
            }
        },
        searchByEuroVoc: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Search EU legislation by EuroVoc thesaurus concept. Use EuroVoc concept IDs (e.g. "2735" for data protection, "5482" for environment policy, "5283" for energy). Returns documents classified under that subject.',
            parameters: [
                { position: { key: 'conceptId', value: '{{CONCEPT_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Documents about data protection', conceptId: '2735', limit: 10 },
                { _description: 'Documents about environment policy', conceptId: '5482', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { celex: { type: 'string' }, title: { type: 'string' }, date: { type: 'string' }, uri: { type: 'string' } } } } } }
            }
        },
        querySparql: {
            method: 'GET',
            path: '/webapi/rdf/sparql',
            description: 'Execute a custom SPARQL query against EUR-Lex CELLAR. Uses CDM ontology (cdm:). Key classes: cdm:regulation, cdm:directive, cdm:decision. Key properties: cdm:work_title, cdm:resource_legal_id_celex, cdm:work_date_document, cdm:is_about.',
            parameters: [
                { position: { key: 'query', value: '{{SPARQL_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Count regulations', query: "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#> SELECT (COUNT(?s) AS ?count) WHERE { ?s a cdm:regulation }" },
                { _description: 'List regulation types', query: "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#> SELECT DISTINCT ?type WHERE { ?s a ?type . FILTER(STRSTARTS(STR(?type), 'http://publications.europa.eu/ontology/cdm#')) } LIMIT 20" }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { head: { type: 'object', properties: { vars: { type: 'array', items: { type: 'string' } } } }, results: { type: 'object', properties: { bindings: { type: 'array', items: { type: 'object' } } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const CDM = 'http://publications.europa.eu/ontology/cdm#'

    const buildLegislationQuery = ( { type, keyword, limit } ) => {
        const sparql = `PREFIX cdm: <${CDM}> SELECT DISTINCT ?celex ?title ?date ?uri WHERE { ?uri a cdm:${type} . ?uri cdm:resource_legal_id_celex ?celex . ?uri cdm:work_title ?title . OPTIONAL { ?uri cdm:work_date_document ?date } FILTER(lang(?title) = 'en') FILTER(CONTAINS(LCASE(STR(?title)), LCASE('${keyword}'))) } ORDER BY DESC(?date) LIMIT ${limit}`

        return sparql
    }

    const extractBindings = ( response ) => {
        const results = ( response?.results?.bindings || [] )
            .map( ( b ) => {
                const item = {}
                Object.keys( b )
                    .forEach( ( key ) => { item[key] = b[key]?.value } )

                return item
            } )

        return results
    }

    return {
        searchRegulations: {
            preRequest: async ( { struct, payload } ) => {
                const { keyword } = payload
                const limit = payload?.limit || 20
                const sparql = buildLegislationQuery( { type: 'regulation', keyword, limit } )
                struct['queryParams'] = { query: sparql }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const results = extractBindings( response )

                return { response: { results } }
            }
        },
        searchDirectives: {
            preRequest: async ( { struct, payload } ) => {
                const { keyword } = payload
                const limit = payload?.limit || 20
                const sparql = buildLegislationQuery( { type: 'directive', keyword, limit } )
                struct['queryParams'] = { query: sparql }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const results = extractBindings( response )

                return { response: { results } }
            }
        },
        lookupByCelex: {
            preRequest: async ( { struct, payload } ) => {
                const { celex } = payload
                const sparql = `PREFIX cdm: <${CDM}> SELECT DISTINCT ?title ?date ?type (GROUP_CONCAT(DISTINCT ?subjectLabel; SEPARATOR=", ") AS ?subjects) WHERE { ?uri cdm:resource_legal_id_celex ?celexId . FILTER(STR(?celexId) = '${celex}') ?uri a ?type . FILTER(STRSTARTS(STR(?type), '${CDM}')) ?uri cdm:work_title ?title . FILTER(lang(?title) = 'en') OPTIONAL { ?uri cdm:work_date_document ?date } OPTIONAL { ?uri cdm:is_about ?subject . ?subject skos:prefLabel ?subjectLabel . FILTER(lang(?subjectLabel) = 'en') } } GROUP BY ?title ?date ?type LIMIT 10`
                struct['queryParams'] = { query: sparql }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const results = ( response?.results?.bindings || [] )
                    .map( ( b ) => {
                        const subjects = b.subjects?.value ? b.subjects.value.split( ', ' ) : []
                        const item = { title: b.title?.value, date: b.date?.value, type: b.type?.value?.replace( CDM, '' ), subjects }

                        return item
                    } )

                return { response: { results } }
            }
        },
        recentLegislation: {
            preRequest: async ( { struct, payload } ) => {
                const type = payload?.type || 'regulation'
                const limit = payload?.limit || 20
                const sparql = `PREFIX cdm: <${CDM}> SELECT DISTINCT ?celex ?title ?date ?uri WHERE { ?uri a cdm:${type} . ?uri cdm:resource_legal_id_celex ?celex . ?uri cdm:work_title ?title . ?uri cdm:work_date_document ?date . FILTER(lang(?title) = 'en') } ORDER BY DESC(?date) LIMIT ${limit}`
                struct['queryParams'] = { query: sparql }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const results = extractBindings( response )

                return { response: { results } }
            }
        },
        searchByEuroVoc: {
            preRequest: async ( { struct, payload } ) => {
                const { conceptId } = payload
                const limit = payload?.limit || 20
                const sparql = `PREFIX cdm: <${CDM}> PREFIX eurovoc: <http://eurovoc.europa.eu/> SELECT DISTINCT ?celex ?title ?date ?uri WHERE { ?uri cdm:is_about eurovoc:${conceptId} . ?uri cdm:resource_legal_id_celex ?celex . ?uri cdm:work_title ?title . OPTIONAL { ?uri cdm:work_date_document ?date } FILTER(lang(?title) = 'en') } ORDER BY DESC(?date) LIMIT ${limit}`
                struct['queryParams'] = { query: sparql }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const results = extractBindings( response )

                return { response: { results } }
            }
        }
    }
}
