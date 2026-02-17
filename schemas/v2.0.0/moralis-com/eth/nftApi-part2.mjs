// Split from moralis-com/eth/nftApi.mjs
// Part 2 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 20 routes (v2 max: 8) — needs splitting
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 26 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis nftApi API (Part 2)',
    description: 'Comprehensive NFT data via Moralis — collection stats, metadata, ownership, transfers, trades, traits, and market rankings across 30+ EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'nft', 'collectibles', 'cacheTtlFrequent'],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/nft/:address/:token_id/owners': {
            method: 'GET',
            path: '/nft/:address/:token_id/owners',
            description: 'Get owners of a specific NFT given the contract address and token ID. Required: chain, address, token_id. Optional filters: format, limit, cursor, normalizeMetadata, media_items.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'format', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'normalizeMetadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'media_items', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/:token_id/trades': {
            method: 'GET',
            path: '/nft/:address/:token_id/trades',
            description: 'Get trades of NFTs for a given contract and token ID via Moralis — query by address and token id.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,ARBITRUM_ONE_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'nft_metadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/nfts/trades': {
            method: 'GET',
            path: '/wallets/:address/nfts/trades',
            description: 'Get trades of NFTs for a given wallet via Moralis — query by address. Supports from_block, to_block, from_date filters.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,ARBITRUM_ONE_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'nft_metadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/trades': {
            method: 'GET',
            path: '/nft/:address/trades',
            description: 'Get trades of NFTs for a given contract and marketplace via Moralis — query by address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'marketplace', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'nft_metadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/traits/paginate': {
            method: 'GET',
            path: '/nft/:address/traits/paginate',
            description: 'Get NFT traits for a given collection',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/traits': {
            method: 'GET',
            path: '/nft/:address/traits',
            description: 'Get NFT traits for a given collection',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/:token_id/transfers': {
            method: 'GET',
            path: '/nft/:address/:token_id/transfers',
            description: 'Get transfers of an NFT given a contract address and token ID. Required: chain, address, token_id. Optional filters: format, limit, order, cursor, include_prices.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'format', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include_prices', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/:address/nft/collections': {
            method: 'GET',
            path: '/:address/nft/collections',
            description: 'Get NFT collections owned by a given wallet address via Moralis — query by address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'token_counts', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'exclude_spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include_prices', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
