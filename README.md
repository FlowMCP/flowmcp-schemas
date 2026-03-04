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
| abgeordnetenwatch | abgeordnetenwatch.mjs | 5 | listPoliticians, getPolitician, listParliaments, listParliamentPeriods, listCandidaciesMandates |  | politics, germany, parliament, opendata, democracy, cacheTtlDaily |
| alchemy | contract-read.mjs | 1 | readContract | ALCHEMY_API_KEY | blockchain, evm, smartcontract, multichain, alchemy, cacheTtlRealtime |
| alchemy | node-read-part1.mjs | 8 | getBlockNumber, getBalance, getGasPrice, getBlock, getCode, getTransactionCount, getTransactionByHash, getTransactionReceipt | ALCHEMY_API_KEY | blockchain, evm, rpc, multichain, alchemy, cacheTtlRealtime |
| alchemy | node-read-part2.mjs | 1 | getLogs | ALCHEMY_API_KEY | blockchain, evm, rpc, multichain, alchemy, cacheTtlRealtime |
| alternative | fearAndGreed.mjs | 3 | getCurrentFng, getHistoricalFng, analyzeFngTrend |  | crypto, sentiment, index, cacheTtlFrequent |
| altmetric | altmetric.mjs | 7 | getByDoi, getByPmid, getByArxivId, getByIsbn, getByAltmetricId, fetchByDoi, listCitations | ALTMETRIC_API_KEY | science, metrics, socialmedia, research, citations, cacheTtlDaily |
| aqicn | aqicn.mjs | 4 | getCityAqi, getGeoAqi, searchStations, getStationById | AQICN_API_TOKEN | environment, air-quality, health, pollution, cacheTtlFrequent |
| arbeitsagentur | education.mjs | 2 | searchApprenticeships, searchStudyPrograms |  | education, germany, apprenticeship, training, cacheTtlDaily |
| arbeitsagentur | entgeltatlas.mjs | 7 | getEntgelte, getMediandaten, getPrimaererMedian, getRegionen, getGeschlechter, getAlter, getBranchen | ENTGELTATLAS_API_KEY | government, employment, wages, salary, germany, opendata, cacheTtlDaily |
| arbeitsagentur | jobs.mjs | 2 | searchJobs, searchJobsByEmployer |  | jobs, germany, employment, labor, cacheTtlDaily |
| arbeitsagentur | jobsuche.mjs | 2 | searchJobs, searchJobsApp |  | jobs, employment, germany, cacheTtlDaily |
| arbeitsagentur | professions.mjs | 2 | searchProfessions, getProfessionDetail |  | professions, germany, employment, education, cacheTtlDaily |
| artinstitutechi | art-institute-chicago.mjs | 4 | searchArtworks, getArtwork, searchArtists, listArtworks |  | art, museum, culture, opendata, cacheTtlDaily |
| arxiv | arxiv.mjs | 4 | searchPapers, searchByAuthor, searchByCategory, getPaperById |  | science, research, preprints, openaccess, cacheTtlDaily |
| autobahn | traffic.mjs | 6 | listRoads, getRoadworks, getWarnings, getClosures, getChargingStations, getWebcams |  | traffic, germany, infrastructure, cacheTtlFrequent |
| avalanchemetrics | metrics-api.mjs | 8 | listChains, getChainInfo, getChainMetrics, getRollingWindowMetrics, getStakingMetrics, getValidatorMetrics, getICMSummary, getICMTimeseries |  | blockchain, avalanche, metrics, staking, analytics, cacheTtlDaily |
| aviationstack | aviationstack.mjs | 6 | getFlights, getAirports, getAirlines, getCities, getCountries, getAirplanes | AVIATIONSTACK_API_KEY | aviation, flights, airports, airlines, cacheTtlFrequent |
| avnu | avnu.mjs | 3 | getSwapQuote, getTokens, getSources |  | starknet, defi, swap, cacheTtlRealtime |
| balancer | balancer.mjs | 5 | getTopPools, getPoolById, getTokenPrices, getProtocolMetrics, getSwapPaths |  | defi, amm, liquidity, pools, cacheTtlFrequent |
| beaconchain | validatorQueue.mjs | 3 | getActivationQueue, getExitQueue, getValidatorStatus |  | ethereum, validators, staking, cacheTtlDaily |
| berlin | schulen.mjs | 1 | getSchools |  | berlin, education, geojson, government, cacheTtlDaily |
| berlinevents | events.mjs | 4 | markets_festivals, street_festivals, christmas_markets, police_assemblies |  | berlin, events, opendata, cacheTtlDaily |
| berlinfunds | funds.mjs | 2 | funding_opportunities, continuing_education |  | berlin, funding, opendata, cacheTtlDaily |
| berlinvergabe | procurement.mjs | 1 | getProcurementNotices |  | procurement, berlin, germany, opendata, cacheTtlDaily |
| berlinvhs | vhs.mjs | 1 | all_courses |  | berlin, education, opendata, cacheTtlDaily |
| berlinwfs | wfs-locations.mjs | 2 | dog_parks, bbq_areas |  | berlin, geodata, opendata, cacheTtlDaily |
| bfsodl | bfsodl.mjs | 3 | getLatestMeasurements, getStationTimeSeries, getDailyTimeSeries |  | germany, radiation, monitoring, environment, science, cacheTtlRealtime |
| bicscan | bicscan.mjs | 2 | getRiskScore, getAssets | BICSCAN_API_KEY | security, risk, scanning, cacheTtlDaily |
| biorxiv | biorxiv.mjs | 6 | getContentDetails, getDetailsByDoi, getPublishedArticles, getPublisherArticles, getSummaryStatistics, getUsageStatistics |  | science, preprints, biology, medicine, research, cacheTtlDaily |
| birdeye | birdeye.mjs | 5 | getTokenPrice, getHistoryPrice, getOHLCV, getTrendingTokens, searchToken | BIRDEYE_API_KEY | crypto, solana, analytics, defi, cacheTtlFrequent |
| bis | bisStatistics.mjs | 8 | getCentralBankPolicyRates, getEffectiveExchangeRates, getCreditToGdpGaps, getPropertyPrices, getConsumerPrices, getUsDollarExchangeRates, getDebtSecurities, getGenericData |  | economics, finance, central-bank, statistics, cacheTtlDaily |
| bitget | bitget.mjs | 3 | getTokenPrice, getAnnoucements, getCoinInfo |  | production, exchange, trading, price, cacheTtlDaily |
| blockberry | mina-mainnet.mjs | 6 | getDashboardInfo, getAccountByHash, getAccountBalance, getBlocks, getZkAppTransactions, getZkAppByAddress | BLOCKBERRY_API_KEY | production, blockchain, explorer, mina, cacheTtlDaily |
| blockchaininfo | utxoAndBlocks.mjs | 2 | getUTXO, getBlockStats |  | bitcoin, blockchain, utxo, cacheTtlDaily |
| blocknative | gasprice.mjs | 1 | getGasPrices | BLOCKNATIVE_API_KEY | new, cacheTtlRealtime |
| boldsystems | boldSystems.mjs | 3 | preprocessQuery, getSummary, executeQuery |  | biology, genetics, biodiversity, science, cacheTtlDaily |
| bonfida | bonfida.mjs | 3 | resolveDomain, getFavoriteDomain, getDomainsByOwner |  | solana, naming, identity, domains |
| bridgerates | bridgerates.mjs | 6 | getSupportedChains, getSupportedTools, getConnections, getTransferStatus, getQuote, getTokenInfo |  | bridge, crosschain, defi, cacheTtlRealtime |
| brightsky | bright-sky.mjs | 4 | getWeather, getCurrentWeather, getAlerts, getSources |  | weather, forecast, germany, dwd, meteorology, cacheTtlHourly |
| bsbmdz | bsbMdz.mjs | 5 | getManifest, getTopCollection, browseCollection, getCanvas, getImageInfo |  | library, iiif, digitization, manuscripts, germany, cultural-heritage, cacheTtlStatic |
| bscscan | getContractBinance.mjs | 2 | getContractABI, getContractSourceCode | BSCSCAN_API_KEY | test, cacheTtlDaily |
| bundesbank | bundesbankStatistics.mjs | 5 | getTimeSeries, getDataflow, listDataflows, getDataStructure, getCodelist |  | economics, finance, statistics, germany, central-bank, cacheTtlDaily |
| bundeshaushalt | budget.mjs | 3 | getBudgetByEinzelplan, getBudgetByFunction, getBudgetByGroup |  | government, finance, budget, germany, opendata, cacheTtlDaily |
| bundeswahlleiterin | bundeswahlleiterin.mjs | 5 | getResults, searchConstituencies, getPartyResults, getNationalSummary, getStructuralData |  | government, elections, germany, opendata, cacheTtlStatic |
| catalogueoflife | catalogueoflife.mjs | 5 | searchNames, getNameUsage, matchName, listVocabulary, getApiVersion |  | taxonomy, biology, species, science, cacheTtlDaily |
| cryptoorderbook | orderbook.mjs | 2 | calculateOrderbook, compareOrderbook |  | production, trading, orderbook, exchange, cacheTtlRealtime |
| cernopendata | cern-open-data.mjs | 2 | searchRecords, getRecord |  | science, physics, opendata, research, cacheTtlDaily |
| chainlinkmulticall | price-feeds-multicall.mjs | 3 | getAvailableChains, getAvailableFeeds, getAllLatestPrices | INFURA_API_KEY | oracle, price, feeds, chainlink, multicall, batch, onchain, cacheTtlRealtime |
| chainlink | price-feeds.mjs | 3 | getAvailableChains, getAvailableFeeds, getLatestPrice | INFURA_API_KEY | oracle, price, feeds, chainlink, onchain, cacheTtlRealtime |
| chainlist | chainlist.mjs | 5 | getChainById, getChainsByKeyword, getExplorerURLs, getRPCEndpoints, getWebsocketEndpoints |  | production, blockchain, rpc, network, cacheTtlStatic |
| chartimg | tradingview-charts.mjs | 1 | getAdvancedChart | CHART_IMG_API_KEY | charts, visualization, trading, cacheTtlStatic |
| charts | VegaLiteCharts.mjs | 4 | generateCandlestickChart, generateLineChart, generateMultiLineChart, generateBarChart |  | charts, visualization, trading, offline |
| cheapshark | cheapshark.mjs | 4 | getDeals, searchGames, getGameDetails, listStores |  | entertainment, gaming, shopping, opendata, cacheTtlFrequent |
| chembl | chembl.mjs | 8 | getMolecule, searchMolecules, getTarget, searchTargets, getActivities, getAssay, getMechanism, getSimilarMolecules |  | science, chemistry, drugs, pharmacology, bioactivity, cacheTtlDaily |
| ckandatagov | ckanDatagov.mjs | 6 | searchDatasets, getDataset, listOrganizations, listTags, listGroups, searchResources |  | government, opendata, datasets, usa, cacheTtlDaily |
| clinicaltrials | clinicaltrialsgov.mjs | 3 | listStudies, getStudy, listStudyFields |  | health, medicine, clinicaltrials, research, fda, science, cacheTtlDaily |
| cocktaildb | cocktaildb.mjs | 5 | searchCocktails, getCocktail, filterByIngredient, listCategories, getRandomCocktail |  | food, beverage, recipes, opendata, cacheTtlDaily |
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
| connectedpapers | connectedpapers.mjs | 3 | getGraph, getRemainingUsages, getFreeAccessPapers | CONNECTED_PAPERS_API_KEY | academic, research, papers, citations, graphs, cacheTtlDaily |
| context | getDocumentation.mjs | 2 | searchLibraryId, getLibraryDocs |  | documentation, search, developer, cacheTtlStatic |
| copernicusland | copernicusland.mjs | 4 | searchDatasets, listProducts, datasetsByProduct, getDatasetDetail |  | geospatial, environment, europe, opendata, cacheTtlDaily |
| coreac | core.mjs | 7 | searchWorks, getWork, searchOutputs, getOutput, searchDataProviders, searchJournals, discoverFulltext | CORE_API_KEY | science, openaccess, research, publications, repositories, cacheTtlDaily |
| cosmos | cosmos-bank.mjs | 6 | getBalances, getSupply, getValidators, getDelegations, getProposals, getCommunityPool |  | cosmos, staking, governance, cacheTtlFrequent |
| crossref | crossref.mjs | 8 | searchWorks, getWork, searchFunders, getFunder, searchMembers, searchJournals, getJournal, listTypes |  | science, research, publications, citations, doi, cacheTtlDaily |
| cryptopanic | getNews.mjs | 1 | getCryptoCryptopanicNews | CRYPTOPANIC_API_KEY | crypto, news, aggregator, cacheTtlFrequent |
| cryptorank | funds.mjs | 5 | searchFunds, getAllFunds, getFundBasic, getFundDetail, getFundTeam | CRYPTORANK_API_KEY | funds, investors, analytics, cacheTtlDaily |
| cryptowizards | analytics.mjs | 6 | runBacktest, checkCointegration, getCorrelations, analyzeCopula, analyzeSpread, analyzeZScores | CRYPTOWIZARDS_API_KEY | production, analytics, trading, backtest, cacheTtlDaily |
| curve | analytics.mjs | 6 | getVolumes, getTotalVolume, getAllGauges, getLendingVaults, getWeeklyFees, getGas |  | defi, dex, analytics, volume, apy, lending, cacheTtlFrequent |
| curve | crvusd.mjs | 3 | getCrvCircSupply, getCrvusdTotalSupply, getCrvusdAmmVolumes |  | defi, stablecoin, crvusd, supply, cacheTtlFrequent |
| curve | pools.mjs | 6 | getPoolsByChain, getPoolsByRegistry, getBigPools, getPoolList, getTokens, getPlatforms |  | defi, dex, liquidity, pools, multichain, cacheTtlFrequent |
| dailymed | dailymed.mjs | 6 | searchSpls, getSplById, getDrugNames, getDrugClasses, getNdcs, getUniis |  | health, drugs, fda, pharmacy, labels, cacheTtlDaily |
| dashboarddeutschland | statistics.mjs | 3 | getDashboards, getIndicator, getGeoData |  | statistics, germany, economy, destatis, cacheTtlDaily |
| dataeuropaeu | dataEuropaEu.mjs | 3 | searchDatasets, getDataset, listCatalogues |  | opendata, government, europe, datasets, catalog, cacheTtlDaily |
| datacite | datacite.mjs | 7 | searchDois, getDoiById, listClients, listProviders, getProviderById, getDoiActivities, heartbeat |  | doi, research, metadata, science, opendata, cacheTtlDaily |
| datamuse | datamuse.mjs | 2 | findWords, autocomplete |  | language, reference, nlp, opendata, cacheTtlStatic |
| dawum | dawum.mjs | 3 | getAllData, getNewestSurveys, getLastUpdate |  | politics, elections, polls, germany, surveys, cacheTtlDaily |
| dblp | dblp.mjs | 3 | searchPublications, searchAuthors, searchVenues |  | bibliography, research, papers, academic, computerscience, opendata, cacheTtlDaily |
| dbpedia | dbpedia.mjs | 6 | countriesWithCapitals, entityLookup, musiciansByGenre, universitiesByCountry, filmsByDirector, querySparql |  | knowledge, linkeddata, sparql, wikipedia, cacheTtlDaily |
| debank | portfolio.mjs | 6 | getTotalBalance, getUsedChains, getTokenList, getProtocolList, getAllProtocols, getTokenInfo | DEBANK_ACCESS_KEY | defi, portfolio, wallet, crypto, cacheTtlFrequent |
| debridge | debridge.mjs | 6 | getSupportedChains, getTokenList, getBridgeQuote, getOrderById, getOrderStatus, getOrderIdsByTxHash |  | bridge, crosschain, defi, cacheTtlFrequent |
| defillama | api.mjs | 3 | getProtocols, getProtocolTvl, getChainTvl |  | defi, tvl, protocols, cacheTtlFrequent |
| defillama | coins.mjs | 1 | getTokenPrices |  | defi, prices, tokens, cacheTtlFrequent |
| defillama | yields.mjs | 2 | getPools, getPoolTvl |  | defi, yields, farming, cacheTtlFrequent |
| destatis | catalogue.mjs | 6 | search, listTables, listStatistics, getTableMetadata, getStatisticMetadata, getQualitySigns |  | statistics, germany, government, opendata, destatis |
| destatis | data.mjs | 4 | getTableData, getVariableMetadata, listVariables, listValues |  | statistics, germany, government, opendata, destatis |
| deutschedigitalebibliothek | deutschedigitalebibliothek.mjs | 8 | searchItems, getItem, getItemBinaries, getItemChildren, getItemView, listInstitutions, searchSuggest, getVersion | DDB_API_KEY | culture, heritage, library, museum, archive, germany, cacheTtlDaily |
| dexpaprika | defiPrices.mjs | 7 | getNetworks, getToken, getMultiPrices, getPool, getTokenPools, getPoolTransactions, searchTokens |  | defi, prices, liquidity, cacheTtlRealtime |
| dexscreener | boosted.mjs | 2 | getLatestBoostedTokens, getMostActiveBoostedTokens |  | defi, trading, boosted, cacheTtlFrequent |
| dexscreener | pairs.mjs | 2 | getPairByChainAndAddress, checkTokenOrders |  | defi, trading, pairs, cacheTtlFrequent |
| dexscreener | tokenInfo.mjs | 4 | getLatestTokenProfiles, searchPairs, getPairsByToken, getTokenPools |  | defi, tokens, discovery, cacheTtlFrequent |
| dexscreener | tokenpairs.mjs | 4 | getTokenPairs, getLatestPairs, getPairsByChain, getSpecificPair |  | dex, trading, pairs, cacheTtlFrequent |
| digitaleverwaltung | services.mjs | 2 | getServices, getAdminRegions |  | government, germany, administration, services, cacheTtlDaily |
| dip | documents.mjs | 8 | listDrucksachen, getDrucksache, listDrucksacheTexts, getDrucksacheText, listPlenarprotokolle, getPlenarprotokoll, listPlenarprotokollTexts, getPlenarprotokollText | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| dip | proceedings.mjs | 8 | listVorgaenge, getVorgang, listVorgangspositionen, getVorgangsposition, listAktivitaeten, getAktivitaet, listPersonen, getPerson | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| dipbundestag | dipbundestag.mjs | 8 | listVorgaenge, getVorgang, listDrucksachen, getDrucksache, listPlenarprotokolle, listPersonen, getPerson, listAktivitaeten | DIP_BUNDESTAG_API_KEY | politics, germany, parliament, legislation, opendata, cacheTtlDaily |
| discogs | discogs.mjs | 6 | search, getRelease, getMasterRelease, getArtist, getArtistReleases, getLabel |  | music, releases, artists, vinyl, database, cacheTtlDaily |
| diseasesh | disease-sh.mjs | 5 | getGlobalStats, getCountryStats, getAllCountries, getHistorical, getContinentStats |  | health, covid, statistics, opendata, cacheTtlFrequent |
| dnb | dnb.mjs | 5 | searchByTitle, searchByAuthor, searchByIsbn, searchBySubject, searchAuthorities |  | library, bibliography, germany, opendata, cacheTtlDaily |
| dndapi | dnd-api.mjs | 5 | listClasses, getSpell, getMonster, searchSpells, getClass |  | entertainment, gaming, reference, opendata, cacheTtlStatic |
| doaj | doaj.mjs | 4 | searchArticles, searchJournals, getArticle, getJournal |  | science, journals, openaccess, articles, research, cacheTtlDaily |
| dpla | dpla.mjs | 8 | searchItems, searchByTitle, searchByCreator, getItem, searchWithFacets, searchByDateRange, searchByLocation, searchCollections | DPLA_API_KEY | library, archive, culturalheritage, metadata, opendata, cacheTtlDaily |
| duckduckgo | duckduckgo.mjs | 1 | instantAnswer |  | search, knowledge, reference, cacheTtlDaily |
| duneanalytics | farcaster.mjs | 3 | farcasterGetTrendingMemecoins, farcasterGetTrendingChannels, farcasterGetTrendingUsers | DUNE_API_KEY | analytics, farcaster, social, cacheTtlDaily |
| duneanalytics | getResults.mjs | 1 | getLatestResult | DUNE_API_KEY | analytics, queries, data, cacheTtlDaily |
| duneanalytics | trendingContracts.mjs | 3 | getDexPairStats, getTrendingContracts, getMarketShare | DUNE_API_KEY | analytics, contracts, trending, cacheTtlFrequent |
| dwd | weather.mjs | 1 | getStationOverview |  | weather, germany, forecast, cacheTtlFrequent |
| dwds | dwds.mjs | 6 | getWordFrequency, getDictionarySnippet, getRandomEntries, getIpaPronunciation, getGoetheWordList, searchCorpus |  | dictionary, language, german, linguistics, cacheTtlDaily |
| ebird | ebird.mjs | 4 | getRecentObservations, getNotableObservations, getNearbyObservations, getHotspots | EBIRD_API_KEY | birds, nature, biodiversity, science, cacheTtlFrequent |
| ecb | ecbSdmx.mjs | 5 | getExchangeRates, getInterestRates, getMonetaryAggregates, getInflationData, getGenericData |  | finance, economics, central-bank, exchange-rates, cacheTtlDaily |
| ecovisio | counters.mjs | 1 | getCountersByOrganization |  | mobility, germany, cycling, pedestrian, cacheTtlDaily |
| eeawaterbase | eeaWaterbase.mjs | 4 | runQuery, queryCo2Cars, queryClimatePolicies, queryEunisSpecies |  | environment, europe, opendata, science, climate, cacheTtlDaily |
| electricitymaps | electricityMaps.mjs | 5 | listZones, getLatestCarbonIntensity, getCarbonIntensityHistory, getLatestPowerBreakdown, getPowerBreakdownHistory | ELECTRICITYMAPS_AUTH_TOKEN | energy, carbon, electricity, climate, cacheTtlFrequent |
| emsc | emscSeismic.mjs | 2 | queryEvents, getEventById |  | earthquake, seismology, geology, hazards, cacheTtlFrequent |
| energycharts | energy-charts.mjs | 7 | getPublicPower, getInstalledPower, getPrice, getRenewableShareForecast, getSignal, getCrossBorderElectricityTrading, getTotalPower |  | energy, electricity, renewables, europe, power, cacheTtlFrequent |
| ens | ens-public.mjs | 5 | resolveName, lookupAddress, getTextRecords, getAvatar, getContentHash |  | ethereum, domain, identity, ens, cacheTtlDaily |
| ens | ens-resolution.mjs | 3 | resolveName, lookupAddress, supportMatrix | INFURA_API_KEY | production, domain, identity, ethereum, cacheTtlDaily |
| enso | enso.mjs | 6 | getRoute, getProtocols, getNetworks, getTokens, getTokenPrice, getAggregators | ENSO_API_KEY | defi, routing, swap, multichain, cacheTtlFrequent |
| entgeltatlas | entgeltatlas.mjs | 6 | getSalaryByOccupation, getRegions, getIndustries, getAgeGroups, getGenders, getMedianData | ENTGELTATLAS_API_KEY | employment, wages, germany, government, statistics, cacheTtlDaily |
| epodata | epoLinkedData.mjs | 6 | listApplications, getApplication, getPublication, getFamily, lookupCpc, listPublications |  | patents, research, linkeddata, cacheTtlDaily |
| epo | patent-search.mjs | 4 | searchPatents, searchByTechnology, searchByKeywords, searchByDate |  | patents, research, search, cacheTtlDaily |
| ercmultitoken | erc1155.mjs | 2 | balanceOf, uri | ALCHEMY_API_KEY, INFURA_API_KEY | erc1155, multitoken, nft, semifungible, balance, onchain, multichain |
| erctoken | erc20.mjs | 3 | tokenInfo, balanceOf, allowance | ALCHEMY_API_KEY, INFURA_API_KEY | erc20, token, fungible, balance, allowance, onchain, multichain |
| ercnft | erc721.mjs | 4 | tokenInfo, ownerOf, tokenURI, balanceOf | ALCHEMY_API_KEY, INFURA_API_KEY | erc721, nft, token, ownership, metadata, onchain, multichain |
| profilejump | profileJump.mjs | 5 | prices, hotProfiles, tokensList, profilesList, profileByAddress |  | lukso, identity, profiles, cacheTtlDaily |
| luksonetwork | universalProfile.mjs | 3 | readProfileData, fetchProfileMetadata, getUniversalReceiverAddress |  | lukso, identity, profiles, cacheTtlDaily |
| esagaia | esaGaia.mjs | 6 | coneSearch, brightStars, nearbyStars, highProperMotion, colorMagnitudeDiagram, variableStars |  | astronomy, stars, esa, opendata, cacheTtlStatic |
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
| euparliament | euParliament.mjs | 6 | listMeps, getMep, listMeetings, getMeeting, listCorporateBodies, listDocuments |  | politics, europe, government, parliament, cacheTtlDaily |
| eusafetygate | eu-safety-gate.mjs | 6 | listLanguages, listCountries, listEnums, listReportYears, getLatestReport, listReports |  | consumer-safety, eu, product-recalls, opendata, cacheTtlDaily |
| eurlex | eurLex.mjs | 6 | searchRegulations, searchDirectives, lookupByCelex, recentLegislation, searchByEuroVoc, querySparql |  | law, government, europe, sparql, cacheTtlDaily |
| europepmc | europepmc.mjs | 6 | searchArticles, getCitations, getReferences, getDatabaseLinks, getLabsLinks, getSearchFields |  | science, publications, biomedical, openaccess, research, cacheTtlDaily |
| europeanparliament | europeanParliament.mjs | 4 | listMeps, getMep, listCorporateBodies, listDocuments |  | politics, europe, government, parliament, cacheTtlDaily |
| europeana | europeana.mjs | 2 | searchRecords, getRecord | EUROPEANA_API_KEY | culture, heritage, museums, europe, cacheTtlDaily |
| eurostat | eurostat.mjs | 3 | getDataset, listDataflows, getDataStructure |  | statistics, europe, economy, demographics, cacheTtlDaily |
| familysearch | familySearch.mjs | 6 | searchPlaces, searchPlacesFuzzy, searchByJurisdiction, searchByCoordinates, getPlaceTypes, searchByTypeAndDate |  | genealogy, history, places, geography, cacheTtlStatic |
| faostat | faostat.mjs | 4 | getData, listDomains, getAreaCodes, getItemCodes |  | agriculture, food, statistics, international, cacheTtlDaily |
| feiertage | holidays.mjs | 2 | getAllHolidays, getStateHolidays |  | holidays, germany, calendar, cacheTtlStatic |
| flixbus | flixbus.mjs | 3 | autocompleteCities, autocompleteStations, searchTrips |  | transport, bus, europe, travel, booking, cacheTtlFrequent |
| footballdata | footballdata.mjs | 8 | listCompetitions, getCompetition, getCompetitionMatches, getCompetitionStandings, getCompetitionTopScorers, getCompetitionTeams, getTeam, getTodaysMatches | FOOTBALLDATA_API_KEY | sports, football, soccer, competitions, worldwide, cacheTtlFrequent |
| frankfurter | frankfurter.mjs | 4 | getLatest, getHistorical, getTimeSeries, listCurrencies |  | finance, currency, exchange, opendata, cacheTtlDaily |
| fred | fred.mjs | 5 | searchSeries, getSeriesObservations, getSeriesInfo, getReleases, getCategory | FRED_API_KEY | economics, finance, statistics, government, cacheTtlDaily |
| freedictionary | free-dictionary.mjs | 1 | getWordDefinition |  | dictionary, language, english, definitions, cacheTtlDaily |
| gbif | gbif.mjs | 5 | matchSpeciesName, searchSpecies, searchOccurrences, getSpeciesById, getSpeciesVernacularNames |  | biodiversity, species, ecology, science, opendata, taxonomy, cacheTtlDaily |
| gdacs | gdacsDisasterAlerts.mjs | 4 | getRecentEvents, getEventData, getEventGeometry, getEventsForApp |  | disasters, alerts, geospatial, emergencies, cacheTtlFrequent |
| gdelt | gdelt.mjs | 5 | searchArticles, getTimelineVolume, getTimelineTone, searchContext, getToneChart |  | news, media, global, opendata, cacheTtlFrequent |
| genesisdestatis | genesisdestatis.mjs | 8 | findTerm, catalogueTables, catalogueStatistics, catalogueVariables, getTableData, getMetadataTable, getMetadataStatistic, getTablesForStatistic |  | statistics, germany, government, economy, population, cacheTtlDaily |
| geoapify | geocoding.mjs | 3 | forwardGeocode, reverseGeocode, autocomplete | GEOAPIFY_API_KEY | geocoding, maps, places, cacheTtlDaily |
| geonames | geonames.mjs | 8 | search, get, postalCodeSearch, countryInfo, timezone, findNearbyPlaceName, elevation, weather | GEONAMES_USERNAME | geography, geocoding, places, postalcodes, timezone, elevation, cacheTtlDaily |
| gesetzedecontent | law-content.mjs | 5 | getLawOverview, getParagraph, searchInLaw, getParagraphRange, getLawStructure |  | law, germany, government, legal, opendata, fulltext |
| gesetzede | law-index.mjs | 3 | searchLaws, getLawList, getIndexStats |  | law, germany, government, legal, opendata |
| goldrush | streaming.mjs | 2 | searchToken, getWalletPnL | GOLDRUSH_API_KEY | crypto, defi, blockchain, tokens, cacheTtlDaily |
| goldskynouns | goldsky-nouns.mjs | 4 | getRecentProposals, getCurrentAuctions, getNounDetails, getTopDelegates |  | production, dao, governance, nft, cacheTtlDaily |
| goldskylilnouns | lil-nouns.mjs | 2 | getProposals, getProposalById |  | production, data, api, cacheTtlDaily |
| goldskynouns | nouns.mjs | 3 | getCandidateProposals, getActivePendingUpdatableProposers, getLatestAuctions |  | production, dao, governance, nft, cacheTtlDaily |
| googlebooks | googleBooks.mjs | 8 | searchVolumes, getVolume, searchByTitle, searchByAuthor, searchBySubject, searchByIsbn, listPublicBookshelves, getBookshelfVolumes |  | books, library, literature, search, cacheTtlDaily |
| googlefactcheck | googleFactCheck.mjs | 3 | searchClaims, searchClaimsByImage, listClaimReviewMarkup | GOOGLE_API_KEY | factcheck, claims, misinformation, verification, news, cacheTtlDaily |
| govdata | datasets.mjs | 5 | searchDatasets, getDataset, listGroups, listOrganizations, searchTags |  | government, opendata, germany, cacheTtlDaily |
| govdatasparql | sparql-analytics.mjs | 7 | getCatalogOverview, searchByTheme, getRecentDatasets, getFormatDistribution, getTopPublishers, getTopKeywords, getDatasetsByPublisher |  | government, opendata, germany, sparql, analytics, cacheTtlDaily |
| greix | greix.mjs | 7 | listCities, getCity, listPropertyTypes, listNeighborhoods, getCityPricePeriod, getCityMetrics, getNeighborhoodMetricsMap |  | real-estate, germany, economics, opendata, cacheTtlDaily |
| gutendex | gutendex.mjs | 5 | listBooks, getBookById, searchByTopic, searchByAuthorLifespan, getBooksByIds |  | books, ebooks, literature, gutenberg, cacheTtlDaily |
| harvardart | harvardArtMuseums.mjs | 4 | searchObjects, getObject, searchPeople, listExhibitions | HARVARD_ART_API_KEY | art, museums, culture, education, cacheTtlDaily |
| hathitrust | hathitrust.mjs | 8 | briefLookupByOclc, briefLookupByIsbn, briefLookupByLccn, fullLookupByOclc, fullLookupByIsbn, fullLookupByLccn, briefLookupByHtid, briefLookupByRecordNumber |  | library, books, archives, bibliography, cacheTtlDaily |
| hebcal | hebcal.mjs | 3 | getHolidays, getShabbatTimes, convertDate |  | reference, calendar, religion, opendata, cacheTtlDaily |
| hnrss | jsonFeeds.mjs | 1 | getFeed |  | news, hackernews, feeds, cacheTtlDaily |
| hochwasserzentralen | flood-monitoring.mjs | 2 | getStations, getAlerts |  | government, environment, flood, weather, germany, opendata, cacheTtlRealtime |
| hochwasserzentralen | hochwasserzentralen.mjs | 4 | getGaugeInfo, getStateInfoPost, getStateInfoGet, getGaugeLocations |  | floods, hydrology, germany, geospatial, cacheTtlFrequent |
| honeypot | honeypot.mjs | 1 | check |  | production, security, token, validation, cacheTtlFrequent |
| hudoc | hudoc.mjs | 5 | searchCases, searchJudgments, searchDecisions, searchCommunicatedCases, searchGrandChamber |  | legal, humanrights, europe, courts, cacheTtlDaily |
| igdb | igdb.mjs | 8 | searchGames, searchPlatforms, searchCompanies, searchGenres, searchGameEngines, searchFranchises, getGameCovers, multiQuery | IGDB_CLIENT_ID, IGDB_ACCESS_TOKEN | games, entertainment, database, platforms, twitch, cacheTtlDaily |
| imfdatamapper | imfdatamapper.mjs | 6 | listIndicators, listCountries, listGroups, getIndicatorAllCountries, getIndicatorByCountry, getIndicatorByGroup |  | economics, finance, macroeconomics, international, statistics, cacheTtlDaily |
| imf | imfSdmx.mjs | 4 | listDataflows, getCompactData, getDataStructure, getCodeList |  | economics, finance, statistics, international, cacheTtlDaily |
| inaturalist | inaturalist.mjs | 5 | getObservations, getSpeciesCounts, searchTaxa, getTaxonById, getPlacesAutocomplete |  | nature, biodiversity, species, citizenscience, observations, ecology, cacheTtlFrequent |
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
| inkar | inkar.mjs | 7 | listCategories, getIndicatorsByCategory, searchIndicators, getIndicatorInfo, getTimePeriods, getData, getRegions |  | statistics, germany, opendata, demographics, cacheTtlDaily |
| internetarchive | internetArchive.mjs | 5 | searchItems, getMetadata, getMetadataField, getFilesSlice, checkAvailability |  | archive, library, books, media, search, opendata, cacheTtlDaily |
| ipuparline | ipuParline.mjs | 6 | listCountries, getCountry, listParliaments, getParliament, listChambers, getElections |  | politics, parliament, democracy, elections, cacheTtlDaily |
| irys | irys.mjs | 2 | getTransactions, getTransactionById |  | irys, arweave, storage, decentralized, cacheTtlFrequent |
| itausschreibung | tenders.mjs | 6 | getAllTenders, getSoftwareTenders, getHardwareTenders, getInternetTenders, getTelecomTenders, getConsultingTenders |  | procurement, germany, tenders, it, cacheTtlDaily |
| iucnredlist | iucnRedList.mjs | 8 | getAssessment, getSpeciesByName, getSpeciesByCountry, getSpeciesByCategory, getSpeciesByHabitat, getSpeciesByThreat, getSpeciesCount, listCountries | IUCN_API_TOKEN | science, conservation, biodiversity, species, environment, cacheTtlDaily |
| jikan | jikan.mjs | 4 | searchAnime, getAnime, searchManga, getTopAnime |  | entertainment, anime, manga, opendata, cacheTtlDaily |
| jplcad | jplcad.mjs | 4 | getCloseApproaches, getPotentiallyHazardous, getByObject, getByMagnitude |  | jpl, nasa, asteroids, closeapproach, planetarydefense, science, cacheTtlDaily |
| jpl | jplfireball.mjs | 1 | getFireballs |  | nasa, space, science, fireball, meteor, planetarydefense, cacheTtlDaily |
| jplsbdb | jplsbdb.mjs | 4 | lookupBody, lookupBodyWithPhysics, lookupBodyWithCloseApproaches, searchByDesignation |  | jpl, nasa, asteroids, comets, space, planetarydefense, science, cacheTtlDaily |
| jplsentry | jplsentry.mjs | 5 | getSentryObject, getSentryObjectBySpk, getSentrySummary, getVirtualImpactors, getRemovedObjects |  | nasa, space, asteroid, impact, neo, science, cacheTtlDaily |
| jupiter | jupiter-all.mjs | 8 | getTokenPrice, getTokenInfo, getTokensInMarket, getAllTradableTokens, getTaggedTokens, getNewTokens, getAllTokens, getSwapQuote | JUPITER_API_KEY | solana, defi, swap, cacheTtlRealtime |
| kegg | kegg.mjs | 8 | getInfo, listEntries, listByOrganism, findEntries, getEntry, linkEntries, convertIds, getDrugInteractions |  | biology, genomics, pathways, compounds, science, cacheTtlDaily |
| klinikatlas | german-places.mjs | 5 | searchPlaces, getPlaceByZip, getPlacesByDistrict, getPlacesNearby, getGermanStates |  | healthcare, germany, geography, places, cacheTtlDaily |
| klinikatlas | hospitals.mjs | 5 | getAllHospitals, searchHospitals, getHospitalsByCity, getHospitalsNearby, getStateStatistics |  | healthcare, germany, hospitals, cacheTtlDaily |
| klinikatlas | medical-codes.mjs | 4 | searchIcdCodes, getIcdCode, searchOpsCodes, getOpsCode |  | healthcare, germany, medical, icd, ops, cacheTtlDaily |
| lastfm | lastfm.mjs | 5 | searchArtists, getArtistInfo, searchTracks, getTopArtists, getAlbumInfo | LASTFM_API_KEY | music, entertainment, charts, recommendations, cacheTtlDaily |
| lebensmittelwarnung | lebensmittelwarnung.mjs | 1 | getWarnings |  | food, safety, germany, consumer, warnings, cacheTtlFrequent |
| lebensmittelwarnungen | warnings.mjs | 1 | getWarnings | LEBENSMITTELWARNUNGEN_API_KEY | government, food, safety, consumer, germany, opendata, cacheTtlFrequent |
| lensorg | lensorg.mjs | 8 | searchScholarlyWorks, getScholarlyWork, searchPatents, getPatent, getScholarlySchema, getPatentSchema, getScholarlyApiUsage, getPatentApiUsage | LENS_API_KEY | science, patents, research, publications, citations, openaccess, cacheTtlDaily |
| libraryofcongress | libraryOfCongress.mjs | 7 | searchAll, searchBooks, searchPhotos, searchMaps, listCollections, searchCollection, searchNewspapers |  | library, books, archives, government, history, cacheTtlDaily |
| llama | getPools.mjs | 2 | getProjectsByName, getPools |  | defi, pools, liquidity, cacheTtlFrequent |
| lobbyregister | lobbyregister.mjs | 4 | searchEntries, getEntryByNumber, getEntryVersion, getStatistics | LOBBYREGISTER_API_KEY | government, transparency, lobbying, parliament, germany, opendata, cacheTtlDaily |
| lobid | lobid.mjs | 8 | searchResources, getResource, searchGnd, getGndRecord, searchResourcesByAuthor, searchGndPersons, searchResourcesBySubject, autocompleteGnd |  | library, catalog, gnd, authority, bibliography, germany, opendata, cacheTtlDaily |
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
| mealdb | mealdb.mjs | 5 | searchMeals, getMeal, listCategories, filterByArea, getRandomMeal |  | food, recipes, cooking, opendata, cacheTtlDaily |
| mediacloud | mediacloud.mjs | 8 | totalCount, countOverTime, storyList, sampleStories, topWords, topSources, topLanguages, getStory |  | news, media, journalism, analysis, nlp, cacheTtlDaily |
| medium | rss-feeds.mjs | 4 | getTagFeed, getUserFeed, getPublicationFeed, getTopicFeed |  | content, social, feeds, cacheTtlDaily |
| memorylol | twitterNameChanges.mjs | 1 | queryUsernameChanges |  | social, twitter, history, cacheTtlDaily |
| merkl | merkl.mjs | 3 | getOpportunities, getUserRewards, getChains |  | defi, rewards, yield, multichain |
| metmuseum | metMuseum.mjs | 4 | searchObjects, getObject, getDepartments, getObjects |  | art, museum, culture, opendata, cacheTtlStatic |
| meteora | meteora.mjs | 7 | getPools, getPoolByAddress, getPoolGroups, getPoolGroupByMints, getPoolOhlcv, getPoolVolumeHistory, getProtocolMetrics |  | defi, solana, amm, dlmm, cacheTtlFrequent |
| minascandevnet | mina-devnet.mjs | 2 | getMinaDevnetSchema, getMinaDevnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| minascanmainnet | mina-mainnet.mjs | 2 | getMinaMainnetSchema, getMinaMainnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| minorplanetcenter | minorPlanetCenter.mjs | 4 | searchOrbits, searchByOrbitalElements, searchNearEarthObjects, searchByMagnitude |  | astronomy, asteroids, space, science, cacheTtlDaily |
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
| musicbrainz | musicBrainz.mjs | 6 | searchArtist, lookupArtist, searchRecording, searchRelease, lookupRecording, searchReleaseGroup |  | music, metadata, artists, recordings, opendata, cacheTtlDaily |
| nagerdate | nager-date.mjs | 4 | getPublicHolidays, getNextHolidays, getLongWeekends, listCountries |  | reference, calendar, opendata, cacheTtlDaily |
| nasaapod | nasaapod.mjs | 3 | getApod, getApodRange, getApodRandom | NASA_API_KEY | nasa, astronomy, space, images, science, cacheTtlDaily |
| nasadonki | nasadonki.mjs | 6 | getSolarFlares, getCoronalMassEjections, getGeomagneticStorms, getHighSpeedStreams, getNotifications, getSolarEnergeticParticles | SERVER_PARAM:NASA_API_KEY | nasa, spaceweather, solar, science, alerts, cacheTtlFrequent |
| nasaearthimagery | nasaearthimagery.mjs | 2 | getEarthImagery, getEarthAssets | NASA_API_KEY | nasa, earth, satellite, imagery, landsat, science, cacheTtlDaily |
| nasaeonet | nasaEonet.mjs | 5 | getEvents, getEventById, getCategories, getEventsByCategory, getSources |  | nasa, environment, disasters, geospatial, cacheTtlFrequent |
| nasaepic | nasaepic.mjs | 5 | getNaturalLatest, getNaturalByDate, getEnhancedLatest, getEnhancedByDate, getAvailableDates | SERVER_PARAM:NASA_API_KEY | nasa, earth, satellite, images, science, climate, cacheTtlDaily |
| nasaexoplanet | nasaExoplanet.mjs | 7 | searchByName, recentDiscoveries, habitableZoneCandidates, byDiscoveryMethod, stellarHosts, discoveryStatistics, coneSearch |  | astronomy, exoplanets, nasa, opendata, cacheTtlDaily |
| nasamarsrover | nasamarsrover.mjs | 4 | getPhotosBySol, getPhotosByEarthDate, getLatestPhotos, getMissionManifest | SERVER_PARAM:NASA_API_KEY | nasa, mars, rover, space, images, science, cacheTtlDaily |
| nasaneows | nasaneows.mjs | 4 | getFeed, lookupAsteroid, browseAsteroids, getTodayFeed | NASA_API_KEY | nasa, asteroids, space, planetary-defense, science, cacheTtlFrequent |
| nasatechport | nasatechport.mjs | 6 | getProject, getProjectIds, searchProjects, getProgram, getPrograms, getOrganization | NASA_API_KEY | nasa, technology, research, space, science, cacheTtlDaily |
| neuris | neuris.mjs | 7 | searchDocuments, searchLegislation, searchCaseLaw, getCaseLawDecision, listCourts, luceneSearch, getStatistics |  | law, germany, legislation, courtdecisions, opendata, cacheTtlDaily |
| newsapi | news.mjs | 3 | getTopHeadlines, getEverything, getSources | NEWSAPI_API_KEY | news, media, content, cacheTtlFrequent |
| newsdata | getNews.mjs | 2 | getLatestNewsdata, getCryptoNewsdata | NEWSDATA_API_KEY | news, media, global, cacheTtlFrequent |
| neynar | neynar.mjs | 5 | getUserByUsername, getUsersByFid, getUsersByAddress, getCast, getUserCasts | NEYNAR_API_KEY | social, farcaster, crypto |
| nhtsarecalls | nhtsaRecalls.mjs | 5 | recallsByVehicle, complaintsByVehicle, recallsByVehicleModelYears, recallsByVehicleMakes, recallsByVehicleModels |  | vehicles, automotive, safety, recalls, usa, government, cacheTtlFrequent |
| nhtsavpic | nhtsaVpic.mjs | 6 | decodeVinValues, decodeWmi, getModelsForMakeYear, getModelsForMake, getAllMakes, getVehicleTypesForMake |  | vehicles, automotive, vin, usa, government, cacheTtlStatic |
| nihreporter | nihreporter.mjs | 3 | searchProjects, searchPublications, searchClinicalStudies |  | science, research, funding, grants, biomedical, cacheTtlDaily |
| nina | warnings.mjs | 4 | getDwdWarnings, getMowasWarnings, getBiwappWarnings, getKatwarnWarnings |  | warnings, germany, safety, cacheTtlFrequent |
| nina | ninaWarnApp.mjs | 7 | getDashboard, getWarningById, getMowasMapData, getDwdMapData, getKatwarnMapData, getLhpMapData, getEventCodes |  | warnings, emergency, germany, weather, cacheTtlRealtime |
| noaaclimate | noaa-climate.mjs | 4 | getDailySummaries, getGlobalSummary, getGlobalHourly, getClimateNormals |  | weather, climate, science, usa, opendata, cacheTtlDaily |
| noaa | noaaWeatherAlerts.mjs | 5 | getActiveAlertsByArea, getAlertTypes, getPointMetadata, getForecastByGrid, getLatestObservation |  | weather, alerts, forecast, noaa, us, government, opendata, cacheTtlShort |
| nobelprize | nobel-prize.mjs | 3 | listPrizes, searchLaureates, getLaureate |  | science, awards, history, opendata, cacheTtlDaily |
| nominatim | nominatim.mjs | 3 | search, reverse, lookup |  | geocoding, maps, openstreetmap, address, geolocation, cacheTtlDaily |
| nvd | nvdCve.mjs | 7 | getCveById, searchCvesBySeverity, searchCvesByKeyword, searchCvesByDateRange, searchCvesByCwe, getCveChangeHistory, searchRecentlyModifiedCves |  | security, vulnerability, cve, cpe, cacheTtlDaily |
| nwsweather | nwsWeather.mjs | 6 | getPoint, getForecast, getHourlyForecast, getActiveAlerts, getStations, getLatestObservation |  | weather, forecast, alerts, government, geolocation, cacheTtlFrequent |
| obis | obis.mjs | 5 | searchOccurrences, getChecklist, getTaxon, listDatasets, listNodes |  | biodiversity, ocean, marine, species, ecology, cacheTtlDaily |
| oecd | oecdData.mjs | 4 | getEconomicOutlook, getConsumerPrices, getHousePrices, getKeyEconomicIndicators |  | economics, statistics, government, international, cacheTtlDaily |
| oeffentlichevergabe | tenders.mjs | 2 | getNoticesByDay, getNoticesByMonth |  | procurement, germany, tenders, government, cacheTtlDaily |
| ohlcv | olhcv-moralis-evm.mjs | 1 | getRecursiveOhlcvEVM | MORALIS_API_KEY | evm, ohlcv, charts, cacheTtlRealtime |
| ohlcv | olhcv-moralis-solana.mjs | 1 | getRecursiveOhlcvSolana | MORALIS_API_KEY | solana, ohlcv, charts, cacheTtlRealtime |
| ohlcv | olhcv-solana-tracker.mjs | 1 | getOhlcvSolana | SOLANA_TRACKER_API_KEY | solana, ohlcv, charts, cacheTtlRealtime |
| omdb | omdb.mjs | 3 | searchMovies, getByImdbId, getByTitle | OMDB_API_KEY | movies, entertainment, media, cacheTtlDaily |
| omim | omim.mjs | 8 | getEntry, searchEntries, searchGeneMap, getGeneMapByChromosome, getClinicalSynopsis, searchClinicalSynopsis, getAllelicVariants, getReferences | OMIM_API_KEY | science, genetics, medicine, health, genomics, cacheTtlDaily |
| oneinch | swap.mjs | 5 | getQuote, getSwap, getTokens, getApprove, getAllowance | ONEINCH_API_KEY | defi, swap, ethereum, trading, cacheTtlRealtime |
| openbrewerydb | open-brewery-db.mjs | 4 | listBreweries, searchBreweries, getBrewery, getRandomBrewery |  | food, beverage, opendata, cacheTtlDaily |
| openfoodfacts | openFoodFacts.mjs | 4 | getProductByBarcode, searchProducts, getProductsByCategory, getProductsByBrand |  | food, nutrition, health, barcode, opendata, cacheTtlDaily |
| openlegaldata | openLegalData.mjs | 6 | searchCases, listCases, searchLaws, listLaws, listLawBooks, listStates |  | legal, germany, courts, opendata, law, cacheTtlDaily |
| openlibrary | openLibrary.mjs | 6 | searchBooks, getWorkByKey, getBookByIsbn, getAuthorByKey, searchAuthors, getSubjectBooks |  | books, library, literature, education, cacheTtlDaily |
| openmeteoweather | openMeteoWeather.mjs | 4 | getCurrentWeather, getHourlyForecast, getDailyForecast, getWeatherHistory |  | weather, forecast, climate, geolocation, opendata, cacheTtlFrequent |
| openmeteo | openMeteoAirQuality.mjs | 3 | getAirQualityForecast, getCurrentAirQuality, getPollenForecast |  | airquality, pollution, environment, forecast, health, opendata, cacheTtlHourly |
| openmeteomarine | openMeteoMarine.mjs | 6 | getMarineForecast, getCurrentMarineConditions, getDailyMarineAggregates, getSwellDetails, getOceanCurrentsAndTemperature, getHistoricalMarineData |  | weather, ocean, marine, forecast, cacheTtlFrequent |
| opennotify | opennotify.mjs | 2 | getIssPosition, getPeopleInSpace |  | space, iss, astronauts, tracking, cacheTtlRealtime |
| opsd | opsd.mjs | 5 | listPlants, searchPlants, getPlantsByLocation, getEnergyMix, listCountries |  | energy, environment, europe, opendata, cacheTtlDaily |
| openstates | openStates.mjs | 4 | searchPeople, searchBills, getGeoLegislators, listJurisdictions | OPENSTATES_API_KEY | politics, government, legislature, usa, cacheTtlDaily |
| openaire | openaire.mjs | 5 | searchPublications, searchDatasets, searchSoftware, searchResearchProducts, searchProjects |  | science, research, publications, openaccess, funding, cacheTtlDaily |
| openalex | openalex.mjs | 8 | searchWorks, getWork, searchAuthors, getAuthor, searchInstitutions, searchFunders, searchTopics, autocompleteEntities |  | science, research, academic, publications, citations, cacheTtlDaily |
| opencellid | opencellid.mjs | 4 | getCellPosition, getCellsInArea, getCellCountInArea, addMeasurement | OPENCELLID_API_KEY | telecom, geolocation, celltowers, mobile, coverage, cacheTtlDaily |
| openchargemap | openchargemap.mjs | 4 | searchChargingStations, getStationById, getReferenceData, searchByBoundingBox | OPENCHARGEMAP_API_KEY | ev, charging, transport, energy, geospatial, cacheTtlFrequent |
| opencitations | opencitations.mjs | 5 | getCitations, getReferences, getCitationCount, getReferenceCount, getCitation |  | science, citations, openaccess, doi, research, cacheTtlDaily |
| opencorporates | opencorporates.mjs | 5 | searchCompanies, getCompany, searchOfficers, getCompanyFilings, searchByRegisteredAddress | OPENCORPORATES_API_KEY | companies, corporate, registry, business, compliance, cacheTtlDaily |
| openfda | openfda.mjs | 5 | searchDrugEvents, searchDrugLabels, searchDrugEnforcement, searchFoodEnforcement, searchDeviceEvents |  | health, medicine, fda, drugs, safety, recalls, regulatory, cacheTtlDaily |
| openfec | openfec.mjs | 4 | searchCandidates, getCandidateTotals, searchCommittees, getElectionSummary | FEC_API_KEY | politics, finance, usa, opendata, cacheTtlDaily |
| openfigi | openfigi.mjs | 4 | mapIdentifiers, searchInstruments, filterInstruments, getMappingValues |  | finance, identifiers, securities, opendata, cacheTtlDaily |
| openfootball | openfootball.mjs | 8 | getBundesliga, getPremierLeague, getLaLiga, getSerieA, getLigue, getBundesligaTwo, getChampionship, getChampionsLeague |  | sports, football, soccer, opendata, cacheTtlStatic |
| openligadb | openligadb.mjs | 8 | getAvailableLeagues, getMatchdayData, getSeasonMatches, getLeagueTable, getGoalGetters, getAvailableTeams, getAvailableGroups, getCurrentMatchday |  | sports, football, soccer, bundesliga, germany, cacheTtlFrequent |
| openplz | openplz.mjs | 8 | getGermanFederalStates, searchGermanLocalities, searchGermanStreets, germanFullTextSearch, getAustrianProvinces, searchAustrianLocalities, getSwissCantons, searchSwissLocalities |  | geodata, postalcodes, municipalities, germany, austria, switzerland, opendata, cacheTtlStatic |
| openrouteservice | openrouteservice.mjs | 7 | directions, isochrones, matrix, geocodeSearch, geocodeReverse, elevation, optimization | ORS_API_KEY | routing, geocoding, maps, isochrones, geospatial, openstreetmap, cacheTtlDaily |
| opensanctions | opensanctions.mjs | 6 | searchEntities, getEntity, getAdjacentEntities, matchEntities, getCatalog, getStatements | OPENSANCTIONS_API_KEY | sanctions, compliance, pep, screening, aml, cacheTtlDaily |
| opensea | opensea.mjs | 5 | getCollectionStats, getCollection, getNft, getEventsByCollection, getListingsByCollection | OPENSEA_API_KEY | nft, marketplace, ethereum, cacheTtlFrequent |
| opensensemap | opensensemap.mjs | 5 | listBoxes, getBox, getSensorData, getStats, searchBoxesByLocation |  | environment, sensors, iot, air-quality, opendata, cacheTtlFrequent |
| opensky | openskyNetwork.mjs | 6 | getAllStates, getFlightsAll, getFlightsByAircraft, getArrivalsByAirport, getDeparturesByAirport, getTrack |  | aviation, tracking, geospatial, transportation, cacheTtlRealtime |
| opentdb | opentdb.mjs | 3 | getQuestions, listCategories, getCategoryCount |  | entertainment, trivia, education, opendata, cacheTtlDaily |
| orca | orca.mjs | 3 | getWhirlpools, getWhirlpoolByAddress, getTokens |  | defi, solana, dex, clmm, cacheTtlFrequent |
| orcid | orcid.mjs | 8 | searchResearchers, getRecord, getPersonDetails, getWorks, getEmployments, getEducations, getFundings, getActivities |  | science, research, researchers, academic, profiles, cacheTtlDaily |
| overpass | osmQuery.mjs | 3 | queryRaw, findNearby, status |  | openstreetmap, geodata, maps, cacheTtlDaily |
| pangaea | pangaea.mjs | 5 | searchDatasets, elasticSearch, getDatasetMetadata, downloadDatasetTab, getDatasetJsonLd |  | earth-science, environment, climate, ocean, geoscience, research, cacheTtlDaily |
| passportonchain | onchain-data.mjs | 1 | getFullPassportData | ETHEREUM_MAINNET_ALCHEMY_HTTP, ARBITRUM_MAINNET_ALCHEMY_HTTP | identity, attestation, gitcoin, cacheTtlDaily |
| patentsview | patentsview.mjs | 8 | searchPatents, searchInventors, searchAssignees, getPatentCitations, searchPublications, searchLocations, searchCpcGroups, getPatentClaims | PATENTSVIEW_API_KEY | patents, intellectual-property, research, government, usa, cacheTtlDaily |
| pegelonline | pegelonline.mjs | 4 | getStations, getStation, getMeasurements, getWaters |  | water, environment, germany, government, cacheTtlFrequent |
| pegelonline | water-levels.mjs | 4 | getStations, getStationDetail, getWaters, getCurrentMeasurement |  | water, germany, environment, hydrology, cacheTtlFrequent |
| pflanzenschutzmittel | pesticides.mjs | 4 | getProducts, getActiveIngredients, getCompanies, getRestrictions |  | agriculture, germany, pesticides, regulation, cacheTtlDaily |
| pinata | read.mjs | 2 | free_read_example, free_read_cid |  | ipfs, storage, read, cacheTtlDaily |
| pinata | write.mjs | 1 | upload_text_file | PINATA_JWT, PINATA_GATEWAY | ipfs, storage, write, cacheTtlDaily |
| poap | graphql.mjs | 5 | getTypename, getSchemaDefinition, getPredefinedQueryList, executePrefinedQuery, querySubgraph |  | nft, attendance, graphql, events, cacheTtlDaily |
| pokeapi | pokeapi.mjs | 5 | getPokemon, listPokemon, getAbility, getType, getEvolutionChain |  | entertainment, gaming, opendata, cacheTtlStatic |
| polymarket | gammaApi.mjs | 3 | searchEvents, getEvents, getMarkets |  | predictions, markets, events, cacheTtlFrequent |
| polymarket | marketInfo.mjs | 2 | getMarkets, getMarketInfo |  | prediction, markets, trading, cacheTtlFrequent |
| polymarket | searchBySlug.mjs | 1 | searchBySlug |  | prediction, markets, events, cacheTtlFrequent |
| pubchem | pubchem.mjs | 5 | getCompoundByName, getCompoundProperties, searchCompoundByName, autocompleteCompound, getCompoundSynonyms |  | chemistry, science, drugs, opendata, cacheTtlDaily |
| pubmedncbi | pubmedNcbi.mjs | 8 | searchArticles, getArticleSummary, fetchAbstract, getDatabaseInfo, findRelatedArticles, globalSearch, spellCheck, citationMatch |  | biomedical, science, literature, health, research, cacheTtlDaily |
| pumpfun | pumpfun.mjs | 4 | getCoins, getCoinByMint, getCurrentlyLive, getUserProfile |  | crypto, solana, memecoins, defi, cacheTtlFrequent |
| pvgis | pvgis.mjs | 6 | pvCalculation, monthlyRadiation, dailyRadiation, hourlySeries, typicalMeteoYear, horizonProfile |  | energy, solar, photovoltaic, radiation, climate, eu, cacheTtlStatic |
| quickchart | charts.mjs | 2 | renderChart, getChartUrl |  | charts, visualization, images, cacheTtlStatic |
| rcsbpdb | rcsb-pdb.mjs | 5 | getEntry, getEntityInfo, getUniprotMapping, getAssembly, getChemicalComponent |  | biology, science, protein, opendata, cacheTtlDaily |
| redditscanner | getTokenMentions.mjs | 2 | getTokenMentions, getHotMemes |  | social, sentiment, crypto, cacheTtlFrequent |
| regionalatlas | regionalatlas.mjs | 4 | getIndicatorByState, getIndicatorByKreis, getIndicatorByRegierungsbezirk, listAvailableIndicators |  | germany, statistics, demographics, regional, opendata, cacheTtlDaily |
| regionalstatistik | regionalstatistik.mjs | 6 | searchStatistics, searchTables, getTableData, searchVariables, findAll, getQualitySigns | REGIONALSTATISTIK_USERNAME, REGIONALSTATISTIK_PASSWORD | germany, statistics, demographics, regional, opendata, census, cacheTtlDaily |
| reisewarnungen | travel-warnings.mjs | 2 | getAllWarnings, getCountryWarning |  | travel, warnings, germany, safety, cacheTtlDaily |
| reliefweb | reliefweb.mjs | 5 | searchReports, searchDisasters, searchJobs, getReportById, searchCountries |  | humanitarian, disasters, crises, unocha, opendata, news, cacheTtlHourly |
| restcountries | rest-countries.mjs | 6 | getAllCountries, getCountryByName, getCountryByCode, getCountriesByRegion, getCountriesByCurrency, getCountriesByLanguage |  | countries, geography, world, international, cacheTtlDaily |
| retractionwatch | retractionwatch.mjs | 6 | getRetractions, getRetractionsByDateRange, searchRetractions, getWorkByDoi, getRetractionsFromPublisher, searchJournals |  | science, retractions, scholarly, integrity, research, cacheTtlDaily |
| rickandmorty | rickandmorty.mjs | 4 | getCharacters, getCharacter, getEpisodes, getLocations |  | entertainment, tv, opendata, cacheTtlStatic |
| rijksmuseum | rijksmuseum.mjs | 3 | searchCollection, searchByObjectNumber, searchByDescription |  | art, museum, culture, heritage, netherlands, cacheTtlStatic |
| rkicovid | rki-covid.mjs | 7 | getGermany, getGermanyHistory, getStates, getStateByAbbreviation, getVaccinations, getDistricts, getTestingHistory |  | health, epidemiology, covid, germany, rki, cacheTtlDaily |
| ror | ror.mjs | 4 | searchOrganizations, advancedSearchOrganizations, matchAffiliation, getOrganization |  | science, research, organizations, identifiers, cacheTtlDaily |
| rugcheck | tokenSafety.mjs | 6 | getTokenReport, getTokenVotes, getRecentTokens, getTrendingTokens, getNewTokens, getVerifiedTokens |  | solana, security, tokens, cacheTtlFrequent |
| rxnorm | rxnorm.mjs | 7 | getDrugs, findRxcuiByString, getRxNormName, getNDCs, getAllProperties, getRelatedByRelationship, getRxNormVersion |  | health, drugs, medicine, pharmacy, nomenclature, cacheTtlDaily |
| safeglobal | transaction-service.mjs | 4 | getSafeInfo, getSafeBalances, getMultisigTransactions, getIncomingTransfers |  | ethereum, multisig, defi, wallet, cacheTtlFrequent |
| santiment | schema.mjs | 5 | get_sentiment_balance, get_social_volume, alert_social_shift, get_trending_words, get_social_dominance | SANTIMENT_API_KEY | crypto, analytics, sentiment, cacheTtlFrequent |
| sciteai | sciteai.mjs | 8 | getTallies, getPaper, searchPapers, getCitingPapers, getCitedByPapers, getRecommendedPapers, getTalliesBySections, getJournalTallies | SCITE_API_KEY | science, citations, research, publications, academic, cacheTtlDaily |
| secdata | sec-data.mjs | 3 | getCompanyFacts, getCompanyFilings, getCompanyConcept |  | finance, usa, sec, opendata, cacheTtlDaily |
| secedgar | sec-edgar.mjs | 1 | searchFilings |  | finance, usa, sec, opendata, cacheTtlDaily |
| semanticscholar | semanticscholar.mjs | 8 | searchPapers, getPaper, getPaperCitations, getPaperReferences, getPaperAuthors, searchAuthors, getAuthor, getAuthorPapers |  | science, research, academic, papers, citations, cacheTtlDaily |
| sensorcommunity | sensorcommunity.mjs | 8 | getSensorData, filterByType, filterByArea, filterByCountry, filterByBox, averageFiveMinutes, averageOneHour, dustSensorsOnly |  | environment, airquality, sensors, opendata, citizenscience, cacheTtlFrequent |
| serlo | serlo.mjs | 6 | getSchema, listSubjects, getContentById, getTaxonomyTerm, getRecentActivity, queryGraphql |  | education, oer, learning, graphql, cacheTtlDaily |
| servicebund | tenders.mjs | 6 | searchTenders, getTendersByState, getTendersByCategory, getAwardedContracts, searchByKeyword, getRecentTenders |  | procurement, tenders, germany, government, opendata |
| sherparomeo | sherpaRomeo.mjs | 3 | searchPublications, searchPublishers, getPublicationById | SHERPA_API_KEY | academic, publishing, openaccess, research, cacheTtlDaily |
| shodan | shodaninternetdb.mjs | 1 | lookupIp |  | security, network, infosec, vulnerability, ports, cacheTtlDaily |
| simbad | simbad.mjs | 6 | coneSearch, objectByType, objectTypeStats, objectMagnitudes, objectIdentifiers, queryAdql |  | astronomy, science, opendata, cacheTtlDaily |
| simdune | activityEVM.mjs | 2 | getActivityEVM, getActivityDetailedEVM | DUNE_SIM_API_KEY | production, activity, analytics, feed, cacheTtlDaily |
| simdune | balancesEVM.mjs | 1 | getBalancesEVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio, cacheTtlDaily |
| simdune | balancesSVM.mjs | 1 | getBalancesSVM | DUNE_SIM_API_KEY | production, balances, analytics, portfolio, svm, solana, cacheTtlDaily |
| simdune | collectiblesEVM.mjs | 1 | getCollectiblesEVM | DUNE_SIM_API_KEY | production, nft, collectibles, metadata, cacheTtlDaily |
| simdune | tokenHoldersEVM.mjs | 1 | getTokenHoldersEVM | DUNE_SIM_API_KEY | production, token, analytics, holders, cacheTtlDaily |
| simdune | tokenInfoEVM.mjs | 1 | getTokenInfoEVM | DUNE_SIM_API_KEY | production, token, analytics, metadata, cacheTtlDaily |
| simdune | transactionsEVM.mjs | 1 | getTransactionsEVM | DUNE_SIM_API_KEY | production, transactions, analytics, history, cacheTtlDaily |
| simdune | transactionsSVM.mjs | 1 | getTransactionsSVM | DUNE_SIM_API_KEY | production, transactions, analytics, history, svm, solana, cacheTtlDaily |
| smard | energy.mjs | 2 | getFilterIndex, getLatestData |  | energy, germany, electricity, market, cacheTtlStatic |
| smithsoniangvp | smithsonianVolcanoes.mjs | 4 | getHoloceneVolcanoes, getPleistoceneVolcanoes, getHoloceneEruptions, getRecentEruptions |  | volcanoes, geology, geospatial, natural-hazards, cacheTtlDaily |
| smithsonian | smithsonianOpenAccess.mjs | 5 | searchCollection, searchByCategory, getContent, getTerms, getStats | SI_API_KEY | museum, art, culture, science, history, cacheTtlDaily |
| snapshot | snapshot.mjs | 3 | listSpaces, listProposals, getProposalDetails |  | dao, governance, voting, cacheTtlDaily |
| soilgrids | soilgrids.mjs | 3 | getWrbClassification, getPropertyLayers, querySoilProperties |  | soil, geology, environment, geospatial, agriculture, cacheTtlStatic |
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
| spacex | spacexApi.mjs | 8 | getAllLaunches, getLatestLaunch, getUpcomingLaunches, getLaunchById, getAllRockets, getAllCrew, getStarlinkSatellites, getCompanyInfo |  | space, launches, rockets, satellites, cacheTtlFrequent |
| starknet | starknet-token.mjs | 3 | getTokenBalance, getBlockNumber, getBlockInfo |  | starknet, defi, tokens, cacheTtlFrequent |
| stolpersteineberl | memorial-stones.mjs | 4 | getAllStones, searchStones, getStonesByDistrict, getStonesByLocation |  | memorial, history, berlin |
| strahlenschutz | radiation.mjs | 2 | getLatestReadings, getStationTimeseries |  | radiation, germany, environment, safety, cacheTtlFrequent |
| swaggerhub | api-registry.mjs | 2 | searchApis, listApiVersions |  | production, api, documentation, registry, cacheTtlDaily |
| swapi | swapi.mjs | 5 | searchPeople, getPerson, getFilm, getPlanet, getStarship |  | entertainment, movies, opendata, cacheTtlStatic |
| taapi | indicators-part1.mjs | 8 | getRSI, getMACD, getBollingerBands, getEMA, getSMA, getStochastic, getATR, getStochRSI | TAAPI_SECRET | crypto, trading, indicators, cacheTtlFrequent |
| taapi | indicators-part2.mjs | 2 | getVWAP, getIchimoku | TAAPI_SECRET | crypto, trading, indicators, cacheTtlFrequent |
| tagesschau | news.mjs | 4 | getHomepage, getNews, searchArticles, getChannels |  | news, germany, media, cacheTtlFrequent |
| talentprotocol | advancedSearch.mjs | 2 | searchAdvancedProfiles, getDefaultFields | TALENT_API_KEY | identity, talent, profiles, cacheTtlDaily |
| tally | governance.mjs | 4 | getChains, getGovernors, getProposals, getDelegates | TALLY_API_KEY | governance, dao, proposals, voting, cacheTtlDaily |
| ted | procurement.mjs | 1 | searchNotices |  | procurement, europe, tenders, government, cacheTtlDaily |
| tenderly | public-contracts.mjs | 1 | getPublicContract |  | ethereum, smartcontracts, debugging, cacheTtlStatic |
| thegraph | getNewUniswapPools.mjs | 1 | getNewPools | THEGRAPH_API_KEY | defi, uniswap, graphql, cacheTtlDaily |
| thegraph | getSchema.mjs | 2 | getSubgraphSchema, querySubgraph | THEGRAPH_API_KEY | defi, subgraph, graphql, cacheTtlStatic |
| tle | tle-api.mjs | 2 | searchSatellites, getSatelliteById |  | satellite, space, orbit, tle, norad, cacheTtlDaily |
| tmdb | tmdb.mjs | 7 | searchMovies, searchTvShows, getMovieDetails, getMovieCredits, getTrendingMovies, getPopularMovies, discoverMovies | TMDB_API_KEY | movies, tv, entertainment, media, cacheTtlDaily |
| transitousmotis | transitousMotis.mjs | 3 | geocode, planTrip, reverseGeocode |  | transport, public-transit, europe, routing, timetable, cacheTtlFrequent |
| transportrestdb | transportRestDb.mjs | 6 | searchLocations, getStop, getDepartures, getArrivals, planJourney, getTrip |  | transport, railway, germany, public-transit, timetable, cacheTtlFrequent |
| transportrestvbb | transportRestVbb.mjs | 5 | searchLocations, getStop, getDepartures, getArrivals, planJourney |  | transport, public-transit, berlin, germany, timetable, cacheTtlFrequent |
| tvmaze | tvmaze.mjs | 5 | searchShows, getShow, getShowEpisodes, getShowCast, getSchedule |  | entertainment, tv, media, opendata, cacheTtlDaily |
| twitter | search.mjs | 1 | searchRecentTweets | TWITTER_BEARER_TOKEN | social, search, mentions, cacheTtlFrequent |
| ubaluftqualitaet | ubaluftqualitaet.mjs | 8 | getAirQuality, getAirQualityLimits, getMeasurements, getComponents, getMetadata, getAnnualBalances, getExceedances, getThresholds |  | environment, air-quality, germany, government, health, cacheTtlFrequent |
| ukparliament | uk-parliament.mjs | 4 | searchMembers, getMember, getMemberVotingRecord, getMemberContactDetails |  | politics, uk, legislation, opendata, cacheTtlDaily |
| umweltbundesamt | air-quality.mjs | 5 | getStations, searchStations, getComponents, getAirQualityIndex, getMeasurements |  | airquality, germany, environment, pollution |
| uncomtrade | un-comtrade.mjs | 5 | getTradeData, getDataAvailability, listReferences, listReporters, listTradeRegimes |  | trade, economics, international, opendata, cacheTtlDaily |
| undata | undata.mjs | 6 | listDataflows, ghgEmissions, energyStatistics, energyBalance, countryIndicators, educationStatistics |  | statistics, environment, energy, education, opendata, sdmx, cacheTtlDaily |
| unescoworldheritage | unescoWorldHeritage.mjs | 4 | searchSites, getSitesByCountry, getDangerSites, getDatasetInfo |  | culture, heritage, geography, tourism, unesco, cacheTtlStatic |
| uniprot | uniprot.mjs | 5 | searchProteins, getProteinEntry, searchUniref, searchUniparc, searchProteomes |  | science, biology, proteins, genomics, bioinformatics, cacheTtlDaily |
| uniswap | uniswap-pool-explorer.mjs | 2 | getTokenPools, getPoolData | THEGRAPH_API_KEY | production, cacheTtlDaily |
| uniswap | price-discovery.mjs | 2 | getSupportedChains, getTokenPrice | ETHEREUM_MAINNET_ALCHEMY_HTTP, POLYGON_MAINNET_ALCHEMY_HTTP, ARBITRUM_MAINNET_ALCHEMY_HTTP, OPTIMISM_MAINNET_ALCHEMY_HTTP | production, dex, trading, defi, cacheTtlRealtime |
| unpaywall | unpaywall.mjs | 1 | getByDoi | UNPAYWALL_EMAIL | science, openaccess, publications, doi, research, cacheTtlDaily |
| uscongress | us-congress.mjs | 7 | listBills, listBillsByCongress, getBill, listMembers, getMember, listCommittees, listNominations | CONGRESS_API_KEY | politics, usa, legislation, opendata, cacheTtlDaily |
| usdafooddata | usdaFoodData.mjs | 4 | searchFoods, getFoodById, listFoods, getMultipleFoods | USDA_API_KEY | nutrition, food, health, science, government, cacheTtlDaily |
| usgs | usgsEarthquake.mjs | 5 | queryEarthquakes, queryByRadius, countEarthquakes, getEventById, getSignificantEarthquakes |  | earthquakes, geology, geospatial, hazards, cacheTtlFrequent |
| vag | transit.mjs | 2 | getStops, getDepartures |  | transit, germany, realtime, nuremberg, cacheTtlStatic |
| vanda | vanda.mjs | 4 | searchObjects, getObject, clusterSearch, searchByMaterial |  | museum, art, culture, design, history, cacheTtlStatic |
| waybackmachine | waybackMachine.mjs | 5 | searchCaptures, searchCapturesFiltered, latestCapture, countPages, searchByDomain |  | archive, web, history, snapshots, crawl, cacheTtlDaily |
| webcareer | job-listings.mjs | 1 | queryJobs | WEB3_CAREER_API_TOKEN | production, jobs, career, crypto, cacheTtlDaily |
| wegweiserkommune | wegweiser-kommune.mjs | 8 | listIndicators, listTopics, listRegions, getStatisticsTypes, getStatisticsData, getIndicatorInfo, getRegionInfo, listDemographicTypes |  | statistics, germany, demographics, opendata, cacheTtlDaily |
| whogho | whogho.mjs | 5 | getIndicators, getIndicatorData, getDimensions, getDimensionValues, getCountries |  | health, who, statistics, global, indicators, cacheTtlDaily |
| wikidata | wikidata.mjs | 6 | countriesByPopulation, citiesByCountry, programmingLanguages, universitiesByCountry, nobelLaureatesByYear, querySparql |  | knowledge, linkeddata, sparql, opendata, cacheTtlDaily |
| wikimediacommons | wikimediaCommons.mjs | 6 | searchFiles, getImageInfo, getExtendedMetadata, getCategoryMembers, searchWithImageInfo, getFileCategories |  | media, images, opendata, creativecommons, wikipedia, cacheTtlDaily |
| wikipedia | wikipedia.mjs | 4 | getPageSummary, searchArticles, openSearch, getMediaList |  | knowledge, encyclopedia, search, cacheTtlDaily |
| wipoipc | wipoipc.mjs | 1 | checkSymbolValidity |  | patents, intellectualproperty, classification, government, international, cacheTtlStatic |
| worldbank | worldBank.mjs | 6 | getCountryIndicator, getAllCountriesIndicator, listCountries, getCountryDetails, listIndicators, getIndicatorDetails |  | economics, development, statistics, countries, cacheTtlDaily |
| wormholescan | wormholescan.mjs | 7 | getCrossChainActivity, getMoneyFlow, getTopAssetsByVolume, getTopChainPairsByNumTransfers, getTopSymbolsByVolume, getTopCorridors, getKpiList |  | data, api, cacheTtlFrequent |
| wtotimeseries | wtotimeseries.mjs | 8 | getTopics, getIndicators, getReportingEconomies, getPartnerEconomies, getTimeseries, getDataCount, getMetadata, getFrequencies | WTO_API_KEY | trade, economics, statistics, tariffs, wto, cacheTtlDaily |
| xpayment | ping.mjs | 2 | free_ping, paid_ping |  | payments, protocol, micropayments, cacheTtlStatic |
| yahoofinance | Ohlcv.mjs | 1 | getOhlcv |  | trading, ohlcv, stocks, crypto, forex, charts |
| yahoofinance | Quote.mjs | 2 | getQuote, getQuoteBatch |  | trading, stocks, crypto, forex, prices |
| yahoofinance | Search.mjs | 1 | searchSymbol |  | trading, stocks, crypto, forex, search |
| yfinance | chart.mjs | 2 | getOhlcv, getQuote |  | finance, prices, ohlcv, stocks, crypto, cacheTtlDaily |
| zdb | zdb.mjs | 4 | searchTitles, getTitle, searchTitlesLookup, searchTitlesData |  | libraries, journals, serials, bibliography, germany, cacheTtlDaily |
| zenodo | zenodo.mjs | 5 | searchRecords, getRecord, searchCommunities, searchLicenses, searchFunders |  | science, research, datasets, openaccess, publications, cacheTtlDaily |
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
                "ALTMETRIC_API_KEY": "",
                "AQICN_API_TOKEN": "",
                "ARBITRUM_MAINNET_ALCHEMY_HTTP": "",
                "AVIATIONSTACK_API_KEY": "",
                "BICSCAN_API_KEY": "",
                "BIRDEYE_API_KEY": "",
                "BLOCKBERRY_API_KEY": "",
                "BLOCKNATIVE_API_KEY": "",
                "BSCSCAN_API_KEY": "",
                "CHART_IMG_API_KEY": "",
                "CMC_API_KEY": "",
                "COINCAP_API_KEY": "",
                "COINSTATS_API_KEY": "",
                "CONGRESS_API_KEY": "",
                "CONNECTED_PAPERS_API_KEY": "",
                "CORE_API_KEY": "",
                "CRYPTOPANIC_API_KEY": "",
                "CRYPTORANK_API_KEY": "",
                "CRYPTOWIZARDS_API_KEY": "",
                "DDB_API_KEY": "",
                "DEBANK_ACCESS_KEY": "",
                "DIP_API_KEY": "",
                "DIP_BUNDESTAG_API_KEY": "",
                "DPLA_API_KEY": "",
                "DUNE_API_KEY": "",
                "DUNE_SIM_API_KEY": "",
                "EBIRD_API_KEY": "",
                "ELECTRICITYMAPS_AUTH_TOKEN": "",
                "ENSO_API_KEY": "",
                "ENTGELTATLAS_API_KEY": "",
                "ETHEREUM_MAINNET_ALCHEMY_HTTP": "",
                "ETHERSCAN_API_KEY": "",
                "EUROPEANA_API_KEY": "",
                "FEC_API_KEY": "",
                "FOOTBALLDATA_API_KEY": "",
                "FRED_API_KEY": "",
                "GEOAPIFY_API_KEY": "",
                "GEONAMES_USERNAME": "",
                "GOLDRUSH_API_KEY": "",
                "GOOGLE_API_KEY": "",
                "HARVARD_ART_API_KEY": "",
                "IGDB_ACCESS_TOKEN": "",
                "IGDB_CLIENT_ID": "",
                "INFURA_API_KEY": "",
                "IUCN_API_TOKEN": "",
                "JUPITER_API_KEY": "",
                "LASTFM_API_KEY": "",
                "LEBENSMITTELWARNUNGEN_API_KEY": "",
                "LENS_API_KEY": "",
                "LOBBYREGISTER_API_KEY": "",
                "MORALIS_API_KEY": "",
                "NASA_API_KEY": "",
                "NEWSAPI_API_KEY": "",
                "NEWSDATA_API_KEY": "",
                "NEYNAR_API_KEY": "",
                "OMDB_API_KEY": "",
                "OMIM_API_KEY": "",
                "ONEINCH_API_KEY": "",
                "OPENCELLID_API_KEY": "",
                "OPENCHARGEMAP_API_KEY": "",
                "OPENCORPORATES_API_KEY": "",
                "OPENSANCTIONS_API_KEY": "",
                "OPENSEA_API_KEY": "",
                "OPENSTATES_API_KEY": "",
                "OPTIMISM_MAINNET_ALCHEMY_HTTP": "",
                "ORS_API_KEY": "",
                "PATENTSVIEW_API_KEY": "",
                "PINATA_GATEWAY": "",
                "PINATA_JWT": "",
                "POLYGON_MAINNET_ALCHEMY_HTTP": "",
                "REGIONALSTATISTIK_PASSWORD": "",
                "REGIONALSTATISTIK_USERNAME": "",
                "SANTIMENT_API_KEY": "",
                "SCITE_API_KEY": "",
                "SERVER_PARAM:NASA_API_KEY": "",
                "SHERPA_API_KEY": "",
                "SI_API_KEY": "",
                "SOLANA_TRACKER_API_KEY": "",
                "SOLSCAN_API_KEY": "",
                "SOLSNIFFER_API_KEY": "",
                "TAAPI_SECRET": "",
                "TALENT_API_KEY": "",
                "TALLY_API_KEY": "",
                "THEGRAPH_API_KEY": "",
                "TMDB_API_KEY": "",
                "TWITTER_BEARER_TOKEN": "",
                "UNPAYWALL_EMAIL": "",
                "USDA_API_KEY": "",
                "WEB3_CAREER_API_TOKEN": "",
                "WTO_API_KEY": "",
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