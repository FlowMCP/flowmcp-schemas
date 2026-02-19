import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-trend-basic.mjs'

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

const testMatrix = {
    computeSimpleMovingAverage: ['trading-signals', 'indicatorts', 'talib'],
    computeExponentialMovingAverage: ['trading-signals', 'indicatorts', 'talib'],
    computeDoubleExponentialMovingAverage: ['trading-signals', 'indicatorts', 'talib'],
    computeWeightedMovingAverage: ['trading-signals', 'talib'],
    computeTripleExponentialMovingAverage: ['indicatorts', 'talib'],
    computeTriangularMovingAverage: ['indicatorts', 'talib'],
    computeWildersSmoothingMovingAverage: ['trading-signals'],
    computeRunningMovingAverage: ['trading-signals', 'indicatorts']
}

let passed = 0
let failed = 0

const entries = Object.entries( testMatrix )

for( const [ route, libraries ] of entries ) {
    for( const library of libraries ) {
        try {
            const struct = { data: null, status: false, messages: [] }
            const payload = { userParams: { closings, period: 5, library } }
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

            if( data.latest === null || data.latest === undefined ) {
                console.log( 'FAIL', route, library, '— no latest' )
                failed++
                continue
            }

            const name = route.replace( 'compute', '' ).padEnd( 35 )
            const lib = library.padEnd( 17 )
            const latest = data.latest.toFixed( 4 ).padStart( 10 )
            const count = data.values.length

            console.log( `PASS  ${name} ${lib} latest=${latest}  values=${count}` )
            passed++
        } catch( err ) {
            console.log( `FAIL  ${route}  ${library}  — ${err.message}` )
            failed++
        }
    }
}

console.log( '' )
console.log( `${passed} passed, ${failed} failed, ${passed + failed} total` )
