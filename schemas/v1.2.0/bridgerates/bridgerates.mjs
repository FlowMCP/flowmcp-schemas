const schema = {
    namespace: "bridgeRates",
    name: "LiFi Bridge API",
    description: "Fetches bridge quotes, supported chains, tools, and cross-chain transfer data from LiFi API",
    docs: ["https://docs.li.fi/", "https://li.quest/v1"],
    tags: ["bridge", "crosschain", "defi"],
    flowMCP: "1.2.0",
    root: "https://li.quest/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getSupportedChains: {
            requestMethod: "GET",
            description: "Get information about all currently supported chains for cross-chain transfers.",
            route: "/chains",
            parameters: [],
            tests: [
                { _description: "Get all supported blockchains" }
            ],
            modifiers: []
        },
        getSupportedTools: {
            requestMethod: "GET",
            description: "Get information about the bridges and exchanges available through LiFi service.",
            route: "/tools",
            parameters: [],
            tests: [
                { _description: "Get all available bridges and exchanges" }
            ],
            modifiers: []
        },
        getConnections: {
            requestMethod: "GET",
            description: "Returns all possible connections based on chain filters. At least one filter parameter is required.",
            route: "/connections",
            parameters: [
                { position: { key: "fromChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "toChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "fromToken", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "toToken", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get connections from Ethereum", fromChain: "1" },
                { _description: "Get connections to Optimism", toChain: "10" }
            ],
            modifiers: []
        },
        getTransferStatus: {
            requestMethod: "GET",
            description: "Check the status of a cross-chain transfer by transaction hash.",
            route: "/status",
            parameters: [
                { position: { key: "txHash", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(66)"] } },
                { position: { key: "fromChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "toChain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "bridge", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Check transfer status with example hash", txHash: "0x1234567890123456789012345678901234567890123456789012345678901234", fromChain: "1" }
            ],
            modifiers: []
        }
    },
    handlers: {}
};


export { schema };