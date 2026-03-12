export const main = {
    namespace: 'lensorg',
    name: 'Lens.org',
    description: 'Search and access 140M+ patents and 260M+ scholarly works from Lens.org. Cross-linked patent and scholarly data with citation analysis, legal status, and open access metadata.',
    version: '3.0.0',
    docs: ['https://docs.api.lens.org/getting-started.html'],
    tags: ['science', 'patents', 'research', 'publications', 'citations', 'openaccess', 'cacheTtlDaily'],
    root: 'https://api.lens.org',
    requiredServerParams: ['LENS_API_KEY'],
    headers: {
        'Authorization': 'Bearer {{LENS_API_KEY}}',
        'Content-Type': 'application/json'
    },
    tools: {
        searchScholarlyWorks: {
            method: 'POST',
            path: '/scholarly/search',
            description: 'Search 260M+ scholarly works using Elasticsearch-style queries. Supports boolean (must/should/must_not), match, term, range, and query_string queries across 50+ fields including title, abstract, authors, DOI, year, citations, and open access status.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'stemming', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Search for machine learning papers', query: 'machine learning', size: 3 },
                { _description: 'Search for CRISPR research published after 2020', query: 'CRISPR AND year_published:>2020', size: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        max_score: { type: 'number' },
                        results: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { lens_id: { type: 'string' }, title: { type: 'string' }, abstract: { type: 'string' }, date_published: { type: 'string' }, year_published: { type: 'number' }, publication_type: { type: 'string' }, authors: { type: 'array' }, source: { type: 'object' }, external_ids: { type: 'array' }, scholarly_citations_count: { type: 'number' }, patent_citations_count: { type: 'number' }, references_count: { type: 'number' }, open_access: { type: 'object' } } } }
                    }
                }
            },
        },
        getScholarlyWork: {
            method: 'GET',
            path: '/scholarly/:lensId',
            description: 'Retrieve a single scholarly work by its Lens ID. Returns full metadata including title, authors, abstract, DOI, citations, references, open access status, and patent citation links.',
            parameters: [
                { position: { key: 'lensId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get scholarly work by Lens ID', lensId: '031-373-029-678-619' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        lens_id: { type: 'string' },
                        title: { type: 'string' },
                        abstract: { type: 'string' },
                        date_published: { type: 'string' },
                        year_published: { type: 'number' },
                        publication_type: { type: 'string' },
                        authors: { type: 'array' },
                        source: { type: 'object' },
                        external_ids: { type: 'array' },
                        scholarly_citations_count: { type: 'number' },
                        patent_citations_count: { type: 'number' },
                        references_count: { type: 'number' },
                        open_access: { type: 'object' },
                        mesh_terms: { type: 'array' },
                        fields_of_study: { type: 'array' }
                    }
                }
            },
        },
        searchPatents: {
            method: 'POST',
            path: '/patent/search',
            description: 'Search 140M+ patent documents using Elasticsearch-style queries. Query by title, abstract, claims, applicant, inventor, CPC/IPC classification, jurisdiction, legal status, and patent families. Supports boolean, term, match, range, and query_string queries.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'stemming', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Search for AI patents from IBM', query: 'artificial intelligence AND applicant.name:IBM', size: 3 },
                { _description: 'Search for granted US patents on CRISPR', query: 'CRISPR AND jurisdiction:US AND legal_status.patent_status:ACTIVE', size: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        max_score: { type: 'number' },
                        results: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { lens_id: { type: 'string' }, jurisdiction: { type: 'string' }, doc_number: { type: 'string' }, kind: { type: 'string' }, date_published: { type: 'string' }, title: { type: 'string' }, abstract: { type: 'string' }, applicants: { type: 'array' }, inventors: { type: 'array' }, owners: { type: 'array' }, classifications_cpc: { type: 'array' }, legal_status: { type: 'object' }, biblio: { type: 'object' }, families: { type: 'object' } } } }
                    }
                }
            },
        },
        getPatent: {
            method: 'GET',
            path: '/patent/:lensId',
            description: 'Retrieve a single patent document by its Lens ID. Returns full record including bibliographic data, claims, description, legal status, classifications, citations, and family information.',
            parameters: [
                { position: { key: 'lensId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get patent by Lens ID', lensId: '162-867-542-438-370' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        lens_id: { type: 'string' },
                        jurisdiction: { type: 'string' },
                        doc_number: { type: 'string' },
                        kind: { type: 'string' },
                        date_published: { type: 'string' },
                        title: { type: 'string' },
                        abstract: { type: 'string' },
                        claims: { type: 'array' },
                        applicants: { type: 'array' },
                        inventors: { type: 'array' },
                        owners: { type: 'array' },
                        classifications_cpc: { type: 'array' },
                        classifications_ipcr: { type: 'array' },
                        legal_status: { type: 'object' },
                        biblio: { type: 'object' },
                        families: { type: 'object' },
                        references_cited: { type: 'object' },
                        cited_by: { type: 'object' }
                    }
                }
            },
        },
        getScholarlySchema: {
            method: 'GET',
            path: '/schema/scholarly',
            description: 'Retrieve the full JSON schema definition for scholarly work records. Useful for understanding all available fields, types, and nested structures for building search queries.',
            parameters: [],
            tests: [
                { _description: 'Get scholarly schema definition' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        type: { type: 'string' },
                        properties: { type: 'object' }
                    }
                }
            },
        },
        getPatentSchema: {
            method: 'GET',
            path: '/schema/patent',
            description: 'Retrieve the full JSON schema definition for patent records. Useful for understanding all available fields, types, and nested structures for building patent search queries.',
            parameters: [],
            tests: [
                { _description: 'Get patent schema definition' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        type: { type: 'string' },
                        properties: { type: 'object' }
                    }
                }
            },
        },
        getScholarlyApiUsage: {
            method: 'GET',
            path: '/subscriptions/scholarly_api/usage',
            description: 'Check your current scholarly API usage including requests made, remaining quota, and rate limit status for the current billing period.',
            parameters: [],
            tests: [
                { _description: 'Get scholarly API usage stats' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        requests_made: { type: 'number' },
                        requests_remaining: { type: 'number' },
                        rate_limit: { type: 'number' }
                    }
                }
            },
        },
        getPatentApiUsage: {
            method: 'GET',
            path: '/subscriptions/patent_api/usage',
            description: 'Check your current patent API usage including requests made, remaining quota, and rate limit status for the current billing period.',
            parameters: [],
            tests: [
                { _description: 'Get patent API usage stats' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        requests_made: { type: 'number' },
                        requests_remaining: { type: 'number' },
                        rate_limit: { type: 'number' }
                    }
                }
            },
        }
    }
}
