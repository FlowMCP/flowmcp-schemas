const schema = {
    namespace: "honeypot",
    name: "Honeypot Detector",
    description: "Detect honeypot token contracts using the honeypot.is API — checks buy/sell tax, liquidity locks, and contract risks for any EVM token address.",
    docs: ["https://honeypot.is"],
    tags: ["production", "security", "token", "validation", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.honeypot.is/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
        check: {
            requestMethod: "GET",
            description: "Checks if a token address is a honeypot on Ethereum, BSC, or Base. Required: address.",
            route: "/IsHoneypot",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Valid ETH token address", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
                { _description: "Another valid ETH token address", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
            ],
            modifiers: [ { phase: "post", handlerName: "normalizeHoneypotResult" } ]
        }
    },
    handlers: {
        normalizeHoneypotResult: async ({ struct, payload }) => {
            const data = struct.data || {};
            const isHoneypot = data?.honeypotResult?.isHoneypot ?? false;
            const tokenName = data?.token?.name || "Unknown";
            const risk = data?.summary?.risk || "unknown";
            const buyTax = data?.simulationResult?.buyTax ?? "N/A";
            const sellTax = data?.simulationResult?.sellTax ?? "N/A";
            const transferTax = data?.simulationResult?.transferTax ?? "N/A";
            const openSource = data?.contractCode?.openSource ?? "Unknown";

            struct.data = {
                tokenName,
                isHoneypot,
                risk,
                buyTax,
                sellTax,
                transferTax,
                openSource
            };

            return { struct, payload };
        }
    }
};


export { schema };