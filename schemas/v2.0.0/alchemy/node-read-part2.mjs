// Split from alchemy/node-read.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 9 routes (v2 max: 8) — needs splitting
// requiredLibraries: ethers
// Import: import { ethers } from 'ethers'
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 8 lines

export const main = {
    namespace: 'alchemy',
    name: 'Alchemy Node Read (Part 2)',
    description: 'Read blockchain data from EVM mainnets via JSON-RPC through Alchemy. Supports 20+ chains including Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, Linea, Scroll, zkSync, Mantle, Celo, Gnosis, Blast, Fantom, Moonbeam, and more. Query blocks, balances, transactions, receipts, contract code, gas prices, and event logs.',
    version: '2.0.0',
    docs: ['https://docs.alchemy.com/reference/api-overview', 'https://ethereum.org/en/developers/docs/apis/json-rpc/'],
    tags: ['blockchain', 'evm', 'rpc', 'multichain', 'alchemy', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0', filter: { key: 'isTestnet', value: false } }
    ],
    root: 'https://--alchemy-slug--.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}',
    requiredServerParams: ['ALCHEMY_API_KEY'],
    routes: {
        getLogs: {
            method: 'GET',
            path: '/',
            description: 'Get event logs for a contract address within a block range (max 10000 blocks). Returns topics, data, and transaction hash per log entry.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alchemyNetworkSlug}})', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'fromBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)'] } },
                { position: { key: 'toBlock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)'] } }
            ],
            tests: [
                {
                    _description: 'Get USDC Transfer logs in 10-block range',
                    chain: 'eth-mainnet',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    fromBlock: 17000000,
                    toBlock: 17000010
                }
            ],
        }
    },
    requiredLibraries: ['ethers']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ethers = libraries['ethers']
    const EVM_CHAINS = sharedLists['evmChains']

    const validSlugs = new Set(
        EVM_CHAINS
            .filter( ( c ) => c.alchemyNetworkSlug !== undefined )
            .map( ( c ) => c.alchemyNetworkSlug )
    )

    return {
        getLogs: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSlugs.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--alchemy-slug--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, address, fromBlock, toBlock } = userParams
                const range = Number( toBlock ) - Number( fromBlock )
                if( range > 10000 ) {
                struct.status = false
                struct.messages.push( `Block range too large: ${range}. Maximum allowed is 10000 blocks.` )
                return { struct }}
                if( range < 0 ) {
                struct.status = false
                struct.messages.push( `Invalid block range: fromBlock (${fromBlock}) must be <= toBlock (${toBlock}).` )
                return { struct }}
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const logs = await provider.getLogs( {
                address,
                fromBlock: Number( fromBlock ),
                toBlock: Number( toBlock )
                } )
                struct.data = {
                chain,
                address,
                fromBlock: Number( fromBlock ),
                toBlock: Number( toBlock ),
                logsCount: logs.length,
                logs: logs.map( ( log ) => {
                return {
                blockNumber: log.blockNumber,
                txHash: log.transactionHash,
                logIndex: log.index,
                topics: log.topics,
                data: log.data
                }
                } )
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get logs for ${address} on ${chain}` )
                }
                return { struct }
            }
        }
    }
}
