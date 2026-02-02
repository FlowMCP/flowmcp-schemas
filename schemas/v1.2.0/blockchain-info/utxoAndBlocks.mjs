export const schema = {
    namespace: "blockchaininfo",
    name: "Bitcoin UTXO Analytics",
    description: "Provides insights into Bitcoin UTXOs and block statistics using blockchain.info endpoints.",
    docs: ["https://www.blockchain.com/api/blockchain_api"],
    tags: ["bitcoin", "blockchain", "utxo", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://blockchain.info",
    requiredServerParams: [],
    headers: {},
    routes: {
        getUTXO: {
            requestMethod: "GET",
            description: "Fetch UTXO summary for a Bitcoin address via blockchaininfo. Returns structured JSON response data.",
            route: "/unspent",
            parameters: [
                { position: { key: "active", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^([13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{39,59})$)"] } }
            ],
            tests: [
                { _description: "Basic test for valid address", active: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" }
            ],
            modifiers: []
        },
        getBlockStats: {
            requestMethod: "GET",
            description: "Fetch block statistics for a given block height via blockchaininfo — query by block height.",
            route: "/block-height/:block_height",
            parameters: [
                { position: { key: "block_height", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(0)"] } },
                { position: { key: "format", value: "json", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Basic test for block height", block_height: 800000 }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
