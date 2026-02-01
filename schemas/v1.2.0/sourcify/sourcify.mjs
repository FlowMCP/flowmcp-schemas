export const schema = {
    namespace: "sourcify",
    name: "Sourcify Contract Verification",
    description: "Look up verified smart contracts and function signatures via Sourcify APIv2. No API key required.",
    docs: ["https://docs.sourcify.dev/docs/api/"],
    tags: ["ethereum", "verification", "smart-contracts"],
    flowMCP: "1.2.0",
    root: "https://sourcify.dev/server",
    requiredServerParams: [],
    headers: {},
    routes: {
        getContract: {
            requestMethod: "GET",
            description: "Get verified contract details by chain ID and address. Returns match status, ABI, source code, compilation info, and deployment data.",
            route: "/v2/contract/:chainId/:address",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
                { position: { key: "fields", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('abi,compilation')", "optional()"] } }
            ],
            tests: [
                { _description: "Uniswap V2 Factory on Ethereum", chainId: "1", address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", fields: "abi" },
                { _description: "Contract on Sepolia", chainId: "11155111", address: "0x2738d13E81e30bC615766A0410e7cF199FD59A83", fields: "abi,compilation" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatContract" }
            ]
        },
        getContractAllChains: {
            requestMethod: "GET",
            description: "Get verified contract at an address across all chains. Useful to find which chains a contract is deployed on.",
            route: "/v2/contract/all-chains/:address",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
                { position: { key: "fields", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('abi')", "optional()"] } }
            ],
            tests: [
                { _description: "Uniswap V2 Factory across all chains", address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" }
            ],
            modifiers: []
        },
        getChains: {
            requestMethod: "GET",
            description: "Get the list of all supported and deprecated chains on Sourcify.",
            route: "/chains",
            parameters: [],
            tests: [
                { _description: "Fetch all supported chains" }
            ],
            modifiers: []
        },
        lookupSignature: {
            requestMethod: "GET",
            description: "Look up Ethereum function, event, or error signatures by their 4-byte or 32-byte hash.",
            route: "/signature-database/v1/lookup",
            parameters: [
                { position: { key: "function", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "event", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "error", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Lookup transfer function signature", function: "0xa9059cbb" },
                { _description: "Lookup Transfer event signature", event: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "rewriteSignatureUrl" }
            ]
        },
        searchSignature: {
            requestMethod: "GET",
            description: "Search for Ethereum function/event/error signatures by name.",
            route: "/signature-database/v1/search",
            parameters: [
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(function,event,error)", options: ["default('function')", "optional()"] } }
            ],
            tests: [
                { _description: "Search for transfer functions", q: "transfer", type: "function" },
                { _description: "Search for approval events", q: "Approval", type: "event" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "rewriteSignatureUrl" }
            ]
        }
    },
    handlers: {
        rewriteSignatureUrl: async ( { struct, payload } ) => {
            payload['url'] = payload['url'].replace(
                'https://sourcify.dev/server/signature-database',
                'https://api.4byte.sourcify.dev/signature-database'
            )

            return { struct, payload }
        },
        formatContract: async ( { struct, payload } ) => {
            if( !struct['data'] ) { return { struct, payload } }

            const { match, creationMatch, runtimeMatch, chainId, address, verifiedAt, abi, compilation, sources } = struct['data']

            struct['data'] = {
                match,
                creationMatch,
                runtimeMatch,
                chainId,
                address,
                verifiedAt,
                abi: abi || null,
                compiler: compilation ? `${compilation.compiler} ${compilation.compilerVersion}` : null,
                contractName: compilation ? compilation.fullyQualifiedName : null,
                sourceCount: sources ? Object.keys( sources ).length : 0
            }

            return { struct, payload }
        }
    }
}
