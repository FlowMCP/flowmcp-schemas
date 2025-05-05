const schema = {
	'namespace': 'moralis',
    'name': 'Moralis nftApi API',
    'description': 'Moralis nftApi API',
    'docs': ["https://docs.moralis.com"],
    tags: [],
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
		    "description": "Get the top NFT collections by market cap",
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
		    "description": "Get the top NFT collections by trading volume",
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
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
		        { "_description": "Get NFTs for a given contract address, including metadata for all NFTs (where available).", "chain": "eth", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949", "format": "decimal" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/stats": 		{
		    "requestMethod": "GET",
		    "description": "Get the stats for a nft collection address.",
		    "route": "/nft/:address/stats",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the stats for a nft collection address.", "chain": "eth", "address": "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/metadata": 		{
		    "requestMethod": "GET",
		    "description": "Get the collection / contract level metadata for a given contract (name, symbol, base token URI).",
		    "route": "/nft/:address/metadata",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the collection / contract level metadata for a given contract.", "chain": "eth", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
/*
		"/nft/:address/price": 		{
		    "requestMethod": "GET",
		    "description": "Get the sold price for an NFT contract for the last x days (only trades paid in ETH).",
		    "route": "/nft/:address/price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,arbitrum,0xa4b1,base,0x2105,optimism,0xa)","options":[]}},
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the sold price for an NFT contract for the last x days.", "chain": "eth", "address": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
*/
		"/nft/:address/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of NFTs for a given contract and other parameters.",
		    "route": "/nft/:address/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
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
		        { "_description": "Get transfers of NFTs for a given contract and other parameters.", "chain": "eth", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
/*
		"/nft/:address/floor-price": 		{
		    "requestMethod": "GET",
		    "description": "Get floor price for a given contract.",
		    "route": "/nft/:address/floor-price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,base,0x2105)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get floor price for a given contract.", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
*/

/*
		"/nft/:address/:token_id/floor-price": 		{
		    "requestMethod": "GET",
		    "description": "Get floor price for a given token.",
		    "route": "/nft/:address/:token_id/floor-price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,base,0x2105)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get floor price.", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048", "token_id": "2441" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
*/
/*
		"/nft/:address/floor-price/historical": 		{
		    "requestMethod": "GET",
		    "description": "Get historical floor price for a given contract.",
		    "route": "/nft/:address/floor-price/historical",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,base,0x2105)","options":[]}},
				{"position":{"key":"interval","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(1d,7d,30d,60d,90d,1y,all)","options":[]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get historical floor price.", "chain": "eth", "interval": "1d", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
*/


		"/nft/:address/:token_id": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT data, including metadata (where available), for the given NFT token ID and contract address.",
		    "route": "/nft/:address/:token_id",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(decimal,hex)","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT data, including metadata (where available), for the given NFT token ID and contract address.", "chain": "eth", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/owners": 		{
		    "requestMethod": "GET",
		    "description": "Get owners of NFTs for a given contract.",
		    "route": "/nft/:address/owners",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get owners of NFTs for a given contract.", "chain": "eth", "address": "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
/*
		"/nft/:address/:token_id/price": 		{
		    "requestMethod": "GET",
		    "description": "Get the sold price for an NFT token for the last x days (only trades paid in ETH).",
		    "route": "/nft/:address/:token_id/price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,arbitrum,0xa4b1,base,0x2105,optimism,0xa)","options":[]}},
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the sold price for an NFT token for the last x days.", "chain": "eth", "address": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
*/
		"/nft/:address/:token_id/owners": 		{
		    "requestMethod": "GET",
		    "description": "Get owners of a specific NFT given the contract address and token ID.",
		    "route": "/nft/:address/:token_id/owners",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get owners of a specific NFT given the contract address and token ID.", "chain": "eth", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/:token_id/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given contract and token ID.",
		    "route": "/nft/:address/:token_id/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,arbitrum,0xa4b1,base,0x2105,optimism,0xa)","options":[]}},
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
		        { "_description": "Get trades of NFTs for a given contract and token ID.", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048", "token_id": "123" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/wallets/:address/nfts/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given wallet.",
		    "route": "/wallets/:address/nfts/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,arbitrum,0xa4b1,base,0x2105,optimism,0xa)","options":[]}},
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
		        { "_description": "Get trades of NFTs for a given wallet.", "chain": "eth", "address": "0xcB1C1FdE09f811B294172696404e88E658659905" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given contract and marketplace.",
		    "route": "/nft/:address/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
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
		        { "_description": "Get trades of NFTs for a given contract and marketplace.", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/traits/paginate": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT traits for a given collection",
		    "route": "/nft/:address/traits/paginate",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT traits for a given collection", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/traits": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT traits for a given collection",
		    "route": "/nft/:address/traits",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT traits for a given collection", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/:token_id/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of an NFT given a contract address and token ID.",
		    "route": "/nft/:address/:token_id/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get transfers of an NFT given a contract address and token ID.", "chain": "eth", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/:address/nft/collections": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT collections owned by a given wallet address.",
		    "route": "/:address/nft/collections",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"token_counts","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFT ciollections owned by a given wallet address.", "chain": "eth", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/:address/nft/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of NFTs given the wallet and other parameters.",
		    "route": "/:address/nft/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
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
		        { "_description": "Get transfers of NFTs given the wallet and other parameters.", "chain": "eth", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/:address/nft": 		{
		    "requestMethod": "GET",
		    "description": "Get NFTs owned by a given address.",
		    "route": "/:address/nft",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(decimal,hex)","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()",]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()",]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(false,true)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get NFTs owned by a given address.", "chain": "eth", "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/:token_id/metadata/resync": 		{
		    "requestMethod": "GET",
		    "description": "Resync the metadata for an NFT",
		    "route": "/nft/:address/:token_id/metadata/resync",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"flag","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(uri,metadata)","options":["optional()"]}},
				{"position":{"key":"mode","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(sync,async)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Resync the metadata for an NFT", "chain": "eth", "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/nft/:address/traits/resync": 		{
		    "requestMethod": "GET",
		    "description": "Resync the NFT Trait for a given contract",
		    "route": "/nft/:address/traits/resync",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Resync the NFT Trait for a given contract", "chain": "eth", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		}
	},
    'handlers': {
        'modifyResult': async( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}
   

export { schema }