// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'rugcheck',
    name: 'Rugcheck Token Safety',
    description: 'Check Solana token safety scores, risk reports, votes, and trending tokens via rugcheck.xyz',
    version: '2.0.0',
    docs: ['https://api.rugcheck.xyz/swagger/index.html'],
    tags: ['solana', 'security', 'tokens', 'cacheTtlFrequent'],
    root: 'https://api.rugcheck.xyz',
    routes: {
        getTokenReport: {
            method: 'GET',
            path: '/v1/tokens/:mint/report/summary',
            description: 'Get a summarized safety report for a Solana token by its mint address. Required: mint.',
            parameters: [
                { position: { key: 'mint', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)'] } }
            ]
        },
        getTokenVotes: {
            method: 'GET',
            path: '/v1/tokens/:mint/votes',
            description: 'Get community votes for a Solana token via Rugcheck — query by mint. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'mint', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)'] } }
            ]
        },
        getRecentTokens: {
            method: 'GET',
            path: '/v1/stats/recent',
            description: 'Get recently analyzed tokens via Rugcheck. Returns structured JSON response data.',
            parameters: []
        },
        getTrendingTokens: {
            method: 'GET',
            path: '/v1/stats/trending',
            description: 'Get currently trending tokens on Solana via Rugcheck. Returns structured JSON response data.',
            parameters: []
        },
        getNewTokens: {
            method: 'GET',
            path: '/v1/stats/new_tokens',
            description: 'Get newly created tokens on Solana via Rugcheck. Returns structured JSON response data.',
            parameters: []
        },
        getVerifiedTokens: {
            method: 'GET',
            path: '/v1/stats/verified',
            description: 'Get verified tokens on Solana via Rugcheck. Returns structured JSON response data.',
            parameters: []
        }
    }
}
