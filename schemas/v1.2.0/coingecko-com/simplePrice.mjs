export const schema = {
  namespace: "coingecko",
    name: "CoinGeckoSimplePrice",
    description: "Fetch current prices for coins and tokens using CoinGecko's Simple API",
    docs: ["https://docs.coingecko.com/reference/introduction"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getSimplePrice: {
        requestMethod: "GET",
        description: "Fetch current price for one or more coins",
        route: "/simple/price",
        parameters: [
          { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "array()", options: [] } },
          { position: { key: "vs_currencies", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { _description: "Test getSimplePrice - should return BTC in USD", ids: ["bitcoin", "ethereum"], vs_currencies: "usd" }
        ],
        modifiers: [
            { phase: "post", handlerName: "extractSimplePrices" }
        ]
      },
      getTokenPrice: {
        requestMethod: "GET",
        description: "Fetch token price by contract address and chain",
        route: "/simple/token_price/:id",
        parameters: [
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "contract_addresses", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "vs_currencies", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
            { 
                _description: "Test getTokenPrice - should return PEPE token price in USD on Ethereum", 
                id: "ethereum", 
                contract_addresses: "0x6982508145454ce325ddbe47a25d4ec3d2311933", 
                vs_currencies: "usd" 
            }
        ],
        modifiers: [
            { phase: "post", handlerName: "extractTokenPrices" }
        ]
      }
    },
    handlers: {
        extractSimplePrices: async ({ struct, payload }) => {
            console.log( struct['data'])
            struct['data'] = Object
                .entries( struct['data'] )
                .map( ( [ id, prices ] ) => ( { id, prices } ) ) 
            console.log( '>>>', struct['data'] )
            return { struct, payload };
        },
        extractTokenPrices: async ({ struct, payload }) => {
        console.log( struct['data'] )
            struct['data'] = Object
                .entries( struct['data'] )
                .map( ( [ contract, prices ] ) => ( { contract, prices } ) )
            return { struct, payload };
        }
    }
  };
  