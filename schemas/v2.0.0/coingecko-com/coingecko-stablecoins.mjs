// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coingecko',
    name: 'CoinGecko Stablecoins API',
    description: 'Access and analyze stablecoin data including market metrics, peg stability and historical trends via CoinGecko API',
    version: '2.0.0',
    docs: ['https://docs.coingecko.com/reference/simple-price', 'https://docs.coingecko.com/reference/coins-id-market-chart'],
    tags: ['price', 'market', 'stablecoins', 'cacheTtlDaily'],
    root: 'https://api.coingecko.com/api/v3',
    routes: {
        getSupportedStablecoins: {
            method: 'GET',
            path: '/coins/markets',
            description: 'Get list of all stablecoins from CoinGecko with market data. Required: vs_currency, category, order, per_page.',
            parameters: [
                { position: { key: 'vs_currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(usd)'] } },
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(stablecoins)'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(market_cap_desc)'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(250)', 'default(50)'] } }
            ]
        },
        getCurrentPrice: {
            method: 'GET',
            path: '/simple/price',
            description: 'Fetches current prices for major stablecoins with peg stability analysis. Required: ids, vs_currencies, include_24hr_change.',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(tether,usd-coin,dai,ethena-usde,first-digital-usd,paypal-usd,true-usd)'] } },
                { position: { key: 'vs_currencies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(usd)'] } },
                { position: { key: 'include_24hr_change', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(true)'] } }
            ]
        },
        getHistoricalData: {
            method: 'GET',
            path: '/coins/:id/market_chart',
            description: 'Fetch historical market chart data for a specific stablecoin. Required: id, vs_currency, days.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(tether,usd-coin,dai,ethena-usde,first-digital-usd,paypal-usd,true-usd,frax,gemini-dollar,paxos-standard)', options: [] } },
                { position: { key: 'vs_currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(usd)'] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(90)', 'default(7)'] } }
            ]
        },
        analyzePegStability: {
            method: 'GET',
            path: '/simple/price',
            description: 'Analyze peg stability for multiple stablecoins by comparing current prices to $1.00.',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(tether,usd-coin,dai,ethena-usde,first-digital-usd)'] } },
                { position: { key: 'vs_currencies', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(usd)'] } },
                { position: { key: 'include_24hr_change', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(true)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getSupportedStablecoins: {
        postRequest: async ( { response, struct, payload } ) => {
            if (!response || !Array.isArray(response)) {
            return { response }
            }

            // Format stablecoin market data into readable format
            const stablecoins = response.map(coin => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
            price_change_24h: coin.price_change_percentage_24h,
            peg_deviation: Math.abs(coin.current_price - 1.0) * 100
            }));

            response = {
            total_stablecoins: stablecoins.length,
            stablecoins: stablecoins
            };

            return { response }
        }
    },
    getCurrentPrice: {
        postRequest: async ( { response, struct, payload } ) => {
            if (!response) {
            return { response }
            }

            const analysis = Object.entries(response).map(([coinId, data]) => {
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

            response = {
            analysis_timestamp: new Date().toISOString(),
            stablecoin_analysis: analysis
            };

            return { response }
        }
    },
    getHistoricalData: {
        postRequest: async ( { response, struct, payload } ) => {
            if (!response || !response.prices) {
            return { response }
            }

            const prices = response.prices;
            const volumes = response.total_volumes || [];

            // Calculate price statistics
            const priceValues = prices.map(p => p[1]);
            const avgPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
            const maxPrice = Math.max(...priceValues);
            const minPrice = Math.min(...priceValues);
            const maxDeviation = Math.max(
            Math.abs(maxPrice - 1.0),
            Math.abs(minPrice - 1.0)
            ) * 100;

            response = {
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

            return { response }
        }
    },
    analyzePegStability: {
        postRequest: async ( { response, struct, payload } ) => {
            if (!response) {
            return { response }
            }

            const deviations = Object.entries(response).map(([coinId, data]) => {
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

            response = {
            analysis_timestamp: new Date().toISOString(),
            most_stable: deviations[deviations.length - 1],
            least_stable: deviations[0],
            all_deviations: deviations
            };

            return { response }
        }
    }
} )
