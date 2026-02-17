// Split from moralis-com/eth/walletApi.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 11 routes (v2 max: 8) — needs splitting
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 35 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis walletApi API (Part 1)',
    description: 'Wallet intelligence via Moralis — native balance, transaction history, net worth, profitability analysis, active chain detection, plus ENS and Unstoppable Domains name resolution across EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'wallet', 'portfolio', 'cacheTtlFrequent'],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/wallets/:address/chains': {
            method: 'GET',
            path: '/wallets/:address/chains',
            description: 'Get the active chains for a wallet address via Moralis — query by address. Supports chains filters.',
            parameters: [
                { position: { key: 'chains', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/:address/balance': {
            method: 'GET',
            path: '/:address/balance',
            description: 'Get the native balance for a specific wallet address via Moralis — query by address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/history': {
            method: 'GET',
            path: '/wallets/:address/history',
            description: 'Retrieve the full transaction history of a specified wallet address, including sends, receives, token and NFT transfers, and contract interactions.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,CHILIZ_MAINNET,GNOSIS_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET,LINEA_MAINNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,FLOW_MAINNET,RONIN_MAINNET,LISK_MAINNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'from_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include_internal_transactions', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'nft_metadata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/net-worth': {
            method: 'GET',
            path: '/wallets/:address/net-worth',
            description: 'Get the net worth of a wallet in USD. We recommend to filter out spam tokens and unverified contracts to get a more accurate result.',
            parameters: [
                { position: { key: 'chains', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'exclude_spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'exclude_unverified_contracts', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(false,true)', options: ['optional()'] } },
                { position: { key: 'max_token_inactivity', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'min_pair_side_liquidity_usd', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/profitability/summary': {
            method: 'GET',
            path: '/wallets/:address/profitability/summary',
            description: 'Retrieves a summary of wallet profitability based on specified parameters including optional token addresses.',
            parameters: [
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,FANTOM_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,PULSECHAIN_MAINNET,BASE_MAINNET,LINEA_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/profitability': {
            method: 'GET',
            path: '/wallets/:address/profitability',
            description: 'Retrieves profitability information for a specific wallet address. Can be filtered by one or more tokens.',
            parameters: [
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,FANTOM_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,PULSECHAIN_MAINNET,BASE_MAINNET,LINEA_MAINNET)', options: [] } },
                { position: { key: 'token_addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/stats': {
            method: 'GET',
            path: '/wallets/:address/stats',
            description: 'Get the stats for a wallet address via Moralis — query by address. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/resolve/:address/domain': {
            method: 'GET',
            path: '/resolve/:address/domain',
            description: 'Resolve a specific address to its Unstoppable domain via Moralis — query by address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
