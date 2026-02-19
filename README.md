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
| alternative | fearAndGreed.mjs | 3 | getCurrentFng, getHistoricalFng, analyzeFngTrend |  | crypto, sentiment, index, cacheTtlFrequent |
| arbeitsagentur | education.mjs | 2 | searchApprenticeships, searchStudyPrograms |  | education, germany, apprenticeship, training, cacheTtlDaily |
| arbeitsagentur | jobs.mjs | 2 | searchJobs, searchJobsByEmployer |  | jobs, germany, employment, labor, cacheTtlDaily |
| arbeitsagentur | jobsuche.mjs | 2 | searchJobs, searchJobsApp |  | jobs, employment, germany, cacheTtlDaily |
| arbeitsagentur | professions.mjs | 2 | searchProfessions, getProfessionDetail |  | professions, germany, employment, education, cacheTtlDaily |
| arxiv | papers.mjs | 4 | searchPapers, getPaper, getByAuthor, getByCategory |  | science, research, papers, academic, cacheTtlFrequent |
| autobahn | traffic.mjs | 6 | listRoads, getRoadworks, getWarnings, getClosures, getChargingStations, getWebcams |  | traffic, germany, infrastructure, cacheTtlFrequent |
| avalancheMetrics | metrics-api.mjs | 8 | listChains, getChainInfo, getChainMetrics, getRollingWindowMetrics, getStakingMetrics, getValidatorMetrics, getICMSummary, getICMTimeseries |  | blockchain, avalanche, metrics, staking, analytics, cacheTtlDaily |
| beaconchain | validatorQueue.mjs | 3 | getActivationQueue, getExitQueue, getValidatorStatus |  | ethereum, validators, staking, cacheTtlDaily |
| berlinevents | events.mjs | 4 | markets_festivals, street_festivals, christmas_markets, police_assemblies |  | berlin, events, opendata, cacheTtlDaily |
| berlinfunds | funds.mjs | 2 | funding_opportunities, continuing_education |  | berlin, funding, opendata, cacheTtlDaily |
| berlinvergabe | procurement.mjs | 1 | getProcurementNotices |  | procurement, berlin, germany, opendata, cacheTtlDaily |
| berlinvhs | vhs.mjs | 1 | all_courses |  | berlin, education, opendata, cacheTtlDaily |
| berlinwfs | wfs-locations.mjs | 2 | dog_parks, bbq_areas |  | berlin, geodata, opendata, cacheTtlDaily |
| berlinDenkmale | heritage-sites.mjs | 3 | getMonuments, getMonumentsByType, getMonumentsByBbox |  | berlin, geodata, heritage, monuments, opendata, cacheTtlDaily |
| berlinkriminalitaet | crime-statistics.mjs | 2 | getDistrictStatistics, getRegionStatistics |  | berlin, crime, opendata, statistics, police, cacheTtlDaily |
| berlinMietspiegel | wohnlagen.mjs | 2 | getWohnlagen, getWohnlageByAddress |  | berlin, housing, geodata, opendata, cacheTtlDaily |
| berlinSolar | solar-installations.mjs | 6 | getSolarByDistrict, getSolarByPostalCode, getLargePvInstallations, getPublicPvInstallations, getSolarPotentialByDistrict, getPvCoverageByDistrict |  | berlin, solar, energy, environment, geodata, opendata, cacheTtlDaily |
| bicscan | bicscan.mjs | 2 | getRiskScore, getAssets | BICSCAN_API_KEY | security, risk, scanning, cacheTtlDaily |
| bitget | bitget.mjs | 3 | getTokenPrice, getAnnoucements, getCoinInfo |  | production, exchange, trading, price, cacheTtlDaily |
| blockberry | mina-mainnet.mjs | 6 | getDashboardInfo, getAccountByHash, getAccountBalance, getBlocks, getZkAppTransactions, getZkAppByAddress | BLOCKBERRY_API_KEY | production, blockchain, explorer, mina, cacheTtlDaily |
| blockchaininfo | utxoAndBlocks.mjs | 2 | getUTXO, getBlockStats |  | bitcoin, blockchain, utxo, cacheTtlDaily |
| blocknative | gasprice.mjs | 1 | getGasPrices | BLOCKNATIVE_API_KEY | new, cacheTtlRealtime |
| bridgeRates | bridgerates.mjs | 4 | getSupportedChains, getSupportedTools, getConnections, getTransferStatus |  | bridge, crosschain, defi, cacheTtlRealtime |
| bscscan | getContractBinance.mjs | 2 | getContractABI, getContractSourceCode | BSCSCAN_API_KEY | test, cacheTtlDaily |
| bundesnetzagentur | ev-charging.mjs | 4 | getStations, getStationById, getStationsByCity, getStationsByRadius |  | ev, charging, germany, infrastructure, energy, mobility, cacheTtlStandard |
| chainlist | chainlist.mjs | 5 | getChainById, getChainsByKeyword, getExplorerURLs, getRPCEndpoints, getWebsocketEndpoints |  | production, blockchain, rpc, network, cacheTtlStatic |
| chartImg | tradingview-charts.mjs | 1 | getAdvancedChart | CHART_IMG_API_KEY | charts, visualization, trading, cacheTtlStatic |
| coinbaseBazaar | discovery.mjs | 1 | listResources |  | payments, marketplace, crypto, cacheTtlDaily |
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
| coingecko | simplePrice.mjs | 2 | getSimplePrice, getTokenPrice |  | crypto, prices, conversion, cacheTtlRealtime |
| coingecko | trending.mjs | 3 | getTrendingCoins, getTrendingNfts, getTrendingCategories |  | crypto, trending, discovery, cacheTtlFrequent |
| coinmarketcap | category.mjs | 5 | getCategories, getCategory, getIdMap, getMetadataV2, getQuotesLatestV2 | CMC_API_KEY | crypto, categories, marketdata, cacheTtlDaily |
| coinmarketcap | cmc-index.mjs | 2 | getHistorical, getLatest | CMC_API_KEY | crypto, index, marketdata, cacheTtlDaily |
| coinmarketcap | fear-and-greed.mjs | 2 | getFearAndGreedHistorical, getFearAndGreedLatest | CMC_API_KEY | crypto, sentiment, index, cacheTtlFrequent |
| coinmarketcap | listings.mjs | 1 | listingsLatest | CMC_API_KEY | crypto, listings, marketdata, cacheTtlFrequent |
| cryptodata | mixed.mjs | 18 | getCoins, getCoinById, getCoinChartById, getCoinAvgPrice, getCoinExchangePrice, getTickerExchanges, getTickerMarkets, getBlockchains, getWalletBalance, getWalletBalances, getExchanges, getFiatCurrencies, getNewsSources, getNews, getNewsByType, getNewsById, getMarketCap, getCurrencies | COINSTATS_API_KEY | production, price, market, data, cacheTtlFrequent |
| context7 | getDocumentation.mjs | 2 | searchLibraryId, getLibraryDocs |  | documentation, search, developer, cacheTtlStatic |
| cryptopanic | getNews.mjs | 1 | getCryptoCryptopanicNews | CRYPTOPANIC_API_KEY | crypto, news, aggregator, cacheTtlFrequent |
| cryptorank | funds.mjs | 5 | searchFunds, getAllFunds, getFundBasic, getFundDetail, getFundTeam | CRYPTORANK_API_KEY | funds, investors, analytics, cacheTtlDaily |
| cryptowizards | analytics.mjs | 6 | runBacktest, checkCointegration, getCorrelations, analyzeCopula, analyzeSpread, analyzeZScores | CRYPTOWIZARDS_API_KEY | production, analytics, trading, backtest, cacheTtlDaily |
| dashboardDeutschland | statistics.mjs | 3 | getDashboards, getIndicator, getGeoData |  | statistics, germany, economy, destatis, cacheTtlDaily |
| debank | portfolio.mjs | 6 | getTotalBalance, getUsedChains, getTokenList, getProtocolList, getAllProtocols, getTokenInfo | DEBANK_ACCESS_KEY | defi, portfolio, wallet, crypto, cacheTtlFrequent |
| defillama | api.mjs | 3 | getProtocols, getProtocolTvl, getChainTvl |  | defi, tvl, protocols, cacheTtlFrequent |
| defillama | coins.mjs | 1 | getTokenPrices |  | defi, prices, tokens, cacheTtlFrequent |
| defillama | yields.mjs | 2 | getPools, getPoolTvl |  | defi, yields, farming, cacheTtlFrequent |
| dexpaprika | defiPrices.mjs | 7 | getNetworks, getToken, getMultiPrices, getPool, getTokenPools, getPoolTransactions, searchTokens |  | defi, prices, liquidity, cacheTtlRealtime |
| dexscreener | boosted.mjs | 2 | getLatestBoostedTokens, getMostActiveBoostedTokens |  | defi, trading, boosted, cacheTtlFrequent |
| dexscreener | pairs.mjs | 2 | getPairByChainAndAddress, checkTokenOrders |  | defi, trading, pairs, cacheTtlFrequent |
| dexscreener | tokenInfo.mjs | 4 | getLatestTokenProfiles, searchPairs, getPairsByToken, getTokenPools |  | defi, tokens, discovery, cacheTtlFrequent |
| dexscreener | tokenpairs.mjs | 4 | getTokenPairs, getLatestPairs, getPairsByChain, getSpecificPair |  | dex, trading, pairs, cacheTtlFrequent |
| digitaleVerwaltung | services.mjs | 2 | getServices, getAdminRegions |  | government, germany, administration, services, cacheTtlDaily |
| dip | documents.mjs | 8 | listDrucksachen, getDrucksache, listDrucksacheTexts, getDrucksacheText, listPlenarprotokolle, getPlenarprotokoll, listPlenarprotokollTexts, getPlenarprotokollText | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| dip | proceedings.mjs | 8 | listVorgaenge, getVorgang, listVorgangspositionen, getVorgangsposition, listAktivitaeten, getAktivitaet, listPersonen, getPerson | DIP_API_KEY | parliament, germany, opendata, legislation, cacheTtlDaily |
| duneAnalytics | farcaster.mjs | 3 | farcasterGetTrendingMemecoins, farcasterGetTrendingChannels, farcasterGetTrendingUsers | DUNE_API_KEY | analytics, farcaster, social, cacheTtlDaily |
| duneAnalytics | getResults.mjs | 1 | getLatestResult | DUNE_API_KEY | analytics, queries, data, cacheTtlDaily |
| duneAnalytics | trendingContracts.mjs | 3 | getDexPairStats, getTrendingContracts, getMarketShare | DUNE_API_KEY | analytics, contracts, trending, cacheTtlFrequent |
| dwd | weather.mjs | 1 | getStationOverview |  | weather, germany, forecast, cacheTtlFrequent |
| ecovisio | counters.mjs | 1 | getCountersByOrganization |  | mobility, germany, cycling, pedestrian, cacheTtlDaily |
| epoOPS | patent-search.mjs | 6 | searchPatents, getPatentBiblio, getPatentAbstract, getPatentFamily, getPatentLegalStatus, searchRegister | EPO_CONSUMER_KEY, EPO_CONSUMER_SECRET | patents, research, intellectualProperty, europe, germany, cacheTtlDaily |
| epo | patent-search.mjs | 4 | searchPatents, searchByTechnology, searchByKeywords, searchByDate |  | patents, research, search, cacheTtlDaily |
| profilejump | profileJump.mjs | 5 | prices, hotProfiles, tokensList, profilesList, profileByAddress |  | lukso, identity, profiles, cacheTtlDaily |
| etherscan | getContractEthereum.mjs | 2 | getContractABI, getContractSourceCode | ETHERSCAN_API_KEY | ethereum, contracts, explorer, cacheTtlDaily |
| etherscan | getContractMultichain.mjs | 3 | getAvailableChains, getSmartContractAbi, getSourceCode | ETHERSCAN_API_KEY | evm, contracts, explorer, cacheTtlDaily |
| etherscan | getGaspriceMultichain.mjs | 2 | getGasOracle, estimateGasCost | ETHERSCAN_API_KEY | evm, gas, fees, cacheTtlRealtime |
| ethscriptions | ethscriptions-api.mjs | 11 | listEthscriptions, getEthscription, getEthscriptionData, getEthscriptionAttachment, checkEthscriptionExists, checkMultipleEthscriptionsExistence, listTransfers, listTokens, getTokenDetails, getTokenHistoricalState, getIndexerStatus |  | nft, ethereum, inscriptions, cacheTtlDaily |
| feiertage | holidays.mjs | 2 | getAllHolidays, getStateHolidays |  | holidays, germany, calendar, cacheTtlStatic |
| geoapify | geocoding.mjs | 3 | forwardGeocode, reverseGeocode, autocomplete | GEOAPIFY_API_KEY | geocoding, maps, places, cacheTtlDaily |
| goldrush | blockchain-data.mjs | 8 | getBalances, getTransactions, getChains, getTokenHolders, getTokenPrice, getAddressActivity, getErc20Transfers, getTransactionSummary | GOLDRUSH_API_KEY | crypto, blockchain, defi, multichain, wallets, cacheTtlFrequent |
| goldrush | streaming.mjs | 2 | searchToken, getWalletPnL | GOLDRUSH_API_KEY | crypto, defi, blockchain, tokens, cacheTtlDaily |
| goldskyNouns | goldsky-nouns.mjs | 4 | getRecentProposals, getCurrentAuctions, getNounDetails, getTopDelegates |  | production, dao, governance, nft, cacheTtlDaily |
| goldskyLilNouns | lil-nouns.mjs | 2 | getProposals, getProposalById |  | production, data, api, cacheTtlDaily |
| goldskyNouns | nouns.mjs | 3 | getCandidateProposals, getActivePendingUpdatableProposers, getLatestAuctions |  | production, dao, governance, nft, cacheTtlDaily |
| govdata | datasets.mjs | 5 | searchDatasets, getDataset, listGroups, listOrganizations, searchTags |  | government, opendata, germany, cacheTtlDaily |
| hnrss | jsonFeeds.mjs | 1 | getFeed |  | news, hackernews, feeds, cacheTtlDaily |
| honeypot | honeypot.mjs | 1 | check |  | production, security, token, validation, cacheTtlFrequent |
| itausschreibung | tenders.mjs | 6 | getAllTenders, getSoftwareTenders, getHardwareTenders, getInternetTenders, getTelecomTenders, getConsultingTenders |  | procurement, germany, tenders, it, cacheTtlDaily |
| jupiter | jupiter-all.mjs | 7 | getTokenPrice, getTokenInfo, getTokensInMarket, getAllTradableTokens, getTaggedTokens, getNewTokens, getAllTokens |  | solana, defi, swap, cacheTtlRealtime |
| klinikatlas | hospitals.mjs | 6 | getLocations, getIcdCodes, getOpsCodes, getStateStatistics, getGermanPlaces, getGermanStates |  | healthcare, germany, hospitals, medical, cacheTtlDaily |
| llama | getPools.mjs | 2 | getProjectsByName, getPools |  | defi, pools, liquidity, cacheTtlFrequent |
| luksoNetwork | address.mjs | 12 | listAddresses, getAddress, getAddressCounters, getAddressTransactions, getAddressTokenTransfers, getAddressInternalTxs, getAddressLogs, getBlocksValidated, getTokenBalances, getFlatTokenBalances, getCoinBalanceHistory, getCoinBalanceByDay |  | lukso, address, explorer, cacheTtlDaily |
| luksoNetwork | blocks.mjs | 4 | getBlocks, getBlockById, getBlockTransactions, getBlockWithdrawals |  | lukso, blocks, explorer, cacheTtlFrequent |
| luksoNetwork | graphql.mjs | 2 | getLuksoExplorerSchema, fectchLuksoExplorer |  | lukso, graphql, explorer, cacheTtlDaily |
| luksoNetwork | internal.mjs | 2 | getMainPageTransactions, getMainPageBlocks |  | lukso, internal, explorer, cacheTtlDaily |
| luksoNetwork | nfts.mjs | 7 | getNFTsByAddress, getNFTCollectionsByAddress, getNFTInstancesByContract, getNFTInstanceById, getNFTInstanceTransfers, getNFTInstanceHolders, getNFTInstanceTransfersCount |  | lukso, nft, collectibles, cacheTtlDaily |
| luksoNetwork | search.mjs | 2 | search, searchRedirect |  | lukso, search, explorer, cacheTtlDaily |
| luksoNetwork | sourceCode.mjs | 4 | listcontracts, getabi, getsourcecode, getcontractcreation |  | lukso, contracts, sourcecode, cacheTtlDaily |
| luksoNetwork | stats.mjs | 3 | getStats, getTransactionChart, getMarketChart |  | lukso, statistics, network, cacheTtlDaily |
| luksoNetwork | tokens.mjs | 5 | listTokens, getTokenByAddress, getTokenTransfersByAddress, getTokenHolders, getTokenCounters |  | lukso, tokens, balances, cacheTtlDaily |
| luksoNetwork | transactions.mjs | 7 | getTransactions, getTransactionByHash, getTokenTransfersByTransactionHash, getInternalTransactions, getLogs, getRawTrace, getStateChanges |  | lukso, transactions, explorer, cacheTtlFrequent |
| mcpRegistry | servers.mjs | 2 | listServers, searchServers |  | mcp, registry, ai, tools, cacheTtlDaily |
| medium | rss-feeds.mjs | 4 | getTagFeed, getUserFeed, getPublicationFeed, getTopicFeed |  | content, social, feeds, cacheTtlDaily |
| memoryLol | twitterNameChanges.mjs | 1 | queryUsernameChanges |  | social, twitter, history, cacheTtlDaily |
| minascanDevnet | mina-devnet.mjs | 2 | getMinaDevnetSchema, getMinaDevnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| minascanMainnet | mina-mainnet.mjs | 2 | getMinaMainnetSchema, getMinaMainnetQuery |  | production, blockchain, explorer, mina, cacheTtlDaily |
| moralis | blockchainApi.mjs | 7 | /block/:block_number_or_hash, /dateToBlock, /transaction/:transaction_hash/verbose, /:address/verbose, /latestBlockNumber/:chain, /transaction/:transaction_hash, /:address | MORALIS_API_KEY | evm, blockchain, blocks, cacheTtlFrequent |
| moralis | defiApi.mjs | 3 | /wallets/:address/defi/:protocol/positions, /wallets/:address/defi/positions, /wallets/:address/defi/summary | MORALIS_API_KEY | evm, defi, positions, cacheTtlFrequent |
| moralis | entity.mjs | 1 | /entities/categories | MORALIS_API_KEY | evm, identity, entities, cacheTtlDaily |
| moralis | nftApi.mjs | 20 | /market-data/nfts/top-collections, /market-data/nfts/hottest-collections, /nft/:address, /nft/:address/stats, /nft/:address/metadata, /nft/:address/transfers, /nft/:address/:token_id, /nft/:address/owners, /nft/:address/:token_id/owners, /nft/:address/:token_id/trades, /wallets/:address/nfts/trades, /nft/:address/trades, /nft/:address/traits/paginate, /nft/:address/traits, /nft/:address/:token_id/transfers, /:address/nft/collections, /:address/nft/transfers, /:address/nft, /nft/:address/:token_id/metadata/resync, /nft/:address/traits/resync | MORALIS_API_KEY | evm, nft, collectibles, cacheTtlFrequent |
| moralis | priceApi.mjs | 7 | /nft/:address/price, /nft/:address/floor-price, /nft/:address/:token_id/floor-price, /nft/:address/floor-price/historical, /nft/:address/:token_id/price, /pairs/:address/ohlcv, /erc20/:address/price | MORALIS_API_KEY | evm, prices, tokens, cacheTtlRealtime |
| moralis | tokenApi.mjs | 16 | /:pair_address/reserves, /pairs/:address/snipers, /pairs/:address/swaps, /wallets/:address/swaps, /tokens/:address/analytics, /erc20/:token_address/owners, /erc20/metadata/symbols, /erc20/metadata, /erc20/:address/stats, /erc20/:address/transfers, /market-data/erc20s/top-tokens, /erc20/:address/top-gainers, /wallets/:address/approvals, /wallets/:address/tokens, /:address/erc20, /:address/erc20/transfers | MORALIS_API_KEY | evm, tokens, balances, cacheTtlFrequent |
| moralis | utils.mjs | 2 | /info/endpointWeights, /web3/version | MORALIS_API_KEY | evm, utilities, conversion, cacheTtlDaily |
| moralis | walletApi.mjs | 11 | /wallets/:address/chains, /:address/balance, /wallets/:address/history, /wallets/:address/net-worth, /wallets/:address/profitability/summary, /wallets/:address/profitability, /wallets/:address/stats, /resolve/:address/domain, /resolve/:address/reverse, /resolve/:domain, /resolve/ens/:domain | MORALIS_API_KEY | evm, wallet, portfolio, cacheTtlFrequent |
| mudab | marine-data.mjs | 3 | getStations, getParameters, getProjectStations |  | marine, germany, environment, monitoring, cacheTtlFrequent |
| newsapi | news.mjs | 3 | getTopHeadlines, getEverything, getSources | NEWSAPI_API_KEY | news, media, content, cacheTtlFrequent |
| newsdata | getNews.mjs | 2 | getLatestNewsdata, getCryptoNewsdata | NEWSDATA_API_KEY | news, media, global, cacheTtlFrequent |
| nina | warnings.mjs | 4 | getDwdWarnings, getMowasWarnings, getBiwappWarnings, getKatwarnWarnings |  | warnings, germany, safety, cacheTtlFrequent |
| oneInch | swap.mjs | 5 | getQuote, getSwap, getTokens, getApprove, getAllowance | ONEINCH_API_KEY | defi, swap, ethereum, trading, cacheTtlRealtime |
| overpass | osmQuery.mjs | 3 | queryRaw, findNearby, status |  | openstreetmap, geodata, maps, cacheTtlDaily |
| patentsview | us-patents.mjs | 5 | searchPatents, getPatent, searchInventors, searchAssignees, searchCpcGroups | PATENTSVIEW_API_KEY | patents, research, government, search, cacheTtlDaily |
| pegelonline | water-levels.mjs | 4 | getStations, getStationDetail, getWaters, getCurrentMeasurement |  | water, germany, environment, hydrology, cacheTtlFrequent |
| pflanzenschutzmittel | pesticides.mjs | 4 | getProducts, getActiveIngredients, getCompanies, getRestrictions |  | agriculture, germany, pesticides, regulation, cacheTtlDaily |
| pinata | read.mjs | 2 | free_read_example, free_read_cid |  | ipfs, storage, read, cacheTtlDaily |
| poap | graphql.mjs | 5 | getTypename, getSchemaDefinition, getPredefinedQueryList, executePrefinedQuery, querySubgraph |  | nft, attendance, graphql, events, cacheTtlDaily |
| polymarket | gammaApi.mjs | 3 | searchEvents, getEvents, getMarkets |  | predictions, markets, events, cacheTtlFrequent |
| polymarket | marketInfo.mjs | 2 | getMarkets, getMarketInfo |  | prediction, markets, trading, cacheTtlFrequent |
| polymarket | searchBySlug.mjs | 1 | searchBySlug |  | prediction, markets, events, cacheTtlFrequent |
| rdap | domain-lookup.mjs | 3 | domainLookup, nameserverLookup, domainAvailability |  | domain, whois, dns, internet, registration, cacheTtlDaily |
| redditScanner | getTokenMentions.mjs | 2 | getTokenMentions, getHotMemes |  | social, sentiment, crypto, cacheTtlFrequent |
| reisewarnungen | travel-warnings.mjs | 2 | getAllWarnings, getCountryWarning |  | travel, warnings, germany, safety, cacheTtlDaily |
| rugcheck | tokenSafety.mjs | 6 | getTokenReport, getTokenVotes, getRecentTokens, getTrendingTokens, getNewTokens, getVerifiedTokens |  | solana, security, tokens, cacheTtlFrequent |
| safeGlobal | transaction-service.mjs | 4 | getSafeInfo, getSafeBalances, getMultisigTransactions, getIncomingTransfers |  | ethereum, multisig, defi, wallet, cacheTtlFrequent |
| santiment | schema.mjs | 5 | get_sentiment_balance, get_social_volume, alert_social_shift, get_trending_words, get_social_dominance | SANTIMENT_API_KEY | crypto, analytics, sentiment, cacheTtlFrequent |
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
| solanatracker | --tokenEndpoints.mjs | 15 | tokenInformation, tokenHolders, topTokenHolders, allTimeHighPrice, tokensByDeployer, search, latestTokens, multipleTokens, trendingTokens, tokensByVolume, tokenOverview, graduatedTokens, tokenByPool, trendingTokensByTimeframe, tokensByVolumeTimeframe | SOLANA_TRACKER_API_KEY | solana, tokens, discovery, cacheTtlFrequent |
| solanatracker | --topTraderRoutes.mjs | 3 | topTradersAll, topTradersAllPaged, topTradersByToken | SOLANA_TRACKER_API_KEY | solana, trading, leaderboard, cacheTtlFrequent |
| solanatracker | --tradeEndpoints.mjs | 4 | tokenTrades, tradesByWallet, tokenPoolTrades, userPoolTrades | SOLANA_TRACKER_API_KEY | solana, trading, swaps, cacheTtlRealtime |
| solanatracker | --walletEndpoints.mjs | 4 | walletInformation, walletTokensBasic, walletTokensPaged, walletTrades | SOLANA_TRACKER_API_KEY | solana, wallet, portfolio, cacheTtlFrequent |
| solscan | getChainInfo.mjs | 1 | chainInfo | SOLSCAN_API_KEY | solana, explorer, blocks, cacheTtlFrequent |
| solsniffer | analysis.mjs | 1 | analysisToken | SOLSNIFFER_API_KEY | solana, security, analysis, cacheTtlFrequent |
| sourcify | verification.mjs | 5 | getVerificationStatus, checkByAddresses, getSourceFileTree, getSourceFiles, getSupportedChains |  | ethereum, verification, smartcontracts, cacheTtlDaily |
| spaceid | spaceid.mjs | 3 | getSupportedChains, getAddress, getName |  | production, domain, identity, blockchain, cacheTtlDaily |
| stolpersteineBerl | memorial-stones.mjs | 5 | getAllStones, searchStones, getStonesByDistrict, getStonesByPerson, getStonesByLocation |  | memorial, history, berlin, cacheTtlDaily |
| strahlenschutz | radiation.mjs | 2 | getLatestReadings, getStationTimeseries |  | radiation, germany, environment, safety, cacheTtlFrequent |
| swaggerhub | api-registry.mjs | 2 | searchApis, listApiVersions |  | production, api, documentation, registry, cacheTtlDaily |
| taapi | indicators.mjs | 10 | getRSI, getMACD, getBollingerBands, getEMA, getSMA, getStochastic, getATR, getStochRSI, getVWAP, getIchimoku | TAAPI_SECRET | crypto, trading, indicators, cacheTtlFrequent |
| tagesschau | news.mjs | 4 | getHomepage, getNews, searchArticles, getChannels |  | news, germany, media, cacheTtlFrequent |
| talentprotocol | advancedSearch.mjs | 2 | searchAdvancedProfiles, getDefaultFields | TALENT_API_KEY | identity, talent, profiles, cacheTtlDaily |
| tally | governance.mjs | 4 | getChains, getGovernors, getProposals, getDelegates | TALLY_API_KEY | governance, dao, proposals, voting, cacheTtlDaily |
| ted | procurement.mjs | 1 | searchNotices |  | procurement, europe, tenders, government, cacheTtlDaily |
| tenderly | public-contracts.mjs | 1 | getPublicContract |  | ethereum, smartcontracts, debugging, cacheTtlStatic |
| thegraph | getNewUniswapPools.mjs | 1 | getNewPools | THEGRAPH_API_KEY | defi, uniswap, graphql, cacheTtlDaily |
| thegraph | getSchema.mjs | 2 | getSubgraphSchema, querySubgraph | THEGRAPH_API_KEY | defi, subgraph, graphql, cacheTtlStatic |
| twitter | search.mjs | 1 | searchRecentTweets | TWITTER_BEARER_TOKEN | social, search, mentions, cacheTtlFrequent |
| umweltbundesamt | air-quality.mjs | 4 | getStations, getComponents, getAirQualityIndex, getMeasurements |  | airquality, germany, environment, pollution, cacheTtlFrequent |
| uniswap | uniswap-pool-explorer.mjs | 2 | getTokenPools, getPoolData | THEGRAPH_API_KEY | production, cacheTtlDaily |
| vag | transit.mjs | 2 | getStops, getDepartures |  | transit, germany, realtime, nuremberg, cacheTtlStatic |
| webcareer | job-listings.mjs | 1 | queryJobs | WEB3_CAREER_API_TOKEN | production, jobs, career, crypto, cacheTtlDaily |
| wormholescan | wormholescan.mjs | 7 | getCrossChainActivity, getMoneyFlow, getTopAssetsByVolume, getTopChainPairsByNumTransfers, getTopSymbolsByVolume, getTopCorridors, getKpiList |  | data, api, cacheTtlFrequent |
| x402 | ping.mjs | 2 | free_ping, paid_ping |  | payments, protocol, micropayments, cacheTtlStatic |
| zvgPortal | auctions.mjs | 2 | searchAuctions, getAuctionDetail |  | immobilien, auktionen, justiz, cacheTtlDaily |
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
                "DEBANK_ACCESS_KEY": "",
                "DIP_API_KEY": "",
                "DUNE_API_KEY": "",
                "DUNE_SIM_API_KEY": "",
                "EPO_CONSUMER_KEY": "",
                "ETHERSCAN_API_KEY": "",
                "GEOAPIFY_API_KEY": "",
                "GOLDRUSH_API_KEY": "",
                "MORALIS_API_KEY": "",
                "NEWSAPI_API_KEY": "",
                "NEWSDATA_API_KEY": "",
                "ONEINCH_API_KEY": "",
                "PATENTSVIEW_API_KEY": "",
                "SANTIMENT_API_KEY": "",
                "SOLANA_TRACKER_API_KEY": "",
                "SOLSCAN_API_KEY": "",
                "SOLSNIFFER_API_KEY": "",
                "TAAPI_SECRET": "",
                "TALENT_API_KEY": "",
                "TALLY_API_KEY": "",
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