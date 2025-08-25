const schema = {
    namespace: "wormholescan",
    name: "Wormhole Metrics API",
    description: "Query cross-chain transaction metrics from the Wormholescan public API",
    docs: ["https://wormholescan.io", "https://docs.wormholescan.io"],
    tags: ["data", "api"],
    flowMCP: "1.2.0",
    root: "https://api.wormholescan.io",
    requiredServerParams: [],
    headers: {},
    routes: {
        getCrossChainActivity: {
            requestMethod: "GET",
            description: "Returns cross-chain volume between source and destination chains.",
            route: "/api/v1/x-chain-activity",
            parameters: [
                { position: { key: "timeSpan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(7d,30d,90d,1y,all-time)", options: ["default(7d)"] } },
                { position: { key: "by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(notional,motional)", options: ["default(notional)"] } },
                { position: { key: "apps", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Default query with 7d and notional", timeSpan: "7d", by: "notional" },
                { _description: "Query with motional", timeSpan: "7d", by: "motional" }
            ],
            modifiers: []
        },
        getMoneyFlow: {
            requestMethod: "GET",
            description: "Returns top money flow data by chain and volume.",
            route: "/api/v1/x-chain-activity/tops",
            parameters: [
                { position: { key: "timespan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1h,1d,1mo,1y)", options: ["default(1d)"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "appId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sourceChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "targetChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Money flow with default timespan", timespan: "1d" },
                { _description: "Money flow filtered by source and target", timespan: "1mo", sourceChain: "2", targetChain: "5" }
            ],
            modifiers: []
        },
        getTopAssetsByVolume: {
            requestMethod: "GET",
            description: "Returns top assets by transfer volume.",
            route: "/api/v1/top-assets-by-volume",
            parameters: [
                { position: { key: "timeSpan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(7d,15d,30d)", options: ["default(7d)"] } }
            ],
            tests: [
                { _description: "Top assets by volume for 7d", timeSpan: "7d" },
                { _description: "Top assets by volume for 30d", timeSpan: "30d" }
            ],
            modifiers: []
        },
        getTopChainPairsByNumTransfers: {
            requestMethod: "GET",
            description: "Returns top chain pairs by number of transfers.",
            route: "/api/v1/top-chain-pairs-by-num-transfers",
            parameters: [
                { position: { key: "timeSpan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(7d,15d,30d)", options: ["default(7d)"] } }
            ],
            tests: [
                { _description: "Top chain pairs for 7d", timeSpan: "7d" },
                { _description: "Top chain pairs for 15d", timeSpan: "15d" }
            ],
            modifiers: []
        },
        getTopSymbolsByVolume: {
            requestMethod: "GET",
            description: "Returns top transferred token symbols by volume.",
            route: "/api/v1/top-symbols-by-volume",
            parameters: [
                { position: { key: "timeSpan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(7d,15d,30d)", options: ["default(7d)"] } }
            ],
            tests: [
                { _description: "Top symbols for 7d", timeSpan: "7d" },
                { _description: "Top symbols for 30d", timeSpan: "30d" }
            ],
            modifiers: []
        },
        getTopCorridors: {
            requestMethod: "GET",
            description: "Returns top 100 token corridors by number of transfers.",
            route: "/api/v1/top-100-corridors",
            parameters: [
                { position: { key: "timeSpan", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(2d,7d)", options: ["default(2d)"] } }
            ],
            tests: [
                { _description: "Top corridors for 2d", timeSpan: "2d" },
                { _description: "Top corridors for 7d", timeSpan: "7d" }
            ],
            modifiers: []
        },
        getKpiList: {
            requestMethod: "GET",
            description: "Returns Wormhole KPIs including volume, message count, and TVL.",
            route: "/api/v1/scorecards",
            parameters: [],
            tests: [
                { _description: "Get general KPI stats" }
            ],
            modifiers: []
        }
    },
    handlers: {}
};


export { schema };