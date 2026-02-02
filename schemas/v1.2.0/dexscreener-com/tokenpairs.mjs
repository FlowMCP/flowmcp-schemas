export const schema = {
    namespace: "dexscreener",
    name: "DexScreener Token Pairs API",
    description: "Access token pair data, price information, and trading metrics from DexScreener across multiple DEX platforms",
    docs: ["https://docs.dexscreener.com/api/reference"],
    tags: ["dex", "trading", "pairs", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.dexscreener.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenPairs: {
            requestMethod: "GET",
            description: "Get token pairs by token address on specific blockchain via DexScreener — query by tokenAddress.",
            route: "/latest/dex/tokens/:tokenAddress",
            parameters: [
                { 
                    position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "string()", options: ["min(1)"] } 
                }
            ],
            tests: [
                { _description: "Get pairs for WETH token", tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
                { _description: "Get pairs for USDC token", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: []
        },
/*
        searchPairs: {
            requestMethod: "GET",
            description: "Search for token pairs by query string (token name, symbol, or address)",
            route: "/latest/dex/search",
            parameters: [
                { 
                    position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, 
                    z: { primitive: "string()", options: ["min(2)"] } 
                }
            ],
            tests: [
                { _description: "Search for WETH pairs", q: "WETH" },
                { _description: "Search for specific token address", q: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
                { _description: "Search for USDC pairs", q: "USDC" }
            ],
            modifiers: []
        },
*/
        getLatestPairs: {
            requestMethod: "GET",
            description: "Get specific token pair by chain and pair address via DexScreener — query by chainId and pairId.",
            route: "/latest/dex/pairs/:chainId/:pairId",
            parameters: [
                { 
                    position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)", options: [] } 
                },
                { 
                    position: { key: "pairId", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "string()", options: ["min(1)"] } 
                }
            ],
            tests: [
                { _description: "Get specific pair on Ethereum", chainId: "ethereum", pairId: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640" }
            ],
            modifiers: []
        },
        getPairsByChain: {
            requestMethod: "GET",
            description: "Get trending token pairs by chain via DexScreener — query by chainId and sortBy.",
            route: "/orders/v1/:chainId/:sortBy",
            parameters: [
                { 
                    position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)", options: [] } 
                },
                { 
                    position: { key: "sortBy", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "enum(volume,gainers,losers)", options: ["default(volume)"] } 
                }
            ],
            tests: [
                { _description: "Get trending pairs on Ethereum by volume", chainId: "ethereum", sortBy: "volume" },
                { _description: "Get top gainers on BSC", chainId: "bsc", sortBy: "gainers" },
                { _description: "Get trending pairs on Polygon", chainId: "polygon", sortBy: "volume" }
            ],
            modifiers: []
        },
        getSpecificPair: {
            requestMethod: "GET",
            description: "Get detailed information about a specific token pair by chain and address. Required: chainId, pairAddress.",
            route: "/latest/dex/pairs/:chainId/:pairAddress",
            parameters: [
                { 
                    position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "enum(ethereum,bsc,polygon,avalanche,fantom,cronos,arbitrum,optimism,base,solana)", options: [] } 
                },
                { 
                    position: { key: "pairAddress", value: "{{USER_PARAM}}", location: "insert" }, 
                    z: { primitive: "string()", options: ["min(1)"] } 
                }
            ],
            tests: [
                { _description: "Get specific pair on Ethereum", chainId: "ethereum", pairAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640" },
                { _description: "Get specific pair on BSC", chainId: "bsc", pairAddress: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}