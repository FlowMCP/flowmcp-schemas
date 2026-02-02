export const schema = {
    namespace: "coincap",
    name: "CoinCapRates",
    description: "Access fiat and cryptocurrency conversion rates from CoinCap — list all available exchange rates or look up a specific currency rate by slug.",
    docs: ["https://pro.coincap.io/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://rest.coincap.io/v3",
    requiredServerParams: ["COINCAP_API_KEY"],
    headers: {
        Authorization: "Bearer {{COINCAP_API_KEY}}"
    },
    routes: {
      listRates: {
        requestMethod: "GET",
        description: "Retrieve all conversion rates or filter by comma-separated slugs. Optional filters: ids.",
        route: "/rates",
        parameters: [
          { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Get all rates" },
          { _description: "Filter rates by bitcoin,ethereum", ids: "bitcoin,ethereum" }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getRateBySlug: {
            requestMethod: "GET",
            description: "Retrieve a specific conversion rate by slug via CoinCap — query by slug. Returns structured JSON response data.",
            route: "/rates/:slug",
            parameters: [
                { position: { key: "slug", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get bitcoin rate", slug: "bitcoin" },
                { _description: "Get invalid rate", slug: "invalid-slug" }
            ],
            modifiers: [
                { phase: "post", handlerName: "modifyResult" }
            ]
        }
    },
    handlers: {
        modifyResult: async( { struct, payload } ) => {
            return { struct, payload };
        }
    }
}
  