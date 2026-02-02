const schema = {
    namespace: "defillama",
    name: "DeFi Llama MCP",
    description: "Access DeFi protocol analytics from DeFi Llama — list all tracked protocols, get per-protocol TVL history, and query chain-level TVL aggregates.",
    docs: ["https://docs.llama.fi"],
    tags: ["defi", "tvl", "protocols", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.llama.fi",
    requiredServerParams: [],
    headers: {},
    routes: {
        getProtocols: {
            requestMethod: "GET",
            description: "Retrieve a list of all DeFi protocols from DeFi Llama (first 20) Returns structured JSON response data.",
            route: "/protocols",
            parameters: [],
            tests: [
                { _description: "Test fetching protocols" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        },
        getProtocolTvl: {
            requestMethod: "GET",
            description: "Get TVL data for a specific DeFi protocol via defillama — query by protocol. Returns structured JSON response data.",
            route: "/protocol/:protocol",
            parameters: [
                { position: { key: "protocol", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Test Aave protocol TVL", protocol: "aave" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        },
        getChainTvl: {
            requestMethod: "GET",
            description: "Retrieve historical TVL data for a specific blockchain via defillama — query by chain.",
            route: "/v2/historicalChainTvl/:chain",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Ethereum chain TVL", chain: "ethereum" }
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
}


export { schema }