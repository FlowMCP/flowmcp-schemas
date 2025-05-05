export const schema = {
    name: "WhaleAlert",
    description: "Monitors and retrieves large cryptocurrency transactions using the Whale Alert API.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.whale-alert.io/v1",
    requiredServerParams: ["WHALE_ALERT_API_KEY"],
    headers: {
      api_key: "{{WHALE_ALERT_API_KEY}}"
    },
    routes: {
      getRecentTransactions: {
        requestMethod: "GET",
        description: "Fetch recent whale transactions (optionally filtered by blockchain).",
        route: "/transactions",
        parameters: [
          {
            position: { key: "blockchain", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "min_value", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["default(500000)"] }
          },
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(50)", "default(10)"] }
          }
        ],
        tests: [
          {
            _description: "Fetch top 5 whale transactions for Ethereum",
            blockchain: "ethereum",
            min_value: 1000000,
            limit: 5
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatWhaleTransactionList" }
        ]
      },
      getTransactionDetails: {
        requestMethod: "GET",
        description: "Fetch details of a specific whale transaction by transaction ID.",
        route: "/transaction",
        parameters: [
          {
            position: { key: "transaction_id", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Get details of a sample transaction",
            transaction_id: "sample_tx_123456"
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatWhaleTransactionDetail" }
        ]
      }
    },
    handlers: {
      formatWhaleTransactionList: async ({ struct, payload }) => {
        struct.transactions = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      },
      formatWhaleTransactionDetail: async ({ struct, payload }) => {
        struct.transaction_detail = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      }
    }
  };
  