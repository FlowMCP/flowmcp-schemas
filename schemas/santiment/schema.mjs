export const schema = {
    name: "Santiment",
    description: "Fetches sentiment, social volume, dominance, and trending word data for crypto assets using Santiment's API.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.santiment.net/graphql",
    requiredServerParams: ["SANTIMENT_API_KEY"],
    headers: {
      Authorization: "Apikey {{SANTIMENT_API_KEY}}"
    },
    routes: {
      getSentimentBalance: {
        requestMethod: "POST",
        description: "Returns the average sentiment balance for a crypto asset.",
        route: "/graphql",
        parameters: [
          {
            position: { key: "asset", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(90)", "default(7)"] }
          }
        ],
        tests: [
          {
            _description: "Get sentiment balance for Bitcoin over 7 days",
            asset: "bitcoin",
            days: 7
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "extractSentimentBalance" }
        ]
      },
      getSocialVolume: {
        requestMethod: "POST",
        description: "Fetches the total number of social mentions for a crypto asset.",
        route: "/graphql",
        parameters: [
          {
            position: { key: "asset", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(90)", "default(7)"] }
          }
        ],
        tests: [
          {
            _description: "Get social volume for Ethereum over 14 days",
            asset: "ethereum",
            days: 14
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "extractSocialVolume" }
        ]
      },
      alertSocialShift: {
        requestMethod: "POST",
        description: "Detects significant changes in social volume for a crypto asset.",
        route: "/graphql",
        parameters: [
          {
            position: { key: "asset", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "threshold", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["default(50)"] }
          },
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(2)", "max(30)", "default(7)"] }
          }
        ],
        tests: [
          {
            _description: "Detect spike in social volume for Solana",
            asset: "solana",
            threshold: 40,
            days: 7
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "analyzeSocialShift" }
        ]
      },
      getTrendingWords: {
        requestMethod: "POST",
        description: "Fetches the top trending words in crypto discussions over a period.",
        route: "/graphql",
        parameters: [
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(30)", "default(7)"] }
          },
          {
            position: { key: "top_n", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(20)", "default(5)"] }
          }
        ],
        tests: [
          {
            _description: "Get top 10 trending words from the last 3 days",
            days: 3,
            top_n: 10
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "extractTrendingWords" }
        ]
      },
      getSocialDominance: {
        requestMethod: "POST",
        description: "Returns the average social dominance percentage for a crypto asset.",
        route: "/graphql",
        parameters: [
          {
            position: { key: "asset", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "days", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(30)", "default(7)"] }
          }
        ],
        tests: [
          {
            _description: "Get social dominance for dogecoin",
            asset: "dogecoin",
            days: 10
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "extractSocialDominance" }
        ]
      }
    },
    handlers: {
      extractSentimentBalance: async ({ struct, payload }) => {
        struct.sentiment = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      extractSocialVolume: async ({ struct, payload }) => {
        struct.social_volume = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      analyzeSocialShift: async ({ struct, payload }) => {
        struct.social_shift = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      extractTrendingWords: async ({ struct, payload }) => {
        struct.trending = payload?.content?.[0]?.text || "";
        return { struct, payload };
      },
      extractSocialDominance: async ({ struct, payload }) => {
        struct.social_dominance = payload?.content?.[0]?.text || "";
        return { struct, payload };
      }
    }
  };
  