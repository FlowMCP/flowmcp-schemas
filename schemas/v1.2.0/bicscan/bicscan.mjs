const schema = {
    namespace: "bicscan",
    name: "BICScan API",
    description: "Assess blockchain address risk scores and scan held assets via BICScan — get compliance risk ratings and token portfolio details for any wallet address.",
    docs: ["https://api.bicscan.io/docs"],
    tags: ["security", "risk", "scanning"],
    flowMCP: "1.2.0",
    root: "https://api.bicscan.io/v1/scan",
    requiredServerParams: ["BICSCAN_API_KEY"],
    headers: { "X-Api-Key": "{{BICSCAN_API_KEY}}" },
    routes: {
        getRiskScore: {
            requestMethod: "POST",
            description: "Retrieves a risk score from 0 (safe) to 100 (high risk) for a given crypto address or domain.",
            route: "/",
            parameters: [ 
                { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(3)"] } }
            ],
            tests: [
                { _description: "Test risk score lookup for ENS name", query: "vitalik.eth" },
                { _description: "Test risk score lookup for crypto address", query: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" }
            ],
            modifiers: [ { phase: "pre", handlerName: "proxyRiskScore" } ]
        },
        getAssets: {
            requestMethod: "POST",
            description: "Fetches the asset holdings of a given crypto address using OFAC engine. Required: query, engines.",
            route: "/",
            parameters: [ 
                { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "engines", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "array()", options: ["default([\"ofac\"])"] } }
            ],
            tests: [
                { _description: "Test asset scan for wallet address", query: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", engines: ["ofac"] }
            ],
            modifiers: [ { phase: "pre", handlerName: "proxyAssets" } ]
        }
    },
    handlers: {
        proxyRiskScore: async ({ struct, payload, userParams }) => {
            const { query } = userParams;
            payload.body = { query, sync: true, assets: false };
            return { struct, payload };
        },
        proxyAssets: async ({ struct, payload, userParams }) => {
            const { query, engines } = userParams;
            payload.body = { query, sync: true, assets: true, engines };
            return { struct, payload };
        }
    }
};


export { schema };