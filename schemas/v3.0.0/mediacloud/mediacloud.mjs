export const main = {
    namespace: 'mediacloud',
    name: 'Media Cloud',
    description: 'Search and analyze news coverage across 50K+ online news sources worldwide. Access story counts, trending topics, word frequency analysis, source distribution, and language breakdowns from the Media Cloud Online News Archive.',
    version: '3.0.0',
    docs: ['https://www.mediacloud.org/documentation/search-api-guide', 'https://github.com/mediacloud/api-client'],
    tags: ['news', 'media', 'journalism', 'analysis', 'nlp', 'cacheTtlDaily'],
    root: 'https://search.mediacloud.org/api',
    requiredServerParams: [],
    headers: {},
    tools: {
        totalCount: {
            method: 'GET',
            path: '/search/total-count',
            description: 'Get the total number of stories matching a search query within a date range. Supports filtering by platform, source collection, or individual source.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cs', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ss', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Count stories about climate change in January 2025', q: 'climate change', start: '2025-01-01', end: '2025-01-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' }
                    }
                }
            },
        },
        countOverTime: {
            method: 'GET',
            path: '/search/count-over-time',
            description: 'Get story count over time for a search query, broken down by day. Useful for visualizing media attention trends and identifying spikes in coverage.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cs', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ss', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Track AI coverage over time in early 2025', q: 'artificial intelligence', start: '2025-01-01', end: '2025-03-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        counts: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, count: { type: 'number' } } } }
                    }
                }
            },
        },
        storyList: {
            method: 'GET',
            path: '/search/story-list',
            description: 'Retrieve a paginated list of stories matching a search query. Returns story metadata including title, URL, publication date, source, and language. Supports pagination via token.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page_size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'pagination_token', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort_order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()'] } },
                { position: { key: 'expanded', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'List recent stories about renewable energy', q: 'renewable energy', start: '2025-01-01', end: '2025-01-31', page_size: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { article_title: { type: 'string' }, url: { type: 'string' }, publication_date: { type: 'string' }, canonical_domain: { type: 'string' }, language: { type: 'string' } } } },
                        pagination_token: { type: 'string' }
                    }
                }
            },
        },
        sampleStories: {
            method: 'GET',
            path: '/search/sample',
            description: 'Retrieve a random sample of up to 1000 stories matching a search query. Useful for qualitative analysis and exploratory research without bias from sort ordering.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Sample stories about bitcoin in 2025', q: 'bitcoin', start: '2025-01-01', end: '2025-03-31', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { article_title: { type: 'string' }, url: { type: 'string' }, publication_date: { type: 'string' }, canonical_domain: { type: 'string' }, language: { type: 'string' } } } }
                    }
                }
            },
        },
        topWords: {
            method: 'GET',
            path: '/search/words',
            description: 'Get the most frequently used words in stories matching a search query. Useful for identifying key themes, framing, and language patterns in media coverage.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get top words in coverage about AI regulation', q: 'AI regulation', start: '2025-01-01', end: '2025-03-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        words: { type: 'array', items: { type: 'object', properties: { term: { type: 'string' }, count: { type: 'number' }, ratio: { type: 'number' } } } }
                    }
                }
            },
        },
        topSources: {
            method: 'GET',
            path: '/search/sources',
            description: 'Get the top sources publishing stories matching a search query. Useful for understanding which media outlets are driving coverage of a topic.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get top sources covering cryptocurrency', q: 'cryptocurrency', start: '2025-01-01', end: '2025-03-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        sources: { type: 'array', items: { type: 'object', properties: { source: { type: 'string' }, count: { type: 'number' } } } }
                    }
                }
            },
        },
        topLanguages: {
            method: 'GET',
            path: '/search/languages',
            description: 'Get the language distribution of stories matching a search query. Useful for understanding the global reach and multilingual coverage of a topic.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get language distribution for COVID coverage', q: 'COVID-19', start: '2025-01-01', end: '2025-03-31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        languages: { type: 'array', items: { type: 'object', properties: { language: { type: 'string' }, count: { type: 'number' }, ratio: { type: 'number' } } } }
                    }
                }
            },
        },
        getStory: {
            method: 'GET',
            path: '/search/story',
            description: 'Retrieve a single story by its ID and platform. Returns full story metadata including title, URL, publication date, source domain, and language.',
            parameters: [
                { position: { key: 'storyId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'platform', value: 'onlinenews', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific story by ID', storyId: '1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        article_title: { type: 'string' },
                        url: { type: 'string' },
                        publication_date: { type: 'string' },
                        canonical_domain: { type: 'string' },
                        language: { type: 'string' }
                    }
                }
            },
        }
    }
}
