const schema = {
    namespace: "cryptodata",
    name: "Get Coins",
    description: "Retrieve comprehensive data about all cryptocurrencies including prices, market cap, volume, price changes, supply info, trading metrics, and metadata.",
    docs: ["https://your.api.documentation/coins"],
    tags: ["production", "price", "market", "data"],
    flowMCP: "1.2.0",
    root: "https://openapiv1.coinstats.app",
    requiredServerParams: [
        "COINSTATS_API_KEY"
    ],
    headers: {
        'X-API-KEY': "{{COINSTATS_API_KEY}}",
        'accept': 'application/json'
    },
    routes: {
        getCoins: {
            requestMethod: "GET",
            description: "Get comprehensive data about all cryptocurrencies: Price, market cap, and volume. Price changes (1h, 24h, 7d). Supply information. Trading metrics. Social links and metadata.",
            route: "/coins",
            parameters: [
                { position: { key: "name", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()", "default('USD')"] } },
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "blockchains", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "includeRiskScore", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "categories", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sortBy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sortDir", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(['asc','desc'])", options: ["optional()"] } },

                // Numeric filters
                ...[
                    "marketCap", "fullyDilutedValuation", "volume",
                    "priceChange1h", "priceChange1d", "priceChange7d",
                    "availableSupply", "totalSupply", "rank",
                    "price", "riskScore"
                ].flatMap(field => [
                    { position: { key: `${field}-greaterThan`, value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                    { position: { key: `${field}-equals`, value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } },
                    { position: { key: `${field}-lessThan`, value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
                ])
            ],
            tests: [
                { _description: "Get top 20 coins in USD" },
                { _description: "Search coins by name", name: "bitcoin" },
                { _description: "Get memecoins with high market cap", categories: "memecoins", "marketCap-greaterThan": 1000000000 },
                { _description: "Filter coins with price < $1", "price-lessThan": 1, currency: "USD" },
                { _description: "Sort by rank ascending", sortBy: "rank", sortDir: "asc" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getCoinById: {
            requestMethod: "GET",
            description: "Get detailed information about a specific cryptocurrency based on its unique identifier.",
            route: "/coins/:coinId",
            parameters: [
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get Bitcoin details in USD", coinId: "bitcoin", currency: "USD" },
                { _description: "Get Ethereum details with default currency", coinId: "ethereum" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getCoinChartById: {
            requestMethod: "GET",
            description: "Get chart data for a specific cryptocurrency based on its unique identifier, specifying different time ranges.",
            route: "/coins/:coinId/charts",
            parameters: [
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
                { position: { key: "period", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(['all','24h','1w','1m','3m','6m','1y'])", options: [] } }
            ],
            tests: [
                { _description: "Get Bitcoin chart for 1 month", coinId: "bitcoin", period: "1m" },
                { _description: "Get Ethereum chart for 24 hours", coinId: "ethereum", period: "24h" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getCoinAvgPrice: {
            requestMethod: "GET",
            description: "Get the historical average price for a specific cryptocurrency based on its unique identifier and a specific date.",
            route: "/coins/price/avg",
            parameters: [
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "timestamp", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: [] } }
            ],
            tests: [
                { _description: "Get average price of Bitcoin at a specific timestamp", coinId: "bitcoin", timestamp: 1636315200 },
                { _description: "Get average price of Ethereum at a specific timestamp", coinId: "ethereum", timestamp: 1636315200 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getCoinExchangePrice: {
            requestMethod: "GET",
            description: "Get the historical price data for a specific cryptocurrency on a particular exchange.",
            route: "/coins/price/exchange",
            parameters: [
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "timestamp", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: [] } }
            ],
            tests: [
                { _description: "BTC to ETH price on Binance at timestamp", exchange: "Binance", from: "BTC", to: "ETH", timestamp: 1636315200 },
                { _description: "ETH to EUR price on Kraken at timestamp", exchange: "Kraken", from: "BTC", to: "USD", timestamp: 1636315200 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getTickerExchanges: {
            requestMethod: "GET",
            description: "Get a list of supported exchanges.",
            route: "/tickers/exchanges",
            parameters: [],
            tests: [
                { _description: "Retrieve all supported exchanges" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getTickerMarkets: {
            requestMethod: "GET",
            description: "Get a list of tickers for a specific cryptocurrency across different exchanges.",
            route: "/tickers/markets",
            parameters: [
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "exchange", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "fromCoin", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "toCoin", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "onlyVerified", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get first page of verified tickers for Bitcoin", coinId: "bitcoin", onlyVerified: true },
                { _description: "List tickers for ETH to USD on Binance", fromCoin: "ETH", toCoin: "USD", exchange: "binance" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getBlockchains: {
            requestMethod: "GET",
            description: "Get a list of supported blockchains by CoinStats.",
            route: "/wallet/blockchains",
            parameters: [],
            tests: [
                { _description: "Retrieve supported blockchains list" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getWalletBalance: {
            requestMethod: "GET",
            description: "Get the balance data for a provided wallet address on a specific blockchain network.",
            route: "/wallet/balance",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "connectionId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get balance for Ethereum address using a known connectionId", address: "0x123456789abcdef123456789abcdef1234567890", connectionId: "ethereum" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getWalletBalances: {
            requestMethod: "GET",
            description: "Get the balance data for a provided wallet address on all CoinStats supported networks.",
            route: "/wallet/balances",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "networks", value: "all", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all network balances for wallet", address: "0x123456789abcdef123456789abcdef1234567890" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
/*
        getWalletSyncStatus: {
            requestMethod: "GET",
            description: "Get the syncing status of the wallet with the blockchain network.",
            route: "/wallet/status",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "connectionId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Check sync status of a wallet on Ethereum", address: "0x123456789abcdef123456789abcdef1234567890", connectionId: "ethereum" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        getWalletTransactions: {
            requestMethod: "GET",
            description: "Get transaction data for a specific wallet. Ensure transactions are synced by calling PATCH /transactions first.",
            route: "/wallet/transactions",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "connectionId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()", "default('USD')"] } },
                { position: { key: "types", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "txId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get first page of Ethereum wallet transactions", address: "0x123456789abcdef123456789abcdef1234567890", connectionId: "ethereum" },
                { _description: "Get deposit transactions with pagination", address: "0x123456789abcdef123456789abcdef1234567890", connectionId: "ethereum", types: "deposit", page: 2, limit: 10 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        transactionsSync: {
            requestMethod: "PATCH",
            description: "Initiate the syncing process to update transaction data for a specific wallet.",
            route: "/wallet/transactions",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } },
                { position: { key: "connectionId", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Initiate sync for Ethereum wallet", address: "0x123456789abcdef123456789abcdef1234567890", connectionId: "ethereum" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
        getExchanges: {
            requestMethod: "GET",
            description: "Get a list of supported exchange portfolio connections by CoinStats.",
            route: "/exchange/support",
            parameters: [],
            tests: [
                { _description: "Retrieve supported exchanges" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
/*
        getExchangeBalance: {
            requestMethod: "POST",
            description: "Get the balance data for a provided Exchange.",
            route: "/exchange/balance",
            parameters: [
                { position: { key: "connectionFields", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "object()", options: [] } },
                { position: { key: "connectionId", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Retrieve balance with API credentials", connectionId: "binance-main", connectionFields: { key: "abc123", secret: "xyz789" } }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        getExchangeSyncStatus: {
            requestMethod: "GET",
            description: "Get the syncing status of the exchange portfolio.",
            route: "/exchange/status",
            parameters: [
                { position: { key: "portfolioId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Check sync status of Binance portfolio", portfolioId: "binance-portfolio-001" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        getExchangeTransactions: {
            requestMethod: "GET",
            description: "Get transaction data for a specific exchange.",
            route: "/exchange/transactions",
            parameters: [
                { position: { key: "portfolioId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()", "default('USD')"] } },
                { position: { key: "types", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get exchange transactions for portfolio ID", portfolioId: "binance-portfolio-001" },
                { _description: "Get deposit transactions in EUR from Jan 1 to Feb 1", portfolioId: "binance-portfolio-001", types: "deposit", currency: "EUR", from: "2024-01-01", to: "2024-02-01" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
        getFiatCurrencies: {
            requestMethod: "GET",
            description: "Get a list of fiat currencies supported by CoinStats.",
            route: "/fiats",
            parameters: [],
            tests: [
                { _description: "Retrieve list of supported fiat currencies" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getNewsSources: {
            requestMethod: "GET",
            description: "Get news sources.",
            route: "/news/sources",
            parameters: [],
            tests: [
                { _description: "Retrieve list of news sources" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getNews: {
            requestMethod: "GET",
            description: "Get news articles with pagination.",
            route: "/news",
            parameters: [
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get first page of news articles" },
                { _description: "Get news between Jan 1 and Feb 1", from: "2024-01-01", to: "2024-02-01" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getNewsByType: {
            requestMethod: "GET",
            description: "Get news articles based on a type.",
            route: "/news/type/:type",
            parameters: [
                { position: { key: "type", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(['handpicked','trending','latest','bullish','bearish'])", options: [] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } }
            ],
            tests: [
                { _description: "Get latest news articles", type: "latest" },
                { _description: "Get trending news, page 2", type: "trending", page: 2 }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getNewsById: {
            requestMethod: "GET",
            description: "Get news by id.",
            route: "/news/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get news article by ID", id: "ddbfd0792cfa149044c448eb9c681af4599f15156085980c3d85afe950fc6d8d" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
        getMarketCap: {
            requestMethod: "GET",
            description: "Get global market data.",
            route: "/markets",
            parameters: [],
            tests: [
                { _description: "Get global market cap and related data" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
/*
        getPortfolioCoins: {
            requestMethod: "GET",
            description: "Get a list of portfolio coins with P/L and other data displayed on CoinStats web.",
            route: "/portfolio/coins",
            parameters: [
                { position: { key: "shareToken", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "includeRiskScore", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get portfolio coins with default pagination" },
                { _description: "Get shared portfolio with risk score", shareToken: "abc123", includeRiskScore: "true" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        getPortfolioChart: {
            requestMethod: "GET",
            description: "Get portfolio performance chart data.",
            route: "/portfolio/chart",
            parameters: [
                { position: { key: "shareToken", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get 1-month chart for shared portfolio", shareToken: "abc123", type: "1m" },
                { _description: "Get all-time chart for default portfolio", type: "all" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        getPortfolioTransactions: {
            requestMethod: "GET",
            description: "Get a list of portfolio transactions.",
            route: "/portfolio/transactions",
            parameters: [
                { position: { key: "shareToken", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(1)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()", "default(20)"] } },
                { position: { key: "currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get portfolio transactions in USD", currency: "USD" },
                { _description: "Get BTC transactions from shared portfolio", shareToken: "abc123", currency: "USD", coinId: "bitcoin" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
/*
        addPortfolioTransaction: {
            requestMethod: "POST",
            description: "Add a transaction to a manual portfolio.",
            route: "/portfolio/transaction",
            parameters: [
                { position: { key: "shareToken", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "coinId", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } },
                { position: { key: "type", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } },
                { position: { key: "date", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } },
                { position: { key: "amount", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: [] } },
                { position: { key: "price", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: [] } },
                { position: { key: "fee", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["optional()"] } },
                { position: { key: "notes", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                {
                    _description: "Add BTC buy transaction to manual portfolio",
                    coinId: "bitcoin",
                    type: "buy",
                    date: "2024-01-01T00:00:00Z",
                    amount: 0.5,
                    price: 30000,
                    fee: 10,
                    notes: "Bought during dip"
                }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        },
*/
        getCurrencies: {
            requestMethod: "GET",
            description: "Get a list of fiat currencies supported by CoinStats.",
            route: "/currencies",
            parameters: [],
            tests: [
                { _description: "Retrieve list of supported currencies" }
            ],
            modifiers: [
                { phase: 'pre', handlerName: 'preparePayload' },
                { phase: 'post', handlerName: 'modifyResult' }
            ]
        }
    },
    handlers: {
        preparePayload: ( { struct, payload } ) => {
            payload['headers']['X-API-KEY'] = payload['headers']['X-API-KEY'] + '='


            return { struct, payload }
        },
        modifyResult: ( { struct, payload } ) => {
            // console.log( struct )

            return { struct, payload }
        }
    }
}


export { schema }