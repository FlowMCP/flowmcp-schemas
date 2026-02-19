import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-trend-advanced.mjs'

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

const closings = '100,102,101,103,105,104,106,108,107,109,111,110,112,114,113,115,117,116,118,120,119,121,123,122,124,126,125,127,129,128,130,132,131,133,135,134,136,138,137,139,141,140,142,144,143,145,147,146,148,150'

const testMatrix = {
    computeDisplacedMovingAverage: ['trading-signals'],
    computeKaufmanAdaptiveMovingAverage: ['talib'],
    computeMESAAdaptiveMovingAverage: ['talib'],
    computeT3: ['talib'],
    computeLinearRegression: ['trading-signals', 'talib'],
    computeLinearRegressionSlope: ['talib'],
    computeLinearRegressionAngle: ['talib'],
    computeLinearRegressionIntercept: ['talib']
}

const defaultParams = {
    computeDisplacedMovingAverage: { shortInterval: 5, longInterval: 10 },
    computeKaufmanAdaptiveMovingAverage: { period: 10 },
    computeMESAAdaptiveMovingAverage: { fastLimit: 0.5, slowLimit: 0.05 },
    computeT3: { period: 5, vFactor: 0.7 },
    computeLinearRegression: { period: 5 },
    computeLinearRegressionSlope: { period: 5 },
    computeLinearRegressionAngle: { period: 5 },
    computeLinearRegressionIntercept: { period: 5 }
}

let passed = 0
let failed = 0

const entries = Object.entries( testMatrix )

for( const [ route, libraries ] of entries ) {
    for( const library of libraries ) {
        try {
            const struct = { data: null, status: false, messages: [] }
            const params = { closings, library, ...defaultParams[ route ] }
            const payload = { userParams: params }
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
            const latestStr = typeof data.latest === 'object'
                ? JSON.stringify( data.latest )
                : data.latest.toFixed( 4 ).padStart( 10 )
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
