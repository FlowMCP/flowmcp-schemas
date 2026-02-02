import axios from "axios"
import moment from "moment"


const timeframes = {
    "1s": 1,
    "10s": 10,
    "30s": 30,
    "1min": 60,
    "5min": 300,
    "10min": 600,
    "30min": 1800,
    "1h": 3600,
    "4h": 14400,
    "12h": 43200,
    "1d": 86400,
    "1w": 604800,
    "1M": 2592000
}

const fromDateUnits = {
    "minutes": 60,
    "hours": 3600,
    "days": 86400,
    "weeks": 604800,
    "months": 2592000,
    "years": 31536000
}

import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const moralisChainAliases = [
    'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'HOLESKY_TESTNET',
    'POLYGON_MAINNET', 'POLYGON_AMOY_TESTNET', 'BINANCE_MAINNET',
    'BINANCE_TESTNET', 'AVALANCHE_MAINNET', 'FANTOM_MAINNET',
    'CRONOS_MAINNET', 'ARBITRUM_ONE_MAINNET', 'GNOSIS_MAINNET',
    'GNOSIS_TESTNET', 'CHILIZ_MAINNET', 'CHILIZ_TESTNET',
    'BASE_MAINNET', 'BASE_SEPOLIA_TESTNET', 'OPTIMISM_MAINNET',
    'LINEA_MAINNET', 'LINEA_SEPOLIA_TESTNET', 'MOONBEAM_MAINNET',
    'MOONRIVER_MAINNET', 'MOONBASE_ALPHA_TESTNET', 'FLOW_MAINNET',
    'FLOW_TESTNET', 'RONIN_MAINNET', 'RONIN_TESTNET',
    'LISK_MAINNET', 'LISK_SEPOLIA_TESTNET', 'PULSECHAIN_MAINNET'
]

const chainSelections = EVM_CHAINS
    .filter( ( c ) => moralisChainAliases.includes( c.alias ) && c.moralisChainSlug !== undefined )
    .reduce( ( acc, chain ) => {
        acc[ chain.alias ] = chain.moralisChainSlug

        return acc
    }, {} )


const schema = {
    namespace: "ohlcv",
    name: "Moralis Recursive OHLCV EVM and Ethereum",
    description: "Recursively fetch OHLCV candlestick data from Moralis for any EVM token pair — auto-paginates through all available timeframes for complete price history.",
    docs: ["https://docs.moralis.io/web3-data-api/evm/reference/get-ohlcv-by-pair-address"],
    tags: ["evm", "ohlcv", "charts", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "https://deep-index.moralis.io",
    requiredServerParams: ["MORALIS_API_KEY"],
    headers: { "X-API-Key": "{{MORALIS_API_KEY}}" },
    routes: {
        getRecursiveOhlcvEVM: {
            requestMethod: "GET",
            description: "Fetch OHLCV data recursively until max length or iteration limit is reached. Required: pairAddress, chain, timeframe, currency, fromDateAmount, fromDateUnit, maxResultLength.",
            route: "/api/v2.2/pairs/{{pairAddress}}/ohlcv",
            parameters: [
                { position: { key: "pairAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: `enum(${Object.keys(chainSelections).join(",")})`, options: [] } },
                { position: { key: "timeframe", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(" + Object.keys(timeframes).join(",") + ")", options: [] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(usd,native)", options: ["default(usd)"] } },
                { position: { key: "fromDateAmount", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: [] } },
                { position: { key: "fromDateUnit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(" + Object.keys(fromDateUnits).join(",") + ")", options: [] } },
                { position: { key: "maxResultLength", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional(), default(1000)"] } }
            ],
            tests: [
                { _description: "Fetch 7-day OHLCV data for Uniswap pair on Ethereum", pairAddress: "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f", chain: "ETHEREUM_MAINNET", timeframe: "1min", currency: "usd", fromDateAmount: 7, fromDateUnit: "days", maxResultLength: 1000 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRecursiveOhlcvEvm" }
            ]
        }
    },
    handlers: {
        fetchRecursiveOhlcvEvm: async ( { struct, payload, userParams } ) => {
            const { pairAddress, chain: _chainValue, timeframe, currency, fromDateAmount, fromDateUnit, maxResultLength = 1000 } = userParams
            const chain = chainSelections[ _chainValue ]
            const fromDate = moment().subtract(fromDateAmount, fromDateUnit).toISOString();
            const toDate = moment().toISOString();
            const url = `https://deep-index.moralis.io/api/v2.2/pairs/${pairAddress}/ohlcv`;

            let accumulated = [], cursor = null, iteration = 0, maxIterations = 5;
            while (iteration < maxIterations && accumulated.length < maxResultLength) {
                try {
                    const { headers } = payload
                    const params = { chain, timeframe, currency, fromDate, toDate, cursor, limit: 1000 }
                    const res = await axios.get(url, { headers, params } )
                    const { result, cursor: next } = res.data
                    if( !Array.isArray( result ) ) { break }
                    accumulated.push( ...result )
                    if( !next ) { break }
                    cursor = next
                    iteration++
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( "API error: " + (e.response?.status || "unknown" ) )
                    return { struct, payload }
                }
            }

            const data = accumulated
                .map( ( a ) => ( { ...a, unixTimestamp: moment( a.timestamp ).unix() } ) )
                .sort( ( a, b ) => a.unixTimestamp - b.unixTimestamp )
                .reduce( ( acc, a ) => {
                    acc.openings.push( a.open )
                    acc.closings.push( a.close )
                    acc.highs.push( a.high )
                    acc.lows.push( a.low )
                    acc.volumes.push( a.volume )
                    acc.timestamps.push( a.timestamp )
                    acc.prices.push( a.close )
                    acc.values.push( a.close )
                    return acc
                }, {
                    openings: [],
                    closings: [],
                    highs: [],
                    lows: [],
                    volumes: [],
                    prices: [],
                    values: [],
                    timestamps: []
                } )

            struct['data'] = data
            struct['status'] = true
            return { struct, payload }
        }
    }
}


export { schema }
