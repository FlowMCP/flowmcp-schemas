import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-momentum-advanced.mjs'

const require = createRequire( import.meta.url )

const ts = await import( 'trading-signals' )
const ind = await import( 'indicatorts' )
const talib = require( 'talib' )

const libs = {
    'trading-signals': ts,
    'indicatorts': ind,
    'talib': talib
}

const h = handlers( { sharedLists: {}, libraries: libs } )

const closings = '100,102,101,103,105,104,106,108,107,109,111,110,112,114,113,115,117,116,118,120'
const highs = '101,103,102,104,106,105,107,109,108,110,112,111,113,115,114,116,118,117,119,121'
const lows = '99,101,100,102,104,103,105,107,106,108,110,109,111,113,112,114,116,115,117,119'
const opens = '100,101,102,102,104,105,105,107,108,108,110,111,111,113,114,114,116,117,117,119'

let passed = 0
let failed = 0

async function runTest( route, library, params ) {
    try {
        const struct = { data: null, status: false, messages: [] }
        const payload = { userParams: { ...params, library } }
        const result = await h[ route ].executeRequest( { struct, payload } )
        const { data, status } = result.struct

        if( status !== true ) {
            console.log( 'FAIL', route, library, '-- status false' )
            failed++

            return
        }

        if( data.values === undefined || data.values.length === 0 ) {
            console.log( 'FAIL', route, library, '-- no values' )
            failed++

            return
        }

        if( data.latest === null || data.latest === undefined ) {
            console.log( 'FAIL', route, library, '-- no latest' )
            failed++

            return
        }

        const name = route.replace( 'compute', '' ).padEnd( 35 )
        const lib = library.padEnd( 17 )
        const latestStr = typeof data.latest === 'object'
            ? JSON.stringify( data.latest )
            : data.latest.toFixed( 4 ).padStart( 10 )
        const count = Array.isArray( data.values ) ? data.values.length : 0

        console.log( `PASS  ${name} ${lib} latest=${latestStr}  values=${count}` )
        passed++
    } catch( err ) {
        console.log( `FAIL  ${route}  ${library}  -- ${err.message}` )
        failed++
    }
}

await runTest( 'computeAbsolutePriceOscillator', 'indicatorts', { closings, fastPeriod: 5, slowPeriod: 10 } )
await runTest( 'computeAbsolutePriceOscillator', 'talib', { closings, fastPeriod: 5, slowPeriod: 10 } )

await runTest( 'computePercentagePriceOscillator', 'indicatorts', { closings, fastPeriod: 5, slowPeriod: 10, signalPeriod: 9 } )
await runTest( 'computePercentagePriceOscillator', 'talib', { closings, fastPeriod: 5, slowPeriod: 10, signalPeriod: 9 } )

await runTest( 'computeCommodityChannelIndex', 'trading-signals', { highs, lows, closings, period: 20 } )
await runTest( 'computeCommodityChannelIndex', 'indicatorts', { highs, lows, closings, period: 20 } )
await runTest( 'computeCommodityChannelIndex', 'talib', { highs, lows, closings, period: 20 } )

await runTest( 'computeWilliamsPercentR', 'trading-signals', { highs, lows, closings, period: 14 } )
await runTest( 'computeWilliamsPercentR', 'indicatorts', { highs, lows, closings, period: 14 } )
await runTest( 'computeWilliamsPercentR', 'talib', { highs, lows, closings, period: 14 } )

await runTest( 'computeChandeMomentumOscillator', 'talib', { closings, period: 14 } )

await runTest( 'computeUltimateOscillator', 'talib', { highs, lows, closings, period1: 3, period2: 7, period3: 14 } )

await runTest( 'computeAroon', 'indicatorts', { highs, lows, period: 14 } )
await runTest( 'computeAroon', 'talib', { highs, lows, period: 14 } )

await runTest( 'computeBalanceOfPower', 'indicatorts', { opens, highs, lows, closings } )
await runTest( 'computeBalanceOfPower', 'talib', { opens, highs, lows, closings } )

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )
