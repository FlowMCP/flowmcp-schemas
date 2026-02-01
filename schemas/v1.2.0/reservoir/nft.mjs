const schema = {
    namespace: 'reservoir',
    name: 'Reservoir NFT API',
    description: 'Reservoir NFT API for collections, tokens, sales, and market data across 30+ EVM chains',
    docs: [ 'https://nft.reservoir.tools/reference/overview' ],
    tags: [ 'nft', 'marketplace', 'collections', 'sales' ],
    flowMCP: '1.2.0',
    root: 'https://api.reservoir.tools',
    requiredServerParams: [ 'RESERVOIR_API_KEY' ],
    headers: {
        'x-api-key': '{{RESERVOIR_API_KEY}}'
    },
    routes: {
        getCollections: {
            requestMethod: 'GET',
            description: 'Get a list of NFT collections with floor prices, volume, and metadata.',
            route: '/collections/v7',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("allTimeVolume")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(20)', 'default(20)', 'optional()' ] } },
                { position: { key: 'continuation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get top collections by volume', sortBy: 'allTimeVolume', limit: 5 }
            ],
            modifiers: []
        },
        searchCollections: {
            requestMethod: 'GET',
            description: 'Search for NFT collections by name across multiple chains.',
            route: '/collections/search/v1',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(20)', 'default(10)', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Search for Bored Ape collections', name: 'Bored Ape' }
            ],
            modifiers: []
        },
        getTrendingCollections: {
            requestMethod: 'GET',
            description: 'Get top trending NFT collections by sales volume or floor price change.',
            route: '/collections/trending/v1',
            parameters: [
                { position: { key: 'period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("24h")', 'optional()' ] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("volume")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(20)', 'default(10)', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get trending collections 24h', period: '24h', limit: 5 }
            ],
            modifiers: []
        },
        getTokens: {
            requestMethod: 'GET',
            description: 'Get individual NFT token data with metadata, pricing, and ownership info.',
            route: '/tokens/v7',
            parameters: [
                { position: { key: 'collection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'tokens', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("floorAskPrice")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } },
                { position: { key: 'continuation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get BAYC tokens', collection: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', limit: 5 }
            ],
            modifiers: []
        },
        getSales: {
            requestMethod: 'GET',
            description: 'Get completed NFT sales and transaction records.',
            route: '/sales/v6',
            parameters: [
                { position: { key: 'collection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(20)', 'optional()' ] } },
                { position: { key: 'continuation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get recent BAYC sales', collection: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', limit: 5 }
            ],
            modifiers: []
        },
        getOrders: {
            requestMethod: 'GET',
            description: 'Get active NFT listings (asks) from across aggregated marketplaces.',
            route: '/orders/asks/v5',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'collection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("price")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(50)', 'default(20)', 'optional()' ] } },
                { position: { key: 'continuation', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get BAYC listings', collection: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', limit: 5 }
            ],
            modifiers: []
        },
        getChainStats: {
            requestMethod: 'GET',
            description: 'Get blockchain-wide NFT market metrics including volume, sales count, and unique traders.',
            route: '/chain/stats/v1',
            parameters: [],
            tests: [
                { _description: 'Get chain-wide NFT stats' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
