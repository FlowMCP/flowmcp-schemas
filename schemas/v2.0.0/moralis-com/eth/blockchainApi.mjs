// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 20 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis blockchainApi API',
    description: 'Low-level blockchain data via Moralis — block lookups (by number, hash, or date), transaction details, native transaction history for addresses, and latest block numbers across 30+ EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'blockchain', 'blocks', 'cacheTtlFrequent'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/block/:block_number_or_hash': {
            method: 'GET',
            path: '/block/:block_number_or_hash',
            description: 'Get the contents of a block given the block hash via Moralis — query by block number or hash.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(internal_transactions)', options: ['optional()'] } },
                { position: { key: 'block_number_or_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/dateToBlock': {
            method: 'GET',
            path: '/dateToBlock',
            description: 'Get the closest block given the date via Moralis. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/transaction/:transaction_hash/verbose': {
            method: 'GET',
            path: '/transaction/:transaction_hash/verbose',
            description: 'Get the contents of a transaction by the given transaction hash.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(internal_transactions)', options: ['optional()'] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/:address/verbose': {
            method: 'GET',
            path: '/:address/verbose',
            description: 'Get native transactions and logs ordered by block number in descending order. Required: chain, address. Optional filters: from_block, to_block, from_date, to_date, cursor, include, limit, order.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(internal_transactions)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/latestBlockNumber/:chain': {
            method: 'GET',
            path: '/latestBlockNumber/:chain',
            description: 'Returns the latest block number for the given chain via Moralis — query by chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } }
            ]
        },
        '/transaction/:transaction_hash': {
            method: 'GET',
            path: '/transaction/:transaction_hash',
            description: 'Get the contents of a transaction by the given transaction hash.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(internal_transactions)', options: ['optional()'] } },
                { position: { key: 'transaction_hash', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/:address': {
            method: 'GET',
            path: '/:address',
            description: 'Get native transactions ordered by block number in descending order. Required: chain, address. Optional filters: from_block, to_block, from_date, to_date, cursor, include, limit, order.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(internal_transactions)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

    const moralisChains = EVM_CHAINS
        .filter( ( c ) => c.moralisChainSlug !== undefined )
    const aliasToSlug = moralisChains
        .reduce( ( acc, c ) => {
            acc[ c.alias ] = c.moralisChainSlug
            return acc
        }, {} )
    const fullChainAliases = [
        'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'HOLESKY_TESTNET',
        'POLYGON_MAINNET', 'POLYGON_AMOY_TESTNET', 'BINANCE_MAINNET',
        'BINANCE_TESTNET', 'AVALANCHE_MAINNET', 'FANTOM_MAINNET',
        'PALM_MAINNET', 'CRONOS_MAINNET', 'ARBITRUM_ONE_MAINNET',
        'GNOSIS_MAINNET', 'GNOSIS_TESTNET', 'CHILIZ_MAINNET',
        'CHILIZ_TESTNET', 'BASE_MAINNET', 'BASE_SEPOLIA_TESTNET',
        'OPTIMISM_MAINNET', 'LINEA_MAINNET', 'LINEA_SEPOLIA_TESTNET',
        'MOONBEAM_MAINNET', 'MOONRIVER_MAINNET', 'MOONBASE_ALPHA_TESTNET',
        'FLOW_MAINNET', 'FLOW_TESTNET', 'RONIN_MAINNET', 'RONIN_TESTNET',
        'LISK_MAINNET', 'LISK_SEPOLIA_TESTNET', 'PULSECHAIN_MAINNET'
    ]
    const fullChainEnum = 'enum(' + fullChainAliases.join( ',' ) + ')'

    return {
        '/dateToBlock': {
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
                return { struct }
            },
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
                return { struct }
            },
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
                return { struct }
            },
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `/${chainAlias}`, `/${slug}` )
                return { struct }
            },
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
                return { struct }
            },
            preRequest: async ( { struct, payload } ) => {
                const chainAlias = payload.chain
                if( !chainAlias ) { return { struct }}
                const slug = aliasToSlug[ chainAlias ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chainAlias}` )

                }
                struct['url'] = struct['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
                return { struct }
            }
        }
    }
}
