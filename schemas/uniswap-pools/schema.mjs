export const schema = {
    name: "UniswapPools",
    description: "Fetches recently created Uniswap V3 trading pools across multiple blockchains.",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://gateway.thegraph.com/api",
    requiredServerParams: ["THEGRAPH_API_KEY"],
    headers: {
      Authorization: "Bearer {{THEGRAPH_API_KEY}}"
    },
    routes: {
      getNewPools: {
        requestMethod: "POST",
        description: "List new Uniswap V3 pools by chain and order criteria within a time range.",
        route: "/{{THEGRAPH_API_KEY}}/subgraphs/id/:chainSpecificId",
        parameters: [
          {
            position: { key: "chain", value: "{{USER_PARAM}}", location: "query" },
            z: {
              primitive: "string()",
              options: ["enum(ethereum,base,optimism,arbitrum,polygon,bsc,avalanche,celo,blast)", "default(ethereum)"]
            }
          },
          {
            position: { key: "order_by", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: ["enum(timestamp,txcount,volume,tvl)", "default(timestamp)"] }
          },
          {
            position: { key: "time_range_seconds", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(60)", "max(86400)", "default(300)"] }
          },
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(100)"] }
          }
        ],
        tests: [
          {
            _description: "Fetch most recent pools on Optimism ordered by volume",
            chain: "optimism",
            order_by: "volume",
            time_range_seconds: 600,
            limit: 5
          }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatUniswapPools" }
        ]
      }
    },
    handlers: {
      formatUniswapPools: async ({ struct, payload }) => {
        struct.pools = payload?.content?.[0]?.text || "No data.";
        return { struct, payload };
      }
    }
  };
  