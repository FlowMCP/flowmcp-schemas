export const main = {
    namespace: 'biorxiv',
    name: 'bioRxiv / medRxiv',
    description: 'Access bioRxiv and medRxiv preprint metadata including content details, publication records, publisher data, and summary statistics for scientific preprints.',
    version: '3.0.0',
    docs: ['https://api.biorxiv.org/'],
    tags: ['science', 'preprints', 'biology', 'medicine', 'research', 'cacheTtlDaily'],
    root: 'https://api.biorxiv.org',
    requiredServerParams: [],
    headers: {},
    tools: {
        getContentDetails: {
            method: 'GET',
            path: '/details/:server/:startDate/:endDate/:cursor',
            description: 'Get detailed preprint metadata for a date range. Returns title, authors, DOI, abstract, category, and version info. Paginated with 100 results per call.',
            parameters: [
                { position: { key: 'server', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(biorxiv,medrxiv)', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get bioRxiv preprints for a single day', server: 'biorxiv', startDate: '2024-01-15', endDate: '2024-01-15', cursor: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, title: { type: 'string' }, authors: { type: 'string' }, author_corresponding: { type: 'string' }, date: { type: 'string' }, category: { type: 'string' }, abstract: { type: 'string' }, version: { type: 'string' } } } }
                    }
                }
            },
        },
        getDetailsByDoi: {
            method: 'GET',
            path: '/details/:server/:doi/na/json',
            description: 'Get detailed metadata for a specific preprint by its DOI. Returns all versions and revision history.',
            parameters: [
                { position: { key: 'server', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(biorxiv,medrxiv)', options: [] } },
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get details for a specific bioRxiv preprint', server: 'biorxiv', doi: '10.1101/2024.01.01.573838' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, title: { type: 'string' }, authors: { type: 'string' }, abstract: { type: 'string' }, version: { type: 'string' }, type: { type: 'string' } } } }
                    }
                }
            },
        },
        getPublishedArticles: {
            method: 'GET',
            path: '/pubs/:server/:startDate/:endDate/:cursor',
            description: 'Get preprints that have been published in peer-reviewed journals within a date range. Returns DOI mappings between preprint and published versions.',
            parameters: [
                { position: { key: 'server', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(biorxiv,medrxiv)', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get published articles from bioRxiv for a date range', server: 'biorxiv', startDate: '2024-01-01', endDate: '2024-01-07', cursor: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { biorxiv_doi: { type: 'string' }, published_doi: { type: 'string' }, preprint_title: { type: 'string' }, published_journal: { type: 'string' }, published_date: { type: 'string' } } } }
                    }
                }
            },
        },
        getPublisherArticles: {
            method: 'GET',
            path: '/publisher/:prefix/:startDate/:endDate/:cursor',
            description: 'Get preprints published by a specific publisher using their DOI prefix. Returns preprint-to-journal mappings for the publisher.',
            parameters: [
                { position: { key: 'prefix', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get EMBO Press preprints (prefix 10.15252)', prefix: '10.15252', startDate: '2024-01-01', endDate: '2024-01-31', cursor: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { biorxiv_doi: { type: 'string' }, published_doi: { type: 'string' }, preprint_title: { type: 'string' }, published_journal: { type: 'string' } } } }
                    }
                }
            },
        },
        getSummaryStatistics: {
            method: 'GET',
            path: '/sum/:interval/json',
            description: 'Get summary statistics for bioRxiv and medRxiv submissions. Returns monthly or yearly counts of new papers, revised papers, and published articles.',
            parameters: [
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(m,y)', options: [] } }
            ],
            tests: [
                { _description: 'Get yearly summary statistics', interval: 'y' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { month: { type: 'string' }, new_papers_biorxiv: { type: 'number' }, new_papers_medrxiv: { type: 'number' }, revised_papers_biorxiv: { type: 'number' }, revised_papers_medrxiv: { type: 'number' } } } }
                    }
                }
            },
        },
        getUsageStatistics: {
            method: 'GET',
            path: '/usage/:interval/:server/json',
            description: 'Get usage statistics (abstract views and full-text downloads) for bioRxiv or medRxiv by monthly or yearly intervals.',
            parameters: [
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(m,y)', options: [] } },
                { position: { key: 'server', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(biorxiv,medrxiv)', options: [] } }
            ],
            tests: [
                { _description: 'Get yearly usage stats for bioRxiv', interval: 'y', server: 'biorxiv' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'array' },
                        collection: { type: 'array', items: { type: 'object', properties: { month: { type: 'string' }, abstract_views: { type: 'number' }, full_text_views: { type: 'number' }, pdf_downloads: { type: 'number' } } } }
                    }
                }
            },
        }
    }
}
