export const schema = {
    namespace: "coingecko",
    name: "CoinGeckoCoins",
    description: "Fetch coins list, markets, details, history, tickers, and token info from CoinGecko",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getCoinsList: {
        requestMethod: "GET",
        description: "Fetch the list of all coins (id, symbol, name)",
        route: "/coins/list",
        parameters: [],
        tests: [{ _description: "Test getCoinsList - should return list of coins" }],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinsMarkets: {
        requestMethod: "GET",
        description: "Fetch market data for coins",
        route: "/coins/markets",
        parameters: [
          { position: { key: "vs_currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [{ _description: "Test getCoinsMarkets - should return BTC market data", vs_currency: "usd", ids: "bitcoin" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinById: {
        requestMethod: "GET",
        description: "Fetch detailed info for a specific coin",
        route: "/coins/:id",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getCoinById - should return Bitcoin details", id: "bitcoin" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinMarketChart: {
        requestMethod: "GET",
        description: "Fetch historical market chart data for a coin",
        route: "/coins/:id/market_chart",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "vs_currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "days", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getCoinMarketChart - should return BTC 7d chart", id: "bitcoin", vs_currency: "usd", days: "7" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinHistory: {
        requestMethod: "GET",
        description: "Fetch historical coin data by date",
        route: "/coins/:id/history",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "date", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getCoinHistory - should return BTC data for 30-12-2020", id: "bitcoin", date: "30-12-2024" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinTickers: {
        requestMethod: "GET",
        description: "Fetch all trading pairs (tickers) for a coin",
        route: "/coins/:id/tickers",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getCoinTickers - should return tickers for Bitcoin", id: "bitcoin" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      },
      getCoinContractInfo: {
        requestMethod: "GET",
        description: "Fetch coin information by contract address",
        route: "/coins/:id/contract/:contract_address",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "contract_address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getCoinContractInfo - should return PEPE token info on Ethereum", id: "ethereum", contract_address: "0x6982508145454ce325ddbe47a25d4ec3d2311933" } ],
        modifiers: [{ phase: "post", handlerName: "modifyResult" }]
      }
    },
    handlers: {
        modifyResult: async( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}