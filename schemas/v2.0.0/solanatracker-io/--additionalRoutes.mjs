// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Module-level code: 48 lines

export const main = {
    namespace: 'solanatracker',
    name: 'TokenStatsAPI',
    description: 'Provides detailed statistics for tokens and token-pool pairs over multiple time intervals.',
    version: '2.0.0',
    docs: ['https://docs.solanatracker.io'],
    tags: ['solana', 'analytics', 'tokens', 'cacheTtlFrequent'],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        tokenStats: {
            method: 'GET',
            path: '/stats/:token',
            description: 'Get detailed stats for a token over various time intervals.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        tokenStatsByPool: {
            method: 'GET',
            path: '/stats/:token/:pool',
            description: 'Get detailed stats for a token-pool pair over various time intervals.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'pool', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
