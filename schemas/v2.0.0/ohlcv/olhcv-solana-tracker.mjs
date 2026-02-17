// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// REPLACE: moment -> native Date/Intl (not in requiredLibraries)
// Import: import moment from "moment"
// Import: import { TRADING_TIMEFRAMES } from '../_shared/tradingTimeframes.mjs'
// Module-level code: 14 lines

export const main = {
    namespace: 'ohlcv',
    name: 'Solana Tracker OHLCV for Solana',
    description: 'Retrieve OHLCV candlestick chart data from Solana Tracker for any Solana token and pool pair — configurable timeframes for price history visualization.',
    version: '2.0.0',
    docs: ['https://data.solanatracker.io'],
    tags: ['solana', 'ohlcv', 'charts', 'cacheTtlRealtime'],
    sharedLists: [
        { ref: 'tradingTimeframes', version: '2.0.0' }
    ],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        getOhlcvSolana: {
            method: 'GET',
            path: '/chart/:token/:pool',
            description: 'Fetch OHLCV chart data for a specific token and pool on Solana. Required: token, pool, type, fromDateAmount, fromDateUnit, marketCap, removeOutliers.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'pool', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1s,5s,15s,1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M)', options: [] } },
                { position: { key: 'fromDateAmount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'fromDateUnit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(minutes,hours,days,weeks,months,years)', options: [] } },
                { position: { key: 'marketCap', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)'] } },
                { position: { key: 'removeOutliers', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const TRADING_TIMEFRAMES = sharedLists['tradingTimeframes']

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

    return {
        getOhlcvSolana: {
            preRequest: async ( { struct, payload } ) => {
                const { fromDateAmount, fromDateUnit } = payload
                const from = moment().subtract(fromDateAmount, fromDateUnit ).unix()
                const to = moment().unix()

                const url = new URL( struct.url )
                const params = Object
                .fromEntries( url.searchParams.entries() )

                delete params['fromDateAmount']
                delete params['fromDateUnit']
                params[ 'type' ] = solanaTrackerTimeframes[ params[ 'type' ] ]
                params[ 'time_from' ] = from
                params[ 'time_to' ] = to

                const newSearchParams = new URLSearchParams( params )
                struct.url = ''
                struct.url += url.origin + url.pathname
                struct.url += '?' + newSearchParams.toString()
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                try {
                const { oclhv } = response
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
                response = result
                } catch( e ) {
                struct.status = false
                struct.messages.push( "Error transforming chart data: " + (e.response?.status || "unknown") )
                }
                return { response }
            }
        }
    }
}
