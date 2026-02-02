export const schema = {
    namespace: "tenderly",
    name: "Tenderly Public Contracts",
    description: "Lookup public smart contract information including source code verification, compiler details and token metadata via Tenderly",
    docs: ["https://docs.tenderly.co/", "https://tenderly.co/"],
    tags: ["ethereum", "smartcontracts", "debugging", "cacheTtlStatic"],
    flowMCP: "1.2.0",
    root: "https://api.tenderly.co/api/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getPublicContract: {
            requestMethod: "GET",
            description: "Get detailed public contract information including compiler version, standards, token info and verification status",
            route: "/public-contracts/:networkId/:address",
            parameters: [
                { position: { key: "networkId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get USDC contract on Ethereum", networkId: 1, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
                { _description: "Get USDT contract on Ethereum", networkId: 1, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
            ],
            modifiers: [{ phase: "post", handlerName: "formatContract" }]
        }
    },
    handlers: {
        formatContract: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.contract_name ) {
                    return { struct, payload }
                }

                struct.data = {
                    source: "Tenderly",
                    contractName: raw.contract_name,
                    address: raw.address,
                    networkId: raw.network_id,
                    type: raw.type,
                    standards: raw.standards || [],
                    language: raw.language,
                    compiler: {
                        version: raw.compiler_version,
                        evmVersion: raw.evm_version,
                        optimizations: raw.optimizations_used,
                        optimizationRuns: raw.optimization_runs
                    },
                    verification: {
                        isPublic: raw.public,
                        verifiedAt: raw.verification_date
                    },
                    creation: {
                        block: raw.creation_block,
                        txHash: raw.creation_tx,
                        creator: raw.creator_address
                    },
                    tokenInfo: raw.token_info || null,
                    tokenMarketData: raw.token_market_data || null
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting contract: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
