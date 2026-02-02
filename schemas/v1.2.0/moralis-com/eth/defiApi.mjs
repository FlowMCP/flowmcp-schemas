const schema = {
	'namespace': 'moralis',
    'name': 'Moralis defiApi API',
    'description': 'DeFi portfolio analysis via Moralis — wallet positions across protocols (Uniswap, Aave, Lido, MakerDAO, EigenLayer, etc.) with per-protocol detail and summary views across EVM chains.',
    'docs': ["https://docs.moralis.com"],
    tags: ["evm", "defi", "positions", "cacheTtlFrequent"],
    'flowMCP': '1.2.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {	
		"/wallets/:address/defi/:protocol/positions": 		{
		    "requestMethod": "GET",
		    "description": "Get the detailed defi positions by protocol for a wallet address. Required: chain, address, protocol.",
		    "route": "/wallets/:address/defi/:protocol/positions",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z": {"primitive":"enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z": {"primitive":"string()","options":[]}},
				{"position":{"key":"protocol","value":"{{USER_PARAM}}","location":"insert"},"z": {"primitive":"enum(uniswap-v2,uniswap-v3,pancakeswap-v2,pancakeswap-v3,quickswap-v2,sushiswap-v2,aave-v2,aave-v3,fraxswap-v1,fraxswap-v2,lido,makerdao,eigenlayer)","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the detailed defi positions by protocol for a wallet address.", "chain": "eth", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd", "protocol": "aave-v3" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/wallets/:address/defi/positions": 		{
		    "requestMethod": "GET",
		    "description": "Get the positions summary of a wallet address via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/wallets/:address/defi/positions",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the positions summary of a wallet address.", "chain": "eth", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd" }
		    ],
		    "modifiers": [
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},
	
		"/wallets/:address/defi/summary": 		{
		    "requestMethod": "GET",
		    "description": "Get the defi summary of a wallet address via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/wallets/:address/defi/summary",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(eth,0x1,sepolia,0xaa36a7,polygon,0x89,bsc,0x38,bsc testnet,0x61,avalanche,0xa86a,fantom,0xfa,palm,0x2a15c308d,cronos,0x19,arbitrum,0xa4b1,chiliz,0x15b38,chiliz testnet,0x15b32,gnosis,0x64,gnosis testnet,0x27d8,base,0x2105,base sepolia,0x14a34,optimism,0xa,holesky,0x4268,polygon amoy,0x13882,linea,0xe708,moonbeam,0x504,moonriver,0x505,moonbase,0x507,linea sepolia,0xe705)","options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the defi summary of a wallet address.", "chain": "eth", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd" }
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