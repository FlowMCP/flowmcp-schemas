# FlowMCP v2.0.0 — Migration Status

Generated: 2026-02-17T16:11

## Summary

| Metric | Count | Percent |
|--------|------:|--------:|
| Total Routes | 700 | 100% |
| With Tests | 700 | 100% |
| With Output Schema | 369 | 53% |
| Complete (Tests + Output) | 516 | 74% |
| Capture OK | 374 | 53% |
| Capture Failed | 26 | 4% |
| Not Captured | 300 | 43% |
| Has Handler (post/exec) | 337 | 48% |
| Needs API Key | 276 | 39% |
| Needs Library | 182 | 26% |

## Legend

| Column | Values |
|--------|--------|
| Tests | Y = has tests, **-** = missing |
| Output | Y = has output schema, **-** = missing |
| Capture | ok = API responded, fail = error, **-** = not attempted |
| Handler | post = postRequest, exec = executeRequest, **-** = none |
| Key | Y = needs API key, **-** = no key needed |
| Lib | Y = needs library, **-** = no library needed |

## Routes

### aave (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| aave | getReserves | Y | Y | ok | - | Y | - |  |
| aave | getUserData | Y | Y | ok | - | Y | - |  |
| aave | getProtocolData | Y | Y | ok | - | Y | - |  |

### alchemy (0/19 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| contract-read-part1 | readContract | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20TokenInfo | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20Allowance | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721TokenInfo | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721OwnerOf | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721TokenURI | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part2 | erc1155BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part2 | erc1155Uri | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBlockNumber | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBalance | Y | - | - | - | Y | Y |  |
| node-read-part1 | getGasPrice | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBlock | Y | - | - | - | Y | Y |  |
| node-read-part1 | getCode | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionCount | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionByHash | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionReceipt | Y | - | - | - | Y | Y |  |
| node-read-part2 | getLogs | Y | - | - | - | Y | Y |  |

### alternative-me (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| fearAndGreed | getCurrentFng | Y | Y | ok | post | - | - |  |
| fearAndGreed | getHistoricalFng | Y | Y | ok | post | - | - |  |
| fearAndGreed | analyzeFngTrend | Y | Y | ok | post | - | - |  |

### arbeitsagentur (6/8 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| education | searchApprenticeships | Y | - | - | post | - | - |  |
| education | searchStudyPrograms | Y | - | - | exec | - | - |  |
| jobs | searchJobs | Y | Y | ok | post | - | - |  |
| jobs | searchJobsByEmployer | Y | Y | ok | post | - | - |  |
| jobsuche | searchJobs | Y | Y | ok | - | - | - |  |
| jobsuche | searchJobsApp | Y | Y | ok | - | - | - |  |
| professions | searchProfessions | Y | Y | ok | post | - | - |  |
| professions | getProfessionDetail | Y | Y | ok | post | - | - |  |

### autobahn (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| traffic | listRoads | Y | Y | ok | post | - | - |  |
| traffic | getRoadworks | Y | Y | ok | post | - | - |  |
| traffic | getWarnings | Y | Y | ok | post | - | - |  |
| traffic | getClosures | Y | Y | ok | post | - | - |  |
| traffic | getChargingStations | Y | Y | ok | post | - | - |  |
| traffic | getWebcams | Y | Y | ok | post | - | - |  |

### avalanche (8/8 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| metrics-api | listChains | Y | Y | ok | - | - | - |  |
| metrics-api | getChainInfo | Y | Y | ok | - | - | - |  |
| metrics-api | getChainMetrics | Y | Y | ok | - | - | - |  |
| metrics-api | getRollingWindowMetrics | Y | Y | ok | - | - | - |  |
| metrics-api | getStakingMetrics | Y | Y | ok | - | - | - |  |
| metrics-api | getValidatorMetrics | Y | Y | ok | - | - | - |  |
| metrics-api | getICMSummary | Y | Y | ok | - | - | - |  |
| metrics-api | getICMTimeseries | Y | Y | ok | - | - | - |  |

### beaconchain (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| validatorQueue | getActivationQueue | Y | Y | ok | post | - | - |  |
| validatorQueue | getExitQueue | Y | Y | ok | post | - | - |  |
| validatorQueue | getValidatorStatus | Y | Y | ok | post | - | - |  |

### berlin-de (9/10 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| events | markets_festivals | Y | Y | ok | - | - | - |  |
| events | street_festivals | Y | Y | ok | - | - | - |  |
| events | christmas_markets | Y | Y | ok | - | - | - |  |
| events | police_assemblies | Y | Y | ok | - | - | - |  |
| funds | funding_opportunities | Y | Y | ok | - | - | - |  |
| funds | continuing_education | Y | Y | ok | - | - | - |  |
| procurement | getProcurementNotices | Y | - | - | exec | - | - |  |
| vhs | all_courses | Y | Y | ok | - | - | - |  |
| wfs-locations | dog_parks | Y | Y | ok | - | - | - |  |
| wfs-locations | bbq_areas | Y | Y | ok | - | - | - |  |

### bicscan (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| bicscan | getRiskScore | Y | Y | ok | - | Y | - |  |
| bicscan | getAssets | Y | Y | ok | - | Y | - |  |

### bitget (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| bitget | getTokenPrice | Y | - | - | - | - | - |  |
| bitget | getAnnoucements | Y | - | - | exec | - | - |  |
| bitget | getCoinInfo | Y | - | - | exec | - | - |  |

### blockberry-one (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| mina-mainnet | getDashboardInfo | Y | Y | ok | - | Y | - |  |
| mina-mainnet | getAccountByHash | Y | Y | ok | - | Y | - |  |
| mina-mainnet | getAccountBalance | Y | Y | ok | - | Y | - |  |
| mina-mainnet | getBlocks | Y | Y | ok | - | Y | - |  |
| mina-mainnet | getZkAppTransactions | Y | Y | ok | - | Y | - |  |
| mina-mainnet | getZkAppByAddress | Y | Y | ok | - | Y | - |  |

### blockchain-info (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| utxoAndBlocks | getUTXO | Y | Y | ok | - | - | - |  |
| utxoAndBlocks | getBlockStats | Y | Y | ok | - | - | - |  |

### blocknative (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| gasprice | getGasPrices | Y | Y | ok | - | Y | - |  |

### bridgerates (3/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| bridgerates | getSupportedChains | Y | Y | ok | - | - | - |  |
| bridgerates | getSupportedTools | Y | Y | ok | - | - | - |  |
| bridgerates | getConnections | Y | Y | ok | - | - | - |  |
| bridgerates | getTransferStatus | Y | - | fail | - | - | - | HTTP 400 |

### bscscan (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getContractBinance | getContractABI | Y | Y | ok | post | Y | - |  |
| getContractBinance | getContractSourceCode | Y | Y | ok | post | Y | - |  |

### ccxt (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| orderbook | calculateOrderbook | Y | - | - | - | - | Y |  |
| orderbook | compareOrderbook | Y | - | - | - | - | Y |  |

### chainlink (0/27 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getLatestPrices-part1 | getAvailableChains | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getAvailableFeedsForChain | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPriceEthereum | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPriceBinance | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPricePolygon | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPriceAvalanche | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPriceAribitrum | Y | - | - | - | Y | Y |  |
| getLatestPrices-part1 | getLatestPriceOptimism | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceBase | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceLinea | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceMantle | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceScroll | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceZksync | Y | - | - | - | Y | Y |  |
| getLatestPrices-part2 | getLatestPriceCelo | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAvailableChains | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesEthereum | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesBinance | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesPolygon | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesAvalanche | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesAribitrum | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesOptimism | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part1 | getAllLatestPricesBase | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part2 | getAllLatestPricesLinea | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part2 | getAllLatestPricesMantle | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part2 | getAllLatestPricesScroll | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part2 | getAllLatestPricesZksync | Y | - | - | - | Y | Y |  |
| getLatestPricesMulticall-part2 | getAllLatestPricesCelo | Y | - | - | - | Y | Y |  |

### chainlist (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| chainlist | getChainById | Y | - | - | exec | - | - |  |
| chainlist | getChainsByKeyword | Y | - | - | exec | - | - |  |
| chainlist | getExplorerURLs | Y | - | - | exec | - | - |  |
| chainlist | getRPCEndpoints | Y | - | - | exec | - | - |  |
| chainlist | getWebsocketEndpoints | Y | - | - | exec | - | - |  |

### chart-img-com (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| tradingview-charts | getAdvancedChart | Y | - | - | exec | Y | - |  |

### coinbase-bazaar (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| discovery | listResources | Y | Y | ok | post | - | - |  |

### coincap (9/9 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| assets | listAssets | Y | Y | ok | - | Y | - |  |
| assets | singleAsset | Y | Y | ok | - | Y | - |  |
| assets | assetMarkets | Y | Y | ok | - | Y | - |  |
| assets | assetHistory | Y | Y | ok | - | Y | - |  |
| exchanges | listExchanges | Y | Y | ok | - | Y | - |  |
| exchanges | getExchangeById | Y | Y | ok | - | Y | - |  |
| markets | listMarkets | Y | Y | ok | - | Y | - |  |
| rates | listRates | Y | Y | ok | - | Y | - |  |
| rates | getRateBySlug | Y | Y | ok | - | Y | - |  |

### coingecko-com (26/26 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| coingecko-stablecoins | getSupportedStablecoins | Y | Y | ok | post | - | - |  |
| coingecko-stablecoins | getCurrentPrice | Y | Y | ok | post | - | - |  |
| coingecko-stablecoins | getHistoricalData | Y | Y | ok | post | - | - |  |
| coingecko-stablecoins | analyzePegStability | Y | Y | ok | post | - | - |  |
| coins | getCoinsList | Y | Y | ok | - | - | - |  |
| coins | getCoinsMarkets | Y | Y | ok | - | - | - |  |
| coins | getCoinById | Y | Y | ok | - | - | - |  |
| coins | getCoinMarketChart | Y | Y | ok | - | - | - |  |
| coins | getCoinHistory | Y | Y | ok | - | - | - |  |
| coins | getCoinTickers | Y | Y | ok | - | - | - |  |
| coins | getCoinContractInfo | Y | Y | ok | - | - | - |  |
| derivatives | getDerivativeExchangeIds | Y | Y | ok | post | - | - |  |
| derivatives | getDerivativeExchangesByIds | Y | Y | ok | post | - | - |  |
| derivatives | getDerivativeProductsByExchangeId | Y | Y | ok | - | - | - |  |
| exchanges | getExchangesList | Y | Y | ok | - | - | - |  |
| exchanges | getExchangeById | Y | Y | ok | post | - | - |  |
| exchanges | getExchangeTickers | Y | Y | ok | post | - | - |  |
| getCategories | getAvailableCoinCategoryIds | Y | Y | ok | post | - | - |  |
| getCategories | getCoinCategoryDetailsByIds | Y | Y | ok | post | - | - |  |
| global | getGlobalData | Y | Y | ok | post | - | - |  |
| global | getDeFiGlobalData | Y | Y | ok | post | - | - |  |
| simplePrice | getSimplePrice | Y | Y | ok | post | - | - |  |
| simplePrice | getTokenPrice | Y | Y | ok | post | - | - |  |
| trending | getTrendingCoins | Y | Y | ok | post | - | - |  |
| trending | getTrendingNfts | Y | Y | ok | post | - | - |  |
| trending | getTrendingCategories | Y | Y | ok | post | - | - |  |

### coinmarketcap-com (10/10 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| category | getCategories | Y | Y | ok | post | Y | - |  |
| category | getCategory | Y | Y | ok | post | Y | - |  |
| category | getIdMap | Y | Y | ok | post | Y | - |  |
| category | getMetadataV2 | Y | Y | ok | post | Y | - |  |
| category | getQuotesLatestV2 | Y | Y | ok | post | Y | - |  |
| cmc-index | getHistorical | Y | Y | ok | - | Y | - |  |
| cmc-index | getLatest | Y | Y | ok | - | Y | - |  |
| fear-and-greed | getFearAndGreedHistorical | Y | Y | ok | - | Y | - |  |
| fear-and-greed | getFearAndGreedLatest | Y | Y | ok | - | Y | - |  |
| listings | listingsLatest | Y | Y | ok | - | Y | - |  |

### coinstats (18/18 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| mixed-part1 | getCoins | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getCoinById | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getCoinChartById | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getCoinAvgPrice | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getCoinExchangePrice | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getTickerExchanges | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getTickerMarkets | Y | Y | ok | - | Y | - |  |
| mixed-part1 | getBlockchains | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getWalletBalance | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getWalletBalances | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getExchanges | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getFiatCurrencies | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getNewsSources | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getNews | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getNewsByType | Y | Y | ok | - | Y | - |  |
| mixed-part2 | getNewsById | Y | Y | ok | - | Y | - |  |
| mixed-part3 | getMarketCap | Y | Y | ok | - | Y | - |  |
| mixed-part3 | getCurrencies | Y | Y | ok | - | Y | - |  |

### cointelegraph (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getLatestNews | getLatestNews | Y | - | fail | - | - | - | non-JSON response |

### context-7 (1/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getDocumentation | searchLibraryId | Y | Y | ok | post | - | - |  |
| getDocumentation | getLibraryDocs | Y | - | fail | - | - | - | non-JSON response |

### cryptopanic (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getNews | getCryptoCryptopanicNews | Y | - | - | - | Y | - |  |

### cryptorank (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| funds | searchFunds | Y | - | fail | - | Y | - | HTTP 401 |
| funds | getAllFunds | Y | - | fail | - | Y | - | HTTP 401 |
| funds | getFundBasic | Y | - | fail | - | Y | - | HTTP 401 |
| funds | getFundDetail | Y | - | fail | - | Y | - | HTTP 401 |
| funds | getFundTeam | Y | - | fail | - | Y | - | HTTP 401 |

### cryptowizards-net (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| analytics | runBacktest | Y | Y | ok | - | Y | - |  |
| analytics | checkCointegration | Y | Y | ok | - | Y | - |  |
| analytics | getCorrelations | Y | Y | ok | - | Y | - |  |
| analytics | analyzeCopula | Y | Y | ok | - | Y | - |  |
| analytics | analyzeSpread | Y | Y | ok | - | Y | - |  |
| analytics | analyzeZScores | Y | Y | ok | - | Y | - |  |

### dashboard-deutschland (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| statistics | getDashboards | Y | Y | ok | post | - | - |  |
| statistics | getIndicator | Y | Y | ok | post | - | - |  |
| statistics | getGeoData | Y | Y | ok | post | - | - |  |

### debank (0/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| portfolio | getTotalBalance | Y | - | - | - | Y | - |  |
| portfolio | getUsedChains | Y | - | - | - | Y | - |  |
| portfolio | getTokenList | Y | - | - | - | Y | - |  |
| portfolio | getProtocolList | Y | - | - | - | Y | - |  |
| portfolio | getAllProtocols | Y | - | - | - | Y | - |  |
| portfolio | getTokenInfo | Y | - | - | - | Y | - |  |

### defilama (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| api | getProtocols | Y | Y | ok | - | - | - |  |
| api | getProtocolTvl | Y | Y | ok | - | - | - |  |
| api | getChainTvl | Y | Y | ok | - | - | - |  |
| coins | getTokenPrices | Y | Y | ok | - | - | - |  |
| yields | getPools | Y | Y | ok | - | - | - |  |
| yields | getPoolTvl | Y | Y | ok | post | - | - |  |

### dexpaprika (7/7 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| defiPrices | getNetworks | Y | Y | ok | - | - | - |  |
| defiPrices | getToken | Y | Y | ok | - | - | - |  |
| defiPrices | getMultiPrices | Y | Y | ok | - | - | - |  |
| defiPrices | getPool | Y | Y | ok | - | - | - |  |
| defiPrices | getTokenPools | Y | Y | ok | - | - | - |  |
| defiPrices | getPoolTransactions | Y | Y | ok | - | - | - |  |
| defiPrices | searchTokens | Y | Y | ok | - | - | - |  |

### dexscreener-com (12/12 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| boosted | getLatestBoostedTokens | Y | Y | ok | - | - | - |  |
| boosted | getMostActiveBoostedTokens | Y | Y | ok | - | - | - |  |
| pairs | getPairByChainAndAddress | Y | Y | ok | - | - | - |  |
| pairs | checkTokenOrders | Y | Y | ok | - | - | - |  |
| tokenInfo | getLatestTokenProfiles | Y | Y | ok | - | - | - |  |
| tokenInfo | searchPairs | Y | Y | ok | - | - | - |  |
| tokenInfo | getPairsByToken | Y | Y | ok | - | - | - |  |
| tokenInfo | getTokenPools | Y | Y | ok | - | - | - |  |
| tokenpairs | getTokenPairs | Y | Y | ok | - | - | - |  |
| tokenpairs | getLatestPairs | Y | Y | ok | - | - | - |  |
| tokenpairs | getPairsByChain | Y | Y | ok | - | - | - |  |
| tokenpairs | getSpecificPair | Y | Y | ok | - | - | - |  |

### digitale-verwaltung (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| services | getServices | Y | Y | ok | post | - | - |  |
| services | getAdminRegions | Y | Y | ok | post | - | - |  |

### dip (0/16 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| documents | listDrucksachen | Y | - | - | post | Y | - |  |
| documents | getDrucksache | Y | - | - | - | Y | - |  |
| documents | listDrucksacheTexts | Y | - | - | post | Y | - |  |
| documents | getDrucksacheText | Y | - | - | - | Y | - |  |
| documents | listPlenarprotokolle | Y | - | - | post | Y | - |  |
| documents | getPlenarprotokoll | Y | - | - | - | Y | - |  |
| documents | listPlenarprotokollTexts | Y | - | - | post | Y | - |  |
| documents | getPlenarprotokollText | Y | - | - | - | Y | - |  |
| proceedings | listVorgaenge | Y | - | - | post | Y | - |  |
| proceedings | getVorgang | Y | - | - | - | Y | - |  |
| proceedings | listVorgangspositionen | Y | - | - | post | Y | - |  |
| proceedings | getVorgangsposition | Y | - | - | - | Y | - |  |
| proceedings | listAktivitaeten | Y | - | - | post | Y | - |  |
| proceedings | getAktivitaet | Y | - | - | - | Y | - |  |
| proceedings | listPersonen | Y | - | - | post | Y | - |  |
| proceedings | getPerson | Y | - | - | - | Y | - |  |

### dune-analytics (1/7 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| farcaster | farcasterGetTrendingMemecoins | Y | - | fail | post | Y | - | HTTP 404 |
| farcaster | farcasterGetTrendingChannels | Y | - | fail | post | Y | - | HTTP 404 |
| farcaster | farcasterGetTrendingUsers | Y | - | fail | post | Y | - | HTTP 404 |
| getResults | getLatestResult | Y | Y | ok | post | Y | - |  |
| trendingContracts | getDexPairStats | Y | - | fail | post | Y | - | HTTP 404 |
| trendingContracts | getTrendingContracts | Y | - | fail | post | Y | - | HTTP 404 |
| trendingContracts | getMarketShare | Y | - | fail | post | Y | - | HTTP 404 |

### dwd (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| weather | getStationOverview | Y | Y | ok | post | - | - |  |

### ecovisio (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| counters | getCountersByOrganization | Y | Y | ok | post | - | - |  |

### ens (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| ens-resolution | resolveName | Y | - | - | - | Y | Y |  |
| ens-resolution | lookupAddress | Y | - | - | - | Y | Y |  |
| ens-resolution | supportMatrix | Y | - | - | - | Y | Y |  |

### epo-org (0/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| patent-search | searchPatents | Y | - | - | - | - | - |  |
| patent-search | searchByTechnology | Y | - | - | - | - | - |  |
| patent-search | searchByKeywords | Y | - | - | - | - | - |  |
| patent-search | searchByDate | Y | - | - | - | - | - |  |

### erc725 (5/8 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| profileJump | prices | Y | Y | ok | - | - | - |  |
| profileJump | hotProfiles | Y | Y | ok | - | - | - |  |
| profileJump | tokensList | Y | Y | ok | - | - | - |  |
| profileJump | profilesList | Y | Y | ok | - | - | - |  |
| profileJump | profileByAddress | Y | Y | ok | - | - | - |  |
| universalProfile | readProfileData | Y | - | - | exec | - | Y |  |
| universalProfile | fetchProfileMetadata | Y | - | - | exec | - | Y |  |
| universalProfile | getUniversalReceiverAddress | Y | - | - | exec | - | Y |  |

### ethers (0/23 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| abi-utils | decodeFunctionData | Y | - | - | exec | - | Y |  |
| abi-utils | encodeFunctionData | Y | - | - | exec | - | Y |  |
| abi-utils | decodeEventLog | Y | - | - | exec | - | Y |  |
| abi-utils | computeSelector | Y | - | - | exec | - | Y |  |
| abi-utils | encodeParameters | Y | - | - | exec | - | Y |  |
| abi-utils | decodeParameters | Y | - | - | exec | - | Y |  |
| convert-utils | formatUnits | Y | - | - | exec | - | Y |  |
| convert-utils | parseUnits | Y | - | - | exec | - | Y |  |
| convert-utils | formatEther | Y | - | - | exec | - | Y |  |
| convert-utils | parseEther | Y | - | - | exec | - | Y |  |
| convert-utils | hexlify | Y | - | - | exec | - | Y |  |
| convert-utils | toUtf8String | Y | - | - | exec | - | Y |  |
| convert-utils | toUtf8Bytes | Y | - | - | exec | - | Y |  |
| hash-address | keccak256 | Y | - | - | exec | - | Y |  |
| hash-address | solidityPackedKeccak256 | Y | - | - | exec | - | Y |  |
| hash-address | getCreate2Address | Y | - | - | exec | - | Y |  |
| hash-address | getCreateAddress | Y | - | - | exec | - | Y |  |
| hash-address | checksumAddress | Y | - | - | exec | - | Y |  |
| hash-address | namehash | Y | - | - | exec | - | Y |  |
| signature-utils | verifyMessage | Y | - | - | exec | - | Y |  |
| signature-utils | verifyTypedData | Y | - | - | exec | - | Y |  |
| signature-utils | hashMessage | Y | - | - | exec | - | Y |  |
| signature-utils | recoverAddress | Y | - | - | exec | - | Y |  |

### etherscan (6/7 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getContractEthereum | getContractABI | Y | Y | ok | post | Y | - |  |
| getContractEthereum | getContractSourceCode | Y | Y | ok | post | Y | - |  |
| getContractMultichain | getAvailableChains | Y | - | - | - | Y | - |  |
| getContractMultichain | getSmartContractAbi | Y | Y | ok | - | Y | - |  |
| getContractMultichain | getSourceCode | Y | Y | ok | - | Y | - |  |
| getGaspriceMultichain | getGasOracle | Y | Y | ok | - | Y | - |  |
| getGaspriceMultichain | estimateGasCost | Y | Y | ok | - | Y | - |  |

### ethscriptions-com (9/11 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| ethscriptions-api-part1 | listEthscriptions | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part1 | getEthscription | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part1 | getEthscriptionData | Y | - | fail | - | - | - | non-JSON response |
| ethscriptions-api-part1 | getEthscriptionAttachment | Y | - | fail | - | - | - | Unexpected end of JSON input |
| ethscriptions-api-part1 | checkEthscriptionExists | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part1 | checkMultipleEthscriptionsExistence | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part1 | listTransfers | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part1 | listTokens | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part2 | getTokenDetails | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part2 | getTokenHistoricalState | Y | Y | ok | - | - | - |  |
| ethscriptions-api-part2 | getIndexerStatus | Y | Y | ok | - | - | - |  |

### feiertage (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| holidays | getAllHolidays | Y | Y | ok | post | - | - |  |
| holidays | getStateHolidays | Y | Y | ok | post | - | - |  |

### geoapify (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| geocoding | forwardGeocode | Y | - | - | - | Y | - |  |
| geocoding | reverseGeocode | Y | - | - | - | Y | - |  |
| geocoding | autocomplete | Y | - | - | - | Y | - |  |

### goldrush (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| streaming | searchToken | Y | - | - | post | Y | - |  |
| streaming | getWalletPnL | Y | - | - | post | Y | - |  |

### goldsky-nouns (2/9 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| goldsky-nouns | getRecentProposals | Y | - | fail | - | - | - | HTTP 404 |
| goldsky-nouns | getCurrentAuctions | Y | - | fail | - | - | - | HTTP 404 |
| goldsky-nouns | getNounDetails | Y | - | fail | - | - | - | HTTP 404 |
| goldsky-nouns | getTopDelegates | Y | - | fail | - | - | - | HTTP 404 |
| lil-nouns | getProposals | Y | Y | ok | - | - | - |  |
| lil-nouns | getProposalById | Y | Y | ok | - | - | - |  |
| nouns | getCandidateProposals | Y | - | fail | - | - | - | HTTP 404 |
| nouns | getActivePendingUpdatableProposers | Y | - | fail | - | - | - | HTTP 404 |
| nouns | getLatestAuctions | Y | - | fail | - | - | - | HTTP 404 |

### govdata-de (5/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| datasets | searchDatasets | Y | Y | ok | post | - | - |  |
| datasets | getDataset | Y | Y | ok | post | - | - |  |
| datasets | listGroups | Y | Y | ok | post | - | - |  |
| datasets | listOrganizations | Y | Y | ok | post | - | - |  |
| datasets | searchTags | Y | Y | ok | - | - | - |  |

### hnrss (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| jsonFeeds | getFeed | Y | Y | ok | - | - | - |  |

### honeypot (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| honeypot | check | Y | Y | ok | post | - | - |  |

### indicators (0/78 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| indicatorts-schema-part1 | getAbsolutePriceOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAbsolutePriceOscillatorStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAccelerationBands | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAccelerationBandsStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAccumulationDistribution | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAroon | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAroonStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part1 | getAverageTrueRange | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getVolumeWeightedMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getVolumeWeightedMovingAverageStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getVortex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getVortexStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getWilliamsR | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part10 | getWilliamsRStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getAwesomeOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getAwesomeOscillatorStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getBalanceOfPower | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getBalanceOfPowerStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getBollingerBands | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getBollingerBandsStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getBollingerBandsWidth | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part2 | getChaikinMoneyFlow | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getChaikinMoneyFlowStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getChaikinOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getChandeForecastOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getChandeForecastOscillatorStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getChandelierExit | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getCommunityChannelIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getDonchianChannel | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part3 | getDoubleExponentialMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getEaseOfMovement | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getEaseOfMovementStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getExponentialMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getForceIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getForceIndexStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getIchimokuCloud | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getIchimokuCloudStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part4 | getKdjStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getKeltnerChannel | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMassIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMoneyFlowIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMoneyFlowIndexStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMovingAverageConvergenceDivergence | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMovingAverageConvergenceDivergenceStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMovingChandeForecastOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part5 | getMovingMax | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getMovingMin | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getMovingStandardDeviation | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getMovingSum | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getNegativeVolumeIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getNegativeVolumeIndexStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getOnBalanceVolume | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getParabolicSar | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part6 | getParabolicSARStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getPercentagePriceOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getPercentageVolumeOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getPriceRateOfChange | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getProjectionOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getProjectionOscillatorStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getQstick | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getRandomIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part7 | getRelativeStrengthIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getRollingMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getRsi2Strategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getSimpleMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getSince | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getStochasticOscillator | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getStochasticOscillatorStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getTriangularMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part8 | getTripleExponentialAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getTripleExponentialMovingAverage | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getTrueRange | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getTypicalPrice | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getTypicalPriceStrategy | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getUlcerIndex | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getVolumePriceTrend | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getVolumeWeightedAveragePrice | Y | - | - | exec | - | Y |  |
| indicatorts-schema-part9 | getVolumeWeightedAveragePriceStrategy | Y | - | - | exec | - | Y |  |

### infura (0/19 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| contract-read-part1 | readContract | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20TokenInfo | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc20Allowance | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721TokenInfo | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721OwnerOf | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721TokenURI | Y | - | - | - | Y | Y |  |
| contract-read-part1 | erc721BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part2 | erc1155BalanceOf | Y | - | - | - | Y | Y |  |
| contract-read-part2 | erc1155Uri | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBlockNumber | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBalance | Y | - | - | - | Y | Y |  |
| node-read-part1 | getGasPrice | Y | - | - | - | Y | Y |  |
| node-read-part1 | getBlock | Y | - | - | - | Y | Y |  |
| node-read-part1 | getCode | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionCount | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionByHash | Y | - | - | - | Y | Y |  |
| node-read-part1 | getTransactionReceipt | Y | - | - | - | Y | Y |  |
| node-read-part2 | getLogs | Y | - | - | - | Y | Y |  |

### itausschreibung (0/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| tenders | getAllTenders | Y | - | - | exec | - | - |  |
| tenders | getSoftwareTenders | Y | - | - | exec | - | - |  |
| tenders | getHardwareTenders | Y | - | - | exec | - | - |  |
| tenders | getInternetTenders | Y | - | - | exec | - | - |  |
| tenders | getTelecomTenders | Y | - | - | exec | - | - |  |
| tenders | getConsultingTenders | Y | - | - | exec | - | - |  |

### jupiter (0/7 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| jupiter-all | getTokenPrice | Y | - | - | post | Y | - |  |
| jupiter-all | getTokenInfo | Y | - | - | post | Y | - |  |
| jupiter-all | getTokensInMarket | Y | - | - | post | Y | - |  |
| jupiter-all | getAllTradableTokens | Y | - | - | post | Y | - |  |
| jupiter-all | getTaggedTokens | Y | - | - | post | Y | - |  |
| jupiter-all | getNewTokens | Y | - | - | post | Y | - |  |
| jupiter-all | getAllTokens | Y | - | - | post | Y | - |  |

### klinikatlas (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| hospitals | getLocations | Y | Y | ok | post | - | - |  |
| hospitals | getIcdCodes | Y | Y | ok | post | - | - |  |
| hospitals | getOpsCodes | Y | Y | ok | post | - | - |  |
| hospitals | getStateStatistics | Y | Y | ok | post | - | - |  |
| hospitals | getGermanPlaces | Y | Y | ok | post | - | - |  |
| hospitals | getGermanStates | Y | Y | ok | post | - | - |  |

### llama-fi (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getPools | getProjectsByName | Y | Y | ok | post | - | - |  |
| getPools | getPools | Y | Y | ok | post | - | - |  |

### lukso-network (48/48 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| address-part1 | listAddresses | Y | Y | ok | - | - | - |  |
| address-part1 | getAddress | Y | Y | ok | - | - | - |  |
| address-part1 | getAddressCounters | Y | Y | ok | - | - | - |  |
| address-part1 | getAddressTransactions | Y | Y | ok | - | - | - |  |
| address-part1 | getAddressTokenTransfers | Y | Y | ok | - | - | - |  |
| address-part1 | getAddressInternalTxs | Y | Y | ok | - | - | - |  |
| address-part1 | getAddressLogs | Y | Y | ok | - | - | - |  |
| address-part1 | getBlocksValidated | Y | Y | ok | - | - | - |  |
| address-part2 | getTokenBalances | Y | Y | ok | - | - | - |  |
| address-part2 | getFlatTokenBalances | Y | Y | ok | - | - | - |  |
| address-part2 | getCoinBalanceHistory | Y | Y | ok | - | - | - |  |
| address-part2 | getCoinBalanceByDay | Y | Y | ok | - | - | - |  |
| blocks | getBlocks | Y | Y | ok | - | - | - |  |
| blocks | getBlockById | Y | Y | ok | - | - | - |  |
| blocks | getBlockTransactions | Y | Y | ok | - | - | - |  |
| blocks | getBlockWithdrawals | Y | Y | ok | - | - | - |  |
| graphql | getLuksoExplorerSchema | Y | Y | ok | post | - | - |  |
| graphql | fectchLuksoExplorer | Y | Y | ok | post | - | - |  |
| internal | getMainPageTransactions | Y | Y | ok | post | - | - |  |
| internal | getMainPageBlocks | Y | Y | ok | post | - | - |  |
| nfts | getNFTsByAddress | Y | Y | ok | post | - | - |  |
| nfts | getNFTCollectionsByAddress | Y | Y | ok | post | - | - |  |
| nfts | getNFTInstancesByContract | Y | Y | ok | post | - | - |  |
| nfts | getNFTInstanceById | Y | Y | ok | post | - | - |  |
| nfts | getNFTInstanceTransfers | Y | Y | ok | post | - | - |  |
| nfts | getNFTInstanceHolders | Y | Y | ok | post | - | - |  |
| nfts | getNFTInstanceTransfersCount | Y | Y | ok | post | - | - |  |
| search | search | Y | Y | ok | - | - | - |  |
| search | searchRedirect | Y | Y | ok | - | - | - |  |
| sourceCode | listcontracts | Y | Y | ok | post | - | - |  |
| sourceCode | getabi | Y | Y | ok | post | - | - |  |
| sourceCode | getsourcecode | Y | Y | ok | post | - | - |  |
| sourceCode | getcontractcreation | Y | Y | ok | post | - | - |  |
| stats | getStats | Y | Y | ok | - | - | - |  |
| stats | getTransactionChart | Y | Y | ok | - | - | - |  |
| stats | getMarketChart | Y | Y | ok | - | - | - |  |
| tokens | listTokens | Y | Y | ok | - | - | - |  |
| tokens | getTokenByAddress | Y | Y | ok | - | - | - |  |
| tokens | getTokenTransfersByAddress | Y | Y | ok | - | - | - |  |
| tokens | getTokenHolders | Y | Y | ok | - | - | - |  |
| tokens | getTokenCounters | Y | Y | ok | - | - | - |  |
| transactions | getTransactions | Y | Y | ok | - | - | - |  |
| transactions | getTransactionByHash | Y | Y | ok | - | - | - |  |
| transactions | getTokenTransfersByTransactionHash | Y | Y | ok | - | - | - |  |
| transactions | getInternalTransactions | Y | Y | ok | - | - | - |  |
| transactions | getLogs | Y | Y | ok | - | - | - |  |
| transactions | getRawTrace | Y | Y | ok | - | - | - |  |
| transactions | getStateChanges | Y | Y | ok | - | - | - |  |

### mcp-registry (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| servers | listServers | Y | Y | ok | post | - | - |  |
| servers | searchServers | Y | Y | ok | post | - | - |  |

### medium-com (0/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| rss-feeds | getTagFeed | Y | - | - | exec | - | - |  |
| rss-feeds | getUserFeed | Y | - | - | exec | - | - |  |
| rss-feeds | getPublicationFeed | Y | - | - | exec | - | - |  |
| rss-feeds | getTopicFeed | Y | - | - | exec | - | - |  |

### memory-lol (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| twitterNameChanges | queryUsernameChanges | Y | Y | ok | post | - | - |  |

### minascan-io (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| mina-devnet | getMinaDevnetSchema | Y | Y | ok | - | - | - |  |
| mina-devnet | getMinaDevnetQuery | Y | Y | ok | - | - | - |  |
| mina-mainnet | getMinaMainnetSchema | Y | Y | ok | - | - | - |  |
| mina-mainnet | getMinaMainnetQuery | Y | Y | ok | - | - | - |  |

### mudab (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| marine-data | getStations | Y | - | ok | post | - | - |  |
| marine-data | getParameters | Y | - | ok | post | - | - |  |
| marine-data | getProjectStations | Y | - | ok | post | - | - |  |

### newsapi-org (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| news | getTopHeadlines | Y | Y | ok | - | Y | - |  |
| news | getEverything | Y | Y | ok | - | Y | - |  |
| news | getSources | Y | Y | ok | - | Y | - |  |

### newsdata-io (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getNews | getLatestNewsdata | Y | - | ok | post | Y | - |  |
| getNews | getCryptoNewsdata | Y | - | ok | post | Y | - |  |

### nina (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| warnings | getDwdWarnings | Y | Y | ok | post | - | - |  |
| warnings | getMowasWarnings | Y | Y | ok | post | - | - |  |
| warnings | getBiwappWarnings | Y | Y | ok | post | - | - |  |
| warnings | getKatwarnWarnings | Y | Y | ok | post | - | - |  |

### oeffentlichevergabe (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| tenders | getNoticesByDay | Y | - | - | exec | - | Y |  |
| tenders | getNoticesByMonth | Y | - | - | exec | - | Y |  |

### ohlcv (1/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| olhcv-moralis-evm | getRecursiveOhlcvEVM | Y | - | - | - | Y | - |  |
| olhcv-moralis-solana | getRecursiveOhlcvSolana | Y | - | - | - | Y | - |  |
| olhcv-solana-tracker | getOhlcvSolana | Y | Y | ok | - | Y | - |  |

### oneinch (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| swap | getQuote | Y | - | - | - | Y | - |  |
| swap | getSwap | Y | - | - | - | Y | - |  |
| swap | getTokens | Y | - | - | - | Y | - |  |
| swap | getApprove | Y | - | - | - | Y | - |  |
| swap | getAllowance | Y | - | - | - | Y | - |  |

### overpass (2/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| osmQuery | queryRaw | Y | Y | ok | - | - | - |  |
| osmQuery | findNearby | Y | Y | ok | - | - | - |  |
| osmQuery | status | Y | - | fail | - | - | - | non-JSON response |

### passport-xyz (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| onchain-data | getFullPassportData | Y | - | - | - | Y | Y |  |

### pegelonline (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| water-levels | getStations | Y | Y | ok | post | - | - |  |
| water-levels | getStationDetail | Y | Y | ok | post | - | - |  |
| water-levels | getWaters | Y | Y | ok | post | - | - |  |
| water-levels | getCurrentMeasurement | Y | Y | ok | - | - | - |  |

### pflanzenschutzmittel (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| pesticides | getProducts | Y | Y | ok | post | - | - |  |
| pesticides | getActiveIngredients | Y | Y | ok | post | - | - |  |
| pesticides | getCompanies | Y | Y | ok | post | - | - |  |
| pesticides | getRestrictions | Y | Y | ok | post | - | - |  |

### pinata (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| read | free_read_example | Y | - | - | post | - | - |  |
| read | free_read_cid | Y | - | - | exec | - | - |  |
| write | upload_text_file | Y | - | - | exec | Y | Y |  |

### poap (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| graphql | getTypename | Y | - | - | - | - | - |  |
| graphql | getSchemaDefinition | Y | - | - | - | - | - |  |
| graphql | getPredefinedQueryList | Y | - | - | exec | - | - |  |
| graphql | executePrefinedQuery | Y | - | - | - | - | - |  |
| graphql | querySubgraph | Y | - | - | - | - | - |  |

### polymarket (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| gammaApi | searchEvents | Y | Y | ok | post | - | - |  |
| gammaApi | getEvents | Y | Y | ok | post | - | - |  |
| gammaApi | getMarkets | Y | Y | ok | post | - | - |  |
| marketInfo | getMarkets | Y | Y | ok | - | - | - |  |
| marketInfo | getMarketInfo | Y | Y | ok | - | - | - |  |
| searchBySlug | searchBySlug | Y | Y | ok | post | - | - |  |

### reddit (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getTokenMentions | getTokenMentions | Y | Y | ok | - | - | - |  |
| getTokenMentions | getHotMemes | Y | Y | ok | - | - | - |  |

### reisewarnungen (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| travel-warnings | getAllWarnings | Y | Y | ok | post | - | - |  |
| travel-warnings | getCountryWarning | Y | Y | ok | post | - | - |  |

### rugcheck (6/6 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| tokenSafety | getTokenReport | Y | Y | ok | - | - | - |  |
| tokenSafety | getTokenVotes | Y | Y | ok | - | - | - |  |
| tokenSafety | getRecentTokens | Y | Y | ok | - | - | - |  |
| tokenSafety | getTrendingTokens | Y | Y | ok | - | - | - |  |
| tokenSafety | getNewTokens | Y | Y | ok | - | - | - |  |
| tokenSafety | getVerifiedTokens | Y | Y | ok | - | - | - |  |

### safe-global (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| transaction-service | getSafeInfo | Y | Y | ok | - | - | - |  |
| transaction-service | getSafeBalances | Y | Y | ok | post | - | - |  |
| transaction-service | getMultisigTransactions | Y | Y | ok | post | - | - |  |
| transaction-service | getIncomingTransfers | Y | Y | ok | - | - | - |  |

### santiment-net (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| schema | get_sentiment_balance | Y | - | - | - | Y | - |  |
| schema | get_social_volume | Y | - | - | - | Y | - |  |
| schema | alert_social_shift | Y | - | - | - | Y | - |  |
| schema | get_trending_words | Y | - | - | - | Y | - |  |
| schema | get_social_dominance | Y | - | - | - | Y | - |  |

### simdune (7/9 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| activityEVM | getActivityEVM | Y | - | - | - | Y | Y |  |
| activityEVM | getActivityDetailedEVM | Y | - | - | - | Y | Y |  |
| balancesEVM | getBalancesEVM | Y | Y | ok | - | Y | - |  |
| balancesSVM | getBalancesSVM | Y | Y | ok | - | Y | - |  |
| collectiblesEVM | getCollectiblesEVM | Y | Y | ok | - | Y | - |  |
| tokenHoldersEVM | getTokenHoldersEVM | Y | Y | ok | - | Y | - |  |
| tokenInfoEVM | getTokenInfoEVM | Y | Y | ok | - | Y | - |  |
| transactionsEVM | getTransactionsEVM | Y | Y | ok | - | Y | - |  |
| transactionsSVM | getTransactionsSVM | Y | Y | ok | - | Y | - |  |

### smard (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| energy | getFilterIndex | Y | - | - | post | - | - |  |
| energy | getLatestData | Y | - | - | exec | - | - |  |

### snapshot (3/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| snapshot | listSpaces | Y | Y | ok | - | - | - |  |
| snapshot | listProposals | Y | Y | ok | - | - | - |  |
| snapshot | getProposalDetails | Y | Y | ok | - | - | - |  |

### solanatracker-io (40/40 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| --additionalRoutes | tokenStats | Y | Y | ok | - | Y | - |  |
| --additionalRoutes | tokenStatsByPool | Y | Y | ok | - | Y | - |  |
| --chartRoutes | chartData | Y | Y | ok | post | Y | - |  |
| --chartRoutes | chartDataByPool | Y | Y | ok | post | Y | - |  |
| --pnlRoutes | profitAndLossData | Y | Y | ok | post | Y | - |  |
| --pnlRoutes | pnlForSpecificToken | Y | Y | ok | post | Y | - |  |
| --pnlRoutes | firstBuyers | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | priceInformation | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | postPrice | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | multiPriceInformation | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | getHistoricPrice | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | getPriceAtTimestamp | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | getPriceRange | Y | Y | ok | post | Y | - |  |
| --priceEndpoints | postMultiPrice | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | tokenInformation | Y | Y | ok | - | Y | - |  |
| --tokenEndpoints-part1 | tokenHolders | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | topTokenHolders | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | allTimeHighPrice | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | tokensByDeployer | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | search | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | latestTokens | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part1 | multipleTokens | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | trendingTokens | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | tokensByVolume | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | tokenOverview | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | graduatedTokens | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | tokenByPool | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | trendingTokensByTimeframe | Y | Y | ok | post | Y | - |  |
| --tokenEndpoints-part2 | tokensByVolumeTimeframe | Y | Y | ok | post | Y | - |  |
| --topTraderRoutes | topTradersAll | Y | Y | ok | post | Y | - |  |
| --topTraderRoutes | topTradersAllPaged | Y | Y | ok | post | Y | - |  |
| --topTraderRoutes | topTradersByToken | Y | Y | ok | post | Y | - |  |
| --tradeEndpoints | tokenTrades | Y | Y | ok | post | Y | - |  |
| --tradeEndpoints | tradesByWallet | Y | Y | ok | post | Y | - |  |
| --tradeEndpoints | tokenPoolTrades | Y | Y | ok | post | Y | - |  |
| --tradeEndpoints | userPoolTrades | Y | Y | ok | post | Y | - |  |
| --walletEndpoints | walletInformation | Y | Y | ok | post | Y | - |  |
| --walletEndpoints | walletTokensBasic | Y | Y | ok | post | Y | - |  |
| --walletEndpoints | walletTokensPaged | Y | Y | ok | post | Y | - |  |
| --walletEndpoints | walletTrades | Y | Y | ok | post | Y | - |  |

### solscan-io (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getChainInfo | chainInfo | Y | - | fail | post | Y | - | HTTP 401 |

### solsniffer-com (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| analysis | analysisToken | Y | - | fail | post | Y | - | HTTP 404 |

### sourcify (5/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| verification | getVerificationStatus | Y | Y | ok | - | - | - |  |
| verification | checkByAddresses | Y | Y | ok | - | - | - |  |
| verification | getSourceFileTree | Y | Y | ok | - | - | - |  |
| verification | getSourceFiles | Y | Y | ok | post | - | - |  |
| verification | getSupportedChains | Y | Y | ok | post | - | - |  |

### spaceid (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| spaceid | getSupportedChains | Y | - | - | exec | - | - |  |
| spaceid | getAddress | Y | - | - | - | - | - |  |
| spaceid | getName | Y | - | - | - | - | - |  |

### stolpersteine-berlin (0/5 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| memorial-stones | getAllStones | Y | - | - | exec | - | - |  |
| memorial-stones | searchStones | Y | - | - | exec | - | - |  |
| memorial-stones | getStonesByDistrict | Y | - | - | exec | - | - |  |
| memorial-stones | getStonesByPerson | Y | - | - | exec | - | - |  |
| memorial-stones | getStonesByLocation | Y | - | - | exec | - | - |  |

### strahlenschutz (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| radiation | getLatestReadings | Y | Y | ok | post | - | - |  |
| radiation | getStationTimeseries | Y | Y | ok | post | - | - |  |

### swaggerhub-com (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| api-registry | searchApis | Y | Y | ok | - | - | - |  |
| api-registry | listApiVersions | Y | Y | ok | - | - | - |  |

### taapi (0/10 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| indicators-part1 | getRSI | Y | - | - | - | Y | - |  |
| indicators-part1 | getMACD | Y | - | - | - | Y | - |  |
| indicators-part1 | getBollingerBands | Y | - | - | - | Y | - |  |
| indicators-part1 | getEMA | Y | - | - | - | Y | - |  |
| indicators-part1 | getSMA | Y | - | - | - | Y | - |  |
| indicators-part1 | getStochastic | Y | - | - | - | Y | - |  |
| indicators-part1 | getATR | Y | - | - | - | Y | - |  |
| indicators-part1 | getStochRSI | Y | - | - | - | Y | - |  |
| indicators-part2 | getVWAP | Y | - | - | - | Y | - |  |
| indicators-part2 | getIchimoku | Y | - | - | - | Y | - |  |

### tagesschau (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| news | getHomepage | Y | Y | ok | post | - | - |  |
| news | getNews | Y | Y | ok | post | - | - |  |
| news | searchArticles | Y | Y | ok | post | - | - |  |
| news | getChannels | Y | Y | ok | post | - | - |  |

### talent-protocol (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| advancedSearch | searchAdvancedProfiles | Y | - | - | - | Y | - |  |
| advancedSearch | getDefaultFields | Y | - | - | - | Y | - |  |

### tally (0/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| governance | getChains | Y | - | - | post | Y | - |  |
| governance | getGovernors | Y | - | - | post | Y | - |  |
| governance | getProposals | Y | - | - | post | Y | - |  |
| governance | getDelegates | Y | - | - | post | Y | - |  |

### ted (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| procurement | searchNotices | Y | - | - | exec | - | - |  |

### tenderly (1/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| public-contracts | getPublicContract | Y | Y | ok | post | - | - |  |

### thegraph (2/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| getNewUniswapPools | getNewPools | Y | - | - | - | Y | - |  |
| getSchema | getSubgraphSchema | Y | Y | ok | post | Y | - |  |
| getSchema | querySubgraph | Y | Y | ok | post | Y | - |  |

### twitter (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| search | searchRecentTweets | Y | - | - | post | Y | - |  |

### umweltbundesamt (4/4 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| air-quality | getStations | Y | Y | ok | post | - | - |  |
| air-quality | getComponents | Y | Y | ok | post | - | - |  |
| air-quality | getAirQualityIndex | Y | Y | ok | - | - | - |  |
| air-quality | getMeasurements | Y | Y | ok | - | - | - |  |

### uniswap-pools (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| uniswap-pool-explorer | getTokenPools | Y | - | - | - | Y | - |  |
| uniswap-pool-explorer | getPoolData | Y | - | - | - | Y | - |  |

### uniswap-v3 (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| price-discovery | getSupportedChains | Y | - | - | exec | Y | Y |  |
| price-discovery | getTokenPrice | Y | - | - | exec | Y | Y |  |

### vag (2/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| transit | getStops | Y | Y | ok | post | - | - |  |
| transit | getDepartures | Y | Y | ok | post | - | - |  |

### web3-career (0/1 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| job-listings | queryJobs | Y | - | - | exec | Y | - |  |

### wormholescan (7/7 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| wormholescan | getCrossChainActivity | Y | Y | ok | - | - | - |  |
| wormholescan | getMoneyFlow | Y | Y | ok | - | - | - |  |
| wormholescan | getTopAssetsByVolume | Y | Y | ok | - | - | - |  |
| wormholescan | getTopChainPairsByNumTransfers | Y | Y | ok | - | - | - |  |
| wormholescan | getTopSymbolsByVolume | Y | Y | ok | - | - | - |  |
| wormholescan | getTopCorridors | Y | Y | ok | - | - | - |  |
| wormholescan | getKpiList | Y | Y | ok | - | - | - |  |

### x402 (0/2 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| ping | free_ping | Y | - | - | exec | - | - |  |
| ping | paid_ping | Y | - | - | exec | - | - |  |

### zvg-portal (0/3 complete)

| File | Route | Tests | Output | Capture | Handler | Key | Lib | Note |
|------|-------|:-----:|:------:|:-------:|:-------:|:---:|:---:|------|
| auctions | searchAuctions | Y | - | - | - | - | - |  |
| auctions | getAuctionDetail | Y | - | - | - | - | - |  |
| zwangsversteigerungen | searchAuctions | Y | - | - | - | - | - |  |
