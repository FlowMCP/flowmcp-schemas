import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ETHEREUM_MAINNET', 'BNB_CHAIN', 'POLYGON_MAINNET', 'ARBITRUM_ONE',
    'OPTIMISM_MAINNET', 'BASE_MAINNET', 'AVALANCHE_CCHAIN', 'GNOSIS_CHAIN',
    'CELO_MAINNET', 'ZKSYNC_ERA', 'ZORA_NETWORK', 'LINEA_MAINNET',
    'SCROLL', 'MODE', 'BLAST_MAINNET', 'ARBITRUM_NOVA', 'MANTLE', 'METIS',
    'FANTOM', 'BOBA_NETWORK', 'MINT_MAINNET', 'DEGEN_CHAIN', 'ANCIENT8',
    'KAIA', 'LISK', 'OPBNB', 'PROOF_OF_PLAY', 'CYBER', 'BOB', 'FLARE',
    'BERACHAIN', 'HYPER_EVM', 'BASE_SEPOLIA', 'AVALANCHE_FUJI'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

const chainAliasEnum = 'enum(' + SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' ) + ')'

const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Token Balances",
    description: "Access realtime token balances for native and ERC20 tokens with USD valuations across EVM chains.",
    docs: ["https://docs.sim.dune.com/evm/balances"],
    tags: ["production", "balances", "analytics", "portfolio", "cacheTtlDaily"],
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