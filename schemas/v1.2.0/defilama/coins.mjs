const sources = [
    "coingecko", /*"cmc", "defillama"*/
]


const schema = {
    namespace: "defillama",
    name: "DeFi Llama Token Prices",
    description: "Provides current token price data using DeFi Llama",
    docs: ["https://docs.llama.fi"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://coins.llama.fi",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenPrices: {
            requestMethod: "GET",
            description: "Get current price information for a specific token",
            route: "/prices/current/_tokenName_",
            parameters: [
                { position: { key: "source", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: `enum(${sources.join(',')})`, options: [] } },
                { position: { key: "token", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
            ],
            tests: [
                { _description: "Test price for Ethereum via CoinGecko ID", source: "coingecko", token: "ethereum" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "addTokenName" },
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        addTokenName: ( { struct, payload, userParams } ) => {
            const { source, token } = userParams
            const tokenName = `${source}:${token}`
            payload['url'] = payload['url']
                .replace( '_tokenName_', tokenName )
            return { struct, payload }
        },

        modifyResult: ( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}

export { schema }
