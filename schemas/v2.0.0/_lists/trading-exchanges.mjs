export const list = {
    meta: {
        name: 'tradingExchanges',
        version: '2.0.0',
        description: 'Cryptocurrency exchanges with provider-specific slug mappings.',
        fields: [
            { key: 'alias', type: 'string', optional: false },
            { key: 'ccxtSlug', type: 'string', optional: true },
            { key: 'cryptoWizardsSlug', type: 'string', optional: true }
        ]
    },
    entries: [
        { alias: 'BINANCE', ccxtSlug: 'binance', cryptoWizardsSlug: 'Binance' },
        { alias: 'BINANCE_US', cryptoWizardsSlug: 'BinanceUs' },
        { alias: 'KRAKEN', ccxtSlug: 'kraken' },
        { alias: 'COINBASE', ccxtSlug: 'coinbase', cryptoWizardsSlug: 'Coinbase' },
        { alias: 'BITFINEX', ccxtSlug: 'bitfinex' },
        { alias: 'OKX', ccxtSlug: 'okx' },
        { alias: 'BYBIT', ccxtSlug: 'bybit', cryptoWizardsSlug: 'ByBit' },
        { alias: 'DYDX', cryptoWizardsSlug: 'Dydx' },
        { alias: 'FOREX', cryptoWizardsSlug: 'Forex' },
        { alias: 'STOCKS', cryptoWizardsSlug: 'Stocks' }
    ]
}
