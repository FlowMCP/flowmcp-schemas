/**
 * Batch-add output schemas to routes that are missing them.
 * Uses known API response patterns per provider.
 */
import fs from 'fs'
import path from 'path'

const V2_DIR = path.resolve( 'schemas/v2.0.0' )

// Known output schemas per route pattern
const outputPatterns = {
    // TAAPI indicators — all return { value: number } or similar
    'taapi/indicators-part1.mjs': {
        getRSI: { mimeType: 'application/json', schema: { type: 'object', properties: { value: { type: 'number' } } } },
        getMACD: { mimeType: 'application/json', schema: { type: 'object', properties: { valueMACD: { type: 'number' }, valueMACDSignal: { type: 'number' }, valueMACDHist: { type: 'number' } } } },
        getBollingerBands: { mimeType: 'application/json', schema: { type: 'object', properties: { valueUpperBand: { type: 'number' }, valueMiddleBand: { type: 'number' }, valueLowerBand: { type: 'number' } } } },
        getEMA: { mimeType: 'application/json', schema: { type: 'object', properties: { value: { type: 'number' } } } },
        getSMA: { mimeType: 'application/json', schema: { type: 'object', properties: { value: { type: 'number' } } } },
        getStochastic: { mimeType: 'application/json', schema: { type: 'object', properties: { valueK: { type: 'number' }, valueD: { type: 'number' } } } },
        getATR: { mimeType: 'application/json', schema: { type: 'object', properties: { value: { type: 'number' } } } },
        getStochRSI: { mimeType: 'application/json', schema: { type: 'object', properties: { valueFastK: { type: 'number' }, valueFastD: { type: 'number' } } } },
    },
    'taapi/indicators-part2.mjs': {
        getVWAP: { mimeType: 'application/json', schema: { type: 'object', properties: { value: { type: 'number' } } } },
        getIchimoku: { mimeType: 'application/json', schema: { type: 'object', properties: { conversion: { type: 'number' }, base: { type: 'number' }, spanA: { type: 'number' }, spanB: { type: 'number' } } } },
    },
    // DIP German Parliament — list endpoints
    'dip/documents.mjs': {
        listDrucksachen: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getDrucksache: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' }, aktualisiert: { type: 'string' }, fundstelle: { type: 'object' } } } },
        listDrucksacheTexts: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, titel: { type: 'string' }, text: { type: 'string' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getDrucksacheText: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, titel: { type: 'string' }, text: { type: 'string' }, datum: { type: 'string' } } } },
        listPlenarprotokolle: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getPlenarprotokoll: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' } } } },
        listPlenarprotokollTexts: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, titel: { type: 'string' }, text: { type: 'string' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getPlenarprotokollText: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, dokumentnummer: { type: 'string' }, titel: { type: 'string' }, text: { type: 'string' }, datum: { type: 'string' } } } },
    },
    'dip/proceedings.mjs': {
        listVorgaenge: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, typ: { type: 'string' }, titel: { type: 'string' }, wahlperiode: { type: 'number' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getVorgang: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, typ: { type: 'string' }, titel: { type: 'string' }, wahlperiode: { type: 'number' }, aktualisiert: { type: 'string' }, beratungsstand: { type: 'string' } } } },
        listVorgangspositionen: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, titel: { type: 'string' }, datum: { type: 'string' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getVorgangsposition: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, titel: { type: 'string' }, datum: { type: 'string' }, aktivitaet_anzeige: { type: 'string' } } } },
        listAktivitaeten: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getAktivitaet: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, typ: { type: 'string' }, titel: { type: 'string' }, datum: { type: 'string' }, wahlperiode: { type: 'number' } } } },
        listPersonen: { mimeType: 'application/json', schema: { type: 'object', properties: { documents: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, nachname: { type: 'string' }, vorname: { type: 'string' }, titel: { type: 'string' }, fraktion: { type: 'string' } } } }, cursor: { type: 'string' }, numFound: { type: 'number' } } } },
        getPerson: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'number' }, nachname: { type: 'string' }, vorname: { type: 'string' }, titel: { type: 'string' }, fraktion: { type: 'string' }, wahlperiode: { type: 'number' } } } },
    },
    // Jupiter token APIs
    'jupiter/jupiter-all.mjs': {
        getTokenPrice: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object' }, timeTaken: { type: 'number' } } } },
        getTokenInfo: { mimeType: 'application/json', schema: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' }, logoURI: { type: 'string' }, tags: { type: 'array', items: { type: 'string' } } } } },
        getTokensInMarket: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'string' } } },
        getAllTradableTokens: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'string' } } },
        getTaggedTokens: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' } } } } },
        getNewTokens: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' } } } } },
        getAllTokens: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' } } } } },
    },
    // DeBank portfolio
    'debank/portfolio.mjs': {
        getTotalBalance: { mimeType: 'application/json', schema: { type: 'object', properties: { total_usd_value: { type: 'number' }, chain_list: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, usd_value: { type: 'number' } } } } } } },
        getUsedChains: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, logo_url: { type: 'string' } } } } },
        getTokenList: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, chain: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, amount: { type: 'number' }, price: { type: 'number' } } } } },
        getProtocolList: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, chain: { type: 'string' }, name: { type: 'string' }, net_usd_value: { type: 'number' } } } } },
        getAllProtocols: { mimeType: 'application/json', schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, chain: { type: 'string' }, tvl: { type: 'number' } } } } },
        getTokenInfo: { mimeType: 'application/json', schema: { type: 'object', properties: { id: { type: 'string' }, chain: { type: 'string' }, name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' }, price: { type: 'number' } } } },
    },
    // Geoapify geocoding
    'geoapify/geocoding.mjs': {
        forwardGeocode: { mimeType: 'application/json', schema: { type: 'object', properties: { type: { type: 'string' }, features: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, properties: { type: 'object' }, geometry: { type: 'object', properties: { type: { type: 'string' }, coordinates: { type: 'array', items: { type: 'number' } } } } } } } } } },
        reverseGeocode: { mimeType: 'application/json', schema: { type: 'object', properties: { type: { type: 'string' }, features: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, properties: { type: 'object' }, geometry: { type: 'object' } } } } } } },
        autocomplete: { mimeType: 'application/json', schema: { type: 'object', properties: { type: { type: 'string' }, features: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, properties: { type: 'object' }, geometry: { type: 'object' } } } } } } },
    },
    // 1inch swap
    'oneinch/swap.mjs': {
        getQuote: { mimeType: 'application/json', schema: { type: 'object', properties: { dstAmount: { type: 'string' }, protocols: { type: 'array', items: { type: 'array' } }, gas: { type: 'number' } } } },
        getSwap: { mimeType: 'application/json', schema: { type: 'object', properties: { dstAmount: { type: 'string' }, tx: { type: 'object', properties: { from: { type: 'string' }, to: { type: 'string' }, data: { type: 'string' }, value: { type: 'string' }, gas: { type: 'number' }, gasPrice: { type: 'string' } } } } } },
        getTokens: { mimeType: 'application/json', schema: { type: 'object', properties: { tokens: { type: 'object' } } } },
        getApprove: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'string' }, gasPrice: { type: 'string' }, to: { type: 'string' }, value: { type: 'string' } } } },
        getAllowance: { mimeType: 'application/json', schema: { type: 'object', properties: { allowance: { type: 'string' } } } },
    },
    // Santiment GraphQL
    'santiment-net/schema.mjs': {
        get_sentiment_balance: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { getMetric: { type: 'object', properties: { timeseriesData: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, value: { type: 'number' } } } } } } } } } } },
        get_social_volume: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { getMetric: { type: 'object', properties: { timeseriesData: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, value: { type: 'number' } } } } } } } } } } },
        alert_social_shift: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { getMetric: { type: 'object', properties: { timeseriesData: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, value: { type: 'number' } } } } } } } } } } },
        get_trending_words: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { getTrendingWords: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, topWords: { type: 'array', items: { type: 'object', properties: { word: { type: 'string' }, score: { type: 'number' } } } } } } } } } } } },
        get_social_dominance: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { getMetric: { type: 'object', properties: { timeseriesData: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, value: { type: 'number' } } } } } } } } } } },
    },
    // Cryptorank funds
    'cryptorank/funds.mjs': {
        searchFunds: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, slug: { type: 'string' } } } } } } },
        getAllFunds: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, tier: { type: 'string' }, type: { type: 'string' } } } }, totalCount: { type: 'number' } } } },
        getFundBasic: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, description: { type: 'string' }, website: { type: 'string' } } } } } },
        getFundDetail: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, portfolio: { type: 'array', items: { type: 'object' } } } } } } },
        getFundTeam: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, role: { type: 'string' } } } } } } },
    },
    // Tally governance
    'tally/governance.mjs': {
        getChains: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { chains: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } } } } } } } },
        getGovernors: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { governors: { type: 'object', properties: { nodes: { type: 'array', items: { type: 'object' } } } } } } } } },
        getProposals: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { proposals: { type: 'object', properties: { nodes: { type: 'array', items: { type: 'object' } } } } } } } } },
        getDelegates: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { delegates: { type: 'object', properties: { nodes: { type: 'array', items: { type: 'object' } } } } } } } } },
    },
    // GoldRush streaming
    'goldrush/streaming.mjs': {
        searchToken: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { searchTokens: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, contractAddress: { type: 'string' } } } } } } } } },
        getWalletPnL: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { walletPnL: { type: 'object', properties: { totalPnL: { type: 'number' }, tokens: { type: 'array', items: { type: 'object' } } } } } } } } },
    },
    // Remaining misc
    'cryptopanic/getNews.mjs': {
        getCryptoCryptopanicNews: { mimeType: 'application/json', schema: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, url: { type: 'string' }, source: { type: 'object' }, published_at: { type: 'string' } } } } } } },
    },
    'twitter/search.mjs': {
        searchRecentTweets: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, text: { type: 'string' }, created_at: { type: 'string' }, author_id: { type: 'string' } } } }, meta: { type: 'object', properties: { result_count: { type: 'number' }, next_token: { type: 'string' } } } } } },
    },
    'talent-protocol/advancedSearch.mjs': {
        searchAdvancedProfiles: { mimeType: 'application/json', schema: { type: 'object', properties: { passports: { type: 'array', items: { type: 'object', properties: { passport_id: { type: 'number' }, score: { type: 'number' }, user: { type: 'object' } } } }, pagination: { type: 'object' } } } },
        getDefaultFields: { mimeType: 'application/json', schema: { type: 'object', properties: { fields: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, type: { type: 'string' } } } } } } },
    },
    'simdune/activityEVM.mjs': {
        getActivityDetailedEVM: { mimeType: 'application/json', schema: { type: 'object', properties: { result: { type: 'object', properties: { rows: { type: 'array', items: { type: 'object' } }, metadata: { type: 'object' } } } } } },
    },
    'thegraph/getNewUniswapPools.mjs': {
        getNewPools: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { pools: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, token0: { type: 'object' }, token1: { type: 'object' }, feeTier: { type: 'string' } } } } } } } } },
    },
    'uniswap-pools/uniswap-pool-explorer.mjs': {
        getTokenPools: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { pools: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, token0: { type: 'object' }, token1: { type: 'object' }, volumeUSD: { type: 'string' } } } } } } } } },
        getPoolData: { mimeType: 'application/json', schema: { type: 'object', properties: { data: { type: 'object', properties: { pool: { type: 'object', properties: { id: { type: 'string' }, token0: { type: 'object' }, token1: { type: 'object' }, liquidity: { type: 'string' }, volumeUSD: { type: 'string' }, feeTier: { type: 'string' } } } } } } } },
    },
    'solscan-io/getChainInfo.mjs': {
        chainInfo: { mimeType: 'application/json', schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'object', properties: { blockHeight: { type: 'number' }, currentEpoch: { type: 'number' }, absoluteSlot: { type: 'number' }, transactionCount: { type: 'number' } } } } } },
    },
    'solsniffer-com/analysis.mjs': {
        analysisToken: { mimeType: 'application/json', schema: { type: 'object', properties: { score: { type: 'number' }, risks: { type: 'array', items: { type: 'object' } }, tokenData: { type: 'object' } } } },
    },
    'bridgerates/bridgerates.mjs': {
        getTransferStatus: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, substatus: { type: 'string' }, sending: { type: 'object' }, receiving: { type: 'object' }, tool: { type: 'string' } } } },
    },
}

let totalInjected = 0
let totalFiles = 0

Object.entries( outputPatterns )
    .forEach( ( [ relPath, routeSchemas ] ) => {
        const filePath = path.join( V2_DIR, relPath )
        if( !fs.existsSync( filePath ) ) {
            console.log( `  SKIP ${relPath} — file not found` )
            return
        }

        let content = fs.readFileSync( filePath, 'utf8' )
        let fileChanged = false

        Object.entries( routeSchemas )
            .forEach( ( [ routeName, outputObj ] ) => {
                // Check if route already has output
                const routePattern = new RegExp( `${routeName}:\\s*\\{` )
                if( !routePattern.test( content ) ) {
                    console.log( `  SKIP ${relPath} :: ${routeName} — route not found` )
                    return
                }

                // Check if already has output
                const routeIdx = content.indexOf( `${routeName}:` )
                const nextRouteIdx = content.indexOf( '\n        }', routeIdx + routeName.length + 50 )
                const routeSlice = content.slice( routeIdx, nextRouteIdx + 10 )
                if( routeSlice.includes( 'output:' ) || routeSlice.includes( 'output :' ) ) {
                    console.log( `  SKIP ${relPath} :: ${routeName} — already has output` )
                    return
                }

                // Find tests array end for this route and inject output after it
                const testsEnd = content.indexOf( '],', routeIdx + routeName.length )
                if( testsEnd === -1 ) {
                    console.log( `  SKIP ${relPath} :: ${routeName} — no tests array found` )
                    return
                }

                const outputStr = JSON.stringify( outputObj )
                    .replace( /"([^"]+)":/g, '$1:' )  // remove quotes from keys
                    .replace( /"/g, "'" )               // use single quotes

                const injection = `\n            output: ${outputStr},`

                // Find the end of the tests array ('],') and inject after it
                const insertPos = testsEnd + 2  // after '],'
                content = content.slice( 0, insertPos ) + injection + content.slice( insertPos )

                fileChanged = true
                totalInjected++
                console.log( `  + ${relPath} :: ${routeName}` )
            } )

        if( fileChanged ) {
            fs.writeFileSync( filePath, content )
            totalFiles++
        }
    } )

console.log( `\nDone: ${totalInjected} routes injected across ${totalFiles} files` )
