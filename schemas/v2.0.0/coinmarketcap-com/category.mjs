// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'coinmarketcap',
    name: 'CoinMarketCap Categories',
    description: 'Retrieve cryptocurrency category data from CoinMarketCap — list categories, get category details, map coin IDs, fetch metadata, and query latest market quotes.',
    version: '2.0.0',
    docs: ['https://coinmarketcap.com/api/documentation/v1/'],
    tags: ['crypto', 'categories', 'marketdata', 'cacheTtlDaily'],
    root: 'https://pro-api.coinmarketcap.com',
    requiredServerParams: ['CMC_API_KEY'],
    headers: {
        'X-CMC_PRO_API_KEY': '{{CMC_API_KEY}}'
    },
    routes: {
        getCategories: {
            method: 'GET',
            path: '/v1/cryptocurrency/categories',
            description: 'Get a list of all cryptocurrency categories via CoinMarketCap. Supports start, limit, id filters.',
            parameters: [
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(5000)', 'optional()'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getCategory: {
            method: 'GET',
            path: '/v1/cryptocurrency/category',
            description: 'Get information about a single cryptocurrency category via CoinMarketCap. Supports start, limit, convert filters.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(1000)', 'optional()'] } },
                { position: { key: 'convert', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'convert_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getIdMap: {
            method: 'GET',
            path: '/v1/cryptocurrency/map',
            description: 'Get a mapping of all cryptocurrencies to unique CoinMarketCap IDs. Optional filters: listing_status, start, limit, sort, symbol, aux.',
            parameters: [
                { position: { key: 'listing_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(active,inactive,untracked)', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(5000)', 'optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(id,cmc_rank)', options: ['optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'aux', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getMetadataV2: {
            method: 'GET',
            path: '/v2/cryptocurrency/info',
            description: 'Get static metadata for one or more cryptocurrencies including logo, description, website URLs, and social links.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'skip_invalid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'aux', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getQuotesLatestV2: {
            method: 'GET',
            path: '/v2/cryptocurrency/quotes/latest',
            description: 'Get the latest market quote for one or more cryptocurrencies, supporting multiple conversions.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'convert', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'convert_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'aux', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'skip_invalid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getCategories: {
        preRequest: async ( { struct, payload } ) => {
            // Modify the response structure or struct if needed
            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            // Modify the response structure or payload if needed
            return { response }
        }
    },
    getCategory: {
        postRequest: async ( { response, struct, payload } ) => {
            // Modify the response structure or payload if needed
            return { response }
        }
    },
    getIdMap: {
        postRequest: async ( { response, struct, payload } ) => {
            // Modify the response structure or payload if needed
            return { response }
        }
    },
    getMetadataV2: {
        postRequest: async ( { response, struct, payload } ) => {
            // Modify the response structure or payload if needed
            return { response }
        }
    },
    getQuotesLatestV2: {
        postRequest: async ( { response, struct, payload } ) => {
            // Modify the response structure or payload if needed
            return { response }
        }
    }
} )
