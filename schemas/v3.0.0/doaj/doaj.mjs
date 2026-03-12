export const main = {
    namespace: 'doaj',
    name: 'DOAJ',
    description: 'Search the Directory of Open Access Journals for open access journals and articles. Covers 20,000+ peer-reviewed journals and 10M+ articles across all disciplines.',
    version: '3.0.0',
    docs: ['https://doaj.org/api/v4/docs', 'https://doaj.org/'],
    tags: ['science', 'journals', 'openaccess', 'articles', 'research', 'cacheTtlDaily'],
    root: 'https://doaj.org/api',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchArticles: {
            method: 'GET',
            path: '/search/articles/:query',
            description: 'Search open access articles by query string. Supports Elasticsearch syntax with field shortcuts: title, doi, issn, publisher, abstract. Max 1000 results per search.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for machine learning articles', query: 'machine learning', pageSize: 5 },
                { _description: 'Search articles by DOI', query: 'doi:10.3389/fpsyg.2013.00479', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        page: { type: 'number' },
                        pageSize: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, bibjson: { type: 'object', properties: { title: { type: 'string' }, author: { type: 'array' }, abstract: { type: 'string' }, journal: { type: 'object' }, identifier: { type: 'array' } } } } } }
                    }
                }
            },
        },
        searchJournals: {
            method: 'GET',
            path: '/search/journals/:query',
            description: 'Search open access journals by query string. Supports field shortcuts: title, issn, publisher, license, username. Max 1000 results per search.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for biology journals', query: 'biology', pageSize: 5 },
                { _description: 'Search journals by ISSN', query: 'issn:2041-1723', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        page: { type: 'number' },
                        pageSize: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, bibjson: { type: 'object', properties: { title: { type: 'string' }, publisher: { type: 'object' }, subject: { type: 'array' }, license: { type: 'array' }, identifier: { type: 'array' } } } } } }
                    }
                }
            },
        },
        getArticle: {
            method: 'GET',
            path: '/articles/:articleId',
            description: 'Retrieve a single article record by its DOAJ ID. Returns full bibliographic metadata including title, authors, abstract, journal info, and identifiers.',
            parameters: [
                { position: { key: 'articleId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get article by DOAJ ID', articleId: '8e293ab318724851919f5dc8281388f4' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        bibjson: { type: 'object', properties: { title: { type: 'string' }, author: { type: 'array' }, abstract: { type: 'string' }, journal: { type: 'object' }, identifier: { type: 'array' }, year: { type: 'string' }, month: { type: 'string' } } }
                    }
                }
            },
        },
        getJournal: {
            method: 'GET',
            path: '/journals/:journalId',
            description: 'Retrieve a single journal record by its DOAJ ID. Returns full journal metadata including title, publisher, subjects, licenses, and ISSN identifiers.',
            parameters: [
                { position: { key: 'journalId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get journal by DOAJ ID', journalId: '9a775e6e55c54e3dbb11a1f892741b6b' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        bibjson: { type: 'object', properties: { title: { type: 'string' }, publisher: { type: 'object' }, subject: { type: 'array' }, license: { type: 'array' }, identifier: { type: 'array' }, apc: { type: 'object' } } }
                    }
                }
            },
        }
    }
}
