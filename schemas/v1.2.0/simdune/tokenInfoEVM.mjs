// Supported chains for token-info endpoint (from API documentation)
const SUPPORTED_CHAINS = [
    { alias: "ABSTRACT", id: 2741, name: "abstract" },
    { alias: "ANCIENT8", id: 888888888, name: "ancient8" },
    { alias: "APE_CHAIN", id: 33139, name: "ape_chain" },
    { alias: "ARBITRUM_ONE", id: 42161, name: "arbitrum" },
    { alias: "ARBITRUM_NOVA", id: 42170, name: "arbitrum_nova" },
    { alias: "AVALANCHE_CCHAIN", id: 43114, name: "avalanche_c" },
    { alias: "AVALANCHE_FUJI", id: 43113, name: "avalanche_fuji" },
    { alias: "B3", id: 8333, name: "b3" },
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
    { alias: "FLOW", id: 747, name: "flow" },
    { alias: "FORMA", id: 984122, name: "forma" },
    { alias: "FRAXTAL", id: 252, name: "fraxtal" },
    { alias: "FUNKICHAIN", id: 33979, name: "funkichain" },
    { alias: "GNOSIS_CHAIN", id: 100, name: "gnosis" },
    { alias: "HAM_CHAIN", id: 5112, name: "ham" },
    { alias: "HEMI", id: 43111, name: "hemi" },
    { alias: "HYCHAIN", id: 2911, name: "hychain" },
    { alias: "HYPER_EVM", id: 999, name: "hyper_evm" },
    { alias: "INK", id: 57073, name: "ink" },
    { alias: "KAIA", id: 8217, name: "kaia" },
    { alias: "KATANA", id: 747474, name: "katana" },
    { alias: "LENS", id: 232, name: "lens" },
    { alias: "LINEA_MAINNET", id: 59144, name: "linea" },
    { alias: "LISK", id: 1135, name: "lisk" },
    { alias: "MANTLE", id: 5000, name: "mantle" },
    { alias: "METIS", id: 1088, name: "metis" },
    { alias: "MINT_MAINNET", id: 185, name: "mint" },
    { alias: "MODE", id: 34443, name: "mode" },
    { alias: "MONAD_TESTNET", id: 10143, name: "monad_testnet" },
    { alias: "OMNI", id: 166, name: "omni" },
    { alias: "OPBNB", id: 204, name: "opbnb" },
    { alias: "OPTIMISM_MAINNET", id: 10, name: "optimism" },
    { alias: "PLUME", id: 98866, name: "plume" },
    { alias: "POLYGON_MAINNET", id: 137, name: "polygon" },
    { alias: "PROOF_OF_PLAY", id: 70700, name: "proof_of_play" },
    { alias: "PROOF_OF_PLAY_BOSS", id: 70701, name: "proof_of_play_boss" },
    { alias: "RARI", id: 1380012617, name: "rari" },
    { alias: "REDSTONE", id: 690, name: "redstone" },
    { alias: "RONIN", id: 2020, name: "ronin" },
    { alias: "SCROLL", id: 534352, name: "scroll" },
    { alias: "SEI", id: 1329, name: "sei" },
    { alias: "ETHEREUM_SEPOLIA", id: 11155111, name: "sepolia" },
    { alias: "SHAPE", id: 360, name: "shape" },
    { alias: "SOMNIA", id: 5031, name: "somnia" },
    { alias: "SONEIUM", id: 1868, name: "soneium" },
    { alias: "SONIC", id: 146, name: "sonic" },
    { alias: "SOPHON", id: 50104, name: "sophon" },
    { alias: "SUPERPOSITION", id: 55244, name: "superposition" },
    { alias: "SUPERSEED", id: 5330, name: "superseed" },
    { alias: "SWELLCHAIN", id: 1923, name: "swellchain" },
    { alias: "TAC", id: 239, name: "tac" },
    { alias: "TAIKO", id: 167000, name: "taiko" },
    { alias: "UNICHAIN", id: 130, name: "unichain" },
    { alias: "WEMIX", id: 1111, name: "wemix" },
    { alias: "WORLD", id: 480, name: "world" },
    { alias: "XAI", id: 660279, name: "xai" },
    { alias: "ZERO_NETWORK", id: 543210, name: "zero_network" },
    { alias: "ZKEVM", id: 1101, name: "zkevm" },
    { alias: "ZKSYNC_ERA", id: 324, name: "zksync" },
    { alias: "ZORA_NETWORK", id: 7777777, name: "zora" }
]

let chainAliasEnum
chainAliasEnum = 'enum('
chainAliasEnum += SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )
chainAliasEnum += ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Token Info",
    description: "Access token metadata including symbol, name, decimals, USD price, and logo URLs for native and ERC20 tokens across EVM chains.",
    docs: ["https://docs.sim.dune.com/evm/token-info"],
    tags: ["production", "token", "analytics", "metadata", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getTokenInfoEVM: {
            requestMethod: "GET",
            description: "Get token metadata including symbol, name, decimals, USD price, and logo URLs for native and ERC20 tokens.",
            route: "/evm/token-info/{{tokenAddress}}",
            parameters: [
                {
                    position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$|^native$)"] }
                },
                {
                    position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: chainAliasEnum, options: [] }
                },
            ],
            tests: [
                {
                    _description: "Get USDC token info on Ethereum",
                    tokenAddress: "0xA0b86a33E6441e73C117D820D0a2e7Bc91C0a644",
                    chainName: "ETHEREUM_MAINNET"
                },
                {
                    _description: "Get native ETH info",
                    tokenAddress: "native",
                    chainName: "ETHEREUM_MAINNET"
                },
                {
                    _description: "Get USDC token info on Base",
                    tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                    chainName: "BASE_MAINNET"
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
            const separator = payload['url'].includes('?') ? '&' : '?'
            payload['url'] += `${separator}chain_ids=${chainId}`

            return { struct, payload }
        }
    }
}

export { schema }