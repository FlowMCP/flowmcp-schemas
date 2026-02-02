const positiveWords = ['moon', 'gem', 'hodl', 'bullish', 'gains', 'pump', 'green', 'buy', 'win', 'profit', 'rocket', 'lambo', 'rich', 'good', 'great', 'best', 'amazing', 'excellent', 'winner', 'early', 'opportunity', 'next', 'x10', 'x100'];
const negativeWords = ['dump', 'scam', 'rug', 'sell', 'red', 'loss', 'crash', 'bad', 'worst', 'terrible', 'avoid', 'bear', 'bearish', 'fake', 'shit', 'crap', 'trash', 'waste', 'poor', 'fail', 'failure', 'ponzi', 'beware', 'careful'];


const schema = {
    namespace: "twitter",
    name: "Twitter Recent Search",
    description: "Search for Tweets from the last 7 days using the Twitter/X API v2 recent search endpoint. Supports advanced query operators for precise tweet filtering.",
    docs: ["https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.twitter.com/2",
    requiredServerParams: ["TWITTER_BEARER_TOKEN"],
    headers: { authorization: "Bearer {{TWITTER_BEARER_TOKEN}}" },
    routes: {
        searchRecentTweets: {
            requestMethod: "GET",
            description: "Search for recent tweets matching a given query via Twitter/X. Returns structured JSON response data.",
            route: "/tweets/search/recent",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                // { position: { key: "tweet.fields", value: "author_id", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get tweets from twitterdev", query: "bitcoin" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "modifyPayload" },
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        modifyPayload: ({ struct, payload }) => {
            return { struct, payload };
        },
        modifyResult: async ({ struct, payload }) => {
            if (struct.data && struct.data.data) {
                struct.data = struct.data.data;
            } else {
                struct.status = false;
                struct.messages.push("No tweets found or invalid response structure.");
            }
            return { struct, payload };
        }
    }
};


export { schema }
