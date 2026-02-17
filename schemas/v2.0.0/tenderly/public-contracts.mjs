// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'tenderly',
    name: 'Tenderly Public Contracts',
    description: 'Lookup public smart contract information including source code verification, compiler details and token metadata via Tenderly',
    version: '2.0.0',
    docs: ['https://docs.tenderly.co/', 'https://tenderly.co/'],
    tags: ['ethereum', 'smartcontracts', 'debugging', 'cacheTtlStatic'],
    root: 'https://api.tenderly.co/api/v1',
    routes: {
        getPublicContract: {
            method: 'GET',
            path: '/public-contracts/:networkId/:address',
            description: 'Get detailed public contract information including compiler version, standards, token info and verification status',
            parameters: [
                { position: { key: 'networkId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getPublicContract: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.contract_name ) {
            return { response }}

            response = {
            source: "Tenderly",
            contractName: raw.contract_name,
            address: raw.address,
            networkId: raw.network_id,
            type: raw.type,
            standards: raw.standards || [],
            language: raw.language,
            compiler: {
            version: raw.compiler_version,
            evmVersion: raw.evm_version,
            optimizations: raw.optimizations_used,
            optimizationRuns: raw.optimization_runs
            },
            verification: {
            isPublic: raw.public,
            verifiedAt: raw.verification_date
            },
            creation: {
            block: raw.creation_block,
            txHash: raw.creation_tx,
            creator: raw.creator_address
            },
            tokenInfo: raw.token_info || null,
            tokenMarketData: raw.token_market_data || null
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting contract: ${error.message}` )
            }

            return { response }
        }
    }
} )
