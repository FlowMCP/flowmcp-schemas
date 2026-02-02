import { EVM_CHAINS } from '../../_shared/evmChains.mjs'

const moralisChains = EVM_CHAINS
    .filter( ( c ) => c.moralisChainSlug !== undefined )

const aliasToSlug = moralisChains
    .reduce( ( acc, c ) => {
        acc[ c.alias ] = c.moralisChainSlug
        return acc
    }, {} )

const nftFullAliases = [
    'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'HOLESKY_TESTNET',
    'POLYGON_MAINNET', 'POLYGON_AMOY_TESTNET', 'BINANCE_MAINNET',
    'BINANCE_TESTNET', 'AVALANCHE_MAINNET', 'FANTOM_MAINNET',
    'PALM_MAINNET', 'CRONOS_MAINNET', 'ARBITRUM_ONE_MAINNET',
    'GNOSIS_MAINNET', 'GNOSIS_TESTNET', 'CHILIZ_MAINNET',
    'CHILIZ_TESTNET', 'BASE_MAINNET', 'BASE_SEPOLIA_TESTNET',
    'OPTIMISM_MAINNET', 'LINEA_MAINNET', 'LINEA_SEPOLIA_TESTNET',
    'MOONBEAM_MAINNET', 'MOONRIVER_MAINNET', 'MOONBASE_ALPHA_TESTNET',
    'FLOW_MAINNET', 'FLOW_TESTNET', 'RONIN_MAINNET', 'RONIN_TESTNET',
    'LISK_MAINNET', 'LISK_SEPOLIA_TESTNET'
]
const nftFullChainEnum = 'enum(' + nftFullAliases.join( ',' ) + ')'

const nftTradeAliases = [
    'ETHEREUM_MAINNET', 'POLYGON_MAINNET', 'BINANCE_MAINNET',
    'AVALANCHE_MAINNET', 'ARBITRUM_ONE_MAINNET', 'BASE_MAINNET',
    'OPTIMISM_MAINNET'
]
const nftTradeChainEnum = 'enum(' + nftTradeAliases.join( ',' ) + ')'

const schema = {
	'namespace': 'moralis',
    'name': 'Moralis nftApi API',
    'description': 'Comprehensive NFT data via Moralis — collection stats, metadata, ownership, transfers, trades, traits, and market rankings across 30+ EVM chains.',
    'docs': ["https://docs.moralis.com"],
    tags: ["evm", "nft", "collectibles", "cacheTtlFrequent"],
    'flowMCP': '1.2.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {
		"/market-data/nfts/top-collections": 		{
		    "requestMethod": "GET",
		    "description": "Get the top NFT collections by market cap via Moralis. Returns structured JSON response data.",
		    "route": "/market-data/nfts/top-collections",
		    "parameters": [],
		    "tests": [
		        { "_description": "Get the top NFT collections by market cap" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/market-data/nfts/hottest-collections": 		{
		    "requestMethod": "GET",
		    "description": "Get the top NFT collections by trading volume via Moralis. Returns structured JSON response data.",
		    "route": "/market-data/nfts/hottest-collections",
		    "parameters": [],
		    "tests": [
		        { "_description": "Get the top NFT collections by trading volume" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address": 		{
		    "requestMethod": "GET",
		    "description": "Get NFTs for a given contract address, including metadata for all NFTs (where available).",
		    "route": "/nft/:address",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"totalRanges","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"range","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFTs for a given contract address, including metadata for all NFTs (where available).", "chain": "ETHEREUM_MAINNET", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949", "format": "decimal" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/stats": 		{
		    "requestMethod": "GET",
		    "description": "Get the stats for a nft collection address via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/nft/:address/stats",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the stats for a nft collection address.", "chain": "ETHEREUM_MAINNET", "address": "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/metadata": 		{
		    "requestMethod": "GET",
		    "description": "Get the collection / contract level metadata for a given contract (name, symbol, base token URI).",
		    "route": "/nft/:address/metadata",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the collection / contract level metadata for a given contract.", "chain": "ETHEREUM_MAINNET", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of NFTs for a given contract and other parameters. Required: chain, address. Optional filters: from_block, to_block, from_date, to_date, format, limit, order, cursor, include_prices.",
		    "route": "/nft/:address/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get transfers of NFTs for a given contract and other parameters.", "chain": "ETHEREUM_MAINNET", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT data, including metadata (where available), for the given NFT token ID and contract address.",
		    "route": "/nft/:address/:token_id",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(decimal,hex)","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT data, including metadata (where available), for the given NFT token ID and contract address.", "chain": "ETHEREUM_MAINNET", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/owners": 		{
		    "requestMethod": "GET",
		    "description": "Get owners of NFTs for a given contract via Moralis — query by address. Supports format, limit, cursor filters.",
		    "route": "/nft/:address/owners",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get owners of NFTs for a given contract.", "chain": "ETHEREUM_MAINNET", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/owners": 		{
		    "requestMethod": "GET",
		    "description": "Get owners of a specific NFT given the contract address and token ID. Required: chain, address, token_id. Optional filters: format, limit, cursor, normalizeMetadata, media_items.",
		    "route": "/nft/:address/:token_id/owners",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get owners of a specific NFT given the contract address and token ID.", "chain": "ETHEREUM_MAINNET", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given contract and token ID via Moralis — query by address and token id.",
		    "route": "/nft/:address/:token_id/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftTradeChainEnum,"options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"nft_metadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get trades of NFTs for a given contract and token ID.", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048", "token_id": "123" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/wallets/:address/nfts/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given wallet via Moralis — query by address. Supports from_block, to_block, from_date filters.",
		    "route": "/wallets/:address/nfts/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftTradeChainEnum,"options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"nft_metadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get trades of NFTs for a given wallet.", "chain": "ETHEREUM_MAINNET", "address": "0xcB1C1FdE09f811B294172696404e88E658659905" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given contract and marketplace via Moralis — query by address.",
		    "route": "/nft/:address/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"marketplace","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"nft_metadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get trades of NFTs for a given contract and marketplace.", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/traits/paginate": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT traits for a given collection",
		    "route": "/nft/:address/traits/paginate",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT traits for a given collection", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/traits": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT traits for a given collection",
		    "route": "/nft/:address/traits",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT traits for a given collection", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of an NFT given a contract address and token ID. Required: chain, address, token_id. Optional filters: format, limit, order, cursor, include_prices.",
		    "route": "/nft/:address/:token_id/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get transfers of an NFT given a contract address and token ID.", "chain": "ETHEREUM_MAINNET", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/:address/nft/collections": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT collections owned by a given wallet address via Moralis — query by address.",
		    "route": "/:address/nft/collections",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"token_counts","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT ciollections owned by a given wallet address.", "chain": "ETHEREUM_MAINNET", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/:address/nft/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of NFTs given the wallet and other parameters.",
		    "route": "/:address/nft/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"contract_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get transfers of NFTs given the wallet and other parameters.", "chain": "ETHEREUM_MAINNET", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/:address/nft": 		{
		    "requestMethod": "GET",
		    "description": "Get NFTs owned by a given address via Moralis — query by address. Supports format, limit, exclude_spam filters.",
		    "route": "/:address/nft",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(decimal,hex)","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFTs owned by a given address.", "chain": "ETHEREUM_MAINNET", "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/metadata/resync": 		{
		    "requestMethod": "GET",
		    "description": "Resync the metadata for an NFT via Moralis — query by address and token id. Supports flag, mode filters.",
		    "route": "/nft/:address/:token_id/metadata/resync",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"flag","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(uri,metadata)","options":["optional()"]}},
				{"position":{"key":"mode","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(sync,async)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Resync the metadata for an NFT", "chain": "ETHEREUM_MAINNET", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/traits/resync": 		{
		    "requestMethod": "GET",
		    "description": "Resync the NFT Trait for a given contract via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/nft/:address/traits/resync",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftFullChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Resync the NFT Trait for a given contract", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		}
	},
    'handlers': {
        'mapChainToSlug': async( { struct, payload, userParams } ) => {
            const chainAlias = userParams.chain
            if( !chainAlias ) { return { struct, payload } }
            const slug = aliasToSlug[ chainAlias ]
            if( !slug ) {
                struct.status = false
                struct.messages.push( `Unsupported chain: ${chainAlias}` )
                return { struct, payload }
            }
            payload['url'] = payload['url'].replace( `chain=${chainAlias}`, `chain=${slug}` )
            return { struct, payload }
        },
        'modifyResult': async( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}


export { schema }
