export const schema = {
    name: "CryptoPanic",
    description: "Fetches cryptocurrency news headlines from CryptoPanic across different content types.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://cryptopanic.com/api/v1/posts",
    requiredServerParams: ["CRYPTOPANIC_API_KEY"],
    headers: {},
    routes: {
      getCryptoCryptopanicNews: {
        requestMethod: "GET",
        description: "Get a list of crypto news headlines from CryptoPanic.",
        route: "/",
        parameters: [
          {
            position: { key: "kind", value: "{{USER_PARAM}}", location: "query" },
            z: {
              primitive: "string()",
              options: ["enum(news,media,analysis)", "default(news)"]
            }
          },
          {
            position: { key: "num_pages", value: "{{USER_PARAM}}", location: "query" },
            z: {
              primitive: "number()",
              options: ["min(1)", "max(10)", "default(1)"]
            }
          },
          {
            position: { key: "auth_token", value: "{{CRYPTOPANIC_API_KEY}}", location: "query" },
          },
          {
            position: { key: "regions", value: "en", location: "query" },
          }
        ],
        tests: [
          {
            _description: "Get general crypto news headlines from 2 pages",
            kind: "news",
            num_pages: 2
          }
        ],
        modifiers: [
          // { phase: "post", handlerName: "formatCryptoPanicNews" }
        ]
      }
    },
    handlers: {
      formatCryptoPanicNews: async ({ struct, payload }) => {
        struct.headlines = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      }
    }
  };
  