export const schema = {
    namespace: "rugcheck",
    name: "RugCheck Solana Token Safety",
    description: "Check Solana token safety, get rug pull reports, insider graphs, trending tokens, and new token alerts. No API key required for read endpoints.",
    docs: ["https://api.rugcheck.xyz/swagger/index.html"],
    tags: ["solana", "security", "tokens", "defi"],
    flowMCP: "1.2.0",
    root: "https://api.rugcheck.xyz",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenReport: {
            requestMethod: "GET",
            description: "Get full safety report for a Solana token including risks, top holders, markets, and metadata.",
            route: "/v1/tokens/:id/report",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Check BONK token", id: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
                { _description: "Check JUP token", id: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatReport" }
            ]
        },
        getTokenSummary: {
            requestMethod: "GET",
            description: "Get a condensed safety summary for a Solana token — risk score and key flags.",
            route: "/v1/tokens/:id/report/summary",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "BONK summary", id: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" }
            ],
            modifiers: []
        },
        getInsiderGraph: {
            requestMethod: "GET",
            description: "Get the insider trading graph for a token — shows connected wallets and suspicious transfer patterns.",
            route: "/v1/tokens/:id/insiders/graph",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "BONK insider graph", id: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" }
            ],
            modifiers: []
        },
        getLockers: {
            requestMethod: "GET",
            description: "Get LP vault/locker information for a token — shows locked liquidity.",
            route: "/v1/tokens/:id/lockers",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "BONK lockers", id: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" }
            ],
            modifiers: []
        },
        getTrending: {
            requestMethod: "GET",
            description: "Get most voted for tokens in the past 24 hours.",
            route: "/v1/stats/trending",
            parameters: [],
            tests: [
                { _description: "Fetch trending tokens" }
            ],
            modifiers: []
        },
        getRecentlyViewed: {
            requestMethod: "GET",
            description: "Get most viewed tokens in the past 24 hours.",
            route: "/v1/stats/recent",
            parameters: [],
            tests: [
                { _description: "Fetch recently viewed tokens" }
            ],
            modifiers: []
        },
        getNewTokens: {
            requestMethod: "GET",
            description: "Get recently detected new Solana tokens.",
            route: "/v1/stats/new_tokens",
            parameters: [],
            tests: [
                { _description: "Fetch new tokens" }
            ],
            modifiers: []
        },
        getVerifiedTokens: {
            requestMethod: "GET",
            description: "Get recently verified tokens on RugCheck.",
            route: "/v1/stats/verified",
            parameters: [],
            tests: [
                { _description: "Fetch verified tokens" }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatReport: async ( { struct, payload } ) => {
            if( !struct['data'] ) { return { struct, payload } }

            const { mint, tokenMeta, risks, score, topHolders, markets } = struct['data']

            struct['data'] = {
                mint,
                name: tokenMeta ? tokenMeta.name : null,
                symbol: tokenMeta ? tokenMeta.symbol : null,
                score: score || null,
                riskCount: risks ? risks.length : 0,
                risks: risks
                    ? risks.map( ( risk ) => {
                        const { name, value, description, score: riskScore, level } = risk

                        return { name, value, description, score: riskScore, level }
                    } )
                    : [],
                topHolderCount: topHolders ? topHolders.length : 0,
                marketCount: markets ? markets.length : 0
            }

            return { struct, payload }
        }
    }
}
