const schema = {
    namespace: "jupiter",
    name: "Jupiter Token Price Checker",
    description: "Fetches token prices from Jupiter DEX aggregator, priced by default against USDC, with optional vsToken.",
    docs: ["https://station.jup.ag/docs/api/lite-api", "https://dev.jup.ag/docs/price-api/"],
    tags: ["solana", "defi", "swap"],
    flowMCP: "1.2.0",
    root: "https://lite-api.jup.ag",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenPrice: {
            requestMethod: "GET",
            description: "Returns the price of one or more tokens, optionally against a specified vsToken (defaults to USDC).",
            route: "/price/v2",
            parameters: [
                { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                //{ position: { key: "vsToken", value: "{{OPTIONAL_PARAM}}", location: "query" }, z: { primitive: "string()", options: [], default: "USDC" } }
            ],
            tests: [
                { _description: "Preis von JUP und SOL gegen USDC", ids: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112" },
                // { _description: "Preis von JUP gegen SOL", tokenIds: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", vsToken: "So11111111111111111111111111111111111111112" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getTokenInfo: {
            requestMethod: "GET",
            description: "Get information about a token using its mint address via Jupiter — query by mintAddress.",
            route: "/tokens/v1/token/:mintAddress",
            parameters: [
                { position: { key: "mintAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Info for JUP token", mintAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getTokensInMarket: {
            requestMethod: "GET",
            description: "Get list of token mints belonging to a market address via Jupiter — query by marketAddress.",
            route: "/tokens/v1/market/:marketAddress/mints",
            parameters: [
                { position: { key: "marketAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Tokens in SOL-USDC market", marketAddress: "BVRbyLjjfSBcoyiYFuxbgKYnWuiFaF9CSXEa5vdSZ9Hh" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getAllTradableTokens: {
            requestMethod: "GET",
            description: "Retrieve a list of all tradable token mints on Jupiter. Returns structured JSON response data.",
            route: "/tokens/v1/mints/tradable",
            parameters: [],
            tests: [
                { _description: "Fetch tradable token mints" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getTaggedTokens: {
            requestMethod: "GET",
            description: "Fetch token info for tokens matching specific tags via Jupiter — query by tags. Returns structured JSON response data.",
            route: "/tokens/v1/tagged/:tags",
            parameters: [
                { position: { key: "tags", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Fetch LST tagged tokens", tags: "lst" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getNewTokens: {
            requestMethod: "GET",
            description: "Retrieve new tokens, ordered by creation timestamp via Jupiter. Returns structured JSON response data.",
            route: "/tokens/v1/new",
            parameters: [],
            tests: [
                { _description: "Fetch newly listed tokens" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        },
        getAllTokens: {
            requestMethod: "GET",
            description: "Fetch all tokens indexed by Jupiter. This is a large payload. Returns structured JSON response data.",
            route: "/tokens/v1/all",
            parameters: [],
            tests: [
                { _description: "Fetch all token metadata" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPriceResponse" }
            ]
        }
    },
    handlers: {
        formatPriceResponse: async ({ struct, payload }) => {
            try {
                // struct['data'] = struct['data']?.data
            } catch (err) {
                struct.status = false;
                struct.messages.push( 'Error', err );
            }
            return { struct, payload };
        }
    }
};


export { schema };
