const schema = {
    namespace: "polymarket",
    name: "Polymarket Predictions",
    description: "Access prediction market data from Polymarket via CLOB API",
    docs: [],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://clob.polymarket.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getMarkets: {
            requestMethod: "GET",
            description: "List prediction markets with optional filters",
            route: "/markets",
            parameters: [
                { position: { key: "status", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(active,resolved)", options: [] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } },
                { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)"] } }
            ],
            tests: [
                { _description: "List 5 active markets", status: "active", limit: 10, offset: 0 }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        },
        getMarketInfo: {
            requestMethod: "GET",
            description: "Get detailed information about a specific prediction market",
            route: "/markets/:condition_id",
            parameters: [
                { position: { key: "condition_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
            ],
            tests: [
                { _description: "Get info for market ID xyz", condition_id: "0x9412b855478d1dc1ba433a18de8bd082dc22b0c3a30c01f307016c2a07c11572" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        changeParams: ( { struct, payload, userParams } ) => {
            const { condition_id } = userParams
            payload['url'] = payload['url']
                .replace( 'placeholder', `${condition_id}` )
            return { struct, payload }
        }, 
        modifyResult: ( { struct, payload } ) => {
            return { struct, payload }
        }
    }
};


export { schema };
