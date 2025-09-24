const allSchemas = [
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
