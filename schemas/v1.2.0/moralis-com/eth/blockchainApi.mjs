const schema = {
	'namespace': 'moralis',
    'name': 'Moralis blockchainApi API',
    'description': 'Low-level blockchain data via Moralis — block lookups (by number, hash, or date), transaction details, native transaction history for addresses, and latest block numbers across 30+ EVM chains.',
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
		"/block/:block_number_or_hash": 		{
		    "requestMethod": "GET",
		    "description": "Get the contents of a block given the block hash via Moralis — query by block number or hash.",
		    "route": "/block/:block_number_or_hash",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)", "options":["optional()"]}},
				{"position":{"key":"block_number_or_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a block given the block hash.",
		            "chain": "eth",
		            "block_number_or_hash": "18541416"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/dateToBlock": 		{
		    "requestMethod": "GET",
		    "description": "Get the closest block given the date via Moralis. Returns structured JSON response data.",
		    "route": "/dateToBlock",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the closest block given the date.",
		            "chain": "eth",
		            "date": "1745607154"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/transaction/:transaction_hash/verbose": 		{
		    "requestMethod": "GET",
		    "description": "Get the contents of a transaction by the given transaction hash.",
		    "route": "/transaction/:transaction_hash/verbose",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"transaction_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a transaction by the given transaction hash.",
		            "chain": "eth",
		            "transaction_hash": "0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/:address/verbose": 		{
		    "requestMethod": "GET",
		    "description": "Get native transactions and logs ordered by block number in descending order. Required: chain, address. Optional filters: from_block, to_block, from_date, to_date, cursor, include, limit, order.",
		    "route": "/:address/verbose",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get native transactions and logs ordered by block number in descending order.",
		            "chain": "eth",
		            "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/latestBlockNumber/:chain": 		{
		    "requestMethod": "GET",
		    "description": "Returns the latest block number for the given chain via Moralis — query by chain.",
		    "route": "/latestBlockNumber/:chain",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}}
			],
		    "tests": [
		        { "_description": "Returns the latest block number for the given chain.", "chain": "eth" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/transaction/:transaction_hash": 		{
		    "requestMethod": "GET",
		    "description": "Get the contents of a transaction by the given transaction hash.",
		    "route": "/transaction/:transaction_hash",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"transaction_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a transaction by the given transaction hash.",
		            "chain": "eth",
		            "transaction_hash": "0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/:address": 		{
		    "requestMethod": "GET",
		    "description": "Get native transactions ordered by block number in descending order. Required: chain, address. Optional filters: from_block, to_block, from_date, to_date, cursor, include, limit, order.",
		    "route": "/:address",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)","options":[]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(ASC,DESC)","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get native transactions ordered by block number in descending order.", "chain": "eth", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
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