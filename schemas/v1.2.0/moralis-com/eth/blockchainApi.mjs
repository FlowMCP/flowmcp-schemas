import { EVM_CHAINS } from '../../_shared/evmChains.mjs'

const moralisChains = EVM_CHAINS
    .filter( ( c ) => c.moralisChainSlug !== undefined )

const aliasToSlug = moralisChains
    .reduce( ( acc, c ) => {
        acc[ c.alias ] = c.moralisChainSlug
        return acc
    }, {} )

const fullChainAliases = [
    'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'HOLESKY_TESTNET',
    'POLYGON_MAINNET', 'POLYGON_AMOY_TESTNET', 'BINANCE_MAINNET',
    'BINANCE_TESTNET', 'AVALANCHE_MAINNET', 'FANTOM_MAINNET',
    'PALM_MAINNET', 'CRONOS_MAINNET', 'ARBITRUM_ONE_MAINNET',
    'GNOSIS_MAINNET', 'GNOSIS_TESTNET', 'CHILIZ_MAINNET',
    'CHILIZ_TESTNET', 'BASE_MAINNET', 'BASE_SEPOLIA_TESTNET',
    'OPTIMISM_MAINNET', 'LINEA_MAINNET', 'LINEA_SEPOLIA_TESTNET',
    'MOONBEAM_MAINNET', 'MOONRIVER_MAINNET', 'MOONBASE_ALPHA_TESTNET',
    'FLOW_MAINNET', 'FLOW_TESTNET', 'RONIN_MAINNET', 'RONIN_TESTNET',
    'LISK_MAINNET', 'LISK_SEPOLIA_TESTNET', 'PULSECHAIN_MAINNET'
]
const fullChainEnum = 'enum(' + fullChainAliases.join( ',' ) + ')'

const schema = {
	'namespace': 'moralis',
    'name': 'Moralis blockchainApi API',
    'description': 'Low-level blockchain data via Moralis — block lookups (by number, hash, or date), transaction details, native transaction history for addresses, and latest block numbers across 30+ EVM chains.',
    'docs': ["https://docs.moralis.com"],
    tags: ["evm", "blockchain", "blocks", "cacheTtlFrequent"],
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)", "options":["optional()"]}},
				{"position":{"key":"block_number_or_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a block given the block hash.",
		            "chain": "ETHEREUM_MAINNET",
		            "block_number_or_hash": "18541416"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "pre",
		            "handlerName": "mapChainToSlug"
		        },
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
				{"position":{"key":"date","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the closest block given the date.",
		            "chain": "ETHEREUM_MAINNET",
		            "date": "1745607154"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "pre",
		            "handlerName": "mapChainToSlug"
		        },
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"transaction_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a transaction by the given transaction hash.",
		            "chain": "ETHEREUM_MAINNET",
		            "transaction_hash": "0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "pre",
		            "handlerName": "mapChainToSlug"
		        },
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
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
		            "chain": "ETHEREUM_MAINNET",
		            "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "pre",
		            "handlerName": "mapChainToSlug"
		        },
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":fullChainEnum,"options":[]}}
			],
		    "tests": [
		        { "_description": "Returns the latest block number for the given chain.", "chain": "ETHEREUM_MAINNET" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlugInsert" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/transaction/:transaction_hash": 		{
		    "requestMethod": "GET",
		    "description": "Get the contents of a transaction by the given transaction hash.",
		    "route": "/transaction/:transaction_hash",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(internal_transactions)","options":["optional()"]}},
				{"position":{"key":"transaction_hash","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        {
		            "_description": "Get the contents of a transaction by the given transaction hash.",
		            "chain": "ETHEREUM_MAINNET",
		            "transaction_hash": "0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e"
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "pre",
		            "handlerName": "mapChainToSlug"
		        },
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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
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
		        { "_description": "Get native transactions ordered by block number in descending order.", "chain": "ETHEREUM_MAINNET", "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326" }
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
        'mapChainToSlugInsert': async( { struct, payload, userParams } ) => {
            const chainAlias = userParams.chain
            if( !chainAlias ) { return { struct, payload } }
            const slug = aliasToSlug[ chainAlias ]
            if( !slug ) {
                struct.status = false
                struct.messages.push( `Unsupported chain: ${chainAlias}` )
                return { struct, payload }
            }
            payload['url'] = payload['url'].replace( `/${chainAlias}`, `/${slug}` )
            return { struct, payload }
        },
        'modifyResult': async( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}


export { schema }
