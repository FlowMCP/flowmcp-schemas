# FlowMCP Schema Library

This repository contains a modular collection of schema definitions designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework that adapts and standardizes REST and GraphQL APIs for interaction with AI systems.

Each schema defines the structure, routes, parameters, and integration logic of a specific API provider. The schemas are fully MCP-compatible and can be seamlessly activated in your local or remote FlowMCP server.

📚 **[Browse Interactive Documentation](https://flowmcp.github.io/flowmcp-schemas/)** - Visual schema browser with search and filtering

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

| Namespace | Schema Name | Route Names Count | Route Names (shortened) | Required Server Params | Tags |
|-----------|--------------|-------------------|--------------------------|-------------------------|------|
| aave | aave.mjs | 3 | getReserves, getUserData, getProtocolData | THEGRAPH_API_KEY | defi, lending, protocol |
| alternative | fearAndGreed.mjs | 3 | getCurrentFng, getHistoricalFng, analyzeFngTrend |  |  |
| arbeitsagentur | jobsuche.mjs | 2 | searchJobs, searchJobsApp |  | jobs, employment, germany |
| beaconchain | validatorQueue.mjs | 3 | getActivationQueue, getExitQueue, getValidatorStatus |  | ethereum, validators, staking |
| berlinevents | events.mjs | 4 | markets_festivals, street_festivals, christmas_markets, police_assemblies |  |  |
| berlinfunds | funds.mjs | 2 | funding_opportunities, continuing_education |  |  |
| berlinvhs | vhs.mjs | 1 | all_courses |  |  |
| berlinwfs | wfs-locations.mjs | 2 | dog_parks, bbq_areas |  |  |
| bicscan | bicscan.mjs | 2 | getRiskScore, getAssets | BICSCAN_API_KEY | security, risk, scanning |
| bitget | bitget.mjs | 3 | getTokenPrice, getAnnoucements, getCoinInfo |  | production, exchange, trading, price |
| blockberry | mina-mainnet.mjs | 6 | getDashboardInfo, getAccountByHash, getAccountBalance, getBlocks, getZkAppTransactions, getZkAppByAddress | BLOCKBERRY_API_KEY | production, blockchain, explorer, mina |
| blockchaininfo | utxoAndBlocks.mjs | 2 | getUTXO, getBlockStats |  | bitcoin, blockchain, utxo |
| blocknative | gasprice.mjs | 1 | getGasPrices | BLOCKNATIVE_API_KEY | new |
| bridgeRates | bridgerates.mjs | 4 | getSupportedChains, getSupportedTools, getConnections, getTransferStatus |  | bridge, crosschain, defi |
| bscscan | getContractBinance.mjs | 2 | getContractABI, getContractSourceCode | BSCSCAN_API_KEY | test |
| chainlist | chainlist.mjs | 5 | getChainById, getChainsByKeyword, getExplorerURLs, getRPCEndpoints, getWebsocketEndpoints |  | production, blockchain, rpc, network |
| chartImg | tradingview-charts.mjs | 1 | getAdvancedChart | CHART_IMG_API_KEY | charts, visualization, trading |
| coincap | assets.mjs | 4 | listAssets, singleAsset, assetMarkets, assetHistory | COINCAP_API_KEY |  |
| coincap | exchanges.mjs | 2 | listExchanges, getExchangeById | COINCAP_API_KEY |  |
| coincap | markets.mjs | 1 | listMarkets | COINCAP_API_KEY |  |
| coincap | rates.mjs | 2 | listRates, getRateBySlug | COINCAP_API_KEY |  |
| coingecko | coingecko-stablecoins.mjs | 4 | getSupportedStablecoins, getCurrentPrice, getHistoricalData, analyzePegStability |  | price, market, stablecoins |
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
| cryptodata | mixed.mjs | 18 | getCoins, getCoinById, getCoinChartById, getCoinAvgPrice, getCoinExchangePrice, getTickerExchanges, getTickerMarkets, getBlockchains, getWalletBalance, getWalletBalances, getExchanges, getFiatCurrencies, getNewsSources, getNews, getNewsByType, getNewsById, getMarketCap, getCurrencies | COINSTATS_API_KEY | production, price, market, data |
| context7 | getDocumentation.mjs | 2 | searchLibraryId, getLibraryDocs |  |  |
| cryptopanic | getNews.mjs | 1 | getCryptoCryptopanicNews | CRYPTOPANIC_API_KEY |  |
| cryptorank | funds.mjs | 5 | searchFunds, getAllFunds, getFundBasic, getFundDetail, getFundTeam | CRYPTORANK_API_KEY | funds, investors, analytics |
| cryptowizards | analytics.mjs | 6 | runBacktest, checkCointegration, getCorrelations, analyzeCopula, analyzeSpread, analyzeZScores | CRYPTOWIZARDS_API_KEY | production, analytics, trading, backtest |
| defillama | api.mjs | 3 | getProtocols, getProtocolTvl, getChainTvl |  |  |
| defillama | coins.mjs | 1 | getTokenPrices |  |  |
| defillama | yields.mjs | 2 | getPools, getPoolTvl |  |  |
| dexpaprika | defiPrices.mjs | 7 | getNetworks, getToken, getMultiPrices, getPool, getTokenPools, getPoolTransactions, searchTokens |  | defi, prices, liquidity |
| dexscreener | boosted.mjs | 2 | getLatestBoostedTokens, getMostActiveBoostedTokens |  |  |
| dexscreener | pairs.mjs | 2 | getPairByChainAndAddress, checkTokenOrders |  |  |
| dexscreener | tokenInfo.mjs | 4 | getLatestTokenProfiles, searchPairs, getPairsByToken, getTokenPools |  |  |
| dexscreener | tokenpairs.mjs | 4 | getTokenPairs, getLatestPairs, getPairsByChain, getSpecificPair |  | dex, trading, pairs |
| duneAnalytics | farcaster.mjs | 3 | farcasterGetTrendingMemecoins, farcasterGetTrendingChannels, farcasterGetTrendingUsers | DUNE_API_KEY |  |
| duneAnalytics | getResults.mjs | 1 | getLatestResult | DUNE_API_KEY |  |
| duneAnalytics | trendingContracts.mjs | 3 | getDexPairStats, getTrendingContracts, getMarketShare | DUNE_API_KEY |  |
| epo | patent-search.mjs | 4 | searchPatents, searchByTechnology, searchByKeywords, searchByDate |  | patents, research, search |
| profilejump | profileJump.mjs | 5 | prices, hotProfiles, tokensList, profilesList, profileByAddress |  |  |
| etherscan | getContractEthereum.mjs | 2 | getContractABI, getContractSourceCode | ETHERSCAN_API_KEY |  |
| etherscan | getContractMultichain.mjs | 3 | getAvailableChains, getSmartContractAbi, getSourceCode | ETHERSCAN_API_KEY |  |
| etherscan | getGaspriceMultichain.mjs | 2 | getGasOracle, estimateGasCost | ETHERSCAN_API_KEY |  |
| ethscriptions | ethscriptions-api.mjs | 11 | listEthscriptions, getEthscription, getEthscriptionData, getEthscriptionAttachment, checkEthscriptionExists, checkMultipleEthscriptionsExistence, listTransfers, listTokens, getTokenDetails, getTokenHistoricalState, getIndexerStatus |  | nft, ethereum, inscriptions |
| geoapify | geocoding.mjs | 3 | forwardGeocode, reverseGeocode, autocomplete | GEOAPIFY_API_KEY | geocoding, maps, places |
| goldskyNouns | goldsky-nouns.mjs | 4 | getRecentProposals, getCurrentAuctions, getNounDetails, getTopDelegates |  | production, dao, governance, nft |
| goldskyLilNouns | lil-nouns.mjs | 2 | getProposals, getProposalById |  | production, data, api |
| goldskyNouns | nouns.mjs | 3 | getCandidateProposals, getActivePendingUpdatableProposers, getLatestAuctions |  | production, dao, governance, nft |
| hnrss | jsonFeeds.mjs | 1 | getFeed |  | news, hackernews, feeds |
| honeypot | honeypot.mjs | 1 | check |  | production, security, token, validation |
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
| medium | rss-feeds.mjs | 4 | getTagFeed, getUserFeed, getPublicationFeed, getTopicFeed |  | content, social, feeds |
| memoryLol | twitterNameChanges.mjs | 1 | queryUsernameChanges |  |  |
| minascanDevnet | mina-devnet.mjs | 2 | getMinaDevnetSchema, getMinaDevnetQuery |  | production, blockchain, explorer, mina |
| minascanMainnet | mina-mainnet.mjs | 2 | getMinaMainnetSchema, getMinaMainnetQuery |  | production, blockchain, explorer, mina |
| moralis | blockchainApi.mjs | 7 | /block/:block_number_or_hash, /dateToBlock, /transaction/:transaction_hash/verbose, /:address/verbose, /latestBlockNumber/:chain, /transaction/:transaction_hash, /:address | MORALIS_API_KEY |  |
| moralis | defiApi.mjs | 3 | /wallets/:address/defi/:protocol/positions, /wallets/:address/defi/positions, /wallets/:address/defi/summary | MORALIS_API_KEY |  |
| moralis | entity.mjs | 1 | /entities/categories | MORALIS_API_KEY |  |
| moralis | nftApi.mjs | 20 | /market-data/nfts/top-collections, /market-data/nfts/hottest-collections, /nft/:address, /nft/:address/stats, /nft/:address/metadata, /nft/:address/transfers, /nft/:address/:token_id, /nft/:address/owners, /nft/:address/:token_id/owners, /nft/:address/:token_id/trades, /wallets/:address/nfts/trades, /nft/:address/trades, /nft/:address/traits/paginate, /nft/:address/traits, /nft/:address/:token_id/transfers, /:address/nft/collections, /:address/nft/transfers, /:address/nft, /nft/:address/:token_id/metadata/resync, /nft/:address/traits/resync | MORALIS_API_KEY |  |
| moralis | priceApi.mjs | 7 | /nft/:address/price, /nft/:address/floor-price, /nft/:address/:token_id/floor-price, /nft/:address/floor-price/historical, /nft/:address/:token_id/price, /pairs/:address/ohlcv, /erc20/:address/price | MORALIS_API_KEY |  |
| moralis | tokenApi.mjs | 16 | /:pair_address/reserves, /pairs/:address/snipers, /pairs/:address/swaps, /wallets/:address/swaps, /tokens/:address/analytics, /erc20/:token_address/owners, /erc20/metadata/symbols, /erc20/metadata, /erc20/:address/stats, /erc20/:address/transfers, /market-data/erc20s/top-tokens, /erc20/:address/top-gainers, /wallets/:address/approvals, /wallets/:address/tokens, /:address/erc20, /:address/erc20/transfers | MORALIS_API_KEY |  |
| moralis | utils.mjs | 2 | /info/endpointWeights, /web3/version | MORALIS_API_KEY |  |
| moralis | walletApi.mjs | 11 | /wallets/:address/chains, /:address/balance, /wallets/:address/history, /wallets/:address/net-worth, /wallets/:address/profitability/summary, /wallets/:address/profitability, /wallets/:address/stats, /resolve/:address/domain, /resolve/:address/reverse, /resolve/:domain, /resolve/ens/:domain | MORALIS_API_KEY |  |
| newsapi | news.mjs | 3 | getTopHeadlines, getEverything, getSources | NEWSAPI_API_KEY | news, media, content |
| newsdata | getNews.mjs | 2 | getLatestNewsdata, getCryptoNewsdata | NEWSDATA_API_KEY |  |
| overpass | osmQuery.mjs | 3 | queryRaw, findNearby, status |  | openstreetmap, geodata, maps |
| pinata | read.mjs | 2 | free_read_example, free_read_cid |  |  |
| poap | graphql.mjs | 5 | getTypename, getSchemaDefinition, getPredefinedQueryList, executePrefinedQuery, querySubgraph |  | production, graphql, poap |
| polymarket | gammaApi.mjs | 3 | searchEvents, getEvents, getMarkets |  | predictions, markets, events |
| polymarket | marketInfo.mjs | 2 | getMarkets, getMarketInfo |  |  |
| polymarket | searchBySlug.mjs | 1 | searchBySlug |  |  |
| redditScanner | getTokenMentions.mjs | 2 | getTokenMentions, getHotMemes |  |  |
| rugcheck | tokenSafety.mjs | 6 | getTokenReport, getTokenVotes, getRecentTokens, getTrendingTokens, getNewTokens, getVerifiedTokens |  | solana, security, tokens |
| santiment | schema.mjs | 5 | get_sentiment_balance, get_social_volume, alert_social_shift, get_trending_words, get_social_dominance | SANTIMENT_API_KEY |  |
| simdune | balancesEVM.mjs | 1 | getBalancesEVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio |
| simdune | balancesSVM.mjs | 1 | getBalancesSVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio, svm, solana |
| simdune | collectiblesEVM.mjs | 1 | getCollectiblesEVM | DUNE_SIM_API_KEY | production, nft, collectibles, metadata |
| simdune | tokenHoldersEVM.mjs | 1 | getTokenHoldersEVM | DUNE_SIM_API_KEY | production, token, analytics, holders |
| simdune | tokenInfoEVM.mjs | 1 | getTokenInfoEVM | DUNE_SIM_API_KEY | production, token, analytics, metadata |
| simdune | transactionsEVM.mjs | 1 | getTransactionsEVM | DUNE_SIM_API_KEY | production, transactions, analytics, history |
| simdune | transactionsSVM.mjs | 1 | getTransactionsSVM | DUNE_SIM_API_KEY | production, transactions, analytics, history, svm, solana |
| snapshot | snapshot.mjs | 3 | listSpaces, listProposals, getProposalDetails |  | dao, governance, voting |
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
| spaceid | spaceid.mjs | 3 | getSupportedChains, getAddress, getName |  | production, domain, identity, blockchain |
| stolpersteineBerl | memorial-stones.mjs | 5 | getAllStones, searchStones, getStonesByDistrict, getStonesByPerson, getStonesByLocation |  | memorial, history, berlin |
| swaggerhub | api-registry.mjs | 2 | searchApis, listApiVersions |  | production, api, documentation, registry |
| talentprotocol | advancedSearch.mjs | 2 | searchAdvancedProfiles, getDefaultFields | TALENT_API_KEY | identity, talent, profiles |
| thegraph | getNewUniswapPools.mjs | 1 | getNewPools | THEGRAPH_API_KEY |  |
| thegraph | getSchema.mjs | 2 | getSubgraphSchema, querySubgraph | THEGRAPH_API_KEY |  |
| twitter | search.mjs | 1 | searchRecentTweets | TWITTER_BEARER_TOKEN |  |
| uniswap | uniswap-pool-explorer.mjs | 2 | getTokenPools, getPoolData | THEGRAPH_API_KEY | production |
| webcareer | job-listings.mjs | 1 | queryJobs | WEB3_CAREER_API_TOKEN | production, jobs, career, crypto |
| wormholescan | wormholescan.mjs | 7 | getCrossChainActivity, getMoneyFlow, getTopAssetsByVolume, getTopChainPairsByNumTransfers, getTopSymbolsByVolume, getTopCorridors, getKpiList |  | data, api |
| x402 | ping.mjs | 2 | free_ping, paid_ping |  |  |
| zvgportal | zwangsversteigerungen.mjs | 1 | searchAuctions |  | immobilien, auktionen, justiz |

---

## 🚀 Example: Start Local Server with All Schemas

This script dynamically loads and activates all available schemas using the FlowMCP schema importer and local server utilities.

File: `local-server-module.mjs`

```js
import fs from 'fs'
import { SchemaImporter } from 'schemaimporter'

import { FlowMCP } from '../../src/index.mjs'
import { LocalServer } from '../../src/index.mjs'

console.log('Starting Local Server...')
const schemaFilePaths = await SchemaImporter.get({
    onlyWithoutImports: true,
    withMetaData: true,
    withSchema: true
})
const arrayOfSchemas = schemaFilePaths.map(({ schema }) => schema)

const { includeNamespaces, excludeNamespaces, activateTags, source } = FlowMCP.getArgvParameters({
    argv: process.argv,
    includeNamespaces: [],
    excludeNamespaces: [],
    activateTags: [],
})

// Provide your environment variables here
const envObject = /* insert your own environment variable object here */

const { activationPayloads } = FlowMCP.prepareActivations({
    arrayOfSchemas,
    envObject,
    activateTags,
    includeNamespaces,
    excludeNamespaces
})

const localServer = new LocalServer({ silent: true })
localServer.addActivationPayloads({ activationPayloads })
await localServer.start()
console.log('Local Server started successfully.')
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
                "BICSCAN_API_KEY": "",
                "BLOCKBERRY_API_KEY": "",
                "BLOCKNATIVE_API_KEY": "",
                "BSCSCAN_API_KEY": "",
                "CHART_IMG_API_KEY": "",
                "CMC_API_KEY": "",
                "COINCAP_API_KEY": "",
                "COINSTATS_API_KEY": "",
                "CRYPTOPANIC_API_KEY": "",
                "CRYPTORANK_API_KEY": "",
                "CRYPTOWIZARDS_API_KEY": "",
                "DUNE_API_KEY": "",
                "DUNE_SIM_API_KEY": "",
                "ETHERSCAN_API_KEY": "",
                "GEOAPIFY_API_KEY": "",
                "MORALIS_API_KEY": "",
                "NEWSAPI_API_KEY": "",
                "NEWSDATA_API_KEY": "",
                "SANTIMENT_API_KEY": "",
                "SOLANA_TRACKER_API_KEY": "",
                "SOLSCAN_API_KEY": "",
                "SOLSNIFFER_API_KEY": "",
                "TALENT_API_KEY": "",
                "THEGRAPH_API_KEY": "",
                "TWITTER_BEARER_TOKEN": "",
                "WEB3_CAREER_API_TOKEN": ""
            }
        }
    }
}
```

---

## 🧹 Contributing

Want to add or improve a schema? Fork the repo, place your `.mjs` schema file under `schemas/<provider>/`, and submit a pull request.

Please follow the formatting and conventions described in the [FlowMCP README](../README.md), including:

* 4-space indentation
* Single-line JSON objects for `tests`, `parameters`, and `modifiers`
* Use `const schema = { ... }` followed by `export { schema }` with two line breaks