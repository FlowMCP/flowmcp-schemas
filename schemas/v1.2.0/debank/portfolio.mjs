export const schema = {
    namespace: "debank",
    name: "DeBank Portfolio API",
    description: "Track DeFi portfolio data including token balances, protocol positions and total balance across all major chains via DeBank",
    docs: ["https://docs.cloud.debank.com/", "https://debank.com/"],
    tags: ["defi", "portfolio", "wallet", "crypto"],
    flowMCP: "1.2.0",
    root: "https://pro-openapi.debank.com/v1",
    requiredServerParams: ["DEBANK_ACCESS_KEY"],
    headers: {
        "AccessKey": "{{DEBANK_ACCESS_KEY}}"
    },
    routes: {
        getTotalBalance: {
            requestMethod: "GET",
            description: "Get total USD balance of a wallet address across all supported chains",
            route: "/user/total_balance",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get Vitalik total balance", id: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: []
        },
        getUsedChains: {
            requestMethod: "GET",
            description: "Get list of chains that a wallet address has interacted with",
            route: "/user/used_chain_list",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get Vitalik used chains", id: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: []
        },
        getTokenList: {
            requestMethod: "GET",
            description: "Get all token balances of a wallet address on a specific chain",
            route: "/user/token_list",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "chain_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } },
                { position: { key: "is_all", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } }
            ],
            tests: [
                { _description: "Get Ethereum tokens for Vitalik", id: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", chain_id: "eth" }
            ],
            modifiers: []
        },
        getProtocolList: {
            requestMethod: "GET",
            description: "Get DeFi protocol positions and balances for a wallet on a specific chain",
            route: "/user/simple_protocol_list",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "chain_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } }
            ],
            tests: [
                { _description: "Get Ethereum protocol positions", id: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", chain_id: "eth" }
            ],
            modifiers: []
        },
        getAllProtocols: {
            requestMethod: "GET",
            description: "Get all DeFi protocol positions across all chains for a wallet",
            route: "/user/all_simple_protocol_list",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get all protocol positions for Vitalik", id: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: []
        },
        getTokenInfo: {
            requestMethod: "GET",
            description: "Get detailed token information including price, logo and market data",
            route: "/token",
            parameters: [
                { position: { key: "chain_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } },
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } }
            ],
            tests: [
                { _description: "Get USDC token info on Ethereum", chain_id: "eth", id: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
