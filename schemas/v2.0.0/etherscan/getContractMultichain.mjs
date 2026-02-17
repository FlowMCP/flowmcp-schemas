// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 10 lines

export const main = {
    namespace: 'etherscan',
    name: 'SmartContractExplorer',
    description: 'Retrieve smart contract ABI and verified source code across 60+ EVM chains via Etherscan v2 API. Lists available chains and fetches contract data by address.',
    version: '2.0.0',
    docs: ['https://docs.etherscan.io'],
    tags: ['evm', 'contracts', 'explorer', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://api.etherscan.io/v2/api',
    requiredServerParams: ['ETHERSCAN_API_KEY'],
    routes: {
        getAvailableChains: {
            method: 'GET',
            path: '/chains',
            description: 'List available blockchain aliases via Etherscan. Returns structured JSON response data.',
            parameters: []
        },
        getSmartContractAbi: {
            method: 'GET',
            path: '/?module=contract&action=getabi&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Fetch smart contract source code by alias via Etherscan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISN_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,CRONOS_MAINNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,ARBITRUM_NOVA_MAINNET,BLAST_MAINNET,SONIC_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,BITTORRENT_MAINNET,APECHAIN_MAINNET,ABSTRACT_MAINNET,WORLD_MAINNET,SWELLCHAIN_MAINNET,TAIKO_MAINNET,SOPHON_MAINNET,WEMIX3_MAINNET,XAI_MAINNET,XINFIN_MAINNET,MEMECORE_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,BASE_SEPOLIA_TESTNET,POLYGON_AMOY_TESTNET,BINANCE_TESTNET,AVALANCHE_FUJI_TESTNET,ARBITRUM_SEPOLIA_TESTNET,OPTIMISN_SEPOLIA_TESTNET,LINEA_SEPOLIA_TESTNET,SCROLL_SEPOLIA_TESTNET,ZKSYNC_SEPOLIA_TESTNET,ABSTRACT_SEPOLIA_TESTNET,BLAST_SEPOLIA_TESTNET,BERACHAIN_BEPOLIA_TESTNET,BITTORRENT_TESTNET,CELO_ALFAJORES_TESTNET,FRAXTAL_TESTNET,MANTLE_SEPOLIA_TESTNET,MEMECORE_TESTNET,MOONBASE_ALPHA_TESTNET,POLYGONZK_CARDONA_TESTNET,SONIC_BLAZE_TESTNET,SOPHON_SEPOLIA_TESTNET,SWELLCHAIN_TESTNET,TAIKO_HEKLA_L2_TESTNET,UNICHAIN_SEPOLIA_TESTNET,WEMIX3_TESTNET,WORLD_SEPOLIA_TESTNET,XAI_SEPOLIA_TESTNET,XINFIN_TESTNET,APECHAIN_CURTIS_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ]
        },
        getSourceCode: {
            method: 'GET',
            path: '/?module=contract&action=getsourcecode&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Fetch smart contract source code by alias via Etherscan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISN_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,CRONOS_MAINNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,ARBITRUM_NOVA_MAINNET,BLAST_MAINNET,SONIC_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,BITTORRENT_MAINNET,APECHAIN_MAINNET,ABSTRACT_MAINNET,WORLD_MAINNET,SWELLCHAIN_MAINNET,TAIKO_MAINNET,SOPHON_MAINNET,WEMIX3_MAINNET,XAI_MAINNET,XINFIN_MAINNET,MEMECORE_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,BASE_SEPOLIA_TESTNET,POLYGON_AMOY_TESTNET,BINANCE_TESTNET,AVALANCHE_FUJI_TESTNET,ARBITRUM_SEPOLIA_TESTNET,OPTIMISN_SEPOLIA_TESTNET,LINEA_SEPOLIA_TESTNET,SCROLL_SEPOLIA_TESTNET,ZKSYNC_SEPOLIA_TESTNET,ABSTRACT_SEPOLIA_TESTNET,BLAST_SEPOLIA_TESTNET,BERACHAIN_BEPOLIA_TESTNET,BITTORRENT_TESTNET,CELO_ALFAJORES_TESTNET,FRAXTAL_TESTNET,MANTLE_SEPOLIA_TESTNET,MEMECORE_TESTNET,MOONBASE_ALPHA_TESTNET,POLYGONZK_CARDONA_TESTNET,SONIC_BLAZE_TESTNET,SOPHON_SEPOLIA_TESTNET,SWELLCHAIN_TESTNET,TAIKO_HEKLA_L2_TESTNET,UNICHAIN_SEPOLIA_TESTNET,WEMIX3_TESTNET,WORLD_SEPOLIA_TESTNET,XAI_SEPOLIA_TESTNET,XINFIN_TESTNET,APECHAIN_CURTIS_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

    const etherscanChains = EVM_CHAINS
        .filter( ( c ) => c.etherscanAlias !== undefined )
    const chainsByAlias = etherscanChains
        .reduce( ( acc, chain ) => {
            acc[ chain.etherscanAlias ] = { chainId: chain.etherscanChainId, name: chain.name }
            return acc
        }, {} )
    const chainEnum = 'enum(' + etherscanChains
        .map( ( c ) => c.etherscanAlias )
        .join( ',' ) + ')'

    return {
        getAvailableChains: {
            executeRequest: async ( { struct, payload } ) => {
                struct['data'] = Object.keys( chainsByAlias )

                return { struct }
            }
        },
        getSmartContractAbi: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const { chainId } = chainsByAlias[ chainName ]
                struct['url'] = struct['url']
                .replace( `chainName=${chainName}`, `chainid=${chainId}` )

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response ) { return { response }}

                if( response.status !== "1" ) {
                throw new Error( response.message )
                }

                response = JSON.parse( response?.result )

                return { response }
            }
        },
        getSourceCode: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const { chainId } = chainsByAlias[ chainName ]
                struct['url'] = struct['url']
                .replace( `chainName=${chainName}`, `chainid=${chainId}` )

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response ) { return { response }}

                if( response.status !== "1" ) {
                throw new Error( response.message )
                }

                response = response.result

                return { response }
            }
        }
    }
}
