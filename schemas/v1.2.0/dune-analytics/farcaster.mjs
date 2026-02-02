export const schema = {
    namespace: "duneAnalytics",
    name: "FarcasterTrends",
    description: "Fetches trending memecoins, channels, and users from Farcaster via Dune Analytics.",
    docs: ["https://docs.dune.com/api-reference/overview/introduction"],
    tags: ["analytics", "farcaster", "social"],
    flowMCP: "1.2.0",
    root: "https://api.dune.com/api/v1/farcaster/trends",
    requiredServerParams: ["DUNE_API_KEY"],
    headers: {
      "X-Dune-Api-Key": "{{DUNE_API_KEY}}"
    },
    routes: {
      farcasterGetTrendingMemecoins: {
        requestMethod: "GET",
        description: "Get trending Farcaster memecoins from Dune Analytics. Supports sort_by, filters, columns filters.",
        route: "/memecoins",
        parameters: [
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] }
          },
          {
            position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "filters", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "columns", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Fetch top 5 memecoins", limit: 5 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatMemecoinList" }
        ]
      },
      farcasterGetTrendingChannels: {
        requestMethod: "GET",
        description: "Get trending Farcaster channels from Dune Analytics. Supports sort_by, filters, columns filters.",
        route: "/channels",
        parameters: [
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] }
          },
          {
            position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "filters", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "columns", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Fetch top 3 channels", limit: 3 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatChannelList" }
        ]
      },
      farcasterGetTrendingUsers: {
        requestMethod: "GET",
        description: "Get trending Farcaster users who casted in the last 14 days. Required: limit. Optional filters: sort_by, filters, columns.",
        route: "/users",
        parameters: [
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] }
          },
          {
            position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "filters", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          },
          {
            position: { key: "columns", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Fetch top 5 users", limit: 5 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatUserList" }
        ]
      }
    },
    handlers: {
      formatMemecoinList: async ({ struct, payload }) => {
        struct.memecoins = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      },
      formatChannelList: async ({ struct, payload }) => {
        struct.channels = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      },
      formatUserList: async ({ struct, payload }) => {
        struct.users = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      }
    }
  };
  