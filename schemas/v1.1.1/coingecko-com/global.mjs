export const schema = {
    name: "CoinGeckoGlobal",
    description: "Fetch global and DeFi global market data from CoinGecko",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getGlobalData: {
        requestMethod: "GET",
        description: "Fetch overall global market data",
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
        description: "Fetch global DeFi market data",
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
  