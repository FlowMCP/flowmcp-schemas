const allSchemas = [
    {
        "id": "aave_aave",
        "relativePath": "schemas/v1.2.0/aave/aave.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/aave/aave.mjs",
        "internalImport": "./../../schemas/v1.2.0/aave/aave.mjs",
        "folderName": "aave",
        "hasImport": false,
        "namespace": "aave",
        "tags": [
            "defi",
            "lending",
            "protocol"
        ],
        "requiredServerParams": [
            "THEGRAPH_API_KEY"
        ],
        "routeNames": [
            "getReserves",
            "getUserData",
            "getProtocolData"
        ],
        "schemaFolder": "aave",
        "schemaName": "aave",
        "fileName": "aave.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/aave/aave.mjs' )
		    return { schema }
		}
    },
    {
        "id": "alternative_fearAndGreed",
        "relativePath": "schemas/v1.2.0/alternative-me/fearAndGreed.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/alternative-me/fearAndGreed.mjs",
        "internalImport": "./../../schemas/v1.2.0/alternative-me/fearAndGreed.mjs",
        "folderName": "alternative-me",
        "hasImport": false,
        "namespace": "alternative",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getCurrentFng",
            "getHistoricalFng",
            "analyzeFngTrend"
        ],
        "schemaFolder": "alternative-me",
        "schemaName": "fearAndGreed",
        "fileName": "fearAndGreed.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/alternative-me/fearAndGreed.mjs' )
		    return { schema }
		}
    },
    {
        "id": "berlinevents_events",
        "relativePath": "schemas/v1.2.0/berlin-de/events.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/berlin-de/events.mjs",
        "internalImport": "./../../schemas/v1.2.0/berlin-de/events.mjs",
        "folderName": "berlin-de",
        "hasImport": false,
        "namespace": "berlinevents",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "markets_festivals",
            "street_festivals",
            "christmas_markets",
            "police_assemblies"
        ],
        "schemaFolder": "berlin-de",
        "schemaName": "events",
        "fileName": "events.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/berlin-de/events.mjs' )
		    return { schema }
		}
    },
    {
        "id": "berlinfunds_funds",
        "relativePath": "schemas/v1.2.0/berlin-de/funds.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/berlin-de/funds.mjs",
        "internalImport": "./../../schemas/v1.2.0/berlin-de/funds.mjs",
        "folderName": "berlin-de",
        "hasImport": false,
        "namespace": "berlinfunds",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "funding_opportunities",
            "continuing_education"
        ],
        "schemaFolder": "berlin-de",
        "schemaName": "funds",
        "fileName": "funds.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/berlin-de/funds.mjs' )
		    return { schema }
		}
    },
    {
        "id": "berlinvhs_vhs",
        "relativePath": "schemas/v1.2.0/berlin-de/vhs.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/berlin-de/vhs.mjs",
        "internalImport": "./../../schemas/v1.2.0/berlin-de/vhs.mjs",
        "folderName": "berlin-de",
        "hasImport": false,
        "namespace": "berlinvhs",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "all_courses"
        ],
        "schemaFolder": "berlin-de",
        "schemaName": "vhs",
        "fileName": "vhs.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/berlin-de/vhs.mjs' )
		    return { schema }
		}
    },
    {
        "id": "berlinwfs_wfs-locations",
        "relativePath": "schemas/v1.2.0/berlin-de/wfs-locations.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/berlin-de/wfs-locations.mjs",
        "internalImport": "./../../schemas/v1.2.0/berlin-de/wfs-locations.mjs",
        "folderName": "berlin-de",
        "hasImport": false,
        "namespace": "berlinwfs",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "dog_parks",
            "bbq_areas"
        ],
        "schemaFolder": "berlin-de",
        "schemaName": "wfs-locations",
        "fileName": "wfs-locations.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/berlin-de/wfs-locations.mjs' )
		    return { schema }
		}
    },
    {
        "id": "bicscan_bicscan",
        "relativePath": "schemas/v1.2.0/bicscan/bicscan.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/bicscan/bicscan.mjs",
        "internalImport": "./../../schemas/v1.2.0/bicscan/bicscan.mjs",
        "folderName": "bicscan",
        "hasImport": false,
        "namespace": "bicscan",
        "tags": [
            "security",
            "risk",
            "scanning"
        ],
        "requiredServerParams": [
            "BICSCAN_API_KEY"
        ],
        "routeNames": [
            "getRiskScore",
            "getAssets"
        ],
        "schemaFolder": "bicscan",
        "schemaName": "bicscan",
        "fileName": "bicscan.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/bicscan/bicscan.mjs' )
		    return { schema }
		}
    },
    {
        "id": "bitget_bitget",
        "relativePath": "schemas/v1.2.0/bitget/bitget.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/bitget/bitget.mjs",
        "internalImport": "./../../schemas/v1.2.0/bitget/bitget.mjs",
        "folderName": "bitget",
        "hasImport": false,
        "namespace": "bitget",
        "tags": [
            "production",
            "exchange",
            "trading",
            "price"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getTokenPrice",
            "getAnnoucements",
            "getCoinInfo"
        ],
        "schemaFolder": "bitget",
        "schemaName": "bitget",
        "fileName": "bitget.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/bitget/bitget.mjs' )
		    return { schema }
		}
    },
    {
        "id": "blockberry_mina-mainnet",
        "relativePath": "schemas/v1.2.0/blockberry-one/mina-mainnet.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/blockberry-one/mina-mainnet.mjs",
        "internalImport": "./../../schemas/v1.2.0/blockberry-one/mina-mainnet.mjs",
        "folderName": "blockberry-one",
        "hasImport": false,
        "namespace": "blockberry",
        "tags": [
            "production",
            "blockchain",
            "explorer",
            "mina"
        ],
        "requiredServerParams": [
            "BLOCKBERRY_API_KEY"
        ],
        "routeNames": [
            "getDashboardInfo",
            "getAccountByHash",
            "getAccountBalance",
            "getBlocks",
            "getZkAppTransactions",
            "getZkAppByAddress"
        ],
        "schemaFolder": "blockberry-one",
        "schemaName": "mina-mainnet",
        "fileName": "mina-mainnet.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/blockberry-one/mina-mainnet.mjs' )
		    return { schema }
		}
    },
    {
        "id": "blocknative_gasprice",
        "relativePath": "schemas/v1.2.0/blocknative/gasprice.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/blocknative/gasprice.mjs",
        "internalImport": "./../../schemas/v1.2.0/blocknative/gasprice.mjs",
        "folderName": "blocknative",
        "hasImport": false,
        "namespace": "blocknative",
        "tags": [
            "new"
        ],
        "requiredServerParams": [
            "BLOCKNATIVE_API_KEY"
        ],
        "routeNames": [
            "getGasPrices"
        ],
        "schemaFolder": "blocknative",
        "schemaName": "gasprice",
        "fileName": "gasprice.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/blocknative/gasprice.mjs' )
		    return { schema }
		}
    },
    {
        "id": "bridgeRates_bridgerates",
        "relativePath": "schemas/v1.2.0/bridgerates/bridgerates.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/bridgerates/bridgerates.mjs",
        "internalImport": "./../../schemas/v1.2.0/bridgerates/bridgerates.mjs",
        "folderName": "bridgerates",
        "hasImport": false,
        "namespace": "bridgeRates",
        "tags": [
            "bridge",
            "crosschain",
            "defi"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getSupportedChains",
            "getSupportedTools",
            "getConnections",
            "getTransferStatus"
        ],
        "schemaFolder": "bridgerates",
        "schemaName": "bridgerates",
        "fileName": "bridgerates.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/bridgerates/bridgerates.mjs' )
		    return { schema }
		}
    },
    {
        "id": "bscscan_getContractBinance",
        "relativePath": "schemas/v1.2.0/bscscan/getContractBinance.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/bscscan/getContractBinance.mjs",
        "internalImport": "./../../schemas/v1.2.0/bscscan/getContractBinance.mjs",
        "folderName": "bscscan",
        "hasImport": false,
        "namespace": "bscscan",
        "tags": [
            "test"
        ],
        "requiredServerParams": [
            "BSCSCAN_API_KEY"
        ],
        "routeNames": [
            "getContractABI",
            "getContractSourceCode"
        ],
        "schemaFolder": "bscscan",
        "schemaName": "getContractBinance",
        "fileName": "getContractBinance.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/bscscan/getContractBinance.mjs' )
		    return { schema }
		}
    },
    {
        "id": "chainlist_chainlist",
        "relativePath": "schemas/v1.2.0/chainlist/chainlist.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/chainlist/chainlist.mjs",
        "internalImport": "./../../schemas/v1.2.0/chainlist/chainlist.mjs",
        "folderName": "chainlist",
        "hasImport": false,
        "namespace": "chainlist",
        "tags": [
            "production",
            "blockchain",
            "rpc",
            "network"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getChainById",
            "getChainsByKeyword",
            "getExplorerURLs",
            "getRPCEndpoints",
            "getWebsocketEndpoints"
        ],
        "schemaFolder": "chainlist",
        "schemaName": "chainlist",
        "fileName": "chainlist.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/chainlist/chainlist.mjs' )
		    return { schema }
		}
    },
    {
        "id": "chartImg_tradingview-charts",
        "relativePath": "schemas/v1.2.0/chart-img-com/tradingview-charts.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/chart-img-com/tradingview-charts.mjs",
        "internalImport": "./../../schemas/v1.2.0/chart-img-com/tradingview-charts.mjs",
        "folderName": "chart-img-com",
        "hasImport": false,
        "namespace": "chartImg",
        "tags": [
            "charts",
            "visualization",
            "trading"
        ],
        "requiredServerParams": [
            "CHART_IMG_API_KEY"
        ],
        "routeNames": [
            "getAdvancedChart"
        ],
        "schemaFolder": "chart-img-com",
        "schemaName": "tradingview-charts",
        "fileName": "tradingview-charts.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/chart-img-com/tradingview-charts.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coincap_assets",
        "relativePath": "schemas/v1.2.0/coincap/assets.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coincap/assets.mjs",
        "internalImport": "./../../schemas/v1.2.0/coincap/assets.mjs",
        "folderName": "coincap",
        "hasImport": false,
        "namespace": "coincap",
        "tags": [],
        "requiredServerParams": [
            "COINCAP_API_KEY"
        ],
        "routeNames": [
            "listAssets",
            "singleAsset",
            "assetMarkets",
            "assetHistory"
        ],
        "schemaFolder": "coincap",
        "schemaName": "assets",
        "fileName": "assets.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coincap/assets.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coincap_exchanges",
        "relativePath": "schemas/v1.2.0/coincap/exchanges.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coincap/exchanges.mjs",
        "internalImport": "./../../schemas/v1.2.0/coincap/exchanges.mjs",
        "folderName": "coincap",
        "hasImport": false,
        "namespace": "coincap",
        "tags": [],
        "requiredServerParams": [
            "COINCAP_API_KEY"
        ],
        "routeNames": [
            "listExchanges",
            "getExchangeById"
        ],
        "schemaFolder": "coincap",
        "schemaName": "exchanges",
        "fileName": "exchanges.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coincap/exchanges.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coincap_markets",
        "relativePath": "schemas/v1.2.0/coincap/markets.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coincap/markets.mjs",
        "internalImport": "./../../schemas/v1.2.0/coincap/markets.mjs",
        "folderName": "coincap",
        "hasImport": false,
        "namespace": "coincap",
        "tags": [],
        "requiredServerParams": [
            "COINCAP_API_KEY"
        ],
        "routeNames": [
            "listMarkets"
        ],
        "schemaFolder": "coincap",
        "schemaName": "markets",
        "fileName": "markets.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coincap/markets.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coincap_rates",
        "relativePath": "schemas/v1.2.0/coincap/rates.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coincap/rates.mjs",
        "internalImport": "./../../schemas/v1.2.0/coincap/rates.mjs",
        "folderName": "coincap",
        "hasImport": false,
        "namespace": "coincap",
        "tags": [],
        "requiredServerParams": [
            "COINCAP_API_KEY"
        ],
        "routeNames": [
            "listRates",
            "getRateBySlug"
        ],
        "schemaFolder": "coincap",
        "schemaName": "rates",
        "fileName": "rates.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coincap/rates.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_coingecko-stablecoins",
        "relativePath": "schemas/v1.2.0/coingecko-com/coingecko-stablecoins.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/coingecko-stablecoins.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/coingecko-stablecoins.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [
            "price",
            "market",
            "stablecoins"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getSupportedStablecoins",
            "getCurrentPrice",
            "getHistoricalData",
            "analyzePegStability"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "coingecko-stablecoins",
        "fileName": "coingecko-stablecoins.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/coingecko-stablecoins.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_coins",
        "relativePath": "schemas/v1.2.0/coingecko-com/coins.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/coins.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/coins.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getCoinsList",
            "getCoinsMarkets",
            "getCoinById",
            "getCoinMarketChart",
            "getCoinHistory",
            "getCoinTickers",
            "getCoinContractInfo"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "coins",
        "fileName": "coins.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/coins.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_derivatives",
        "relativePath": "schemas/v1.2.0/coingecko-com/derivatives.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/derivatives.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/derivatives.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getDerivativeExchangeIds",
            "getDerivativeExchangesByIds",
            "getDerivativeProductsByExchangeId"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "derivatives",
        "fileName": "derivatives.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/derivatives.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_exchanges",
        "relativePath": "schemas/v1.2.0/coingecko-com/exchanges.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/exchanges.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/exchanges.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getExchangesList",
            "getExchangeById",
            "getExchangeTickers"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "exchanges",
        "fileName": "exchanges.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/exchanges.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_getCategories",
        "relativePath": "schemas/v1.2.0/coingecko-com/getCategories.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/getCategories.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/getCategories.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getAvailableCoinCategoryIds",
            "getCoinCategoryDetailsByIds"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "getCategories",
        "fileName": "getCategories.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/getCategories.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_global",
        "relativePath": "schemas/v1.2.0/coingecko-com/global.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/global.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/global.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getGlobalData",
            "getDeFiGlobalData"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "global",
        "fileName": "global.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/global.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_simplePrice",
        "relativePath": "schemas/v1.2.0/coingecko-com/simplePrice.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/simplePrice.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/simplePrice.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getSimplePrice",
            "getTokenPrice"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "simplePrice",
        "fileName": "simplePrice.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/simplePrice.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coingecko_trending",
        "relativePath": "schemas/v1.2.0/coingecko-com/trending.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coingecko-com/trending.mjs",
        "internalImport": "./../../schemas/v1.2.0/coingecko-com/trending.mjs",
        "folderName": "coingecko-com",
        "hasImport": false,
        "namespace": "coingecko",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getTrendingCoins",
            "getTrendingNfts",
            "getTrendingCategories"
        ],
        "schemaFolder": "coingecko-com",
        "schemaName": "trending",
        "fileName": "trending.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coingecko-com/trending.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coinmarketcap_category",
        "relativePath": "schemas/v1.2.0/coinmarketcap-com/category.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coinmarketcap-com/category.mjs",
        "internalImport": "./../../schemas/v1.2.0/coinmarketcap-com/category.mjs",
        "folderName": "coinmarketcap-com",
        "hasImport": false,
        "namespace": "coinmarketcap",
        "tags": [],
        "requiredServerParams": [
            "CMC_API_KEY"
        ],
        "routeNames": [
            "getCategories",
            "getCategory",
            "getIdMap",
            "getMetadataV2",
            "getQuotesLatestV2"
        ],
        "schemaFolder": "coinmarketcap-com",
        "schemaName": "category",
        "fileName": "category.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coinmarketcap-com/category.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coinmarketcap_cmc-index",
        "relativePath": "schemas/v1.2.0/coinmarketcap-com/cmc-index.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coinmarketcap-com/cmc-index.mjs",
        "internalImport": "./../../schemas/v1.2.0/coinmarketcap-com/cmc-index.mjs",
        "folderName": "coinmarketcap-com",
        "hasImport": false,
        "namespace": "coinmarketcap",
        "tags": [],
        "requiredServerParams": [
            "CMC_API_KEY"
        ],
        "routeNames": [
            "getHistorical",
            "getLatest"
        ],
        "schemaFolder": "coinmarketcap-com",
        "schemaName": "cmc-index",
        "fileName": "cmc-index.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coinmarketcap-com/cmc-index.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coinmarketcap_fear-and-greed",
        "relativePath": "schemas/v1.2.0/coinmarketcap-com/fear-and-greed.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coinmarketcap-com/fear-and-greed.mjs",
        "internalImport": "./../../schemas/v1.2.0/coinmarketcap-com/fear-and-greed.mjs",
        "folderName": "coinmarketcap-com",
        "hasImport": false,
        "namespace": "coinmarketcap",
        "tags": [],
        "requiredServerParams": [
            "CMC_API_KEY"
        ],
        "routeNames": [
            "getFearAndGreedHistorical",
            "getFearAndGreedLatest"
        ],
        "schemaFolder": "coinmarketcap-com",
        "schemaName": "fear-and-greed",
        "fileName": "fear-and-greed.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coinmarketcap-com/fear-and-greed.mjs' )
		    return { schema }
		}
    },
    {
        "id": "coinmarketcap_listings",
        "relativePath": "schemas/v1.2.0/coinmarketcap-com/listings.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coinmarketcap-com/listings.mjs",
        "internalImport": "./../../schemas/v1.2.0/coinmarketcap-com/listings.mjs",
        "folderName": "coinmarketcap-com",
        "hasImport": false,
        "namespace": "coinmarketcap",
        "tags": [],
        "requiredServerParams": [
            "CMC_API_KEY"
        ],
        "routeNames": [
            "listingsLatest"
        ],
        "schemaFolder": "coinmarketcap-com",
        "schemaName": "listings",
        "fileName": "listings.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coinmarketcap-com/listings.mjs' )
		    return { schema }
		}
    },
    {
        "id": "cryptodata_mixed",
        "relativePath": "schemas/v1.2.0/coinstats/mixed.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/coinstats/mixed.mjs",
        "internalImport": "./../../schemas/v1.2.0/coinstats/mixed.mjs",
        "folderName": "coinstats",
        "hasImport": false,
        "namespace": "cryptodata",
        "tags": [
            "production",
            "price",
            "market",
            "data"
        ],
        "requiredServerParams": [
            "COINSTATS_API_KEY"
        ],
        "routeNames": [
            "getCoins",
            "getCoinById",
            "getCoinChartById",
            "getCoinAvgPrice",
            "getCoinExchangePrice",
            "getTickerExchanges",
            "getTickerMarkets",
            "getBlockchains",
            "getWalletBalance",
            "getWalletBalances",
            "getExchanges",
            "getFiatCurrencies",
            "getNewsSources",
            "getNews",
            "getNewsByType",
            "getNewsById",
            "getMarketCap",
            "getCurrencies"
        ],
        "schemaFolder": "coinstats",
        "schemaName": "mixed",
        "fileName": "mixed.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/coinstats/mixed.mjs' )
		    return { schema }
		}
    },
    {
        "id": "cointelegraph_getLatestNews",
        "relativePath": "schemas/v1.2.0/cointelegraph/getLatestNews.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/cointelegraph/getLatestNews.mjs",
        "internalImport": "./../../schemas/v1.2.0/cointelegraph/getLatestNews.mjs",
        "folderName": "cointelegraph",
        "hasImport": false,
        "namespace": "cointelegraph",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getLatestNews"
        ],
        "schemaFolder": "cointelegraph",
        "schemaName": "getLatestNews",
        "fileName": "getLatestNews.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/cointelegraph/getLatestNews.mjs' )
		    return { schema }
		}
    },
    {
        "id": "context7_getDocumentation",
        "relativePath": "schemas/v1.2.0/context-7/getDocumentation.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/context-7/getDocumentation.mjs",
        "internalImport": "./../../schemas/v1.2.0/context-7/getDocumentation.mjs",
        "folderName": "context-7",
        "hasImport": false,
        "namespace": "context7",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "searchLibraryId",
            "getLibraryDocs"
        ],
        "schemaFolder": "context-7",
        "schemaName": "getDocumentation",
        "fileName": "getDocumentation.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/context-7/getDocumentation.mjs' )
		    return { schema }
		}
    },
    {
        "id": "cryptopanic_getNews",
        "relativePath": "schemas/v1.2.0/cryptopanic/getNews.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/cryptopanic/getNews.mjs",
        "internalImport": "./../../schemas/v1.2.0/cryptopanic/getNews.mjs",
        "folderName": "cryptopanic",
        "hasImport": false,
        "namespace": "cryptopanic",
        "tags": [],
        "requiredServerParams": [
            "CRYPTOPANIC_API_KEY"
        ],
        "routeNames": [
            "getCryptoCryptopanicNews"
        ],
        "schemaFolder": "cryptopanic",
        "schemaName": "getNews",
        "fileName": "getNews.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/cryptopanic/getNews.mjs' )
		    return { schema }
		}
    },
    {
        "id": "cryptowizards_analytics",
        "relativePath": "schemas/v1.2.0/cryptowizards-net/analytics.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/cryptowizards-net/analytics.mjs",
        "internalImport": "./../../schemas/v1.2.0/cryptowizards-net/analytics.mjs",
        "folderName": "cryptowizards-net",
        "hasImport": false,
        "namespace": "cryptowizards",
        "tags": [
            "production",
            "analytics",
            "trading",
            "backtest"
        ],
        "requiredServerParams": [
            "CRYPTOWIZARDS_API_KEY"
        ],
        "routeNames": [
            "runBacktest",
            "checkCointegration",
            "getCorrelations",
            "analyzeCopula",
            "analyzeSpread",
            "analyzeZScores"
        ],
        "schemaFolder": "cryptowizards-net",
        "schemaName": "analytics",
        "fileName": "analytics.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/cryptowizards-net/analytics.mjs' )
		    return { schema }
		}
    },
    {
        "id": "defillama_api",
        "relativePath": "schemas/v1.2.0/defilama/api.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/defilama/api.mjs",
        "internalImport": "./../../schemas/v1.2.0/defilama/api.mjs",
        "folderName": "defilama",
        "hasImport": false,
        "namespace": "defillama",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getProtocols",
            "getProtocolTvl",
            "getChainTvl"
        ],
        "schemaFolder": "defilama",
        "schemaName": "api",
        "fileName": "api.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/defilama/api.mjs' )
		    return { schema }
		}
    },
    {
        "id": "defillama_coins",
        "relativePath": "schemas/v1.2.0/defilama/coins.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/defilama/coins.mjs",
        "internalImport": "./../../schemas/v1.2.0/defilama/coins.mjs",
        "folderName": "defilama",
        "hasImport": false,
        "namespace": "defillama",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getTokenPrices"
        ],
        "schemaFolder": "defilama",
        "schemaName": "coins",
        "fileName": "coins.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/defilama/coins.mjs' )
		    return { schema }
		}
    },
    {
        "id": "defillama_yields",
        "relativePath": "schemas/v1.2.0/defilama/yields.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/defilama/yields.mjs",
        "internalImport": "./../../schemas/v1.2.0/defilama/yields.mjs",
        "folderName": "defilama",
        "hasImport": false,
        "namespace": "defillama",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getPools",
            "getPoolTvl"
        ],
        "schemaFolder": "defilama",
        "schemaName": "yields",
        "fileName": "yields.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/defilama/yields.mjs' )
		    return { schema }
		}
    },
    {
        "id": "dexscreener_boosted",
        "relativePath": "schemas/v1.2.0/dexscreener-com/boosted.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dexscreener-com/boosted.mjs",
        "internalImport": "./../../schemas/v1.2.0/dexscreener-com/boosted.mjs",
        "folderName": "dexscreener-com",
        "hasImport": false,
        "namespace": "dexscreener",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getLatestBoostedTokens",
            "getMostActiveBoostedTokens"
        ],
        "schemaFolder": "dexscreener-com",
        "schemaName": "boosted",
        "fileName": "boosted.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dexscreener-com/boosted.mjs' )
		    return { schema }
		}
    },
    {
        "id": "dexscreener_pairs",
        "relativePath": "schemas/v1.2.0/dexscreener-com/pairs.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dexscreener-com/pairs.mjs",
        "internalImport": "./../../schemas/v1.2.0/dexscreener-com/pairs.mjs",
        "folderName": "dexscreener-com",
        "hasImport": false,
        "namespace": "dexscreener",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getPairByChainAndAddress",
            "checkTokenOrders"
        ],
        "schemaFolder": "dexscreener-com",
        "schemaName": "pairs",
        "fileName": "pairs.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dexscreener-com/pairs.mjs' )
		    return { schema }
		}
    },
    {
        "id": "dexscreener_tokenInfo",
        "relativePath": "schemas/v1.2.0/dexscreener-com/tokenInfo.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dexscreener-com/tokenInfo.mjs",
        "internalImport": "./../../schemas/v1.2.0/dexscreener-com/tokenInfo.mjs",
        "folderName": "dexscreener-com",
        "hasImport": false,
        "namespace": "dexscreener",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getLatestTokenProfiles",
            "searchPairs",
            "getPairsByToken",
            "getTokenPools"
        ],
        "schemaFolder": "dexscreener-com",
        "schemaName": "tokenInfo",
        "fileName": "tokenInfo.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dexscreener-com/tokenInfo.mjs' )
		    return { schema }
		}
    },
    {
        "id": "dexscreener_tokenpairs",
        "relativePath": "schemas/v1.2.0/dexscreener-com/tokenpairs.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dexscreener-com/tokenpairs.mjs",
        "internalImport": "./../../schemas/v1.2.0/dexscreener-com/tokenpairs.mjs",
        "folderName": "dexscreener-com",
        "hasImport": false,
        "namespace": "dexscreener",
        "tags": [
            "dex",
            "trading",
            "pairs"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getTokenPairs",
            "searchPairs",
            "getLatestPairs",
            "getPairsByChain",
            "getSpecificPair"
        ],
        "schemaFolder": "dexscreener-com",
        "schemaName": "tokenpairs",
        "fileName": "tokenpairs.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dexscreener-com/tokenpairs.mjs' )
		    return { schema }
		}
    },
    {
        "id": "duneAnalytics_farcaster",
        "relativePath": "schemas/v1.2.0/dune-analytics/farcaster.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dune-analytics/farcaster.mjs",
        "internalImport": "./../../schemas/v1.2.0/dune-analytics/farcaster.mjs",
        "folderName": "dune-analytics",
        "hasImport": false,
        "namespace": "duneAnalytics",
        "tags": [],
        "requiredServerParams": [
            "DUNE_API_KEY"
        ],
        "routeNames": [
            "farcasterGetTrendingMemecoins",
            "farcasterGetTrendingChannels",
            "farcasterGetTrendingUsers"
        ],
        "schemaFolder": "dune-analytics",
        "schemaName": "farcaster",
        "fileName": "farcaster.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dune-analytics/farcaster.mjs' )
		    return { schema }
		}
    },
    {
        "id": "duneAnalytics_getResults",
        "relativePath": "schemas/v1.2.0/dune-analytics/getResults.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dune-analytics/getResults.mjs",
        "internalImport": "./../../schemas/v1.2.0/dune-analytics/getResults.mjs",
        "folderName": "dune-analytics",
        "hasImport": false,
        "namespace": "duneAnalytics",
        "tags": [],
        "requiredServerParams": [
            "DUNE_API_KEY"
        ],
        "routeNames": [
            "getLatestResult"
        ],
        "schemaFolder": "dune-analytics",
        "schemaName": "getResults",
        "fileName": "getResults.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dune-analytics/getResults.mjs' )
		    return { schema }
		}
    },
    {
        "id": "duneAnalytics_trendingContracts",
        "relativePath": "schemas/v1.2.0/dune-analytics/trendingContracts.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/dune-analytics/trendingContracts.mjs",
        "internalImport": "./../../schemas/v1.2.0/dune-analytics/trendingContracts.mjs",
        "folderName": "dune-analytics",
        "hasImport": false,
        "namespace": "duneAnalytics",
        "tags": [],
        "requiredServerParams": [
            "DUNE_API_KEY"
        ],
        "routeNames": [
            "getDexPairStats",
            "getTrendingContracts",
            "getMarketShare"
        ],
        "schemaFolder": "dune-analytics",
        "schemaName": "trendingContracts",
        "fileName": "trendingContracts.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/dune-analytics/trendingContracts.mjs' )
		    return { schema }
		}
    },
    {
        "id": "epo_patent-search",
        "relativePath": "schemas/v1.2.0/epo-org/patent-search.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/epo-org/patent-search.mjs",
        "internalImport": "./../../schemas/v1.2.0/epo-org/patent-search.mjs",
        "folderName": "epo-org",
        "hasImport": false,
        "namespace": "epo",
        "tags": [
            "patents",
            "research",
            "search"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "searchPatents",
            "searchByTechnology",
            "searchByKeywords",
            "searchByDate"
        ],
        "schemaFolder": "epo-org",
        "schemaName": "patent-search",
        "fileName": "patent-search.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/epo-org/patent-search.mjs' )
		    return { schema }
		}
    },
    {
        "id": "profilejump_profileJump",
        "relativePath": "schemas/v1.2.0/erc725/profileJump.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/erc725/profileJump.mjs",
        "internalImport": "./../../schemas/v1.2.0/erc725/profileJump.mjs",
        "folderName": "erc725",
        "hasImport": false,
        "namespace": "profilejump",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "prices",
            "hotProfiles",
            "tokensList",
            "profilesList",
            "profileByAddress"
        ],
        "schemaFolder": "erc725",
        "schemaName": "profileJump",
        "fileName": "profileJump.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/erc725/profileJump.mjs' )
		    return { schema }
		}
    },
    {
        "id": "etherscan_getContractEthereum",
        "relativePath": "schemas/v1.2.0/etherscan/getContractEthereum.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/etherscan/getContractEthereum.mjs",
        "internalImport": "./../../schemas/v1.2.0/etherscan/getContractEthereum.mjs",
        "folderName": "etherscan",
        "hasImport": false,
        "namespace": "etherscan",
        "tags": [],
        "requiredServerParams": [
            "ETHERSCAN_API_KEY"
        ],
        "routeNames": [
            "getContractABI",
            "getContractSourceCode"
        ],
        "schemaFolder": "etherscan",
        "schemaName": "getContractEthereum",
        "fileName": "getContractEthereum.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/etherscan/getContractEthereum.mjs' )
		    return { schema }
		}
    },
    {
        "id": "etherscan_getContractMultichain",
        "relativePath": "schemas/v1.2.0/etherscan/getContractMultichain.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/etherscan/getContractMultichain.mjs",
        "internalImport": "./../../schemas/v1.2.0/etherscan/getContractMultichain.mjs",
        "folderName": "etherscan",
        "hasImport": false,
        "namespace": "etherscan",
        "tags": [],
        "requiredServerParams": [
            "ETHERSCAN_API_KEY"
        ],
        "routeNames": [
            "getAvailableChains",
            "getSmartContractAbi",
            "getSourceCode"
        ],
        "schemaFolder": "etherscan",
        "schemaName": "getContractMultichain",
        "fileName": "getContractMultichain.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/etherscan/getContractMultichain.mjs' )
		    return { schema }
		}
    },
    {
        "id": "etherscan_getGaspriceMultichain",
        "relativePath": "schemas/v1.2.0/etherscan/getGaspriceMultichain.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/etherscan/getGaspriceMultichain.mjs",
        "internalImport": "./../../schemas/v1.2.0/etherscan/getGaspriceMultichain.mjs",
        "folderName": "etherscan",
        "hasImport": false,
        "namespace": "etherscan",
        "tags": [],
        "requiredServerParams": [
            "ETHERSCAN_API_KEY"
        ],
        "routeNames": [
            "getGasOracle",
            "estimateGasCost"
        ],
        "schemaFolder": "etherscan",
        "schemaName": "getGaspriceMultichain",
        "fileName": "getGaspriceMultichain.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/etherscan/getGaspriceMultichain.mjs' )
		    return { schema }
		}
    },
    {
        "id": "ethscriptions_ethscriptions-api",
        "relativePath": "schemas/v1.2.0/ethscriptions-com/ethscriptions-api.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/ethscriptions-com/ethscriptions-api.mjs",
        "internalImport": "./../../schemas/v1.2.0/ethscriptions-com/ethscriptions-api.mjs",
        "folderName": "ethscriptions-com",
        "hasImport": false,
        "namespace": "ethscriptions",
        "tags": [
            "nft",
            "ethereum",
            "inscriptions"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "listEthscriptions",
            "getEthscription",
            "getEthscriptionData",
            "getEthscriptionAttachment",
            "checkEthscriptionExists",
            "checkMultipleEthscriptionsExistence",
            "listTransfers",
            "listTokens",
            "getTokenDetails",
            "getTokenHistoricalState",
            "getIndexerStatus"
        ],
        "schemaFolder": "ethscriptions-com",
        "schemaName": "ethscriptions-api",
        "fileName": "ethscriptions-api.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/ethscriptions-com/ethscriptions-api.mjs' )
		    return { schema }
		}
    },
    {
        "id": "goldskyNouns_goldsky-nouns",
        "relativePath": "schemas/v1.2.0/goldsky-nouns/goldsky-nouns.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/goldsky-nouns/goldsky-nouns.mjs",
        "internalImport": "./../../schemas/v1.2.0/goldsky-nouns/goldsky-nouns.mjs",
        "folderName": "goldsky-nouns",
        "hasImport": false,
        "namespace": "goldskyNouns",
        "tags": [
            "production",
            "dao",
            "governance",
            "nft"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getRecentProposals",
            "getCurrentAuctions",
            "getNounDetails",
            "getTopDelegates"
        ],
        "schemaFolder": "goldsky-nouns",
        "schemaName": "goldsky-nouns",
        "fileName": "goldsky-nouns.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/goldsky-nouns/goldsky-nouns.mjs' )
		    return { schema }
		}
    },
    {
        "id": "goldskyLilNouns_lil-nouns",
        "relativePath": "schemas/v1.2.0/goldsky-nouns/lil-nouns.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/goldsky-nouns/lil-nouns.mjs",
        "internalImport": "./../../schemas/v1.2.0/goldsky-nouns/lil-nouns.mjs",
        "folderName": "goldsky-nouns",
        "hasImport": false,
        "namespace": "goldskyLilNouns",
        "tags": [
            "production",
            "data",
            "api"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getProposals",
            "getProposalById"
        ],
        "schemaFolder": "goldsky-nouns",
        "schemaName": "lil-nouns",
        "fileName": "lil-nouns.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/goldsky-nouns/lil-nouns.mjs' )
		    return { schema }
		}
    },
    {
        "id": "goldskyNouns_nouns",
        "relativePath": "schemas/v1.2.0/goldsky-nouns/nouns.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/goldsky-nouns/nouns.mjs",
        "internalImport": "./../../schemas/v1.2.0/goldsky-nouns/nouns.mjs",
        "folderName": "goldsky-nouns",
        "hasImport": false,
        "namespace": "goldskyNouns",
        "tags": [
            "production",
            "dao",
            "governance",
            "nft"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getCandidateProposals",
            "getActivePendingUpdatableProposers",
            "getLatestAuctions"
        ],
        "schemaFolder": "goldsky-nouns",
        "schemaName": "nouns",
        "fileName": "nouns.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/goldsky-nouns/nouns.mjs' )
		    return { schema }
		}
    },
    {
        "id": "honeypot_honeypot",
        "relativePath": "schemas/v1.2.0/honeypot/honeypot.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/honeypot/honeypot.mjs",
        "internalImport": "./../../schemas/v1.2.0/honeypot/honeypot.mjs",
        "folderName": "honeypot",
        "hasImport": false,
        "namespace": "honeypot",
        "tags": [
            "production",
            "security",
            "token",
            "validation"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "check"
        ],
        "schemaFolder": "honeypot",
        "schemaName": "honeypot",
        "fileName": "honeypot.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/honeypot/honeypot.mjs' )
		    return { schema }
		}
    },
    {
        "id": "jupiter_jupiter-all",
        "relativePath": "schemas/v1.2.0/jupiter/jupiter-all.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/jupiter/jupiter-all.mjs",
        "internalImport": "./../../schemas/v1.2.0/jupiter/jupiter-all.mjs",
        "folderName": "jupiter",
        "hasImport": false,
        "namespace": "jupiter",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getTokenPrice",
            "getTokenInfo",
            "getTokensInMarket",
            "getAllTradableTokens",
            "getTaggedTokens",
            "getNewTokens",
            "getAllTokens"
        ],
        "schemaFolder": "jupiter",
        "schemaName": "jupiter-all",
        "fileName": "jupiter-all.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/jupiter/jupiter-all.mjs' )
		    return { schema }
		}
    },
    {
        "id": "llama_getPools",
        "relativePath": "schemas/v1.2.0/llama-fi/getPools.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/llama-fi/getPools.mjs",
        "internalImport": "./../../schemas/v1.2.0/llama-fi/getPools.mjs",
        "folderName": "llama-fi",
        "hasImport": false,
        "namespace": "llama",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getProjectsByName",
            "getPools"
        ],
        "schemaFolder": "llama-fi",
        "schemaName": "getPools",
        "fileName": "getPools.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/llama-fi/getPools.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_address",
        "relativePath": "schemas/v1.2.0/lukso-network/address.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/address.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/address.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "listAddresses",
            "getAddress",
            "getAddressCounters",
            "getAddressTransactions",
            "getAddressTokenTransfers",
            "getAddressInternalTxs",
            "getAddressLogs",
            "getBlocksValidated",
            "getTokenBalances",
            "getFlatTokenBalances",
            "getCoinBalanceHistory",
            "getCoinBalanceByDay"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "address",
        "fileName": "address.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/address.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_blocks",
        "relativePath": "schemas/v1.2.0/lukso-network/blocks.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/blocks.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/blocks.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getBlocks",
            "getBlockById",
            "getBlockTransactions",
            "getBlockWithdrawals"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "blocks",
        "fileName": "blocks.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/blocks.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_graphql",
        "relativePath": "schemas/v1.2.0/lukso-network/graphql.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/graphql.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/graphql.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getLuksoExplorerSchema",
            "fectchLuksoExplorer"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "graphql",
        "fileName": "graphql.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/graphql.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_internal",
        "relativePath": "schemas/v1.2.0/lukso-network/internal.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/internal.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/internal.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getMainPageTransactions",
            "getMainPageBlocks"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "internal",
        "fileName": "internal.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/internal.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_nfts",
        "relativePath": "schemas/v1.2.0/lukso-network/nfts.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/nfts.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/nfts.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getNFTsByAddress",
            "getNFTCollectionsByAddress",
            "getNFTInstancesByContract",
            "getNFTInstanceById",
            "getNFTInstanceTransfers",
            "getNFTInstanceHolders",
            "getNFTInstanceTransfersCount"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "nfts",
        "fileName": "nfts.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/nfts.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_search",
        "relativePath": "schemas/v1.2.0/lukso-network/search.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/search.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/search.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "search",
            "searchRedirect"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "search",
        "fileName": "search.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/search.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_sourceCode",
        "relativePath": "schemas/v1.2.0/lukso-network/sourceCode.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/sourceCode.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/sourceCode.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "listcontracts",
            "getabi",
            "getsourcecode",
            "getcontractcreation"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "sourceCode",
        "fileName": "sourceCode.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/sourceCode.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_stats",
        "relativePath": "schemas/v1.2.0/lukso-network/stats.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/stats.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/stats.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getStats",
            "getTransactionChart",
            "getMarketChart"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "stats",
        "fileName": "stats.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/stats.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_tokens",
        "relativePath": "schemas/v1.2.0/lukso-network/tokens.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/tokens.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/tokens.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "listTokens",
            "getTokenByAddress",
            "getTokenTransfersByAddress",
            "getTokenHolders",
            "getTokenCounters"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "tokens",
        "fileName": "tokens.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/tokens.mjs' )
		    return { schema }
		}
    },
    {
        "id": "luksoNetwork_transactions",
        "relativePath": "schemas/v1.2.0/lukso-network/transactions.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/lukso-network/transactions.mjs",
        "internalImport": "./../../schemas/v1.2.0/lukso-network/transactions.mjs",
        "folderName": "lukso-network",
        "hasImport": false,
        "namespace": "luksoNetwork",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getTransactions",
            "getTransactionByHash",
            "getTokenTransfersByTransactionHash",
            "getInternalTransactions",
            "getLogs",
            "getRawTrace",
            "getStateChanges"
        ],
        "schemaFolder": "lukso-network",
        "schemaName": "transactions",
        "fileName": "transactions.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/lukso-network/transactions.mjs' )
		    return { schema }
		}
    },
    {
        "id": "medium_rss-feeds",
        "relativePath": "schemas/v1.2.0/medium-com/rss-feeds.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/medium-com/rss-feeds.mjs",
        "internalImport": "./../../schemas/v1.2.0/medium-com/rss-feeds.mjs",
        "folderName": "medium-com",
        "hasImport": false,
        "namespace": "medium",
        "tags": [
            "content",
            "social",
            "feeds"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getTagFeed",
            "getUserFeed",
            "getPublicationFeed",
            "getTopicFeed"
        ],
        "schemaFolder": "medium-com",
        "schemaName": "rss-feeds",
        "fileName": "rss-feeds.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/medium-com/rss-feeds.mjs' )
		    return { schema }
		}
    },
    {
        "id": "memoryLol_twitterNameChanges",
        "relativePath": "schemas/v1.2.0/memory-lol/twitterNameChanges.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/memory-lol/twitterNameChanges.mjs",
        "internalImport": "./../../schemas/v1.2.0/memory-lol/twitterNameChanges.mjs",
        "folderName": "memory-lol",
        "hasImport": false,
        "namespace": "memoryLol",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "queryUsernameChanges"
        ],
        "schemaFolder": "memory-lol",
        "schemaName": "twitterNameChanges",
        "fileName": "twitterNameChanges.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/memory-lol/twitterNameChanges.mjs' )
		    return { schema }
		}
    },
    {
        "id": "minascanDevnet_mina-devnet",
        "relativePath": "schemas/v1.2.0/minascan-io/mina-devnet.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/minascan-io/mina-devnet.mjs",
        "internalImport": "./../../schemas/v1.2.0/minascan-io/mina-devnet.mjs",
        "folderName": "minascan-io",
        "hasImport": false,
        "namespace": "minascanDevnet",
        "tags": [
            "production",
            "blockchain",
            "explorer",
            "mina"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getMinaDevnetSchema",
            "getMinaDevnetQuery"
        ],
        "schemaFolder": "minascan-io",
        "schemaName": "mina-devnet",
        "fileName": "mina-devnet.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/minascan-io/mina-devnet.mjs' )
		    return { schema }
		}
    },
    {
        "id": "minascanMainnet_mina-mainnet",
        "relativePath": "schemas/v1.2.0/minascan-io/mina-mainnet.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/minascan-io/mina-mainnet.mjs",
        "internalImport": "./../../schemas/v1.2.0/minascan-io/mina-mainnet.mjs",
        "folderName": "minascan-io",
        "hasImport": false,
        "namespace": "minascanMainnet",
        "tags": [
            "production",
            "blockchain",
            "explorer",
            "mina"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getMinaMainnetSchema",
            "getMinaMainnetQuery"
        ],
        "schemaFolder": "minascan-io",
        "schemaName": "mina-mainnet",
        "fileName": "mina-mainnet.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/minascan-io/mina-mainnet.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_blockchainApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/blockchainApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/blockchainApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/blockchainApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/block/:block_number_or_hash",
            "/dateToBlock",
            "/transaction/:transaction_hash/verbose",
            "/:address/verbose",
            "/latestBlockNumber/:chain",
            "/transaction/:transaction_hash",
            "/:address"
        ],
        "schemaFolder": "eth",
        "schemaName": "blockchainApi",
        "fileName": "blockchainApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/blockchainApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_defiApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/defiApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/defiApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/defiApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/wallets/:address/defi/:protocol/positions",
            "/wallets/:address/defi/positions",
            "/wallets/:address/defi/summary"
        ],
        "schemaFolder": "eth",
        "schemaName": "defiApi",
        "fileName": "defiApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/defiApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_entity",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/entity.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/entity.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/entity.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/entities/categories"
        ],
        "schemaFolder": "eth",
        "schemaName": "entity",
        "fileName": "entity.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/entity.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_nftApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/nftApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/nftApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/nftApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/market-data/nfts/top-collections",
            "/market-data/nfts/hottest-collections",
            "/nft/:address",
            "/nft/:address/stats",
            "/nft/:address/metadata",
            "/nft/:address/transfers",
            "/nft/:address/:token_id",
            "/nft/:address/owners",
            "/nft/:address/:token_id/owners",
            "/nft/:address/:token_id/trades",
            "/wallets/:address/nfts/trades",
            "/nft/:address/trades",
            "/nft/:address/traits/paginate",
            "/nft/:address/traits",
            "/nft/:address/:token_id/transfers",
            "/:address/nft/collections",
            "/:address/nft/transfers",
            "/:address/nft",
            "/nft/:address/:token_id/metadata/resync",
            "/nft/:address/traits/resync"
        ],
        "schemaFolder": "eth",
        "schemaName": "nftApi",
        "fileName": "nftApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/nftApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_priceApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/priceApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/priceApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/priceApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/nft/:address/price",
            "/nft/:address/floor-price",
            "/nft/:address/:token_id/floor-price",
            "/nft/:address/floor-price/historical",
            "/nft/:address/:token_id/price",
            "/pairs/:address/ohlcv",
            "/erc20/:address/price"
        ],
        "schemaFolder": "eth",
        "schemaName": "priceApi",
        "fileName": "priceApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/priceApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_tokenApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/tokenApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/tokenApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/tokenApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/:pair_address/reserves",
            "/pairs/:address/snipers",
            "/pairs/:address/swaps",
            "/wallets/:address/swaps",
            "/tokens/:address/analytics",
            "/erc20/:token_address/owners",
            "/erc20/metadata/symbols",
            "/erc20/metadata",
            "/erc20/:address/stats",
            "/erc20/:address/transfers",
            "/market-data/erc20s/top-tokens",
            "/erc20/:address/top-gainers",
            "/wallets/:address/approvals",
            "/wallets/:address/tokens",
            "/:address/erc20",
            "/:address/erc20/transfers"
        ],
        "schemaFolder": "eth",
        "schemaName": "tokenApi",
        "fileName": "tokenApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/tokenApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_utils",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/utils.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/utils.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/utils.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/info/endpointWeights",
            "/web3/version"
        ],
        "schemaFolder": "eth",
        "schemaName": "utils",
        "fileName": "utils.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/utils.mjs' )
		    return { schema }
		}
    },
    {
        "id": "moralis_walletApi",
        "relativePath": "schemas/v1.2.0/moralis-com/eth/walletApi.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/moralis-com/eth/walletApi.mjs",
        "internalImport": "./../../schemas/v1.2.0/moralis-com/eth/walletApi.mjs",
        "folderName": "eth",
        "hasImport": false,
        "namespace": "moralis",
        "tags": [],
        "requiredServerParams": [
            "MORALIS_API_KEY"
        ],
        "routeNames": [
            "/wallets/:address/chains",
            "/:address/balance",
            "/wallets/:address/history",
            "/wallets/:address/net-worth",
            "/wallets/:address/profitability/summary",
            "/wallets/:address/profitability",
            "/wallets/:address/stats",
            "/resolve/:address/domain",
            "/resolve/:address/reverse",
            "/resolve/:domain",
            "/resolve/ens/:domain"
        ],
        "schemaFolder": "eth",
        "schemaName": "walletApi",
        "fileName": "walletApi.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/moralis-com/eth/walletApi.mjs' )
		    return { schema }
		}
    },
    {
        "id": "newsapi_news",
        "relativePath": "schemas/v1.2.0/newsapi-org/news.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/newsapi-org/news.mjs",
        "internalImport": "./../../schemas/v1.2.0/newsapi-org/news.mjs",
        "folderName": "newsapi-org",
        "hasImport": false,
        "namespace": "newsapi",
        "tags": [
            "news",
            "media",
            "content"
        ],
        "requiredServerParams": [
            "NEWSAPI_API_KEY"
        ],
        "routeNames": [
            "getTopHeadlines",
            "getEverything",
            "getSources"
        ],
        "schemaFolder": "newsapi-org",
        "schemaName": "news",
        "fileName": "news.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/newsapi-org/news.mjs' )
		    return { schema }
		}
    },
    {
        "id": "newsdata_getNews",
        "relativePath": "schemas/v1.2.0/newsdata-io/getNews.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/newsdata-io/getNews.mjs",
        "internalImport": "./../../schemas/v1.2.0/newsdata-io/getNews.mjs",
        "folderName": "newsdata-io",
        "hasImport": false,
        "namespace": "newsdata",
        "tags": [],
        "requiredServerParams": [
            "NEWSDATA_API_KEY"
        ],
        "routeNames": [
            "getLatestNewsdata",
            "getCryptoNewsdata"
        ],
        "schemaFolder": "newsdata-io",
        "schemaName": "getNews",
        "fileName": "getNews.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/newsdata-io/getNews.mjs' )
		    return { schema }
		}
    },
    {
        "id": "pinata_read",
        "relativePath": "schemas/v1.2.0/pinata/read.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/pinata/read.mjs",
        "internalImport": "./../../schemas/v1.2.0/pinata/read.mjs",
        "folderName": "pinata",
        "hasImport": false,
        "namespace": "pinata",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "free_read_example",
            "free_read_cid"
        ],
        "schemaFolder": "pinata",
        "schemaName": "read",
        "fileName": "read.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/pinata/read.mjs' )
		    return { schema }
		}
    },
    {
        "id": "poap_graphql",
        "relativePath": "schemas/v1.2.0/poap/graphql.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/poap/graphql.mjs",
        "internalImport": "./../../schemas/v1.2.0/poap/graphql.mjs",
        "folderName": "poap",
        "hasImport": false,
        "namespace": "poap",
        "tags": [
            "production",
            "graphql",
            "poap"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getTypename",
            "getSchemaDefinition",
            "getPredefinedQueryList",
            "executePrefinedQuery",
            "querySubgraph"
        ],
        "schemaFolder": "poap",
        "schemaName": "graphql",
        "fileName": "graphql.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/poap/graphql.mjs' )
		    return { schema }
		}
    },
    {
        "id": "polymarket_marketInfo",
        "relativePath": "schemas/v1.2.0/polymarket/marketInfo.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/polymarket/marketInfo.mjs",
        "internalImport": "./../../schemas/v1.2.0/polymarket/marketInfo.mjs",
        "folderName": "polymarket",
        "hasImport": false,
        "namespace": "polymarket",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getMarkets",
            "getMarketInfo"
        ],
        "schemaFolder": "polymarket",
        "schemaName": "marketInfo",
        "fileName": "marketInfo.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/polymarket/marketInfo.mjs' )
		    return { schema }
		}
    },
    {
        "id": "polymarket_searchBySlug",
        "relativePath": "schemas/v1.2.0/polymarket/searchBySlug.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/polymarket/searchBySlug.mjs",
        "internalImport": "./../../schemas/v1.2.0/polymarket/searchBySlug.mjs",
        "folderName": "polymarket",
        "hasImport": false,
        "namespace": "polymarket",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "searchBySlug"
        ],
        "schemaFolder": "polymarket",
        "schemaName": "searchBySlug",
        "fileName": "searchBySlug.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/polymarket/searchBySlug.mjs' )
		    return { schema }
		}
    },
    {
        "id": "redditScanner_getTokenMentions",
        "relativePath": "schemas/v1.2.0/reddit/getTokenMentions.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/reddit/getTokenMentions.mjs",
        "internalImport": "./../../schemas/v1.2.0/reddit/getTokenMentions.mjs",
        "folderName": "reddit",
        "hasImport": false,
        "namespace": "redditScanner",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "getTokenMentions",
            "getHotMemes"
        ],
        "schemaFolder": "reddit",
        "schemaName": "getTokenMentions",
        "fileName": "getTokenMentions.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/reddit/getTokenMentions.mjs' )
		    return { schema }
		}
    },
    {
        "id": "santiment_schema",
        "relativePath": "schemas/v1.2.0/santiment-net/schema.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/santiment-net/schema.mjs",
        "internalImport": "./../../schemas/v1.2.0/santiment-net/schema.mjs",
        "folderName": "santiment-net",
        "hasImport": false,
        "namespace": "santiment",
        "tags": [],
        "requiredServerParams": [
            "SANTIMENT_API_KEY"
        ],
        "routeNames": [
            "get_sentiment_balance",
            "get_social_volume",
            "alert_social_shift",
            "get_trending_words",
            "get_social_dominance"
        ],
        "schemaFolder": "santiment-net",
        "schemaName": "schema",
        "fileName": "schema.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/santiment-net/schema.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_balancesEVM",
        "relativePath": "schemas/v1.2.0/simdune/balancesEVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/balancesEVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/balancesEVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "balances",
            "analytics",
            "portfolio"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getBalancesEVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "balancesEVM",
        "fileName": "balancesEVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/balancesEVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_balancesSVM",
        "relativePath": "schemas/v1.2.0/simdune/balancesSVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/balancesSVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/balancesSVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "balances",
            "analytics",
            "portfolio",
            "svm",
            "solana"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getBalancesSVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "balancesSVM",
        "fileName": "balancesSVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/balancesSVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_collectiblesEVM",
        "relativePath": "schemas/v1.2.0/simdune/collectiblesEVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/collectiblesEVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/collectiblesEVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "nft",
            "collectibles",
            "metadata"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getCollectiblesEVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "collectiblesEVM",
        "fileName": "collectiblesEVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/collectiblesEVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_tokenHoldersEVM",
        "relativePath": "schemas/v1.2.0/simdune/tokenHoldersEVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/tokenHoldersEVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/tokenHoldersEVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "token",
            "analytics",
            "holders"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getTokenHoldersEVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "tokenHoldersEVM",
        "fileName": "tokenHoldersEVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/tokenHoldersEVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_tokenInfoEVM",
        "relativePath": "schemas/v1.2.0/simdune/tokenInfoEVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/tokenInfoEVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/tokenInfoEVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "token",
            "analytics",
            "metadata"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getTokenInfoEVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "tokenInfoEVM",
        "fileName": "tokenInfoEVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/tokenInfoEVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_transactionsEVM",
        "relativePath": "schemas/v1.2.0/simdune/transactionsEVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/transactionsEVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/transactionsEVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "transactions",
            "analytics",
            "history"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getTransactionsEVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "transactionsEVM",
        "fileName": "transactionsEVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/transactionsEVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "simdune_transactionsSVM",
        "relativePath": "schemas/v1.2.0/simdune/transactionsSVM.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/simdune/transactionsSVM.mjs",
        "internalImport": "./../../schemas/v1.2.0/simdune/transactionsSVM.mjs",
        "folderName": "simdune",
        "hasImport": false,
        "namespace": "simdune",
        "tags": [
            "production",
            "transactions",
            "analytics",
            "history",
            "svm",
            "solana"
        ],
        "requiredServerParams": [
            "DUNE_SIM_API_KEY"
        ],
        "routeNames": [
            "getTransactionsSVM"
        ],
        "schemaFolder": "simdune",
        "schemaName": "transactionsSVM",
        "fileName": "transactionsSVM.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/simdune/transactionsSVM.mjs' )
		    return { schema }
		}
    },
    {
        "id": "snapshot_snapshot",
        "relativePath": "schemas/v1.2.0/snapshot/snapshot.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/snapshot/snapshot.mjs",
        "internalImport": "./../../schemas/v1.2.0/snapshot/snapshot.mjs",
        "folderName": "snapshot",
        "hasImport": false,
        "namespace": "snapshot",
        "tags": [
            "dao",
            "governance",
            "voting"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "listSpaces",
            "listProposals",
            "getProposalDetails"
        ],
        "schemaFolder": "snapshot",
        "schemaName": "snapshot",
        "fileName": "snapshot.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/snapshot/snapshot.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--additionalRoutes",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--additionalRoutes.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--additionalRoutes.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--additionalRoutes.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "tokenStats",
            "tokenStatsByPool"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--additionalRoutes",
        "fileName": "--additionalRoutes.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--additionalRoutes.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--chartRoutes",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--chartRoutes.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--chartRoutes.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--chartRoutes.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "chartData",
            "chartDataByPool"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--chartRoutes",
        "fileName": "--chartRoutes.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--chartRoutes.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--pnlRoutes",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--pnlRoutes.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--pnlRoutes.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--pnlRoutes.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "profitAndLossData",
            "pnlForSpecificToken",
            "firstBuyers"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--pnlRoutes",
        "fileName": "--pnlRoutes.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--pnlRoutes.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--priceEndpoints",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--priceEndpoints.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--priceEndpoints.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--priceEndpoints.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "priceInformation",
            "postPrice",
            "multiPriceInformation",
            "getHistoricPrice",
            "getPriceAtTimestamp",
            "getPriceRange",
            "postMultiPrice"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--priceEndpoints",
        "fileName": "--priceEndpoints.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--priceEndpoints.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--tokenEndpoints",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--tokenEndpoints.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--tokenEndpoints.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--tokenEndpoints.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "tokenInformation",
            "tokenHolders",
            "topTokenHolders",
            "allTimeHighPrice",
            "tokensByDeployer",
            "search",
            "latestTokens",
            "multipleTokens",
            "trendingTokens",
            "tokensByVolume",
            "tokenOverview",
            "graduatedTokens",
            "tokenByPool",
            "trendingTokensByTimeframe",
            "tokensByVolumeTimeframe"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--tokenEndpoints",
        "fileName": "--tokenEndpoints.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--tokenEndpoints.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--topTraderRoutes",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--topTraderRoutes.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--topTraderRoutes.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--topTraderRoutes.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "topTradersAll",
            "topTradersAllPaged",
            "topTradersByToken"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--topTraderRoutes",
        "fileName": "--topTraderRoutes.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--topTraderRoutes.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--tradeEndpoints",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--tradeEndpoints.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--tradeEndpoints.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--tradeEndpoints.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "tokenTrades",
            "tradesByWallet",
            "tokenPoolTrades",
            "userPoolTrades"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--tradeEndpoints",
        "fileName": "--tradeEndpoints.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--tradeEndpoints.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solanatracker_--walletEndpoints",
        "relativePath": "schemas/v1.2.0/solanatracker-io/--walletEndpoints.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solanatracker-io/--walletEndpoints.mjs",
        "internalImport": "./../../schemas/v1.2.0/solanatracker-io/--walletEndpoints.mjs",
        "folderName": "solanatracker-io",
        "hasImport": false,
        "namespace": "solanatracker",
        "tags": [],
        "requiredServerParams": [
            "SOLANA_TRACKER_API_KEY"
        ],
        "routeNames": [
            "walletInformation",
            "walletTokensBasic",
            "walletTokensPaged",
            "walletTrades"
        ],
        "schemaFolder": "solanatracker-io",
        "schemaName": "--walletEndpoints",
        "fileName": "--walletEndpoints.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solanatracker-io/--walletEndpoints.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solscan_getChainInfo",
        "relativePath": "schemas/v1.2.0/solscan-io/getChainInfo.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solscan-io/getChainInfo.mjs",
        "internalImport": "./../../schemas/v1.2.0/solscan-io/getChainInfo.mjs",
        "folderName": "solscan-io",
        "hasImport": false,
        "namespace": "solscan",
        "tags": [],
        "requiredServerParams": [
            "SOLSCAN_API_KEY"
        ],
        "routeNames": [
            "chainInfo"
        ],
        "schemaFolder": "solscan-io",
        "schemaName": "getChainInfo",
        "fileName": "getChainInfo.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solscan-io/getChainInfo.mjs' )
		    return { schema }
		}
    },
    {
        "id": "solsniffer_analysis",
        "relativePath": "schemas/v1.2.0/solsniffer-com/analysis.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/solsniffer-com/analysis.mjs",
        "internalImport": "./../../schemas/v1.2.0/solsniffer-com/analysis.mjs",
        "folderName": "solsniffer-com",
        "hasImport": false,
        "namespace": "solsniffer",
        "tags": [],
        "requiredServerParams": [
            "SOLSNIFFER_API_KEY"
        ],
        "routeNames": [
            "analysisToken"
        ],
        "schemaFolder": "solsniffer-com",
        "schemaName": "analysis",
        "fileName": "analysis.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/solsniffer-com/analysis.mjs' )
		    return { schema }
		}
    },
    {
        "id": "spaceid_spaceid",
        "relativePath": "schemas/v1.2.0/spaceid/spaceid.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/spaceid/spaceid.mjs",
        "internalImport": "./../../schemas/v1.2.0/spaceid/spaceid.mjs",
        "folderName": "spaceid",
        "hasImport": false,
        "namespace": "spaceid",
        "tags": [
            "production",
            "domain",
            "identity",
            "blockchain"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getSupportedChains",
            "getAddress",
            "getName"
        ],
        "schemaFolder": "spaceid",
        "schemaName": "spaceid",
        "fileName": "spaceid.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/spaceid/spaceid.mjs' )
		    return { schema }
		}
    },
    {
        "id": "stolpersteineBerl_memorial-stones",
        "relativePath": "schemas/v1.2.0/stolpersteine-berlin/memorial-stones.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/stolpersteine-berlin/memorial-stones.mjs",
        "internalImport": "./../../schemas/v1.2.0/stolpersteine-berlin/memorial-stones.mjs",
        "folderName": "stolpersteine-berlin",
        "hasImport": false,
        "namespace": "stolpersteineBerl",
        "tags": [
            "memorial",
            "history",
            "berlin"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getAllStones",
            "searchStones",
            "getStonesByDistrict",
            "getStonesByPerson",
            "getStonesByLocation"
        ],
        "schemaFolder": "stolpersteine-berlin",
        "schemaName": "memorial-stones",
        "fileName": "memorial-stones.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/stolpersteine-berlin/memorial-stones.mjs' )
		    return { schema }
		}
    },
    {
        "id": "swaggerhub_api-registry",
        "relativePath": "schemas/v1.2.0/swaggerhub-com/api-registry.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/swaggerhub-com/api-registry.mjs",
        "internalImport": "./../../schemas/v1.2.0/swaggerhub-com/api-registry.mjs",
        "folderName": "swaggerhub-com",
        "hasImport": false,
        "namespace": "swaggerhub",
        "tags": [
            "production",
            "api",
            "documentation",
            "registry"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "searchApis",
            "listApiVersions"
        ],
        "schemaFolder": "swaggerhub-com",
        "schemaName": "api-registry",
        "fileName": "api-registry.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/swaggerhub-com/api-registry.mjs' )
		    return { schema }
		}
    },
    {
        "id": "thegraph_getNewUniswapPools",
        "relativePath": "schemas/v1.2.0/thegraph/getNewUniswapPools.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/thegraph/getNewUniswapPools.mjs",
        "internalImport": "./../../schemas/v1.2.0/thegraph/getNewUniswapPools.mjs",
        "folderName": "thegraph",
        "hasImport": false,
        "namespace": "thegraph",
        "tags": [],
        "requiredServerParams": [
            "THEGRAPH_API_KEY"
        ],
        "routeNames": [
            "getNewPools"
        ],
        "schemaFolder": "thegraph",
        "schemaName": "getNewUniswapPools",
        "fileName": "getNewUniswapPools.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/thegraph/getNewUniswapPools.mjs' )
		    return { schema }
		}
    },
    {
        "id": "thegraph_getSchema",
        "relativePath": "schemas/v1.2.0/thegraph/getSchema.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/thegraph/getSchema.mjs",
        "internalImport": "./../../schemas/v1.2.0/thegraph/getSchema.mjs",
        "folderName": "thegraph",
        "hasImport": false,
        "namespace": "thegraph",
        "tags": [],
        "requiredServerParams": [
            "THEGRAPH_API_KEY"
        ],
        "routeNames": [
            "getSubgraphSchema",
            "querySubgraph"
        ],
        "schemaFolder": "thegraph",
        "schemaName": "getSchema",
        "fileName": "getSchema.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/thegraph/getSchema.mjs' )
		    return { schema }
		}
    },
    {
        "id": "twitter_search",
        "relativePath": "schemas/v1.2.0/twitter/search.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/twitter/search.mjs",
        "internalImport": "./../../schemas/v1.2.0/twitter/search.mjs",
        "folderName": "twitter",
        "hasImport": false,
        "namespace": "twitter",
        "tags": [],
        "requiredServerParams": [
            "TWITTER_BEARER_TOKEN"
        ],
        "routeNames": [
            "searchRecentTweets"
        ],
        "schemaFolder": "twitter",
        "schemaName": "search",
        "fileName": "search.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/twitter/search.mjs' )
		    return { schema }
		}
    },
    {
        "id": "uniswap_uniswap-pool-explorer",
        "relativePath": "schemas/v1.2.0/uniswap-pools/uniswap-pool-explorer.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/uniswap-pools/uniswap-pool-explorer.mjs",
        "internalImport": "./../../schemas/v1.2.0/uniswap-pools/uniswap-pool-explorer.mjs",
        "folderName": "uniswap-pools",
        "hasImport": false,
        "namespace": "uniswap",
        "tags": [
            "production"
        ],
        "requiredServerParams": [
            "THEGRAPH_API_KEY"
        ],
        "routeNames": [
            "getTokenPools",
            "getPoolData"
        ],
        "schemaFolder": "uniswap-pools",
        "schemaName": "uniswap-pool-explorer",
        "fileName": "uniswap-pool-explorer.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/uniswap-pools/uniswap-pool-explorer.mjs' )
		    return { schema }
		}
    },
    {
        "id": "webcareer_job-listings",
        "relativePath": "schemas/v1.2.0/web3-career/job-listings.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/web3-career/job-listings.mjs",
        "internalImport": "./../../schemas/v1.2.0/web3-career/job-listings.mjs",
        "folderName": "web3-career",
        "hasImport": false,
        "namespace": "webcareer",
        "tags": [
            "production",
            "jobs",
            "career",
            "crypto"
        ],
        "requiredServerParams": [
            "WEB3_CAREER_API_TOKEN"
        ],
        "routeNames": [
            "queryJobs"
        ],
        "schemaFolder": "web3-career",
        "schemaName": "job-listings",
        "fileName": "job-listings.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/web3-career/job-listings.mjs' )
		    return { schema }
		}
    },
    {
        "id": "wormholescan_wormholescan",
        "relativePath": "schemas/v1.2.0/wormholescan/wormholescan.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/wormholescan/wormholescan.mjs",
        "internalImport": "./../../schemas/v1.2.0/wormholescan/wormholescan.mjs",
        "folderName": "wormholescan",
        "hasImport": false,
        "namespace": "wormholescan",
        "tags": [
            "data",
            "api"
        ],
        "requiredServerParams": [],
        "routeNames": [
            "getCrossChainActivity",
            "getMoneyFlow",
            "getTopAssetsByVolume",
            "getTopChainPairsByNumTransfers",
            "getTopSymbolsByVolume",
            "getTopCorridors",
            "getKpiList"
        ],
        "schemaFolder": "wormholescan",
        "schemaName": "wormholescan",
        "fileName": "wormholescan.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/wormholescan/wormholescan.mjs' )
		    return { schema }
		}
    },
    {
        "id": "x402_ping",
        "relativePath": "schemas/v1.2.0/x402/ping.mjs",
        "modulImportPath": "schemaimporter/schemas/v1.2.0/x402/ping.mjs",
        "internalImport": "./../../schemas/v1.2.0/x402/ping.mjs",
        "folderName": "x402",
        "hasImport": false,
        "namespace": "x402",
        "tags": [],
        "requiredServerParams": [],
        "routeNames": [
            "free_ping",
            "paid_ping"
        ],
        "schemaFolder": "x402",
        "schemaName": "ping",
        "fileName": "ping.mjs",
        "loadSchema": async() => {
		    const { schema } = await import( './../../schemas/v1.2.0/x402/ping.mjs' )
		    return { schema }
		}
    }
]


export { allSchemas }
