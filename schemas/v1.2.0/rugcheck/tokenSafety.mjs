export const schema = {
    namespace: "rugcheck",
    name: "Rugcheck Token Safety",
    description: "Check Solana token safety scores, risk reports, votes, and trending tokens via rugcheck.xyz",
    docs: ["https://api.rugcheck.xyz/swagger/index.html"],
    tags: ["solana", "security", "tokens"],
    flowMCP: "1.2.0",
    root: "https://api.rugcheck.xyz",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenReport: {
            requestMethod: "GET",
            description: "Get a summarized safety report for a Solana token by its mint address. Required: mint.",
            route: "/v1/tokens/:mint/report/summary",
            parameters: [
                { position: { key: "mint", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(32)"] } }
            ],
            tests: [
                { _description: "Get safety report for USDC token", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" }
            ],
            modifiers: []
        },
        getTokenVotes: {
            requestMethod: "GET",
            description: "Get community votes for a Solana token via Rugcheck — query by mint. Returns structured JSON response data.",
            route: "/v1/tokens/:mint/votes",
            parameters: [
                { position: { key: "mint", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(32)"] } }
            ],
            tests: [
                { _description: "Get community votes for USDC token", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" }
            ],
            modifiers: []
        },
        getRecentTokens: {
            requestMethod: "GET",
            description: "Get recently analyzed tokens via Rugcheck. Returns structured JSON response data.",
            route: "/v1/stats/recent",
            parameters: [],
            tests: [
                { _description: "Fetch recently analyzed tokens" }
            ],
            modifiers: []
        },
        getTrendingTokens: {
            requestMethod: "GET",
            description: "Get currently trending tokens on Solana via Rugcheck. Returns structured JSON response data.",
            route: "/v1/stats/trending",
            parameters: [],
            tests: [
                { _description: "Fetch trending tokens" }
            ],
            modifiers: []
        },
        getNewTokens: {
            requestMethod: "GET",
            description: "Get newly created tokens on Solana via Rugcheck. Returns structured JSON response data.",
            route: "/v1/stats/new_tokens",
            parameters: [],
            tests: [
                { _description: "Fetch new tokens" }
            ],
            modifiers: []
        },
        getVerifiedTokens: {
            requestMethod: "GET",
            description: "Get verified tokens on Solana via Rugcheck. Returns structured JSON response data.",
            route: "/v1/stats/verified",
            parameters: [],
            tests: [
                { _description: "Fetch verified tokens" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
