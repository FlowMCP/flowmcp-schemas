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
            ]
        },
        getHotMemes: {
            method: 'GET',
            path: '/r/memes/hot/.json',
            description: 'Retrieve hot posts from r/memes subreddit via redditScanner. Returns structured JSON response data.',
            parameters: []
        }
    }
}
