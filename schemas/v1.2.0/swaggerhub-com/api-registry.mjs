export const schema = {
    namespace: "swaggerhub",
    name: "SwaggerHub API",
    description: "FlowMCP interface for SwaggerHub registry API, supporting search, metadata listing, and Swagger definition retrieval.",
    docs: ["https://swaggerhub.com/api/swagger-hub/registry-api/1.0.0"],
    tags: ["production", "api", "documentation", "registry", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.swaggerhub.com/apis",
    requiredServerParams: [],
    headers: {},
    routes: {
        searchApis: {
            requestMethod: "GET",
            description: "Searches SwaggerHub public APIs using query parameters like `query`, `state`, `tag`, etc.",
            route: "/",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "state", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(PUBLISHED,UNPUBLISHED)", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search for finance-related APIs", query: "finance", state: "PUBLISHED" }
            ],
            modifiers: []
        },
        listApiVersions: {
            requestMethod: "GET",
            description: "Returns metadata for all versions of a specified API via swaggerhub — query by owner and api.",
            route: "/:owner/:api",
            parameters: [
                { position: { key: "owner", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "api", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "List versions of registry-api", owner: "swagger-hub", api: "registry-api" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}