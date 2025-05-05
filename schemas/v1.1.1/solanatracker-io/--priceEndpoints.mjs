const priceRoutes = {
    getTokenPrice: {
      method: "GET",
      path: "/price",
      description: "Get price info for a single token. Supports optional price change data.",
      queryParams: ["token (required)", "priceChanges (optional)"],
      matchesSchemaRoute: "priceInformation", // ✅ schema.routes.priceInformation
      priceInformation: {
        requestMethod: "GET",
        description: "Get price information for a single token.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test priceInformation", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    postTokenPrice: {
      method: "POST",
      path: "/price",
      description: "Get price info for a single token (token passed in body).",
      bodyParams: ["token"],
      matchesSchemaRoute: "postPrice", // ✅ schema.routes.postPrice
      postPrice: {
        requestMethod: "POST",
        description: "Similar to GET /price, but accepts token address in the request body.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "body" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          { _description: "Test postPrice", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      },
    },
    getHistoricPrice: {
      method: "GET",
      path: "/price/history",
      description: "Get historic price points for a token (3d, 5d, 7d, 14d, 30d).",
      queryParams: ["token (required)"],
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getPriceAtTimestamp: {
      method: "GET",
      path: "/price/history/timestamp",
      description: "Get price at a specific timestamp for a token.",
      queryParams: ["token (required)", "timestamp (required)"],
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getPriceRange: {
      method: "GET",
      path: "/price/history/range",
      description: "Get lowest and highest prices for a token within a time range.",
      queryParams: ["token (required)", "time_from (required)", "time_to (required)"],
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    },
    getMultiPrice: {
      method: "GET",
      path: "/price/multi",
      description: "Get price info for multiple tokens (up to 100).",
      queryParams: ["tokens (required)", "priceChanges (optional)"],
      matchesSchemaRoute: "multiPriceInformation", // ✅ schema.routes.multiPriceInformation
      multiPriceInformation: {
        requestMethod: "GET",
        description: "Get price information for multiple tokens (up to 100).",
        route: "/price/multi",
        parameters: [
          {
            position: { key: "tokens", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "object()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          { _description: "Test multiPriceInformation", tokens: ["CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"] }
        ],
        modifiers: [ { 'phase': 'post', 'handlerName': 'parseExecute' } ]
      }
    },
    postMultiPrice: {
      method: "POST",
      path: "/price/multi",
      description: "Get price info for multiple tokens (POST version).",
      bodyParams: ["tokens"],
      matchesSchemaRoute: null // ❌ nicht im schema.mjs enthalten
    }
  }


const schema = {
    name: "TokenPriceAPI",
    description: "Provides real-time and historical token price information",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
      'x-api-key': "{{SOLANA_TRACKER_API_KEY}}",
      'Content-Type': "application/json"
    },
    routes: {
      priceInformation: {
        requestMethod: "GET",
        description: "Get price information for a single token.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          {
            _description: "Test priceInformation",
            token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      postPrice: {
        requestMethod: "POST",
        description: "Similar to GET /price, but accepts token address in the request body.",
        route: "/price",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "body" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Test postPrice",
            token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      multiPriceInformation: {
        requestMethod: "GET",
        description: "Get price information for multiple tokens (up to 100).",
        route: "/price/multi",
        parameters: [
          {
            position: { key: "tokens", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "object()", options: [] }
          },
          {
            position: { key: "priceChanges", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "boolean()", options: ["optional()"] }
          }
        ],
        tests: [
          {
            _description: "Test multiPriceInformation",
            tokens: ["CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"]
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      getHistoricPrice: {
        requestMethod: "GET",
        description: "Get historic price points for a token (3d, 5d, 7d, 14d, 30d).",
        route: "/price/history",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Test getHistoricPrice",
            token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      getPriceAtTimestamp: {
        requestMethod: "GET",
        description: "Get price at a specific timestamp for a token.",
        route: "/price/history/timestamp",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "timestamp", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Test getPriceAtTimestamp",
            token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
            timestamp: 1713907200
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      getPriceRange: {
        requestMethod: "GET",
        description: "Get lowest and highest prices for a token within a time range.",
        route: "/price/history/range",
        parameters: [
          {
            position: { key: "token", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "string()", options: [] }
          },
          {
            position: { key: "time_from", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: [] }
          },
          {
            position: { key: "time_to", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Test getPriceRange",
            token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
            time_from: 1738368000,
            time_to: 1738540800
          }
        ],
        modifiers: [ { phase: "post", handlerName: "parseExecute" } ]
      },
      postMultiPrice: {
        requestMethod: "POST",
        description: "Get price info for multiple tokens (POST version).",
        route: "/price/multi",
        parameters: [
          {
            position: { key: "tokens", value: "{{USER_PARAM}}", location: "body" },
            z: { primitive: "object()", options: [] }
          }
        ],
        tests: [
          {
            _description: "Test postMultiPrice",
            tokens: ["CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump", "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump"]
          }
        ],
        modifiers: [ 
          { phase: "pre", handlerName: "beforeExecute" },
          { phase: "post", handlerName: "parseExecute" } 
        ]
      }
    },
    handlers: {
      beforeExecute: async ({ struct, payload }) => {
        // console.log( "beforeExecute", struct, payload );

        return { struct, payload };
      },
      parseExecute: async ({ struct, payload }) => {
        if( struct['data'].error ) {
          struct['status'] = false
          struct['messages'].push( struct['data'].error )
          return { struct, payload }
        }

        return { struct, payload };
      }
    }
  };
  

export { schema }
