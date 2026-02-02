import { ethers } from 'ethers'
import { EVM_CHAINS } from '../_shared/evmChains.mjs'


const alchemyChains = EVM_CHAINS
    .filter( ( c ) => c.alchemyNetworkSlug !== undefined && !c.isTestnet )

const alchemySlug = alchemyChains
    .reduce( ( acc, c ) => {
        acc[ c.alias ] = c.alchemyNetworkSlug
        return acc
    }, {} )

const chainEnum = 'enum(' + Object.keys( alchemySlug ).join( ',' ) + ')'

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


const schema = {
    namespace: "alchemy",
    name: "Alchemy Contract Read",
    description: "Read smart contract state on 20+ EVM mainnets via Alchemy. Includes ERC-20 token info and balances, ERC-721 NFT ownership and metadata, ERC-1155 multi-token queries, and a generic readContract route for any view function using human-readable ABI signatures.",
    docs: ["https://docs.alchemy.com/reference/api-overview", "https://docs.ethers.org/v6/api/contract/", "https://eips.ethereum.org/EIPS/eip-20"],
    tags: ["blockchain", "evm", "smartcontract", "token", "multichain", "alchemy", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "https://--alchemy-slug--.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}",
    requiredServerParams: ["ALCHEMY_API_KEY"],
    headers: {},
    routes: {
        readContract: {
            requestMethod: "GET",
            description: "Call any read-only (view/pure) function on a smart contract using a human-readable function signature. Provide args as a JSON array string.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "functionSignature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "args", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()", "default([])"] } }
            ],
            tests: [
                { _description: "Read USDT name on Ethereum", chain: "ETHEREUM_MAINNET", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", functionSignature: "function name() view returns (string)", args: "[]" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "readContractExecute" }
            ]
        },
        erc20TokenInfo: {
            requestMethod: "GET",
            description: "Get ERC-20 token info: name, symbol, decimals, and total supply for a contract address.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get USDT token info on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc20TokenInfoExecute" }
            ]
        },
        erc20BalanceOf: {
            requestMethod: "GET",
            description: "Get the ERC-20 token balance for a wallet address on a specific contract.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get Vitalik USDT balance on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc20BalanceOfExecute" }
            ]
        },
        erc20Allowance: {
            requestMethod: "GET",
            description: "Get the ERC-20 allowance granted by an owner to a spender for a specific token contract.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "owner", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "spender", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Check USDT allowance on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", owner: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", spender: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc20AllowanceExecute" }
            ]
        },
        erc721TokenInfo: {
            requestMethod: "GET",
            description: "Get ERC-721 NFT collection info: name and symbol for a contract address.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get BAYC collection info on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc721TokenInfoExecute" }
            ]
        },
        erc721OwnerOf: {
            requestMethod: "GET",
            description: "Get the owner address of a specific ERC-721 token by its token ID.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "tokenId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get BAYC #1 owner on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", tokenId: "1" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc721OwnerOfExecute" }
            ]
        },
        erc721TokenURI: {
            requestMethod: "GET",
            description: "Get the token URI (metadata URL) for a specific ERC-721 token by its token ID.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "tokenId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get BAYC #1 tokenURI on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", tokenId: "1" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc721TokenURIExecute" }
            ]
        },
        erc721BalanceOf: {
            requestMethod: "GET",
            description: "Get the number of ERC-721 tokens owned by a wallet address for a specific collection.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Get Vitalik BAYC balance on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc721BalanceOfExecute" }
            ]
        },
        erc1155BalanceOf: {
            requestMethod: "GET",
            description: "Get the ERC-1155 token balance for a wallet address and token ID on a specific contract.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "tokenId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get Parallel Alpha balance on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0x76BE3b62873462d2142405439777e971754E8E77", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", tokenId: "10544" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc1155BalanceOfExecute" }
            ]
        },
        erc1155Uri: {
            requestMethod: "GET",
            description: "Get the metadata URI for a specific ERC-1155 token ID on a contract.",
            route: "/",
            parameters: [
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: chainEnum, options: [] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } },
                { position: { key: "tokenId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get Parallel Alpha URI on Ethereum", chain: "ETHEREUM_MAINNET", contractAddress: "0x76BE3b62873462d2142405439777e971754E8E77", tokenId: "10544" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSlug" },
                { phase: "execute", handlerName: "erc1155UriExecute" }
            ]
        }
    },
    handlers: {
        insertSlug: async ( { struct, payload, userParams } ) => {
            const { chain } = userParams
            const slug = alchemySlug[ chain ]
            if( !slug ) {
                struct.status = false
                struct.messages.push( `Unsupported chain: ${chain}` )
                return { struct, payload }
            }
            payload.url = payload.url.replace( '--alchemy-slug--', slug )
            return { struct, payload }
        },
        readContractExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc20TokenInfoExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc20BalanceOfExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc20AllowanceExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc721TokenInfoExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc721OwnerOfExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc721TokenURIExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc721BalanceOfExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc1155BalanceOfExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        },
        erc1155UriExecute: async ( { struct, payload, userParams } ) => {
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
            return { struct, payload }
        }
    }
}


export { schema }
