export const schema = {
    name: "SolSniffer",
    description: "Analyzes Solana tokens using the Solsniffer API to assess risks and metadata.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://solsniffer.com/api/v2/token",
    requiredServerParams: ["SOLSNIFFER_API_KEY"],
    headers: {
      "X-API-KEY": "{{SOLSNIFFER_API_KEY}}",
      accept: "application/json"
    },
    routes: {
      analysisToken: {
        requestMethod: "GET",
        description: "Analyze a Solana token using its address and return risk and token metadata.",
        route: "/:token_address",
        parameters: [
          {
            position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: ["min(32)"] }
          }
        ],
        tests: [
          {
            _description: "Analyze example token address",
            token_address: "So11111111111111111111111111111111111111112"
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "extractTokenAnalysis" }
        ]
      }
    },
    handlers: {
      extractTokenAnalysis: async ({ struct, payload }) => {
        struct.analysis = payload?.content?.[0]?.json || {};
        return { struct, payload };
      }
    }
  };
  