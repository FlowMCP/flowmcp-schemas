import ccxt from 'ccxt'

import { TRADING_EXCHANGES } from '../_shared/tradingExchanges.mjs'


const ccxtExchanges = TRADING_EXCHANGES
    .filter( ( e ) => e.ccxtSlug !== undefined )
    .reduce( ( acc, e ) => {
        acc[ e.alias ] = e.ccxtSlug

        return acc
    }, {} )

const ccxtExchangeEnum = 'enum(' + Object.keys( ccxtExchanges ).join( ',' ) + ')'


export const schema = {
    namespace: "cryptoOrderbook",
    name: "Crypto Order Book Metrics",
    description: "Fetches and compares bid/ask depth and imbalance for trading pairs across supported exchanges using CCXT.",
    docs: ["https://github.com/ccxt/ccxt"],
    tags: ["production", "trading", "orderbook", "exchange", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "local://ccxt",
    requiredServerParams: [],
    headers: {},
    routes: {
        calculateOrderbook: {
            requestMethod: "POST",
            description: "Calculate bid/ask depth, imbalance and mid-price for a given trading pair on one exchange.",
            route: "/calculate",
            parameters: [
                { position: { key: "exchange_id", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: ccxtExchangeEnum, options: [] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "depth_percentage", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(0.01)", "max(10)", "default(1.0)"] } }
            ],
            tests: [
                { _description: "Basic ETH/USDT test on Binance", exchange_id: "BINANCE", symbol: "ETH/USDT", depth_percentage: 1.0 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "calculateOrderbook" }
            ]
        },
        compareOrderbook: {
            requestMethod: "POST",
            description: "Compare order book depth and imbalance for a trading pair across multiple exchanges.",
            route: "/compare",
            parameters: [
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "depth_percentage", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(0.01)", "max(10)", "default(1.0)"] } },
                { position: { key: "exchanges", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "array()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Compare ETH/USDT across all supported exchanges", symbol: "ETH/USDT", depth_percentage: 1.0 },
                { _description: "Compare BTC/USDT on Binance and Kraken", symbol: "BTC/USDT", exchanges: ["BINANCE", "KRAKEN"], depth_percentage: 1.0 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "compareOrderbook" }
            ]
        }
    },
    handlers: {
        calculateOrderbook: async ({ struct, userParams }) => {
            try {
                const { exchange_id: _exchangeAlias, symbol, depth_percentage = 1.0 } = userParams
                const exchange_id = ccxtExchanges[ _exchangeAlias ]
                const exchangeClass = ccxt[exchange_id]
                if (!exchangeClass) throw new Error(`Unsupported exchange: ${exchange_id}`)
                const exchange = new exchangeClass()
                const markets = await exchange.loadMarkets()
                if (!markets[symbol]) throw new Error(`Invalid symbol ${symbol} for exchange ${exchange_id}`)
                const book = await exchange.fetchOrderBook(symbol, 100)
                const bids = book.bids, asks = book.asks
                if (!bids.length || !asks.length) throw new Error("Empty order book")
                const mid = (bids[0][0] + asks[0][0]) / 2
                const range = mid * (depth_percentage / 100)
                const bidVol = bids.filter(b => b[0] >= mid - range).reduce((s, b) => s + b[1], 0)
                const askVol = asks.filter(a => a[0] <= mid + range).reduce((s, a) => s + a[1], 0)
                const imbalance = (bidVol - askVol) / (bidVol + askVol)
                struct.data = { exchange: exchange_id, symbol, bid_depth: bidVol, ask_depth: askVol, imbalance, mid_price: mid, timestamp: book.timestamp || Date.now() }
                struct.status = true
            } catch (e) {
                struct.status = false
                struct.messages.push(e.message)
            }
            return { struct }
        },

        compareOrderbook: async ({ struct, userParams }) => {
            try {
                const { symbol, depth_percentage = 1.0, exchanges: _exchangeAliases = Object.keys( ccxtExchanges ) } = userParams
                const exchanges = _exchangeAliases.map( ( a ) => ccxtExchanges[ a ] || a )
                const results = []
                for (const ex of exchanges) {
                    const exchangeClass = ccxt[ex]
                    if (!exchangeClass) continue
                    const exchange = new exchangeClass()
                    try {
                        const markets = await exchange.loadMarkets()
                        if (!markets[symbol]) continue
                        const book = await exchange.fetchOrderBook(symbol, 100)
                        const bids = book.bids, asks = book.asks
                        const mid = (bids[0][0] + asks[0][0]) / 2
                        const range = mid * (depth_percentage / 100)
                        const bidVol = bids.filter(b => b[0] >= mid - range).reduce((s, b) => s + b[1], 0)
                        const askVol = asks.filter(a => a[0] <= mid + range).reduce((s, a) => s + a[1], 0)
                        const imbalance = (bidVol - askVol) / (bidVol + askVol)
                        results.push({ exchange: ex, bid_depth: bidVol, ask_depth: askVol, imbalance })
                    } catch (_) {}
                }
                if (!results.length) throw new Error("No valid order book data retrieved")
                struct.data = results
                struct.status = true
            } catch (e) {
                struct.status = false
                struct.messages.push(e.message)
            }
            return { struct }
        }
    }
}