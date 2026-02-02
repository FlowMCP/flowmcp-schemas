import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ABSTRACT', 'ANCIENT8', 'APE_CHAIN', 'ARBITRUM_ONE', 'ARBITRUM_NOVA',
    'AVALANCHE_CCHAIN', 'AVALANCHE_FUJI', 'B3', 'BASE_MAINNET', 'BASE_SEPOLIA',
    'BERACHAIN', 'BLAST_MAINNET', 'BNB_CHAIN', 'BOB', 'BOBA_NETWORK',
    'CELO_MAINNET', 'CORN', 'CYBER', 'DEGEN_CHAIN', 'ETHEREUM_MAINNET',
    'FANTOM', 'FLARE', 'FORMA', 'FRAXTAL', 'FUNKICHAIN', 'GNOSIS_CHAIN',
    'HAM_CHAIN', 'HYCHAIN', 'HYPER_EVM', 'INK', 'KAIA', 'LINEA_MAINNET',
    'LISK', 'MANTLE', 'METIS', 'MINT_MAINNET', 'MODE', 'MONAD_TESTNET',
    'OMNI', 'OPBNB', 'OPTIMISM_MAINNET', 'POLYGON_MAINNET', 'PROOF_OF_PLAY',
    'PROOF_OF_PLAY_BOSS', 'RARI', 'REDSTONE', 'RONIN', 'SCROLL', 'SEI',
    'ETHEREUM_SEPOLIA', 'SHAPE', 'SONEIUM', 'SONIC', 'SUPERPOSITION',
    'SUPERSEED', 'SWELLCHAIN', 'TRON', 'UNICHAIN', 'WEMIX', 'WORLD',
    'XAI', 'ZERO_NETWORK', 'ZKEVM', 'ZKSYNC_ERA', 'ZORA_NETWORK'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

const chainAliasEnum = 'enum(' + SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' ) + ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - NFT Collectibles",
    description: "Access NFT collections including ERC721 and ERC1155 tokens with metadata, images, and collection details across EVM chains.",
    docs: ["https://docs.sim.dune.com/evm/collectibles"],
    tags: ["production", "nft", "collectibles", "metadata", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getCollectiblesEVM: {
            requestMethod: "GET",
            description: "Get NFT collectibles (ERC721/ERC1155) with metadata, images, and collection details for a wallet address.",
            route: "/evm/collectibles/{{walletAddress}}",
            parameters: [
                {
                    position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] }
                },
                {
                    position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: chainAliasEnum, options: [] }
                },
                {
                    position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(2500)"] }
                }
            ],
            tests: [
                {
                    _description: "Get Vitalik's NFT collectibles on Ethereum",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    limit: "10",
                    chainName: "ETHEREUM_MAINNET"
                },
                {
                    _description: "Get NFT collectibles on Base",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    limit: "5",
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