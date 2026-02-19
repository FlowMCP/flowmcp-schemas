// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'jupiter',
    name: 'Jupiter Token Price Checker',
    description: 'Fetches token prices from Jupiter DEX aggregator, priced by default against USDC, with optional vsToken.',
    version: '2.0.0',
    docs: ['https://station.jup.ag/docs/api/lite-api', 'https://dev.jup.ag/docs/price-api/'],
    tags: ['solana', 'defi', 'swap', 'cacheTtlRealtime'],
    root: 'https://api.jup.ag',
    requiredServerParams: ['JUPITER_API_KEY'],
    headers: {
        'x-api-key': '{{JUPITER_API_KEY}}'
    },
    routes: {
        getTokenPrice: {
            method: 'GET',
            path: '/price/v2',
            description: 'Returns the price of one or more tokens, optionally against a specified vsToken (defaults to USDC).',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object'},timeTaken:{type:'number'}}}},
            tests: [
                {
                    _description: 'Preis von JUP und SOL gegen USDC',
                    ids: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112'
                }
            ],
        },
        getTokenInfo: {
            method: 'GET',
            path: '/tokens/v1/token/:mintAddress',
            description: 'Get information about a token using its mint address via Jupiter — query by mintAddress.',
            parameters: [
                { position: { key: 'mintAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{address:{type:'string'},name:{type:'string'},symbol:{type:'string'},decimals:{type:'number'},logoURI:{type:'string'},tags:{type:'array',items:{type:'string'}}}}},
            tests: [
                { _description: 'Info for JUP token', mintAddress: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' }
            ],
        },
        getTokensInMarket: {
            method: 'GET',
            path: '/tokens/v1/market/:marketAddress/mints',
            description: 'Get list of token mints belonging to a market address via Jupiter — query by marketAddress.',
            parameters: [
                { position: { key: 'marketAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            output: {mimeType:'application/json',schema:{type:'array',items:{type:'string'}}},
            tests: [
                { _description: 'Tokens in SOL-USDC market', marketAddress: 'BVRbyLjjfSBcoyiYFuxbgKYnWuiFaF9CSXEa5vdSZ9Hh' }
            ],
        },
        getAllTradableTokens: {
            method: 'GET',
            path: '/tokens/v1/mints/tradable',
            description: 'Retrieve a list of all tradable token mints on Jupiter. Returns structured JSON response data.',
            parameters: [],
            output: {mimeType:'application/json',schema:{type:'array',items:{type:'string'}}},
            tests: [
                { _description: 'Fetch tradable token mints' }
            ],
        },
        getTaggedTokens: {
            method: 'GET',
            path: '/tokens/v1/tagged/:tags',
            description: 'Fetch token info for tokens matching specific tags via Jupiter — query by tags. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'tags', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            output: {mimeType:'application/json',schema:{type:'array',items:{type:'object',properties:{address:{type:'string'},name:{type:'string'},symbol:{type:'string'},decimals:{type:'number'}}}}},
            tests: [
                { _description: 'Fetch LST tagged tokens', tags: 'lst' }
            ],
        },
        getNewTokens: {
            method: 'GET',
            path: '/tokens/v1/new',
            description: 'Retrieve new tokens, ordered by creation timestamp via Jupiter. Returns structured JSON response data.',
            parameters: [],
            output: {mimeType:'application/json',schema:{type:'array',items:{type:'object',properties:{address:{type:'string'},name:{type:'string'},symbol:{type:'string'},decimals:{type:'number'}}}}},
            tests: [
                { _description: 'Fetch newly listed tokens' }
            ],
        },
        getAllTokens: {
            method: 'GET',
            path: '/tokens/v1/all',
            description: 'Fetch all tokens indexed by Jupiter. This is a large payload. Returns structured JSON response data.',
            parameters: [],
            output: {mimeType:'application/json',schema:{type:'array',items:{type:'object',properties:{address:{type:'string'},name:{type:'string'},symbol:{type:'string'},decimals:{type:'number'}}}}},
            tests: [
                { _description: 'Fetch all token metadata' }
            ],
        },
        getSwapQuote: {
            method: 'GET',
            path: '/swap/v1/quote',
            description: 'Get an optimal swap quote across all Solana DEXes. Returns output amount, price impact, slippage, fee breakdown and full route plan with AMM details.',
            parameters: [
                { position: { key: 'inputMint', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'outputMint', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amount', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'slippageBps', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)'] } },
                { position: { key: 'swapMode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ExactIn,ExactOut)', options: ['optional()', 'default(ExactIn)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{inputMint:{type:'string'},inAmount:{type:'string'},outputMint:{type:'string'},outAmount:{type:'string'},otherAmountThreshold:{type:'string'},swapMode:{type:'string'},slippageBps:{type:'number'},priceImpactPct:{type:'string'},routePlan:{type:'array',items:{type:'object',properties:{swapInfo:{type:'object',properties:{ammKey:{type:'string'},label:{type:'string'},inputMint:{type:'string'},outputMint:{type:'string'},inAmount:{type:'string'},outAmount:{type:'string'}}},percent:{type:'number'}}}},swapUsdValue:{type:'string'}}}},
            tests: [
                { _description: 'Quote 1 SOL to USDC', inputMint: 'So11111111111111111111111111111111111111112', outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: '1000000000', slippageBps: 50 },
                { _description: 'Quote 100 USDC to SOL', inputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', outputMint: 'So11111111111111111111111111111111111111112', amount: '100000000', slippageBps: 50 }
            ],
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
    },
    getSwapQuote: {
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
