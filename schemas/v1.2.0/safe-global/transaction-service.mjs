export const schema = {
    namespace: "safeGlobal",
    name: "Safe Transaction Service",
    description: "Query Gnosis Safe multisig wallets including balances, transactions, owners and modules on Ethereum mainnet",
    docs: ["https://docs.safe.global/core-api/transaction-service-overview", "https://safe.global/"],
    tags: ["ethereum", "multisig", "defi", "wallet"],
    flowMCP: "1.2.0",
    root: "https://safe-transaction-mainnet.safe.global/api/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getSafeInfo: {
            requestMethod: "GET",
            description: "Get Safe multisig wallet information including owners, threshold, nonce and modules",
            route: "/safes/:address/",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } }
            ],
            tests: [
                { _description: "Get Safe info", address: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64" }
            ],
            modifiers: []
        },
        getSafeBalances: {
            requestMethod: "GET",
            description: "Get token balances of a Safe multisig wallet including ETH and ERC-20 tokens",
            route: "/safes/:address/balances/",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "trusted", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } },
                { position: { key: "exclude_spam", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } }
            ],
            tests: [
                { _description: "Get Safe balances", address: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64", trusted: true, exclude_spam: true }
            ],
            modifiers: [{ phase: "post", handlerName: "formatBalances" }]
        },
        getMultisigTransactions: {
            requestMethod: "GET",
            description: "Get multisig transactions of a Safe wallet with execution status and confirmations",
            route: "/safes/:address/multisig-transactions/",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } },
                { position: { key: "executed", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "nonce__gte", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Get recent transactions", address: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64", limit: 5 }
            ],
            modifiers: [{ phase: "post", handlerName: "formatTransactions" }]
        },
        getIncomingTransfers: {
            requestMethod: "GET",
            description: "Get incoming token transfers to a Safe wallet",
            route: "/safes/:address/incoming-transfers/",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "Get incoming transfers", address: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64", limit: 5 }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatBalances: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !Array.isArray( raw ) ) {
                    return { struct, payload }
                }

                const balances = raw
                    .filter( ( b ) => {
                        const balance = BigInt( b.balance || '0' )

                        return balance > 0n
                    } )
                    .map( ( b ) => {
                        const token = b.token || {}
                        const decimals = token.decimals || 18
                        const rawBalance = b.balance || '0'

                        const result = {
                            tokenAddress: b.tokenAddress || 'native',
                            name: token.name || 'Ether',
                            symbol: token.symbol || 'ETH',
                            decimals,
                            rawBalance
                        }

                        return result
                    } )

                struct.data = {
                    source: "Safe Transaction Service",
                    tokenCount: balances.length,
                    balances
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting balances: ${error.message}` )
            }

            return { struct, payload }
        },

        formatTransactions: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.results ) {
                    return { struct, payload }
                }

                const transactions = raw.results
                    .map( ( tx ) => {
                        const result = {
                            safeTxHash: tx.safeTxHash,
                            to: tx.to,
                            value: tx.value,
                            nonce: tx.nonce,
                            isExecuted: tx.isExecuted,
                            isSuccessful: tx.isSuccessful,
                            executionDate: tx.executionDate,
                            submissionDate: tx.submissionDate,
                            confirmationsRequired: tx.confirmationsRequired,
                            confirmations: tx.confirmations ? tx.confirmations.length : 0,
                            transactionHash: tx.transactionHash,
                            dataDecoded: tx.dataDecoded
                        }

                        return result
                    } )

                struct.data = {
                    source: "Safe Transaction Service",
                    totalCount: raw.count,
                    transactionCount: transactions.length,
                    transactions
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting transactions: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
