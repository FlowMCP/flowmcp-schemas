// Split from taapi/indicators.mjs
// Part 1 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// 10 routes (v2 max: 8) — needs splitting
// Import: import { TRADING_TIMEFRAMES } from '../_shared/tradingTimeframes.mjs'
// Module-level code: 4 lines

export const main = {
    namespace: 'taapi',
    name: 'TAAPI.IO Technical Indicators (Part 1)',
    description: 'Access 208+ technical analysis indicators (RSI, MACD, Bollinger Bands, EMA, SMA and more) via the TAAPI.IO REST API',
    version: '2.0.0',
    docs: ['https://taapi.io/indicators/', 'https://taapi.io/'],
    tags: ['crypto', 'trading', 'indicators', 'cacheTtlFrequent'],
    root: 'https://api.taapi.io',
    requiredServerParams: ['TAAPI_SECRET'],
    routes: {
        getRSI: {
            method: 'GET',
            path: '/rsi?secret={{TAAPI_SECRET}}',
            description: 'Get the Relative Strength Index (RSI) for a trading pair via TAAPI. Supports exchange, interval, backtrack filters.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'backtrack', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(50)', 'optional()'] } },
                { position: { key: 'optInTimePeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2)', 'max(100)', 'default(14)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{value:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT RSI on Binance (1h)', symbol: 'BTC/USDT' },
                { _description: 'Get ETH/USDT RSI on daily timeframe', symbol: 'ETH/USDT', interval: '1d' }
            ],
        },
        getMACD: {
            method: 'GET',
            path: '/macd?secret={{TAAPI_SECRET}}',
            description: 'Get the Moving Average Convergence Divergence (MACD) for a trading pair. Required: symbol. Optional filters: exchange, interval, backtrack.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'backtrack', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(50)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{valueMACD:{type:'number'},valueMACDSignal:{type:'number'},valueMACDHist:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT MACD on Binance', symbol: 'BTC/USDT' },
                { _description: 'Get ETH/USDT MACD on 4h timeframe', symbol: 'ETH/USDT', interval: '4h' }
            ],
        },
        getBollingerBands: {
            method: 'GET',
            path: '/bbands?secret={{TAAPI_SECRET}}',
            description: 'Get Bollinger Bands (upper, middle, lower) for a trading pair. Required: symbol. Optional filters: exchange, interval, optInTimePeriod.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'optInTimePeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2)', 'max(100)', 'default(20)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{valueUpperBand:{type:'number'},valueMiddleBand:{type:'number'},valueLowerBand:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT Bollinger Bands', symbol: 'BTC/USDT' }
            ],
        },
        getEMA: {
            method: 'GET',
            path: '/ema?secret={{TAAPI_SECRET}}',
            description: 'Get the Exponential Moving Average (EMA) for a trading pair via TAAPI. Supports exchange, interval, optInTimePeriod filters.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'optInTimePeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2)', 'max(200)', 'default(20)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{value:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT 20-period EMA', symbol: 'BTC/USDT' },
                { _description: 'Get ETH/USDT 50-period EMA', symbol: 'ETH/USDT', optInTimePeriod: 50 }
            ],
        },
        getSMA: {
            method: 'GET',
            path: '/sma?secret={{TAAPI_SECRET}}',
            description: 'Get the Simple Moving Average (SMA) for a trading pair via TAAPI. Supports exchange, interval, optInTimePeriod filters.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'optInTimePeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2)', 'max(200)', 'default(20)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{value:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT 20-period SMA', symbol: 'BTC/USDT' },
                { _description: 'Get BTC/USDT 200-period SMA daily', symbol: 'BTC/USDT', optInTimePeriod: 200, interval: '1d' }
            ],
        },
        getStochastic: {
            method: 'GET',
            path: '/stoch?secret={{TAAPI_SECRET}}',
            description: 'Get Stochastic oscillator (K and D values) for a trading pair. Required: symbol. Optional filters: exchange, interval.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{valueK:{type:'number'},valueD:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT Stochastic oscillator', symbol: 'BTC/USDT' }
            ],
        },
        getATR: {
            method: 'GET',
            path: '/atr?secret={{TAAPI_SECRET}}',
            description: 'Get the Average True Range (ATR) volatility indicator for a trading pair. Required: symbol. Optional filters: exchange, interval, optInTimePeriod.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } },
                { position: { key: 'optInTimePeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2)', 'max(100)', 'default(14)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{value:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT Average True Range', symbol: 'BTC/USDT' }
            ],
        },
        getStochRSI: {
            method: 'GET',
            path: '/stochrsi?secret={{TAAPI_SECRET}}',
            description: 'Get the Stochastic RSI for a trading pair via TAAPI. Supports exchange, interval filters.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{valueFastK:{type:'number'},valueFastD:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT Stochastic RSI', symbol: 'BTC/USDT' }
            ],
        }
    }
}
