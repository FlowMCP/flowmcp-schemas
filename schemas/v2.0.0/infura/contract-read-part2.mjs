// Split from infura/contract-read.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// 10 routes (v2 max: 8) — needs splitting
// requiredLibraries: ethers
// Import: import { ethers } from 'ethers'
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 27 lines

export const main = {
    namespace: 'infura',
    name: 'Infura Contract Read (Part 2)',
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
        erc1155BalanceOf: {
            method: 'GET',
            path: '/',
            description: 'Get the ERC-1155 token balance for a wallet address and token ID on a specific contract.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get ERC-1155 balance via Infura',
                    chain: 'mainnet',
                    contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
                    walletAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
                    tokenId: '1'
                }
            ],
        },
        erc1155Uri: {
            method: 'GET',
            path: '/',
            description: 'Get the metadata URI for a specific ERC-1155 token ID on a contract.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum({{evmChains:infuraSubdomain}})', options: [] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'tokenId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Get ERC-1155 URI via Infura',
                    chain: 'mainnet',
                    contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
                    tokenId: '1'
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
        erc1155BalanceOf: {
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
                const { chain, contractAddress, walletAddress, tokenId } = userParams
                try {
                const provider = new ethers.JsonRpcProvider( payload.url )
                const contract = new ethers.Contract( contractAddress, ERC1155_ABI, provider )
                const balance = await contract.balanceOf( walletAddress, tokenId )
                struct.data = {
                chain,
                contractAddress,
                walletAddress,
                tokenId,
                balance: balance.toString()
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get ERC-1155 balance for token ${tokenId} on ${chain}` )
                }
                return { struct }
            }
        },
        erc1155Uri: {
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
                const contract = new ethers.Contract( contractAddress, ERC1155_ABI, provider )
                const uri = await contract.uri( tokenId )
                struct.data = {
                chain,
                contractAddress,
                tokenId,
                uri
                }
                struct.status = true
                } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || `Failed to get URI for token ${tokenId} on ${chain}` )
                }
                return { struct }
            }
        }
    }
}
