import { EVM_CHAINS } from '../../_shared/evmChains.mjs'

const moralisChains = EVM_CHAINS
    .filter( ( c ) => c.moralisChainSlug !== undefined )

const aliasToSlug = moralisChains
    .reduce( ( acc, c ) => {
        acc[ c.alias ] = c.moralisChainSlug
        return acc
    }, {} )

const defiAliases = [
    'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'POLYGON_MAINNET',
    'BINANCE_MAINNET', 'BINANCE_TESTNET', 'AVALANCHE_MAINNET',
    'FANTOM_MAINNET', 'PALM_MAINNET', 'CRONOS_MAINNET',
    'ARBITRUM_ONE_MAINNET', 'CHILIZ_MAINNET', 'CHILIZ_TESTNET',
    'GNOSIS_MAINNET', 'GNOSIS_TESTNET', 'BASE_MAINNET',
    'BASE_SEPOLIA_TESTNET', 'OPTIMISM_MAINNET', 'HOLESKY_TESTNET',
    'POLYGON_AMOY_TESTNET', 'LINEA_MAINNET', 'MOONBEAM_MAINNET',
    'MOONRIVER_MAINNET', 'MOONBASE_ALPHA_TESTNET', 'LINEA_SEPOLIA_TESTNET'
]
const defiChainEnum = 'enum(' + defiAliases.join( ',' ) + ')'

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
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":defiChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"protocol","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"enum(uniswap-v2,uniswap-v3,pancakeswap-v2,pancakeswap-v3,quickswap-v2,sushiswap-v2,aave-v2,aave-v3,fraxswap-v1,fraxswap-v2,lido,makerdao,eigenlayer)","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the detailed defi positions by protocol for a wallet address.", "chain": "ETHEREUM_MAINNET", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd", "protocol": "aave-v3" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/wallets/:address/defi/positions": 		{
		    "requestMethod": "GET",
		    "description": "Get the positions summary of a wallet address via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/wallets/:address/defi/positions",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":defiChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the positions summary of a wallet address.", "chain": "ETHEREUM_MAINNET", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/wallets/:address/defi/summary": 		{
		    "requestMethod": "GET",
		    "description": "Get the defi summary of a wallet address via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/wallets/:address/defi/summary",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":defiChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the defi summary of a wallet address.", "chain": "ETHEREUM_MAINNET", "address": "0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd" }
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
