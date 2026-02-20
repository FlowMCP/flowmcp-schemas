export const main = {
    namespace: 'erctoken',
    name: 'ERC-20 Fungible Token Standard',
    description: 'Read ERC-20 fungible token data on any EVM chain with provider selection (Alchemy or Infura). Query token metadata, balances, and allowances via on-chain contract calls.',
    version: '2.0.0',
    docs: [ 'https://eips.ethereum.org/EIPS/eip-20' ],
    tags: [ 'erc20', 'token', 'fungible', 'balance', 'allowance', 'onchain', 'multichain' ],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://erc-rpc-resolver.local?_ak={{ALCHEMY_API_KEY}}&_ik={{INFURA_API_KEY}}',
    requiredServerParams: [ 'ALCHEMY_API_KEY', 'INFURA_API_KEY' ],
    routes: {
        tokenInfo: {
            method: 'GET',
            path: '/',
            description: 'Get ERC-20 token metadata including name, symbol, decimals and total supply for a contract on any supported EVM chain.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } }
            ],
            tests: [
                { _description: 'Get USDC token info on Ethereum via Alchemy', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
                { _description: 'Get USDC token info on Ethereum via Infura', provider: 'infura', chain: 'ETHEREUM_MAINNET', contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
            ]
        },
        balanceOf: {
            method: 'GET',
            path: '/',
            description: 'Query the ERC-20 token balance of a wallet address for a specific contract. Returns raw balance, formatted balance with decimals, and token symbol.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } }
            ],
            tests: [
                { _description: 'Get USDC balance of Uniswap Router on Ethereum', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564' }
            ]
        },
        allowance: {
            method: 'GET',
            path: '/',
            description: 'Check the ERC-20 token allowance granted by an owner to a spender address. Returns raw allowance amount and formatted value.',
            parameters: [
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(alchemy,infura)', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:alias}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'owner', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } },
                { position: { key: 'spender', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'regex(^0x[a-fA-F0-9]{40}$)' ] } }
            ],
            tests: [
                { _description: 'Check USDC allowance from WETH to Uniswap Router', provider: 'alchemy', chain: 'ETHEREUM_MAINNET', contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', owner: '0xC02aaA39b223FE8D0A0e5CC4764e055256e07c6f', spender: '0xE592427A0AEce92De3Edee1F18E0157C05861564' }
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

    const ERC20_ABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function totalSupply() view returns (uint256)',
        'function balanceOf(address owner) view returns (uint256)',
        'function allowance(address owner, address spender) view returns (uint256)'
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
                    const contract = new ethers.Contract( contractAddress, ERC20_ABI, rpcProvider )

                    const [ name, symbol, decimals, totalSupply ] = await Promise.all( [
                        contract.name(),
                        contract.symbol(),
                        contract.decimals(),
                        contract.totalSupply()
                    ] )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        name,
                        symbol,
                        decimals: Number( decimals ),
                        totalSupply: totalSupply.toString(),
                        totalSupplyFormatted: ethers.formatUnits( totalSupply, Number( decimals ) )
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-20 token info for ${contractAddress} on ${chain}` )
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
                    const contract = new ethers.Contract( contractAddress, ERC20_ABI, rpcProvider )

                    const [ balance, decimals, symbol ] = await Promise.all( [
                        contract.balanceOf( walletAddress ),
                        contract.decimals(),
                        contract.symbol()
                    ] )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        walletAddress,
                        symbol,
                        balance: balance.toString(),
                        balanceFormatted: ethers.formatUnits( balance, Number( decimals ) ),
                        decimals: Number( decimals )
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-20 balance for ${walletAddress} on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        },


        allowance: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { _allParams: { provider, chain, contractAddress, owner, spender } } = userParams
                const { url } = payload

                const { rpcUrl, error } = resolveRpcUrl( { provider, chain, url } )
                if( error ) {
                    struct[ 'messages' ].push( error )
                    struct[ 'status' ] = false

                    return { struct }
                }

                try {
                    const rpcProvider = new ethers.JsonRpcProvider( rpcUrl )
                    const contract = new ethers.Contract( contractAddress, ERC20_ABI, rpcProvider )

                    const [ allowance, decimals, symbol ] = await Promise.all( [
                        contract.allowance( owner, spender ),
                        contract.decimals(),
                        contract.symbol()
                    ] )

                    struct[ 'data' ] = {
                        chain,
                        provider,
                        contractAddress,
                        owner,
                        spender,
                        symbol,
                        allowance: allowance.toString(),
                        allowanceFormatted: ethers.formatUnits( allowance, Number( decimals ) ),
                        decimals: Number( decimals )
                    }
                } catch( e ) {
                    struct[ 'messages' ].push( e?.message || `Failed to get ERC-20 allowance on ${chain}` )
                    struct[ 'status' ] = false
                }

                return { struct }
            }
        }
    }
}
