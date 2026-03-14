export const prompt = {
    name: 'price-comparison',
    version: 'flowmcp-prompt/1.0.0',
    provider: 'coingecko',
    description: 'Compare price performance of multiple tokens over a given time period',
    testedWith: 'anthropic/claude-sonnet-4-5-20250929',
    dependsOn: [
        'coingecko.getSimplePrice',
        'coingecko.getCoinsMarkets',
        'coingecko.getCoinMarketChart'
    ],
    references: [],
    content: `Compare the price performance of the following tokens: {{input:tokenList}}.

## Step 1: Current Prices
Use coingecko.getSimplePrice to fetch current USD prices for all tokens in a single call.

## Step 2: Market Rankings
Use coingecko.getCoinsMarkets to retrieve market cap, 24h volume, and circulating supply for each token. Sort by market cap descending.

## Step 3: Historical Performance
For each token, use coingecko.getCoinMarketChart with {{input:timeframeDays}} days to get the price history.

## Step 4: Comparison Report
Create a comparison table with:
| Token | Price (USD) | 24h Change | {{input:timeframeDays}}d Change | Market Cap | Volume/MCap Ratio |

Identify:
- Best performer over {{input:timeframeDays}} days
- Highest volume relative to market cap (potential momentum indicator)
- Any significant price divergences between correlated tokens

Present the data in a clear markdown table with percentage changes formatted to 2 decimal places.`
}
