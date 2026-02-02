const schema = {
    namespace: "defillama",
    name: "DeFi Llama Liquidity Pools",
    description: "Access DeFi Llama liquidity pool analytics — query current pool yields (APY, TVL, rewards) and historical TVL chart data for individual pools.",
    docs: ["https://docs.llama.fi"],
    tags: ["defi", "yields", "farming"],
    flowMCP: "1.2.0",
    root: "https://yields.llama.fi",
    requiredServerParams: [],
    headers: {},
    routes: {
        getPools: {
            requestMethod: "GET",
            description: "Retrieve a list of all liquidity pools from DeFi Llama (first 30) via defillama.",
            route: "/pools",
            parameters: [],
            tests: [
                { _description: "Test fetching pools" }
            ],
            modifiers: []
        },
        getPoolTvl: {
            requestMethod: "GET",
            description: "Get detailed information about a specific liquidity pool by its ID. Required: pool.",
            route: "/chart/{{pool}}",
            parameters: [
                { position: { key: "pool", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Test pool chart data", pool: "747c1d2a-c668-4682-b9f9-296708a3dd90" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        modifyResult: ( { struct, payload } ) => {
            if( struct['data']['status'] === 'success' ) {
                struct['data'] = struct['data']['data']
            } else {
                struct['status'] = false
                struct['messages'].push( `Fetch Error` )
            }

            return { struct, payload }
        }
    }
};


export { schema }