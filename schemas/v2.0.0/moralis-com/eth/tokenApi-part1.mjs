// Split from moralis-com/eth/tokenApi.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 16 routes (v2 max: 8) — needs splitting
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 49 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis tokenApi API (Part 1)',
    description: 'ERC20 token analytics via Moralis — metadata, holder analysis, transfer history, DEX swap transactions, sniper detection, liquidity reserves, wallet balances, approvals, and market rankings across EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'tokens', 'balances', 'cacheTtlFrequent'],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/:pair_address/reserves': {
            method: 'GET',
            path: '/:pair_address/reserves',
            description: 'Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,CHILIZ_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET,LINEA_MAINNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET)', options: [] } },
                { position: { key: 'to_block', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pair_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/pairs/:address/snipers': {
            method: 'GET',
            path: '/pairs/:address/snipers',
            description: 'Get all snipers (wallets that quickly buy and sell tokens) for a specific token pair address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,FANTOM_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET,LINEA_MAINNET,RONIN_MAINNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'blocksAfterCreation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/pairs/:address/swaps': {
            method: 'GET',
            path: '/pairs/:address/swaps',
            description: 'Get all swap related transactions (buy, sell, add liquidity & remove liquidity) via Moralis.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'fromBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fromDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'transactionTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/wallets/:address/swaps': {
            method: 'GET',
            path: '/wallets/:address/swaps',
            description: 'Get all swap related transactions (buy, sell) via Moralis — query by address. Supports cursor, limit, fromBlock filters.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'fromBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fromDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'toDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'transactionTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/tokens/:address/analytics': {
            method: 'GET',
            path: '/tokens/:address/analytics',
            description: 'Get analytics for a token by token address via Moralis — query by address. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,FANTOM_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET,LINEA_MAINNET,MOONBEAM_MAINNET,RONIN_MAINNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/erc20/:token_address/owners': {
            method: 'GET',
            path: '/erc20/:token_address/owners',
            description: 'Identify the major holders of an ERC20 token and understand their ownership percentages',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'cursor', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['optional()'] } },
                { position: { key: 'token_address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/erc20/metadata/symbols': {
            method: 'GET',
            path: '/erc20/metadata/symbols',
            description: 'Get the metadata for a list of token symbols (name, symbol, decimals, logo). Required: chain, symbols.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'symbols', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: [] } }
            ]
        },
        '/erc20/metadata': {
            method: 'GET',
            path: '/erc20/metadata',
            description: 'Get the metadata for a given token contract address (name, symbol, decimals, logo).',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,HOLESKY_TESTNET,POLYGON_MAINNET,POLYGON_AMOY_TESTNET,BINANCE_MAINNET,BINANCE_TESTNET,AVALANCHE_MAINNET,FANTOM_MAINNET,PALM_MAINNET,CRONOS_MAINNET,ARBITRUM_ONE_MAINNET,GNOSIS_MAINNET,GNOSIS_TESTNET,CHILIZ_MAINNET,CHILIZ_TESTNET,BASE_MAINNET,BASE_SEPOLIA_TESTNET,OPTIMISM_MAINNET,LINEA_MAINNET,LINEA_SEPOLIA_TESTNET,MOONBEAM_MAINNET,MOONRIVER_MAINNET,MOONBASE_ALPHA_TESTNET,FLOW_MAINNET,FLOW_TESTNET,RONIN_MAINNET,RONIN_TESTNET,LISK_MAINNET,LISK_SEPOLIA_TESTNET,PULSECHAIN_MAINNET)', options: [] } },
                { position: { key: 'addresses', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: [] } }
            ]
        }
    }
}
