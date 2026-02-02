import { ethers } from 'ethers'
import { EVM_CHAINS } from '../_shared/evmChains.mjs'


const alchemyChains = EVM_CHAINS
    .filter( ( c ) => c.alchemyNetworkSlug !== undefined && !c.isTestnet )

const alchemySlug = alchemyChains
    .reduce( ( acc, c ) => {
        acc[ c.alias ] = c.alchemyNetworkSlug
        return acc
    }, {} )

const chainEnum = 'enum(' + Object.keys( alchemySlug ).join( ',' ) + ')'


const schema = {
    namespace: "alchemy",
    name: "Alchemy Node Read",
    description: "Read blockchain data from EVM mainnets via JSON-RPC through Alchemy. Supports 20+ chains including Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, Linea, Scroll, zkSync, Mantle, Celo, Gnosis, Blast, Fantom, Moonbeam, and more. Query blocks, balances, transactions, receipts, contract code, gas prices, and event logs.",
    docs: ["https://docs.alchemy.com/reference/api-overview", "https://ethereum.org/en/developers/docs/apis/json-rpc/"],
    tags: ["blockchain", "evm", "rpc", "multichain", "alchemy", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "https://--alchemy-slug--.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}",
    requiredServerParams: ["ALCHEMY_API_KEY"],
    headers: {},
    routes: {
        getBlockNumber: {
            requestMethod: "GET",
            description: "Get the latest block number and timestamp for a selected EVM chain.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } }
            ],
            tests: [
                { _description: "Get latest block on Ethereum", chain: "ETHEREUM_MAINNET" },
                { _description: "Get latest block on Polygon", chain: "POLYGON_MAINNET" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getBlockNumberExecute" }
            ]
        },
        getBalance: {
            requestMethod: "GET",
            description: "Get the native token balance (ETH, POL, BNB, etc.) for an address on the selected chain.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get Vitalik ETH balance", chain: "ETHEREUM_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getBalanceExecute" }
            ]
        },
        getGasPrice: {
            requestMethod: "GET",
            description: "Get the current gas price in wei and gwei for the selected chain, including EIP-1559 maxFeePerGas when available.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } }
            ],
            tests: [
                { _description: "Get gas price on Ethereum", chain: "ETHEREUM_MAINNET" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getGasPriceExecute" }
            ]
        },
        getBlock: {
            requestMethod: "GET",
            description: "Get block details by block number, including hash, parentHash, timestamp, gasUsed, transaction count, and miner.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "blockNumber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)"] } }
            ],
            tests: [
                { _description: "Get Ethereum block 1", chain: "ETHEREUM_MAINNET", blockNumber: 1 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getBlockExecute" }
            ]
        },
        getCode: {
            requestMethod: "GET",
            description: "Get the bytecode deployed at an address. Returns whether the address is a contract and the bytecode length.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get USDT contract code on Ethereum", chain: "ETHEREUM_MAINNET", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getCodeExecute" }
            ]
        },
        getTransactionCount: {
            requestMethod: "GET",
            description: "Get the transaction count (nonce) for an address on the selected chain.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get Vitalik nonce on Ethereum", chain: "ETHEREUM_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getTransactionCountExecute" }
            ]
        },
        getTransactionByHash: {
            requestMethod: "GET",
            description: "Get transaction details by transaction hash, including from, to, value, gasPrice, blockNumber, and input data.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "txHash", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
            ],
            tests: [
                { _description: "Get historic Ethereum transaction", chain: "ETHEREUM_MAINNET", txHash: "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getTransactionByHashExecute" }
            ]
        },
        getTransactionReceipt: {
            requestMethod: "GET",
            description: "Get the transaction receipt by hash, including status, gasUsed, logs count, and created contract address if applicable.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "txHash", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
            ],
            tests: [
                { _description: "Get receipt for historic Ethereum tx", chain: "ETHEREUM_MAINNET", txHash: "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getTransactionReceiptExecute" }
            ]
        },
        getLogs: {
            requestMethod: "GET",
            description: "Get event logs for a contract address within a block range (max 10000 blocks). Returns topics, data, and transaction hash per log entry.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "fromBlock", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)"] } },
                { position: { key: "toBlock", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)"] } }
            ],
            tests: [
                { _description: "Get USDT logs on Ethereum block range", chain: "ETHEREUM_MAINNET", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", fromBlock: 21000000, toBlock: 21000010 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "getLogsExecute" }
            ]
        }
    },
    handlers: {
        insertSlug: async ( { struct, payload, userParams } ) => {
            const { chain } = userParams
            const slug = alchemySlug[ chain ]
            if( !slug ) {
                struct.status = false
                struct.messages.push( `Unsupported chain: ${chain}` )
                return { struct, payload }
            }
            payload.url = payload.url.replace( '--alchemy-slug--', slug )
            return { struct, payload }
        },
        getBlockNumberExecute: async ( { struct, payload, userParams } ) => {
            const { chain } = userParams
            try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const block = await provider.getBlock( 'latest' )
                if( !block ) {
                    struct.status = false
                    struct.messages.push( `Failed to fetch latest block on ${chain}` )
                    return { struct, payload }
                }
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
            return { struct, payload }
        },
        getBalanceExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        getGasPriceExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        getBlockExecute: async ( { struct, payload, userParams } ) => {
            const { chain, blockNumber } = userParams
            try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const block = await provider.getBlock( Number( blockNumber ) )
                if( !block ) {
                    struct.status = false
                    struct.messages.push( `Block ${blockNumber} not found on ${chain}` )
                    return { struct, payload }
                }
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
            return { struct, payload }
        },
        getCodeExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        getTransactionCountExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        getTransactionByHashExecute: async ( { struct, payload, userParams } ) => {
            const { chain, txHash } = userParams
            try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const tx = await provider.getTransaction( txHash )
                if( !tx ) {
                    struct.status = false
                    struct.messages.push( `Transaction ${txHash} not found on ${chain}` )
                    return { struct, payload }
                }
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
            return { struct, payload }
        },
        getTransactionReceiptExecute: async ( { struct, payload, userParams } ) => {
            const { chain, txHash } = userParams
            try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const receipt = await provider.getTransactionReceipt( txHash )
                if( !receipt ) {
                    struct.status = false
                    struct.messages.push( `Receipt for ${txHash} not found on ${chain}` )
                    return { struct, payload }
                }
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
            return { struct, payload }
        },
        getLogsExecute: async ( { struct, payload, userParams } ) => {
            const { chain, address, fromBlock, toBlock } = userParams
            const range = Number( toBlock ) - Number( fromBlock )
            if( range > 10000 ) {
                struct.status = false
                struct.messages.push( `Block range too large: ${range}. Maximum allowed is 10000 blocks.` )
                return { struct, payload }
            }
            if( range < 0 ) {
                struct.status = false
                struct.messages.push( `Invalid block range: fromBlock (${fromBlock}) must be <= toBlock (${toBlock}).` )
                return { struct, payload }
            }
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
            return { struct, payload }
        }
    }
}


export { schema }
