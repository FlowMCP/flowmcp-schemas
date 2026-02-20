export const main = {
    namespace: 'ercmultitoken',
    name: 'ERC-1155 Multi-Token Standard',
    description: 'Read ERC-1155 multi-token data on any EVM chain with provider selection (Alchemy or Infura). Query token balances and metadata URIs for semi-fungible and non-fungible tokens via on-chain contract calls.',
    version: '2.0.0',
    docs: [ 'https://eips.ethereum.org/EIPS/eip-1155' ],
    tags: [ 'erc1155', 'multitoken', 'nft', 'semifungible', 'balance', 'onchain', 'multichain' ],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://erc-rpc-resolver.local?_ak={{ALCHEMY_API_KEY}}&_ik={{INFURA_API_KEY}}',
    requiredServerParams: [ 'ALCHEMY_API_KEY', 'INFURA_API_KEY' ],
    routes: {
        balanceOf: {
            method: 'GET',
            path: '/',
            description: 'Query the ERC-1155 token balance of a specific token ID owned by a wallet address.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get ERC-1155 balance on OpenSea Shared Storefront', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e', walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564', tokenId: '1' }
            ]
        },
        uri: {
            method: 'GET',
            path: '/',
            description: 'Get the metadata URI for a specific ERC-1155 token ID. The URI may contain {id} placeholder per the ERC-1155 specification.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get ERC-1155 metadata URI on OpenSea Shared', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e', tokenId: '1' }
            ]
        }
    },
    requiredLibraries: [ 'ethers' ]
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ethers = libraries[ 'ethers' ]
    const EVM_CHAINS = sharedLists[ 'evmChains' ]

    const alchemySlugs = EVM_CHAINS
        .filter( ( c ) => c.alchemyNetworkSlug !== undefined )
        .reduce( ( acc, c ) => {
            acc[ c.alias ] = c.alchemyNetworkSlug
            return acc
        }, {} )

    const infuraSubdomains = EVM_CHAINS
        .filter( ( c ) => c.infuraSubdomain !== undefined )
        .reduce( ( acc, c ) => {
            acc[ c.alias ] = c.infuraSubdomain
            return acc
        }, {} )

    const resolveRpcUrl = ( { provider, chain, url } ) => {
        const parsed = new URL( url )
        const alchemyKey = parsed.searchParams.get( '_ak' )
        const infuraKey = parsed.searchParams.get( '_ik' )

        if( provider === 'alchemy' ) {
            const slug = alchemySlugs[ chain ]
            if( !slug ) { return { rpcUrl: null, error: `Chain ${chain} not supported by Alchemy` } }

            return { rpcUrl: `https://${slug}.g.alchemy.com/v2/${alchemyKey}`, error: null }
        }

        const subdomain = infuraSubdomains[ chain ]
        if( !subdomain ) { return { rpcUrl: null, error: `Chain ${chain} not supported by Infura` } }

        return { rpcUrl: `https://${subdomain}.infura.io/v3/${infuraKey}`, error: null }
    }

    const ERC1155_ABI = [
        'function balanceOf(address account, uint256 id) view returns (uint256)',
        'function uri(uint256 id) view returns (string)'
    ]

    return {
        balanceOf: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { _allParams: { provider, chain, contractAddress, walletAddress, tokenId } } = userParams
                const { url } = payload

                const { rpcUrl, error } = resolveRpcUrl( { provider, chain, url } )
                if( error ) {
                    struct[ 'messages' ].push( error )
                    struct[ 'status' ] = false

                    return { struct }
                }

                try {
                    const rpcProvider = new ethers.JsonRpcProvider( rpcUrl )
                    const contract = new ethers.Contract( contractAddress, ERC1155_ABI, rpcProvider )

                    const balance = await contract.balanceOf( walletAddress, tokenId )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        walletAddress,
                        tokenId,
                        balance: balance.toString()
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-1155 balance for token ${tokenId} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        },


        uri: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { _allParams: { provider, chain, contractAddress, tokenId } } = userParams
                const { url } = payload

                const { rpcUrl, error } = resolveRpcUrl( { provider, chain, url } )
                if( error ) {
                    struct[ 'messages' ].push( error )
                    struct[ 'status' ] = false

                    return { struct }
                }

                try {
                    const rpcProvider = new ethers.JsonRpcProvider( rpcUrl )
                    const contract = new ethers.Contract( contractAddress, ERC1155_ABI, rpcProvider )

                    const uriValue = await contract.uri( tokenId )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        tokenId,
                        uri: uriValue
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get URI for token ${tokenId} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        }
    }
}
