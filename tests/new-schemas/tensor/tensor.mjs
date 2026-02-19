const schema = {
    namespace: 'tensor',
    name: 'Tensor NFT Pricing API',
    description: 'Queries Solana NFT collection floor prices, individual NFT price estimates with rarity data, and collection metadata from Tensor',
    docs: ['https://docs.tensor.so/consume/rest-api', 'https://docs.tensor.so/nft-price-estimate-and-appraisal/introduction'],
    tags: ['nft', 'solana', 'pricing', 'rarity', 'floor'],
    flowMCP: '1.2.0',
    root: 'https://api.mainnet.tensordev.io/api/v1',
    requiredServerParams: ['TENSOR_API_KEY'],
    headers: {
        'x-tensor-api-key': '{{TENSOR_API_KEY}}'
    },
    routes: {
        getCollections: {
            requestMethod: 'GET',
            description: 'List all supported NFT collections on Solana with their collection IDs and metadata. via tensor.',
            route: '/collections',
            parameters: [],
            tests: [
                { _description: 'Get all supported Tensor collections' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'summarizeCollections' }
            ]
        },
        getCollectionFloor: {
            requestMethod: 'GET',
            description: 'Get the smart floor price for a Solana NFT collection, robust to manipulation, with optional historical timestamp lookup. via tensor.',
            route: '/collections/:collectionId/floor',
            parameters: [
                { position: { key: 'collectionId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'at', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get current floor price for Mad Lads', collectionId: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w' },
                { _description: 'Get current floor price for Tensorians', collectionId: '9VAbhSSnZFDgm3KiTSDzL88s1Lg3aRMEoTkHHH6sDSwK' }
            ],
            modifiers: []
        },
        getNftPrice: {
            requestMethod: 'GET',
            description: 'Get Tensor price estimate for a single NFT by mint address including rarity-adjusted upper and lower bounds. via tensor.',
            route: '/collections/:collectionId/:mint',
            parameters: [
                { position: { key: 'collectionId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'mint', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } },
                { position: { key: 'at', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get price estimate for a Mad Lads NFT', collectionId: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w', mint: '5Spi6DPQv2mTmCT1i1qj9WKfwFWsVnGDSR9G3bCJ4M8R' }
            ],
            modifiers: []
        }
    },
    handlers: {
        summarizeCollections: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const collections = Array.isArray( struct.data ) ? struct.data : struct.data['collections'] || []
            if( !Array.isArray( collections ) ) {
                return { struct, payload }
            }

            const summary = collections
                .slice( 0, 50 )
                .map( ( collection ) => {
                    const result = {
                        id: collection['id'] || collection['collId'] || null,
                        name: collection['name'] || null,
                        symbol: collection['symbol'] || null,
                        slug: collection['slug'] || null
                    }

                    return result
                } )

            struct.data = {
                totalCollections: collections.length,
                collections: summary
            }

            return { struct, payload }
        }
    }
}


export { schema }
