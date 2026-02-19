import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-volume.mjs'

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
const volumes = '1000,1200,900,1100,1300,800,1000,1400,900,1200,1100,1000,1300,1500,800,1000,1200,900,1100,1300'

const tests = [
    { route: 'computeOnBalanceVolume', params: { closings, volumes, library: 'indicatorts' } },
    { route: 'computeOnBalanceVolume', params: { closings, volumes, opens, highs, lows, library: 'trading-signals' } },
    { route: 'computeOnBalanceVolume', params: { closings, volumes, library: 'talib' } },
    { route: 'computeVolumeWeightedAveragePrice', params: { highs, lows, closings, volumes, period: 14, library: 'indicatorts' } },
    { route: 'computeVolumeWeightedAveragePrice', params: { highs, lows, closings, volumes, library: 'trading-signals' } },
    { route: 'computeAccumulationDistribution', params: { highs, lows, closings, volumes, library: 'indicatorts' } },
    { route: 'computeAccumulationDistribution', params: { highs, lows, closings, volumes, library: 'talib' } },
    { route: 'computeAccumulationDistributionOscillator', params: { highs, lows, closings, volumes, fastPeriod: 3, slowPeriod: 10, library: 'talib' } },
    { route: 'computeChaikinMoneyFlow', params: { highs, lows, closings, volumes, period: 20, library: 'indicatorts' } },
    { route: 'computeMoneyFlowIndex', params: { highs, lows, closings, volumes, period: 14, library: 'indicatorts' } },
    { route: 'computeMoneyFlowIndex', params: { highs, lows, closings, volumes, period: 14, library: 'talib' } },
    { route: 'computeVolumeWeightedMovingAverage', params: { closings, volumes, period: 14, library: 'indicatorts' } },
    { route: 'computeVolumePriceTrend', params: { closings, volumes, library: 'indicatorts' } }
]

let passed = 0
let failed = 0

for( const { route, params } of tests ) {
    const lib = params.library
    try {
        const struct = { data: null, status: false, messages: [] }
        const payload = { userParams: params }
        const result = await h[ route ].executeRequest( { struct, payload } )
        const { data, status } = result.struct

        if( status !== true ) {
            console.log( 'FAIL', route, lib, '— status false' )
            failed++
            continue
        }

        if( data.values === undefined || data.values.length === 0 ) {
            console.log( 'FAIL', route, lib, '— no values' )
            failed++
            continue
        }

        if( data.latest === null || data.latest === undefined ) {
            console.log( 'FAIL', route, lib, '— no latest' )
            failed++
            continue
        }

        const name = route.replace( 'compute', '' ).padEnd( 40 )
        const libStr = lib.padEnd( 17 )
        const latest = typeof data.latest === 'number' ? data.latest.toFixed( 4 ).padStart( 14 ) : String( data.latest ).padStart( 14 )
        const count = data.values.length

        console.log( `PASS  ${name} ${libStr} latest=${latest}  values=${count}` )
        passed++
    } catch( err ) {
        console.log( `FAIL  ${route}  ${lib}  — ${err.message}` )
        failed++
    }
}

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )
