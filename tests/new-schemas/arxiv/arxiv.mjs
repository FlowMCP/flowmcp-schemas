export const main = {
    namespace: 'arxiv',
    name: 'arXiv Preprint Archive',
    description: 'Search and retrieve scientific preprints from arXiv.org. Access 2M+ papers in physics, mathematics, computer science, biology, and more. Returns structured metadata parsed from Atom/XML. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://info.arxiv.org/help/api/index.html', 'https://info.arxiv.org/help/api/user-manual.html'],
    tags: ['science', 'research', 'preprints', 'openaccess', 'cacheTtlDaily'],
    root: 'https://export.arxiv.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchPapers: {
            method: 'GET',
            path: '/api/query',
            description: 'Search arXiv papers by keyword across all fields. Returns title, authors, abstract, categories, and links. Use field prefixes for targeted search: ti: (title), au: (author), abs: (abstract), cat: (category).',
            parameters: [
                { position: { key: 'searchQuery', value: '{{SEARCH_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'maxResults', value: '{{MAX_RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'sortBy', value: '{{SORT_BY}}', location: 'query' }, z: { primitive: 'enum(relevance,lastUpdatedDate,submittedDate)', options: ['optional()', 'default(relevance)'] } },
                { position: { key: 'sortOrder', value: '{{SORT_ORDER}}', location: 'query' }, z: { primitive: 'enum(ascending,descending)', options: ['optional()', 'default(descending)'] } }
            ],
            tests: [
                { _description: 'Search for machine learning papers', searchQuery: 'all:machine%20learning', maxResults: 5 },
                { _description: 'Search for quantum computing by title', searchQuery: 'ti:quantum%20computing', maxResults: 3, sortBy: 'submittedDate' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, startIndex: { type: 'number' }, papers: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, summary: { type: 'string' }, authors: { type: 'array', items: { type: 'string' } }, published: { type: 'string' }, updated: { type: 'string' }, categories: { type: 'array', items: { type: 'string' } }, primaryCategory: { type: 'string' }, pdfUrl: { type: 'string' }, doi: { type: 'string' } } } } } }
            }
        },
        searchByAuthor: {
            method: 'GET',
            path: '/api/query',
            description: 'Search arXiv papers by author name. Returns papers authored or co-authored by the specified person.',
            parameters: [
                { position: { key: 'author', value: '{{AUTHOR}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'maxResults', value: '{{MAX_RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'sortBy', value: '{{SORT_BY}}', location: 'query' }, z: { primitive: 'enum(relevance,lastUpdatedDate,submittedDate)', options: ['optional()', 'default(submittedDate)'] } }
            ],
            tests: [
                { _description: 'Papers by Yann LeCun', author: 'LeCun', maxResults: 5 },
                { _description: 'Papers by Geoffrey Hinton', author: 'Hinton', maxResults: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, papers: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, authors: { type: 'array', items: { type: 'string' } }, published: { type: 'string' }, categories: { type: 'array', items: { type: 'string' } }, pdfUrl: { type: 'string' } } } } } }
            }
        },
        searchByCategory: {
            method: 'GET',
            path: '/api/query',
            description: 'Browse recent arXiv papers in a specific category. Common categories: cs.AI, cs.LG, cs.CL, math.CO, physics.hep-th, astro-ph.GA, q-bio.NC, stat.ML.',
            parameters: [
                { position: { key: 'category', value: '{{CATEGORY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'maxResults', value: '{{MAX_RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Recent AI papers', category: 'cs.AI', maxResults: 5 },
                { _description: 'Recent ML papers', category: 'cs.LG', maxResults: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, papers: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, authors: { type: 'array', items: { type: 'string' } }, published: { type: 'string' }, primaryCategory: { type: 'string' }, pdfUrl: { type: 'string' } } } } } }
            }
        },
        getPaperById: {
            method: 'GET',
            path: '/api/query',
            description: 'Retrieve a specific arXiv paper by its ID (e.g. 2301.07041). Returns full metadata including abstract, all authors, categories, and optional DOI/journal reference.',
            parameters: [
                { position: { key: 'paperId', value: '{{PAPER_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get specific paper', paperId: '2301.07041' },
                { _description: 'Get attention paper', paperId: '1706.03762' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { paper: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, summary: { type: 'string' }, authors: { type: 'array', items: { type: 'string' } }, published: { type: 'string' }, updated: { type: 'string' }, categories: { type: 'array', items: { type: 'string' } }, primaryCategory: { type: 'string' }, pdfUrl: { type: 'string' }, doi: { type: 'string' }, journalRef: { type: 'string' }, comment: { type: 'string' } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const parseAtomEntries = ( xml ) => {
        const totalResults = parseInt( xml.match( /<opensearch:totalResults>(\d+)</ )?.[1] || '0' )
        const startIndex = parseInt( xml.match( /<opensearch:startIndex>(\d+)</ )?.[1] || '0' )
        const entryBlocks = xml.split( '<entry>' ).slice( 1 )
        const papers = entryBlocks
            .map( ( entry ) => {
                const id = ( entry.match( /<id>(.*?)<\/id>/ )?.[1] || '' ).replace( /https?:\/\/arxiv\.org\/abs\//, '' ).replace( /v\d+$/, '' )
                const title = ( entry.match( /<title>([\s\S]*?)<\/title>/ )?.[1] || '' ).replace( /\s+/g, ' ' ).trim()
                const summary = ( entry.match( /<summary>([\s\S]*?)<\/summary>/ )?.[1] || '' ).replace( /\s+/g, ' ' ).trim()
                const published = entry.match( /<published>(.*?)<\/published>/ )?.[1] || ''
                const updated = entry.match( /<updated>(.*?)<\/updated>/ )?.[1] || ''
                const authors = [ ...entry.matchAll( /<author>\s*<name>(.*?)<\/name>/g ) ].map( ( m ) => m[1] )
                const categories = [ ...entry.matchAll( /<category term="(.*?)"/g ) ].map( ( m ) => m[1] )
                const primaryCategory = entry.match( /<arxiv:primary_category term="(.*?)"/ )?.[1] || categories[0] || ''
                const pdfUrl = entry.match( /href="(https?:\/\/arxiv\.org\/pdf\/[^"]+)"/ )?.[1] || ''
                const doi = entry.match( /<arxiv:doi>(.*?)<\/arxiv:doi>/ )?.[1] || null
                const journalRef = entry.match( /<arxiv:journal_ref>(.*?)<\/arxiv:journal_ref>/ )?.[1] || null
                const comment = entry.match( /<arxiv:comment>(.*?)<\/arxiv:comment>/ )?.[1] || null

                const item = { id, title, summary, authors, published, updated, categories, primaryCategory, pdfUrl }
                if( doi ) { item.doi = doi }
                if( journalRef ) { item.journalRef = journalRef }
                if( comment ) { item.comment = comment }

                return item
            } )

        return { totalResults, startIndex, papers }
    }

    return {
        searchPapers: {
            preRequest: async ( { struct, payload } ) => {
                const { searchQuery } = payload
                const start = payload?.start || 0
                const maxResults = payload?.maxResults || 10
                const sortBy = payload?.sortBy || 'relevance'
                const sortOrder = payload?.sortOrder || 'descending'
                struct['queryParams'] = { search_query: searchQuery, start, max_results: maxResults, sortBy, sortOrder }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseAtomEntries( xml )

                return { response: parsed }
            }
        },
        searchByAuthor: {
            preRequest: async ( { struct, payload } ) => {
                const { author } = payload
                const start = payload?.start || 0
                const maxResults = payload?.maxResults || 10
                const sortBy = payload?.sortBy || 'submittedDate'
                struct['queryParams'] = { search_query: `au:${author}`, start, max_results: maxResults, sortBy, sortOrder: 'descending' }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseAtomEntries( xml )

                return { response: parsed }
            }
        },
        searchByCategory: {
            preRequest: async ( { struct, payload } ) => {
                const { category } = payload
                const start = payload?.start || 0
                const maxResults = payload?.maxResults || 10
                struct['queryParams'] = { search_query: `cat:${category}`, start, max_results: maxResults, sortBy: 'submittedDate', sortOrder: 'descending' }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseAtomEntries( xml )

                return { response: parsed }
            }
        },
        getPaperById: {
            preRequest: async ( { struct, payload } ) => {
                const { paperId } = payload
                struct['queryParams'] = { id_list: paperId }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const { papers } = parseAtomEntries( xml )
                const paper = papers[0] || null

                return { response: { paper } }
            }
        }
    }
}
