export const schema = {
    namespace: "cryptowizards",
    name: "CryptoWizards Analytics API",
    description: "Statistical finance endpoints for backtesting, correlation, cointegration, and copula analysis using real market data.",
    docs: ["https://api.cryptowizards.net", "https://github.com/cryptowizards"],
    tags: ["production", "analytics", "trading", "backtest", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.cryptowizards.net",
    requiredServerParams: ["CRYPTOWIZARDS_API_KEY"],
    headers: { "X-api-key": "{{CRYPTOWIZARDS_API_KEY}}" },
    routes: {
        runBacktest: {
            requestMethod: "GET",
            description: "Runs a backtest using real market data from exchanges with comprehensive trading metrics.",
            route: "/v1beta/backtest",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } },
                { position: { key: "strategy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Spread,ZScoreRoll,Copula)", options: [] } },
                { position: { key: "spread_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Dynamic,Ou,Static)", options: ["default(Dynamic)", "optional()"] } },
                { position: { key: "roll_w", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(42)", "optional()"] } },
                { position: { key: "with_history", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } },
                { position: { key: "entry_level", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "exit_level", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "x_weighting", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(0.5)", "optional()"] } },
                { position: { key: "slippage_rate", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "commission_rate", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "stop_loss_rate", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "BTC/ETH pair trading backtest", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "BinanceUs", interval: "Daily", period: 365, strategy: "ZScoreRoll", spread_type: "Static", with_history: false }
            ],
            modifiers: []
        },
        checkCointegration: {
            requestMethod: "GET",
            description: "Performs Engle-Granger cointegration test using real market data from exchanges.",
            route: "/v1beta/cointegration",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } },
                { position: { key: "spread_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Dynamic,Ou,Static)", options: ["default(Dynamic)", "optional()"] } },
                { position: { key: "roll_w", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(42)", "optional()"] } },
                { position: { key: "with_history", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/ETH cointegration analysis", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "Binance", interval: "Daily", period: 365, spread_type: "Static", with_history: false }
            ],
            modifiers: []
        },
        getCorrelations: {
            requestMethod: "GET",
            description: "Computes Pearson, Spearman and Kendall correlations using real market data from exchanges.",
            route: "/v1beta/correlations",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } }
            ],
            tests: [
                { _description: "BTC/ETH correlation analysis", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "Binance", interval: "Daily", period: 365 }
            ],
            modifiers: []
        },
        analyzeCopula: {
            requestMethod: "GET",
            description: "Computes copula-based dependency modeling using real market data from exchanges.",
            route: "/v1beta/copula",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } }
            ],
            tests: [
                { _description: "BTC/ETH copula dependency analysis", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "Binance", interval: "Daily", period: 365 }
            ],
            modifiers: []
        },
        analyzeSpread: {
            requestMethod: "GET",
            description: "Calculates spread metrics using real market data with Dynamic, OU, or Static methods.",
            route: "/v1beta/spread",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } },
                { position: { key: "spread_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Dynamic,Ou,Static)", options: ["default(Dynamic)", "optional()"] } },
                { position: { key: "roll_w", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(42)", "optional()"] } },
                { position: { key: "with_history", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/ETH spread analysis", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "Binance", interval: "Daily", period: 365, spread_type: "Static", with_history: false }
            ],
            modifiers: []
        },
        analyzeZScores: {
            requestMethod: "GET",
            description: "Computes rolling z-scores using real market data to identify trading opportunities.",
            route: "/v1beta/zscores",
            parameters: [
                { position: { key: "symbol_1", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "symbol_2", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Binance,BinanceUs,ByBit,Coinbase,Dydx,Forex,Stocks)", options: [] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Daily,Hourly,Min5)", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(30)", "max(1000)"] } },
                { position: { key: "spread_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Dynamic,Ou,Static)", options: ["default(Dynamic)", "optional()"] } },
                { position: { key: "roll_w", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["default(42)", "optional()"] } },
                { position: { key: "with_history", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } }
            ],
            tests: [
                { _description: "BTC/ETH z-score analysis", symbol_1: "BTCUSDT", symbol_2: "ETHUSDT", exchange: "Binance", interval: "Daily", period: 365, spread_type: "Static", with_history: false }
            ],
            modifiers: []
        }
    },
    handlers: {}
}