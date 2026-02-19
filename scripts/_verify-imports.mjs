import { pathToFileURL } from 'url'
import path from 'path'

const files = [
    'schemas/v2.0.0/taapi/indicators-part1.mjs',
    'schemas/v2.0.0/taapi/indicators-part2.mjs',
    'schemas/v2.0.0/dip/documents.mjs',
    'schemas/v2.0.0/dip/proceedings.mjs',
    'schemas/v2.0.0/jupiter/jupiter-all.mjs',
    'schemas/v2.0.0/debank/portfolio.mjs',
    'schemas/v2.0.0/oneinch/swap.mjs',
    'schemas/v2.0.0/santiment-net/schema.mjs',
    'schemas/v2.0.0/goldsky-nouns/goldsky-nouns.mjs',
    'schemas/v2.0.0/goldsky-nouns/nouns.mjs',
    'schemas/v2.0.0/dune-analytics/farcaster.mjs',
    'schemas/v2.0.0/dune-analytics/trendingContracts.mjs',
    'schemas/v2.0.0/geoapify/geocoding.mjs',
    'schemas/v2.0.0/cryptorank/funds.mjs',
    'schemas/v2.0.0/tally/governance.mjs',
    'schemas/v2.0.0/goldrush/streaming.mjs',
    'schemas/v2.0.0/cryptopanic/getNews.mjs',
    'schemas/v2.0.0/twitter/search.mjs',
    'schemas/v2.0.0/talent-protocol/advancedSearch.mjs',
    'schemas/v2.0.0/simdune/activityEVM.mjs',
    'schemas/v2.0.0/thegraph/getNewUniswapPools.mjs',
    'schemas/v2.0.0/uniswap-pools/uniswap-pool-explorer.mjs',
    'schemas/v2.0.0/solscan-io/getChainInfo.mjs',
    'schemas/v2.0.0/solsniffer-com/analysis.mjs',
    'schemas/v2.0.0/bridgerates/bridgerates.mjs',
    'schemas/v2.0.0/ethscriptions-com/ethscriptions-api-part1.mjs',
]

let ok = 0
let fail = 0
for( const f of files ) {
    try {
        const mod = await import( pathToFileURL( path.resolve( f ) ).href )
        const schema = mod.main || mod.default
        const routes = Object.keys( schema.routes )
        const withOutput = routes.filter( ( r ) => schema.routes[r].output !== undefined ).length
        console.log( `  OK ${f.split( '/' ).slice( -2 ).join( '/' )} — ${withOutput}/${routes.length} with output` )
        ok++
    } catch( e ) {
        console.log( `  FAIL ${f.split( '/' ).slice( -2 ).join( '/' )} — ${e.message.split( '\n' )[0]}` )
        fail++
    }
}
console.log( `\nResult: ${ok} OK, ${fail} FAIL` )
