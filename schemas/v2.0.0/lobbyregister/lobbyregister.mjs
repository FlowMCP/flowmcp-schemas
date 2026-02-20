// Lobbyregister Bundestag API v2
// Public API key required (documented on official Open Data page)
// Source: lobbyregister.bundestag.de

export const main = {
    namespace: 'lobbyregister',
    name: 'Lobbyregister Bundestag',
    description: 'Query the German parliamentary lobby register — search 6,700+ registered lobbyists, get detailed entries with financial data and lobbying activities, and access aggregated statistics.',
    version: '2.0.0',
    docs: ['https://www.lobbyregister.bundestag.de/informationen-und-hilfe/open-data-1049716', 'https://bundestag.lobbyregister.api.bund.dev/'],
    tags: ['government', 'transparency', 'lobbying', 'parliament', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.lobbyregister.bundestag.de/rest/v2',
    requiredServerParams: ['LOBBYREGISTER_API_KEY'],
    headers: {
        'Authorization': 'ApiKey {{LOBBYREGISTER_API_KEY}}'
    },
    routes: {
        searchEntries: {
            method: 'GET',
            path: '/registerentries',
            description: 'Search lobby register entries with free-text query. Supports quoted exact matches and boolean operators (AND, OR, NOT). Returns max 100 results per page with cursor pagination.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for energy lobbyists', q: 'Energie' },
                { _description: 'Search for pharma lobbyists', q: 'Pharma' }
            ]
        },
        getEntryByNumber: {
            method: 'GET',
            path: '/registerentries/:registerNumber',
            description: 'Get a specific lobby register entry by its register number (format: R followed by 6 digits). Returns full detail including identity, activities, finances, clients, and contracts.',
            parameters: [
                { position: { key: 'registerNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^R\\d{6}$)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get entry R003295', registerNumber: 'R003295' }
            ]
        },
        getEntryVersion: {
            method: 'GET',
            path: '/registerentries/:registerNumber/:version',
            description: 'Get a specific historical version of a lobby register entry. Useful for tracking changes in lobbying activities, finances, or organizational structure over time.',
            parameters: [
                { position: { key: 'registerNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^R\\d{6}$)'] } },
                { position: { key: 'version', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get version 1 of R003295', registerNumber: 'R003295', version: 1 }
            ]
        },
        getStatistics: {
            method: 'GET',
            path: '/statistics/registerentries',
            description: 'Get aggregated statistics about all lobby register entries — counts by legal form, active/inactive status, people involved in lobbying, and fields of interest breakdown.',
            parameters: [
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get lobby register statistics' }
            ]
        }
    }
}
