// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'goldrush',
    name: 'GoldRush Streaming API',
    description: 'Search tokens and query wallet PnL data across multiple chains using the GoldRush (Covalent) Streaming GraphQL API',
    version: '2.0.0',
    docs: ['https://goldrush.dev/docs/overview', 'https://goldrush.dev/docs/goldrush-streaming-api/overview'],
    tags: ['crypto', 'defi', 'blockchain', 'tokens', 'cacheTtlDaily'],
    root: 'https://api.covalenthq.com/v1',
    requiredServerParams: ['GOLDRUSH_API_KEY'],
    headers: {
        Authorization: 'Bearer {{GOLDRUSH_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        searchToken: {
            method: 'POST',
            path: '/streaming/graphql',
            description: 'Search for tokens by name, ticker symbol, or contract address across supported chains',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(BASE_MAINNET,SOLANA_MAINNET,BSC_MAINNET,ETH_MAINNET,MONAD_MAINNET)', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object',properties:{searchTokens:{type:'array',items:{type:'object',properties:{name:{type:'string'},symbol:{type:'string'},contractAddress:{type:'string'}}}}}}}}},
            tests: [
                { _description: 'Search for Ethereum token', query: 'ethereum' }
            ],
        },
        getWalletPnL: {
            method: 'POST',
            path: '/streaming/graphql',
            description: 'Get unrealized profit and loss data for a wallet address on a specific chain. Required: address. Optional filters: chain.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(10)'] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(BASE_MAINNET,SOLANA_MAINNET,BSC_MAINNET,ETH_MAINNET,MONAD_MAINNET)', options: ['default(ETH_MAINNET)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object',properties:{walletPnL:{type:'object',properties:{totalPnL:{type:'number'},tokens:{type:'array',items:{type:'object'}}}}}}}}},
            tests: [
                {
                    _description: 'Get wallet PnL on Ethereum',
                    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
                    chain: 'ETH_MAINNET'
                }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchToken: {
        preRequest: async ( { struct, payload } ) => {
            const { query, chain } = payload

            const chainFilter = chain ? `chain: ${chain}` : ''
            const graphqlQuery = `{ searchToken(query: "${query}"${chainFilter ? `, ${chainFilter}` : ''}) { pair_address chain quote_rate quote_rate_usd volume volume_usd market_cap base_token { contract_name contract_ticker_symbol contract_address contract_decimals } quote_token { contract_name contract_ticker_symbol contract_address contract_decimals } } }`

            struct.body = JSON.stringify( { query: graphqlQuery } )

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.data || !raw.data.searchToken ) {
            return { response }}

            const tokens = raw.data.searchToken
            .map( ( t ) => {
            const result = {
            pairAddress: t.pair_address,
            chain: t.chain,
            price: t.quote_rate_usd,
            volume24h: t.volume_usd,
            marketCap: t.market_cap,
            baseToken: {
            name: t.base_token && t.base_token.contract_name,
            symbol: t.base_token && t.base_token.contract_ticker_symbol,
            address: t.base_token && t.base_token.contract_address,
            decimals: t.base_token && t.base_token.contract_decimals
            },
            quoteToken: {
            name: t.quote_token && t.quote_token.contract_name,
            symbol: t.quote_token && t.quote_token.contract_ticker_symbol,
            address: t.quote_token && t.quote_token.contract_address
            }
            }

            return result
            } )

            response = {
            source: "GoldRush Streaming API",
            tokenCount: tokens.length,
            tokens
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting search results: ${error.message}` )
            }

            return { response }
        }
    },
    getWalletPnL: {
        preRequest: async ( { struct, payload } ) => {
            const { address, chain } = payload
            const chainValue = chain || 'ETH_MAINNET'

            const graphqlQuery = `{ getUnrealizedPnL(address: "${address}", chain: ${chainValue}) { token_address token_name token_symbol chain avg_buy_price current_price unrealized_pnl unrealized_pnl_percentage total_bought total_sold current_balance } }`

            struct.body = JSON.stringify( { query: graphqlQuery } )

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.data || !raw.data.getUnrealizedPnL ) {
            return { response }}

            const positions = raw.data.getUnrealizedPnL
            .map( ( p ) => {
            const result = {
            tokenAddress: p.token_address,
            tokenName: p.token_name,
            tokenSymbol: p.token_symbol,
            chain: p.chain,
            avgBuyPrice: p.avg_buy_price,
            currentPrice: p.current_price,
            unrealizedPnL: p.unrealized_pnl,
            unrealizedPnLPercent: p.unrealized_pnl_percentage,
            totalBought: p.total_bought,
            totalSold: p.total_sold,
            currentBalance: p.current_balance
            }

            return result
            } )

            response = {
            source: "GoldRush Streaming API",
            positionCount: positions.length,
            positions
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting PnL results: ${error.message}` )
            }

            return { response }
        }
    }
} )
