import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ETHEREUM_MAINNET', 'ARBITRUM_ONE', 'ARBITRUM_NOVA', 'AVALANCHE_CCHAIN',
    'AVALANCHE_FUJI', 'BASE_MAINNET', 'BASE_SEPOLIA', 'BNB_CHAIN',
    'CELO_MAINNET', 'GNOSIS_CHAIN', 'OPTIMISM_MAINNET', 'POLYGON_MAINNET',
    'ZKSYNC_ERA', 'ZORA_NETWORK', 'LINEA_MAINNET', 'SCROLL', 'MODE',
    'BLAST_MAINNET', 'ANCIENT8', 'DEGEN_CHAIN', 'MANTLE', 'METIS',
    'FANTOM', 'BOBA_NETWORK', 'MINT_MAINNET', 'HYPER_EVM', 'KAIA',
    'LISK', 'OPBNB', 'PROOF_OF_PLAY', 'CYBER', 'BOB', 'FLARE', 'BERACHAIN'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

const chainAliasEnum = 'enum(' + SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' ) + ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Transactions",
    description: "Retrieve granular transaction details including block information, gas data, and raw values, ordered by descending block time.",
    docs: ["https://docs.sim.dune.com/evm/transactions"],
    tags: ["production", "transactions", "analytics", "history", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getTransactionsEVM: {
            requestMethod: "GET",
            description: "Get detailed transaction history for an EVM address across supported chains, with block data and gas information.",
            route: "/evm/transactions/{{walletAddress}}",
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
                    z: { primitive: "number()", options: ["min(1)", "max(100)"] }
                }
            ],
            tests: [
                {
                    _description: "Get Vitalik's transactions on Ethereum mainnet",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    limit: "5",
                    chainName: "ETHEREUM_MAINNET"
                },
                {
                    _description: "Get transactions on Base mainnet",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    limit: "3",
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