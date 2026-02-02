import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ABSTRACT', 'ANCIENT8', 'APE_CHAIN', 'ARBITRUM_ONE', 'ARBITRUM_NOVA',
    'AVALANCHE_CCHAIN', 'AVALANCHE_FUJI', 'B3', 'BASE_MAINNET', 'BASE_SEPOLIA',
    'BERACHAIN', 'BLAST_MAINNET', 'BNB_CHAIN', 'BOB', 'BOBA_NETWORK',
    'CELO_MAINNET', 'CORN', 'CYBER', 'DEGEN_CHAIN', 'ETHEREUM_MAINNET',
    'FANTOM', 'FLARE', 'FLOW', 'FORMA', 'FRAXTAL', 'FUNKICHAIN',
    'GNOSIS_CHAIN', 'HAM_CHAIN', 'HEMI', 'HYCHAIN', 'HYPER_EVM', 'INK',
    'KAIA', 'KATANA', 'LENS', 'LINEA_MAINNET', 'LISK', 'MANTLE', 'METIS',
    'MINT_MAINNET', 'MODE', 'MONAD_TESTNET', 'OMNI', 'OPBNB',
    'OPTIMISM_MAINNET', 'PLUME', 'POLYGON_MAINNET', 'PROOF_OF_PLAY',
    'PROOF_OF_PLAY_BOSS', 'RARI', 'REDSTONE', 'RONIN', 'SCROLL', 'SEI',
    'ETHEREUM_SEPOLIA', 'SHAPE', 'SOMNIA', 'SONEIUM', 'SONIC', 'SOPHON',
    'SUPERPOSITION', 'SUPERSEED', 'SWELLCHAIN', 'TAC', 'TAIKO', 'UNICHAIN',
    'WEMIX', 'WORLD', 'XAI', 'ZERO_NETWORK', 'ZKEVM', 'ZKSYNC_ERA',
    'ZORA_NETWORK'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

const chainAliasEnum = 'enum(' + SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' ) + ')'

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