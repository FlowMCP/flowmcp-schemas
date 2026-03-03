export const main = {
    namespace: 'harvardart',
    name: 'Harvard Art Museums',
    description: 'Search and explore the Harvard Art Museums collection of over 250,000 objects. Access artwork metadata, artist information, exhibitions, and high-resolution images.',
    version: '2.0.0',
    docs: ['https://github.com/harvardartmuseums/api-docs', 'https://harvardartmuseums.org/collections/api'],
    tags: ['art', 'museums', 'culture', 'education', 'cacheTtlDaily'],
    root: 'https://api.harvardartmuseums.org',
    requiredServerParams: ['HARVARD_ART_API_KEY'],
    headers: {},
    routes: {
        searchObjects: {
            method: 'GET',
            path: '/object',
            description: 'Search the museum collection by keyword, classification, culture, or other criteria. Returns paginated object records with metadata and image URLs.',
            parameters: [
                { position: { key: 'apikey', value: '{{SERVER_PARAM:HARVARD_ART_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'classification', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'culture', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for paintings of flowers', q: 'flowers', classification: 'Paintings', size: 5 },
                { _description: 'Search for Japanese art', culture: 'Japanese', size: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { info: { type: 'object', properties: { totalrecords: { type: 'number' }, pages: { type: 'number' } } }, records: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, dated: { type: 'string' }, classification: { type: 'string' }, primaryimageurl: { type: 'string' } } } } } }
            },
        },
        getObject: {
            method: 'GET',
            path: '/object/:objectId',
            description: 'Get detailed information for a specific museum object by its ID. Returns full metadata including provenance, exhibition history, and image URLs.',
            parameters: [
                { position: { key: 'apikey', value: '{{SERVER_PARAM:HARVARD_ART_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'objectId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get object details', objectId: 299843 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, dated: { type: 'string' }, classification: { type: 'string' }, medium: { type: 'string' }, dimensions: { type: 'string' }, people: { type: 'array' }, primaryimageurl: { type: 'string' } } }
            },
        },
        searchPeople: {
            method: 'GET',
            path: '/person',
            description: 'Search for artists, makers, and other people associated with museum objects. Filter by name, culture, or date range.',
            parameters: [
                { position: { key: 'apikey', value: '{{SERVER_PARAM:HARVARD_ART_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'culture', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for Monet', q: 'Monet', size: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { info: { type: 'object' }, records: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, displayname: { type: 'string' }, culture: { type: 'string' }, objectcount: { type: 'number' } } } } } }
            },
        },
        listExhibitions: {
            method: 'GET',
            path: '/exhibition',
            description: 'List exhibitions at the Harvard Art Museums. Filter by date, venue, or keyword.',
            parameters: [
                { position: { key: 'apikey', value: '{{SERVER_PARAM:HARVARD_ART_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List recent exhibitions', size: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { info: { type: 'object' }, records: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, begindate: { type: 'string' }, enddate: { type: 'string' } } } } } }
            },
        }
    }
}
