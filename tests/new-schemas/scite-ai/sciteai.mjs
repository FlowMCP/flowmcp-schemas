export const main = {
    namespace: 'sciteai',
    name: 'Scite.ai',
    description: 'Access smart citations showing whether research papers support, contrast, or mention claims. Search publications, get citation tallies, and explore citation relationships.',
    version: '2.0.0',
    docs: ['https://api.scite.ai/docs'],
    tags: ['science', 'citations', 'research', 'publications', 'academic', 'cacheTtlDaily'],
    root: 'https://api.scite.ai',
    requiredServerParams: ['SCITE_API_KEY'],
    headers: {
        'Authorization': 'Bearer {{SCITE_API_KEY}}'
    },
    routes: {
        getTallies: {
            method: 'GET',
            path: '/tallies/:doi',
            description: 'Get smart citation tallies for a paper by DOI. Returns counts of supporting, contrasting, and mentioning citations.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get tallies for a Nature paper', doi: '10.1038/s41586-020-2649-2' },
                { _description: 'Get tallies for a PLOS ONE paper', doi: '10.1371/journal.pone.0001636' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { doi: { type: 'string' }, total: { type: 'number' }, supporting: { type: 'number' }, contrasting: { type: 'number' }, mentioning: { type: 'number' }, citingPublications: { type: 'number' } } }
            },
        },
        getPaper: {
            method: 'GET',
            path: '/papers/:doi',
            description: 'Get detailed metadata for a paper by DOI. Returns title, authors, journal, abstract, and publication details.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get paper details for a Nature paper', doi: '10.1038/s41586-020-2649-2' },
                { _description: 'Get paper details for a Science paper', doi: '10.1126/science.abc4730' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { doi: { type: 'string' }, title: { type: 'string' }, authors: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' } } } }, journal: { type: 'string' }, year: { type: 'number' }, abstract: { type: 'string' } } }
            },
        },
        searchPapers: {
            method: 'GET',
            path: '/api_partner/search',
            description: 'Search for papers by keyword, author, journal, or other criteria. Returns papers with citation tallies and smart citation classifications.',
            parameters: [
                { position: { key: 'term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'mode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(all,citations,papers)', options: ['optional()', 'default(all)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(10000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(date,total_cited,total_supported,total_contrasted,total_mentioned,total_citing_publications)', options: ['optional()'] } },
                { position: { key: 'sort_order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()'] } },
                { position: { key: 'author', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'journal', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date_from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date_to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for CRISPR papers', term: 'CRISPR gene editing', limit: 5 },
                { _description: 'Search for highly supported papers on COVID-19', term: 'COVID-19 vaccine efficacy', sort: 'total_supported', sort_order: 'desc', limit: 5 },
                { _description: 'Search for papers by author', author: 'Jennifer Doudna', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, title: { type: 'string' }, authors: { type: 'array' }, journal: { type: 'string' }, year: { type: 'number' }, tallies: { type: 'object', properties: { total: { type: 'number' }, supporting: { type: 'number' }, contrasting: { type: 'number' }, mentioning: { type: 'number' } } } } } } } }
            },
        },
        getCitingPapers: {
            method: 'GET',
            path: '/api_partner/citations/citing/:doi',
            description: 'Get papers that cite a given paper by DOI. Includes smart citation classification (supporting, contrasting, mentioning) for each citation.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'papers', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'tallies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get papers citing a Nature paper', doi: '10.1038/s41586-020-2649-2', limit: 5 },
                { _description: 'Get citing papers without full metadata', doi: '10.1371/journal.pone.0001636', papers: false, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { citations: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, type: { type: 'string' }, statement: { type: 'string' }, section: { type: 'string' } } } }, papers: { type: 'object' }, tallies: { type: 'object' } } }
            },
        },
        getCitedByPapers: {
            method: 'GET',
            path: '/api_partner/citations/cited_by/:doi',
            description: 'Get papers that a given paper cites (its references). Includes smart citation context for each reference.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'papers', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'tallies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Get references of a Nature paper', doi: '10.1038/s41586-020-2649-2' },
                { _description: 'Get references without tallies', doi: '10.1126/science.abc4730', tallies: false }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { citations: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, type: { type: 'string' }, statement: { type: 'string' }, section: { type: 'string' } } } }, papers: { type: 'object' }, tallies: { type: 'object' } } }
            },
        },
        getRecommendedPapers: {
            method: 'GET',
            path: '/api_partner/recommend-papers/:doi',
            description: 'Get recommended papers related to a given paper by DOI. Uses citation graph analysis to suggest relevant research.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get recommendations for a CRISPR paper', doi: '10.1126/science.1225829' },
                { _description: 'Get recommendations for a COVID paper', doi: '10.1038/s41586-020-2649-2' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { doi: { type: 'string' }, title: { type: 'string' }, authors: { type: 'array' }, journal: { type: 'string' }, year: { type: 'number' }, score: { type: 'number' } } } }
            },
        },
        getTalliesBySections: {
            method: 'GET',
            path: '/tallies/cited-by-sections/:doi',
            description: 'Get citation tallies broken down by section (Introduction, Methods, Results, Discussion) for a paper by DOI.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get section-level tallies for a Nature paper', doi: '10.1038/s41586-020-2649-2' },
                { _description: 'Get section tallies for a highly cited paper', doi: '10.1371/journal.pone.0001636' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { doi: { type: 'string' }, sections: { type: 'object', properties: { introduction: { type: 'object', properties: { supporting: { type: 'number' }, contrasting: { type: 'number' }, mentioning: { type: 'number' } } }, methods: { type: 'object' }, results: { type: 'object' }, discussion: { type: 'object' } } } } }
            },
        },
        getJournalTallies: {
            method: 'GET',
            path: '/journal/:issn/tallies',
            description: 'Get aggregate smart citation tallies for all papers in a journal by ISSN. Shows overall supporting, contrasting, and mentioning counts.',
            parameters: [
                { position: { key: 'issn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get tallies for Nature (ISSN 0028-0836)', issn: '0028-0836' },
                { _description: 'Get tallies for PLOS ONE (ISSN 1932-6203)', issn: '1932-6203' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { issn: { type: 'string' }, total: { type: 'number' }, supporting: { type: 'number' }, contrasting: { type: 'number' }, mentioning: { type: 'number' } } }
            },
        },
    },
}
