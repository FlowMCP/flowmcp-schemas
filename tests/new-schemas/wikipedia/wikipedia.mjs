export const main = {
    namespace: 'wikipedia',
    name: 'WikipediaMediawiki',
    description: 'Access Wikipedia article summaries, full-text search, related pages, and page metadata via the public Wikipedia REST API and MediaWiki Action API.',
    docs: ['https://en.wikipedia.org/api/rest_v1/', 'https://www.mediawiki.org/wiki/API:Main_page', 'https://www.mediawiki.org/wiki/API:REST_API'],
    tags: ['knowledge', 'encyclopedia', 'search', 'wikipedia', 'reference', 'cacheTtlDaily'],
    version: '2.0.0',
    root: 'https://en.wikipedia.org',
    requiredServerParams: [],
    headers: { 'User-Agent': 'FlowMCP/2.0.0 (https://github.com/FlowMCP)' },
    routes: {
        getPageSummary: {
            method: 'GET',
            path: '/api/rest_v1/page/summary/:title',
            description: 'Get a short plain-text and HTML summary for a Wikipedia article by title, including description, thumbnail, and page URLs.',
            parameters: [
                { position: { key: 'title', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get summary for the Albert Einstein article', title: 'Albert_Einstein' },
                { _description: 'Get summary for the Python programming language article', title: 'Python_(programming_language)' },
                { _description: 'Get summary for Climate change article', title: 'Climate_change' }
            ],
        },
        searchArticles: {
            method: 'GET',
            path: '/w/api.php',
            description: 'Full-text search across all Wikipedia articles. Returns titles, snippets, word counts, and page sizes sorted by relevance.',
            parameters: [
                { position: { key: 'action', value: 'query', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'list', value: 'search', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'srsearch', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'srlimit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(50)'] } },
                { position: { key: 'sroffset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for articles about quantum computing', srsearch: 'quantum computing', srlimit: 5 },
                { _description: 'Search for CRISPR gene editing articles', srsearch: 'CRISPR gene editing', srlimit: 8 },
                { _description: 'Search for climate change articles with offset', srsearch: 'renewable energy', srlimit: 5, sroffset: 5 }
            ],
        },
        getRelatedPages: {
            method: 'GET',
            path: '/api/rest_v1/page/related/:title',
            description: 'Get pages related to a given Wikipedia article, based on topic similarity and link structure.',
            parameters: [
                { position: { key: 'title', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get pages related to Machine learning article', title: 'Machine_learning' },
                { _description: 'Get pages related to the DNA article', title: 'DNA' }
            ],
        },
        getPageSections: {
            method: 'GET',
            path: '/api/rest_v1/page/mobile-sections/:title',
            description: 'Get all sections of a Wikipedia article formatted for mobile, including lead section and body sections with HTML content.',
            parameters: [
                { position: { key: 'title', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get all sections of the Photosynthesis article', title: 'Photosynthesis' },
                { _description: 'Get all sections of the Solar_System article', title: 'Solar_System' }
            ],
        },
        getPageHistory: {
            method: 'GET',
            path: '/w/api.php',
            description: 'Retrieve the revision history of a Wikipedia article, listing recent edits with timestamps, editor usernames, and edit summaries.',
            parameters: [
                { position: { key: 'action', value: 'query', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'prop', value: 'revisions', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'titles', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'rvprop', value: 'ids|timestamp|user|comment', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rvlimit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(50)'] } }
            ],
            tests: [
                { _description: 'Get recent edit history for the JavaScript article', titles: 'JavaScript', rvlimit: 5 },
                { _description: 'Get revision history for the Artificial intelligence article', titles: 'Artificial_intelligence', rvlimit: 10 }
            ],
        }
    },
}