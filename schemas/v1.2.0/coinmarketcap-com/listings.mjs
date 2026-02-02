export const schema = {
  namespace: "coinmarketcap",
  name: "CoinMarketCapListingsLatest",
  description: "Returns a paginated list of all active cryptocurrencies with latest market data.",
  docs: ["https://coinmarketcap.com/api/documentation/v1/"],
  tags: ["crypto", "listings", "marketdata"],
  flowMCP: "1.2.0",
  root: "https://pro-api.coinmarketcap.com/v1",
  requiredServerParams: ["CMC_API_KEY"],
  headers: {
    "X-CMC_PRO_API_KEY": "{{CMC_API_KEY}}"
  },
  routes: {
    listingsLatest: {
      requestMethod: "GET",
      description: "Get latest listings of cryptocurrencies sorted and paginated. via CoinMarketCap.",
      route: "/cryptocurrency/listings/latest",
      parameters: [
        { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
        { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(5000)", "optional()"] } },
        { position: { key: "price_min", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "price_max", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "market_cap_min", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "market_cap_max", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "volume_24h_min", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "volume_24h_max", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "circulating_supply_min", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "circulating_supply_max", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
        { position: { key: "percent_change_24h_min", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(-100)", "optional()"] } },
        { position: { key: "percent_change_24h_max", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(-100)", "optional()"] } },
        { position: { key: "convert", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
        { position: { key: "convert_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
        { position: { key: "sort", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(market_cap,market_cap_strict,name,symbol,date_added,price,circulating_supply,total_supply,max_supply,num_market_pairs,market_cap_by_total_supply_strict,volume_24h,percent_change_1h,percent_change_24h,percent_change_7d,volume_7d,volume_30d)", options: ["optional()"] } },
        { position: { key: "sort_dir", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(asc,desc)", options: ["optional()"] } },
        { position: { key: "cryptocurrency_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(all,coins,tokens)", options: ["optional()"] } },
        { position: { key: "tag", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
        { position: { key: "aux", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
      ],
      tests: [
        { _description: "Basic call without parameters", },
        { _description: "Paginated call with start=10 and limit=50", start: 10, limit: 50 },
        { _description: "Filter by market cap and sort descending by price", market_cap_min: 10000000, sort: "price", sort_dir: "desc" },
        { _description: "Filter using convert with USD", convert: "USD" }
      ],
      modifiers: [
        { phase: "pre", handlerName: "standardHandler" },
        { phase: "post", handlerName: "defaultHandler" }
      ]
    }
  },
  handlers: {
    standardHandler: async ({ struct, payload }) => {
      return { struct, payload };
    },
    defaultHandler: async ({ struct, payload }) => {
      return { struct, payload };
    }
  }
};
