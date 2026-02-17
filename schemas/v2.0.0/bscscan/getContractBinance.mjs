// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'bscscan',
    name: 'BSC Scan',
    description: 'Retrieve smart contract ABI and verified Solidity source code from BSCScan (Binance Smart Chain explorer). Returns the contract interface definition and full source for any verified contract address on BSC.',
    version: '2.0.0',
    docs: ['https://docs.bscscan.com/'],
    tags: ['test', 'cacheTtlDaily'],
    root: 'https://api.bscscan.com/',
    requiredServerParams: ['BSCSCAN_API_KEY'],
    routes: {
        getContractABI: {
            method: 'GET',
            path: '/api?module=contract&action=getabi&apikey={{BSCSCAN_API_KEY}}',
            description: 'Returns the Contract ABI of a verified smart contract via BSCScan. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ]
        },
        getContractSourceCode: {
            method: 'GET',
            path: '/api?module=contract&action=getsourcecode&apikey={{BSCSCAN_API_KEY}}',
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
