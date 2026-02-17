// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 8 lines

export const main = {
    namespace: 'blocknative',
    name: 'Gas Price Estimator',
    description: 'Accurate next-block gas price predictions for Ethereum, Bitcoin, and other supported chains.',
    version: '2.0.0',
    docs: ['https://docs.blocknative.com'],
    tags: ['new', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://api.blocknative.com',
    requiredServerParams: ['BLOCKNATIVE_API_KEY'],
    headers: {
        Authorization: '{{BLOCKNATIVE_API_KEY}}'
    },
    routes: {
        getGasPrices: {
            method: 'GET',
            path: '/gasprices/blockprices',
            description: 'Returns a range of gas price estimates for the next block across defined confidence levels.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,POLYGON_MAINNET,ARBITRUM_ONE,OPTIMISN_MAINNET,BASE,BINANCE_MAINNET,AVALANCHE,LINEA_MAINNET,SCROLL_MAINNET,ZKSYNC_MAINNET,MANTLE_MAINNET,GNOSIS_MAINNET,FANTOM_MAINNET,CRONOS_MAINNET,MOONBEAM_MAINNET,BLAST_MAINNET,BERACHAIN_MAINNET,UNICHAIN_MAINNET,POLYGONZK_MAINNET,FRAXTAL_MAINNET,WORLDCHAIN_MAINNET,TAIKO_MAINNET,PALM_MAINNET,CHILIZ_MAINNET,RONIN_MAINNET,LISK_MAINNET,MODE_TESTNET,METIS_MAINNET,ZORA_MAINNET,OPBNB_MAINNET,BOB_MAINNET,INK_MAINNET,SEI_MAINNET,SONEIUM_MAINNET,RSK_MAINNET,IMMUTABLE_ZKEVM_MAINNET,SNAXCHAIN_MAINNET,STORY_MAINNET,ZETACHAIN_MAINNET,BITCOIN_MAINNET,LENS_SEPOLIA_TESTNET)', options: [] } },
                { position: { key: 'system', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'network', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'confidenceLevels', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Ethereum default alias', chainName: 'ETHEREUM_MAINNET' },
                { _description: 'Zora alias + confidence levels', chainName: 'ZORA_MAINNET', confidenceLevels: '70,90,99' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        system: { type: 'string' },
                        network: { type: 'string' },
                        unit: { type: 'string' },
                        maxPrice: { type: 'number' },
                        currentBlockNumber: { type: 'number' },
                        msSinceLastBlock: { type: 'number' },
                        blockPrices: { type: 'array', items: { type: 'object', properties: { blockNumber: { type: 'number' }, estimatedTransactionCount: { type: 'number' }, baseFeePerGas: { type: 'number' }, blobBaseFeePerGas: { type: 'number' }, estimatedPrices: { type: 'array', items: { type: 'object' } } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

    const blocknativeChains = EVM_CHAINS
        .filter( ( c ) => c.blocknativeAlias !== undefined )
    const chainNames = blocknativeChains
        .reduce( ( acc, chain ) => {
            acc[ chain.blocknativeAlias ] = chain.blocknativeChainId
            return acc
        }, {} )
    const chainEnum = 'enum(' + Object.keys( chainNames ).join( ',' ) + ')'

    return {
        getGasPrices: {
            preRequest: async ( { struct, payload } ) => {
                const alias = payload.alias?.toUpperCase()
                const chainId = chainIdOptions[ alias ]
                struct['url'] = struct['url']
                .replace( `chainName=${alias}`, `chainid=${chainId}` )
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if (!response || !response.blockPrices) {
                struct.status = false;
                struct.messages.push("No blockPrices data in response");
                return { response }
                }

                response = {
                network: response.network,
                system: response.system,
                blockNumber: response.currentBlockNumber,
                estimates: response.blockPrices.map(bp => ({
                block: bp.blockNumber,
                baseFee: bp.baseFeePerGas,
                estimatedPrices: bp.estimatedPrices.map(p => ({
                confidence: p.confidence,
                price: p.price,
                priorityFee: p.maxPriorityFeePerGas,
                maxFee: p.maxFeePerGas
                }))
                }))
                };

                return { response }
            }
        }
    }
}
