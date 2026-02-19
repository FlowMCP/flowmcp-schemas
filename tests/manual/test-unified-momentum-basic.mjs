import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-momentum-basic.mjs'

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

const closings = '44,44.34,44.09,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45,45.78,45.35,44.03,44.18,44.22,44.57,43.42,42.66,43.13,44.28,44.55,43.95,44.20,44.80,44.51,44.10'
const highs = '44.5,44.84,44.59,44.11,44.83,45.33,45.60,45.92,46.34,46.58,46.39,46.53,46.11,46.78,46.78,46.50,46.53,46.91,46.72,46.14,46.71,46.75,46.21,46.95,46.28,45.85,44.53,44.68,44.72,45.07,43.92,43.16,43.63,44.78,45.05,44.45,44.70,45.30,45.01,44.60'
const lows = '43.5,43.84,43.59,43.11,43.83,44.33,44.60,44.92,45.34,45.58,45.39,45.53,45.11,45.78,45.78,45.50,45.53,45.91,45.72,45.14,45.71,45.75,45.21,45.95,45.28,44.85,43.53,43.68,43.72,44.07,42.92,42.16,42.63,43.78,44.05,43.45,43.70,44.30,44.01,43.60'

const testMatrix = {
    computeRelativeStrengthIndex: {
        libraries: ['trading-signals', 'indicatorts', 'talib'],
        params: { closings, period: 14 }
    },
    computeMovingAverageConvergenceDivergence: {
        libraries: ['trading-signals', 'indicatorts', 'talib'],
        params: { closings, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 }
    },
    computeStochasticOscillator: {
        libraries: ['trading-signals', 'indicatorts', 'talib'],
        params: { closings, highs, lows, kPeriod: 14, dPeriod: 3 }
    },
    computeStochasticRSI: {
        libraries: ['trading-signals', 'talib'],
        params: { closings, period: 14 }
    },
    computeMomentum: {
        libraries: ['trading-signals', 'talib'],
        params: { closings, period: 10 }
    },
    computeRateOfChange: {
        libraries: ['trading-signals', 'indicatorts', 'talib'],
        params: { closings, period: 12 }
    },
    computeCenterOfGravity: {
        libraries: ['trading-signals'],
        params: { closings, period: 10, signalPeriod: 3 }
    },
    computeTripleExponentialAverage: {
        libraries: ['indicatorts', 'talib'],
        params: { closings, period: 5 }
    }
}

let passed = 0
let failed = 0

const entries = Object.entries( testMatrix )

for( const [ route, config ] of entries ) {
    const { libraries, params } = config

    for( const library of libraries ) {
        try {
            const struct = { data: null, status: false, messages: [] }
            const payload = { userParams: { ...params, library } }
            const result = await h[ route ].executeRequest( { struct, payload } )
            const { data, status } = result.struct

            if( status !== true ) {
                console.log( 'FAIL', route, library, '-- status false' )
                failed++
                continue
            }

            if( data.values === undefined || data.values.length === 0 ) {
                console.log( 'FAIL', route, library, '-- no values' )
                failed++
                continue
            }

            if( data.latest === null || data.latest === undefined ) {
                console.log( 'FAIL', route, library, '-- no latest' )
                failed++
                continue
            }

            const name = route.replace( 'compute', '' ).padEnd( 42 )
            const lib = library.padEnd( 17 )
            const isObject = typeof data.latest === 'object'
            const latestStr = isObject
                ? JSON.stringify( data.latest )
                : data.latest.toFixed( 4 ).padStart( 10 )
            const count = data.values.length

            console.log( `PASS  ${name} ${lib} latest=${latestStr}  values=${count}` )
            passed++
        } catch( err ) {
            console.log( `FAIL  ${route}  ${library}  -- ${err.message}` )
            failed++
        }
    }
}

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )
