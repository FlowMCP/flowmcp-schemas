// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'newsdata',
    name: 'CryptoNews',
    description: 'Fetches general or topic-specific cryptocurrency news articles from NewsData.io.',
    version: '2.0.0',
    docs: ['https://newsdata.io/documentation/'],
    tags: ['news', 'media', 'global', 'cacheTtlFrequent'],
    root: 'https://newsdata.io/api/1',
    requiredServerParams: ['NEWSDATA_API_KEY'],
    headers: {},
    routes: {
        getLatestNewsdata: {
            method: 'GET',
            path: '/crypto',
            description: 'Fetch the latest general crypto news from NewsData.io. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'apikey', value: '{{NEWSDATA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get latest general crypto news' }
            ],
        },
        getCryptoNewsdata: {
            method: 'GET',
            path: '/latest',
            description: 'Fetch topic-specific crypto news for a given query. Required: q.',
            parameters: [
                { position: { key: 'apikey', value: '{{NEWSDATA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(business)'] } }
            ],
            tests: [
                { _description: 'Fetch Bitcoin news', q: 'bitcoin', category: 'business' }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getLatestNewsdata: {
        postRequest: async ( { response, struct, payload } ) => {
            const __routeName = 'getLatestNewsdata'
            struct.news = payload?.content?.[0]?.text || "No data."
            return { response }
        }
    },
    getCryptoNewsdata: {
        postRequest: async ( { response, struct, payload } ) => {
            const __routeName = 'getCryptoNewsdata'
            struct.news = payload?.content?.[0]?.text || "No data."
            return { response }
        }
    }
} )
