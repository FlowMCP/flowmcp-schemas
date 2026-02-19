export const schema = {
    namespace: 'neynar',
    name: 'Neynar Farcaster API',
    description: 'Query Farcaster social protocol data — lookup users by username, FID or ETH address, fetch individual casts, and browse user cast feeds via Neynar REST API',
    docs: ['https://docs.neynar.com'],
    tags: ['social', 'farcaster', 'crypto'],
    flowMCP: '1.2.0',
    root: 'https://api.neynar.com/v2/farcaster',
    requiredServerParams: ['NEYNAR_API_KEY'],
    headers: {
        'accept': 'application/json',
        'x-api-key': '{{NEYNAR_API_KEY}}'
    },
    routes: {
        getUserByUsername: {
            requestMethod: 'GET',
            description: 'Fetch a hydrated Farcaster user profile by username including bio, follower counts, verified addresses, and active status.',
            route: '/user/by_username',
            parameters: [
                { position: { key: 'username', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'viewer_fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Lookup user profile for vitalik', username: 'vitalik.eth' },
                { _description: 'Lookup user profile for Dan Romero', username: 'dwr' }
            ],
            modifiers: []
        },
        getUsersByFid: {
            requestMethod: 'GET',
            description: 'Bulk lookup Farcaster user profiles by their FID numbers. Returns hydrated profiles with bio, follower counts, and verified addresses.',
            route: '/user/bulk',
            parameters: [
                { position: { key: 'fids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'viewer_fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Lookup Dan Romero (FID 3) and dwr.eth (FID 5650)', fids: '3,5650' },
                { _description: 'Lookup single user by FID', fids: '3' }
            ],
            modifiers: []
        },
        getUsersByAddress: {
            requestMethod: 'GET',
            description: 'Lookup Farcaster user profiles by their verified Ethereum addresses. Supports multiple comma-separated addresses.',
            route: '/user/bulk-by-address',
            parameters: [
                { position: { key: 'addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'viewer_fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Lookup Farcaster user by Vitalik ETH address', addresses: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getCast: {
            requestMethod: 'GET',
            description: 'Fetch a single Farcaster cast by its hash or Warpcast URL, including author details, reactions, replies count, and embedded content.',
            route: '/cast',
            parameters: [
                { position: { key: 'identifier', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(hash,url)', options: [] } },
                { position: { key: 'viewer_fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Get cast by hash', identifier: '0xa896906a5e397b4fec247c3ee0e9e4d4990b8004', type: 'hash' }
            ],
            modifiers: []
        },
        getUserCasts: {
            requestMethod: 'GET',
            description: 'Fetch a paginated feed of casts authored by a specific Farcaster user, identified by their FID.',
            route: '/feed/user/casts',
            parameters: [
                { position: { key: 'fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(100)', 'default(25)'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include_replies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'viewer_fid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Get latest casts from Dan Romero (FID 3)', fid: 3, limit: 5 },
                { _description: 'Get latest casts from dwr.eth (FID 5650) with replies', fid: 5650, limit: 5, include_replies: true }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
