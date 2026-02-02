export const schema = {
    namespace: "sourcify",
    name: "Sourcify Contract Verification",
    description: "Verify and lookup Ethereum smart contract source code verification status across multiple chains using Sourcify",
    docs: ["https://docs.sourcify.dev/", "https://sourcify.dev/"],
    tags: ["ethereum", "verification", "smartcontracts"],
    flowMCP: "1.2.0",
    root: "https://sourcify.dev/server",
    requiredServerParams: [],
    headers: {},
    routes: {
        getVerificationStatus: {
            requestMethod: "GET",
            description: "Check if a contract is verified on Sourcify and get match type (full or partial)",
            route: "/v2/contract/:chainId/:address",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Check USDC on Ethereum", chainId: 1, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: []
        },
        checkByAddresses: {
            requestMethod: "GET",
            description: "Check verification status of a contract address across one or multiple chains. Required: addresses, chainIds.",
            route: "/check-all-by-addresses",
            parameters: [
                { position: { key: "addresses", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)"] } },
                { position: { key: "chainIds", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Check USDC on Ethereum", addresses: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainIds: "1" }
            ],
            modifiers: []
        },
        getSourceFileTree: {
            requestMethod: "GET",
            description: "Get the list of verified source files for a contract via sourcify — query by chainId and address.",
            route: "/files/tree/any/:chainId/:address",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get USDT source files on Ethereum", chainId: 1, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
            ],
            modifiers: []
        },
        getSourceFiles: {
            requestMethod: "GET",
            description: "Get full source code and metadata of a verified contract via sourcify — query by chainId and address.",
            route: "/files/any/:chainId/:address",
            parameters: [
                { position: { key: "chainId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get USDC source on Ethereum", chainId: 1, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: [{ phase: "post", handlerName: "formatSourceFiles" }]
        },
        getSupportedChains: {
            requestMethod: "GET",
            description: "Get the list of all chains supported by Sourcify. Returns structured JSON response data.",
            route: "/chains",
            parameters: [],
            tests: [
                { _description: "List all supported chains" }
            ],
            modifiers: [{ phase: "post", handlerName: "formatChains" }]
        }
    },
    handlers: {
        formatSourceFiles: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.files ) {
                    return { struct, payload }
                }

                const files = raw.files
                    .map( ( file ) => {
                        const result = {
                            name: file.name,
                            path: file.path,
                            contentPreview: file.content ? file.content.slice( 0, 500 ) : null
                        }

                        return result
                    } )

                struct.data = {
                    source: "Sourcify",
                    status: raw.status,
                    fileCount: files.length,
                    files
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting source files: ${error.message}` )
            }

            return { struct, payload }
        },

        formatChains: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !Array.isArray( raw ) ) {
                    return { struct, payload }
                }

                const supported = raw
                    .filter( ( chain ) => chain.supported === true )

                const chains = supported
                    .map( ( chain ) => {
                        const result = {
                            name: chain.name,
                            chainId: chain.chainId,
                            etherscanAPI: chain.etherscanAPI || false
                        }

                        return result
                    } )

                struct.data = {
                    source: "Sourcify",
                    totalChains: raw.length,
                    supportedChains: chains.length,
                    chains
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting chains: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
