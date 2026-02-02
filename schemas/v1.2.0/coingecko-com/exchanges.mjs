export const schema = {
    namespace: "coingecko",
    name: "CoinGeckoExchanges",
    description: "Fetch exchanges list, exchange details, and exchange trading pairs from CoinGecko",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: ["crypto", "exchanges", "marketdata"],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getExchangesList: {
        requestMethod: "GET",
        description: "Fetch the list of all supported exchanges via CoinGecko. Returns structured JSON response data.",
        route: "/exchanges/list",
        parameters: [],
        tests: [{ _description: "Test getExchangesList - should return a list of exchanges" }],
        modifiers: [
            // { phase: "post", handlerName: "extractExchangesList" }
        ]
      },
      getExchangeById: {
        requestMethod: "GET",
        description: "Fetch details of a specific exchange via CoinGecko — query by id. Returns structured JSON response data.",
        route: "/exchanges/:id",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getExchangeById - should return Binance details", id: "binance" }],
        modifiers: [
            { phase: "post", handlerName: "getExchangeById" }
        ]
      },
      getExchangeTickers: {
        requestMethod: "GET",
        description: "Fetch trading pairs (tickers) for a specific exchange via CoinGecko — query by id.",
        route: "/exchanges/:id/tickers",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [{ _description: "Test getExchangeTickers - should return tickers for Binance", id: "binance" } ],
        modifiers: [
            { phase: "post", handlerName: "getExchangeTickers" }
        ]
      }

    },
    handlers: {
        getExchangeById: async ({ struct, payload }) => {
            struct['data']['tickers'] = struct['data']['tickers']
                .map( ( t ) => {
                    const { base, target, last, volume } = t
                    const result = { base, target, last_price: last, volume }
                    return result
                } )

            return { struct, payload };
        },
        getExchangeTickers: async ( { struct, payload } ) => {
            struct['data'] = struct['data']['tickers']


            return { struct, payload }
        }
    }
}
  