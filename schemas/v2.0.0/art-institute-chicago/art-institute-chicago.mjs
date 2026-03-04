export const main = {
    namespace: 'artinstitutechi',
    name: 'Art Institute of Chicago',
    description: 'Access the Art Institute of Chicago\'s collection of 130,000+ artworks. Search paintings, sculptures, photographs, and more by keyword, artist, date, or medium. Get high-resolution image URLs, detailed artwork metadata, and artist biographies. One of the largest art museums in the US. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://api.artic.edu/docs/'],
    tags: ['art', 'museum', 'culture', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.artic.edu',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchArtworks: {
            method: 'GET',
            path: '/api/v1/artworks/search',
            description: 'Full-text search across all artworks. Search by title, artist, medium, or any keyword. Returns artwork details including title, artist, date, medium, dimensions, and image ID for IIIF image URLs.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'fields', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(id,title,artist_display,date_display,medium_display,image_id,thumbnail)'] } }
            ],
            tests: [
                { _description: 'Search Monet artworks', q: 'monet', limit: 3 },
                { _description: 'Search impressionism', q: 'impressionism', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { pagination: { type: 'object', properties: { total: { type: 'number' }, limit: { type: 'number' }, total_pages: { type: 'number' }, current_page: { type: 'number' } } }, data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, artist_display: { type: 'string' }, date_display: { type: 'string' }, medium_display: { type: 'string' }, image_id: { type: 'string' }, thumbnail: { type: 'object', properties: { alt_text: { type: 'string' }, width: { type: 'number' }, height: { type: 'number' } } }, _score: { type: 'number' } } } }, config: { type: 'object', properties: { iiif_url: { type: 'string' } } } } }
            }
        },
        getArtwork: {
            method: 'GET',
            path: '/api/v1/artworks/:id',
            description: 'Get detailed information about a specific artwork by ID. Returns complete metadata including title, artist, date, medium, dimensions, provenance, exhibition history, and high-resolution image information.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get A Sunday on La Grande Jatte', id: 27992 },
                { _description: 'Get American Gothic', id: 6565 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, artist_display: { type: 'string' }, artist_title: { type: 'string' }, date_display: { type: 'string' }, medium_display: { type: 'string' }, dimensions: { type: 'string' }, credit_line: { type: 'string' }, place_of_origin: { type: 'string' }, classification_title: { type: 'string' }, style_title: { type: 'string' }, image_id: { type: 'string' }, is_public_domain: { type: 'boolean' }, provenance_text: { type: 'string' }, exhibition_history: { type: 'string' } } }, config: { type: 'object', properties: { iiif_url: { type: 'string' } } } } }
            }
        },
        searchArtists: {
            method: 'GET',
            path: '/api/v1/artists/search',
            description: 'Search artists in the Art Institute collection. Returns artist name, birth/death dates, nationality, and artwork count.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search Picasso', q: 'picasso', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { pagination: { type: 'object', properties: { total: { type: 'number' } } }, data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, birth_date: { type: 'number' }, death_date: { type: 'number' }, _score: { type: 'number' } } } } } }
            }
        },
        listArtworks: {
            method: 'GET',
            path: '/api/v1/artworks',
            description: 'Browse artworks with pagination. Returns all artworks sorted by ID. Use fields parameter to limit response size. Combine with search for filtered results.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(12)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'fields', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(id,title,artist_display,date_display,image_id)'] } }
            ],
            tests: [
                { _description: 'List first 3 artworks', limit: 3, fields: 'id,title,artist_display,date_display' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { pagination: { type: 'object', properties: { total: { type: 'number' }, limit: { type: 'number' }, total_pages: { type: 'number' }, current_page: { type: 'number' } } }, data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, artist_display: { type: 'string' }, date_display: { type: 'string' }, image_id: { type: 'string' } } } } } }
            }
        }
    }
}
