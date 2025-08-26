// Supported chains for balances endpoint (from API documentation)
const SUPPORTED_CHAINS = [
    { alias: "ETHEREUM_MAINNET", id: 1, name: "ethereum" },
    { alias: "BNB_CHAIN", id: 56, name: "bnb" },
    { alias: "POLYGON_MAINNET", id: 137, name: "polygon" },
    { alias: "ARBITRUM_ONE", id: 42161, name: "arbitrum" },
    { alias: "OPTIMISM_MAINNET", id: 10, name: "optimism" },
    { alias: "BASE_MAINNET", id: 8453, name: "base" },
    { alias: "AVALANCHE_CCHAIN", id: 43114, name: "avalanche_c" },
    { alias: "GNOSIS_CHAIN", id: 100, name: "gnosis" },
    { alias: "CELO_MAINNET", id: 42220, name: "celo" },
    { alias: "ZKSYNC_ERA", id: 324, name: "zksync" },
    { alias: "ZORA_NETWORK", id: 7777777, name: "zora" },
    { alias: "LINEA_MAINNET", id: 59144, name: "linea" },
    { alias: "SCROLL", id: 534352, name: "scroll" },
    { alias: "MODE", id: 34443, name: "mode" },
    { alias: "BLAST_MAINNET", id: 81457, name: "blast" },
    { alias: "ARBITRUM_NOVA", id: 42170, name: "arbitrum_nova" },
    { alias: "MANTLE", id: 5000, name: "mantle" },
    { alias: "METIS", id: 1088, name: "metis" },
    { alias: "FANTOM", id: 250, name: "fantom" },
    { alias: "BOBA_NETWORK", id: 288, name: "boba" },
    { alias: "MINT_MAINNET", id: 185, name: "mint" },
    { alias: "DEGEN_CHAIN", id: 666666666, name: "degen" },
    { alias: "ANCIENT8", id: 888888888, name: "ancient8" },
    { alias: "KAIA", id: 8217, name: "kaia" },
    { alias: "LISK", id: 1135, name: "lisk" },
    { alias: "OPBNB", id: 204, name: "opbnb" },
    { alias: "PROOF_OF_PLAY", id: 70700, name: "proof_of_play" },
    { alias: "CYBER", id: 7560, name: "cyber" },
    { alias: "BOB", id: 60808, name: "bob" },
    { alias: "FLARE", id: 14, name: "flare" },
    { alias: "BERACHAIN", id: 80094, name: "berachain" },
    { alias: "HYPER_EVM", id: 999, name: "hyper_evm" },
    { alias: "BASE_SEPOLIA", id: 84532, name: "base_sepolia" },
    { alias: "AVALANCHE_FUJI", id: 43113, name: "avalanche_fuji" }
]

let chainAliasEnum
chainAliasEnum = 'enum('
chainAliasEnum += SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )
chainAliasEnum += ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Token Balances",
    description: "Access realtime token balances for native and ERC20 tokens with USD valuations across EVM chains.",
    docs: ["https://docs.sim.dune.com/evm/balances"],
    tags: ["production", "balances", "analytics", "portfolio"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getBalancesEVM: {
            requestMethod: "GET",
            description: "Get realtime token balances with USD valuations for native and ERC20 tokens across supported chains.",
            route: "/evm/balances/{{walletAddress}}",
            parameters: [
                {
                    position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] }
                },
/*
                {
                    position: { key: "chain_ids", value: "{{USER_PARAM}}", location: "query" },
                    z: { primitive: "string()", options: [] }
                },
*/
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
                    _description: "Get Vitalik's token balances on Ethereum",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    chainName: "ETHEREUM_MAINNET",
                    limit: "10"
                },
                {
                    _description: "Get token balances on Base",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    chainName: "BASE_MAINNET",
                    limit: "5"
                }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertChainId" }
            ]
        }
    },
    handlers: {
        insertChainId: ( { struct, payload, userParams } ) => {
            const { chainName } = userParams
            const chainId = SUPPORTED_CHAINS.find( ( { alias } ) => alias === chainName )?.id
            payload['url'] += `&chain_ids=${chainId}`

            return { struct, payload }
        }
    }
}

export { schema }