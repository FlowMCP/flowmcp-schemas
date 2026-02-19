import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-trend-channels.mjs'

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

async function testBandRoute( route, library, params ) {
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

        if( route === 'computeIchimokuCloud' ) {
            const hasData = data.conversion && data.conversion.length > 0
            const hasBase = data.base && data.base.length > 0

            if( !hasData || !hasBase ) {
                console.log( 'FAIL', route, library, '-- no conversion/base data' )
                failed++

                return
            }

            const name = route.replace( 'compute', '' ).padEnd( 25 )
            const lib = library.padEnd( 17 )

            console.log( `PASS  ${name} ${lib} conversion=${data.conversion.length}  base=${data.base.length}` )
            passed++

            return
        }

        if( route === 'computeBollingerBandsWidth' ) {
            const vals = data.values || data.stableValues || []

            if( vals.length === 0 ) {
                console.log( 'FAIL', route, library, '-- no values' )
                failed++

                return
            }

            const latestVal = data.latest
            const name = route.replace( 'compute', '' ).padEnd( 25 )
            const lib = library.padEnd( 17 )
            const latestStr = latestVal !== null && latestVal !== undefined ? Number( latestVal ).toFixed( 4 ).padStart( 10 ) : '      null'

            console.log( `PASS  ${name} ${lib} latest=${latestStr}  values=${vals.length}` )
            passed++

            return
        }

        const vals = data.values || data.stableValues || []

        if( vals.length === 0 ) {
            console.log( 'FAIL', route, library, '-- no values' )
            failed++

            return
        }

        const latest = data.latest

        if( latest === null || latest === undefined ) {
            console.log( 'FAIL', route, library, '-- no latest' )
            failed++

            return
        }

        const name = route.replace( 'compute', '' ).padEnd( 25 )
        const lib = library.padEnd( 17 )
        const upperStr = latest.upper !== undefined ? latest.upper.toFixed( 2 ) : '?'
        const middleStr = latest.middle !== undefined ? latest.middle.toFixed( 2 ) : '?'
        const lowerStr = latest.lower !== undefined ? latest.lower.toFixed( 2 ) : '?'

        console.log( `PASS  ${name} ${lib} upper=${upperStr}  mid=${middleStr}  lower=${lowerStr}  values=${vals.length}` )
        passed++
    } catch( err ) {
        console.log( `FAIL  ${route}  ${library}  -- ${err.message}` )
        failed++
    }
}

await testBandRoute( 'computeBollingerBands', 'trading-signals', { closings, period: 5, deviationMultiplier: 2 } )
await testBandRoute( 'computeBollingerBands', 'indicatorts', { closings, period: 5, deviationMultiplier: 2 } )
await testBandRoute( 'computeBollingerBands', 'talib', { closings, period: 5, deviationMultiplier: 2 } )

await testBandRoute( 'computeBollingerBandsWidth', 'trading-signals', { closings, period: 5, deviationMultiplier: 2 } )
await testBandRoute( 'computeBollingerBandsWidth', 'indicatorts', { closings, period: 5, deviationMultiplier: 2 } )

await testBandRoute( 'computeKeltnerChannel', 'indicatorts', { highs, lows, closings, period: 5 } )

await testBandRoute( 'computeDonchianChannel', 'indicatorts', { closings, period: 5 } )

await testBandRoute( 'computeAccelerationBands', 'trading-signals', { highs, lows, closings, period: 5, width: 4 } )
await testBandRoute( 'computeAccelerationBands', 'talib', { highs, lows, closings, period: 5, width: 4 } )

await testBandRoute( 'computeIchimokuCloud', 'indicatorts', { highs, lows, closings, short: 3, medium: 5, long: 10 } )

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )
