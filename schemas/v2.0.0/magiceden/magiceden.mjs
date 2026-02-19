const schema = {
    namespace: 'magiceden',
    name: 'Magic Eden Solana API',
    description: 'Fetches NFT collection stats, listings, token metadata, and marketplace activity from Magic Eden, the leading Solana NFT marketplace',
    docs: ['https://docs.magiceden.io'],
    tags: ['nft', 'solana', 'marketplace', 'cacheTtlFrequent'],
    flowMCP: '1.2.0',
    root: 'https://api-mainnet.magiceden.dev/v2',
    requiredServerParams: [],
    headers: {},
    routes: {
        getCollectionStats: {
            requestMethod: 'GET',
            description: 'Get floor price, listed count, average price, and total volume statistics for a Solana NFT collection by its symbol. via magiceden.',
            route: '/collections/:symbol/stats',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Get stats for Okay Bears collection', symbol: 'okay_bears' },
                { _description: 'Get stats for DeGods collection', symbol: 'degods' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatCollectionStats' }
            ]
        },
        getCollectionListings: {
            requestMethod: 'GET',
            description: 'Get active NFT listings for a Solana collection with price, seller, token metadata, and rarity info. Supports pagination. via magiceden.',
            route: '/collections/:symbol/listings',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(20)', 'default(20)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get first 5 listings for Okay Bears', symbol: 'okay_bears', limit: 5 },
                { _description: 'Get DeGods listings with offset', symbol: 'degods', offset: 0, limit: 3 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizeListings' }
            ]
        },
        getCollectionActivities: {
            requestMethod: 'GET',
            description: 'Get recent marketplace activity for a Solana NFT collection including sales, listings, bids, and price changes. Supports pagination. via magiceden.',
            route: '/collections/:symbol/activities',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(20)', 'default(20)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get recent Okay Bears activity', symbol: 'okay_bears', limit: 5 },
                { _description: 'Get recent DeGods activity', symbol: 'degods', limit: 3 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizeActivities' }
            ]
        },
        getTokenListings: {
            requestMethod: 'GET',
            description: 'Get active marketplace listings for a specific Solana NFT token by its mint address including price, seller, and listing source. via magiceden.',
            route: '/tokens/:tokenMint/listings',
            parameters: [
                { position: { key: 'tokenMint', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } }
            ],
            tests: [
                { _description: 'Get listings for a specific Okay Bears NFT', tokenMint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU' }
            ],
            modifiers: []
        },
        getTokenActivities: {
            requestMethod: 'GET',
            description: 'Get transaction history for a specific Solana NFT token by mint address including sales, transfers, listings, and bids. via magiceden.',
            route: '/tokens/:tokenMint/activities',
            parameters: [
                { position: { key: 'tokenMint', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(20)', 'default(20)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get activity history for a specific NFT', tokenMint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', limit: 5 }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatCollectionStats: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const data = struct.data
            const lamportsPerSol = 1_000_000_000

            struct.data = {
                symbol: data['symbol'] || null,
                floorPriceSol: data['floorPrice'] ? data['floorPrice'] / lamportsPerSol : null,
                listedCount: data['listedCount'] || 0,
                avgPrice24hSol: data['avgPrice24hr'] ? data['avgPrice24hr'] / lamportsPerSol : null,
                volumeAllSol: data['volumeAll'] ? data['volumeAll'] / lamportsPerSol : null
            }

            return { struct, payload }
        },
        summarizeListings: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const listings = struct.data
            if( !Array.isArray( listings ) ) {
                return { struct, payload }
            }

            const items = listings
                .map( ( listing ) => {
                    const result = {
                        tokenMint: listing['tokenMint'] || null,
                        name: listing['token'] ? listing['token']['name'] : null,
                        image: listing['token'] ? listing['token']['image'] : null,
                        collection: listing['token'] ? listing['token']['collection'] : null,
                        priceSol: listing['price'] || null,
                        seller: listing['seller'] || null,
                        listingSource: listing['listingSource'] || null
                    }

                    return result
                } )

            struct.data = {
                totalListings: listings.length,
                listings: items
            }

            return { struct, payload }
        },
        summarizeActivities: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const activities = struct.data
            if( !Array.isArray( activities ) ) {
                return { struct, payload }
            }

            const items = activities
                .map( ( activity ) => {
                    const result = {
                        type: activity['type'] || null,
                        source: activity['source'] || null,
                        tokenMint: activity['tokenMint'] || null,
                        collection: activity['collection'] || null,
                        priceSol: activity['price'] || null,
                        buyer: activity['buyer'] || null,
                        seller: activity['seller'] || null,
                        blockTime: activity['blockTime'] || null,
                        signature: activity['signature'] || null
                    }

                    return result
                } )

            struct.data = {
                totalActivities: activities.length,
                activities: items
            }

            return { struct, payload }
        }
    }
}


export { schema }
