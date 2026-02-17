// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "duneAnalytics" -> "duneanalytics"

export const main = {
    namespace: 'duneanalytics',
    name: 'FarcasterTrends',
    description: 'Fetches trending memecoins, channels, and users from Farcaster via Dune Analytics.',
    version: '2.0.0',
    docs: ['https://docs.dune.com/api-reference/overview/introduction'],
    tags: ['analytics', 'farcaster', 'social', 'cacheTtlDaily'],
    root: 'https://api.dune.com/api/v1/farcaster/trends',
    requiredServerParams: ['DUNE_API_KEY'],
    headers: {
        'X-Dune-Api-Key': '{{DUNE_API_KEY}}'
    },
    routes: {
        farcasterGetTrendingMemecoins: {
            method: 'GET',
            path: '/memecoins',
            description: 'Get trending Farcaster memecoins from Dune Analytics. Supports sort_by, filters, columns filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch top 5 memecoins', limit: 5 }
            ],
        },
        farcasterGetTrendingChannels: {
            method: 'GET',
            path: '/channels',
            description: 'Get trending Farcaster channels from Dune Analytics. Supports sort_by, filters, columns filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch top 3 channels', limit: 3 }
            ],
        },
        farcasterGetTrendingUsers: {
            method: 'GET',
            path: '/users',
            description: 'Get trending Farcaster users who casted in the last 14 days. Required: limit. Optional filters: sort_by, filters, columns.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } },
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'columns', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch top 5 users', limit: 5 }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    farcasterGetTrendingMemecoins: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.memecoins = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    },
    farcasterGetTrendingChannels: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.channels = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    },
    farcasterGetTrendingUsers: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.users = payload?.content?.[0]?.text || "No data.";
            return { response }
        }
    }
} )
