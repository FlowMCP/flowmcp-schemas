export const schema = {
    namespace: "coingecko",
    name: "CoinGeckoGlobal",
    description: "Fetch global cryptocurrency market data from CoinGecko — total market cap, 24h volume, BTC/ETH dominance, plus DeFi-specific global metrics.",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: ["crypto", "global", "marketdata", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getGlobalData: {
        requestMethod: "GET",
        description: "Fetch overall global market data via CoinGecko. Returns structured JSON response data.",
        route: "/global",
        parameters: [],
        tests: [ 
            { _description: "Test getGlobalData - should return global market info" }
        ],
        modifiers: [
            { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getDeFiGlobalData: {
        requestMethod: "GET",
        description: "Fetch global DeFi market data via CoinGecko. Returns structured JSON response data.",
        route: "/global/decentralized_finance_defi",
        parameters: [],
        tests: [
            { _description: "Test getDeFiGlobalData - should return global DeFi stats" }
        ],
        modifiers: [
            { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
      modifyResult: async ({ struct, payload }) => {
        struct['data'] = struct['data']['data'] || []
        return { struct, payload };
      }
    }
  };
  