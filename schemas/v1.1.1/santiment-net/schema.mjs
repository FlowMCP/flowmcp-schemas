const schema = {
  name: "SantimentAnalytics",
  description: "Provides sentiment and social metrics for crypto assets using the Santiment API.",
  version: "1.0.0",
  flowMCP: "1.0.0",
  root: "https://api.santiment.net",
  requiredServerParams: ["SANTIMENT_API_KEY"],
  headers: {
    Authorization: "Apikey {{SANTIMENT_API_KEY}}"
  },
  routes: {
    get_sentiment_balance: {
      requestMethod: "POST",
      description: "Get average sentiment balance for a crypto asset over a specified number of days.",
      route: "/graphql",
      parameters: [
        {
          position: { key: "asset", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "string()", options: [] }
        },
        {
          position: { key: "days", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(1)", "max(90)", "default(7)"] }
        }
      ],
      tests: [{ _description: "Sentiment for Bitcoin 7 days", asset: "bitcoin", days: 7 }],
      modifiers: [
        { phase: "pre", handlerName: "buildSantimentQuery" }
      ]
    },
    get_social_volume: {
      requestMethod: "POST",
      description: "Get total social media volume for a crypto asset.",
      route: "/graphql",
      parameters: [
        {
          position: { key: "asset", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "string()", options: [] }
        },
        {
          position: { key: "days", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(1)", "max(90)", "default(7)"] }
        }
      ],
      tests: [{ _description: "Bitcoin 30-day social volume", asset: "bitcoin", days: 30 }],
      modifiers: [{ phase: "pre", handlerName: "buildSantimentQuery" }]
    },
    alert_social_shift: {
      requestMethod: "POST",
      description: "Detect significant changes in social media volume for a crypto asset.",
      route: "/graphql",
      parameters: [
        {
          position: { key: "asset", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "string()", options: [] }
        },
        {
          position: { key: "threshold", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["default(50)"] }
        },
        {
          position: { key: "days", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(2)", "max(30)", "default(7)"] }
        }
      ],
      tests: [{ _description: "Alert for Bitcoin, 50% threshold, 7 days", asset: "bitcoin", threshold: 50, days: 7 }],
      modifiers: [{ phase: "pre", handlerName: "buildSantimentQuery" }]
    },
    get_trending_words: {
      requestMethod: "POST",
      description: "Retrieve top trending words in crypto discussions.",
      route: "/graphql",
      parameters: [
        {
          position: { key: "days", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(1)", "max(30)", "default(7)"] }
        },
        {
          position: { key: "top_n", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(1)", "max(20)", "default(5)"] }
        }
      ],
      tests: [{ _description: "Top 5 trending words over 7 days", days: 7, top_n: 5 }],
      modifiers: [{ phase: "pre", handlerName: "buildSantimentQuery" }]
    },
    get_social_dominance: {
      requestMethod: "POST",
      description: "Get average social dominance for a crypto asset.",
      route: "/graphql",
      parameters: [
        {
          position: { key: "asset", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "string()", options: [] }
        },
        {
          position: { key: "days", value: "{{USER_PARAM}}", location: "body" },
          z: { primitive: "number()", options: ["min(1)", "max(30)", "default(7)"] }
        }
      ],
      tests: [{ _description: "Social dominance for Bitcoin", asset: "bitcoin", days: 7 }],
      modifiers: [{ phase: "pre", handlerName: "buildSantimentQuery" }]
    }
  },
  handlers: {
    buildSantimentQuery: async ({ struct, payload, userParams, routeName }) => {
      const to = new Date();
      const from = new Date(to.getTime() - (userParams.days || 7) * 86400000);
      let query = "";
      const asset = userParams.asset;

      const metrics = {
        get_sentiment_balance: "sentiment_balance_total",
        get_social_volume: "social_volume_total",
        alert_social_shift: "social_volume_total",
        get_social_dominance: "social_dominance_total"
      };

      if (routeName === "get_trending_words") {
        query = `
          {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
              datetime
              topWords {
                word
                score
              }
            }
          }
        `;
      } else if (metrics[routeName]) {
        query = `
          {
            getMetric(metric: "${metrics[routeName]}") {
              timeseriesData(
                slug: "${asset}",
                from: "${from.toISOString()}",
                to: "${to.toISOString()}",
                interval: "1d"
              ) {
                datetime
                value
              }
            }
          }
        `;
      }

      payload['body'] = { query };

      return { struct, payload };
    }
  }
};

export { schema };
