# FlowMCP Schema Library

This repository contains a modular collection of schema definitions designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework that adapts and standardizes REST and GraphQL APIs for interaction with AI systems.

Each schema defines the structure, routes, parameters, and integration logic of a specific API provider. The schemas are fully MCP-compatible and can be seamlessly activated in your local or remote FlowMCP server.

📚 **[Browse Interactive Documentation](https://flowmcp.github.io/flowmcp-schemas/)** - Visual schema browser with search and filtering

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

| Namespace | Schema Name | Route Names Count | Route Names (shortened) | Required Server Params | Tags |
|-----------|--------------|-------------------|--------------------------|-------------------------|------|
| aave | aave.mjs | 3 | getReserves, getUserData, getProtocolData | THEGRAPH_API_KEY | defi, lending, protocol, cacheTtlDaily |
| alchemy | contract-read.mjs | 1 | readContract | ALCHEMY_API_KEY | blockchain, evm, smartcontract, multichain, alchemy, cacheTtlRealtime |
| alchemy | node-read-part1.mjs | 8 | getBlockNumber, getBalance, getGasPrice, getBlock, getCode, getTransactionCount, getTransactionByHash, getTransactionReceipt | ALCHEMY_API_KEY | blockchain, evm, rpc, multichain, alchemy, cacheTtlRealtime |
| alchemy | node-read-part2.mjs | 1 | getLogs | ALCHEMY_API_KEY | blockchain, evm, rpc, multichain, alchemy, cacheTtlRealtime |
| alternative | fearAndGreed.mjs | 3 | getCurrentFng, getHistoricalFng, analyzeFngTrend |  | crypto, sentiment, index, cacheTtlFrequent |
| arbeitsagentur | education.mjs | 2 | searchApprenticeships, searchStudyPrograms |  | education, germany, apprenticeship, training, cacheTtlDaily |
| arbeitsagentur | entgeltatlas.mjs | 7 | getEntgelte, getMediandaten, getPrimaererMedian, getRegionen, getGeschlechter, getAlter, getBranchen | ENTGELTATLAS_API_KEY | government, employment, wages, salary, germany, opendata, cacheTtlDaily |
| arbeitsagentur | jobs.mjs | 2 | searchJobs, searchJobsByEmployer |  | jobs, germany, employment, labor, cacheTtlDaily |
| arbeitsagentur | jobsuche.mjs | 2 | searchJobs, searchJobsApp |  | jobs, employment, germany, cacheTtlDaily |
| arbeitsagentur | professions.mjs | 2 | searchProfessions, getProfessionDetail |  | professions, germany, employment, education, cacheTtlDaily |
| autobahn | traffic.mjs | 6 | listRoads, getRoadworks, getWarnings, getClosures, getChargingStations, getWebcams |  | traffic, germany, infrastructure, cacheTtlFrequent |
| avalanchemetrics | metrics-api.mjs | 8 | listChains, getChainInfo, getChainMetrics, getRollingWindowMetrics, getStakingMetrics, getValidatorMetrics, getICMSummary, getICMTimeseries |  | blockchain, avalanche, metrics, staking, analytics, cacheTtlDaily |
| avnu | avnu.mjs | 3 | getSwapQuote, getTokens, getSources |  | starknet, defi, swap, cacheTtlRealtime |
| balancer | balancer.mjs | 5 | getTopPools, getPoolById, getTokenPrices, getProtocolMetrics, getSwapPaths |  | defi, amm, liquidity, pools, cacheTtlFrequent |
| beaconchain | validatorQueue.mjs | 3 | getActivationQueue, getExitQueue, getValidatorStatus |  | ethereum, validators, staking, cacheTtlDaily |
| berlin | schulen.mjs | 1 | getSchools |  | berlin, education, geojson, government, cacheTtlDaily |
| berlinevents | events.mjs | 4 | markets_festivals, street_festivals, christmas_markets, police_assemblies |  | berlin, events, opendata, cacheTtlDaily |
| berlinfunds | funds.mjs | 2 | funding_opportunities, continuing_education |  | berlin, funding, opendata, cacheTtlDaily |
| berlinvergabe | procurement.mjs | 1 | getProcurementNotices |  | procurement, berlin, germany, opendata, cacheTtlDaily |
| berlinvhs | vhs.mjs | 1 | all_courses |  | berlin, education, opendata, cacheTtlDaily |
| berlinwfs | wfs-locations.mjs | 2 | dog_parks, bbq_areas |  | berlin, geodata, opendata, cacheTtlDaily |
| bicscan | bicscan.mjs | 2 | getRiskScore, getAssets | BICSCAN_API_KEY | security, risk, scanning, cacheTtlDaily |
| birdeye | birdeye.mjs | 5 | getTokenPrice, getHistoryPrice, getOHLCV, getTrendingTokens, searchToken | BIRDEYE_API_KEY | crypto, solana, analytics, defi, cacheTtlFrequent |
| bitget | bitget.mjs | 3 | getTokenPrice, getAnnoucements, getCoinInfo |  | production, exchange, trading, price, cacheTtlDaily |
| blockberry | mina-mainnet.mjs | 6 | getDashboardInfo, getAccountByHash, getAccountBalance, getBlocks, getZkAppTransactions, getZkAppByAddress | BLOCKBERRY_API_KEY | production, blockchain, explorer, mina, cacheTtlDaily |
| blockchaininfo | utxoAndBlocks.mjs | 2 | getUTXO, getBlockStats |  | bitcoin, blockchain, utxo, cacheTtlDaily |
| blocknative | gasprice.mjs | 1 | getGasPrices | BLOCKNATIVE_API_KEY | new, cacheTtlRealtime |
| bonfida | bonfida.mjs | 3 | resolveDomain, getFavoriteDomain, getDomainsByOwner |  | solana, naming, identity, domains |
| bridgerates | bridgerates.mjs | 6 | getSupportedChains, getSupportedTools, getConnections, getTransferStatus, getQuote, getTokenInfo |  | bridge, crosschain, defi, cacheTtlRealtime |
| bscscan | getContractBinance.mjs | 2 | getContractABI, getContractSourceCode | BSCSCAN_API_KEY | test, cacheTtlDaily |
| bundeshaushalt | budget.mjs | 3 | getBudgetByEinzelplan, getBudgetByFunction, getBudgetByGroup |  | government, finance, budget, germany, opendata, cacheTtlDaily |
| cryptoorderbook | orderbook.mjs | 2 | calculateOrderbook, compareOrderbook |  | production, trading, orderbook, exchange, cacheTtlRealtime |
| chainlinkmulticall | price-feeds-multicall.mjs | 3 | getAvailableChains, getAvailableFeeds, getAllLatestPrices | INFURA_API_KEY | oracle, price, feeds, chainlink, multicall, batch, onchain, cacheTtlRealtime |
| chainlink | price-feeds.mjs | 3 | getAvailableChains, getAvailableFeeds, getLatestPrice | INFURA_API_KEY | oracle, price, feeds, chainlink, onchain, cacheTtlRealtime |
| chainlist | chainlist.mjs | 5 | getChainById, getChainsByKeyword, getExplorerURLs, getRPCEndpoints, getWebsocketEndpoints |  | production, blockchain, rpc, network, cacheTtlStatic |
| chartimg | tradingview-charts.mjs | 1 | getAdvancedChart | CHART_IMG_API_KEY | charts, visualization, trading, cacheTtlStatic |
| charts | VegaLiteCharts.mjs | 4 | generateCandlestickChart, generateLineChart, generateMultiLineChart, generateBarChart |  | charts, visualization, trading, offline |
| coinbasebazaar | discovery.mjs | 1 | listResources |  | payments, marketplace, crypto, cacheTtlDaily |
| coincap | assets.mjs | 4 | listAssets, singleAsset, assetMarkets, assetHistory | COINCAP_API_KEY | crypto, prices, marketdata, cacheTtlRealtime |
| coincap | exchanges.mjs | 2 | listExchanges, getExchangeById | COINCAP_API_KEY | crypto, exchanges, marketdata, cacheTtlFrequent |
| coincap | markets.mjs | 1 | listMarkets | COINCAP_API_KEY | crypto, markets, trading, cacheTtlFrequent |
| coincap | rates.mjs | 2 | listRates, getRateBySlug | COINCAP_API_KEY | crypto, rates, conversion, cacheTtlRealtime |
| coingecko | coingecko-stablecoins.mjs | 4 | getSupportedStablecoins, getCurrentPrice, getHistoricalData, analyzePegStability |  | price, market, stablecoins, cacheTtlDaily |
| coingecko | coins.mjs | 7 | getCoinsList, getCoinsMarkets, getCoinById, getCoinMarketChart, getCoinHistory, getCoinTickers, getCoinContractInfo |  | crypto, prices, marketdata, cacheTtlDaily |
| coingecko | derivatives.mjs | 3 | getDerivativeExchangeIds, getDerivativeExchangesByIds, getDerivativeProductsByExchangeId |  | crypto, derivatives, trading, cacheTtlDaily |
| coingecko | exchanges.mjs | 3 | getExchangesList, getExchangeById, getExchangeTickers |  | crypto, exchanges, marketdata, cacheTtlDaily |
| coingecko | getCategories.mjs | 2 | getAvailableCoinCategoryIds, getCoinCategoryDetailsByIds |  | crypto, categories, marketdata, cacheTtlDaily |
| coingecko | global.mjs | 2 | getGlobalData, getDeFiGlobalData |  | crypto, global, marketdata, cacheTtlFrequent |
| coingecko | search-ohlc.mjs | 2 | searchCoins, getCoinOhlc |  | crypto, prices, marketdata, cacheTtlFrequent |
| coingecko | simplePrice.mjs | 2 | getSimplePrice, getTokenPrice |  | crypto, prices, conversion, cacheTtlRealtime |
| coingecko | trending.mjs | 3 | getTrendingCoins, getTrendingNfts, getTrendingCategories |  | crypto, trending, discovery, cacheTtlFrequent |
| coinmarketcap | category.mjs | 5 | getCategories, getCategory, getIdMap, getMetadataV2, getQuotesLatestV2 | CMC_API_KEY | crypto, categories, marketdata, cacheTtlDaily |
| coinmarketcap | cmc-index.mjs | 2 | getHistorical, getLatest | CMC_API_KEY | crypto, index, marketdata, cacheTtlDaily |
| coinmarketcap | exchanges.mjs | 4 | getExchangeMap, getExchangeInfo, getExchangeAssets, getCryptoMap | CMC_API_KEY | crypto, exchanges, marketdata, cacheTtlFrequent |
| coinmarketcap | fear-and-greed.mjs | 2 | getFearAndGreedHistorical, getFearAndGreedLatest | CMC_API_KEY | crypto, sentiment, index, cacheTtlFrequent |
| coinmarketcap | listings.mjs | 1 | listingsLatest | CMC_API_KEY | crypto, listings, marketdata, cacheTtlFrequent |
| cryptodata | mixed-part1.mjs | 8 | getCoins, getCoinById, getCoinChartById, getCoinAvgPrice, getCoinExchangePrice, getTickerExchanges, getTickerMarkets, getBlockchains | COINSTATS_API_KEY | production, price, market, data, cacheTtlFrequent |
| cryptodata | mixed-part2.mjs | 8 | getWalletBalance, getWalletBalances, getExchanges, getFiatCurrencies, getNewsSources, getNews, getNewsByType, getNewsById | COINSTATS_API_KEY | production, price, market, data, cacheTtlFrequent |
| cryptodata | mixed-part3.mjs | 2 | getMarketCap, getCurrencies | COINSTATS_API_KEY | production, price, market, data, cacheTtlFrequent |
| cointelegraph | getLatestNews.mjs | 1 | getLatestNews |  | crypto, news, media, cacheTtlFrequent |
| context | getDocumentation.mjs | 2 | searchLibraryId, getLibraryDocs |  | documentation, search, developer, cacheTtlStatic |
| cosmos | cosmos-bank.mjs | 6 | getBalances, getSupply, getValidators, getDelegations, getProposals, getCommunityPool |  | cosmos, staking, governance, cacheTtlFrequent |
| cryptopanic | getNews.mjs | 1 | getCryptoCryptopanicNews | CRYPTOPANIC_API_KEY | crypto, news, aggregator, cacheTtlFrequent |
| cryptorank | funds.mjs | 5 | searchFunds, getAllFunds, getFundBasic, getFundDetail, getFundTeam | CRYPTORANK_API_KEY | funds, investors, analytics, cacheTtlDaily |
| cryptowizards | analytics.mjs | 6 | runBacktest, checkCointegration, getCorrelations, analyzeCopula, analyzeSpread, analyzeZScores | CRYPTOWIZARDS_API_KEY | production, analytics, trading, backtest, cacheTtlDaily |
| curve | analytics.mjs | 6 | getVolumes, getTotalVolume, getAllGauges, getLendingVaults, getWeeklyFees, getGas |  | defi, dex, analytics, volume, apy, lending, cacheTtlFrequent |
| curve | crvusd.mjs | 3 | getCrvCircSupply, getCrvusdTotalSupply, getCrvusdAmmVolumes |  | defi, stablecoin, crvusd, supply, cacheTtlFrequent |
| curve | pools.mjs | 6 | getPoolsByChain, getPoolsByRegistry, getBigPools, getPoolList, getTokens, getPlatforms |  | defi, dex, liquidity, pools, multichain, cacheTtlFrequent |
| dashboarddeutschland | statistics.mjs | 3 | getDashboards, getIndicator, getGeoData |  | statistics, germany, economy, destatis, cacheTtlDaily |
| debank | portfolio.mjs | 6 | getTotalBalance, getUsedChains, getTokenList, getProtocolList, getAllProtocols, getTokenInfo | DEBANK_ACCESS_KEY | defi, portfolio, wallet, crypto, cacheTtlFrequent |
| debridge | debridge.mjs | 6 | getSupportedChains, getTokenList, getBridgeQuote, getOrderById, getOrderStatus, getOrderIdsByTxHash |  | bridge, crosschain, defi, cacheTtlFrequent |
| defillama | api.mjs | 3 | getProtocols, getProtocolTvl, getChainTvl |  | defi, tvl, protocols, cacheTtlFrequent |
| defillama | coins.mjs | 1 | getTokenPrices |  | defi, prices, tokens, cacheTtlFrequent |
| defillama | yields.mjs | 2 | getPools, getPoolTvl |  | defi, yields, farming, cacheTtlFrequent |
| destatis | catalogue.mjs | 6 | search, listTables, listStatistics, getTableMetadata, getStatisticMetadata, getQualitySigns |  | statistics, germany, government, opendata, destatis |
| destatis | data.mjs | 4 | getTableData, getVariableMetadata, listVariables, listValues |  | statistics, germany, government, opendata, destatis |
| dexpaprika | defiPrices.mjs | 7 | getNetworks, getToken, getMultiPrices, getPool, getTokenPools, getPoolTransactions, searchTokens |  | defi, prices, liquidity, cacheTtlRealtime |
| dexscreener | boosted.mjs | 2 | getLatestBoostedTokens, getMostActiveBoostedTokens |  | defi, trading, boosted, cacheTtlFrequent |
| dexscreener | pairs.mjs | 2 | getPairByChainAndAddress, checkTokenOrders |  | defi, trading, pairs, cacheTtlFrequent |
| dexscreener | tokenInfo.mjs | 4 | getLatestTokenProfiles, searchPairs, getPairsByToken, getTokenPools |  | defi, tokens, discovery, cacheTtlFrequent |
| dexscreener | tokenpairs.mjs | 4 | getTokenPairs, getLatestPairs, getPairsByChain, getSpecificPair |  | dex, trading, pairs, cacheTtlFrequent |
| digitaleverwaltung | services.mjs | 2 | getServices, getAdminRegions |  | government, germany, administration, services, cacheTtlDaily |
| dip | documents.mjs | 8 | listDrucksachen, getDrucksache, listDrucksacheTexts, getDrucksacheText, listPlenarprotokolle, getPlenarprotokoll, listPlenarprotokollTexts, getPlenarprotokollText | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| dip | proceedings.mjs | 8 | listVorgaenge, getVorgang, listVorgangspositionen, getVorgangsposition, listAktivitaeten, getAktivitaet, listPersonen, getPerson | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| duneanalytics | farcaster.mjs | 3 | farcasterGetTrendingMemecoins, farcasterGetTrendingChannels, farcasterGetTrendingUsers | DUNE_API_KEY | analytics, farcaster, social, cacheTtlDaily |
| duneanalytics | getResults.mjs | 1 | getLatestResult | DUNE_API_KEY | analytics, queries, data, cacheTtlDaily |
| duneanalytics | trendingContracts.mjs | 3 | getDexPairStats, getTrendingContracts, getMarketShare | DUNE_API_KEY | analytics, contracts, trending, cacheTtlFrequent |
| dwd | weather.mjs | 1 | getStationOverview |  | weather, germany, forecast, cacheTtlFrequent |
| ecovisio | counters.mjs | 1 | getCountersByOrganization |  | mobility, germany, cycling, pedestrian, cacheTtlDaily |
| ens | ens-public.mjs | 5 | resolveName, lookupAddress, getTextRecords, getAvatar, getContentHash |  | ethereum, domain, identity, ens, cacheTtlDaily |
| ens | ens-resolution.mjs | 3 | resolveName, lookupAddress, supportMatrix | INFURA_API_KEY | production, domain, identity, ethereum, cacheTtlDaily |
| enso | enso.mjs | 6 | getRoute, getProtocols, getNetworks, getTokens, getTokenPrice, getAggregators | ENSO_API_KEY | defi, routing, swap, multichain, cacheTtlFrequent |
| epo | patent-search.mjs | 4 | searchPatents, searchByTechnology, searchByKeywords, searchByDate |  | patents, research, search, cacheTtlDaily |
| ercmultitoken | erc1155.mjs | 2 | balanceOf, uri | ALCHEMY_API_KEY, INFURA_API_KEY | erc1155, multitoken, nft, semifungible, balance, onchain, multichain |
| erctoken | erc20.mjs | 3 | tokenInfo, balanceOf, allowance | ALCHEMY_API_KEY, INFURA_API_KEY | erc20, token, fungible, balance, allowance, onchain, multichain |
| ercnft | erc721.mjs | 4 | tokenInfo, ownerOf, tokenURI, balanceOf | ALCHEMY_API_KEY, INFURA_API_KEY | erc721, nft, token, ownership, metadata, onchain, multichain |
| profilejump | profileJump.mjs | 5 | prices, hotProfiles, tokensList, profilesList, profileByAddress |  | lukso, identity, profiles, cacheTtlDaily |
| luksonetwork | universalProfile.mjs | 3 | readProfileData, fetchProfileMetadata, getUniversalReceiverAddress |  | lukso, identity, profiles, cacheTtlDaily |
| ethers | abi-utils.mjs | 6 | decodeFunctionData, encodeFunctionData, decodeEventLog, computeSelector, encodeParameters, decodeParameters |  | blockchain, evm, abi, encoding, decoding, offline |
| ethers | convert-utils.mjs | 7 | formatUnits, parseUnits, formatEther, parseEther, hexlify, toUtf8String, toUtf8Bytes |  | blockchain, evm, conversion, units, encoding, offline |
| ethers | hash-address.mjs | 6 | keccak256, solidityPackedKeccak256, getCreate2Address, getCreateAddress, checksumAddress, namehash |  | blockchain, evm, hash, address, offline |
| ethers | signature-utils.mjs | 4 | verifyMessage, verifyTypedData, hashMessage, recoverAddress |  | blockchain, evm, signature, verification, offline |
| etherscan | account.mjs | 7 | getAccountBalance, getTransactionList, getInternalTransactions, getTokenTransfers, getNftTransfers, getTxStatus, getTxReceiptStatus | ETHERSCAN_API_KEY | ethereum, explorer, transactions, cacheTtlFrequent |
| etherscan | getContractEthereum.mjs | 2 | getContractABI, getContractSourceCode | ETHERSCAN_API_KEY | ethereum, contracts, explorer, cacheTtlDaily |
| etherscan | getContractMultichain.mjs | 3 | getAvailableChains, getSmartContractAbi, getSourceCode | ETHERSCAN_API_KEY | evm, contracts, explorer, cacheTtlDaily |
| etherscan | getGaspriceMultichain.mjs | 2 | getGasOracle, estimateGasCost | ETHERSCAN_API_KEY | evm, gas, fees, cacheTtlRealtime |
| ethscriptions | ethscriptions-api-part1.mjs | 8 | listEthscriptions, getEthscription, getEthscriptionData, getEthscriptionAttachment, checkEthscriptionExists, checkMultipleEthscriptionsExistence, listTransfers, listTokens |  | nft, ethereum, inscriptions, cacheTtlDaily |
| ethscriptions | ethscriptions-api-part2.mjs | 3 | getTokenDetails, getTokenHistoricalState, getIndexerStatus |  | nft, ethereum, inscriptions, cacheTtlDaily |
| feiertage | holidays.mjs | 2 | getAllHolidays, getStateHolidays |  | holidays, germany, calendar, cacheTtlStatic |
| geoapify | geocoding.mjs | 3 | forwardGeocode, reverseGeocode, autocomplete | GEOAPIFY_API_KEY | geocoding, maps, places, cacheTtlDaily |
| gesetzedecontent | law-content.mjs | 5 | getLawOverview, getParagraph, searchInLaw, getParagraphRange, getLawStructure |  | law, germany, government, legal, opendata, fulltext |
| gesetzede | law-index.mjs | 3 | searchLaws, getLawList, getIndexStats |  | law, germany, government, legal, opendata |
| goldrush | streaming.mjs | 2 | searchToken, getWalletPnL | GOLDRUSH_API_KEY | crypto, defi, blockchain, tokens, cacheTtlDaily |
| goldskynouns | goldsky-nouns.mjs | 4 | getRecentProposals, getCurrentAuctions, getNounDetails, getTopDelegates |  | production, dao, governance, nft, cacheTtlDaily |
| goldskylilnouns | lil-nouns.mjs | 2 | getProposals, getProposalById |  | production, data, api, cacheTtlDaily |
| goldskynouns | nouns.mjs | 3 | getCandidateProposals, getActivePendingUpdatableProposers, getLatestAuctions |  | production, dao, governance, nft, cacheTtlDaily |
| govdata | datasets.mjs | 5 | searchDatasets, getDataset, listGroups, listOrganizations, searchTags |  | government, opendata, germany, cacheTtlDaily |
| govdatasparql | sparql-analytics.mjs | 7 | getCatalogOverview, searchByTheme, getRecentDatasets, getFormatDistribution, getTopPublishers, getTopKeywords, getDatasetsByPublisher |  | government, opendata, germany, sparql, analytics, cacheTtlDaily |
| hnrss | jsonFeeds.mjs | 1 | getFeed |  | news, hackernews, feeds, cacheTtlDaily |
| hochwasserzentralen | flood-monitoring.mjs | 2 | getStations, getAlerts |  | government, environment, flood, weather, germany, opendata, cacheTtlRealtime |
| honeypot | honeypot.mjs | 1 | check |  | production, security, token, validation, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part1.mjs | 8 | getAbsolutePriceOscillator, getAbsolutePriceOscillatorStrategy, getAccelerationBands, getAccelerationBandsStrategy, getAccumulationDistribution, getAroon, getAroonStrategy, getAverageTrueRange |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part10.mjs | 6 | getVolumeWeightedMovingAverage, getVolumeWeightedMovingAverageStrategy, getVortex, getVortexStrategy, getWilliamsR, getWilliamsRStrategy |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part2.mjs | 8 | getAwesomeOscillator, getAwesomeOscillatorStrategy, getBalanceOfPower, getBalanceOfPowerStrategy, getBollingerBands, getBollingerBandsStrategy, getBollingerBandsWidth, getChaikinMoneyFlow |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part3.mjs | 8 | getChaikinMoneyFlowStrategy, getChaikinOscillator, getChandeForecastOscillator, getChandeForecastOscillatorStrategy, getChandelierExit, getCommunityChannelIndex, getDonchianChannel, getDoubleExponentialMovingAverage |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part4.mjs | 8 | getEaseOfMovement, getEaseOfMovementStrategy, getExponentialMovingAverage, getForceIndex, getForceIndexStrategy, getIchimokuCloud, getIchimokuCloudStrategy, getKdjStrategy |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part5.mjs | 8 | getKeltnerChannel, getMassIndex, getMoneyFlowIndex, getMoneyFlowIndexStrategy, getMovingAverageConvergenceDivergence, getMovingAverageConvergenceDivergenceStrategy, getMovingChandeForecastOscillator, getMovingMax |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part6.mjs | 8 | getMovingMin, getMovingStandardDeviation, getMovingSum, getNegativeVolumeIndex, getNegativeVolumeIndexStrategy, getOnBalanceVolume, getParabolicSar, getParabolicSARStrategy |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part7.mjs | 8 | getPercentagePriceOscillator, getPercentageVolumeOscillator, getPriceRateOfChange, getProjectionOscillator, getProjectionOscillatorStrategy, getQstick, getRandomIndex, getRelativeStrengthIndex |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part8.mjs | 8 | getRollingMovingAverage, getRsi2Strategy, getSimpleMovingAverage, getSince, getStochasticOscillator, getStochasticOscillatorStrategy, getTriangularMovingAverage, getTripleExponentialAverage |  | trading, indicators, analysis, cacheTtlFrequent |
| indicatorts | indicatorts-schema-part9.mjs | 8 | getTripleExponentialMovingAverage, getTrueRange, getTypicalPrice, getTypicalPriceStrategy, getUlcerIndex, getVolumePriceTrend, getVolumeWeightedAveragePrice, getVolumeWeightedAveragePriceStrategy |  | trading, indicators, analysis, cacheTtlFrequent |
| tradingsignals | trading-signals-momentum.mjs | 7 | computeRSI, computeMACD, computeStochasticRSI, computeMomentum, computeROC, computeCG, computeTDS |  | trading, indicators, momentum, oscillators |
| tradingsignals | trading-signals-ohlc.mjs | 8 | computeADX, computeATR, computeCCI, computeWilliamsR, computeStochasticOscillator, computeREI, computeDX, computeTR |  | trading, indicators, ohlc, candle-based |
| tradingsignals | trading-signals-trend.mjs | 8 | computeSMA, computeEMA, computeDEMA, computeWMA, computeWSMA, computeRMA, computeDMA, computeLinearRegression |  | trading, indicators, trend, moving-averages |
| tradingsignals | trading-signals-volatility.mjs | 4 | computeBollingerBands, computeBollingerBandsWidth, computeIQR, computeMAD |  | trading, indicators, volatility, bands |
| tradingsignals | trading-signals-volume.mjs | 7 | computeOBV, computeVWAP, computeAccelerationBands, computeAO, computeAC, computePSAR, computeZigZag |  | trading, indicators, volume, candle-based |
| unified | unified-momentum-advanced.mjs | 8 | computeAbsolutePriceOscillator, computePercentagePriceOscillator, computeCommodityChannelIndex, computeWilliamsPercentR, computeChandeMomentumOscillator, computeUltimateOscillator, computeAroon, computeBalanceOfPower |  | trading, indicators, momentum, advanced, unified |
| unified | unified-momentum-basic.mjs | 8 | computeRelativeStrengthIndex, computeMovingAverageConvergenceDivergence, computeStochasticOscillator, computeStochasticRSI, computeMomentum, computeRateOfChange, computeCenterOfGravity, computeTripleExponentialAverage |  | trading, indicators, momentum, oscillators, unified |
| unified | unified-trend-advanced.mjs | 8 | computeDisplacedMovingAverage, computeKaufmanAdaptiveMovingAverage, computeMESAAdaptiveMovingAverage, computeT3, computeLinearRegression, computeLinearRegressionSlope, computeLinearRegressionAngle, computeLinearRegressionIntercept |  | trading, indicators, trend, advanced, unified |
| unified | unified-trend-basic.mjs | 8 | computeSimpleMovingAverage, computeExponentialMovingAverage, computeDoubleExponentialMovingAverage, computeWeightedMovingAverage, computeTripleExponentialMovingAverage, computeTriangularMovingAverage, computeWildersSmoothingMovingAverage, computeRunningMovingAverage |  | trading, indicators, trend, moving-averages, unified |
| unified | unified-trend-channels.mjs | 6 | computeBollingerBands, computeBollingerBandsWidth, computeKeltnerChannel, computeDonchianChannel, computeAccelerationBands, computeIchimokuCloud |  | trading, indicators, trend, channels, bands, unified |
| unified | unified-volatility.mjs | 8 | computeAverageTrueRange, computeTrueRange, computeNormalizedAverageTrueRange, computeInterquartileRange, computeMeanAbsoluteDeviation, computeUlcerIndex, computeMassIndex, computeChandelierExit |  | trading, indicators, volatility, unified |
| unified | unified-volume.mjs | 8 | computeOnBalanceVolume, computeVolumeWeightedAveragePrice, computeAccumulationDistribution, computeAccumulationDistributionOscillator, computeChaikinMoneyFlow, computeMoneyFlowIndex, computeVolumeWeightedMovingAverage, computeVolumePriceTrend |  | trading, indicators, volume, unified |
| infura | contract-read.mjs | 1 | readContract | INFURA_API_KEY | blockchain, evm, smartcontract, multichain, infura, cacheTtlRealtime |
| infura | node-read-part1.mjs | 8 | getBlockNumber, getBalance, getGasPrice, getBlock, getCode, getTransactionCount, getTransactionByHash, getTransactionReceipt | INFURA_API_KEY | blockchain, evm, rpc, multichain, infura, cacheTtlRealtime |
| infura | node-read-part2.mjs | 1 | getLogs | INFURA_API_KEY | blockchain, evm, rpc, multichain, infura, cacheTtlRealtime |
| irys | irys.mjs | 2 | getTransactions, getTransactionById |  | irys, arweave, storage, decentralized, cacheTtlFrequent |
| itausschreibung | tenders.mjs | 6 | getAllTenders, getSoftwareTenders, getHardwareTenders, getInternetTenders, getTelecomTenders, getConsultingTenders |  | procurement, germany, tenders, it, cacheTtlDaily |
| jupiter | jupiter-all.mjs | 8 | getTokenPrice, getTokenInfo, getTokensInMarket, getAllTradableTokens, getTaggedTokens, getNewTokens, getAllTokens, getSwapQuote | JUPITER_API_KEY | solana, defi, swap, cacheTtlRealtime |
| klinikatlas | german-places.mjs | 5 | searchPlaces, getPlaceByZip, getPlacesByDistrict, getPlacesNearby, getGermanStates |  | healthcare, germany, geography, places, cacheTtlDaily |
| klinikatlas | hospitals.mjs | 5 | getAllHospitals, searchHospitals, getHospitalsByCity, getHospitalsNearby, getStateStatistics |  | healthcare, germany, hospitals, cacheTtlDaily |
| klinikatlas | medical-codes.mjs | 4 | searchIcdCodes, getIcdCode, searchOpsCodes, getOpsCode |  | healthcare, germany, medical, icd, ops, cacheTtlDaily |
| lebensmittelwarnungen | warnings.mjs | 1 | getWarnings | LEBENSMITTELWARNUNGEN_API_KEY | government, food, safety, consumer, germany, opendata, cacheTtlFrequent |
| llama | getPools.mjs | 2 | getProjectsByName, getPools |  | defi, pools, liquidity, cacheTtlFrequent |
| lobbyregister | lobbyregister.mjs | 4 | searchEntries, getEntryByNumber, getEntryVersion, getStatistics | LOBBYREGISTER_API_KEY | government, transparency, lobbying, parliament, germany, opendata, cacheTtlDaily |
| luksonetwork | address-part1.mjs | 8 | listAddresses, getAddress, getAddressCounters, getAddressTransactions, getAddressTokenTransfers, getAddressInternalTxs, getAddressLogs, getBlocksValidated |  | lukso, address, explorer, cacheTtlDaily |
| luksonetwork | address-part2.mjs | 4 | getTokenBalances, getFlatTokenBalances, getCoinBalanceHistory, getCoinBalanceByDay |  | lukso, address, explorer, cacheTtlDaily |
| luksonetwork | blocks.mjs | 4 | getBlocks, getBlockById, getBlockTransactions, getBlockWithdrawals |  | lukso, blocks, explorer, cacheTtlFrequent |
| luksonetwork | graphql.mjs | 2 | getLuksoExplorerSchema, fectchLuksoExplorer |  | lukso, graphql, explorer, cacheTtlDaily |
| luksonetwork | internal.mjs | 2 | getMainPageTransactions, getMainPageBlocks |  | lukso, internal, explorer, cacheTtlDaily |
| luksonetwork | nfts.mjs | 7 | getNFTsByAddress, getNFTCollectionsByAddress, getNFTInstancesByContract, getNFTInstanceById, getNFTInstanceTransfers, getNFTInstanceHolders, getNFTInstanceTransfersCount |  | lukso, nft, collectibles, cacheTtlDaily |
| luksonetwork | search.mjs | 2 | search, searchRedirect |  | lukso, search, explorer, cacheTtlDaily |
| luksonetwork | sourceCode.mjs | 4 | listcontracts, getabi, getsourcecode, getcontractcreation |  | lukso, contracts, sourcecode, cacheTtlDaily |
| luksonetwork | stats.mjs | 3 | getStats, getTransactionChart, getMarketChart |  | lukso, statistics, network, cacheTtlDaily |
| luksonetwork | tokens.mjs | 5 | listTokens, getTokenByAddress, getTokenTransfersByAddress, getTokenHolders, getTokenCounters |  | lukso, tokens, balances, cacheTtlDaily |
| luksonetwork | transactions.mjs | 7 | getTransactions, getTransactionByHash, getTokenTransfersByTransactionHash, getInternalTransactions, getLogs, getRawTrace, getStateChanges |  | lukso, transactions, explorer, cacheTtlFrequent |
| magiceden | magiceden.mjs | 5 | getCollectionStats, getCollectionListings, getCollectionActivities, getTokenListings, getTokenActivities |  | nft, solana, marketplace, cacheTtlFrequent |
| marktstammdaten | energy-units.mjs | 5 | getStromerzeugung, getFilterColumnsStromerzeugung, getFilterColumnsStromverbrauch, getFilterColumnsGaserzeugung, getFilterColumnsGasverbrauch |  | government, energy, electricity, gas, germany, opendata, cacheTtlDaily |
| mcpregistry | servers.mjs | 2 | listServers, searchServers |  | mcp, registry, ai, tools, cacheTtlDaily |
| medium | rss-feeds.mjs | 4 | getTagFeed, getUserFeed, getPublicationFeed, getTopicFeed |  | content, social, feeds, cacheTtlDaily |
| memorylol | twitterNameChanges.mjs | 1 | queryUsernameChanges |  | social, twitter, history, cacheTtlDaily |
| merkl | merkl.mjs | 3 | getOpportunities, getUserRewards, getChains |  | defi, rewards, yield, multichain |
| meteora | meteora.mjs | 7 | getPools, getPoolByAddress, getPoolGroups, getPoolGroupByMints, getPoolOhlcv, getPoolVolumeHistory, getProtocolMetrics |  | defi, solana, amm, dlmm, cacheTtlFrequent |
| minascandevnet | mina-devnet.mjs | 2 | getMinaDevnetSchema, getMinaDevnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| minascanmainnet | mina-mainnet.mjs | 2 | getMinaMainnetSchema, getMinaMainnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| moralis | blockchainApi.mjs | 7 | /block/:block_number_or_hash, /dateToBlock, /transaction/:transaction_hash/verbose, /:address/verbose, /latestBlockNumber/:chain, /transaction/:transaction_hash, /:address | MORALIS_API_KEY | evm, blockchain, blocks, cacheTtlFrequent |
| moralis | defiApi.mjs | 3 | /wallets/:address/defi/:protocol/positions, /wallets/:address/defi/positions, /wallets/:address/defi/summary | MORALIS_API_KEY | evm, defi, positions, cacheTtlFrequent |
| moralis | entity.mjs | 1 | /entities/categories | MORALIS_API_KEY | evm, identity, entities, cacheTtlDaily |
| moralis | nftApi-part1.mjs | 8 | /market-data/nfts/top-collections, /market-data/nfts/hottest-collections, /nft/:address, /nft/:address/stats, /nft/:address/metadata, /nft/:address/transfers, /nft/:address/:token_id, /nft/:address/owners | MORALIS_API_KEY | evm, nft, collectibles, cacheTtlFrequent |
| moralis | nftApi-part2.mjs | 8 | /nft/:address/:token_id/owners, /nft/:address/:token_id/trades, /wallets/:address/nfts/trades, /nft/:address/trades, /nft/:address/traits/paginate, /nft/:address/traits, /nft/:address/:token_id/transfers, /:address/nft/collections | MORALIS_API_KEY | evm, nft, collectibles, cacheTtlFrequent |
| moralis | nftApi-part3.mjs | 4 | /:address/nft/transfers, /:address/nft, /nft/:address/:token_id/metadata/resync, /nft/:address/traits/resync | MORALIS_API_KEY | evm, nft, collectibles, cacheTtlFrequent |
| moralis | priceApi.mjs | 7 | /nft/:address/price, /nft/:address/floor-price, /nft/:address/:token_id/floor-price, /nft/:address/floor-price/historical, /nft/:address/:token_id/price, /pairs/:address/ohlcv, /erc20/:address/price | MORALIS_API_KEY | evm, prices, tokens, cacheTtlRealtime |
| moralis | tokenApi-part1.mjs | 8 | /:pair_address/reserves, /pairs/:address/snipers, /pairs/:address/swaps, /wallets/:address/swaps, /tokens/:address/analytics, /erc20/:token_address/owners, /erc20/metadata/symbols, /erc20/metadata | MORALIS_API_KEY | evm, tokens, balances, cacheTtlFrequent |
| moralis | tokenApi-part2.mjs | 8 | /erc20/:address/stats, /erc20/:address/transfers, /market-data/erc20s/top-tokens, /erc20/:address/top-gainers, /wallets/:address/approvals, /wallets/:address/tokens, /:address/erc20, /:address/erc20/transfers | MORALIS_API_KEY | evm, tokens, balances, cacheTtlFrequent |
| moralis | utils.mjs | 2 | /info/endpointWeights, /web3/version | MORALIS_API_KEY | evm, utilities, conversion, cacheTtlDaily |
| moralis | walletApi-part1.mjs | 8 | /wallets/:address/chains, /:address/balance, /wallets/:address/history, /wallets/:address/net-worth, /wallets/:address/profitability/summary, /wallets/:address/profitability, /wallets/:address/stats, /resolve/:address/domain | MORALIS_API_KEY | evm, wallet, portfolio, cacheTtlFrequent |
| moralis | walletApi-part2.mjs | 3 | /resolve/:address/reverse, /resolve/:domain, /resolve/ens/:domain | MORALIS_API_KEY | evm, wallet, portfolio, cacheTtlFrequent |
| morpho | markets.mjs | 4 | getMarkets, getMarketByKey, getUserPositions, getChains |  | defi, lending, morpho, multichain, cacheTtlFrequent |
| morpho | vaults.mjs | 3 | getVaults, getVaultByAddress, getVaultFactories |  | defi, lending, morpho, vaults, multichain, cacheTtlFrequent |
| mudab | marine-data.mjs | 3 | getStations, getParameters, getProjectStations |  | marine, germany, environment, monitoring, cacheTtlFrequent |
| newsapi | news.mjs | 3 | getTopHeadlines, getEverything, getSources | NEWSAPI_API_KEY | news, media, content, cacheTtlFrequent |
| newsdata | getNews.mjs | 2 | getLatestNewsdata, getCryptoNewsdata | NEWSDATA_API_KEY | news, media, global, cacheTtlFrequent |
| neynar | neynar.mjs | 5 | getUserByUsername, getUsersByFid, getUsersByAddress, getCast, getUserCasts | NEYNAR_API_KEY | social, farcaster, crypto |
| nina | warnings.mjs | 4 | getDwdWarnings, getMowasWarnings, getBiwappWarnings, getKatwarnWarnings |  | warnings, germany, safety, cacheTtlFrequent |
| oeffentlichevergabe | tenders.mjs | 2 | getNoticesByDay, getNoticesByMonth |  | procurement, germany, tenders, government, cacheTtlDaily |
| ohlcv | olhcv-moralis-evm.mjs | 1 | getRecursiveOhlcvEVM | MORALIS_API_KEY | evm, ohlcv, charts, cacheTtlRealtime |
| ohlcv | olhcv-moralis-solana.mjs | 1 | getRecursiveOhlcvSolana | MORALIS_API_KEY | solana, ohlcv, charts, cacheTtlRealtime |
| ohlcv | olhcv-solana-tracker.mjs | 1 | getOhlcvSolana | SOLANA_TRACKER_API_KEY | solana, ohlcv, charts, cacheTtlRealtime |
| oneinch | swap.mjs | 5 | getQuote, getSwap, getTokens, getApprove, getAllowance | ONEINCH_API_KEY | defi, swap, ethereum, trading, cacheTtlRealtime |
| opensea | opensea.mjs | 5 | getCollectionStats, getCollection, getNft, getEventsByCollection, getListingsByCollection | OPENSEA_API_KEY | nft, marketplace, ethereum, cacheTtlFrequent |
| orca | orca.mjs | 3 | getWhirlpools, getWhirlpoolByAddress, getTokens |  | defi, solana, dex, clmm, cacheTtlFrequent |
| overpass | osmQuery.mjs | 3 | queryRaw, findNearby, status |  | openstreetmap, geodata, maps, cacheTtlDaily |
| passportonchain | onchain-data.mjs | 1 | getFullPassportData | ETHEREUM_MAINNET_ALCHEMY_HTTP, ARBITRUM_MAINNET_ALCHEMY_HTTP | identity, attestation, gitcoin, cacheTtlDaily |
| pegelonline | pegelonline.mjs | 4 | getStations, getStation, getMeasurements, getWaters |  | water, environment, germany, government, cacheTtlFrequent |
| pegelonline | water-levels.mjs | 4 | getStations, getStationDetail, getWaters, getCurrentMeasurement |  | water, germany, environment, hydrology, cacheTtlFrequent |
| pflanzenschutzmittel | pesticides.mjs | 4 | getProducts, getActiveIngredients, getCompanies, getRestrictions |  | agriculture, germany, pesticides, regulation, cacheTtlDaily |
| pinata | read.mjs | 2 | free_read_example, free_read_cid |  | ipfs, storage, read, cacheTtlDaily |
| pinata | write.mjs | 1 | upload_text_file | PINATA_JWT, PINATA_GATEWAY | ipfs, storage, write, cacheTtlDaily |
| poap | graphql.mjs | 5 | getTypename, getSchemaDefinition, getPredefinedQueryList, executePrefinedQuery, querySubgraph |  | nft, attendance, graphql, events, cacheTtlDaily |
| polymarket | gammaApi.mjs | 3 | searchEvents, getEvents, getMarkets |  | predictions, markets, events, cacheTtlFrequent |
| polymarket | marketInfo.mjs | 2 | getMarkets, getMarketInfo |  | prediction, markets, trading, cacheTtlFrequent |
| polymarket | searchBySlug.mjs | 1 | searchBySlug |  | prediction, markets, events, cacheTtlFrequent |
| pumpfun | pumpfun.mjs | 4 | getCoins, getCoinByMint, getCurrentlyLive, getUserProfile |  | crypto, solana, memecoins, defi, cacheTtlFrequent |
| quickchart | charts.mjs | 2 | renderChart, getChartUrl |  | charts, visualization, images, cacheTtlStatic |
| redditscanner | getTokenMentions.mjs | 2 | getTokenMentions, getHotMemes |  | social, sentiment, crypto, cacheTtlFrequent |
| reisewarnungen | travel-warnings.mjs | 2 | getAllWarnings, getCountryWarning |  | travel, warnings, germany, safety, cacheTtlDaily |
| rugcheck | tokenSafety.mjs | 6 | getTokenReport, getTokenVotes, getRecentTokens, getTrendingTokens, getNewTokens, getVerifiedTokens |  | solana, security, tokens, cacheTtlFrequent |
| safeglobal | transaction-service.mjs | 4 | getSafeInfo, getSafeBalances, getMultisigTransactions, getIncomingTransfers |  | ethereum, multisig, defi, wallet, cacheTtlFrequent |
| santiment | schema.mjs | 5 | get_sentiment_balance, get_social_volume, alert_social_shift, get_trending_words, get_social_dominance | SANTIMENT_API_KEY | crypto, analytics, sentiment, cacheTtlFrequent |
| servicebund | tenders.mjs | 6 | searchTenders, getTendersByState, getTendersByCategory, getAwardedContracts, searchByKeyword, getRecentTenders |  | procurement, tenders, germany, government, opendata |
| simdune | activityEVM.mjs | 2 | getActivityEVM, getActivityDetailedEVM | DUNE_SIM_API_KEY | production, activity, analytics, feed, cacheTtlDaily |
| simdune | balancesEVM.mjs | 1 | getBalancesEVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio, cacheTtlDaily |
| simdune | balancesSVM.mjs | 1 | getBalancesSVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio, svm, solana, cacheTtlDaily |
| simdune | collectiblesEVM.mjs | 1 | getCollectiblesEVM | DUNE_SIM_API_KEY | production, nft, collectibles, metadata, cacheTtlDaily |
| simdune | tokenHoldersEVM.mjs | 1 | getTokenHoldersEVM | DUNE_SIM_API_KEY | production, token, analytics, holders, cacheTtlDaily |
| simdune | tokenInfoEVM.mjs | 1 | getTokenInfoEVM | DUNE_SIM_API_KEY | production, token, analytics, metadata, cacheTtlDaily |
| simdune | transactionsEVM.mjs | 1 | getTransactionsEVM | DUNE_SIM_API_KEY | production, transactions, analytics, history, cacheTtlDaily |
| simdune | transactionsSVM.mjs | 1 | getTransactionsSVM | DUNE_SIM_API_KEY | production, transactions, analytics, history, svm, solana, cacheTtlDaily |
| smard | energy.mjs | 2 | getFilterIndex, getLatestData |  | energy, germany, electricity, market, cacheTtlStatic |
| snapshot | snapshot.mjs | 3 | listSpaces, listProposals, getProposalDetails |  | dao, governance, voting, cacheTtlDaily |
| solanatracker | --additionalRoutes.mjs | 2 | tokenStats, tokenStatsByPool | SOLANA_TRACKER_API_KEY | solana, analytics, tokens, cacheTtlFrequent |
| solanatracker | --chartRoutes.mjs | 2 | chartData, chartDataByPool | SOLANA_TRACKER_API_KEY | solana, charts, ohlcv, cacheTtlFrequent |
| solanatracker | --pnlRoutes.mjs | 3 | profitAndLossData, pnlForSpecificToken, firstBuyers | SOLANA_TRACKER_API_KEY | solana, pnl, portfolio, cacheTtlFrequent |
| solanatracker | --priceEndpoints.mjs | 7 | priceInformation, postPrice, multiPriceInformation, getHistoricPrice, getPriceAtTimestamp, getPriceRange, postMultiPrice | SOLANA_TRACKER_API_KEY | solana, prices, tokens, cacheTtlRealtime |
| solanatracker | --tokenEndpoints-part1.mjs | 8 | tokenInformation, tokenHolders, topTokenHolders, allTimeHighPrice, tokensByDeployer, search, latestTokens, multipleTokens | SOLANA_TRACKER_API_KEY | solana, tokens, discovery, cacheTtlFrequent |
| solanatracker | --tokenEndpoints-part2.mjs | 7 | trendingTokens, tokensByVolume, tokenOverview, graduatedTokens, tokenByPool, trendingTokensByTimeframe, tokensByVolumeTimeframe | SOLANA_TRACKER_API_KEY | solana, tokens, discovery, cacheTtlFrequent |
| solanatracker | --topTraderRoutes.mjs | 3 | topTradersAll, topTradersAllPaged, topTradersByToken | SOLANA_TRACKER_API_KEY | solana, trading, leaderboard, cacheTtlFrequent |
| solanatracker | --tradeEndpoints.mjs | 4 | tokenTrades, tradesByWallet, tokenPoolTrades, userPoolTrades | SOLANA_TRACKER_API_KEY | solana, trading, swaps, cacheTtlRealtime |
| solanatracker | --walletEndpoints.mjs | 4 | walletInformation, walletTokensBasic, walletTokensPaged, walletTrades | SOLANA_TRACKER_API_KEY | solana, wallet, portfolio, cacheTtlFrequent |
| solscan | getChainInfo.mjs | 1 | chainInfo | SOLSCAN_API_KEY | solana, explorer, blocks, cacheTtlFrequent |
| solsniffer | analysis.mjs | 1 | analysisToken | SOLSNIFFER_API_KEY | solana, security, analysis, cacheTtlFrequent |
| sourcify | verification.mjs | 5 | getVerificationStatus, checkByAddresses, getSourceFileTree, getSourceFiles, getSupportedChains |  | ethereum, verification, smartcontracts, cacheTtlDaily |
| spaceid | spaceid.mjs | 3 | getSupportedChains, getAddress, getName |  | production, domain, identity, blockchain, cacheTtlDaily |
| starknet | starknet-token.mjs | 3 | getTokenBalance, getBlockNumber, getBlockInfo |  | starknet, defi, tokens, cacheTtlFrequent |
| stolpersteineberl | memorial-stones.mjs | 4 | getAllStones, searchStones, getStonesByDistrict, getStonesByLocation |  | memorial, history, berlin |
| strahlenschutz | radiation.mjs | 2 | getLatestReadings, getStationTimeseries |  | radiation, germany, environment, safety, cacheTtlFrequent |
| swaggerhub | api-registry.mjs | 2 | searchApis, listApiVersions |  | production, api, documentation, registry, cacheTtlDaily |
| taapi | indicators-part1.mjs | 8 | getRSI, getMACD, getBollingerBands, getEMA, getSMA, getStochastic, getATR, getStochRSI | TAAPI_SECRET | crypto, trading, indicators, cacheTtlFrequent |
| taapi | indicators-part2.mjs | 2 | getVWAP, getIchimoku | TAAPI_SECRET | crypto, trading, indicators, cacheTtlFrequent |
| tagesschau | news.mjs | 4 | getHomepage, getNews, searchArticles, getChannels |  | news, germany, media, cacheTtlFrequent |
| talentprotocol | advancedSearch.mjs | 2 | searchAdvancedProfiles, getDefaultFields | TALENT_API_KEY | identity, talent, profiles, cacheTtlDaily |
| tally | governance.mjs | 4 | getChains, getGovernors, getProposals, getDelegates | TALLY_API_KEY | governance, dao, proposals, voting, cacheTtlDaily |
| ted | procurement.mjs | 1 | searchNotices |  | procurement, europe, tenders, government, cacheTtlDaily |
| tenderly | public-contracts.mjs | 1 | getPublicContract |  | ethereum, smartcontracts, debugging, cacheTtlStatic |
| thegraph | getNewUniswapPools.mjs | 1 | getNewPools | THEGRAPH_API_KEY | defi, uniswap, graphql, cacheTtlDaily |
| thegraph | getSchema.mjs | 2 | getSubgraphSchema, querySubgraph | THEGRAPH_API_KEY | defi, subgraph, graphql, cacheTtlStatic |
| twitter | search.mjs | 1 | searchRecentTweets | TWITTER_BEARER_TOKEN | social, search, mentions, cacheTtlFrequent |
| umweltbundesamt | air-quality.mjs | 5 | getStations, searchStations, getComponents, getAirQualityIndex, getMeasurements |  | airquality, germany, environment, pollution |
| uniswap | uniswap-pool-explorer.mjs | 2 | getTokenPools, getPoolData | THEGRAPH_API_KEY | production, cacheTtlDaily |
| uniswap | price-discovery.mjs | 2 | getSupportedChains, getTokenPrice | ETHEREUM_MAINNET_ALCHEMY_HTTP, POLYGON_MAINNET_ALCHEMY_HTTP, ARBITRUM_MAINNET_ALCHEMY_HTTP, OPTIMISM_MAINNET_ALCHEMY_HTTP | production, dex, trading, defi, cacheTtlRealtime |
| vag | transit.mjs | 2 | getStops, getDepartures |  | transit, germany, realtime, nuremberg, cacheTtlStatic |
| webcareer | job-listings.mjs | 1 | queryJobs | WEB3_CAREER_API_TOKEN | production, jobs, career, crypto, cacheTtlDaily |
| wikipedia | wikipedia.mjs | 4 | getPageSummary, searchArticles, openSearch, getMediaList |  | knowledge, encyclopedia, search, cacheTtlDaily |
| wormholescan | wormholescan.mjs | 7 | getCrossChainActivity, getMoneyFlow, getTopAssetsByVolume, getTopChainPairsByNumTransfers, getTopSymbolsByVolume, getTopCorridors, getKpiList |  | data, api, cacheTtlFrequent |
| xpayment | ping.mjs | 2 | free_ping, paid_ping |  | payments, protocol, micropayments, cacheTtlStatic |
| yahoofinance | Ohlcv.mjs | 1 | getOhlcv |  | trading, ohlcv, stocks, crypto, forex, charts |
| yahoofinance | Quote.mjs | 2 | getQuote, getQuoteBatch |  | trading, stocks, crypto, forex, prices |
| yahoofinance | Search.mjs | 1 | searchSymbol |  | trading, stocks, crypto, forex, search |
| yfinance | chart.mjs | 2 | getOhlcv, getQuote |  | finance, prices, ohlcv, stocks, crypto, cacheTtlDaily |
| zerox | zerox.mjs | 4 | getPrice, getQuote, getPermitPrice, getPermitQuote | ZEROX_API_KEY | defi, dex, swap, aggregator, cacheTtlRealtime |
| zoll | customs.mjs | 6 | getExchangeRates, getCategories, getProducts, getCountries, getProductGroups, getProductUnits |  | government, customs, tariffs, trade, germany, opendata, cacheTtlDaily |
| zvgportal | auctions.mjs | 2 | searchAuctions, getAuctionDetail |  | immobilien, auktionen, justiz, cacheTtlDaily |
| zvgportal | zwangsversteigerungen.mjs | 1 | searchAuctions |  | immobilien, auktionen, justiz, cacheTtlDaily |

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
                "ALCHEMY_API_KEY": "",
                "ARBITRUM_MAINNET_ALCHEMY_HTTP": "",
                "BICSCAN_API_KEY": "",
                "BIRDEYE_API_KEY": "",
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
                "DEBANK_ACCESS_KEY": "",
                "DIP_API_KEY": "",
                "DUNE_API_KEY": "",
                "DUNE_SIM_API_KEY": "",
                "ENSO_API_KEY": "",
                "ENTGELTATLAS_API_KEY": "",
                "ETHEREUM_MAINNET_ALCHEMY_HTTP": "",
                "ETHERSCAN_API_KEY": "",
                "GEOAPIFY_API_KEY": "",
                "GOLDRUSH_API_KEY": "",
                "INFURA_API_KEY": "",
                "JUPITER_API_KEY": "",
                "LEBENSMITTELWARNUNGEN_API_KEY": "",
                "LOBBYREGISTER_API_KEY": "",
                "MORALIS_API_KEY": "",
                "NEWSAPI_API_KEY": "",
                "NEWSDATA_API_KEY": "",
                "NEYNAR_API_KEY": "",
                "ONEINCH_API_KEY": "",
                "OPENSEA_API_KEY": "",
                "OPTIMISM_MAINNET_ALCHEMY_HTTP": "",
                "PINATA_GATEWAY": "",
                "PINATA_JWT": "",
                "POLYGON_MAINNET_ALCHEMY_HTTP": "",
                "SANTIMENT_API_KEY": "",
                "SOLANA_TRACKER_API_KEY": "",
                "SOLSCAN_API_KEY": "",
                "SOLSNIFFER_API_KEY": "",
                "TAAPI_SECRET": "",
                "TALENT_API_KEY": "",
                "TALLY_API_KEY": "",
                "THEGRAPH_API_KEY": "",
                "TWITTER_BEARER_TOKEN": "",
                "WEB3_CAREER_API_TOKEN": "",
                "ZEROX_API_KEY": ""
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