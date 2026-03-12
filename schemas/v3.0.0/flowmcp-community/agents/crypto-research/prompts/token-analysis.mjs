export const prompt = {
    name: 'token-analysis',
    version: 'flowmcp-prompt/1.0.0',
    agent: 'crypto-research',
    description: 'Deep analysis of a token across price, on-chain, and DeFi data',
    testedWith: 'anthropic/claude-sonnet-4-5-20250929',
    dependsOn: [
        'coingecko-com/tool/simplePrice',
        'coingecko-com/tool/getCoinById',
        'coingecko-com/tool/getCoinMarketChart',
        'coingecko-com/tool/getCoinHistory',
        'etherscan/tool/getContractABI',
        'etherscan/tool/getContractSourceCode',
        'etherscan/tool/getGasOracle',
        'defillama/tool/getProtocolTvl',
        'defillama/tool/getTokenPrices'
    ],
    references: [],
    content: `Perform a comprehensive analysis of [[tokenSymbol]] ([[tokenName]]).

## Step 1: Market Data
Use coingecko-com/tool/simplePrice to fetch the current price of [[tokenId]] in USD.
Then use coingecko-com/tool/getCoinMarketChart to retrieve the [[timeframeDays]]-day price history for [[tokenId]].
Use coingecko-com/tool/getCoinById to get full metadata including market cap, volume, and supply data.

## Step 2: On-Chain Verification
Use etherscan/tool/getContractSourceCode to verify the contract at [[contractAddress]] on Ethereum.
Use etherscan/tool/getContractABI to retrieve the ABI for programmatic analysis.
Use etherscan/tool/getGasOracle to check current Ethereum gas prices for transaction cost estimation.

## Step 3: DeFi Protocol Context
Use defillama/tool/getProtocolTvl to check TVL trends for protocols related to [[tokenSymbol]].
Use defillama/tool/getTokenPrices to cross-reference token pricing from DeFi Llama.

## Step 4: Synthesis
Compile all findings into a structured report with:
- **Price Summary**: Current price, [[timeframeDays]]-day change, volume trends
- **On-Chain Status**: Contract verification, security indicators
- **DeFi Integration**: TVL exposure, protocol relationships
- **Risk Factors**: Identified concerns from any data source
- **Data Sources**: List each API call made with timestamps

Present the report in markdown with tables for comparative metrics.`
}
