export const schema = {
    name: "CoinGeckoDerivatives",
    description: "Retrieve derivatives markets and derivative exchanges from CoinGecko",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
      getDerivativeExchangeIds: {
        requestMethod: "GET",
        description: "Fetch the list of derivative exchanges",
        route: "/derivatives/exchanges",
        parameters: [],
        tests: [
          { _description: "Test getDerivativesExchanges - should return a list of derivative exchanges" }
        ],
        modifiers: [
          { phase: "post", handlerName: "getDerivativeExchangeIds" }
        ]
      },
      getDerivativeExchangesByIds: {
        requestMethod: "GET",
        description: "Fetch the list of derivative exchanges by IDs",
        route: "/derivatives/exchanges/",
        parameters: [
          { position: { key: "exchange_ids", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "array()", options: [] } }
        ],
        tests: [
          { _description: "Test getExchangesByIds - should return a list of derivative exchanges by IDs", exchange_ids: ["binance_futures", "okex_futures"] }
        ],
        modifiers: [
          { phase: "post", handlerName: "getDerivativeExchangesByIds" }
        ]
      },
      getDerivativeProductsByExchangeId: {
        requestMethod: "GET",
        description: "Fetch the list of derivative products by exchange ID",
        route: "/derivatives/",
        parameters: [
          { position: { key: "exchange_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "minimal_output", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Test getDerivativesByExchangeId - should return a list of derivative products by exchange ID", exchange_id: "binance_futures" },
          { _description: "Test getDerivativesByExchangeId - should return a list of derivative products by exchange ID", exchange_id: "binance_futures", minimal_output: "false" }
        ],
        modifiers: []
      },
/*
      getDerivativesExchanges: {
        requestMethod: "GET",
        description: "Fetch the list of derivative exchanges",
        route: "/derivatives/exchanges",
        parameters: [],
        tests: [
          { _description: "Test getDerivativesExchanges - should return a list of derivative exchanges" }
        ],
        modifiers: []
      },
      getDerivatives: {
        requestMethod: "GET",
        description: "Fetch the list of derivatives products like Futures and Perpetuals",
        route: "/derivatives",
        parameters: [],
        tests: [
          { _description: "Test getDerivatives - should return a list of derivative products" } 
        ],
        modifiers: [
          { phase: "post", handlerName: "extractDerivatives" }
        ]
      }
*/
    },
    handlers: {
        getDerivativeExchangeIds: async ( { struct, payload } ) => {
            struct['data'] = {
            'exchange_ids': struct['data']
                .map( ( c ) => c['id'] )
            }
            return { struct, payload };
        },
        getDerivativeExchangesByIds: async ( { struct, payload, userParams } ) => {
            const { exchange_ids } = userParams
            struct['data'] = exchange_ids
                .reduce( ( acc, id ) => {
                    const item = struct['data']
                        .filter( ( c ) => c['id'] === id )
                    acc[ id ] = item ? item[ 0 ] : null
                    return acc
                }, {} ) 

            return { struct, payload }
        },
        getDerivativeProductsByExchangeId: async ( { struct, payload, userParams } ) => {
            const { exchange_id, minimal_output } = userParams
            if( !minimal_output ) {
                struct['data'] = struct['data']
                    .filter( ( c ) => c['exchange_id'] === exchange_id )
            } else {
                struct['data'] = struct['data']
                    .filter( ( c ) => c['exchange_id'] === exchange_id )
                    .map( ( c ) => {
                        const { symbol, contract_type } = c
                        return { symbol, contract_type }
                    } )
            }

            return { struct, payload }
        }
    }
  };
  