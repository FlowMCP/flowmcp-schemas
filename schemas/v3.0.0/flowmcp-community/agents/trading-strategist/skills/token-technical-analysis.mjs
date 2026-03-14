const content = `Perform a complete technical analysis of {{input:tokenSymbol}} on {{input:chain}}.

## Step 1: Token Discovery
Use indicators/tool/searchBySymbol to find {{input:tokenSymbol}} on {{input:chain}}.
Identify the correct contract address by picking the token with the highest total_swaps.
If multiple results exist, note the alternatives and explain why you picked the primary one.

## Step 2: OHLCV Data
Use ohlcv/tool/getRecursiveOhlcvEVM to fetch {{input:timeframeDays}}-day OHLCV data for the identified pair address.
Use timeframe "1d" for daily candles.

## Step 3: Trend Indicators
Use tradingsignals/tool/computeSMA with periods 20 and 50 on closing prices.
Use tradingsignals/tool/computeEMA with period 12 and 26 on closing prices.
Use tradingsignals/tool/computeADX on the OHLCV data to measure trend strength.

## Step 4: Momentum Indicators
Use tradingsignals/tool/computeRSI with period 14 on closing prices.
Use tradingsignals/tool/computeMACD with fast 12, slow 26, signal 9 on closing prices.

## Step 5: Volatility
Use tradingsignals/tool/computeBollingerBands with period 20 on closing prices.

## Step 6: Chart
Use indicators/tool/generateCandlestickChart to create a candlestick chart from the OHLCV data.

## Step 7: Synthesis
Compile findings into a structured report:
- **Token**: Symbol, address, chain, total_swaps, pool_count
- **Trend**: SMA crossover status (20 vs 50), EMA alignment, ADX strength
- **Momentum**: RSI level (overbought >70, oversold <30, neutral 30-70), MACD signal line crossover
- **Volatility**: Bollinger Band width, price position relative to bands
- **Chart**: Include the generated candlestick chart
- **Signal Summary**: Overall assessment (BULLISH / BEARISH / NEUTRAL) with confidence level
- **Key Levels**: Support and resistance from Bollinger Bands and moving averages

End with a disclaimer: This is technical analysis only, not financial advice.`


export const skill = {
    name: 'token-technical-analysis',
    version: 'flowmcp-skill/1.0.0',
    description: 'Full technical analysis pipeline: token discovery, OHLCV fetch, indicator computation, chart generation, and trade signal summary',
    requires: {
        tools: [
            'indicators/tool/searchBySymbol',
            'ohlcv/tool/getRecursiveOhlcvEVM',
            'tradingsignals/tool/computeRSI',
            'tradingsignals/tool/computeMACD',
            'tradingsignals/tool/computeSMA',
            'tradingsignals/tool/computeEMA',
            'tradingsignals/tool/computeBollingerBands',
            'tradingsignals/tool/computeADX',
            'indicators/tool/generateCandlestickChart'
        ],
        resources: [],
        external: []
    },
    input: [
        {
            key: 'tokenSymbol',
            type: 'string',
            description: 'Token symbol to analyze (e.g. WETH, PEPE, USDC)',
            required: true
        },
        {
            key: 'chain',
            type: 'string',
            description: 'Blockchain to analyze on (e.g. ethereum, base, arbitrum)',
            required: true
        },
        {
            key: 'timeframeDays',
            type: 'number',
            description: 'Number of days of historical data to fetch (e.g. 7, 14, 30)',
            required: false
        }
    ],
    output: 'Structured technical analysis report with trend, momentum, volatility indicators, candlestick chart, and BULLISH/BEARISH/NEUTRAL signal summary.',
    content
}
