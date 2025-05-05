const schema = {
    'name': 'Moralis walletApi API',
    'description': 'Moralis walletApi API',
    'version': '1.0.0',
    'flowMCP': '1.0.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {	
		"/:address/verbose": 		{
		    "requestMethod": "GET",
		    "description": "Get native transactions and logs ordered by block number in descending order.",
		    "route": "/:address/verbose",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(internal_transactions)"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
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
	
		"/:address": 		{
		    "requestMethod": "GET",
		    "description": "Get native transactions ordered by block number in descending order.",
		    "route": "/:address",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(internal_transactions)"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get native transactions ordered by block number in descending order.",
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
	
		"/wallets/:address/defi/:protocol/positions": 		{
		    "requestMethod": "GET",
		    "description": "Get the detailed defi positions by protocol for a wallet address.",
		    "route": "/wallets/:address/defi/:protocol/positions",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"protocol","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":["enum(uniswap-v2,uniswap-v3,pancakeswap-v2,pancakeswap-v3,quickswap-v2,sushiswap-v2,aave-v2,aave-v3,fraxswap-v1,fraxswap-v2,lido,makerdao,eigenlayer)"]}}
			],
		    "tests": [
		        {
		            "_description": "Get the detailed defi positions by protocol for a wallet address.",
		            "chain": "eth",
		            "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd",
		            "protocol": "aave-v3"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/defi/positions": 		{
		    "requestMethod": "GET",
		    "description": "Get the positions summary of a wallet address.",
		    "route": "/wallets/:address/defi/positions",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the positions summary of a wallet address.",
		            "chain": "eth",
		            "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/defi/summary": 		{
		    "requestMethod": "GET",
		    "description": "Get the defi summary of a wallet address.",
		    "route": "/wallets/:address/defi/summary",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the defi summary of a wallet address.",
		            "chain": "eth",
		            "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/nfts/trades": 		{
		    "requestMethod": "GET",
		    "description": "Get trades of NFTs for a given wallet.",
		    "route": "/wallets/:address/nfts/trades",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,arbitrum,0xa4b1,base,0x2105,optimism,0xa)"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"nft_metadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get trades of NFTs for a given wallet.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/:address/nft/collections": 		{
		    "requestMethod": "GET",
		    "description": "Get NFT collections owned by a given wallet address.",
		    "route": "/:address/nft/collections",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"token_counts","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get NFT ciollections owned by a given wallet address.",
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
	
		"/:address/nft/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get transfers of NFTs given the wallet and other parameters.",
		    "route": "/:address/nft/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)"]}},
				{"position":{"key":"contract_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get transfers of NFTs given the wallet and other parameters.",
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
	
		"/:address/nft": 		{
		    "requestMethod": "GET",
		    "description": "Get NFTs owned by a given address.",
		    "route": "/:address/nft",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a)"]}},
				{"position":{"key":"format","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(decimal,hex)"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"normalizeMetadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"media_items","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"include_prices","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get NFTs owned by a given address.",
		            "chain": "eth",
		            "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/swaps": 		{
		    "requestMethod": "GET",
		    "description": "Get all swap related transactions (buy, sell)",
		    "route": "/wallets/:address/swaps",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"fromBlock","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"toBlock","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"fromDate","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"toDate","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
				{"position":{"key":"transactionTypes","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get all swap related transactions (buy, sell)",
		            "chain": "eth",
		            "address": "0x6982508145454ce325ddbe47a25d4ec3d2311933"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/approvals": 		{
		    "requestMethod": "GET",
		    "description": "Retrieve active ERC20 token approvals for the specified wallet address",
		    "route": "/wallets/:address/approvals",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get active ERC20 token approvals for the specified wallet address",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/tokens": 		{
		    "requestMethod": "GET",
		    "description": "Get token balances for a specific wallet address and their token prices in USD.",
		    "route": "/wallets/:address/tokens",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"exclude_unverified_contracts","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"exclude_native","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"max_token_inactivity","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"min_pair_side_liquidity_usd","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get token balances for a specific wallet address and their token prices in USD.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/:address/erc20": 		{
		    "requestMethod": "GET",
		    "description": "Get token balances for a specific wallet address.",
		    "route": "/:address/erc20",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get token balances for a specific wallet address.",
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
	
		"/:address/erc20/transfers": 		{
		    "requestMethod": "GET",
		    "description": "Get ERC20 token transactions ordered by block number in descending order.",
		    "route": "/:address/erc20/transfers",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"contract_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get ERC20 token transactions ordered by block number in descending order.",
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
	
		"/wallets/:address/chains": 		{
		    "requestMethod": "GET",
		    "description": "Get the active chains for a wallet address.",
		    "route": "/wallets/:address/chains",
		    "parameters": [
				{"position":{"key":"chains","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the active chains for a wallet address.",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/:address/balance": 		{
		    "requestMethod": "GET",
		    "description": "Get the native balance for a specific wallet address.",
		    "route": "/:address/balance",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the native balance for a specific wallet address.",
		            "chain": "eth",
		            "address": "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/history": 		{
		    "requestMethod": "GET",
		    "description": "Retrieve the full transaction history of a specified wallet address, including sends, receives, token and NFT transfers, and contract interactions.",
		    "route": "/wallets/:address/history",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,polygon,0x89,bsc,0x38,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,gnosis,0x64,base,0x2105,optimism,0xa,linea,0xe708,moonbeam,0x504,moonriver,0x505,flow,0x2eb,ronin,0x7e4,lisk,0x46f,pulse,0x171)"]}},
				{"position":{"key":"from_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"from_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"to_date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"include_internal_transactions","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"nft_metadata","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"order","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()","enum(ASC,DESC)"]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Retrieve the full transaction history of a specified wallet address.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/net-worth": 		{
		    "requestMethod": "GET",
		    "description": "Get the net worth of a wallet in USD. We recommend to filter out spam tokens and unverified contracts to get a more accurate result.",
		    "route": "/wallets/:address/net-worth",
		    "parameters": [
				{"position":{"key":"chains","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"exclude_spam","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"exclude_unverified_contracts","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"boolean()","options":["optional()","enum(false,true)"]}},
				{"position":{"key":"max_token_inactivity","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"min_pair_side_liquidity_usd","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the net worth of a wallet in USD.",
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
	
		"/wallets/:address/profitability/summary": 		{
		    "requestMethod": "GET",
		    "description": "Retrieves a summary of wallet profitability based on specified parameters including optional token addresses.",
		    "route": "/wallets/:address/profitability/summary",
		    "parameters": [
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,mainnet,0x1,matic,0x89,polygon,bsc,binance,0x38,fantom,ftm,0xfa,arbitrum,0xa4b1,optimism,0xa,pulsechain,0x171,base,0x2105,linea,0xe708)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get a summary of wallet profitability based on specified parameters including optional token addresses.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/profitability": 		{
		    "requestMethod": "GET",
		    "description": "Retrieves profitability information for a specific wallet address. Can be filtered by one or more tokens.",
		    "route": "/wallets/:address/profitability",
		    "parameters": [
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,mainnet,0x1,matic,0x89,polygon,bsc,binance,0x38,fantom,ftm,0xfa,arbitrum,0xa4b1,optimism,0xa,pulsechain,0x171,base,0x2105,linea,0xe708)"]}},
				{"position":{"key":"token_addresses","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"array()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get profitability information for a specific wallet address.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/wallets/:address/stats": 		{
		    "requestMethod": "GET",
		    "description": "Get the stats for a wallet address.",
		    "route": "/wallets/:address/stats",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["enum(eth,0x1,sepolia,0xaa36a7,holesky,0x4268,polygon,0x89,polygon amoy,0x13882,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,gnosis,0x64,gnosis testnet,0x27d8,chiliz,0x15b38,chiliz testnet,0x15b32,base,0x2105,base sepolia,0x14a34,optimism,0xa,linea,0xe708,linea sepolia,0xe705,moonbeam,0x504,moonriver,0x505,moonbase,0x507,flow,0x2eb,flow-testnet,0x221,ronin,0x7e4,ronin-testnet,0x7e5,lisk,0x46f,lisk-sepolia,0x106a,pulse,0x171)"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the stats for a wallet address.",
		            "chain": "eth",
		            "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/resolve/:address/domain": 		{
		    "requestMethod": "GET",
		    "description": "Resolve a specific address to its Unstoppable domain",
		    "route": "/resolve/:address/domain",
		    "parameters": [
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the Unstoppable domain for a specific address",
		            "address": "0x94ef5300cbc0aa600a821ccbc561b057e456ab23"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/resolve/:address/reverse": 		{
		    "requestMethod": "GET",
		    "description": "Reverse resolve a given ETH address to its ENS domain.",
		    "route": "/resolve/:address/reverse",
		    "parameters": [
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Reverse resolve a given ETH address to its ENS domain.",
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
	
		"/resolve/:domain": 		{
		    "requestMethod": "GET",
		    "description": "Resolve a specific Unstoppable domain to its address.",
		    "route": "/resolve/:domain",
		    "parameters": [
				{"position":{"key":"currency","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"domain","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Resolve a specific Unstoppable domain to its address.",
		            "domain": "brad.crypto"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/resolve/ens/:domain": 		{
		    "requestMethod": "GET",
		    "description": "Resolve a specific ENS domain to its address.",
		    "route": "/resolve/ens/:domain",
		    "parameters": [
				{"position":{"key":"domain","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Resolve a specific ENS domain to its address.",
		            "domain": "vitalik.eth"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
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