export const schema = {
    namespace: "taapi",
    name: "TAAPI.IO Technical Indicators",
    description: "Access 208+ technical analysis indicators (RSI, MACD, Bollinger Bands, EMA, SMA and more) via the TAAPI.IO REST API",
    docs: ["https://taapi.io/indicators/", "https://taapi.io/"],
    tags: ["crypto", "trading", "indicators"],
    flowMCP: "1.2.0",
    root: "https://api.taapi.io",
    requiredServerParams: ["TAAPI_SECRET"],
    headers: {},
    routes: {
        getRSI: {
            requestMethod: "GET",
            description: "Get the Relative Strength Index (RSI) for a trading pair",
            route: "/rsi",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(50)", "optional()"] } },
                { position: { key: "optInTimePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(100)", "default(14)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT RSI 1h on Binance", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getMACD: {
            requestMethod: "GET",
            description: "Get the Moving Average Convergence Divergence (MACD) for a trading pair",
            route: "/macd",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(50)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT MACD 1h on Binance", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getBollingerBands: {
            requestMethod: "GET",
            description: "Get Bollinger Bands (upper, middle, lower) for a trading pair",
            route: "/bbands",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "optInTimePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(100)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Bollinger Bands 1h", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getEMA: {
            requestMethod: "GET",
            description: "Get the Exponential Moving Average (EMA) for a trading pair",
            route: "/ema",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "optInTimePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT EMA 20 on 1h", symbol: "BTC/USDT", interval: "1h", optInTimePeriod: 20 }
            ],
            modifiers: []
        },
        getSMA: {
            requestMethod: "GET",
            description: "Get the Simple Moving Average (SMA) for a trading pair",
            route: "/sma",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "optInTimePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT SMA 50 on 1d", symbol: "BTC/USDT", interval: "1d", optInTimePeriod: 50 }
            ],
            modifiers: []
        },
        getStochastic: {
            requestMethod: "GET",
            description: "Get Stochastic oscillator (K and D values) for a trading pair",
            route: "/stoch",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Stochastic 1h", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getATR: {
            requestMethod: "GET",
            description: "Get the Average True Range (ATR) volatility indicator for a trading pair",
            route: "/atr",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } },
                { position: { key: "optInTimePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(100)", "default(14)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT ATR 14 on 1h", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getStochRSI: {
            requestMethod: "GET",
            description: "Get the Stochastic RSI for a trading pair",
            route: "/stochrsi",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT StochRSI 1h", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getVWAP: {
            requestMethod: "GET",
            description: "Get the Volume Weighted Average Price (VWAP) for a trading pair",
            route: "/vwap",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT VWAP 1h", symbol: "BTC/USDT", interval: "1h" }
            ],
            modifiers: []
        },
        getIchimoku: {
            requestMethod: "GET",
            description: "Get Ichimoku Cloud indicator values for a trading pair",
            route: "/ichimoku",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(binance)", "optional()"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: ["default(1h)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Ichimoku 1d", symbol: "BTC/USDT", interval: "1d" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
