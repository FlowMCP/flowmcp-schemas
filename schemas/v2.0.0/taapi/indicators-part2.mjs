// Split from taapi/indicators.mjs
// Part 2 of 2
// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// 10 routes (v2 max: 8) — needs splitting
// Import: import { TRADING_TIMEFRAMES } from '../_shared/tradingTimeframes.mjs'
// Module-level code: 4 lines

export const main = {
    namespace: 'taapi',
    name: 'TAAPI.IO Technical Indicators (Part 2)',
    description: 'Access 208+ technical analysis indicators (RSI, MACD, Bollinger Bands, EMA, SMA and more) via the TAAPI.IO REST API',
    version: '2.0.0',
    docs: ['https://taapi.io/indicators/', 'https://taapi.io/'],
    tags: ['crypto', 'trading', 'indicators', 'cacheTtlFrequent'],
    root: 'https://api.taapi.io',
    requiredServerParams: ['TAAPI_SECRET'],
    routes: {
        getVWAP: {
            method: 'GET',
            path: '/vwap?secret={{TAAPI_SECRET}}',
            description: 'Get the Volume Weighted Average Price (VWAP) for a trading pair. Required: symbol. Optional filters: exchange, interval.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{value:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT VWAP', symbol: 'BTC/USDT' }
            ],
        },
        getIchimoku: {
            method: 'GET',
            path: '/ichimoku?secret={{TAAPI_SECRET}}',
            description: 'Get Ichimoku Cloud indicator values for a trading pair via TAAPI. Supports exchange, interval filters.',
            parameters: [
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(binance)', 'optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1m,5m,15m,30m,1h,2h,4h,12h,1d,1w)', options: ['default(1h)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{conversion:{type:'number'},base:{type:'number'},spanA:{type:'number'},spanB:{type:'number'}}}},
            tests: [
                { _description: 'Get BTC/USDT Ichimoku Cloud', symbol: 'BTC/USDT' },
                { _description: 'Get ETH/USDT Ichimoku on daily', symbol: 'ETH/USDT', interval: '1d' }
            ],
        }
    }
}
