export const main = {
    namespace: 'deutschedigitalebibliothek',
    name: 'Deutsche Digitale Bibliothek',
    description: 'Access German cultural heritage data from the Deutsche Digitale Bibliothek (DDB) with 40M+ digitized objects from museums, archives, libraries, and monuments across Germany.',
    version: '3.0.0',
    docs: ['https://labs.deutsche-digitale-bibliothek.de/app/ddbapi/'],
    tags: ['culture', 'heritage', 'library', 'museum', 'archive', 'germany', 'cacheTtlDaily'],
    root: 'https://api.deutsche-digitale-bibliothek.de',
    requiredServerParams: ['DDB_API_KEY'],
    headers: {
        'Authorization': 'OAuth oauth_consumer_key="{{DDB_API_KEY}}"',
        'Accept': 'application/json'
    },
    tools: {
        searchItems: {
            method: 'GET',
            path: '/search',
            description: 'Search the DDB catalog for cultural heritage objects. Supports full-text queries with pagination and sorting. Returns matching items with metadata summaries.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'rows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(RELEVANCE,ALPHA_ASC,ALPHA_DESC,TIME_ASC,TIME_DESC)', options: ['optional()', 'default(RELEVANCE)'] } }
            ],
            tests: [
                { _description: 'Search for items about Berlin', query: 'Berlin', rows: 5, offset: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        numberOfResults: { type: 'number' },
                        results: { type: 'array' }
                    }
                }
            },
        },
        getItem: {
            method: 'GET',
            path: '/items/:id',
            description: 'Get detailed metadata for a specific cultural heritage item by its DDB item ID (32-character BASE32 identifier).',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get item details by ID', id: 'ZZPBZTREU77H2TBNLGBM3LBCCFSN4XGH' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        label: { type: 'string' },
                        fields: { type: 'object' }
                    }
                }
            },
        },
        getItemBinaries: {
            method: 'GET',
            path: '/items/:id/binaries',
            description: 'Get a list of available binary files (images, documents, media) for a specific DDB item.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get binaries for an item', id: 'ZZPBZTREU77H2TBNLGBM3LBCCFSN4XGH' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        binaries: { type: 'array' }
                    }
                }
            },
        },
        getItemChildren: {
            method: 'GET',
            path: '/items/:id/children',
            description: 'Get child items of a hierarchical DDB item (e.g., pages of a book, parts of a collection).',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get child items', id: 'ZZPBZTREU77H2TBNLGBM3LBCCFSN4XGH' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        children: { type: 'array' }
                    }
                }
            },
        },
        getItemView: {
            method: 'GET',
            path: '/items/:id/view',
            description: 'Get the display view data for a DDB item including rendered metadata fields and preview information.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get item view data', id: 'ZZPBZTREU77H2TBNLGBM3LBCCFSN4XGH' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        item: { type: 'object' }
                    }
                }
            },
        },
        listInstitutions: {
            method: 'GET',
            path: '/institutions',
            description: 'List contributing institutions (museums, libraries, archives) in the Deutsche Digitale Bibliothek. Filterable by sector.',
            parameters: [
                { position: { key: 'sector', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(sec_01,sec_02,sec_03,sec_04,sec_05,sec_06,sec_07)', options: ['optional()'] } },
                { position: { key: 'hasItems', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'List institutions with items', hasItems: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        institutions: { type: 'array' }
                    }
                }
            },
        },
        searchSuggest: {
            method: 'GET',
            path: '/search/suggest',
            description: 'Get autocomplete suggestions for a search query in the DDB catalog.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get search suggestions for Goethe', query: 'Goethe' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        suggestions: { type: 'array' }
                    }
                }
            },
        },
        getVersion: {
            method: 'GET',
            path: '/version',
            description: 'Get the current API version of the Deutsche Digitale Bibliothek.',
            parameters: [],
            tests: [
                { _description: 'Get API version' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        version: { type: 'string' }
                    }
                }
            },
        }
    }
}
