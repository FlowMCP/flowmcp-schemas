// Split from infura/contract-read.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 10 routes (v2 max: 8) — needs splitting
// requiredLibraries: ethers
// Import: import { ethers } from 'ethers'
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 27 lines

export const main = {
    namespace: 'infura',
    name: 'Infura Contract Read (Part 1)',
    description: 'Read smart contract state on EVM mainnets via Infura. Includes ERC-20 token info and balances, ERC-721 NFT ownership and metadata, ERC-1155 multi-token queries, and a generic readContract route for any view function using human-readable ABI signatures.',
    version: '2.0.0',
    docs: ['https://docs.infura.io/api/networks', 'https://docs.ethers.org/v6/api/contract/', 'https://eips.ethereum.org/EIPS/eip-20'],
    tags: ['blockchain', 'evm', 'smartcontract', 'token', 'multichain', 'infura', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0', filter: { key: 'isTestnet', value: false } }
    ],
    root: 'https://--infura-subdomain--.infura.io/v3/{{INFURA_API_KEY}}',
    requiredServerParams: ['INFURA_API_KEY'],
    routes: {
        readContract: {
            method: 'GET',
            path: '/',
            description: 'Call any read-only (view/pure) function on a smart contract using a human-readable function signature. Provide args as a JSON array string.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'functionSignature', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'args', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default([])'] } }
            ],
            tests: [
                {
                    _description: 'Read USDC name() on Ethereum via Infura',
                    chain: 'mainnet',
                    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    functionSignature: 'function name() view returns (string)'
                }
            ],
        },
        erc20TokenInfo: {
            method: 'GET',
            path: '/',
            description: 'Get ERC-20 token info: name, symbol, decimals, and total supply for a contract address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get USDC token info on Ethereum via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                }
            ],
        },
        erc20BalanceOf: {
            method: 'GET',
            path: '/',
            description: 'Get the ERC-20 token balance for a wallet address on a specific contract.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get USDC balance of Uniswap Router via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
                }
            ],
        },
        erc20Allowance: {
            method: 'GET',
            path: '/',
            description: 'Get the ERC-20 allowance granted by an owner to a spender for a specific token contract.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'owner', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'spender', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Check USDC allowance via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    owner: '0xC02aaA39b223FE8D0A0e5CC4764e055256e07c6f',
                    spender: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
                }
            ],
        },
        erc721TokenInfo: {
            method: 'GET',
            path: '/',
            description: 'Get ERC-721 NFT collection info: name and symbol for a contract address.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get BAYC collection info via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
                }
            ],
        },
        erc721OwnerOf: {
            method: 'GET',
            path: '/',
            description: 'Get the owner address of a specific ERC-721 token by its token ID.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get owner of BAYC #1 via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
                    tokenId: '1'
                }
            ],
        },
        erc721TokenURI: {
            method: 'GET',
            path: '/',
            description: 'Get the token URI (metadata URL) for a specific ERC-721 token by its token ID.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get BAYC #1 metadata URI via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
                    tokenId: '1'
                }
            ],
        },
        erc721BalanceOf: {
            method: 'GET',
            path: '/',
            description: 'Get the number of ERC-721 tokens owned by a wallet address for a specific collection.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                {
                    _description: 'Get BAYC balance via Infura',
                    chain: 'mainnet',
                    contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
                    walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
                }
            ],
        }
    },
    requiredLibraries: ['ethers']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ethers = libraries['ethers']
    const EVM_CHAINS = sharedLists['evmChains']

    const validSubdomains = new Set(
        EVM_CHAINS
            .filter( ( c ) => c.infuraSubdomain !== undefined )
            .map( ( c ) => c.infuraSubdomain )
    )
    const ERC20_ABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function totalSupply() view returns (uint256)',
        'function balanceOf(address owner) view returns (uint256)',
        'function allowance(address owner, address spender) view returns (uint256)'
    ]
    const ERC721_ABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function ownerOf(uint256 tokenId) view returns (address)',
        'function tokenURI(uint256 tokenId) view returns (string)',
        'function balanceOf(address owner) view returns (uint256)'
    ]
    const ERC1155_ABI = [
        'function balanceOf(address account, uint256 id) view returns (uint256)',
        'function uri(uint256 id) view returns (string)'
    ]

    return {
        readContract: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
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
        },
        erc20TokenInfo: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC20_ABI, provider )
                const [ name, symbol, decimals, totalSupply ] = await Promise.all( [
                contract.name(),
                contract.symbol(),
                contract.decimals(),
                contract.totalSupply()
                ] )
                struct.data = {
                chain,
                contractAddress,
                name,
                symbol,
                decimals: Number( decimals ),
                totalSupply: totalSupply.toString(),
                totalSupplyFormatted: ethers.formatUnits( totalSupply, Number( decimals ) )
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-20 token info for ${contractAddress} on ${chain}` )
                }
                return { struct }
            }
        },
        erc20BalanceOf: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress, walletAddress } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC20_ABI, provider )
                const [ balance, decimals, symbol ] = await Promise.all( [
                contract.balanceOf( walletAddress ),
                contract.decimals(),
                contract.symbol()
                ] )
                struct.data = {
                chain,
                contractAddress,
                walletAddress,
                symbol,
                balance: balance.toString(),
                balanceFormatted: ethers.formatUnits( balance, Number( decimals ) ),
                decimals: Number( decimals )
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-20 balance for ${walletAddress} on ${chain}` )
                }
                return { struct }
            }
        },
        erc20Allowance: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress, owner, spender } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC20_ABI, provider )
                const [ allowance, decimals, symbol ] = await Promise.all( [
                contract.allowance( owner, spender ),
                contract.decimals(),
                contract.symbol()
                ] )
                struct.data = {
                chain,
                contractAddress,
                owner,
                spender,
                symbol,
                allowance: allowance.toString(),
                allowanceFormatted: ethers.formatUnits( allowance, Number( decimals ) ),
                decimals: Number( decimals )
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-20 allowance on ${chain}` )
                }
                return { struct }
            }
        },
        erc721TokenInfo: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC721_ABI, provider )
                const [ name, symbol ] = await Promise.all( [
                contract.name(),
                contract.symbol()
                ] )
                struct.data = {
                chain,
                contractAddress,
                name,
                symbol
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-721 token info for ${contractAddress} on ${chain}` )
                }
                return { struct }
            }
        },
        erc721OwnerOf: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress, tokenId } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC721_ABI, provider )
                const owner = await contract.ownerOf( tokenId )
                struct.data = {
                chain,
                contractAddress,
                tokenId,
                owner
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get owner of token ${tokenId} on ${chain}` )
                }
                return { struct }
            }
        },
        erc721TokenURI: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress, tokenId } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC721_ABI, provider )
                const tokenURI = await contract.tokenURI( tokenId )
                struct.data = {
                chain,
                contractAddress,
                tokenId,
                tokenURI
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get tokenURI for token ${tokenId} on ${chain}` )
                }
                return { struct }
            }
        },
        erc721BalanceOf: {
            preRequest: async ( { struct, payload } ) => {
                const { chain } = payload
                if( !validSubdomains.has( chain ) ) {
                    throw new Error( `Unsupported chain: ${chain}` )
                }
                struct.url = struct.url.replace( '--infura-subdomain--', chain )
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { chain, contractAddress, walletAddress } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC721_ABI, provider )
                const balance = await contract.balanceOf( walletAddress )
                struct.data = {
                chain,
                contractAddress,
                walletAddress,
                balance: balance.toString()
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-721 balance for ${walletAddress} on ${chain}` )
                }
                return { struct }
            }
        }
    }
}
