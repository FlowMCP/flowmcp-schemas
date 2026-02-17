// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 2 lines

export const main = {
    namespace: 'twitter',
    name: 'Twitter Recent Search',
    description: 'Search for Tweets from the last 7 days using the Twitter/X API v2 recent search endpoint. Supports advanced query operators for precise tweet filtering.',
    version: '2.0.0',
    docs: ['https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search'],
    tags: ['social', 'search', 'mentions', 'cacheTtlFrequent'],
    root: 'https://api.twitter.com/2',
    requiredServerParams: ['TWITTER_BEARER_TOKEN'],
    headers: {
        authorization: 'Bearer {{TWITTER_BEARER_TOKEN}}'
    },
    routes: {
        searchRecentTweets: {
            method: 'GET',
            path: '/tweets/search/recent',
            description: 'Search for recent tweets matching a given query via Twitter/X. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'array',items:{type:'object',properties:{id:{type:'string'},text:{type:'string'},created_at:{type:'string'},author_id:{type:'string'}}}},meta:{type:'object',properties:{result_count:{type:'number'},next_token:{type:'string'}}}}}},
            tests: [
                { _description: 'Get tweets from twitterdev', query: 'bitcoin' }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const positiveWords = ['moon', 'gem', 'hodl', 'bullish', 'gains', 'pump', 'green', 'buy', 'win', 'profit', 'rocket', 'lambo', 'rich', 'good', 'great', 'best', 'amazing', 'excellent', 'winner', 'early', 'opportunity', 'next', 'x10', 'x100'];
    const negativeWords = ['dump', 'scam', 'rug', 'sell', 'red', 'loss', 'crash', 'bad', 'worst', 'terrible', 'avoid', 'bear', 'bearish', 'fake', 'shit', 'crap', 'trash', 'waste', 'poor', 'fail', 'failure', 'ponzi', 'beware', 'careful'];

    return {
        searchRecentTweets: {
            postRequest: async ( { response, struct, payload } ) => {
                if (response && response.data) {
                response = response.data;
                } else {
                struct.status = false;
                struct.messages.push("No tweets found or invalid response structure.");
                }
                return { response }
            }
        }
    }
}
