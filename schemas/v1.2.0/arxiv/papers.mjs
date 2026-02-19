export const schema = {
    namespace: 'arxiv',
    name: 'arXiv Papers API',
    description: 'Search and retrieve academic papers from arXiv.org — query by keyword, author, category, or paper ID. Returns structured paper metadata including title, authors, abstract, and PDF links.',
    docs: ['https://info.arxiv.org/help/api/index.html'],
    tags: ['science', 'research', 'papers', 'academic', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://export.arxiv.org/api',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchPapers: {
            requestMethod: 'GET',
            description: 'Search arXiv papers by keyword across all fields (title, abstract, author). Supports pagination and sorting.',
            route: '/query',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(10)', 'optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,lastUpdatedDate,submittedDate)', options: ['default(relevance)', 'optional()'] } },
                { position: { key: 'sortOrder', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ascending,descending)', options: ['default(descending)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for machine learning papers', query: 'machine+learning', max_results: 3 },
                { _description: 'Search for transformer papers sorted by date', query: 'transformer+architecture', sortBy: 'submittedDate', max_results: 3 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildSearchQuery' },
                { phase: 'execute', handlerName: 'fetchAtomXml' },
                { phase: 'post', handlerName: 'parseAtomXml' }
            ]
        },
        getPaper: {
            requestMethod: 'GET',
            description: 'Get a specific paper by its arXiv ID. Returns full metadata including title, authors, abstract, categories, and PDF link.',
            route: '/query',
            parameters: [
                { position: { key: 'id_list', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get paper by arXiv ID', id_list: '2301.07041' },
                { _description: 'Get attention is all you need paper', id_list: '1706.03762' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'fetchAtomXml' },
                { phase: 'post', handlerName: 'parseAtomXml' }
            ]
        },
        getByAuthor: {
            requestMethod: 'GET',
            description: 'Search arXiv papers by author name. Supports pagination and sorting.',
            route: '/query',
            parameters: [
                { position: { key: 'author', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(10)', 'optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,lastUpdatedDate,submittedDate)', options: ['default(relevance)', 'optional()'] } },
                { position: { key: 'sortOrder', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ascending,descending)', options: ['default(descending)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search papers by Geoffrey Hinton', author: 'hinton', max_results: 3 },
                { _description: 'Search papers by Yann LeCun', author: 'lecun', max_results: 3 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildAuthorQuery' },
                { phase: 'execute', handlerName: 'fetchAtomXml' },
                { phase: 'post', handlerName: 'parseAtomXml' }
            ]
        },
        getByCategory: {
            requestMethod: 'GET',
            description: 'Get latest papers in a specific arXiv category. Categories include cs.AI, cs.LG, cs.CL, math.CO, physics, quant-ph, etc.',
            route: '/query',
            parameters: [
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'max_results', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(10)', 'optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,lastUpdatedDate,submittedDate)', options: ['default(submittedDate)', 'optional()'] } },
                { position: { key: 'sortOrder', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ascending,descending)', options: ['default(descending)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get latest AI papers', category: 'cs.AI', sortBy: 'submittedDate', max_results: 3 },
                { _description: 'Get latest machine learning papers', category: 'cs.LG', sortBy: 'submittedDate', max_results: 3 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'buildCategoryQuery' },
                { phase: 'execute', handlerName: 'fetchAtomXml' },
                { phase: 'post', handlerName: 'parseAtomXml' }
            ]
        }
    },
    handlers: {
        buildSearchQuery: async ( { struct, payload, userParams } ) => {
            const { query } = userParams
            const url = new URL( payload.url )
            url.searchParams.delete( 'query' )
            url.searchParams.set( 'search_query', `all:${query}` )
            payload.url = url.toString()

            return { struct, payload }
        },
        buildAuthorQuery: async ( { struct, payload, userParams } ) => {
            const { author } = userParams
            const url = new URL( payload.url )
            url.searchParams.delete( 'author' )
            url.searchParams.set( 'search_query', `au:${author}` )
            payload.url = url.toString()

            return { struct, payload }
        },
        buildCategoryQuery: async ( { struct, payload, userParams } ) => {
            const { category } = userParams
            const url = new URL( payload.url )
            url.searchParams.delete( 'category' )
            url.searchParams.set( 'search_query', `cat:${category}` )
            payload.url = url.toString()

            return { struct, payload }
        },
        fetchAtomXml: async ( { struct, payload } ) => {
            try {
                const response = await fetch( payload.url, { method: 'GET' } )
                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )

                    return { struct, payload }
                }

                const text = await response.text()
                struct.data = text
                struct.status = true
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error fetching arXiv API: ${error.message}` )
            }

            return { struct, payload }
        },
        parseAtomXml: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const totalResultsMatch = xml.match( /<opensearch:totalResults>(\d+)<\/opensearch:totalResults>/ )
                const startIndexMatch = xml.match( /<opensearch:startIndex>(\d+)<\/opensearch:startIndex>/ )
                const totalResults = totalResultsMatch ? parseInt( totalResultsMatch[1], 10 ) : 0
                const startIndex = startIndexMatch ? parseInt( startIndexMatch[1], 10 ) : 0

                const entries = xml.split( '<entry>' ).slice( 1 )
                const papers = entries
                    .map( ( entry ) => {
                        const getTag = ( tag ) => {
                            const match = entry.match( new RegExp( `<${tag}[^>]*>([\\s\\S]*?)</${tag}>` ) )
                            const result = match ? match[1].trim() : null

                            return result
                        }

                        const authors = [ ...entry.matchAll( /<author>[\s\S]*?<name>([\s\S]*?)<\/name>/g ) ]
                            .map( ( m ) => m[1].trim() )

                        const categories = [ ...entry.matchAll( /category[^>]*term="([^"]+)"/g ) ]
                            .map( ( m ) => m[1] )

                        const pdfLink = entry.match( /link[^>]*href="([^"]+)"[^>]*title="pdf"/ )
                        const absLink = entry.match( /link[^>]*href="([^"]+)"[^>]*rel="alternate"/ )

                        const primaryCategory = entry.match( /primary_category[^>]*term="([^"]+)"/ )
                        const comment = getTag( 'arxiv:comment' )
                        const journalRef = getTag( 'arxiv:journal_ref' )
                        const doi = getTag( 'arxiv:doi' )

                        const result = {
                            id: getTag( 'id' ),
                            title: ( getTag( 'title' ) || '' ).replace( /\s+/g, ' ' ),
                            authors,
                            abstract: ( getTag( 'summary' ) || '' ).replace( /\s+/g, ' ' ).trim(),
                            published: getTag( 'published' ),
                            updated: getTag( 'updated' ),
                            primaryCategory: primaryCategory ? primaryCategory[1] : null,
                            categories,
                            pdfUrl: pdfLink ? pdfLink[1] : null,
                            absUrl: absLink ? absLink[1] : null,
                            comment: comment ? comment.replace( /\s+/g, ' ' ).trim() : null,
                            journalRef: journalRef || null,
                            doi: doi || null
                        }

                        return result
                    } )

                struct.data = {
                    totalResults,
                    startIndex,
                    paperCount: papers.length,
                    papers
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing arXiv Atom XML: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
