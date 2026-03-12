export const main = {
    namespace: 'europeanparliament',
    name: 'European Parliament',
    description: 'Access European Parliament open data including MEP profiles, committees, political groups, and parliamentary documents via the EP Open Data Portal.',
    version: '3.0.0',
    docs: ['https://data.europarl.europa.eu/en/developer-corner/opendata-api'],
    tags: ['politics', 'europe', 'government', 'parliament', 'cacheTtlDaily'],
    root: 'https://data.europarl.europa.eu/api/v1',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    tools: {
        listMeps: {
            method: 'GET',
            path: '/meps',
            description: 'List Members of the European Parliament (MEPs). Returns MEP profiles with name, country, political group, and national party information.',
            parameters: [
                { position: { key: 'format', value: 'application/json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'List first 10 MEPs', limit: 10 },
                { _description: 'List MEPs with offset', offset: 20, limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' } } } } } }
            },
        },
        getMep: {
            method: 'GET',
            path: '/meps/:mepId',
            description: 'Get detailed information about a specific MEP including biography, committee memberships, and contact details.',
            parameters: [
                { position: { key: 'format', value: 'application/json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mepId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get specific MEP details', mepId: '124831' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' }, notation: { type: 'string' } } }
            },
        },
        listCorporateBodies: {
            method: 'GET',
            path: '/corporate-bodies',
            description: 'List corporate bodies of the European Parliament including political groups, committees, delegations, and other organizational structures.',
            parameters: [
                { position: { key: 'format', value: 'application/json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'List parliamentary corporate bodies', limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' }, type: { type: 'string' } } } } } }
            },
        },
        listDocuments: {
            method: 'GET',
            path: '/documents',
            description: 'List parliamentary documents including legislative resolutions, opinions, declarations, and recommendations.',
            parameters: [
                { position: { key: 'format', value: 'application/json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List recent parliamentary documents', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, date: { type: 'string' } } } } } }
            },
        }
    }
}
