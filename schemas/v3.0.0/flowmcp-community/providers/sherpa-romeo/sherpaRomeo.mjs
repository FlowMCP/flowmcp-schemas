export const main = {
    namespace: 'sherparomeo',
    name: 'SHERPA/RoMEO',
    description: 'Query publisher open access policies and journal self-archiving permissions via the SHERPA/RoMEO API. Check if journals allow preprint or postprint archiving.',
    version: '3.0.0',
    docs: ['https://v2.sherpa.ac.uk/api/', 'https://v2.sherpa.ac.uk/romeo/'],
    tags: ['academic', 'publishing', 'openaccess', 'research', 'cacheTtlDaily'],
    root: 'https://v2.sherpa.ac.uk/cgi',
    requiredServerParams: ['SHERPA_API_KEY'],
    headers: {},
    tools: {
        searchPublications: {
            method: 'GET',
            path: '/retrieve',
            description: 'Search for journal or publisher open access policies. Filter by ISSN, title, or publisher name. Returns self-archiving permissions and embargo periods.',
            parameters: [
                { position: { key: 'item-type', value: 'publication', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api-key', value: '{{SERVER_PARAM:SHERPA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'Json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search Nature journal by ISSN', filter: '[[\"issn\",\"equals\",\"0028-0836\"]]' },
                { _description: 'Search by journal title', filter: '[[\"title\",\"contains word\",\"ecology\"]]', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'array' }, issns: { type: 'array' }, publisher_policy: { type: 'array' } } } } } }
            },
        },
        searchPublishers: {
            method: 'GET',
            path: '/retrieve',
            description: 'Search for publishers and their open access policies. Returns publisher details and associated policy information.',
            parameters: [
                { position: { key: 'item-type', value: 'publisher', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api-key', value: '{{SERVER_PARAM:SHERPA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'Json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for Elsevier publisher', filter: '[[\"name\",\"contains word\",\"Elsevier\"]]' },
                { _description: 'Search for Springer publisher', filter: '[[\"name\",\"contains word\",\"Springer\"]]', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'array' }, country: { type: 'string' }, publication_count: { type: 'number' } } } } } }
            },
        },
        getPublicationById: {
            method: 'GET',
            path: '/retrieve_by_id',
            description: 'Get detailed open access policy information for a specific journal by its SHERPA ID.',
            parameters: [
                { position: { key: 'item-type', value: 'publication', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api-key', value: '{{SERVER_PARAM:SHERPA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'Json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'item-id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Nature journal policy by ID', 'item-id': 14845 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'array' }, issns: { type: 'array' }, publisher_policy: { type: 'array' }, publisher: { type: 'object' } } } } } }
            },
        }
    }
}
