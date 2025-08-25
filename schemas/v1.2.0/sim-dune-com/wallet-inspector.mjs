export const schema = {
    namespace: "walletInspector",
    name: "Wallet Inspector",
    description: "Unified wallet insight interface using Dune SIM APIs for EVM and Solana chains",
    docs: ["https://sim.dune.com/docs"],
    tags: ["production", "data", "api"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getBalance: {
            requestMethod: "GET",
            description: "Get token balances for a given EVM or Solana wallet",
            route: "/balance/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Test with EVM address", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" },
                { _description: "Test with Solana address", wallet_address: "DYw8jCTF1S3NvB4WBoVdjX2ZL3EkRB1MXFA1U7BD1F8B" }
            ],
            modifiers: []
        },
        getActivity: {
            requestMethod: "GET",
            description: "Get recent activity on EVM chains for a wallet address",
            route: "/activity/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Activity for EVM wallet", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" }
            ],
            modifiers: []
        },
        getTransactions: {
            requestMethod: "GET",
            description: "Retrieve transactions for a wallet on EVM or Solana chains",
            route: "/transactions/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(100)", "min(1)", "max(1000)", "optional()"] } }
            ],
            tests: [
                { _description: "Transactions for EVM wallet", wallet_address: "0x1234567890abcdef1234567890abcdef12345678", limit: 10 },
                { _description: "Transactions for Solana wallet", wallet_address: "DYw8jCTF1S3NvB4WBoVdjX2ZL3EkRB1MXFA1U7BD1F8B", limit: 5 }
            ],
            modifiers: []
        },
        getHoldingsSummary: {
            requestMethod: "GET",
            description: "Summarize total holdings in USD by token symbol",
            route: "/holdings-summary/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Summary for EVM wallet", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" }
            ],
            modifiers: []
        },
        getSolBalance: {
            requestMethod: "GET",
            description: "Return only SOL balance for Solana address",
            route: "/sol-balance/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Simple SOL balance test", wallet_address: "DYw8jCTF1S3NvB4WBoVdjX2ZL3EkRB1MXFA1U7BD1F8B" }
            ],
            modifiers: []
        },
        getEvmNativeBalance: {
            requestMethod: "GET",
            description: "Return only native EVM balance (ETH, MATIC, etc.)",
            route: "/evm-native/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Simple EVM native token test", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" }
            ],
            modifiers: []
        },
        getTransactionCount: {
            requestMethod: "GET",
            description: "Return number of transactions for wallet",
            route: "/tx-count/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Transaction count test", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" }
            ],
            modifiers: []
        },
        getChainDistribution: {
            requestMethod: "GET",
            description: "Show how many tokens or txs appear on each chain",
            route: "/chain-distribution/:wallet_address",
            parameters: [
                { position: { key: "wallet_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Distribution by chain", wallet_address: "0x1234567890abcdef1234567890abcdef12345678" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}