export const main = {
    namespace: 'abgeordnetenwatch',
    name: 'Abgeordnetenwatch',
    description: 'Access German politician profiles, parliament data, mandates, candidacies, and voting records via the Abgeordnetenwatch open data API (CC0 licensed).',
    version: '2.0.0',
    docs: ['https://www.abgeordnetenwatch.de/api'],
    tags: ['politics', 'germany', 'parliament', 'opendata', 'democracy', 'cacheTtlDaily'],
    root: 'https://www.abgeordnetenwatch.de/api/v2',
    requiredServerParams: [],
    headers: {},
    routes: {
        listPoliticians: {
            method: 'GET',
            path: '/politicians',
            description: 'List German politicians with filters for name, party, and parliament. Returns profile data, party affiliation, and links to mandates.',
            parameters: [
                { position: { key: 'label', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get first 10 politicians', pager_limit: 10 },
                { _description: 'Search for politicians named Mueller', label: 'Mueller', pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, total: { type: 'number' } } } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, first_name: { type: 'string' }, last_name: { type: 'string' }, party: { type: 'object' } } } }
                    }
                }
            },
        },
        getPolitician: {
            method: 'GET',
            path: '/politicians/:id',
            description: 'Get detailed profile of a specific politician including party, occupation, residence, and links to mandates and candidacies.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'related_data', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get politician profile for ID 79137', id: 79137 },
                { _description: 'Get politician with related data info', id: 79137, related_data: 'show_information' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, first_name: { type: 'string' }, last_name: { type: 'string' }, sex: { type: 'string' }, year_of_birth: { type: 'string' }, party: { type: 'object' }, occupation: { type: 'string' } } }
                    }
                }
            },
        },
        listParliaments: {
            method: 'GET',
            path: '/parliaments',
            description: 'List all parliaments tracked by Abgeordnetenwatch (Bundestag, Landtage, EU Parliament, etc.).',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } }
            ],
            tests: [
                { _description: 'List all parliaments', pager_limit: 50 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, abgeordnetenwatch_url: { type: 'string' } } } }
                    }
                }
            },
        },
        listParliamentPeriods: {
            method: 'GET',
            path: '/parliament-periods',
            description: 'List legislative periods for all parliaments. Supports filtering by parliament ID.',
            parameters: [
                { position: { key: 'parliament', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } }
            ],
            tests: [
                { _description: 'Get Bundestag legislative periods (parliament ID 1)', parliament: 1, pager_limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, type: { type: 'string' }, election_date: { type: 'string' }, start_date_period: { type: 'string' } } } }
                    }
                }
            },
        },
        listCandidaciesMandates: {
            method: 'GET',
            path: '/candidacies-mandates',
            description: 'List candidacies and mandates for politicians. Filter by politician ID, parliament period, or party.',
            parameters: [
                { position: { key: 'politician', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'parliament_period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get mandates for politician 79137', politician: 79137, pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, type: { type: 'string' }, politician: { type: 'object' }, parliament_period: { type: 'object' }, fraction: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}
