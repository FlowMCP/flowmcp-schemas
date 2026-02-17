// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Namespace: "redditScanner" -> "redditscanner"

export const main = {
    namespace: 'redditscanner',
    name: 'Reddit Token Mention Search',
    description: 'Searches Reddit for mentions of a token symbol or name related to crypto topics.',
    version: '2.0.0',
    docs: ['https://www.reddit.com/dev/api/'],
    tags: ['social', 'sentiment', 'crypto', 'cacheTtlFrequent'],
    root: 'https://www.reddit.com',
    routes: {
        getTokenMentions: {
            method: 'GET',
            path: '/search.json',
            description: 'Search for mentions of a token symbol or name on Reddit with optional sentiment analysis.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Reddit search for ETH with default limit', q: 'ETH OR Ethereum crypto' },
                { _description: 'Reddit search for SOL with custom limit', q: 'SOL OR Solana crypto', limit: 25 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        data: { type: 'object', properties: { modhash: { type: 'string' }, dist: { type: 'number' }, facets: { type: 'object' }, after: { type: 'string' }, geo_filter: { type: 'string' }, children: { type: 'array', items: { type: 'object' } }, before: { type: 'string', nullable: true } } }
                    }
                }
            },
        },
        getHotMemes: {
            method: 'GET',
            path: '/r/memes/hot/.json',
            description: 'Retrieve hot posts from r/memes subreddit via redditScanner. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Fetch hot memes from r/memes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        data: { type: 'object', properties: { after: { type: 'string' }, dist: { type: 'number' }, modhash: { type: 'string' }, geo_filter: { type: 'string', nullable: true }, children: { type: 'array', items: { type: 'object' } }, before: { type: 'string', nullable: true } } }
                    }
                }
            },
        }
    }
}
