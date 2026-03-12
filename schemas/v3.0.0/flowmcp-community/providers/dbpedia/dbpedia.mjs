export const main = {
    namespace: 'dbpedia',
    name: 'DBpedia SPARQL',
    description: 'Query the DBpedia knowledge graph via SPARQL. Access structured data extracted from Wikipedia including people, places, organizations, and scientific classifications using the DBpedia ontology. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://www.dbpedia.org/resources/sparql/', 'https://dbpedia.org/sparql'],
    tags: ['knowledge', 'linkeddata', 'sparql', 'wikipedia', 'cacheTtlDaily'],
    root: 'https://dbpedia.org',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/sparql-results+json'
    },
    tools: {
        countriesWithCapitals: {
            method: 'GET',
            path: '/sparql',
            description: 'List countries with their capital cities. Uses the DBpedia ontology classes dbo:Country and dbo:capital.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(300)'] } }
            ],
            tests: [
                { _description: 'Top 10 countries with capitals', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { country: { type: 'string' }, countryName: { type: 'string' }, capital: { type: 'string' }, capitalName: { type: 'string' } } } } } }
            }
        },
        entityLookup: {
            method: 'GET',
            path: '/sparql',
            description: 'Look up a DBpedia entity by its resource name (e.g. Berlin, Albert_Einstein). Returns English-language properties and values for the entity.',
            parameters: [
                { position: { key: 'resourceName', value: '{{RESOURCE_NAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Look up Berlin', resourceName: 'Berlin', limit: 15 },
                { _description: 'Look up Albert Einstein', resourceName: 'Albert_Einstein', limit: 15 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { property: { type: 'string' }, value: { type: 'string' } } } } } }
            }
        },
        musiciansByGenre: {
            method: 'GET',
            path: '/sparql',
            description: 'List musical artists by genre. Use DBpedia resource names for genres (e.g. Jazz, Rock_music, Hip_hop_music). Returns artist names.',
            parameters: [
                { position: { key: 'genre', value: '{{GENRE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Jazz musicians', genre: 'Jazz', limit: 10 },
                { _description: 'Rock musicians', genre: 'Rock_music', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { artist: { type: 'string' }, name: { type: 'string' } } } } } }
            }
        },
        universitiesByCountry: {
            method: 'GET',
            path: '/sparql',
            description: 'List universities in a given country. Use DBpedia resource names for countries (e.g. Germany, United_States, France). Returns university names.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Universities in Germany', country: 'Germany', limit: 10 },
                { _description: 'Universities in France', country: 'France', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { university: { type: 'string' }, name: { type: 'string' } } } } } }
            }
        },
        filmsByDirector: {
            method: 'GET',
            path: '/sparql',
            description: 'List films directed by a given person. Use DBpedia resource names (e.g. Steven_Spielberg, Christopher_Nolan). Returns film titles.',
            parameters: [
                { position: { key: 'director', value: '{{DIRECTOR}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Films by Steven Spielberg', director: 'Steven_Spielberg', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { film: { type: 'string' }, title: { type: 'string' } } } } } }
            }
        },
        querySparql: {
            method: 'GET',
            path: '/sparql',
            description: 'Execute a custom SPARQL query against the DBpedia knowledge graph. Uses the DBpedia ontology (dbo:, dbr:, dbp:) and standard RDF vocabularies.',
            parameters: [
                { position: { key: 'query', value: '{{SPARQL_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'application/sparql-results+json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Simple country query', query: "SELECT ?country ?label WHERE { ?country a dbo:Country . ?country rdfs:label ?label . FILTER(lang(?label) = 'en') } LIMIT 5" },
                { _description: 'Berlin abstract', query: "SELECT ?abstract WHERE { dbr:Berlin dbo:abstract ?abstract . FILTER(lang(?abstract) = 'en') }" }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { head: { type: 'object', properties: { vars: { type: 'array', items: { type: 'string' } } } }, results: { type: 'object', properties: { bindings: { type: 'array', items: { type: 'object' } } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    countriesWithCapitals: {
        preRequest: async ( { struct, payload } ) => {
            const limit = payload?.limit || 20
            const sparql = `SELECT DISTINCT ?country ?countryName ?capital ?capitalName WHERE { ?country a dbo:Country . ?country dbo:capital ?capital . ?country rdfs:label ?countryName . ?capital rdfs:label ?capitalName . FILTER(lang(?countryName) = 'en') FILTER(lang(?capitalName) = 'en') } LIMIT ${limit}`
            struct['queryParams'] = { query: sparql, format: 'application/sparql-results+json' }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const results = ( response?.results?.bindings || [] )
                .map( ( b ) => {
                    const item = { country: b.country?.value, countryName: b.countryName?.value, capital: b.capital?.value, capitalName: b.capitalName?.value }

                    return item
                } )

            return { response: { results } }
        }
    },
    entityLookup: {
        preRequest: async ( { struct, payload } ) => {
            const { resourceName } = payload
            const limit = payload?.limit || 25
            const sparql = `SELECT ?property ?value WHERE { dbr:${resourceName} ?property ?value . FILTER( lang(?value) = 'en' || datatype(?value) = xsd:integer || datatype(?value) = xsd:float || datatype(?value) = xsd:double || datatype(?value) = xsd:date || datatype(?value) = xsd:gYear ) } LIMIT ${limit}`
            struct['queryParams'] = { query: sparql, format: 'application/sparql-results+json' }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const results = ( response?.results?.bindings || [] )
                .map( ( b ) => {
                    const item = { property: b.property?.value, value: b.value?.value }

                    return item
                } )

            return { response: { results } }
        }
    },
    musiciansByGenre: {
        preRequest: async ( { struct, payload } ) => {
            const { genre } = payload
            const limit = payload?.limit || 20
            const sparql = `SELECT DISTINCT ?artist ?name WHERE { ?artist a dbo:MusicalArtist . ?artist dbo:genre dbr:${genre} . ?artist rdfs:label ?name . FILTER(lang(?name) = 'en') } LIMIT ${limit}`
            struct['queryParams'] = { query: sparql, format: 'application/sparql-results+json' }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const results = ( response?.results?.bindings || [] )
                .map( ( b ) => {
                    const item = { artist: b.artist?.value, name: b.name?.value }

                    return item
                } )

            return { response: { results } }
        }
    },
    universitiesByCountry: {
        preRequest: async ( { struct, payload } ) => {
            const { country } = payload
            const limit = payload?.limit || 20
            const sparql = `SELECT DISTINCT ?university ?name WHERE { ?university a dbo:University . ?university dbo:country dbr:${country} . ?university rdfs:label ?name . FILTER(lang(?name) = 'en') } LIMIT ${limit}`
            struct['queryParams'] = { query: sparql, format: 'application/sparql-results+json' }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const results = ( response?.results?.bindings || [] )
                .map( ( b ) => {
                    const item = { university: b.university?.value, name: b.name?.value }

                    return item
                } )

            return { response: { results } }
        }
    },
    filmsByDirector: {
        preRequest: async ( { struct, payload } ) => {
            const { director } = payload
            const limit = payload?.limit || 20
            const sparql = `SELECT DISTINCT ?film ?title WHERE { ?film a dbo:Film . ?film dbo:director dbr:${director} . ?film rdfs:label ?title . FILTER(lang(?title) = 'en') } LIMIT ${limit}`
            struct['queryParams'] = { query: sparql, format: 'application/sparql-results+json' }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const results = ( response?.results?.bindings || [] )
                .map( ( b ) => {
                    const item = { film: b.film?.value, title: b.title?.value }

                    return item
                } )

            return { response: { results } }
        }
    }
} )
