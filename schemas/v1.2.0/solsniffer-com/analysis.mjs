export const schema = {
    namespace: "solsniffer",
    name: "SolSniffer",
    description: "Analyze Solana token security via SolSniffer — assess contract risks, detect rug-pull indicators, check mint authority, and retrieve token safety scores.",
    docs: ["https://solsniffer.gitbook.io/solsniffer-user-guide"],
    tags: ["solana", "security", "analysis"],
    flowMCP: "1.2.0",
    root: "https://solsniffer.com/api/v2/token",
    requiredServerParams: ["SOLSNIFFER_API_KEY"],
    headers: {
      "X-API-KEY": "{{SOLSNIFFER_API_KEY}}",
      accept: "application/json"
    },
    routes: {
      analysisToken: {
        requestMethod: "GET",
        description: "Analyze a Solana token using its address and return risk and token metadata. Required: token_address.",
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
  