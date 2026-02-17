// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'jupiter',
    name: 'Jupiter Token Price Checker',
    description: 'Fetches token prices from Jupiter DEX aggregator, priced by default against USDC, with optional vsToken.',
    version: '2.0.0',
    docs: ['https://station.jup.ag/docs/api/lite-api', 'https://dev.jup.ag/docs/price-api/'],
    tags: ['solana', 'defi', 'swap', 'cacheTtlRealtime'],
    root: 'https://lite-api.jup.ag',
    routes: {
        getTokenPrice: {
            method: 'GET',
            path: '/price/v2',
            description: 'Returns the price of one or more tokens, optionally against a specified vsToken (defaults to USDC).',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getTokenInfo: {
            method: 'GET',
            path: '/tokens/v1/token/:mintAddress',
            description: 'Get information about a token using its mint address via Jupiter — query by mintAddress.',
            parameters: [
                { position: { key: 'mintAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getTokensInMarket: {
            method: 'GET',
            path: '/tokens/v1/market/:marketAddress/mints',
            description: 'Get list of token mints belonging to a market address via Jupiter — query by marketAddress.',
            parameters: [
                { position: { key: 'marketAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getAllTradableTokens: {
            method: 'GET',
            path: '/tokens/v1/mints/tradable',
            description: 'Retrieve a list of all tradable token mints on Jupiter. Returns structured JSON response data.',
            parameters: []
        },
        getTaggedTokens: {
            method: 'GET',
            path: '/tokens/v1/tagged/:tags',
            description: 'Fetch token info for tokens matching specific tags via Jupiter — query by tags. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tags', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        getNewTokens: {
            method: 'GET',
            path: '/tokens/v1/new',
            description: 'Retrieve new tokens, ordered by creation timestamp via Jupiter. Returns structured JSON response data.',
            parameters: []
        },
        getAllTokens: {
            method: 'GET',
            path: '/tokens/v1/all',
            description: 'Fetch all tokens indexed by Jupiter. This is a large payload. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getTokenPrice: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getTokenInfo: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getTokensInMarket: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getAllTradableTokens: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getTaggedTokens: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getNewTokens: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    },
    getAllTokens: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            // response = response?.data
            } catch (err) {
            struct.status = false;
            struct.messages.push( 'Error', err );
            }
            return { response }
        }
    }
} )
