export const schema = {
    namespace: "dexscreener",
    name: "dexscreener-boosted",
    description: "Discover trending boosted tokens on DexScreener — latest and most actively boosted token listings across all DEX chains.",
    docs: ["https://docs.dexscreener.com/api/reference"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.dexscreener.com",
    requiredServerParams: [],
    headers: {},
    routes: {
      getLatestBoostedTokens: {
        requestMethod: "GET",
        description: "Get the latest boosted tokens via DexScreener. Returns structured JSON response data.",
        route: "/token-boosts/latest/v1",
        parameters: [],
        tests: [{ _description: "Fetch latest boosted tokens" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      },
      getMostActiveBoostedTokens: {
        requestMethod: "GET",
        description: "Get tokens with most active boosts via DexScreener. Returns structured JSON response data.",
        route: "/token-boosts/top/v1",
        parameters: [],
        tests: [{ _description: "Fetch most active boosted tokens" }],
        modifiers: [{ phase: "post", handlerName: "normalizeResponse" }]
      }
    },
    handlers: {
      normalizeResponse: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
  };
  