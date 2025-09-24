const schema = {
    namespace: "coingecko",
    name: "CoinGecko Stablecoins API",
    description: "Access and analyze stablecoin data including market metrics, peg stability and historical trends via CoinGecko API",
    docs: ["https://docs.coingecko.com/reference/simple-price", "https://docs.coingecko.com/reference/coins-id-market-chart"],
    tags: ["price", "market", "stablecoins"],
    flowMCP: "1.2.0",
    root: "https://api.coingecko.com/api/v3",
    requiredServerParams: [],
    headers: {},
    routes: {
        getSupportedStablecoins: {
            requestMethod: "GET",
            description: "Get list of all stablecoins from CoinGecko with market data.",
            route: "/coins/markets",
            parameters: [
                { position: { key: "vs_currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(usd)"] } },
                { position: { key: "category", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(stablecoins)"] } },
                { position: { key: "order", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(market_cap_desc)"] } },
                { position: { key: "per_page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(250)", "default(50)"] } }
            ],
            tests: [
                { _description: "Get top 50 stablecoins by market cap", vs_currency: "usd", category: "stablecoins", order: "market_cap_desc", per_page: 50 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStablecoinData" }
            ]
        },
        getCurrentPrice: {
            requestMethod: "GET",
            description: "Fetches current prices for major stablecoins with peg stability analysis.",
            route: "/simple/price",
            parameters: [
                { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(tether,usd-coin,dai,ethena-usde,first-digital-usd,paypal-usd,true-usd)"] } },
                { position: { key: "vs_currencies", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(usd)"] } },
                { position: { key: "include_24hr_change", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)"] } }
            ],
            tests: [
                { _description: "Get current prices for major stablecoins", ids: "tether,usd-coin,dai", vs_currencies: "usd", include_24hr_change: true }
            ],
            modifiers: [
                { phase: "post", handlerName: "analyzePegStability" }
            ]
        },
        getHistoricalData: {
            requestMethod: "GET",
            description: "Fetch historical market chart data for a specific stablecoin.",
            route: "/coins/:id/market_chart",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(tether,usd-coin,dai,ethena-usde,first-digital-usd,paypal-usd,true-usd,frax,gemini-dollar,paxos-standard)", options: [] } },
                { position: { key: "vs_currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(usd)"] } },
                { position: { key: "days", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(90)", "default(7)"] } }
            ],
            tests: [
                { _description: "Get 7-day historical data for USDT", id: "tether", vs_currency: "usd", days: 7 },
                { _description: "Get 30-day historical data for USDC", id: "usd-coin", vs_currency: "usd", days: 30 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatHistoricalData" }
            ]
        },
        analyzePegStability: {
            requestMethod: "GET",
            description: "Analyze peg stability for multiple stablecoins by comparing current prices to $1.00.",
            route: "/simple/price",
            parameters: [
                { position: { key: "ids", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(tether,usd-coin,dai,ethena-usde,first-digital-usd)"] } },
                { position: { key: "vs_currencies", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(usd)"] } },
                { position: { key: "include_24hr_change", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)"] } }
            ],
            tests: [
                { _description: "Analyze peg stability for top 5 stablecoins", ids: "tether,usd-coin,dai,ethena-usde,first-digital-usd", vs_currencies: "usd", include_24hr_change: true }
            ],
            modifiers: [
                { phase: "post", handlerName: "calculatePegDeviations" }
            ]
        }
    },
    handlers: {
        formatStablecoinData: async ({ struct, payload }) => {
            if (!struct.data || !Array.isArray(struct.data)) {
                return { struct, payload };
            }
            
            // Format stablecoin market data into readable format
            const stablecoins = struct.data.map(coin => ({
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                market_cap_rank: coin.market_cap_rank,
                price_change_24h: coin.price_change_percentage_24h,
                peg_deviation: Math.abs(coin.current_price - 1.0) * 100
            }));
            
            struct.data = {
                total_stablecoins: stablecoins.length,
                stablecoins: stablecoins
            };
            
            return { struct, payload };
        },
        
        analyzePegStability: async ({ struct, payload }) => {
            if (!struct.data) {
                return { struct, payload };
            }
            
            const analysis = Object.entries(struct.data).map(([coinId, data]) => {
                const price = data.usd;
                const change24h = data.usd_24h_change || 0;
                const deviation = Math.abs(price - 1.0) * 100;
                
                let stability_status;
                if (deviation < 0.1) stability_status = "Excellent";
                else if (deviation < 0.5) stability_status = "Good";
                else if (deviation < 1.0) stability_status = "Moderate";
                else stability_status = "Poor";
                
                return {
                    coin_id: coinId,
                    current_price: price,
                    peg_deviation_percent: deviation.toFixed(3),
                    change_24h_percent: change24h.toFixed(3),
                    stability_status: stability_status
                };
            });
            
            struct.data = {
                analysis_timestamp: new Date().toISOString(),
                stablecoin_analysis: analysis
            };
            
            return { struct, payload };
        },
        
        formatHistoricalData: async ({ struct, payload }) => {
            if (!struct.data || !struct.data.prices) {
                return { struct, payload };
            }
            
            const prices = struct.data.prices;
            const volumes = struct.data.total_volumes || [];
            
            // Calculate price statistics
            const priceValues = prices.map(p => p[1]);
            const avgPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
            const maxPrice = Math.max(...priceValues);
            const minPrice = Math.min(...priceValues);
            const maxDeviation = Math.max(
                Math.abs(maxPrice - 1.0),
                Math.abs(minPrice - 1.0)
            ) * 100;
            
            struct.data = {
                period_summary: {
                    average_price: avgPrice.toFixed(6),
                    max_price: maxPrice.toFixed(6),
                    min_price: minPrice.toFixed(6),
                    max_peg_deviation_percent: maxDeviation.toFixed(3),
                    total_data_points: prices.length
                },
                price_data: prices.slice(0, 50), // Limit to first 50 points for readability
                volume_data: volumes.slice(0, 50)
            };
            
            return { struct, payload };
        },
        
        calculatePegDeviations: async ({ struct, payload }) => {
            if (!struct.data) {
                return { struct, payload };
            }
            
            const deviations = Object.entries(struct.data).map(([coinId, data]) => {
                const price = data.usd;
                const change24h = data.usd_24h_change || 0;
                const deviation = Math.abs(price - 1.0) * 100;
                
                return {
                    coin_id: coinId,
                    current_price: price,
                    deviation_from_peg: deviation.toFixed(4),
                    change_24h: change24h.toFixed(4),
                    risk_level: deviation < 0.1 ? "Low" : deviation < 0.5 ? "Medium" : "High"
                };
            }).sort((a, b) => parseFloat(b.deviation_from_peg) - parseFloat(a.deviation_from_peg));
            
            struct.data = {
                analysis_timestamp: new Date().toISOString(),
                most_stable: deviations[deviations.length - 1],
                least_stable: deviations[0],
                all_deviations: deviations
            };
            
            return { struct, payload };
        }
    }
};

export { schema };