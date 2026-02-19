const schema = {
    namespace: 'synth',
    name: 'Synth Prediction API',
    description: 'Probabilistic crypto price predictions via Monte Carlo simulation on Bittensor Subnet 50. Provides prediction percentiles, volatility forecasts, option pricing, liquidation probabilities, and LP range optimization for BTC, ETH, SOL, XAU, and tokenized equities.',
    docs: ['https://docs.synthdata.co', 'https://mode-network.github.io/synth-subnet/'],
    tags: ['crypto', 'prediction', 'montecarlo', 'bittensor', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api.synthdata.co',
    requiredServerParams: ['SYNTH_API_KEY'],
    headers: {
        'Authorization': 'Apikey {{SYNTH_API_KEY}}'
    },
    routes: {
        getPredictionPercentiles: {
            requestMethod: 'GET',
            description: 'Get probabilistic price prediction percentiles (p5, p25, p50, p75, p95) aggregated from top Bittensor miners for a given asset.',
            route: '/prediction-percentiles',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC prediction percentiles with defaults', asset: 'BTC' },
                { _description: 'Get ETH prediction percentiles over 7 days', asset: 'ETH', days: 7 }
            ],
            modifiers: []
        },
        getBestPrediction: {
            requestMethod: 'GET',
            description: 'Get the best Monte Carlo prediction paths from top-ranked miners for a given asset. Returns simulated price paths with configurable time resolution.',
            route: '/v2/prediction/best',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'time_increment', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(300,60)', options: [] } },
                { position: { key: 'time_length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(86400,3600)', options: [] } }
            ],
            tests: [
                { _description: 'Get best BTC prediction 24h forward at 5min intervals', asset: 'BTC', time_increment: 300, time_length: 86400 },
                { _description: 'Get best ETH prediction 1h forward at 1min intervals', asset: 'ETH', time_increment: 60, time_length: 3600 }
            ],
            modifiers: []
        },
        getLatestPrediction: {
            requestMethod: 'GET',
            description: 'Get the latest Monte Carlo prediction paths from specific miners by UID. Returns simulated price paths for a given asset.',
            route: '/v2/prediction/latest',
            parameters: [
                { position: { key: 'miner', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'time_increment', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(300,60)', options: [] } },
                { position: { key: 'time_length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(86400,3600)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get latest BTC prediction from miner 1 at 5min intervals', miner: '1', asset: 'BTC', time_increment: 300, time_length: 86400 }
            ],
            modifiers: []
        },
        getVolatility: {
            requestMethod: 'GET',
            description: 'Get forward-looking and realized volatility metrics for an asset. Includes forecast future, forecast past, and realized volatility data.',
            route: '/insights/volatility',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC volatility metrics with defaults', asset: 'BTC' },
                { _description: 'Get SOL volatility over 30 days', asset: 'SOL', days: 30 }
            ],
            modifiers: []
        },
        getOptionPricing: {
            requestMethod: 'GET',
            description: 'Get theoretical call and put option prices derived from Monte Carlo simulated price paths for a given asset.',
            route: '/insights/option-pricing',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC option pricing with defaults', asset: 'BTC' },
                { _description: 'Get ETH option pricing over 7 days', asset: 'ETH', days: 7 }
            ],
            modifiers: []
        },
        getLiquidation: {
            requestMethod: 'GET',
            description: 'Calculate liquidation probabilities for leveraged positions based on Monte Carlo price simulations. Returns current price and probability of hitting liquidation levels.',
            route: '/insights/liquidation',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC liquidation probabilities', asset: 'BTC' },
                { _description: 'Get ETH liquidation probabilities over 30 days', asset: 'ETH', days: 30 }
            ],
            modifiers: []
        },
        getLpBounds: {
            requestMethod: 'GET',
            description: 'Get optimized liquidity provider price range bounds for Uniswap V3 style positions based on Monte Carlo simulated price distribution.',
            route: '/insights/lp-bounds',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC LP bounds with defaults', asset: 'BTC' },
                { _description: 'Get ETH LP bounds over 7 days', asset: 'ETH', days: 7 }
            ],
            modifiers: []
        },
        getLpProbabilities: {
            requestMethod: 'GET',
            description: 'Get probability of asset price staying above or below given thresholds. Useful for LP range risk assessment.',
            route: '/insights/lp-probabilities',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(14)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get BTC LP probabilities with defaults', asset: 'BTC' },
                { _description: 'Get SOL LP probabilities over 14 days', asset: 'SOL', days: 14 }
            ],
            modifiers: []
        },
        getLatestLeaderboard: {
            requestMethod: 'GET',
            description: 'Get the latest miner leaderboard ranking for Synth Bittensor subnet. Shows top miners by prediction accuracy (CRPS score).',
            route: '/v2/leaderboard/latest',
            parameters: [
                { position: { key: 'prompt_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(high,low)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get latest leaderboard with default prompt' },
                { _description: 'Get latest leaderboard for high prompt', prompt_name: 'high' }
            ],
            modifiers: []
        },
        getLatestValidationScores: {
            requestMethod: 'GET',
            description: 'Get the latest validation scores for all miners. Shows how well each miner prediction matched actual price movements.',
            route: '/validation/scores/latest',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH,SOL,XAU,SPYX,NVDAX,TSLAX,AAPLX,GOOGLX)', options: ['optional()', 'default(BTC)'] } },
                { position: { key: 'time_increment', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(300,60)', options: ['optional()', 'default(300)'] } },
                { position: { key: 'time_length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(86400,3600)', options: ['optional()', 'default(86400)'] } }
            ],
            tests: [
                { _description: 'Get latest BTC validation scores with defaults' },
                { _description: 'Get ETH validation scores at 1min intervals', asset: 'ETH', time_increment: 60, time_length: 3600 }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
