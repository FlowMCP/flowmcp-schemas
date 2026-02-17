// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "context7" -> "context"

export const main = {
    namespace: 'context',
    name: 'Context7 Library Docs',
    description: 'Accesses searchable documentation and examples for programming libraries using Context7.',
    version: '2.0.0',
    docs: ['https://context7.com/docs'],
    tags: ['documentation', 'search', 'developer', 'cacheTtlStatic'],
    root: 'https://context7.com/api',
    headers: {
        'X-Context7-Source': 'mcp-server'
    },
    routes: {
        searchLibraryId: {
            method: 'GET',
            path: '/v1/search',
            description: 'Resolves a library name into a Context7-compatible library ID and returns top matches.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getLibraryDocs: {
            method: 'GET',
            path: '/v1/{{libraryId}}',
            description: 'Fetches documentation for a specific library using its Context7-compatible library ID.',
            parameters: [
                { position: { key: 'libraryId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'tokens', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'topic', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchLibraryId: {
        postRequest: async ( { response, struct, payload } ) => {
            if( response.results === undefined ) {
            struct.status = false
            struct.messages.push( "No results found" )
            return { response }}
            response = response['results']

            return { response }
        }
    }
} )
