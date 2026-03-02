export const main = {
    namespace: 'metmuseum',
    name: 'MetMuseum',
    description: 'Access the Metropolitan Museum of Art collection with 470K+ artworks — search by keyword, filter by department, retrieve full object details including images, artist info, and provenance. All data is CC0 licensed.',
    version: '2.0.0',
    docs: ['https://metmuseum.github.io/'],
    tags: ['art', 'museum', 'culture', 'opendata', 'cacheTtlStatic'],
    root: 'https://collectionapi.metmuseum.org/public/collection/v1',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchObjects: {
            method: 'GET',
            path: '/search',
            description: 'Search the Met collection by keyword. Returns a list of matching object IDs. Supports filtering by department, highlight status, date range, medium, and more.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'departmentId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'isHighlight', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'hasImages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'isOnView', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'medium', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'geoLocation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateBegin', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'dateEnd', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for sunflowers artworks', q: 'sunflowers' },
                { _description: 'Search for Van Gogh artworks that are highlights with images', q: 'van gogh', isHighlight: true, hasImages: true },
                { _description: 'Search for Japanese prints in Asian Art department', q: 'samurai', departmentId: 6 },
                { _description: 'Search for Egyptian artworks by geo location', q: 'sphinx', geoLocation: 'Egypt' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', description: 'Total number of matching objects' },
                        objectIDs: { type: 'array', description: 'Array of matching object IDs' }
                    }
                }
            }
        },
        getObject: {
            method: 'GET',
            path: '/objects/:objectID',
            description: 'Retrieve full details for a single artwork by its object ID. Returns title, artist, date, medium, dimensions, images, department, culture, provenance, and more.',
            parameters: [
                { position: { key: 'objectID', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get details for "Quail and Millet" by Kiyohara Yukinobu', objectID: 45734 },
                { _description: 'Get details for a funerary coffin from ancient Egypt', objectID: 546303 },
                { _description: 'Get details for a famous Van Gogh artwork', objectID: 436532 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        objectID: { type: 'number', description: 'Unique object identifier' },
                        title: { type: 'string', description: 'Artwork title' },
                        artistDisplayName: { type: 'string', description: 'Artist name as displayed' },
                        artistDisplayBio: { type: 'string', description: 'Artist biographical information' },
                        artistNationality: { type: 'string', description: 'Artist nationality' },
                        objectDate: { type: 'string', description: 'Date or date range of the artwork' },
                        medium: { type: 'string', description: 'Materials used (e.g. Oil on canvas)' },
                        dimensions: { type: 'string', description: 'Physical dimensions of the artwork' },
                        primaryImage: { type: 'string', description: 'URL to primary high-res image' },
                        primaryImageSmall: { type: 'string', description: 'URL to smaller version of primary image' },
                        additionalImages: { type: 'array', description: 'Additional image URLs' },
                        department: { type: 'string', description: 'Museum department name' },
                        culture: { type: 'string', description: 'Cultural origin' },
                        period: { type: 'string', description: 'Historical period' },
                        isHighlight: { type: 'boolean', description: 'Whether this is a highlight artwork' },
                        isPublicDomain: { type: 'boolean', description: 'Whether images are in public domain' },
                        creditLine: { type: 'string', description: 'Acquisition credit line' },
                        objectURL: { type: 'string', description: 'URL to artwork page on metmuseum.org' },
                        tags: { type: 'array', description: 'Subject keyword tags' }
                    }
                }
            }
        },
        getDepartments: {
            method: 'GET',
            path: '/departments',
            description: 'List all museum departments with their IDs and display names. Use department IDs to filter searches and object listings.',
            parameters: [],
            tests: [
                { _description: 'Get all museum departments' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        departments: {
                            type: 'array',
                            description: 'Array of department objects',
                            items: {
                                type: 'object',
                                properties: {
                                    departmentId: { type: 'number', description: 'Department identifier' },
                                    displayName: { type: 'string', description: 'Department name' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getObjects: {
            method: 'GET',
            path: '/objects',
            description: 'Get a list of all valid object IDs in the collection, optionally filtered by department or last update date. Returns up to 470K+ object IDs.',
            parameters: [
                { position: { key: 'metadataDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'departmentIds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all object IDs updated after a specific date', metadataDate: '2024-01-01' },
                { _description: 'Get all objects in the Egyptian Art department (ID 10)', departmentIds: '10' },
                { _description: 'Get objects in multiple departments', departmentIds: '1|3|6' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', description: 'Total number of objects matching filters' },
                        objectIDs: { type: 'array', description: 'Array of object IDs' }
                    }
                }
            }
        }
    }
}
