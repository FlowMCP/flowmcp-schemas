// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'santiment',
    name: 'SantimentAnalytics',
    description: 'Provides sentiment and social metrics for crypto assets using the Santiment API.',
    version: '2.0.0',
    docs: ['https://academy.santiment.net/for-developers/'],
    tags: ['crypto', 'analytics', 'sentiment', 'cacheTtlFrequent'],
    root: 'https://api.santiment.net',
    requiredServerParams: ['SANTIMENT_API_KEY'],
    headers: {
        Authorization: 'Apikey {{SANTIMENT_API_KEY}}'
    },
    routes: {
        get_sentiment_balance: {
            method: 'POST',
            path: '/graphql',
            description: 'Get average sentiment balance for a crypto asset over a specified number of days.',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(90)', 'default(7)'] } }
            ],
            tests: [
                { _description: 'Sentiment for Bitcoin 7 days', asset: 'bitcoin', days: 7 }
            ],
        },
        get_social_volume: {
            method: 'POST',
            path: '/graphql',
            description: 'Get total social media volume for a crypto asset via Santiment. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(90)', 'default(7)'] } }
            ],
            tests: [
                { _description: 'Bitcoin 30-day social volume', asset: 'bitcoin', days: 30 }
            ],
        },
        alert_social_shift: {
            method: 'POST',
            path: '/graphql',
            description: 'Detect significant changes in social media volume for a crypto asset. Required: asset, threshold, days.',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'threshold', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['default(50)'] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(2)', 'max(30)', 'default(7)'] } }
            ],
            tests: [
                { _description: 'Alert for Bitcoin, 50% threshold, 7 days', asset: 'bitcoin', threshold: 50, days: 7 }
            ],
        },
        get_trending_words: {
            method: 'POST',
            path: '/graphql',
            description: 'Retrieve top trending words in crypto discussions via Santiment. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(30)', 'default(7)'] } },
                { position: { key: 'top_n', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(20)', 'default(5)'] } }
            ],
            tests: [
                { _description: 'Top 5 trending words over 7 days', days: 7, top_n: 5 }
            ],
        },
        get_social_dominance: {
            method: 'POST',
            path: '/graphql',
            description: 'Get average social dominance for a crypto asset via Santiment. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(30)', 'default(7)'] } }
            ],
            tests: [
                { _description: 'Social dominance for Bitcoin', asset: 'bitcoin', days: 7 }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    get_sentiment_balance: {
        preRequest: async ( { struct, payload } ) => {
            const __routeName = 'get_sentiment_balance'
            const to = new Date();
            const from = new Date(to.getTime() - (payload.days || 7) * 86400000);
            let query = "";
            const asset = payload.asset;

            const metrics = {
            get_sentiment_balance: "sentiment_balance_total",
            get_social_volume: "social_volume_total",
            alert_social_shift: "social_volume_total",
            get_social_dominance: "social_dominance_total"
            };

            if (__routeName === "get_trending_words") {
            query = `
            {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
            datetime
            topWords {
            word
            score
            }
            }
            }
            `;
            } else if (metrics[__routeName]) {
            query = `
            {
            getMetric(metric: "${metrics[__routeName]}") {
            timeseriesData(
            slug: "${asset}",
            from: "${from.toISOString()}",
            to: "${to.toISOString()}",
            interval: "1d"
            ) {
            datetime
            value
            }
            }
            }
            `;
            }

            struct['body'] = { query };

            return { struct }
        }
    },
    get_social_volume: {
        preRequest: async ( { struct, payload } ) => {
            const __routeName = 'get_social_volume'
            const to = new Date();
            const from = new Date(to.getTime() - (payload.days || 7) * 86400000);
            let query = "";
            const asset = payload.asset;

            const metrics = {
            get_sentiment_balance: "sentiment_balance_total",
            get_social_volume: "social_volume_total",
            alert_social_shift: "social_volume_total",
            get_social_dominance: "social_dominance_total"
            };

            if (__routeName === "get_trending_words") {
            query = `
            {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
            datetime
            topWords {
            word
            score
            }
            }
            }
            `;
            } else if (metrics[__routeName]) {
            query = `
            {
            getMetric(metric: "${metrics[__routeName]}") {
            timeseriesData(
            slug: "${asset}",
            from: "${from.toISOString()}",
            to: "${to.toISOString()}",
            interval: "1d"
            ) {
            datetime
            value
            }
            }
            }
            `;
            }

            struct['body'] = { query };

            return { struct }
        }
    },
    alert_social_shift: {
        preRequest: async ( { struct, payload } ) => {
            const __routeName = 'alert_social_shift'
            const to = new Date();
            const from = new Date(to.getTime() - (payload.days || 7) * 86400000);
            let query = "";
            const asset = payload.asset;

            const metrics = {
            get_sentiment_balance: "sentiment_balance_total",
            get_social_volume: "social_volume_total",
            alert_social_shift: "social_volume_total",
            get_social_dominance: "social_dominance_total"
            };

            if (__routeName === "get_trending_words") {
            query = `
            {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
            datetime
            topWords {
            word
            score
            }
            }
            }
            `;
            } else if (metrics[__routeName]) {
            query = `
            {
            getMetric(metric: "${metrics[__routeName]}") {
            timeseriesData(
            slug: "${asset}",
            from: "${from.toISOString()}",
            to: "${to.toISOString()}",
            interval: "1d"
            ) {
            datetime
            value
            }
            }
            }
            `;
            }

            struct['body'] = { query };

            return { struct }
        }
    },
    get_trending_words: {
        preRequest: async ( { struct, payload } ) => {
            const __routeName = 'get_trending_words'
            const to = new Date();
            const from = new Date(to.getTime() - (payload.days || 7) * 86400000);
            let query = "";
            const asset = payload.asset;

            const metrics = {
            get_sentiment_balance: "sentiment_balance_total",
            get_social_volume: "social_volume_total",
            alert_social_shift: "social_volume_total",
            get_social_dominance: "social_dominance_total"
            };

            if (__routeName === "get_trending_words") {
            query = `
            {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
            datetime
            topWords {
            word
            score
            }
            }
            }
            `;
            } else if (metrics[__routeName]) {
            query = `
            {
            getMetric(metric: "${metrics[__routeName]}") {
            timeseriesData(
            slug: "${asset}",
            from: "${from.toISOString()}",
            to: "${to.toISOString()}",
            interval: "1d"
            ) {
            datetime
            value
            }
            }
            }
            `;
            }

            struct['body'] = { query };

            return { struct }
        }
    },
    get_social_dominance: {
        preRequest: async ( { struct, payload } ) => {
            const __routeName = 'get_social_dominance'
            const to = new Date();
            const from = new Date(to.getTime() - (payload.days || 7) * 86400000);
            let query = "";
            const asset = payload.asset;

            const metrics = {
            get_sentiment_balance: "sentiment_balance_total",
            get_social_volume: "social_volume_total",
            alert_social_shift: "social_volume_total",
            get_social_dominance: "social_dominance_total"
            };

            if (__routeName === "get_trending_words") {
            query = `
            {
            getTrendingWords(size: 10, from: "${from.toISOString()}", to: "${to.toISOString()}", interval: "1d") {
            datetime
            topWords {
            word
            score
            }
            }
            }
            `;
            } else if (metrics[__routeName]) {
            query = `
            {
            getMetric(metric: "${metrics[__routeName]}") {
            timeseriesData(
            slug: "${asset}",
            from: "${from.toISOString()}",
            to: "${to.toISOString()}",
            interval: "1d"
            ) {
            datetime
            value
            }
            }
            }
            `;
            }

            struct['body'] = { query };

            return { struct }
        }
    }
} )
