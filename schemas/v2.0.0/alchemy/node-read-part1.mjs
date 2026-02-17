// Split from alchemy/node-read.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 9 routes (v2 max: 8) — needs splitting
// requiredLibraries: ethers
// Import: import { ethers } from 'ethers'
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 8 lines

export const main = {
    namespace: 'alchemy',
    name: 'Alchemy Node Read (Part 1)',
    description: 'Read blockchain data from EVM mainnets via JSON-RPC through Alchemy. Supports 20+ chains including Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, Linea, Scroll, zkSync, Mantle, Celo, Gnosis, Blast, Fantom, Moonbeam, and more. Query blocks, balances, transactions, receipts, contract code, gas prices, and event logs.',
    version: '2.0.0',
    docs: ['https://docs.alchemy.com/reference/api-overview', 'https://ethereum.org/en/developers/docs/apis/json-rpc/'],
    tags: ['blockchain', 'evm', 'rpc', 'multichain', 'alchemy', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://--alchemy-slug--.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}',
    requiredServerParams: ['ALCHEMY_API_KEY'],
    routes: {
        getBlockNumber: {
            method: 'GET',
            path: '/',
            description: 'Get the latest block number and timestamp for a selected EVM chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } }
            ],
            tests: [
                { _description: 'Get latest block number on Ethereum', chain: 'ETHEREUM_MAINNET' },
                { _description: 'Get latest block number on Base', chain: 'BASE_MAINNET' }
            ],
        },
        getBalance: {
            method: 'GET',
            path: '/',
            description: 'Get the native token balance (ETH, POL, BNB, etc.) for an address on the selected chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get ETH balance of USDC contract',
                    chain: 'ETHEREUM_MAINNET',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                }
            ],
        },
        getGasPrice: {
            method: 'GET',
            path: '/',
            description: 'Get the current gas price in wei and gwei for the selected chain, including EIP-1559 maxFeePerGas when available.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } }
            ],
            tests: [
                { _description: 'Get current gas price on Ethereum', chain: 'ETHEREUM_MAINNET' },
                { _description: 'Get current gas price on Polygon', chain: 'POLYGON_MAINNET' }
            ],
        },
        getBlock: {
            method: 'GET',
            path: '/',
            description: 'Get block details by block number, including hash, parentHash, timestamp, gasUsed, transaction count, and miner.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'blockNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)'] } }
            ],
            tests: [
                { _description: 'Get Ethereum block 17000000 details', chain: 'ETHEREUM_MAINNET', blockNumber: 17000000 }
            ],
        },
        getCode: {
            method: 'GET',
            path: '/',
            description: 'Get the bytecode deployed at an address. Returns whether the address is a contract and the bytecode length.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Check if USDC address is a contract',
                    chain: 'ETHEREUM_MAINNET',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                }
            ],
        },
        getTransactionCount: {
            method: 'GET',
            path: '/',
            description: 'Get the transaction count (nonce) for an address on the selected chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get nonce of USDC contract on Ethereum',
                    chain: 'ETHEREUM_MAINNET',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                }
            ],
        },
        getTransactionByHash: {
            method: 'GET',
            path: '/',
            description: 'Get transaction details by transaction hash, including from, to, value, gasPrice, blockNumber, and input data.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'txHash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get historic Ethereum transaction details',
                    chain: 'ETHEREUM_MAINNET',
                    txHash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'
                }
            ],
        },
        getTransactionReceipt: {
            method: 'GET',
            path: '/',
            description: 'Get the transaction receipt by hash, including status, gasUsed, logs count, and created contract address if applicable.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE_MAINNET,OPTIMISM_MAINNET,BASE_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,CELO_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLD_MAINNET,OPBNB_MAINNET,SONEIUM_MAINNET,ZETACHAIN_MAINNET)', options: [] } },
                { position: { key: 'txHash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{64}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get receipt of historic Ethereum transaction',
                    chain: 'ETHEREUM_MAINNET',
                    txHash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'
                }
            ],
        }
    },
    requiredLibraries: ['ethers']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ethers = libraries['ethers']
    const EVM_CHAINS = sharedLists['evmChains']

    const alchemyChains = EVM_CHAINS
        .filter( ( c ) => c.alchemyNetworkSlug !== undefined && !c.isTestnet )
    const alchemySlug = alchemyChains
        .reduce( ( acc, c ) => {
            acc[ c.alias ] = c.alchemyNetworkSlug
            return acc
        }, {} )
    const chainEnum = 'enum(' + Object.keys( alchemySlug ).join( ',' ) + ')'

    return {
        getBlockNumber: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const block = await provider.getBlock( 'latest' )
                if( !block ) {
                struct.status = false
                struct.messages.push( `Failed to fetch latest block on ${chain}` )
                return { struct }}
                const timestamp = Number( block.timestamp ) * 1000
                struct.data = {
                chain,
                blockNumber: block.number,
                timestamp: block.timestamp.toString(),
                timestampISO: new Date( timestamp ).toISOString()
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get block number on ${chain}` )
                }
                return { struct }
            }
        },
        getBalance: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, address } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const balanceWei = await provider.getBalance( address )
                const chainInfo = alchemyChains.find( ( c ) => c.alias === chain )
                struct.data = {
                chain,
                address,
                balanceWei: balanceWei.toString(),
                balanceFormatted: ethers.formatEther( balanceWei ),
                nativeCurrency: chainInfo?.nativeCurrency || 'ETH'
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get balance on ${chain}` )
                }
                return { struct }
            }
        },
        getGasPrice: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const feeData = await provider.getFeeData()
                struct.data = {
                chain,
                gasPriceWei: feeData.gasPrice ? feeData.gasPrice.toString() : null,
                gasPriceGwei: feeData.gasPrice ? ethers.formatUnits( feeData.gasPrice, 'gwei' ) : null,
                maxFeePerGas: feeData.maxFeePerGas ? feeData.maxFeePerGas.toString() : null,
                maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? feeData.maxPriorityFeePerGas.toString() : null
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get gas price on ${chain}` )
                }
                return { struct }
            }
        },
        getBlock: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, blockNumber } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const block = await provider.getBlock( Number( blockNumber ) )
                if( !block ) {
                struct.status = false
                struct.messages.push( `Block ${blockNumber} not found on ${chain}` )
                return { struct }}
                const timestamp = Number( block.timestamp ) * 1000
                struct.data = {
                chain,
                blockNumber: block.number,
                hash: block.hash,
                parentHash: block.parentHash,
                timestamp: block.timestamp.toString(),
                timestampISO: new Date( timestamp ).toISOString(),
                gasUsed: block.gasUsed.toString(),
                gasLimit: block.gasLimit.toString(),
                txCount: block.transactions.length,
                miner: block.miner
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get block ${blockNumber} on ${chain}` )
                }
                return { struct }
            }
        },
        getCode: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, address } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const code = await provider.getCode( address )
                const isContract = code !== '0x'
                struct.data = {
                chain,
                address,
                isContract,
                bytecodeLength: isContract ? ( code.length - 2 ) / 2 : 0,
                bytecode: code
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get code for ${address} on ${chain}` )
                }
                return { struct }
            }
        },
        getTransactionCount: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, address } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const nonce = await provider.getTransactionCount( address )
                struct.data = {
                chain,
                address,
                nonce
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get transaction count for ${address} on ${chain}` )
                }
                return { struct }
            }
        },
        getTransactionByHash: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, txHash } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const tx = await provider.getTransaction( txHash )
                if( !tx ) {
                struct.status = false
                struct.messages.push( `Transaction ${txHash} not found on ${chain}` )
                return { struct }}
                struct.data = {
                chain,
                txHash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value.toString(),
                valueFormatted: ethers.formatEther( tx.value ),
                gasPrice: tx.gasPrice ? tx.gasPrice.toString() : null,
                gasLimit: tx.gasLimit.toString(),
                nonce: tx.nonce,
                blockNumber: tx.blockNumber,
                blockHash: tx.blockHash,
                data: tx.data
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get transaction ${txHash} on ${chain}` )
                }
                return { struct }
            }
        },
        getTransactionReceipt: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                const slug = alchemySlug[ chain ]
                if( !slug ) {
                throw new Error( `Unsupported chain: ${chain}` )

                }
                struct.url = struct.url.replace( '--alchemy-slug--', slug )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, txHash } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const receipt = await provider.getTransactionReceipt( txHash )
                if( !receipt ) {
                struct.status = false
                struct.messages.push( `Receipt for ${txHash} not found on ${chain}` )
                return { struct }}
                struct.data = {
                chain,
                txHash: receipt.hash,
                status: receipt.status === 1 ? 'success' : 'reverted',
                from: receipt.from,
                to: receipt.to,
                contractAddress: receipt.contractAddress,
                gasUsed: receipt.gasUsed.toString(),
                cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
                blockNumber: receipt.blockNumber,
                logsCount: receipt.logs.length
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get receipt for ${txHash} on ${chain}` )
                }
                return { struct }
            }
        }
    }
}
