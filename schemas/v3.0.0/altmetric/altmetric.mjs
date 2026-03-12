export const main = {
    namespace: 'altmetric',
    name: 'Altmetric',
    description: 'Access Altmetric attention scores and social media mentions for scholarly articles. Track news coverage, policy citations, patent mentions, blog posts, and social media activity for research outputs identified by DOI, PubMed ID, arXiv ID, or ISBN.',
    version: '3.0.0',
    docs: ['https://docs.altmetric.com/detail-pages-api/'],
    tags: ['science', 'metrics', 'socialmedia', 'research', 'citations', 'cacheTtlDaily'],
    root: 'https://api.altmetric.com/v1',
    requiredServerParams: ['ALTMETRIC_API_KEY'],
    headers: {},
    tools: {
        getByDoi: {
            method: 'GET',
            path: '/doi/:doi',
            description: 'Get Altmetric attention data for a scholarly article by its DOI. Returns attention score, mention counts by source, and basic bibliographic metadata.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Altmetric data for a highly-cited Nature article', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        score: { type: 'number' },
                        title: { type: 'string' },
                        doi: { type: 'string' },
                        pmid: { type: 'string' },
                        cited_by_tweeters_count: { type: 'number' },
                        cited_by_feeds_count: { type: 'number' },
                        cited_by_msm_count: { type: 'number' },
                        cited_by_policies_count: { type: 'number' },
                        cited_by_posts_count: { type: 'number' },
                        cited_by_rdts_count: { type: 'number' },
                        cited_by_wikipedia_count: { type: 'number' },
                        cited_by_patents_count: { type: 'number' }
                    }
                }
            },
        },
        getByPmid: {
            method: 'GET',
            path: '/pmid/:pmid',
            description: 'Get Altmetric attention data for a scholarly article by its PubMed ID.',
            parameters: [
                { position: { key: 'pmid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Altmetric data for a PubMed article', pmid: '23903782' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        score: { type: 'number' },
                        title: { type: 'string' },
                        pmid: { type: 'string' },
                        doi: { type: 'string' }
                    }
                }
            },
        },
        getByArxivId: {
            method: 'GET',
            path: '/arxiv/:arxivId',
            description: 'Get Altmetric attention data for a preprint by its arXiv ID.',
            parameters: [
                { position: { key: 'arxivId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Altmetric data for the Attention Is All You Need paper', arxivId: '1706.03762' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        score: { type: 'number' },
                        title: { type: 'string' },
                        arxiv_id: { type: 'string' }
                    }
                }
            },
        },
        getByIsbn: {
            method: 'GET',
            path: '/isbn/:isbn',
            description: 'Get Altmetric attention data for a book by its ISBN.',
            parameters: [
                { position: { key: 'isbn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Altmetric data for a book by ISBN', isbn: '9780199206650' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        score: { type: 'number' },
                        title: { type: 'string' },
                        isbn: { type: 'string' }
                    }
                }
            },
        },
        getByAltmetricId: {
            method: 'GET',
            path: '/id/:altmetricId',
            description: 'Get full Altmetric attention data by internal Altmetric ID. Useful for retrieving complete details after an initial lookup.',
            parameters: [
                { position: { key: 'altmetricId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Altmetric data by Altmetric ID', altmetricId: '1036951' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        score: { type: 'number' },
                        title: { type: 'string' },
                        doi: { type: 'string' },
                        details_url: { type: 'string' },
                        images: { type: 'object' }
                    }
                }
            },
        },
        fetchByDoi: {
            method: 'GET',
            path: '/fetch/doi/:doi',
            description: 'Fetch full Altmetric details for an article by DOI. Returns comprehensive data including attention score with context, demographic breakdown, individual posts/mentions, and badge images.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'include_sections', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch full details for a Nature article by DOI', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        altmetric_id: { type: 'number' },
                        counts: { type: 'object' },
                        citation: { type: 'object', properties: { title: { type: 'string' }, doi: { type: 'string' }, journal: { type: 'string' }, authors: { type: 'array' } } },
                        altmetric_score: { type: 'object', properties: { score: { type: 'number' }, context_for_score: { type: 'object' } } },
                        demographics: { type: 'object' },
                        posts: { type: 'object' },
                        images: { type: 'object' }
                    }
                }
            },
        },
        listCitations: {
            method: 'GET',
            path: '/citations/:timeframe',
            description: 'List trending research outputs with highest Altmetric attention scores in a given timeframe. Filter by source type, DOI prefix, or journal ISSN.',
            parameters: [
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(at,1d,2d,3d,4d,5d,6d,1w,1m,3m,1y)', options: [] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:ALTMETRIC_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'num_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(99)'] } },
                { position: { key: 'cited_in', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'doi_prefix', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(score,at_score,readers,first_seen,pubdate)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get top trending articles in the last week', timeframe: '1w', num_results: 5 },
                { _description: 'Get articles mentioned in news in the last month', timeframe: '1m', cited_in: 'news', num_results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        query: { type: 'object', properties: { total: { type: 'number' }, page: { type: 'number' }, num_results: { type: 'number' } } },
                        results: { type: 'array', items: { type: 'object', properties: { altmetric_id: { type: 'number' }, score: { type: 'number' }, title: { type: 'string' }, doi: { type: 'string' }, journal: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}
