// Supported chains for token-holders endpoint (from API documentation)
const SUPPORTED_CHAINS = [
    { alias: "ABSTRACT", id: 2741, name: "abstract" },
    { alias: "ANCIENT8", id: 888888888, name: "ancient8" },
    { alias: "APE_CHAIN", id: 33139, name: "ape_chain" },
    { alias: "ARBITRUM_ONE", id: 42161, name: "arbitrum" },
    { alias: "ARBITRUM_NOVA", id: 42170, name: "arbitrum_nova" },
    { alias: "AVALANCHE_CCHAIN", id: 43114, name: "avalanche_c" },
    { alias: "AVALANCHE_FUJI", id: 43113, name: "avalanche_fuji" },
    { alias: "BASE_MAINNET", id: 8453, name: "base" },
    { alias: "BASE_SEPOLIA", id: 84532, name: "base_sepolia" },
    { alias: "BERACHAIN", id: 80094, name: "berachain" },
    { alias: "BLAST_MAINNET", id: 81457, name: "blast" },
    { alias: "BNB_CHAIN", id: 56, name: "bnb" },
    { alias: "BOB", id: 60808, name: "bob" },
    { alias: "BOBA_NETWORK", id: 288, name: "boba" },
    { alias: "CELO_MAINNET", id: 42220, name: "celo" },
    { alias: "CORN", id: 21000000, name: "corn" },
    { alias: "CYBER", id: 7560, name: "cyber" },
    { alias: "DEGEN_CHAIN", id: 666666666, name: "degen" },
    { alias: "ETHEREUM_MAINNET", id: 1, name: "ethereum" },
    { alias: "FANTOM", id: 250, name: "fantom" },
    { alias: "FLARE", id: 14, name: "flare" },
    { alias: "GNOSIS_CHAIN", id: 100, name: "gnosis" },
    { alias: "HAM_CHAIN", id: 5112, name: "ham" },
    { alias: "HYCHAIN", id: 2911, name: "hychain" },
    { alias: "HYPER_EVM", id: 999, name: "hyper_evm" },
    { alias: "INK", id: 57073, name: "ink" },
    { alias: "KAIA", id: 8217, name: "kaia" },
    { alias: "LINEA_MAINNET", id: 59144, name: "linea" },
    { alias: "LISK", id: 1135, name: "lisk" },
    { alias: "MANTLE", id: 5000, name: "mantle" },
    { alias: "METIS", id: 1088, name: "metis" },
    { alias: "MINT_MAINNET", id: 185, name: "mint" },
    { alias: "MODE", id: 34443, name: "mode" },
    { alias: "OMNI", id: 166, name: "omni" },
    { alias: "OPBNB", id: 204, name: "opbnb" },
    { alias: "OPTIMISM_MAINNET", id: 10, name: "optimism" },
    { alias: "POLYGON_MAINNET", id: 137, name: "polygon" },
    { alias: "PROOF_OF_PLAY", id: 70700, name: "proof_of_play" }
]

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Token Holders",
    description: "Discover token distribution across ERC20 or ERC721 holders, ranked by wallet value.",
    docs: ["https://docs.sim.dune.com/evm/token-holders"],
    tags: ["production", "token", "analytics", "holders", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getTokenHoldersEVM: {
            requestMethod: "GET",
            description: "Get token holders for ERC20 or ERC721 tokens, ranked by wallet value with balance details.",
            route: "/evm/token-holders/{{chain_id}}/{{token_address}}",
            parameters: [
                {
                    position: { key: "chain_id", value: "{{USER_PARAM}}", location: "insert" },
                    z: { 
                        primitive: "enum(" + SUPPORTED_CHAINS.map( c => c.id ).join( ',' ) + ")", 
                        options: [] 
                    }
                },
                {
                    position: { key: "token_address", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] }
                },
                {
                    position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(500)"] }
                }
            ],
            tests: [
                {
                    _description: "Get USDC holders on Base",
                    chain_id: "8453",
                    token_address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                    limit: "10"
                },
                {
                    _description: "Get ETH holders on Ethereum mainnet",
                    chain_id: "1",
                    token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    limit: "5"
                }
            ],
            modifiers: []
        }
    },
    handlers: {}
}

export { schema }