// Split from moralis-com/eth/walletApi.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 11 routes (v2 max: 8) — needs splitting
// Import: import { EVM_CHAINS } from '../../_shared/evmChains.mjs'
// Module-level code: 35 lines

export const main = {
    namespace: 'moralis',
    name: 'Moralis walletApi API (Part 2)',
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
        '/resolve/:address/reverse': {
            method: 'GET',
            path: '/resolve/:address/reverse',
            description: 'Reverse resolve a given ETH address to its ENS domain via Moralis — query by address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/resolve/:domain': {
            method: 'GET',
            path: '/resolve/:domain',
            description: 'Resolve a specific Unstoppable domain to its address via Moralis — query by domain.',
            parameters: [
                { position: { key: 'currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'domain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        '/resolve/ens/:domain': {
            method: 'GET',
            path: '/resolve/ens/:domain',
            description: 'Resolve a specific ENS domain to its address via Moralis — query by domain. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'domain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
