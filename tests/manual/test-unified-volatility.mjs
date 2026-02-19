import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-volatility.mjs'

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

let passed = 0
let failed = 0

const hlcTests = [
    { route: 'computeAverageTrueRange', libraries: ['trading-signals', 'indicatorts', 'talib'], params: { highs, lows, closings, period: 14 } },
    { route: 'computeTrueRange', libraries: ['trading-signals', 'indicatorts', 'talib'], params: { highs, lows, closings } },
    { route: 'computeNormalizedAverageTrueRange', libraries: ['talib'], params: { highs, lows, closings, period: 14 } },
    { route: 'computeInterquartileRange', libraries: ['trading-signals'], params: { closings, period: 14 } },
    { route: 'computeMeanAbsoluteDeviation', libraries: ['trading-signals'], params: { closings, period: 14 } },
    { route: 'computeUlcerIndex', libraries: ['indicatorts'], params: { closings, period: 14 } },
    { route: 'computeMassIndex', libraries: ['indicatorts'], params: { highs, lows, emaPeriod: 9, miPeriod: 10 } },
    { route: 'computeChandelierExit', libraries: ['indicatorts'], params: { highs, lows, closings, period: 5 } }
]

for( const { route, libraries, params } of hlcTests ) {
    for( const library of libraries ) {
        try {
            const struct = { data: null, status: false, messages: [] }
            const payload = { userParams: { ...params, library } }
            const result = await h[ route ].executeRequest( { struct, payload } )
            const { data, status } = result.struct

            if( status !== true ) {
                console.log( 'FAIL', route, library, '— status false' )
                failed++
                continue
            }

            if( data.values === undefined || data.values.length === 0 ) {
                console.log( 'FAIL', route, library, '— no values' )
                failed++
                continue
            }

            const hasLatest = data.latest !== null && data.latest !== undefined
            const latestIsObject = typeof data.latest === 'object'

            if( !hasLatest ) {
                console.log( 'FAIL', route, library, '— no latest' )
                failed++
                continue
            }

            const name = route.replace( 'compute', '' ).padEnd( 35 )
            const lib = library.padEnd( 17 )
            const latestStr = latestIsObject ? JSON.stringify( data.latest ) : data.latest.toFixed( 4 ).padStart( 10 )
            const count = data.values.length

            console.log( `PASS  ${name} ${lib} latest=${latestStr}  values=${count}` )
            passed++
        } catch( err ) {
            console.log( `FAIL  ${route}  ${library}  — ${err.message}` )
            failed++
        }
    }
}

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )

if( failed > 0 ) {
    process.exit( 1 )
}
