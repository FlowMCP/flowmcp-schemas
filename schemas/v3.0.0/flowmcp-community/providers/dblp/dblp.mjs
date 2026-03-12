export const main = {
    namespace: 'dblp',
    name: 'DBLP',
    description: 'Search the DBLP computer science bibliography with 6+ million publications. Find research papers by title, search authors by name, and find publication venues (conferences and journals) in computer science.',
    docs: ['https://dblp.org/faq/How+to+use+the+dblp+search+API.html'],
    tags: ['bibliography', 'research', 'papers', 'academic', 'computerscience', 'opendata', 'cacheTtlDaily'],
    version: '3.0.0',
    root: 'https://dblp.org',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchPublications: {
            method: 'GET',
            path: '/search/publ/api',
            description: 'Search for computer science publications in DBLP by title, author, or keyword. Returns matching papers with title, authors, venue, year, and DOI.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(json)'] } },
                { position: { key: 'h', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for papers about transformer neural networks', q: 'transformer neural network', h: 10 },
                { _description: 'Search for blockchain consensus papers', q: 'blockchain consensus protocol', h: 10 },
                { _description: 'Search for large language model papers', q: 'large language model', h: 10 }
            ],
        },
        searchAuthors: {
            method: 'GET',
            path: '/search/author/api',
            description: 'Search for computer science researchers and authors in DBLP by name. Returns matching authors with their DBLP profile URLs and publication counts.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(json)'] } },
                { position: { key: 'h', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for researcher Yann LeCun', q: 'Yann LeCun', h: 5 },
                { _description: 'Search for author Geoffrey Hinton', q: 'Geoffrey Hinton', h: 5 },
                { _description: 'Search for Yoshua Bengio', q: 'Yoshua Bengio', h: 5 }
            ],
        },
        searchVenues: {
            method: 'GET',
            path: '/search/venue/api',
            description: 'Search for computer science publication venues (conferences and journals) in DBLP by name or acronym. Returns matching venues with their type, acronym, and DBLP URL.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(json)'] } },
                { position: { key: 'h', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for NeurIPS conference', q: 'NeurIPS', h: 5 },
                { _description: 'Search for ICML conference', q: 'ICML machine learning', h: 5 },
                { _description: 'Search for ACM computing journals', q: 'ACM Transactions', h: 10 }
            ],
        }
    },
}