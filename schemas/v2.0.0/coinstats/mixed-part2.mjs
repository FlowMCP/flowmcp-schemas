// Split from coinstats/mixed.mjs
// Part 2 of 3
// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// 18 routes (v2 max: 8) — needs splitting

export const main = {
    namespace: 'cryptodata',
    name: 'Get Coins (Part 2)',
    description: 'Retrieve comprehensive data about all cryptocurrencies including prices, market cap, volume, price changes, supply info, trading metrics, and metadata.',
    version: '2.0.0',
    docs: ['https://your.api.documentation/coins'],
    tags: ['production', 'price', 'market', 'data', 'cacheTtlFrequent'],
    root: 'https://openapiv1.coinstats.app',
    requiredServerParams: ['COINSTATS_API_KEY'],
    headers: {
        'X-API-KEY': '{{COINSTATS_API_KEY}}',
        accept: 'application/json'
    },
    routes: {
        getWalletBalance: {
            method: 'GET',
            path: '/wallet/balance',
            description: 'Get the balance data for a provided wallet address on a specific blockchain network.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'connectionId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get wallet balance on Ethereum',
                    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
                    connectionId: 'ethereum'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            coinId: { type: 'string' },
                            amount: { type: 'number' },
                            decimals: { type: 'number' },
                            contractAddress: { type: 'string' },
                            chain: { type: 'string' },
                            name: { type: 'string' },
                            symbol: { type: 'string' },
                            price: { type: 'number' },
                            priceBtc: { type: 'number' },
                            imgUrl: { type: 'string' },
                            pCh24h: { type: 'number' },
                            rank: { type: 'number' },
                            volume: { type: 'number' }
                        }
                    }
                }
            },
        },
        getWalletBalances: {
            method: 'GET',
            path: '/wallet/balances?networks=all',
            description: 'Get the balance data for a provided wallet address on all CoinStats supported networks.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get wallet balances on all networks', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            blockchain: { type: 'string' },
                            address: { type: 'string' },
                            balances: { type: 'array', items: { type: 'object' } }
                        }
                    }
                }
            },
        },
        getExchanges: {
            method: 'GET',
            path: '/exchange/support',
            description: 'Get a list of supported exchange portfolio connections by CoinStats. via cryptodata.',
            parameters: [],
            tests: [
                { _description: 'List all supported exchange connections' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            connectionId: { type: 'string' },
                            name: { type: 'string' },
                            icon: { type: 'string' },
                            connectionFields: { type: 'array', items: { type: 'object' } }
                        }
                    }
                }
            },
        },
        getFiatCurrencies: {
            method: 'GET',
            path: '/fiats',
            description: 'Get a list of fiat currencies supported by CoinStats via cryptodata. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'List all supported fiat currencies' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            rate: { type: 'number' },
                            symbol: { type: 'string' },
                            imageUrl: { type: 'string' }
                        }
                    }
                }
            },
        },
        getNewsSources: {
            method: 'GET',
            path: '/news/sources',
            description: 'Get the list of available cryptocurrency news sources via cryptodata. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'List all crypto news sources' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sourcename: { type: 'string' },
                            logo: { type: 'string' },
                            sourceImg: { type: 'string' },
                            weburl: { type: 'string' },
                            feedurl: { type: 'string' },
                            _created_at: { type: 'string' },
                            _updated_at: { type: 'string' }
                        }
                    }
                }
            },
        },
        getNews: {
            method: 'GET',
            path: '/news',
            description: 'Get news articles with pagination via cryptodata. Supports page, limit, from filters.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get latest crypto news', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, searchKeyWords: { type: 'array', items: { type: 'string' } }, feedDate: { type: 'number' }, source: { type: 'string' }, title: { type: 'string' }, sourceLink: { type: 'string' }, isFeatured: { type: 'boolean' }, imgUrl: { type: 'string' }, reactionsCount: { type: 'object' }, reactions: { type: 'array', items: { type: 'string' } }, shareURL: { type: 'string' }, relatedCoins: { type: 'array', items: { type: 'string' } }, content: { type: 'boolean' }, link: { type: 'string' }, bigImg: { type: 'boolean' } } } }
                    }
                }
            },
        },
        getNewsByType: {
            method: 'GET',
            path: '/news/type/:type',
            description: 'Get news articles based on a type via cryptodata — query by type. Supports page, limit filters.',
            parameters: [
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum([\'handpicked\',\'trending\',\'latest\',\'bullish\',\'bearish\'])', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } }
            ],
            tests: [
                { _description: 'Get trending crypto news', type: 'trending', limit: 5 },
                { _description: 'Get bullish crypto news', type: 'bullish', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            searchKeyWords: { type: 'array', items: { type: 'string' } },
                            feedDate: { type: 'number' },
                            source: { type: 'string' },
                            title: { type: 'string' },
                            sourceLink: { type: 'string' },
                            isFeatured: { type: 'boolean' },
                            imgUrl: { type: 'string' },
                            reactionsCount: { type: 'object' },
                            reactions: { type: 'array', items: { type: 'string' } },
                            shareURL: { type: 'string' },
                            relatedCoins: { type: 'array', items: { type: 'string' } },
                            content: { type: 'boolean' },
                            link: { type: 'string' },
                            bigImg: { type: 'boolean' },
                            description: { type: 'string' },
                            coins: { type: 'array', items: { type: 'object' } }
                        }
                    }
                }
            },
        },
        getNewsById: {
            method: 'GET',
            path: '/news/:id',
            description: 'Get news by id via cryptodata — query by id. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get news article by ID', id: 'ddbfd0792cfa149044c448eb9c681af4599f15156085980c3d85afe950fc6d8d' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        searchKeyWords: { type: 'array', items: { type: 'string' } },
                        feedDate: { type: 'number' },
                        source: { type: 'string' },
                        title: { type: 'string' },
                        sourceLink: { type: 'string' },
                        isFeatured: { type: 'boolean' },
                        imgUrl: { type: 'string' },
                        reactionsCount: { type: 'object' },
                        reactions: { type: 'array', items: { type: 'string' } },
                        shareURL: { type: 'string' },
                        relatedCoins: { type: 'array', items: { type: 'string' } },
                        content: { type: 'boolean' },
                        link: { type: 'string' },
                        bigImg: { type: 'boolean' },
                        description: { type: 'string' },
                        coins: { type: 'array', items: { type: 'object', properties: { coinKeyWords: { type: 'string' }, coinPercent: { type: 'number' }, coinTitleKeyWords: { type: 'string' }, coinNameKeyWords: { type: 'string' }, coinIdKeyWords: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getWalletBalance: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getWalletBalances: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getExchanges: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getFiatCurrencies: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsSources: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNews: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsByType: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    },
    getNewsById: {
        preRequest: async ( { struct, payload } ) => {
            struct['headers']['X-API-KEY'] = struct['headers']['X-API-KEY'] + '='


            return { struct }
        }
    }
} )
