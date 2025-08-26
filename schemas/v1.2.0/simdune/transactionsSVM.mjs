// Supported chains for SVM transactions endpoint (currently only Solana)
const SUPPORTED_CHAINS = [
    { alias: "SOLANA", id: "solana", name: "solana" }
]

let chainAliasEnum
chainAliasEnum = 'enum('
chainAliasEnum += SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )
chainAliasEnum += ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - SVM Transactions",
    description: "Retrieve detailed transaction history for SVM addresses including block information, ordered by descending block time.",
    docs: ["https://docs.sim.dune.com/svm/transactions"],
    tags: ["production", "transactions", "analytics", "history", "svm", "solana"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/beta",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getTransactionsSVM: {
            requestMethod: "GET",
            description: "Get detailed transaction history for an SVM address, ordered by descending block time with pagination support.",
            route: "/svm/transactions/{{walletAddress}}",
            parameters: [
                {
                    position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^[1-9A-HJ-NP-Za-km-z]{32,44}$)"] }
                },
                {
                    position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: chainAliasEnum, options: [] }
                },
                {
                    position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(1000)"] }
                }
            ],
            tests: [
                {
                    _description: "Get transactions on Solana with default limit",
                    walletAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                    chainName: "SOLANA",
                    limit: "10"
                },
                {
                    _description: "Get recent transactions on Solana with small limit",
                    walletAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                    chainName: "SOLANA",
                    limit: "5"
                }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertChainName" }
            ]
        }
    },
    handlers: {
        insertChainName: ( { struct, payload, userParams } ) => {
            const { chainName } = userParams
            const chainValue = SUPPORTED_CHAINS.find( ( { alias } ) => alias === chainName )?.id
            // For transactions API, we don't actually need to add chains parameter 
            // since only Solana is supported, but we keep it for consistency
            // The API will work without the chains parameter for Solana-only

            return { struct, payload }
        }
    }
}

export { schema }