# FlowMCP Schema Library

This repository contains a comprehensive collection of schema modules designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework for adapting and standardizing REST APIs for interaction with AI systems.

Each schema describes the structure, routes, parameters, and integration requirements of a specific API provider, allowing them to be seamlessly activated and queried via the MCP interface.

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

| Namespace | Schema Name | Route Names Count | Route Names (shortened) | Required Server Params | Tags |
|-----------|--------------|-------------------|--------------------------|-------------------------|------|
| alternative | fearAndGreed.mjs | 3 | getCurrentFng, getHistoricalFng, analyzeFngTrend |  |  |
| blocknative | gasprice.mjs | 1 | getGasPrices | BLOCKNATIVE_API_KEY | new |
| bscscan | getContractBinance.mjs | 2 | getContractABI, getContractSourceCode | BSCSCAN_API_KEY | test |
| chainlink | getLatestPrices.mjs | 14 | getAvailableChains, getAvailableFeedsForChain, getLatestPriceEthereum, getLatestPriceBinance, getLatestPricePolygon, getLatestPriceAvalanche, getLatestPriceAribitrum, getLatestPriceOptimism, getLatestPriceBase, getLatestPriceLinea, getLatestPriceMantle, getLatestPriceScroll, getLatestPriceZksync, getLatestPriceCelo | INFURA_API_KEY | chainlink.getAvailableChains |
| coincap | assets.mjs | 4 | listAssets, singleAsset, assetMarkets, assetHistory | COINCAP_API_KEY |  |
| coincap | exchanges.mjs | 2 | listExchanges, getExchangeById | COINCAP_API_KEY |  |
| coincap | markets.mjs | 1 | listMarkets | COINCAP_API_KEY |  |
| coincap | rates.mjs | 2 | listRates, getRateBySlug | COINCAP_API_KEY |  |
| coingecko | coins.mjs | 7 | getCoinsList, getCoinsMarkets, getCoinById, getCoinMarketChart, getCoinHistory, getCoinTickers, getCoinContractInfo |  |  |
| coingecko | derivatives.mjs | 3 | getDerivativeExchangeIds, getDerivativeExchangesByIds, getDerivativeProductsByExchangeId |  |  |
| coingecko | exchanges.mjs | 3 | getExchangesList, getExchangeById, getExchangeTickers |  |  |
| coingecko | getCategories.mjs | 2 | getAvailableCoinCategoryIds, getCoinCategoryDetailsByIds |  |  |
| coingecko | global.mjs | 2 | getGlobalData, getDeFiGlobalData |  |  |
| coingecko | simplePrice.mjs | 2 | getSimplePrice, getTokenPrice |  |  |
| coingecko | trending.mjs | 3 | getTrendingCoins, getTrendingNfts, getTrendingCategories |  |  |
| coinmarketcap | category.mjs | 5 | getCategories, getCategory, getIdMap, getMetadataV2, getQuotesLatestV2 | CMC_API_KEY |  |
| coinmarketcap | cmc-index.mjs | 2 | getHistorical, getLatest | CMC_API_KEY |  |
| coinmarketcap | fear-and-greed.mjs | 2 | getFearAndGreedHistorical, getFearAndGreedLatest | CMC_API_KEY |  |
| coinmarketcap | listings.mjs | 1 | listingsLatest | CMC_API_KEY |  |
| cryptodata | mixed.mjs | 18 | getCoins, getCoinById, getCoinChartById, getCoinAvgPrice, getCoinExchangePrice, getTickerExchanges, getTickerMarkets, getBlockchains, getWalletBalance, getWalletBalances, getExchanges, getFiatCurrencies, getNewsSources, getNews, getNewsByType, getNewsById, getMarketCap, getCurrencies | COINSTATS_API_KEY | production, data.getCoins |
| cointelegraph | getLatestNews.mjs | 1 | getLatestNews |  |  |
| context7 | getDocumentation.mjs | 2 | searchLibraryId, getLibraryDocs |  |  |
| cryptopanic | getNews.mjs | 1 | getCryptoCryptopanicNews | CRYPTOPANIC_API_KEY |  |
| defillama | api.mjs | 3 | getProtocols, getProtocolTvl, getChainTvl |  |  |
| defillama | coins.mjs | 1 | getTokenPrices |  |  |
| defillama | yields.mjs | 2 | getPools, getPoolTvl |  |  |
| dexscreener | boosted.mjs | 2 | getLatestBoostedTokens, getMostActiveBoostedTokens |  |  |
| dexscreener | pairs.mjs | 2 | getPairByChainAndAddress, checkTokenOrders |  |  |
| dexscreener | tokenInfo.mjs | 4 | getLatestTokenProfiles, searchPairs, getPairsByToken, getTokenPools |  |  |
| duneAnalytics | farcaster.mjs | 3 | farcasterGetTrendingMemecoins, farcasterGetTrendingChannels, farcasterGetTrendingUsers | DUNE_API_KEY |  |
| duneAnalytics | getResults.mjs | 1 | getLatestResult | DUNE_API_KEY |  |
| duneAnalytics | trendingContracts.mjs | 3 | getDexPairStats, getTrendingContracts, getMarketShare | DUNE_API_KEY |  |
| profilejump | profileJump.mjs | 5 | prices, hotProfiles, tokensList, profilesList, profileByAddress |  |  |
| luksoNetwork | universalProfile.mjs | 3 | readProfileData, fetchProfileMetadata, getUniversalReceiverAddress |  |  |
| etherscan | getContractEthereum.mjs | 2 | getContractABI, getContractSourceCode | ETHERSCAN_API_KEY |  |
| etherscan | getContractMultichain.mjs | 3 | getAvailableChains, getSmartContractAbi, getSourceCode | ETHERSCAN_API_KEY |  |
| etherscan | getGaspriceMultichain.mjs | 2 | getGasOracle, estimateGasCost | ETHERSCAN_API_KEY |  |
| indicatorts | indicatorts-schema.mjs | 78 | getAbsolutePriceOscillator, getAbsolutePriceOscillatorStrategy, getAccelerationBands, getAccelerationBandsStrategy, getAccumulationDistribution, getAroon, getAroonStrategy, getAverageTrueRange, getAwesomeOscillator, getAwesomeOscillatorStrategy, getBalanceOfPower, getBalanceOfPowerStrategy, getBollingerBands, getBollingerBandsStrategy, getBollingerBandsWidth, getChaikinMoneyFlow, getChaikinMoneyFlowStrategy, getChaikinOscillator, getChandeForecastOscillator, getChandeForecastOscillatorStrategy, getChandelierExit, getCommunityChannelIndex, getDonchianChannel, getDoubleExponentialMovingAverage, getEaseOfMovement, getEaseOfMovementStrategy, getExponentialMovingAverage, getForceIndex, getForceIndexStrategy, getIchimokuCloud, getIchimokuCloudStrategy, getKdjStrategy, getKeltnerChannel, getMassIndex, getMoneyFlowIndex, getMoneyFlowIndexStrategy, getMovingAverageConvergenceDivergence, getMovingAverageConvergenceDivergenceStrategy, getMovingChandeForecastOscillator, getMovingMax, getMovingMin, getMovingStandardDeviation, getMovingSum, getNegativeVolumeIndex, getNegativeVolumeIndexStrategy, getOnBalanceVolume, getParabolicSar, getParabolicSARStrategy, getPercentagePriceOscillator, getPercentageVolumeOscillator, getPriceRateOfChange, getProjectionOscillator, getProjectionOscillatorStrategy, getQstick, getRandomIndex, getRelativeStrengthIndex, getRollingMovingAverage, getRsi2Strategy, getSimpleMovingAverage, getSince, getStochasticOscillator, getStochasticOscillatorStrategy, getTriangularMovingAverage, getTripleExponentialAverage, getTripleExponentialMovingAverage, getTrueRange, getTypicalPrice, getTypicalPriceStrategy, getUlcerIndex, getVolumePriceTrend, getVolumeWeightedAveragePrice, getVolumeWeightedAveragePriceStrategy, getVolumeWeightedMovingAverage, getVolumeWeightedMovingAverageStrategy, getVortex, getVortexStrategy, getWilliamsR, getWilliamsRStrategy |  |  |
| jupiter | jupiter-all.mjs | 7 | getTokenPrice, getTokenInfo, getTokensInMarket, getAllTradableTokens, getTaggedTokens, getNewTokens, getAllTokens |  |  |
| llama | getPools.mjs | 2 | getProjectsByName, getPools |  |  |
| luksoNetwork | address.mjs | 12 | listAddresses, getAddress, getAddressCounters, getAddressTransactions, getAddressTokenTransfers, getAddressInternalTxs, getAddressLogs, getBlocksValidated, getTokenBalances, getFlatTokenBalances, getCoinBalanceHistory, getCoinBalanceByDay |  |  |
| luksoNetwork | blocks.mjs | 4 | getBlocks, getBlockById, getBlockTransactions, getBlockWithdrawals |  |  |
| luksoNetwork | graphql.mjs | 2 | getLuksoExplorerSchema, fectchLuksoExplorer |  |  |
| luksoNetwork | internal.mjs | 2 | getMainPageTransactions, getMainPageBlocks |  |  |
| luksoNetwork | nfts.mjs | 7 | getNFTsByAddress, getNFTCollectionsByAddress, getNFTInstancesByContract, getNFTInstanceById, getNFTInstanceTransfers, getNFTInstanceHolders, getNFTInstanceTransfersCount |  |  |
| luksoNetwork | search.mjs | 2 | search, searchRedirect |  |  |
| luksoNetwork | sourceCode.mjs | 4 | listcontracts, getabi, getsourcecode, getcontractcreation |  |  |
| luksoNetwork | stats.mjs | 3 | getStats, getTransactionChart, getMarketChart |  |  |
| luksoNetwork | tokens.mjs | 5 | listTokens, getTokenByAddress, getTokenTransfersByAddress, getTokenHolders, getTokenCounters |  |  |
| luksoNetwork | transactions.mjs | 7 | getTransactions, getTransactionByHash, getTokenTransfersByTransactionHash, getInternalTransactions, getLogs, getRawTrace, getStateChanges |  |  |
| memoryLol | twitterNameChanges.mjs | 1 | queryUsernameChanges |  |  |
| moralis | blockchainApi.mjs | 7 | /block/:block_number_or_hash, /dateToBlock, /transaction/:transaction_hash/verbose, /:address/verbose, /latestBlockNumber/:chain, /transaction/:transaction_hash, /:address | MORALIS_API_KEY |  |
| moralis | defiApi.mjs | 3 | /wallets/:address/defi/:protocol/positions, /wallets/:address/defi/positions, /wallets/:address/defi/summary | MORALIS_API_KEY |  |
| moralis | entity.mjs | 1 | /entities/categories | MORALIS_API_KEY |  |
| moralis | nftApi.mjs | 20 | /market-data/nfts/top-collections, /market-data/nfts/hottest-collections, /nft/:address, /nft/:address/stats, /nft/:address/metadata, /nft/:address/transfers, /nft/:address/:token_id, /nft/:address/owners, /nft/:address/:token_id/owners, /nft/:address/:token_id/trades, /wallets/:address/nfts/trades, /nft/:address/trades, /nft/:address/traits/paginate, /nft/:address/traits, /nft/:address/:token_id/transfers, /:address/nft/collections, /:address/nft/transfers, /:address/nft, /nft/:address/:token_id/metadata/resync, /nft/:address/traits/resync | MORALIS_API_KEY |  |
| moralis | priceApi.mjs | 7 | /nft/:address/price, /nft/:address/floor-price, /nft/:address/:token_id/floor-price, /nft/:address/floor-price/historical, /nft/:address/:token_id/price, /pairs/:address/ohlcv, /erc20/:address/price | MORALIS_API_KEY |  |
| moralis | tokenApi.mjs | 16 | /:pair_address/reserves, /pairs/:address/snipers, /pairs/:address/swaps, /wallets/:address/swaps, /tokens/:address/analytics, /erc20/:token_address/owners, /erc20/metadata/symbols, /erc20/metadata, /erc20/:address/stats, /erc20/:address/transfers, /market-data/erc20s/top-tokens, /erc20/:address/top-gainers, /wallets/:address/approvals, /wallets/:address/tokens, /:address/erc20, /:address/erc20/transfers | MORALIS_API_KEY |  |
| moralis | utils.mjs | 2 | /info/endpointWeights, /web3/version | MORALIS_API_KEY |  |
| moralis | walletApi.mjs | 11 | /wallets/:address/chains, /:address/balance, /wallets/:address/history, /wallets/:address/net-worth, /wallets/:address/profitability/summary, /wallets/:address/profitability, /wallets/:address/stats, /resolve/:address/domain, /resolve/:address/reverse, /resolve/:domain, /resolve/ens/:domain | MORALIS_API_KEY |  |
| newsdata | getNews.mjs | 2 | getLatestNewsdata, getCryptoNewsdata | NEWSDATA_API_KEY |  |
| ohlcv | olhcv-moralis-evm.mjs | 1 | getRecursiveOhlcvEVM | MORALIS_API_KEY |  |
| ohlcv | olhcv-moralis-solana.mjs | 1 | getRecursiveOhlcvSolana | MORALIS_API_KEY |  |
| ohlcv | olhcv-solana-tracker.mjs | 1 | getOhlcvSolana | SOLANA_TRACKER_API_KEY |  |
| poap | graphql.mjs | 5 | getTypename, getSchemaDefinition, getPredefinedQueryList, executePrefinedQuery, querySubgraph |  | production, graphql, poap |
| polymarket | marketInfo.mjs | 2 | getMarkets, getMarketInfo |  |  |
| polymarket | searchBySlug.mjs | 1 | searchBySlug |  |  |
| redditScanner | getTokenMentions.mjs | 2 | getTokenMentions, getHotMemes |  |  |
| santiment | schema.mjs | 5 | get_sentiment_balance, get_social_volume, alert_social_shift, get_trending_words, get_social_dominance | SANTIMENT_API_KEY |  |
| solanatracker | --additionalRoutes.mjs | 2 | tokenStats, tokenStatsByPool | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --chartRoutes.mjs | 2 | chartData, chartDataByPool | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --pnlRoutes.mjs | 3 | profitAndLossData, pnlForSpecificToken, firstBuyers | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --priceEndpoints.mjs | 7 | priceInformation, postPrice, multiPriceInformation, getHistoricPrice, getPriceAtTimestamp, getPriceRange, postMultiPrice | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --tokenEndpoints.mjs | 15 | tokenInformation, tokenHolders, topTokenHolders, allTimeHighPrice, tokensByDeployer, search, latestTokens, multipleTokens, trendingTokens, tokensByVolume, tokenOverview, graduatedTokens, tokenByPool, trendingTokensByTimeframe, tokensByVolumeTimeframe | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --topTraderRoutes.mjs | 3 | topTradersAll, topTradersAllPaged, topTradersByToken | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --tradeEndpoints.mjs | 4 | tokenTrades, tradesByWallet, tokenPoolTrades, userPoolTrades | SOLANA_TRACKER_API_KEY |  |
| solanatracker | --walletEndpoints.mjs | 4 | walletInformation, walletTokensBasic, walletTokensPaged, walletTrades | SOLANA_TRACKER_API_KEY |  |
| solscan | getChainInfo.mjs | 1 | chainInfo | SOLSCAN_API_KEY |  |
| solsniffer | analysis.mjs | 1 | analysisToken | SOLSNIFFER_API_KEY |  |
| thegraph | getNewUniswapPools.mjs | 1 | getNewPools | THEGRAPH_API_KEY |  |
| thegraph | getSchema.mjs | 2 | getSubgraphSchema, querySubgraph | THEGRAPH_API_KEY |  |
| twitter | search.mjs | 1 | searchRecentTweets | TWITTER_BEARER_TOKEN |  |


---

## 🚀 Example: Start Server with All Schemas

This script loads and activates all available schemas into a local MCP-compatible server.

File: `2-start-server.mjs`

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { FlowMCP, Server } from 'flowmcp'
import { fileURLToPath } from 'url'
import path from 'path'

const config = {
    name: 'Test',
    description: 'This is a development server for testing purposes.',
    version: '1.2.0'
}

Server
  .getArgvParameters({
      argv: process.argv,
      includeNamespaces: [],
      excludeNamespaces: [],
      activateTags: []
  })
  .prepare({
      scriptRootFolder: path.dirname(fileURLToPath(import.meta.url)),
      schemasRootFolder: './../schemas/v1.2.0/',
      localEnvPath: './../../.env'
  })
  .then(async (schemas) => {
      const server = new McpServer(config)

      schemas.forEach(({ schema, serverParams, activateTags }) => {
          FlowMCP.activateServerTools({
              server,
              schema,
              serverParams,
              activateTags,
              silent: false
          })
      })

      const transport = new StdioServerTransport()
      await server.connect(transport)
  }).catch((e) => {
      console.error('Error starting server:', e)
  })
```

---

## 🧠 Claude Configuration Example

This configuration snippet demonstrates how to start FlowMCP with a Claude-compatible MCP server:

```json
{
    "globalShortcut": "",
    "mcpServers": {
        "FlowMCP": {
            "command": "node",
            "args": [
                "./path/to/your/file.mjs",
                "--launched-by=claude",
                "--includeNamespaces=",
                "--excludeNamespaces=",
                "--activateTags="
            ],
            "env": {
                "BLOCKNATIVE_API_KEY": "",
                "BSCSCAN_API_KEY": "",
                "CMC_API_KEY": "",
                "COINCAP_API_KEY": "",
                "COINSTATS_API_KEY": "",
                "CRYPTOPANIC_API_KEY": "",
                "DUNE_API_KEY": "",
                "ETHERSCAN_API_KEY": "",
                "INFURA_API_KEY": "",
                "MORALIS_API_KEY": "",
                "NEWSDATA_API_KEY": "",
                "SANTIMENT_API_KEY": "",
                "SOLANA_TRACKER_API_KEY": "",
                "SOLSCAN_API_KEY": "",
                "SOLSNIFFER_API_KEY": "",
                "THEGRAPH_API_KEY": "",
                "TWITTER_BEARER_TOKEN": ""
            }
        }
    }
}
```

---

## 🧹 Contributing

Want to add or improve a schema? Fork the repo, add your `.mjs` schema file under `schemas/<provider>/`, and submit a pull request.

Please follow the formatting and conventions described in the [FlowMCP README](../README.md), including:

* 4-space indentation
* One-line JSON objects for `tests`, `parameters`, and `modifiers`
* `const schema = { ... }` followed by `export { schema }` with two newlines between
