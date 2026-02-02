

export const schema = {
    namespace: "dexscreener",
    name: "Dexscreener Pairs",
    description: "Retrieve DEX trading pair data from DexScreener — pair details by chain and address, plus token buy/sell order checks across supported chains.",
    docs: ["https://docs.dexscreener.com/api/reference"],
    tags: ["defi", "trading", "pairs", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.dexscreener.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getPairByChainAndAddress: {
            requestMethod: "GET",
            description: "Get pair by chain and pair address via DexScreener — query by chainId and pairAddress.",
            route: "/latest/dex/pairs/:chainId/:pairAddress",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "pairAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [ { _description: "Get pair data", chainId: "bsc", pairAddress: "0x0FCeAc6f12dF0c11f4534534fc4ae68751B5862D" } ],
            modifiers: [ { phase: "post", handlerName: "normalizeResponse" } ]
        },
        checkTokenOrders: {
            requestMethod: "GET",
            description: "Check token orders by chain and token address via DexScreener — query by chainId and tokenAddress.",
            route: "/orders/v1/:chainId/:tokenAddress",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [{ _description: "Check token orders", chainId: "solana", tokenAddress: "5i3WMss2Ldnkw3CnrBoGrkPiVwpAKuGoHULPdbaxpump" }],
            modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
        }
    },
    handlers: {
      normalizeResponse: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  