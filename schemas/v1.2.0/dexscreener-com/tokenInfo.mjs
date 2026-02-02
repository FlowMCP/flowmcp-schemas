export const schema = {
    namespace: "dexscreener",
    name: "dexscreener-tokeninfo",
    description: "Search tokens and retrieve profile data from DexScreener — latest token profiles, pair search, token-to-pair lookups, and pool listings across all DEX chains.",
    docs: ["https://docs.dexscreener.com/api/reference"],
    tags: ["defi", "tokens", "discovery"],
    flowMCP: "1.2.0",
    root: "https://api.dexscreener.com",
    requiredServerParams: [],
    headers: {},
    routes: {
      getLatestTokenProfiles: {
        requestMethod: "GET",
        description: "Get the latest token profiles via DexScreener. Returns structured JSON response data.",
        route: "/token-profiles/latest/v1",
        parameters: [],
        tests: [{ _description: "Fetch latest token profiles" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      searchPairs: {
        requestMethod: "GET",
        description: "Search pairs by query string via DexScreener. Returns structured JSON response data.",
        route: "/latest/dex/search",
        parameters: [
          { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [{ _description: "Search pairs by query", q: "SOL/USDC" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      getPairsByToken: {
        requestMethod: "GET",
        description: "Get pairs by token address via DexScreener — query by chainId and tokenAddress. Returns structured JSON response data.",
        route: "/tokens/v1/:chainId/:tokenAddress",
        parameters: [
          { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [{ _description: "Get token pairs", chainId: "ethereum", tokenAddress: "0x6982508145454Ce325dDbE47a25d4ec3d2311933" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      getTokenPools: {
        requestMethod: "GET",
        description: "Get token pools by chain and address via DexScreener — query by chainId and tokenAddress.",
        route: "/token-pairs/v1/:chainId/:tokenAddress",
        parameters: [
          { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
          { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [{ _description: "Get token pools", chainId: "bsc", tokenAddress: "0xD279E8f1fE8F893e4b1CB18fAAeb4fc2a0d14444" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      }
    },
    handlers: {
      normalizeResponse: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  