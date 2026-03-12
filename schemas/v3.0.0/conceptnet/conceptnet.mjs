// Schema for #363 — ConceptNet multilingual common-sense knowledge graph
// NOTE: API at api.conceptnet.io returned 502 during development (March 2026). Schema based on official docs.

export const main = {
    namespace: 'conceptnet',
    name: 'ConceptNet Knowledge Graph',
    description: 'Multilingual common-sense knowledge graph with 34M+ assertions. Look up concepts, query semantic relationships (IsA, UsedFor, PartOf, etc.), find related terms, and normalize natural language to concept URIs.',
    version: '3.0.0',
    docs: ['https://github.com/commonsense/conceptnet5/wiki/API', 'https://conceptnet.io/'],
    tags: ['nlp', 'knowledge-graph', 'semantics', 'linguistics', 'cacheTtlLong'],
    root: 'https://api.conceptnet.io',
    tools: {
        lookupConcept: {
            method: 'GET',
            path: '/c/{{LANGUAGE}}/{{TERM}}',
            description: 'Look up a concept by language and term. Returns all edges (relationships) connected to this concept, including related concepts, relationship types, and source information.',
            parameters: [
                { position: { key: 'LANGUAGE', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(en)', 'min(2)', 'max(3)'] } },
                { position: { key: 'TERM', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Look up the concept "cat" in English', LANGUAGE: 'en', TERM: 'cat', limit: 5 },
                { _description: 'Look up "Hund" in German', LANGUAGE: 'de', TERM: 'Hund', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        '@id': { type: 'string' },
                        edges: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    '@id': { type: 'string' },
                                    start: { type: 'object' },
                                    end: { type: 'object' },
                                    rel: { type: 'object' },
                                    weight: { type: 'number' },
                                    surfaceText: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        queryRelationships: {
            method: 'GET',
            path: '/query',
            description: 'Search for edges matching specific criteria. Filter by start concept, end concept, relationship type, or any combination. Useful for answering questions like "What is a cat?" or "What is used for cooking?".',
            parameters: [
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rel', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'node', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'What is a dog?', start: '/c/en/dog', rel: '/r/IsA', limit: 5 },
                { _description: 'Things used for cooking', end: '/c/en/cooking', rel: '/r/UsedFor', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        edges: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    '@id': { type: 'string' },
                                    start: { type: 'object' },
                                    end: { type: 'object' },
                                    rel: { type: 'object' },
                                    weight: { type: 'number' },
                                    surfaceText: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        findRelated: {
            method: 'GET',
            path: '/related/c/{{LANGUAGE}}/{{TERM}}',
            description: 'Find concepts most semantically related to a given term using ConceptNet Numberbatch word embeddings. Optionally filter results to a specific language.',
            parameters: [
                { position: { key: 'LANGUAGE', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(en)', 'min(2)', 'max(3)'] } },
                { position: { key: 'TERM', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Terms related to "music" in English', LANGUAGE: 'en', TERM: 'music', filter: '/c/en', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        '@id': { type: 'string' },
                        related: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    '@id': { type: 'string' },
                                    weight: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
