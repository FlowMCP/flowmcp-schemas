// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 12 lines

export const main = {
    namespace: 'etherscan',
    name: 'SmartContractExplorer',
    description: 'Fetch current gas oracle data (safe, proposed, fast gas prices) across multiple EVM chains via the Etherscan v2 API. Supports Ethereum, Arbitrum, Polygon, Binance, Avalanche and more.',
    version: '2.0.0',
    docs: ['https://docs.etherscan.io'],
    tags: ['evm', 'gas', 'fees', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://api.etherscan.io/v2/api',
    requiredServerParams: ['ETHERSCAN_API_KEY'],
    routes: {
        getGasOracle: {
            method: 'GET',
            path: '/?module=gastracker&action=gasoracle&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Fetch current gas oracle data for a given chain via Etherscan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_ONE_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN)', options: [] } }
            ],
            tests: [
                { _description: 'Gas oracle on Ethereum Mainnet', chainName: 'ETHEREUM_MAINNET' },
                { _description: 'Gas oracle on Arbitrum One', chainName: 'ARBITRUM_ONE_MAINNET' },
                { _description: 'Gas oracle on Polygon', chainName: 'POLYGON_MAINNET' },
                { _description: 'Gas oracle on Binance Smart Chain', chainName: 'BINANCE_MAINNET' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        result: { type: 'string' }
                    }
                }
            },
        },
        estimateGasCost: {
            method: 'GET',
            path: '/?module=gastracker&action=gasestimate&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Estimate gas cost using a specific gas price for a given chain. Required: chainName, gasprice.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_ONE_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN)', options: [] } },
                { position: { key: 'gasprice', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Estimate gas cost on Ethereum with 2 Gwei', chainName: 'ETHEREUM_MAINNET', gasprice: '2000000000' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        result: { type: 'string' }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

    const etherscanChains = EVM_CHAINS
        .filter( ( c ) => c.etherscanAlias !== undefined )
    const chainsByAlias = etherscanChains
        .reduce( ( acc, chain ) => {
            acc[ chain.etherscanAlias ] = { chainId: chain.etherscanChainId, name: chain.name }
            return acc
        }, {} )
    return {
        getGasOracle: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const { chainId } = chainsByAlias[chainName]
                struct['url'] = struct['url'].replace(`chainName=${chainName}`, `chainid=${chainId}`)
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response ) { return { response }}

                if( response.status !== "1" ) {
                throw new Error( response.message )
                }
                response = response.result
                return { response }
            }
        },
        estimateGasCost: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const { chainId } = chainsByAlias[chainName]
                struct['url'] = struct['url'].replace(`chainName=${chainName}`, `chainid=${chainId}`)
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response ) { return { response }}

                if( response.status !== "1" ) {
                throw new Error( response.message )
                }
                response = response.result
                return { response }
            }
        }
    }
}
