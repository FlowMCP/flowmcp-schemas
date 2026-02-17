// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'newsdata',
    name: 'CryptoNews',
    description: 'Fetches general or topic-specific cryptocurrency news articles from NewsData.io.',
    version: '2.0.0',
    docs: ['https://newsdata.io/documentation/'],
    tags: ['news', 'media', 'global', 'cacheTtlFrequent'],
    root: 'https://newsdata.io/api/1/crypto',
    requiredServerParams: ['NEWSDATA_API_KEY'],
    headers: {
        apikey: '{{NEWSDATA_API_KEY}}'
    },
    routes: {
        getLatestNewsdata: {
            method: 'GET',
            path: '/',
            description: 'Fetch the latest general crypto news from NewsData.io. Returns structured JSON response data.',
            parameters: []
        },
        getCryptoNewsdata: {
            method: 'GET',
            path: '/',
            description: 'Fetch topic-specific crypto news for a given query and max number of pages. Required: query, max_pages.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'max_pages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(5)', 'default(1)'] } }
            ]
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
