export const main = {
    namespace: 'coreac',
    name: 'CORE',
    description: 'Search and access 200M+ open access research papers from CORE. Query works, outputs, data providers, and journals with full-text access and metadata from thousands of repositories worldwide.',
    version: '2.0.0',
    docs: ['https://api.core.ac.uk/docs/v3'],
    tags: ['science', 'openaccess', 'research', 'publications', 'repositories', 'cacheTtlDaily'],
    root: 'https://api.core.ac.uk/v3',
    requiredServerParams: ['CORE_API_KEY'],
    headers: {
        'Authorization': 'Bearer {{CORE_API_KEY}}'
    },
    routes: {
        searchWorks: {
            method: 'GET',
            path: '/search/works/',
            description: 'Search scholarly works across 200M+ records. Supports field-specific queries (title:"phrase", authors:Name, doi:10.xxx), boolean operators (AND, OR), range queries (yearPublished>=2020), and existence checks (_exists_:fullText).',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'scroll', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'stats', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for quantum computing papers', q: 'quantum computing', limit: 3 },
                { _description: 'Search for papers with full text by year range', q: 'deep learning AND yearPublished>=2023 AND _exists_:fullText', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalHits: { type: 'number' },
                        limit: { type: 'number' },
                        offset: { type: 'number' },
                        scrollId: { type: 'string' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, authors: { type: 'array' }, abstract: { type: 'string' }, doi: { type: 'string' }, yearPublished: { type: 'number' }, downloadUrl: { type: 'string' }, publisher: { type: 'string' }, documentType: { type: 'string' }, fieldOfStudy: { type: 'string' } } } }
                    }
                }
            },
        },
        getWork: {
            method: 'GET',
            path: '/works/:workId',
            description: 'Get detailed metadata for a specific work by its CORE ID. Returns full record including title, authors, abstract, DOI, full text, download URL, references, and linked outputs.',
            parameters: [
                { position: { key: 'workId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get work by CORE ID', workId: '3849028' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        authors: { type: 'array' },
                        contributors: { type: 'array' },
                        abstract: { type: 'string' },
                        doi: { type: 'string' },
                        arxivId: { type: 'string' },
                        pubmedId: { type: 'string' },
                        yearPublished: { type: 'number' },
                        publishedDate: { type: 'string' },
                        downloadUrl: { type: 'string' },
                        fullText: { type: 'string' },
                        publisher: { type: 'string' },
                        documentType: { type: 'string' },
                        fieldOfStudy: { type: 'string' },
                        citationCount: { type: 'number' },
                        references: { type: 'array' },
                        dataProviders: { type: 'array' },
                        outputs: { type: 'array' },
                        links: { type: 'array' }
                    }
                }
            },
        },
        searchOutputs: {
            method: 'GET',
            path: '/search/outputs/',
            description: 'Search individual research outputs (specific manifestations of works as deposited in repositories). Supports the same query syntax as searchWorks including field-specific and boolean queries.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'scroll', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'stats', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search outputs for climate change with full text', q: 'climate change AND _exists_:fullText', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalHits: { type: 'number' },
                        limit: { type: 'number' },
                        offset: { type: 'number' },
                        scrollId: { type: 'string' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, authors: { type: 'array' }, abstract: { type: 'string' }, doi: { type: 'string' }, downloadUrl: { type: 'string' }, language: { type: 'object' }, depositedDate: { type: 'string' } } } }
                    }
                }
            },
        },
        getOutput: {
            method: 'GET',
            path: '/outputs/:outputId',
            description: 'Retrieve a specific research output by its CORE output ID. Returns full metadata including title, authors, abstract, identifiers, dates, and download URL.',
            parameters: [
                { position: { key: 'outputId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific output by ID', outputId: '3849028' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        authors: { type: 'array' },
                        abstract: { type: 'string' },
                        doi: { type: 'string' },
                        downloadUrl: { type: 'string' },
                        fullText: { type: 'string' },
                        language: { type: 'object' },
                        depositedDate: { type: 'string' },
                        publishedDate: { type: 'string' },
                        updatedDate: { type: 'string' }
                    }
                }
            },
        },
        searchDataProviders: {
            method: 'GET',
            path: '/search/data-providers/',
            description: 'Search institutional and disciplinary repositories that provide content to CORE. Returns repository metadata including name, URL, location, and content statistics.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'stats', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for MIT repository', q: 'MIT', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalHits: { type: 'number' },
                        limit: { type: 'number' },
                        offset: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, email: { type: 'string' }, uri: { type: 'string' }, type: { type: 'string' }, location: { type: 'object' }, stats: { type: 'object' } } } }
                    }
                }
            },
        },
        searchJournals: {
            method: 'GET',
            path: '/search/journals/',
            description: 'Search academic journals indexed in CORE. Find journals by name, ISSN, publisher, or subject area.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'stats', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for biology journals', q: 'biology', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalHits: { type: 'number' },
                        limit: { type: 'number' },
                        offset: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, publisher: { type: 'string' }, subjects: { type: 'array' }, language: { type: 'string' }, identifiers: { type: 'array' } } } }
                    }
                }
            },
        },
        discoverFulltext: {
            method: 'POST',
            path: '/discover',
            description: 'Find fulltext download links for a paper by DOI or title. Returns a direct link to the open access PDF if available in CORE.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'title', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Discover fulltext link for a paper by DOI', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        fullTextLink: { type: 'string' },
                        source: { type: 'string' }
                    }
                }
            },
        }
    }
}
