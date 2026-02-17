// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 20 lines

export const main = {
    namespace: 'simdune',
    name: 'Sim by Dune - Token Info',
    description: 'Access token metadata including symbol, name, decimals, USD price, and logo URLs for native and ERC20 tokens across EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.sim.dune.com/evm/token-info'],
    tags: ['production', 'token', 'analytics', 'metadata', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://api.sim.dune.com/v1',
    requiredServerParams: ['DUNE_SIM_API_KEY'],
    headers: {
        'X-Sim-Api-Key': '{{DUNE_SIM_API_KEY}}'
    },
    routes: {
        getTokenInfoEVM: {
            method: 'GET',
            path: '/evm/token-info/{{tokenAddress}}',
            description: 'Get token metadata including symbol, name, decimals, USD price, and logo URLs for native and ERC20 tokens.',
            parameters: [
                { position: { key: 'tokenAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$|^native$)'] } },
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE,OPTIMISM_MAINNET,BASE_MAINNET,BNB_CHAIN,AVALANCHE_CCHAIN,LINEA_MAINNET,SCROLL,ZKSYNC_ERA,MANTLE,CELO_MAINNET,GNOSIS_CHAIN,FANTOM,ARBITRUM_NOVA,BLAST_MAINNET,SONIC,BERACHAIN,UNICHAIN,ZKEVM,FRAXTAL,APE_CHAIN,ABSTRACT,WORLD,SWELLCHAIN,TAIKO,SOPHON,WEMIX,XAI,FLOW,RONIN,LISK,MODE,METIS,ZORA_NETWORK,BOBA_NETWORK,MINT_MAINNET,DEGEN_CHAIN,ANCIENT8,KAIA,OPBNB,BOB,FLARE,CYBER,PROOF_OF_PLAY,PROOF_OF_PLAY_BOSS,HYPER_EVM,INK,SEI,SONEIUM,SHAPE,REDSTONE,RARI,OMNI,CORN,B3,HAM_CHAIN,HYCHAIN,FUNKICHAIN,FORMA,SUPERPOSITION,SUPERSEED,ZERO_NETWORK,LENS,PLUME,HEMI,KATANA,SOMNIA,TAC,ETHEREUM_SEPOLIA,BASE_SEPOLIA,AVALANCHE_FUJI,MONAD_TESTNET)', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

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

    return {
        getTokenInfoEVM: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const chainId = SUPPORTED_CHAINS.find( ( { alias } ) => alias === chainName )?.id
                const separator = struct['url'].includes('?') ? '&' : '?'
                struct['url'] += `${separator}chain_ids=${chainId}`

                return { struct }
            }
        }
    }
}
