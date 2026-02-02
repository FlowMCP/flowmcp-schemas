import moment from "moment"

import { TRADING_TIMEFRAMES } from '../_shared/tradingTimeframes.mjs'


const solanaTrackerTimeframes = TRADING_TIMEFRAMES
    .filter( ( t ) => t.solanaTrackerSlug !== undefined )
    .reduce( ( acc, t ) => {
        acc[ t.alias ] = t.seconds

        return acc
    }, {} )

const fromDateUnits = {
    "minutes": 60,
    "hours": 3600,
    "days": 86400,
    "weeks": 604800,
    "months": 2592000,
    "years": 31536000
}


const schema = {
    namespace: "ohlcv",
    name: "Solana Tracker OHLCV for Solana",
    description: "Retrieve OHLCV candlestick chart data from Solana Tracker for any Solana token and pool pair — configurable timeframes for price history visualization.",
    docs: ["https://data.solanatracker.io"],
    tags: ["solana", "ohlcv", "charts", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "https://data.solanatracker.io",
    requiredServerParams: ["SOLANA_TRACKER_API_KEY"],
    headers: {
        "x-api-key": "{{SOLANA_TRACKER_API_KEY}}",
        "Content-Type": "application/json"
    },
    routes: {
        getOhlcvSolana: {
            requestMethod: "GET",
            description: "Fetch OHLCV chart data for a specific token and pool on Solana. Required: token, pool, type, fromDateAmount, fromDateUnit, marketCap, removeOutliers.",
            route: "/chart/:token/:pool",
            parameters: [
                { position: { key: "token", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "pool", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: `enum(${Object.keys(solanaTrackerTimeframes).join(",")})`, options: [] } },
                { position: { key: "fromDateAmount", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: [] } },
                { position: { key: "fromDateUnit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: `enum(${Object.keys(fromDateUnits).join(",")})`, options: [] } },
                { position: { key: "marketCap", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)" ] } },
                { position: { key: "removeOutliers", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)" ] } }
            ],
            tests: [
                { _description: "7 days chart data for token/pool", token: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump", pool: "9Tb2ohu5P16BpBarqd3N27WnkF51Ukfs8Z1GzzLDxVZW", type: "1d", fromDateAmount: 7, fromDateUnit: "days", marketCap: "false", removeOutliers: "false" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "injectTimestamps" },
                { phase: "post", handlerName: "transformChartData" }
            ]
        }
    },
    handlers: {
        injectTimestamps: async( { struct, payload, userParams } ) => {
            const { fromDateAmount, fromDateUnit } = userParams
            const from = moment().subtract(fromDateAmount, fromDateUnit ).unix()
            const to = moment().unix()

            const url = new URL( payload.url )
            const params = Object
                .fromEntries( url.searchParams.entries() )

            delete params['fromDateAmount']
            delete params['fromDateUnit']
            params[ 'type' ] = solanaTrackerTimeframes[ params[ 'type' ] ]
            params[ 'time_from' ] = from
            params[ 'time_to' ] = to

            const newSearchParams = new URLSearchParams( params )
            payload.url = ''
            payload.url += url.origin + url.pathname
            payload.url += '?' + newSearchParams.toString()
            return { struct, payload }
        },
        transformChartData: async ({ struct, payload }) => {
            try {
                const { oclhv } = struct.data
                const result = oclhv
                    .map( ( a ) => ({ ...a, unixTimestamp: a.time, timestamp: moment( a.timestamp ).toISOString() } ) )
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
                    });
                struct.data = result
            } catch( e ) {
                struct.status = false
                struct.messages.push( "Error transforming chart data: " + (e.response?.status || "unknown") )
            }
            return { struct, payload }
        }
    }
}


export { schema }
