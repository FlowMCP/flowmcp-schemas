// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'profilejump',
    name: 'ProfileJump',
    description: 'Access LUKSO Universal Profile data via ProfileJump — token prices, trending profiles, token listings, and profile lookups by address.',
    version: '2.0.0',
    docs: ['https://profilejump.com'],
    tags: ['lukso', 'identity', 'profiles', 'cacheTtlDaily'],
    root: 'https://api.profilejump.com',
    headers: {
        Referer: 'https://profilejump.com/'
    },
    routes: {
        prices: {
            method: 'GET',
            path: '/api/prices',
            description: 'Fetch current token price data from ProfileJump for LUKSO Universal Profile ecosystem tokens and assets.',
            parameters: []
        },
        hotProfiles: {
            method: 'GET',
            path: '/api/profiles/hot-profiles',
            description: 'Fetch currently trending Universal Profiles from ProfileJump ranked by recent activity and engagement.',
            parameters: []
        },
        tokensList: {
            method: 'GET',
            path: '/api/tokens-list?limit=100&offset=0',
            description: 'Fetch list of tokens with pagination via profilejump. Returns structured JSON response data.',
            parameters: []
        },
        profilesList: {
            method: 'GET',
            path: '/api/profiles-list?limit=100&offset=0',
            description: 'Fetch list of profiles filtered by view via profilejump. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'view', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(social,wealth)', options: [] } }
            ]
        },
        profileByAddress: {
            method: 'GET',
            path: '/api/profiles/:address',
            description: 'Fetch profile details by wallet address via profilejump — query by address. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ]
        }
    }
}
