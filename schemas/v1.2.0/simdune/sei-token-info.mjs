const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Token Info",
    description: "Fetches token metadata like name, symbol, supply, decimals and USD price for a given contract address on a supported chain.",
    docs: ["https://docs.sim.dune.com/docs/sim-api/token-info"],
    tags: ["production", "simdune.getTokenInfo"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getTokenInfo: {
            requestMethod: "GET",
            description: "Returns metadata for a specific token contract on a given chain (e.g. USDC on Sei).",
            route: "/evm/token-info/{{token}}",
            parameters: [
                { position: { key: "token", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "chain_ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^[0-9]+$)"] } }
            ],
            tests: [
                { _description: "Fetch token info for USDC on Sei", token: "0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392", chain_ids: "1329" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}

export { schema }