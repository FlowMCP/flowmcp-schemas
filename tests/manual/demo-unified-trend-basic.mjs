import { createRequire } from 'module'
import { main, handlers } from '../../schemas/v2.0.0/indicators/unified-trend-basic.mjs'

const require = createRequire( import.meta.url )

const ts = await import( 'trading-signals' )
const ind = await import( 'indicatorts' )
const talib = require( 'talib' )

const h = handlers( { sharedLists: {}, libraries: { 'trading-signals': ts, 'indicatorts': ind, 'talib': talib } } )

const closings = '100,102,101,103,105,104,106,108,107,109,111,110,112,114,113,115,117,116,118,120'

console.log( '═══════════════════════════════════════════════════════════════════════════════' )
console.log( '  UNIFIED TREND BASIC — Proof of Concept' )
console.log( '  8 Indicators × 2-3 Libraries = 18 Combinations' )
console.log( '═══════════════════════════════════════════════════════════════════════════════' )
console.log( '' )
console.log( `  Input: ${closings.split( ',' ).length} price points, period=5` )
console.log( '' )

const testMatrix = [
    { route: 'computeSimpleMovingAverage', short: 'SMA', libs: ['trading-signals', 'indicatorts', 'talib'] },
    { route: 'computeExponentialMovingAverage', short: 'EMA', libs: ['trading-signals', 'indicatorts', 'talib'] },
    { route: 'computeDoubleExponentialMovingAverage', short: 'DEMA', libs: ['trading-signals', 'indicatorts', 'talib'] },
    { route: 'computeWeightedMovingAverage', short: 'WMA', libs: ['trading-signals', 'talib'] },
    { route: 'computeTripleExponentialMovingAverage', short: 'TEMA', libs: ['indicatorts', 'talib'] },
    { route: 'computeTriangularMovingAverage', short: 'TRIMA', libs: ['indicatorts', 'talib'] },
    { route: 'computeWildersSmoothingMovingAverage', short: 'WSMA', libs: ['trading-signals'] },
    { route: 'computeRunningMovingAverage', short: 'RMA', libs: ['indicatorts', 'trading-signals'] }
]

let passed = 0
let failed = 0

for( const { route, short, libs } of testMatrix ) {
    console.log( `  ┌─ ${short} (${route})` )

    for( const library of libs ) {
        const struct = { data: null, status: false, messages: [] }
        const payload = { userParams: { closings, period: 5, library } }

        try {
            const result = await h[ route ].executeRequest( { struct, payload } )
            const { data } = result.struct
            const last5 = data.values.slice( -5 ).map( ( v ) => v !== null ? v.toFixed( 2 ) : '—' )
            const status = result.struct.status ? '✓' : '✗'

            console.log( `  │  ${status} ${library.padEnd( 17 )}  latest=${data.latest.toFixed( 4 ).padStart( 10 )}  values=${String( data.values.length ).padStart( 2 )}  last5=[${last5.join( ', ' )}]` )
            passed++
        } catch( err ) {
            console.log( `  │  ✗ ${library.padEnd( 17 )}  ERROR: ${err.message}` )
            failed++
        }
    }

    console.log( '  │' )
}

console.log( '  └──────────────────────────────────────────────────────────────────────────' )
console.log( '' )
console.log( `  Result: ${passed} passed, ${failed} failed` )
console.log( '' )

console.log( '  ┌─ Cross-Library Comparison: SMA(5) last 5 values' )

const compRoutes = [
    { route: 'computeSimpleMovingAverage', short: 'SMA', libs: ['trading-signals', 'indicatorts', 'talib'] },
    { route: 'computeExponentialMovingAverage', short: 'EMA', libs: ['trading-signals', 'indicatorts', 'talib'] },
    { route: 'computeDoubleExponentialMovingAverage', short: 'DEMA', libs: ['trading-signals', 'indicatorts', 'talib'] }
]

for( const { route, short, libs } of compRoutes ) {
    console.log( `  │` )
    console.log( `  │  ${short} latest values:` )

    for( const library of libs ) {
        const struct = { data: null, status: false, messages: [] }
        const payload = { userParams: { closings, period: 5, library } }
        const result = await h[ route ].executeRequest( { struct, payload } )
        const { data } = result.struct
        const last8 = data.values.slice( -8 ).map( ( v ) => v !== null ? v.toFixed( 2 ) : '    —' )

        console.log( `  │    ${library.padEnd( 17 )} [${last8.join( ', ' )}]` )
    }
}

console.log( '  │' )
console.log( '  └──────────────────────────────────────────────────────────────────────────' )
console.log( '' )
console.log( '  Schema: unified-trend-basic.mjs' )
console.log( `  Routes: ${Object.keys( main.routes ).length}` )
console.log( `  Libraries: ${main.requiredLibraries.join( ', ' )}` )
console.log( '' )
