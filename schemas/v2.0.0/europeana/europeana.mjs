export const main = {
    namespace: 'europeana',
    name: 'Europeana',
    description: 'Search and access millions of cultural heritage items from European museums, libraries, archives, and galleries via the Europeana API.',
    version: '2.0.0',
    docs: ['https://pro.europeana.eu/page/search', 'https://pro.europeana.eu/page/record'],
    tags: ['culture', 'heritage', 'museums', 'europe', 'cacheTtlDaily'],
    root: 'https://api.europeana.eu',
    requiredServerParams: ['EUROPEANA_API_KEY'],
    headers: {},
    routes: {
        searchRecords: {
            method: 'GET',
            path: '/record/v2/search.json',
            description: 'Search for cultural heritage records across European collections. Filter by media type, provider, country, language, and copyright status.',
            parameters: [
                { position: { key: 'wskey', value: '{{SERVER_PARAM:EUROPEANA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(12)', 'max(100)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'qf', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'profile', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(minimal,standard,rich)', options: ['optional()', 'default(standard)'] } }
            ],
            tests: [
                { _description: 'Search for Mona Lisa', query: 'Mona Lisa', rows: 5 },
                { _description: 'Search for Van Gogh paintings', query: 'Van Gogh', qf: 'TYPE:IMAGE', rows: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, itemsCount: { type: 'number' }, totalResults: { type: 'number' }, items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'array' }, type: { type: 'string' }, edmPreview: { type: 'array' } } } } } }
            },
        },
        getRecord: {
            method: 'GET',
            path: '/record/v2/:recordId.json',
            description: 'Get full metadata for a specific cultural heritage record by its Europeana ID.',
            parameters: [
                { position: { key: 'wskey', value: '{{SERVER_PARAM:EUROPEANA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'recordId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific record', recordId: '9200579/ydg35rr4' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, object: { type: 'object', properties: { type: { type: 'string' }, title: { type: 'array' }, about: { type: 'string' } } } } }
            },
        }
    }
}
