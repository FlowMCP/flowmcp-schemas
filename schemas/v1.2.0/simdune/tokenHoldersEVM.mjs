import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ABSTRACT', 'ANCIENT8', 'APE_CHAIN', 'ARBITRUM_ONE', 'ARBITRUM_NOVA',
    'AVALANCHE_CCHAIN', 'AVALANCHE_FUJI', 'BASE_MAINNET', 'BASE_SEPOLIA',
    'BERACHAIN', 'BLAST_MAINNET', 'BNB_CHAIN', 'BOB', 'BOBA_NETWORK',
    'CELO_MAINNET', 'CORN', 'CYBER', 'DEGEN_CHAIN', 'ETHEREUM_MAINNET',
    'FANTOM', 'FLARE', 'GNOSIS_CHAIN', 'HAM_CHAIN', 'HYCHAIN', 'HYPER_EVM',
    'INK', 'KAIA', 'LINEA_MAINNET', 'LISK', 'MANTLE', 'METIS',
    'MINT_MAINNET', 'MODE', 'OMNI', 'OPBNB', 'OPTIMISM_MAINNET',
    'POLYGON_MAINNET', 'PROOF_OF_PLAY'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

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