// Supported chains for SVM balances endpoint
const SUPPORTED_CHAINS = [
    { alias: "SOLANA", id: "solana", name: "solana" },
    { alias: "ECLIPSE", id: "eclipse", name: "eclipse" }
]

let chainAliasEnum
chainAliasEnum = 'enum('
chainAliasEnum += SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )
chainAliasEnum += ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - SVM Token Balances",
    description: "Access realtime token balances for native, SPL, and SPL-2022 tokens with USD valuations across SVM chains.",
    docs: ["https://docs.sim.dune.com/svm/balances"],
    tags: ["production", "balances", "analytics", "portfolio", "svm", "solana"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/beta",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getBalancesSVM: {
            requestMethod: "GET",
            description: "Get realtime token balances with USD valuations for native, SPL, and SPL-2022 tokens across supported SVM chains.",
            route: "/svm/balances/{{walletAddress}}",
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
                    _description: "Get token balances on Solana",
                    walletAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                    chainName: "SOLANA",
                    limit: "10"
                },
                {
                    _description: "Get token balances on Eclipse",
                    walletAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                    chainName: "ECLIPSE",
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
            const separator = payload['url'].includes('?') ? '&' : '?'
            payload['url'] += `${separator}chains=${chainValue}`

            return { struct, payload }
        }
    }
}

export { schema }