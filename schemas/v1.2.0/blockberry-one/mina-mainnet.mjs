export const schema = {
    namespace: "blockberry",
    name: "Blockberry Mina Mainnet API",
    description: "Mina blockchain data API for blocks, accounts, and ZkApps (working endpoints only)",
    docs: ["https://docs.blockberry.one/", "https://docs.blockberry.one/reference/mina-mainnet-quickstart"],
    tags: ["production", "blockberry.getDashboardInfo", "blockberry.getBlocks", "blockberry.getAccountByHash", "blockberry.getZkAppTransactions"],
    flowMCP: "1.2.0",
    root: "https://api.blockberry.one/mina-mainnet/v1",
    requiredServerParams: ["BLOCKBERRY_API_KEY"],
    headers: { 
        "accept": "application/json",
        "x-api-key": "{{BLOCKBERRY_API_KEY}}" 
    },
    routes: {
        // Working Endpoints Only
        getDashboardInfo: {
            requestMethod: "GET",
            description: "Get key Mina blockchain parameters including price, supply, block height, and validator count",
            route: "/info",
            parameters: [],
            tests: [
                { _description: "Get Mina blockchain dashboard info" }
            ],
            modifiers: []
        },

        // Working Account Endpoints
        getAccountByHash: {
            requestMethod: "GET",
            description: "Get detailed account information by public key hash",
            route: "/accounts/{publicKeyHash}",
            parameters: [
                { position: { key: "publicKeyHash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get account details", publicKeyHash: "B62qrAWZFqvgJbfU95t1owLAMKtsDTAGgSZzsBJYUzeQZ7Xwh9CWsEY" }
            ],
            modifiers: []
        },
        getAccountBalance: {
            requestMethod: "GET",
            description: "Get current balance for a specific Mina account",
            route: "/accounts/{publicKeyHash}/balance",
            parameters: [
                { position: { key: "publicKeyHash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get account balance", publicKeyHash: "B62qrAWZFqvgJbfU95t1owLAMKtsDTAGgSZzsBJYUzeQZ7Xwh9CWsEY" }
            ],
            modifiers: []
        },

        // Working Block Endpoints
        getBlocks: {
            requestMethod: "GET",
            description: "Get list of Mina blocks (canonical and orphaned) with pagination",
            route: "/blocks",
            parameters: [
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } },
                { position: { key: "orderBy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ASC,DESC)", options: ["default(DESC)", "optional()"] } },
                { position: { key: "sortBy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(HEIGHT,TIMESTAMP)", options: ["default(HEIGHT)", "optional()"] } },
                { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ALL,CANONICAL,ORPHANED)", options: ["default(ALL)", "optional()"] } }
            ],
            tests: [
                { _description: "Get latest 10 blocks", page: 0, size: 10, orderBy: "DESC", sortBy: "HEIGHT", type: "ALL" }
            ],
            modifiers: []
        },

        // Working ZkApp Endpoints
        getZkAppTransactions: {
            requestMethod: "GET",
            description: "Get list of ZkApp transactions with filtering options",
            route: "/zkapps/transactions",
            parameters: [
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "Get 15 ZkApp transactions", page: 0, size: 15 }
            ],
            modifiers: []
        },
        getZkAppByAddress: {
            requestMethod: "GET",
            description: "Get ZkApp information by account address",
            route: "/zkapps/{address}",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get ZkApp details", address: "B62qrAWZFqvgJbfU95t1owLAMKtsDTAGgSZzsBJYUzeQZ7Xwh9CWsEY" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}