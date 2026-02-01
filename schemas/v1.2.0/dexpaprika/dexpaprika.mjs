export const schema = {
    namespace: "dexpaprika",
    name: "DexPaprika DEX Data",
    description: "Query on-chain DEX data — tokens, pools, transactions, and prices across 29+ blockchains. No API key required.",
    docs: ["https://docs.dexpaprika.com/api-reference/introduction"],
    tags: ["dex", "defi", "tokens", "pools"],
    flowMCP: "1.2.0",
    root: "https://api.dexpaprika.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getNetworks: {
            requestMethod: "GET",
            description: "List all supported blockchain networks.",
            route: "/networks",
            parameters: [],
            tests: [
                { _description: "Fetch all supported networks" }
            ],
            modifiers: []
        },
        getToken: {
            requestMethod: "GET",
            description: "Get token data including price, liquidity, volume, and trading activity on a specific network.",
            route: "/networks/:network_id/tokens/:token_address",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "WETH on Ethereum", network_id: "ethereum", token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
                { _description: "SOL on Solana", network_id: "solana", token_address: "So11111111111111111111111111111111111111112" }
            ],
            modifiers: []
        },
        getTokenPools: {
            requestMethod: "GET",
            description: "Get all liquidity pools where a specific token is traded.",
            route: "/networks/:network_id/tokens/:token_address/pools",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "WETH pools on Ethereum", network_id: "ethereum", token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", limit: 5 }
            ],
            modifiers: []
        },
        getPool: {
            requestMethod: "GET",
            description: "Get detailed data for a specific liquidity pool including price, volume, and token info.",
            route: "/networks/:network_id/pools/:pool_address",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "pool_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Uniswap V2 WETH/USDC pool on Ethereum", network_id: "ethereum", pool_address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc" }
            ],
            modifiers: []
        },
        getPoolTransactions: {
            requestMethod: "GET",
            description: "Fetch swap, add, and remove transactions for a pool with pagination.",
            route: "/networks/:network_id/pools/:pool_address/transactions",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "pool_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "Recent WETH/USDC swaps", network_id: "ethereum", pool_address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc", limit: 5 }
            ],
            modifiers: []
        },
        getMultiPrices: {
            requestMethod: "GET",
            description: "Retrieve batched token prices on a network in a single request. Pass comma-separated addresses.",
            route: "/networks/:network_id/multi/prices",
            parameters: [
                { position: { key: "network_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "addresses", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "WETH and USDC prices on Ethereum", network_id: "ethereum", addresses: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: []
        },
        searchTokens: {
            requestMethod: "GET",
            description: "Search for tokens by name or symbol across all networks.",
            route: "/search",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Search for PEPE token", query: "pepe" },
                { _description: "Search for Uniswap", query: "uniswap" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
