const schema = {
    namespace: "redditScanner",
    name: "Reddit Token Mention Search",
    description: "Searches Reddit for mentions of a token symbol or name related to crypto topics.",
    docs: ["https://www.reddit.com/dev/api/"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://www.reddit.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenMentions: {
            requestMethod: "GET",
            description: "Search for mentions of a token symbol or name on Reddit with optional sentiment analysis.",
            route: "/search.json",
            parameters: [
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] }, }
            ],
            tests: [
                { _description: "Reddit search for ETH with default limit", q: "ETH OR Ethereum crypto" },
                { _description: "Reddit search for SOL with custom limit", q: "SOL OR Solana crypto", limit: 25 }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        },
        getHotMemes: {
            requestMethod: "GET",
            description: "Retrieve hot posts from r/memes subreddit.",
            route: "/r/memes/hot/.json",
            parameters: [],
            tests: [
                { _description: "Fetch hot memes from r/memes" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        modifyResult: ( { struct, payload } ) => {
            return { struct, payload }
        }
    }
};


export { schema };
