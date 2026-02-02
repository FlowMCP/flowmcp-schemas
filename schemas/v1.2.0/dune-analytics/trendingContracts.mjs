export const schema = {
    namespace: "duneAnalytics",
    name: "DexAndContracts",
    description: "Provides insights into DEX trading pairs, trending contracts, and market share across chains via Dune Analytics.",
    docs: ["https://docs.dune.com/api-reference/overview/introduction"],
    tags: ["analytics", "contracts", "trending"],
    flowMCP: "1.2.0",
    root: "https://api.dune.com/api/v1",
    requiredServerParams: ["DUNE_API_KEY"],
    headers: {
      "X-Dune-Api-Key": "{{DUNE_API_KEY}}"
    },
    routes: {
      getDexPairStats: {
        requestMethod: "GET",
        description: "Get DEX pair statistics for a given blockchain via Dune Analytics — query by chain.",
        route: "/dex/pairs/:chain",
        parameters: [
          { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)", options: [] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } },
          { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "filters", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "columns", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Get DEX pairs for optimism", chain: "optimism", limit: 5 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatDexPairsHandler" }
        ]
      },
      getTrendingContracts: {
        requestMethod: "GET",
        description: "Get trending contracts deployed on EVM chains based on the last 30 days. Required: chain, limit. Optional filters: sort_by, filters, columns.",
        route: "/trends/evm/contracts/:chain",
        parameters: [
          { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)", options: [] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } },
          { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "filters", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "columns", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Get trending contracts on base", chain: "base", limit: 3 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatContractsHandler" }
        ]
      },
      getMarketShare: {
        requestMethod: "GET",
        description: "Get DEX or NFT market share on a specific chain via Dune Analytics — query by market and chain.",
        route: "/marketshare/:market/:chain",
        parameters: [
          { position: { key: "market", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(dex,nft)", options: [] } },
          { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
          { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } },
          { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "filters", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "columns", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Get DEX market share for polygon", market: "dex", chain: "polygon", limit: 5 }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatMarketShareHandler" }
        ]
      }
    },
    handlers: {
      formatDexPairsHandler: async ({ struct, payload }) => {
        struct.pairs = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      },
      formatContractsHandler: async ({ struct, payload }) => {
        struct.contracts = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      },
      formatMarketShareHandler: async ({ struct, payload }) => {
        struct.market = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      }
    }
  };
  