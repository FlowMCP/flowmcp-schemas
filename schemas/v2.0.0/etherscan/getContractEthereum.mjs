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
            ]
        },
        getContractSourceCode: {
            method: 'GET',
            path: '/?chainid=1&module=contract&action=getsourcecode&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Returns the Solidity source code of a verified smart contract. Required: address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ]
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
