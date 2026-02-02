export const schema = {
    namespace: "cryptopanic",
    name: "CryptoPanic",
    description: "Fetches cryptocurrency news headlines from CryptoPanic across different content types.",
    docs: ["https://cryptopanic.com/developers/api/"],
    tags: ["crypto", "news", "aggregator", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://cryptopanic.com/api/v1/posts",
    requiredServerParams: ["CRYPTOPANIC_API_KEY"],
    headers: {},
    routes: {
      getCryptoCryptopanicNews: {
        requestMethod: "GET",
        description: "Get a list of crypto news headlines from CryptoPanic. Returns structured JSON response data.",
        route: "/",
        parameters: [
          { position: { key: "kind", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(news,media,analysis)",   options: [ "default(news)"] } },
          { position: { key: "num_pages", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()",   options: ["min(1)", "max(10)", "default(1)"] } },
          { position: { key: "auth_token", value: "{{CRYPTOPANIC_API_KEY}}", location: "query" } },
          { position: { key: "regions", value: "en", location: "query" } }
        ],
        tests: [
          { _description: "Get general crypto news headlines from 2 pages", kind: "news", num_pages: 2 }
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
  