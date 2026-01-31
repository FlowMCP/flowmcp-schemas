export const schema = {
    namespace: "dexpaprika",
    name: "DexPaprika DeFi Prices",
    description: "Query decentralized exchange data including token prices, pools, liquidity, and transactions via dexpaprika.com",
    docs: ["https://api.dexpaprika.com/docs"],
    tags: ["defi", "prices", "liquidity"],
    flowMCP: "1.2.0",
    root: "https://api.dexpaprika.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getNetworks: {
            requestMethod: "GET",
            description: "Get all supported blockchain networks",
            route: "/networks",
            parameters: [],
            tests: [
                { _description: "Fetch all supported networks" }
            ],
            modifiers: []
        },
        getToken: {
            requestMethod: "GET",
            description: "Get detailed token information on a specific network",
            route: "/networks/:network_id/tokens/:token_address",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get WETH token on Ethereum", network_id: "ethereum", token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }
            ],
            modifiers: []
        },
        getMultiPrices: {
            requestMethod: "GET",
            description: "Get prices for multiple tokens on a network",
            route: "/networks/:network_id/multi/prices",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "addresses", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get multi prices on Ethereum", network_id: "ethereum", addresses: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: []
        },
        getPool: {
            requestMethod: "GET",
            description: "Get detailed pool information on a specific network",
            route: "/networks/:network_id/pools/:pool_address",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "pool_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get Uniswap V3 USDC/WETH pool", network_id: "ethereum", pool_address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640" }
            ],
            modifiers: []
        },
        getTokenPools: {
            requestMethod: "GET",
            description: "Get all pools for a specific token on a network",
            route: "/networks/:network_id/tokens/:token_address/pools",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] } }
            ],
            tests: [
                { _description: "Get pools for WETH on Ethereum", network_id: "ethereum", token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }
            ],
            modifiers: []
        },
        getPoolTransactions: {
            requestMethod: "GET",
            description: "Get recent transactions for a specific pool",
            route: "/networks/:network_id/pools/:pool_address/transactions",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "pool_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] } }
            ],
            tests: [
                { _description: "Get transactions for USDC/WETH pool", network_id: "ethereum", pool_address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640" }
            ],
            modifiers: []
        },
        searchTokens: {
            requestMethod: "GET",
            description: "Search for tokens across all networks",
            route: "/search",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Search for Ethereum token", query: "ethereum" },
                { _description: "Search for USDC token", query: "usdc" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
