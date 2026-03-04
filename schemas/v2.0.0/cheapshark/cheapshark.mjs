export const main = {
    namespace: 'cheapshark',
    name: 'CheapShark Game Deals',
    description: 'Access CheapShark, a game deals aggregator that tracks prices across 30+ digital PC game stores. Search deals by price, store, rating, or title. Compare prices across Steam, GOG, Humble Bundle, Epic Games, and more. Get historical lowest prices and deal alerts. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://apidocs.cheapshark.com/'],
    tags: ['entertainment', 'gaming', 'shopping', 'opendata', 'cacheTtlFrequent'],
    root: 'https://www.cheapshark.com',
    requiredServerParams: [],
    headers: {},
    routes: {
        getDeals: {
            method: 'GET',
            path: '/api/1.0/deals',
            description: 'Get current game deals with filters. Filter by store, price range, Metacritic score, Steam rating, and more. Returns sale price, normal price, savings percentage, and store info. Sorted by deal rating by default.',
            parameters: [
                { position: { key: 'storeID', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'upperPrice', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lowerPrice', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'metacritic', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(DealRating,Title,Savings,Price,Metacritic,Reviews,Release,Store,Recent)', options: ['optional()', 'default(DealRating)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(60)', 'max(60)'] } },
                { position: { key: 'pageNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Best deals under $15', upperPrice: 15, pageSize: 5 },
                { _description: 'Steam deals over 80 Metacritic', storeID: '1', metacritic: 80, pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { internalName: { type: 'string' }, title: { type: 'string' }, dealID: { type: 'string' }, storeID: { type: 'string' }, gameID: { type: 'string' }, salePrice: { type: 'string' }, normalPrice: { type: 'string' }, isOnSale: { type: 'string' }, savings: { type: 'string' }, metacriticScore: { type: 'string' }, steamRatingPercent: { type: 'string' }, releaseDate: { type: 'number' }, thumb: { type: 'string' } } } }
            }
        },
        searchGames: {
            method: 'GET',
            path: '/api/1.0/games',
            description: 'Search games by title. Returns game info with cheapest current price and historical cheapest price.',
            parameters: [
                { position: { key: 'title', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(60)', 'max(60)'] } }
            ],
            tests: [
                { _description: 'Search Batman games', title: 'batman', limit: 5 },
                { _description: 'Search Witcher games', title: 'witcher', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { gameID: { type: 'string' }, steamAppID: { type: 'string' }, cheapest: { type: 'string' }, cheapestDealID: { type: 'string' }, external: { type: 'string' }, internalName: { type: 'string' }, thumb: { type: 'string' } } } }
            }
        },
        getGameDetails: {
            method: 'GET',
            path: '/api/1.0/games',
            description: 'Get detailed game info by game ID. Returns title, cheapest price ever, and deals from all stores with prices.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get LEGO Batman (612)', id: 612 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { info: { type: 'object', properties: { title: { type: 'string' }, steamAppID: { type: 'string' }, thumb: { type: 'string' } } }, cheapestPriceEver: { type: 'object', properties: { price: { type: 'string' }, date: { type: 'number' } } }, deals: { type: 'array', items: { type: 'object', properties: { storeID: { type: 'string' }, dealID: { type: 'string' }, price: { type: 'string' }, retailPrice: { type: 'string' }, savings: { type: 'string' } } } } } }
            }
        },
        listStores: {
            method: 'GET',
            path: '/api/1.0/stores',
            description: 'List all tracked game stores. Returns store names, IDs, active status, and image URLs for Steam, GOG, Humble Bundle, Epic, Fanatical, and 25+ more stores.',
            parameters: [],
            tests: [
                { _description: 'List all stores' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { storeID: { type: 'string' }, storeName: { type: 'string' }, isActive: { type: 'number' }, images: { type: 'object', properties: { banner: { type: 'string' }, logo: { type: 'string' }, icon: { type: 'string' } } } } } }
            }
        }
    }
}
