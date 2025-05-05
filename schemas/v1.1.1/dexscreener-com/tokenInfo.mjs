export const schema = {
    name: "dexscreener-tokeninfo",
    description: "DexScreener API – Token search and profile data",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.dexscreener.com",
    requiredServerParams: [],
    headers: {},
    routes: {
      getLatestTokenProfiles: {
        requestMethod: "GET",
        description: "Get the latest token profiles",
        route: "/token-profiles/latest/v1",
        parameters: [],
        tests: [{ _description: "Fetch latest token profiles" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      searchPairs: {
        requestMethod: "GET",
        description: "Search pairs by query string",
        route: "/latest/dex/search",
        parameters: [
          { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [{ _description: "Search pairs by query", q: "SOL/USDC" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      getPairsByToken: {
        requestMethod: "GET",
        description: "Get pairs by token address",
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
        description: "Get token pools by chain and address",
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
  