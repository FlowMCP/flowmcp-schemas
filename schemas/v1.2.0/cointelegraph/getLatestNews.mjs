const schema = {
    namespace: "cointelegraph",
    name: "CointelegraphRSS",
    description: "Fetch the latest cryptocurrency news from Cointelegraph via RSS — filter articles by category (Bitcoin, Ethereum, Altcoin, DeFi, etc.) and time range.",
    docs: ["https://cointelegraph.com/rss-feeds"],
    tags: ["crypto", "news", "media"],
    flowMCP: "1.2.0",
    root: "https://cointelegraph.com",
    requiredServerParams: [],
    headers: {},
    routes: {
      getLatestNews: {
        requestMethod: "GET",
        description: "Get the latest news articles from Cointelegraph RSS feeds by category and time range.",
        route: "/rss",  // base route is used, real URL assembled in logic
        parameters: [
          {
            position: {
              key: "category",
              value: "{{USER_PARAM}}",
              location: "query"
            },
            z: {
              primitive: "enum(all,editors_pick,altcoin,bitcoin,blockchain,ethereum,litecoin,monero,regulation,features,analysis,follow_up,in_depth,quiz,market_analysis,top_10_cryptocurrencies,weekly_overview)",
              options: []
            }
          },
          {
            position: {
              key: "range",
              value: "{{USER_PARAM}}",
              location: "query"
            },
            z: {
              primitive: "enum(1h,2h,4h,12h,24h,48h)",
              options: []
            }
          },
          {
            position: {
              key: "maxSummaryLength",
              value: "{{USER_PARAM}}",
              location: "query"
            },
            z: {
              primitive: "number()",
              options: ["min(0)", "max(1000)", "default(150)"]
            }
          }
        ],
        tests: [
          {
            _description: "Test Cointelegraph latest articles with default settings",
            category: "all",
            range: "24h",
            maxSummaryLength: 150
          }
        ],
        modifiers: [
          // { phase: "post", handler: "modifiyArticles" }
        ]
      }
    },
    handlers: {
      modifiyArticles: async ({ struct, payload }) => {
        const Parser = (await import('rss-parser')).default;
        const RANGE_TO_MS = {
          "1h": 1 * 60 * 60 * 1000,
          "2h": 2 * 60 * 60 * 1000,
          "4h": 4 * 60 * 60 * 1000,
          "12h": 12 * 60 * 60 * 1000,
          "24h": 24 * 60 * 60 * 1000,
          "48h": 48 * 60 * 60 * 1000
        };
        const parser = new Parser();
        const { range, maxSummaryLength } = struct.params;
        const { items } = await parser.parseString(struct.data);
  
        const filtered = items.map((article, id) => {
          const summarySource = article.contentSnippet || article.content || article.summary || "";
          let summary = summarySource.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
          if (maxSummaryLength > 0 && summary.length > maxSummaryLength) {
            summary = summary.slice(0, maxSummaryLength).trim() + "...";
          }
          return {
            id,
            title: article.title || "Untitled",
            published: article.pubDate || null,
            link: article.link || null,
            summary
          };
        }).filter(article => {
          const date = new Date(article.published || 0).getTime();
          return date >= Date.now() - RANGE_TO_MS[range];
        });
  
        struct.data = filtered;
        return { struct, payload };
      }
    }
  };
  
  export { schema };
  