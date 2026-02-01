export const schema = {
    namespace: "taapi",
    name: "TAAPI.IO Technical Indicators",
    description: "Fetch technical analysis indicators (RSI, MACD, Bollinger Bands, EMA, SMA, Stochastic, ATR, StochRSI, VWAP, Ichimoku) from TAAPI.IO REST API",
    docs: ["https://taapi.io/indicators/"],
    tags: ["indicators", "technical-analysis", "trading"],
    flowMCP: "1.2.0",
    root: "https://api.taapi.io",
    requiredServerParams: ["TAAPI_SECRET"],
    headers: {},
    routes: {
        getRSI: {
            requestMethod: "GET",
            description: "Relative Strength Index — measures momentum on a 0-100 scale. Above 70 = overbought, below 30 = oversold.",
            route: "/rsi",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(14)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT RSI on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT RSI on 4h with period 21", symbol: "ETH/USDT", interval: "4h", period: 21 }
            ],
            modifiers: []
        },
        getMACD: {
            requestMethod: "GET",
            description: "Moving Average Convergence Divergence — trend-following momentum indicator showing relationship between two EMAs.",
            route: "/macd",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "optInFastPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(12)", "optional()"] } },
                { position: { key: "optInSlowPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(26)", "optional()"] } },
                { position: { key: "optInSignalPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(9)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT MACD on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT MACD on 1d", symbol: "ETH/USDT", interval: "1d" }
            ],
            modifiers: []
        },
        getBollingerBands: {
            requestMethod: "GET",
            description: "Bollinger Bands — volatility bands placed above and below a moving average. Returns upper, middle, and lower bands.",
            route: "/bbands",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(20)", "optional()"] } },
                { position: { key: "stddev", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0.1)", "max(10)", "default(2)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Bollinger Bands on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT Bollinger Bands on 4h period 30", symbol: "ETH/USDT", interval: "4h", period: 30 }
            ],
            modifiers: []
        },
        getEMA: {
            requestMethod: "GET",
            description: "Exponential Moving Average — weighted moving average giving more importance to recent prices.",
            route: "/ema",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(20)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT EMA 20 on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT EMA 50 on 1d", symbol: "ETH/USDT", interval: "1d", period: 50 }
            ],
            modifiers: []
        },
        getSMA: {
            requestMethod: "GET",
            description: "Simple Moving Average — arithmetic mean of prices over a given period.",
            route: "/sma",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(20)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT SMA 20 on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT SMA 200 on 1d", symbol: "ETH/USDT", interval: "1d", period: 200 }
            ],
            modifiers: []
        },
        getStochastic: {
            requestMethod: "GET",
            description: "Stochastic Oscillator — compares closing price to price range over a period. Returns %K and %D values.",
            route: "/stoch",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "kPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(14)", "optional()"] } },
                { position: { key: "dPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(3)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Stochastic on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT Stochastic on 4h", symbol: "ETH/USDT", interval: "4h" }
            ],
            modifiers: []
        },
        getATR: {
            requestMethod: "GET",
            description: "Average True Range — measures market volatility by decomposing the range of an asset price.",
            route: "/atr",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(14)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT ATR on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT ATR on 1d", symbol: "ETH/USDT", interval: "1d" }
            ],
            modifiers: []
        },
        getStochRSI: {
            requestMethod: "GET",
            description: "Stochastic RSI — applies Stochastic formula to RSI values. More sensitive than plain RSI.",
            route: "/stochrsi",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "kPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(3)", "optional()"] } },
                { position: { key: "dPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(3)", "optional()"] } },
                { position: { key: "rsiPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(14)", "optional()"] } },
                { position: { key: "stochPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(2)", "max(200)", "default(14)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT StochRSI on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT StochRSI on 4h", symbol: "ETH/USDT", interval: "4h" }
            ],
            modifiers: []
        },
        getVWAP: {
            requestMethod: "GET",
            description: "Volume Weighted Average Price — average price weighted by volume, used as a trading benchmark.",
            route: "/vwap",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT VWAP on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT VWAP on 4h", symbol: "ETH/USDT", interval: "4h" }
            ],
            modifiers: []
        },
        getIchimoku: {
            requestMethod: "GET",
            description: "Ichimoku Cloud — comprehensive indicator showing support/resistance, momentum, and trend direction. Returns conversion, base, leading span A/B, and lagging span.",
            route: "/ichimoku",
            parameters: [
                { position: { key: "secret", value: "{{TAAPI_SECRET}}", location: "query" } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default('binance')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)", options: [] } },
                { position: { key: "conversionPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(9)", "optional()"] } },
                { position: { key: "basePeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(26)", "optional()"] } },
                { position: { key: "spanPeriod", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(200)", "default(52)", "optional()"] } },
                { position: { key: "backtrack", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/USDT Ichimoku on 1h", symbol: "BTC/USDT", interval: "1h" },
                { _description: "ETH/USDT Ichimoku on 1d", symbol: "ETH/USDT", interval: "1d" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
