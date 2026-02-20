export const main = {
    namespace: 'ercnft',
    name: 'ERC-721 Non-Fungible Token Standard',
    description: 'Read ERC-721 NFT data on any EVM chain with provider selection (Alchemy or Infura). Query collection metadata, token ownership, metadata URIs, and NFT balances via on-chain contract calls.',
    version: '2.0.0',
    docs: [ 'https://eips.ethereum.org/EIPS/eip-721' ],
    tags: [ 'erc721', 'nft', 'token', 'ownership', 'metadata', 'onchain', 'multichain' ],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://erc-rpc-resolver.local?_ak={{ALCHEMY_API_KEY}}&_ik={{INFURA_API_KEY}}',
    requiredServerParams: [ 'ALCHEMY_API_KEY', 'INFURA_API_KEY' ],
    routes: {
        tokenInfo: {
            method: 'GET',
            path: '/',
            description: 'Get ERC-721 NFT collection metadata including name and symbol for a contract on any supported EVM chain.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } }
            ],
            tests: [
                { _description: 'Get BAYC NFT collection info on Ethereum', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' }
            ]
        },
        ownerOf: {
            method: 'GET',
            path: '/',
            description: 'Query the current owner address of a specific ERC-721 NFT by its token ID.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get owner of BAYC token #1 on Ethereum', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', tokenId: '1' }
            ]
        },
        tokenURI: {
            method: 'GET',
            path: '/',
            description: 'Get the metadata URI of a specific ERC-721 NFT by its token ID. The URI typically points to a JSON file with name, description, and image.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Get metadata URI of BAYC token #1', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', tokenId: '1' }
            ]
        },
        balanceOf: {
            method: 'GET',
            path: '/',
            description: 'Query how many ERC-721 NFTs from a specific collection are owned by a wallet address.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } }
            ],
            tests: [
                { _description: 'Get BAYC NFT balance of a wallet on Ethereum', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564' }
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

    const ERC721_ABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function ownerOf(uint256 tokenId) view returns (address)',
        'function tokenURI(uint256 tokenId) view returns (string)',
        'function balanceOf(address owner) view returns (uint256)'
    ]

    return {
        tokenInfo: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { _allParams: { provider, chain, contractAddress } } = userParams
                const { url } = payload

                const { rpcUrl, error } = resolveRpcUrl( { provider, chain, url } )
                if( error ) {
                    struct[ 'messages' ].push( error )
                    struct[ 'status' ] = false

                    return { struct }
                }

                try {
                    const rpcProvider = new ethers.JsonRpcProvider( rpcUrl )
                    const contract = new ethers.Contract( contractAddress, ERC721_ABI, rpcProvider )

                    const [ name, symbol ] = await Promise.all( [
                        contract.name(),
                        contract.symbol()
                    ] )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        name,
                        symbol
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-721 token info for ${contractAddress} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        },


        ownerOf: {
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
                    const contract = new ethers.Contract( contractAddress, ERC721_ABI, rpcProvider )

                    const owner = await contract.ownerOf( tokenId )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        tokenId,
                        owner
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get owner of token ${tokenId} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        },


        tokenURI: {
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
                    const contract = new ethers.Contract( contractAddress, ERC721_ABI, rpcProvider )

                    const tokenURIValue = await contract.tokenURI( tokenId )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        tokenId,
                        tokenURI: tokenURIValue
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get tokenURI for token ${tokenId} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        },


        balanceOf: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { _allParams: { provider, chain, contractAddress, walletAddress } } = userParams
                const { url } = payload

                const { rpcUrl, error } = resolveRpcUrl( { provider, chain, url } )
                if( error ) {
                    struct[ 'messages' ].push( error )
                    struct[ 'status' ] = false

                    return { struct }
                }

                try {
                    const rpcProvider = new ethers.JsonRpcProvider( rpcUrl )
                    const contract = new ethers.Contract( contractAddress, ERC721_ABI, rpcProvider )

                    const balance = await contract.balanceOf( walletAddress )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        walletAddress,
                        balance: balance.toString()
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-721 balance for ${walletAddress} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        }
    }
}
