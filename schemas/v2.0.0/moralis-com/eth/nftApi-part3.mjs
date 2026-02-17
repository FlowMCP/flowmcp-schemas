// Split from moralis-com/eth/nftApi.mjs
// Part 3 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 20 routes (v2 max: 8) — needs splitting
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 26 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis nftApi API (Part 3)',
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
        '/:address/nft/transfers': {
            method: 'GET',
            path: '/:address/nft/transfers',
            description: 'Get transfers of NFTs given the wallet and other parameters.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'contract_addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'format', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include_prices', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/:address/nft': {
            method: 'GET',
            path: '/:address/nft',
            description: 'Get NFTs owned by a given address via Moralis — query by address. Supports format, limit, exclude_spam filters.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'format', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(decimal,hex)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'exclude_spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'token_addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'normalizeMetadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'media_items', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'include_prices', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/:token_id/metadata/resync': {
            method: 'GET',
            path: '/nft/:address/:token_id/metadata/resync',
            description: 'Resync the metadata for an NFT via Moralis — query by address and token id. Supports flag, mode filters.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'flag', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(uri,metadata)', options: ['optional()'] } },
                { position: { key: 'mode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(sync,async)', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'token_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/nft/:address/traits/resync': {
            method: 'GET',
            path: '/nft/:address/traits/resync',
            description: 'Resync the NFT Trait for a given contract via Moralis — query by address. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
