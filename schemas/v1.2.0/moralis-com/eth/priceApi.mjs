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

const nftPriceAliases = [
    'ETHEREUM_MAINNET', 'POLYGON_MAINNET', 'BINANCE_MAINNET',
    'AVALANCHE_MAINNET', 'ARBITRUM_ONE_MAINNET', 'BASE_MAINNET',
    'OPTIMISM_MAINNET'
]
const nftPriceChainEnum = 'enum(' + nftPriceAliases.join( ',' ) + ')'

const floorPriceAliases = [
    'ETHEREUM_MAINNET', 'BASE_MAINNET'
]
const floorPriceChainEnum = 'enum(' + floorPriceAliases.join( ',' ) + ')'

const erc20PriceAliases = [
    'ETHEREUM_MAINNET', 'POLYGON_MAINNET', 'BINANCE_MAINNET',
    'AVALANCHE_MAINNET', 'FANTOM_MAINNET', 'PALM_MAINNET',
    'CRONOS_MAINNET', 'ARBITRUM_ONE_MAINNET', 'GNOSIS_MAINNET',
    'CHILIZ_MAINNET', 'BASE_MAINNET', 'OPTIMISM_MAINNET',
    'LINEA_MAINNET', 'MOONBEAM_MAINNET', 'MOONRIVER_MAINNET',
    'MOONBASE_ALPHA_TESTNET', 'FLOW_MAINNET', 'RONIN_MAINNET',
    'LISK_MAINNET', 'PULSECHAIN_MAINNET'
]
const erc20PriceChainEnum = 'enum(' + erc20PriceAliases.join( ',' ) + ')'

const schema = {
	'namespace': 'moralis',
    'name': 'Moralis priceApi API',
    'description': 'Token and NFT price data via Moralis — ERC20 token prices, NFT floor prices (current and historical), NFT sale history, and DEX pair OHLCV candlestick data across EVM chains.',
    'docs': ["https://docs.moralis.com"],
    tags: ["evm", "prices", "tokens", "cacheTtlRealtime"],
    'flowMCP': '1.2.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {
		"/nft/:address/price": 		{
		    "requestMethod": "GET",
		    "description": "Get the sold price for an NFT contract for the last x days (only trades paid in ETH).",
		    "route": "/nft/:address/price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftPriceChainEnum,"options":[]}},
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the sold price for an NFT contract for the last x days.", "chain": "ETHEREUM_MAINNET", "address": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/floor-price": 		{
		    "requestMethod": "GET",
		    "description": "Get floor price for a given contract via Moralis — query by address. Returns structured JSON response data.",
		    "route": "/nft/:address/floor-price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":floorPriceChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get floor price for a given contract.", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/floor-price": 		{
		    "requestMethod": "GET",
		    "description": "Get floor price for a given token via Moralis — query by address and token id. Returns structured JSON response data.",
		    "route": "/nft/:address/:token_id/floor-price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":floorPriceChainEnum,"options":[]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get floor price.", "chain": "ETHEREUM_MAINNET", "address": "0x524cab2ec69124574082676e6f654a18df49a048", "token_id": "2441" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/floor-price/historical": 		{
		    "requestMethod": "GET",
		    "description": "Get historical floor price for a given contract via Moralis — query by address. Supports cursor filters.",
		    "route": "/nft/:address/floor-price/historical",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":floorPriceChainEnum,"options":[]}},
				{"position":{"key":"interval","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(1d,7d,30d,60d,90d,1y,all)","options":[]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get historical floor price.", "chain": "ETHEREUM_MAINNET", "interval": "1d", "address": "0x524cab2ec69124574082676e6f654a18df49a048" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/nft/:address/:token_id/price": 		{
		    "requestMethod": "GET",
		    "description": "Get the sold price for an NFT token for the last x days (only trades paid in ETH).",
		    "route": "/nft/:address/:token_id/price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":nftPriceChainEnum,"options":[]}},
				{"position":{"key":"days","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"token_id","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the sold price for an NFT token for the last x days.", "chain": "ETHEREUM_MAINNET", "address": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", "token_id": "1" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/pairs/:address/ohlcv": 		{
		    "requestMethod": "GET",
		    "description": "Get the OHLCV candle stick by using pair address via Moralis — query by address. Supports limit, cursor filters.",
		    "route": "/pairs/:address/ohlcv",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":fullChainEnum,"options":[]}},
				{"position":{"key":"timeframe","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(1s,10s,30s,1min,5min,10min,30min,1h,4h,12h,1d,1w,1M)","options":[]}},
				{"position":{"key":"currency","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(usd,native)","options":[]}},
				{"position":{"key":"fromDate","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"toDate","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"cursor","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"string()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the OHLCV candle stick by using pair address", "chain": "ETHEREUM_MAINNET", "timeframe": "1h", "currency": "usd", "fromDate": "2025-01-01T10:00:00.000", "toDate": "2025-01-02T10:00:00.000", "address": "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f" }
		    ],
		    "modifiers": [
		        { "phase": "pre", "handlerName": "mapChainToSlug" },
		        { "phase": "post", "handlerName": "modifyResult" }
		    ]
		},

		"/erc20/:address/price": 		{
		    "requestMethod": "GET",
		    "description": "Get the token price denominated in the blockchain's native token and USD. View supported exchanges here",
		    "route": "/erc20/:address/price",
		    "parameters": [
				{"position":{"key":"chain","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":erc20PriceChainEnum,"options":[]}},
				{"position":{"key":"include","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(percent_change)","options":["optional()"]}},
				{"position":{"key":"exchange","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"enum(uniswapv2,uniswapv3,sushiswapv2,pancakeswapv1,pancakeswapv2,pancakeswapv3,quickswap,quickswapv2,traderjoe,pangolin,spookyswap,vvs,mm finance,crodex,camelotv2)","options":["optional()"]}},
				{"position":{"key":"to_block","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"max_token_inactivity","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"min_pair_side_liquidity_usd","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}},
				{"position":{"key":"address","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
		    "tests": [
		        { "_description": "Get the token price denominated in the blockchain's native token and USD.", "chain": "ETHEREUM_MAINNET", "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0" }
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
