export const schema = {
    name: "DexAndContracts",
    description: "Provides insights into DEX trading pairs, trending contracts, and market share across chains via Dune Analytics.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.dune.com/api/v1",
    requiredServerParams: ["DUNE_API_KEY"],
    headers: {
      "X-Dune-Api-Key": "{{DUNE_API_KEY}}"
    },
    routes: {
      getDexPairStats: {
        requestMethod: "GET",
        description: "Get DEX pair statistics for a given blockchain.",
        route: "/dex/pairs/:chain",
        parameters: [
          {
            position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" },
            z: {
              primitive: "string()",
              options: ["enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)"]
            }
          },
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
          {
            _description: "Get DEX pairs for optimism",
            chain: "optimism",
            limit: 5
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatDexPairsHandler" }
        ]
      },
      getTrendingContracts: {
        requestMethod: "GET",
        description: "Get trending contracts deployed on EVM chains based on the last 30 days.",
        route: "/trends/evm/contracts/:chain",
        parameters: [
          {
            position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" },
            z: {
              primitive: "string()",
              options: ["enum(arbitrum,base,bnb,celo,ethereum,fantom,gnosis,optimism,polygon,scroll,zk_sync,solana)"]
            }
          },
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
          {
            _description: "Get trending contracts on base",
            chain: "base",
            limit: 3
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatContractsHandler" }
        ]
      },
      getMarketShare: {
        requestMethod: "GET",
        description: "Get DEX or NFT market share on a specific chain.",
        route: "/marketshare/:market/:chain",
        parameters: [
          {
            position: { key: "market", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: ["enum(dex,nft)"] }
          },
          {
            position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: ["min(1)"] }
          },
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
          {
            _description: "Get DEX market share for polygon",
            market: "dex",
            chain: "polygon",
            limit: 5
          }
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
  