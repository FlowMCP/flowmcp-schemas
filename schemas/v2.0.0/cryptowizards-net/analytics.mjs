// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { TRADING_TIMEFRAMES } from '../_shared/tradingTimeframes.mjs'
// Import: import { TRADING_EXCHANGES } from '../_shared/tradingExchanges.mjs'
// Module-level code: 14 lines

export const main = {
    namespace: 'cryptowizards',
    name: 'CryptoWizards Analytics API',
    description: 'Statistical finance endpoints for backtesting, correlation, cointegration, and copula analysis using real market data.',
    version: '2.0.0',
    docs: ['https://api.cryptowizards.net', 'https://github.com/cryptowizards'],
    tags: ['production', 'analytics', 'trading', 'backtest', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'tradingTimeframes', version: '2.0.0' },
        { ref: 'tradingExchanges', version: '2.0.0' }
    ],
    root: 'https://api.cryptowizards.net',
    requiredServerParams: ['CRYPTOWIZARDS_API_KEY'],
    headers: {
        'X-api-key': '{{CRYPTOWIZARDS_API_KEY}}'
    },
    routes: {
        runBacktest: {
            method: 'GET',
            path: '/v1beta/backtest',
            description: 'Runs a backtest using real market data from exchanges with comprehensive trading metrics.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } },
                { position: { key: 'strategy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Spread,ZScoreRoll,Copula)', options: [] } },
                { position: { key: 'spread_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Dynamic,Ou,Static)', options: ['default(Dynamic)', 'optional()'] } },
                { position: { key: 'roll_w', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(42)', 'optional()'] } },
                { position: { key: 'with_history', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)', 'optional()'] } },
                { position: { key: 'entry_level', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'exit_level', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'x_weighting', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0.5)', 'optional()'] } },
                { position: { key: 'slippage_rate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'commission_rate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'stop_loss_rate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH pair trading backtest',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'BinanceUs',
                    interval: '1d',
                    period: 365,
                    strategy: 'ZScoreRoll',
                    spread_type: 'Static',
                    with_history: false
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { strat_returns: { type: 'object', properties: { annual_return: { type: 'number' }, mean_period_return: { type: 'number' }, total_return: { type: 'number' } } }, max_drawdown: { type: 'number' }, sharpe_ratio: { type: 'number' }, sortino_ratio: { type: 'number' }, cvar: { type: 'number' }, var: { type: 'number' }, win_rate: { type: 'number' } } },
                        history: { type: 'string', nullable: true }
                    }
                }
            },
        },
        checkCointegration: {
            method: 'GET',
            path: '/v1beta/cointegration',
            description: 'Performs Engle-Granger cointegration test using real market data from exchanges.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } },
                { position: { key: 'spread_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Dynamic,Ou,Static)', options: ['default(Dynamic)', 'optional()'] } },
                { position: { key: 'roll_w', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(42)', 'optional()'] } },
                { position: { key: 'with_history', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH cointegration analysis',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'Binance',
                    interval: '1d',
                    period: 365,
                    spread_type: 'Static',
                    with_history: false
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { p_value: { type: 'number' }, t_stat: { type: 'number' }, cv: { type: 'number' }, is_coint: { type: 'boolean' }, inc_trend: { type: 'boolean' } } },
                        history: { type: 'string', nullable: true }
                    }
                }
            },
        },
        getCorrelations: {
            method: 'GET',
            path: '/v1beta/correlations',
            description: 'Computes Pearson, Spearman and Kendall correlations using real market data from exchanges.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH correlation analysis',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'Binance',
                    interval: '1d',
                    period: 365
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kendall: { type: 'number' },
                        spearman: { type: 'number' },
                        pearson: { type: 'number' }
                    }
                }
            },
        },
        analyzeCopula: {
            method: 'GET',
            path: '/v1beta/copula',
            description: 'Computes copula-based dependency modeling using real market data from exchanges.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH copula dependency analysis',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'Binance',
                    interval: '1d',
                    period: 365
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        copula_name: { type: 'string' },
                        u1_given_u2: { type: 'number' },
                        u2_given_u1: { type: 'number' }
                    }
                }
            },
        },
        analyzeSpread: {
            method: 'GET',
            path: '/v1beta/spread',
            description: 'Calculates spread metrics using real market data with Dynamic, OU, or Static methods.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } },
                { position: { key: 'spread_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Dynamic,Ou,Static)', options: ['default(Dynamic)', 'optional()'] } },
                { position: { key: 'roll_w', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(42)', 'optional()'] } },
                { position: { key: 'with_history', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH spread analysis',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'Binance',
                    interval: '1d',
                    period: 365,
                    spread_type: 'Static',
                    with_history: false
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        spread: { type: 'array', items: { type: 'string' } },
                        zscore: { type: 'array', items: { type: 'string' } },
                        zscore_roll: { type: 'array', items: { type: 'string' } },
                        hedge_ratio: { type: 'number' },
                        half_life: { type: 'number' },
                        hurst: { type: 'number' },
                        sigma0crossings: { type: 'number' },
                        sigma2crossings: { type: 'number' },
                        log_used: { type: 'boolean' },
                        last_zscore: { type: 'object', properties: { zscore: { type: 'number' }, zscore_roll: { type: 'number' } } }
                    }
                }
            },
        },
        analyzeZScores: {
            method: 'GET',
            path: '/v1beta/zscores',
            description: 'Computes rolling z-scores using real market data to identify trading opportunities.',
            parameters: [
                { position: { key: 'symbol_1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'symbol_2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'exchange', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Binance,BinanceUs,Coinbase,ByBit,Dydx,Forex,Stocks)', options: [] } },
                { position: { key: 'interval', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,1h,1d)', options: [] } },
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(30)', 'max(1000)'] } },
                { position: { key: 'spread_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Dynamic,Ou,Static)', options: ['default(Dynamic)', 'optional()'] } },
                { position: { key: 'roll_w', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(42)', 'optional()'] } },
                { position: { key: 'with_history', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(false)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'BTC/ETH z-score analysis',
                    symbol_1: 'BTCUSDT',
                    symbol_2: 'ETHUSDT',
                    exchange: 'Binance',
                    interval: '1d',
                    period: 365,
                    spread_type: 'Static',
                    with_history: false
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { zscore: { type: 'number' }, zscore_roll: { type: 'number' } } },
                        history: { type: 'string', nullable: true }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const TRADING_TIMEFRAMES = sharedLists['tradingTimeframes']
    const TRADING_EXCHANGES = sharedLists['tradingExchanges']

    const cwExchanges = TRADING_EXCHANGES
        .filter( ( e ) => e.cryptoWizardsSlug !== undefined )
        .reduce( ( acc, e ) => {
            acc[ e.alias ] = e.cryptoWizardsSlug
            return acc
        }, {} )
    const cwTimeframes = TRADING_TIMEFRAMES
        .filter( ( t ) => t.cryptoWizardsSlug !== undefined )
        .reduce( ( acc, t ) => {
            acc[ t.alias ] = t.cryptoWizardsSlug
            return acc
        }, {} )
    const cwExchangeEnum = 'enum(' + Object.keys( cwExchanges ).join( ',' ) + ')'
    const cwIntervalEnum = 'enum(' + Object.keys( cwTimeframes ).join( ',' ) + ')'

    return {
        runBacktest: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        },
        checkCointegration: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        },
        getCorrelations: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        },
        analyzeCopula: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        },
        analyzeSpread: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        },
        analyzeZScores: {
            preRequest: async ( { struct, payload } ) => {
                const { exchange, interval } = payload
                const exchangeSlug = cwExchanges[ exchange ]
                const intervalSlug = cwTimeframes[ interval ]

                if( exchangeSlug ) {
                struct.url = struct.url.replace( `exchange=${exchange}`, `exchange=${exchangeSlug}` )
                }
                if( intervalSlug ) {
                struct.url = struct.url.replace( `interval=${interval}`, `interval=${intervalSlug}` )
                }

                return { struct }
            }
        }
    }
}
