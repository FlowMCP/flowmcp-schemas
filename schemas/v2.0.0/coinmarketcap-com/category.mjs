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
            ],
            tests: [
                { _description: 'Fetch categories with default pagination' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, volume: { type: 'number' }, num_tokens: { type: 'number' }, avg_price_change: { type: 'number' }, market_cap: { type: 'number' }, market_cap_change: { type: 'number' }, volume_change: { type: 'number' }, last_updated: { type: 'string' } } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'number' }, error_message: { type: 'string', nullable: true }, elapsed: { type: 'number' }, credit_count: { type: 'number' }, notice: { type: 'string', nullable: true } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Fetch a category by ID', id: '605e2ce9d41eae1066535f7c' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, volume: { type: 'number' }, coins: { type: 'array', items: { type: 'object' } }, num_tokens: { type: 'number' }, last_updated: { type: 'string' }, avg_price_change: { type: 'number' }, market_cap: { type: 'number' }, market_cap_change: { type: 'number' }, volume_change: { type: 'number' } } },
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'number' }, error_message: { type: 'string', nullable: true }, elapsed: { type: 'number' }, credit_count: { type: 'number' }, notice: { type: 'string', nullable: true } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Fetch active cryptocurrency ID map', listing_status: 'active' },
                { _description: 'Fetch limited ID map sorted by cmc_rank', sort: 'cmc_rank', limit: 50 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'number' }, error_message: { type: 'string', nullable: true }, elapsed: { type: 'number' }, credit_count: { type: 'number' }, notice: { type: 'string', nullable: true } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, rank: { type: 'number' }, name: { type: 'string' }, symbol: { type: 'string' }, slug: { type: 'string' }, is_active: { type: 'number' }, status: { type: 'number' }, first_historical_data: { type: 'string' }, last_historical_data: { type: 'string' }, platform: { type: 'string', nullable: true } } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Fetch metadata for Bitcoin by ID', id: '1' },
                { _description: 'Fetch metadata for Ethereum by slug', slug: 'ethereum' },
                { _description: 'Fetch metadata by symbol and allow skipping invalids', symbol: 'BTC,ETH', skip_invalid: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'number' }, error_message: { type: 'string', nullable: true }, elapsed: { type: 'number' }, credit_count: { type: 'number' }, notice: { type: 'string', nullable: true } } },
                        data: { type: 'object', properties: { '1': { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, symbol: { type: 'string' }, category: { type: 'string' }, description: { type: 'string' }, slug: { type: 'string' }, logo: { type: 'string' }, subreddit: { type: 'string' }, notice: { type: 'string' }, tags: { type: 'array', items: { type: 'string' } }, 'tag-names': { type: 'array', items: { type: 'string' } }, 'tag-groups': { type: 'array', items: { type: 'string' } }, urls: { type: 'object' }, platform: { type: 'string', nullable: true }, date_added: { type: 'string' }, twitter_username: { type: 'string' }, is_hidden: { type: 'number' }, date_launched: { type: 'string' }, contract_address: { type: 'array', items: { type: 'string' } }, self_reported_circulating_supply: { type: 'number', nullable: true }, self_reported_tags: { type: 'string', nullable: true }, self_reported_market_cap: { type: 'number', nullable: true }, infinite_supply: { type: 'boolean' } } } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Fetch latest quote for Bitcoin by ID', id: '1' },
                { _description: 'Fetch latest quote for Ethereum and Bitcoin by symbol', symbol: 'BTC,ETH', convert: 'USD' },
                { _description: 'Fetch quote using slug and skip invalids', slug: 'bitcoin,ethereum', skip_invalid: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'object', properties: { timestamp: { type: 'string' }, error_code: { type: 'number' }, error_message: { type: 'string', nullable: true }, elapsed: { type: 'number' }, credit_count: { type: 'number' }, notice: { type: 'string', nullable: true } } },
                        data: { type: 'object', properties: { '1': { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, symbol: { type: 'string' }, slug: { type: 'string' }, num_market_pairs: { type: 'number' }, date_added: { type: 'string' }, tags: { type: 'array', items: { type: 'object' } }, max_supply: { type: 'number' }, circulating_supply: { type: 'number' }, total_supply: { type: 'number' }, is_active: { type: 'number' }, infinite_supply: { type: 'boolean' }, minted_market_cap: { type: 'number' }, platform: { type: 'string', nullable: true }, cmc_rank: { type: 'number' }, is_fiat: { type: 'number' }, self_reported_circulating_supply: { type: 'number', nullable: true }, self_reported_market_cap: { type: 'number', nullable: true }, tvl_ratio: { type: 'string', nullable: true }, last_updated: { type: 'string' }, quote: { type: 'object' } } } } }
                    }
                }
            },
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
