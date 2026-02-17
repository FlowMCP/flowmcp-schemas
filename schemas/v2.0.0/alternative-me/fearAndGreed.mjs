// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'alternative',
    name: 'FearGreedIndex',
    description: 'Fetch and analyze the Crypto Fear and Greed Index from alternative.me — current reading, historical data with configurable lookback, and trend analysis.',
    version: '2.0.0',
    docs: ['https://alternative.me/crypto/api/'],
    tags: ['crypto', 'sentiment', 'index', 'cacheTtlFrequent'],
    root: 'https://api.alternative.me/fng',
    routes: {
        getCurrentFng: {
            method: 'GET',
            path: '/',
            description: 'Retrieve the latest Fear & Greed Index via alternative.me. Returns structured JSON response data.',
            parameters: []
        },
        getHistoricalFng: {
            method: 'GET',
            path: '/',
            description: 'Get historical Fear & Greed Index values for past days via alternative.me. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(7)'] } }
            ]
        },
        analyzeFngTrend: {
            method: 'GET',
            path: '/',
            description: 'Analyze the trend of the Fear & Greed Index over a number of days. Required: days.',
            parameters: [
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(7)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getCurrentFng: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.fng = payload?.content?.[0]?.text || "";
            return { response }
        }
    },
    getHistoricalFng: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.history = payload?.content?.[0]?.text || "";
            return { response }
        }
    },
    analyzeFngTrend: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.analysis = payload?.content?.[0]?.text || "";
            return { response }
        }
    }
} )
