export const schema = {
    namespace: "coinmarketcap",
    name: "CoinMarketCap Categories",
    description: "Retrieve cryptocurrency category data from CoinMarketCap — list categories, get category details, map coin IDs, fetch metadata, and query latest market quotes.",
    docs: ["https://coinmarketcap.com/api/documentation/v1/"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://pro-api.coinmarketcap.com",
    requiredServerParams: ["CMC_API_KEY"],
    headers: {
      "X-CMC_PRO_API_KEY": "{{CMC_API_KEY}}"
    },
    routes: {
      getCategories: {
        requestMethod: "GET",
        description: "Get a list of all cryptocurrency categories via CoinMarketCap. Supports start, limit, id filters.",
        route: "/v1/cryptocurrency/categories",
        parameters: [
          { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(5000)", "optional()"] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }}
        ],
        tests: [
          { _description: "Fetch categories with default pagination" },
          // { _description: "Fetch categories starting from 10, limit 100", start: 10, limit: 100 }
        ],
        modifiers:[
            { phase: "pre", handlerName: "modify" },
            { phase: "post", handlerName: "modify" }
        ]
      },
      getCategory: {
        requestMethod: "GET",
        description: "Get information about a single cryptocurrency category via CoinMarketCap. Supports start, limit, convert filters.",
        route: "/v1/cryptocurrency/category",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(1000)", "optional()"] } },
          { position: { key: "convert", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "convert_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Fetch a category by ID",  id: "605e2ce9d41eae1066535f7c" },
          // { _description: "Fetch a category by ID with pagination", id: "605e2ce9d41eae1066535f7c", start: 1, limit: 50 }
        ],
        modifiers: [
            { phase: "post", handlerName: "modify" }
        ]
      },
      getIdMap: {
        requestMethod: "GET",
        description: "Get a mapping of all cryptocurrencies to unique CoinMarketCap IDs. Optional filters: listing_status, start, limit, sort, symbol, aux.",
        route: "/v1/cryptocurrency/map",
        parameters: [
          { position: { key: "listing_status", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(active,inactive,untracked)", options: ["optional()"] } },
          { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(5000)", "optional()"] } },
          { position: { key: "sort", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(id,cmc_rank)", options: ["optional()"] } },
          { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "aux", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Fetch active cryptocurrency ID map", listing_status: "active" },
          { _description: "Fetch limited ID map sorted by cmc_rank", sort: "cmc_rank", limit: 50 }
        ],
        modifiers: [
            { phase: "post", handlerName: "modify" }
        ]
      },
      getMetadataV2: {
        requestMethod: "GET",
        description: "Get static metadata for one or more cryptocurrencies including logo, description, website URLs, and social links.",
        route: "/v2/cryptocurrency/info",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] }},
          { position: { key: "skip_invalid", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] }},
          { position: { key: "aux", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Fetch metadata for Bitcoin by ID", id: "1" },
          { _description: "Fetch metadata for Ethereum by slug", slug: "ethereum" },
          { _description: "Fetch metadata by symbol and allow skipping invalids", symbol: "BTC,ETH", skip_invalid: true }
        ],
        modifiers: [
            { phase: "post", handlerName: "modify" }
        ]
      },
      getQuotesLatestV2: {
        requestMethod: "GET",
        description: "Get the latest market quote for one or more cryptocurrencies, supporting multiple conversions.",
        route: "/v2/cryptocurrency/quotes/latest",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "slug", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "convert", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "convert_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "aux", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "skip_invalid", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Fetch latest quote for Bitcoin by ID", id: "1" },
          { _description: "Fetch latest quote for Ethereum and Bitcoin by symbol", symbol: "BTC,ETH", convert: "USD" },
          { _description: "Fetch quote using slug and skip invalids", slug: "bitcoin,ethereum", skip_invalid: true }
        ],
        modifiers: [
          { phase: "post", handlerName: "modify" }
        ]
      }        
    },
    handlers: {
        modify: async ({ struct, payload, phase  } ) => {
            // Modify the response structure or payload if needed
            return { struct, payload };
        }
    }
  };
  