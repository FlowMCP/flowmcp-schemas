// Migrated from v1.2.0 -> v2.0.0
// ERC-20/721/1155 routes moved to erc/ standalone schemas
// Only generic readContract remains
// requiredLibraries: ethers

export const main = {
    namespace: 'alchemy',
    name: 'Alchemy Contract Read',
    description: 'Call any read-only (view/pure) function on a smart contract via Alchemy on 20+ EVM mainnets using a human-readable ABI signature.',
    version: '2.0.0',
    docs: ['https://docs.alchemy.com/reference/api-overview', 'https://docs.ethers.org/v6/api/contract/'],
    tags: ['blockchain', 'evm', 'smartcontract', 'multichain', 'alchemy', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0', filter: { key: 'isTestnet', value: false } }
    ],
    root: 'https://--alchemy-slug--.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}',
    requiredServerParams: ['ALCHEMY_API_KEY'],
    routes: {
        readContract: {
            method: 'GET',
            path: '/',
            description: 'Call any read-only (view/pure) function on a smart contract using a human-readable function signature. Provide args as a JSON array string.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alchemyNetworkSlug}})', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'functionSignature', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'args', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default([])'] } }
            ],
            tests: [
                {
                    _description: 'Read USDC name() on Ethereum',
                    chain: 'eth-mainnet',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    functionSignature: 'function name() view returns (string)'
                },
                {
                    _description: 'Read USDC decimals() on Polygon',
                    chain: 'polygon-mainnet',
                    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
                    functionSignature: 'function decimals() view returns (uint8)'
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
        readContract: {
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
                const { chain, address, functionSignature } = userParams
                const args = userParams.args || '[]'
                try {
                const parsedArgs = JSON.parse( args )
                const iface = new ethers.Interface( [ functionSignature ] )
                const functionName = iface.fragments[ 0 ].name
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( address, [ functionSignature ], provider )
                const result = await contract[ functionName ]( ...parsedArgs )
                const formatted = typeof result === 'bigint' ? result.toString() : result
                struct.data = {
                chain,
                address,
                functionName,
                result: formatted
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to call ${functionSignature} on ${address}` )
                }
                return { struct }
            }
        }
    }
}
