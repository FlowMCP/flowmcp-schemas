export const main = {
    name: 'trading-strategist',
    version: 'flowmcp/3.0.0',
    description: 'Trading strategy agent combining token discovery, OHLCV price data, technical indicators, and chart generation for multi-chain token analysis and trade signal detection',
    model: 'anthropic/claude-sonnet-4-5-20250929',
    systemPrompt: 'You are a trading strategy analyst specializing in cryptocurrency technical analysis across EVM and Solana chains. Follow this workflow: 1) When a user mentions a token by name, first search for it using token search to find the correct contract address and chain. Use total_swaps and pool_count to identify the most relevant token among duplicates. 2) Fetch OHLCV data for the identified token. 3) Run technical indicators (RSI, MACD, Bollinger Bands, moving averages) on the price data. 4) Generate a candlestick chart for visual confirmation. 5) Present a structured analysis with: current trend direction, key support/resistance levels, indicator signals (bullish/bearish/neutral), and a summary recommendation. Always state your timeframe, cite which indicators you used, and note that this is technical analysis only — not financial advice. When comparing tokens across chains, normalize to the same timeframe and denomination.',
    tools: [
        'indicators/tool/searchBySymbol',
        'indicators/tool/searchByAddress',
        'indicators/tool/getChainStats',
        'indicators/tool/generateCandlestickChart',
        'ohlcv/tool/getRecursiveOhlcvEVM',
        'ohlcv/tool/getOhlcvSolana',
        'tradingsignals/tool/computeRSI',
        'tradingsignals/tool/computeMACD',
        'tradingsignals/tool/computeSMA',
        'tradingsignals/tool/computeEMA',
        'tradingsignals/tool/computeBollingerBands',
        'tradingsignals/tool/computeADX',
        'tradingsignals/tool/computeATR',
        'tradingsignals/tool/computeStochasticOscillator',
        'tradingsignals/tool/computeOBV',
        'tradingsignals/tool/computeVWAP',
        'tradingsignals/tool/computePSAR',
        'coingecko/tool/getSimplePrice',
        'coingecko/tool/getCoinsMarkets',
        'yfinance/tool/getOhlcv'
    ],
    resources: {},
    prompts: {},
    skills: {
        'token-technical-analysis': { file: './skills/token-technical-analysis.mjs' }
    },
    tests: [
        {
            _description: 'Token discovery — user asks about a token by name, agent finds addresses across chains',
            input: 'Find all PEPE tokens and show me which chains they are on with the most active ones first',
            expectedTools: [
                'indicators/tool/searchBySymbol'
            ],
            expectedContent: [
                'PEPE',
                'swaps',
                'chain'
            ]
        },
        {
            _description: 'Single token technical analysis — full pipeline from discovery to chart',
            input: 'Analyze WETH on Ethereum: get the last 7 days of price data, compute RSI and MACD, and generate a candlestick chart',
            expectedTools: [
                'indicators/tool/searchBySymbol',
                'ohlcv/tool/getRecursiveOhlcvEVM',
                'tradingsignals/tool/computeRSI',
                'tradingsignals/tool/computeMACD',
                'indicators/tool/generateCandlestickChart'
            ],
            expectedContent: [
                'RSI',
                'MACD',
                'chart'
            ]
        },
        {
            _description: 'Multi-indicator trend assessment — combining trend and momentum indicators',
            input: 'Is USDC/WETH on Base in an uptrend or downtrend? Use SMA, EMA, Bollinger Bands and ADX to assess',
            expectedTools: [
                'indicators/tool/searchBySymbol',
                'ohlcv/tool/getRecursiveOhlcvEVM',
                'tradingsignals/tool/computeSMA',
                'tradingsignals/tool/computeEMA',
                'tradingsignals/tool/computeBollingerBands',
                'tradingsignals/tool/computeADX'
            ],
            expectedContent: [
                'trend',
                'SMA',
                'Bollinger'
            ]
        },
        {
            _description: 'Cross-market comparison — traditional vs crypto using different data sources',
            input: 'Compare the current price momentum of BTC-USD from Yahoo Finance with on-chain WBTC data from CoinGecko',
            expectedTools: [
                'yfinance/tool/getOhlcv',
                'coingecko/tool/getSimplePrice'
            ],
            expectedContent: [
                'BTC',
                'price'
            ]
        }
    ],
    sharedLists: [
        'evmChains'
    ]
}
