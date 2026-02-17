// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'etherscan',
    name: 'Etherscan',
    description: 'Retrieve smart contract ABI and verified Solidity source code from Etherscan (Ethereum mainnet). Returns the contract interface definition and full source for any verified contract address on Ethereum.',
    version: '2.0.0',
    docs: ['https://docs.etherscan.io'],
    tags: ['ethereum', 'contracts', 'explorer', 'cacheTtlDaily'],
    root: 'https://api.etherscan.io/v2/api',
    requiredServerParams: ['ETHERSCAN_API_KEY'],
    routes: {
        getContractABI: {
            method: 'GET',
            path: '/?chainid=1&module=contract&action=getabi&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Returns the Contract ABI of a verified smart contract via Etherscan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ],
            tests: [
                { _description: 'Uniswap V2 Factory', address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' },
                { _description: 'Uniswap V2 Router02', address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' }
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
        getContractSourceCode: {
            method: 'GET',
            path: '/?chainid=1&module=contract&action=getsourcecode&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Returns the Solidity source code of a verified smart contract. Required: address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ],
            tests: [
                { _description: 'Uniswap V2 Factory', address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' },
                { _description: 'Uniswap V2 Router02', address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        result: { type: 'array', items: { type: 'object', properties: { SourceCode: { type: 'string' }, ABI: { type: 'string' }, ContractName: { type: 'string' }, CompilerVersion: { type: 'string' }, CompilerType: { type: 'string' }, OptimizationUsed: { type: 'string' }, Runs: { type: 'string' }, ConstructorArguments: { type: 'string' }, EVMVersion: { type: 'string' }, Library: { type: 'string' }, ContractFileName: { type: 'string' }, LicenseType: { type: 'string' }, Proxy: { type: 'string' }, Implementation: { type: 'string' }, SwarmSource: { type: 'string' }, SimilarMatch: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getContractABI: {
        postRequest: async ( { response, struct, payload } ) => {
            if( response.status !== "1" ) {
            throw new Error( response.message )
            }
            response = response.result
            return { response }
        }
    },
    getContractSourceCode: {
        postRequest: async ( { response, struct, payload } ) => {
            if( response.status !== "1" ) {
            throw new Error( response.message )
            }
            response = response.result
            return { response }
        }
    }
} )
