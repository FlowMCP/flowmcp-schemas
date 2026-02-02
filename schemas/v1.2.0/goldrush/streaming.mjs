export const schema = {
    namespace: "goldrush",
    name: "GoldRush Streaming API",
    description: "Search tokens and query wallet PnL data across multiple chains using the GoldRush (Covalent) Streaming GraphQL API",
    docs: ["https://goldrush.dev/docs/overview", "https://goldrush.dev/docs/goldrush-streaming-api/overview"],
    tags: ["crypto", "defi", "blockchain", "tokens"],
    flowMCP: "1.2.0",
    root: "https://api.covalenthq.com/v1",
    requiredServerParams: ["GOLDRUSH_API_KEY"],
    headers: {
        "Authorization": "Bearer {{GOLDRUSH_API_KEY}}",
        "Content-Type": "application/json"
    },
    routes: {
        searchToken: {
            requestMethod: "POST",
            description: "Search for tokens by name, ticker symbol, or contract address across supported chains",
            route: "/streaming/graphql",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(BASE_MAINNET,SOLANA_MAINNET,BSC_MAINNET,ETH_MAINNET,MONAD_MAINNET)", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search for Ethereum token", query: "ethereum" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildSearchTokenQuery" },
                { phase: "post", handlerName: "formatSearchResults" }
            ]
        },
        getWalletPnL: {
            requestMethod: "POST",
            description: "Get unrealized profit and loss data for a wallet address on a specific chain. Required: address. Optional filters: chain.",
            route: "/streaming/graphql",
            parameters: [
                { position: { key: "address", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(BASE_MAINNET,SOLANA_MAINNET,BSC_MAINNET,ETH_MAINNET,MONAD_MAINNET)", options: ["default(ETH_MAINNET)", "optional()"] } }
            ],
            tests: [
                { _description: "Get wallet PnL on Ethereum", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", chain: "ETH_MAINNET" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildWalletPnLQuery" },
                { phase: "post", handlerName: "formatPnLResults" }
            ]
        }
    },
    handlers: {
        buildSearchTokenQuery: async ( { struct, payload, userParams } ) => {
            const { query, chain } = userParams

            const chainFilter = chain ? `chain: ${chain}` : ''
            const graphqlQuery = `{ searchToken(query: "${query}"${chainFilter ? `, ${chainFilter}` : ''}) { pair_address chain quote_rate quote_rate_usd volume volume_usd market_cap base_token { contract_name contract_ticker_symbol contract_address contract_decimals } quote_token { contract_name contract_ticker_symbol contract_address contract_decimals } } }`

            payload.body = JSON.stringify( { query: graphqlQuery } )

            return { struct, payload }
        },

        buildWalletPnLQuery: async ( { struct, payload, userParams } ) => {
            const { address, chain } = userParams
            const chainValue = chain || 'ETH_MAINNET'

            const graphqlQuery = `{ getUnrealizedPnL(address: "${address}", chain: ${chainValue}) { token_address token_name token_symbol chain avg_buy_price current_price unrealized_pnl unrealized_pnl_percentage total_bought total_sold current_balance } }`

            payload.body = JSON.stringify( { query: graphqlQuery } )

            return { struct, payload }
        },

        formatSearchResults: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.data || !raw.data.searchToken ) {
                    return { struct, payload }
                }

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

                struct.data = {
                    source: "GoldRush Streaming API",
                    tokenCount: tokens.length,
                    tokens
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting search results: ${error.message}` )
            }

            return { struct, payload }
        },

        formatPnLResults: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.data || !raw.data.getUnrealizedPnL ) {
                    return { struct, payload }
                }

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

                struct.data = {
                    source: "GoldRush Streaming API",
                    positionCount: positions.length,
                    positions
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting PnL results: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
