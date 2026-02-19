export const schema = {
    namespace: "goldrush",
    name: "GoldRush Blockchain Data API",
    description: "Query multichain blockchain data via the GoldRush (Covalent) Foundational REST API. Supports 100+ EVM chains. Retrieve token balances, transactions, token holders, historical prices, chain activity, and supported chains.",
    docs: ["https://goldrush.dev/docs/api-reference", "https://goldrush.dev/docs/llms.txt"],
    tags: ["crypto", "blockchain", "defi", "multichain", "wallets", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://api.covalenthq.com/v1",
    requiredServerParams: ["GOLDRUSH_API_KEY"],
    headers: {
        "Authorization": "Bearer {{GOLDRUSH_API_KEY}}"
    },
    routes: {
        getBalances: {
            requestMethod: "GET",
            description: "Get all token balances (native, ERC20, NFT) for a wallet address on a specific chain. Returns spot prices and metadata. Use chain names like eth-mainnet, matic-mainnet, bsc-mainnet.",
            route: "/:chainName/address/:walletAddress/balances_v2/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "quote-currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(USD,CAD,EUR,SGD,INR,JPY,VND,CNY,KRW,RUB,TRY,NGN,ARS,AUD,CHF,GBP)", options: ["default(USD)", "optional()"] } },
                { position: { key: "no-spam", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } }
            ],
            tests: [
                { _description: "Get Vitalik token balances on Ethereum", chainName: "eth-mainnet", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                { _description: "Get balances on Polygon", chainName: "matic-mainnet", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatBalances" }
            ]
        },
        getTransactions: {
            requestMethod: "GET",
            description: "Get recent transactions for a wallet address on a specific chain. Returns transaction hash, sender, receiver, value, gas details, and timestamps.",
            route: "/:chainName/address/:walletAddress/transactions_v3/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "quote-currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(USD,CAD,EUR,SGD,INR,JPY,VND,CNY,KRW,RUB,TRY,NGN,ARS,AUD,CHF,GBP)", options: ["default(USD)", "optional()"] } },
                { position: { key: "no-logs", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } }
            ],
            tests: [
                { _description: "Get recent transactions on Ethereum", chainName: "eth-mainnet", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatTransactions" }
            ]
        },
        getChains: {
            requestMethod: "GET",
            description: "Get a list of all supported blockchains with chain names, chain IDs, testnet status, and labels. Use the chain name values in other endpoints.",
            route: "/chains/",
            parameters: [],
            tests: [
                { _description: "Get all supported chains" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatChains" }
            ]
        },
        getTokenHolders: {
            requestMethod: "GET",
            description: "Get token holder list for an ERC20 or ERC721 contract. Returns addresses, balances, and total supply. Supports historical lookups via block height or date.",
            route: "/:chainName/tokens/:tokenAddress/token_holders_v2/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "tokenAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "page-size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(100,1000)", options: ["default(100)", "optional()"] } },
                { position: { key: "page-number", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "block-height", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get USDC holders on Ethereum", chainName: "eth-mainnet", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatTokenHolders" }
            ]
        },
        getTokenPrice: {
            requestMethod: "GET",
            description: "Get historical token prices by contract address on a specific chain. Supports date range filtering. Returns daily price points with fiat conversion.",
            route: "/pricing/historical_by_addresses_v2/:chainName/:quoteCurrency/:contractAddress/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "quoteCurrency", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(USD,CAD,EUR,SGD,INR,JPY,VND,CNY,KRW,RUB,TRY,NGN,ARS,AUD,CHF,GBP)", options: ["default(USD)"] } },
                { position: { key: "contractAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get USDC price history on Ethereum", chainName: "eth-mainnet", quoteCurrency: "USD", contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatTokenPrice" }
            ]
        },
        getAddressActivity: {
            requestMethod: "GET",
            description: "Get activity across all chains for a wallet address with a single API call. Returns which chains an address is active on and when last seen.",
            route: "/address/:walletAddress/activity/",
            parameters: [
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "testnets", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(false)", "optional()"] } }
            ],
            tests: [
                { _description: "Get Vitalik chain activity", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatAddressActivity" }
            ]
        },
        getErc20Transfers: {
            requestMethod: "GET",
            description: "Get ERC20 token transfer history for a wallet on a specific chain. Requires a contract address to filter by token. Returns transfer direction, amounts, and timestamps.",
            route: "/:chainName/address/:walletAddress/transfers_v2/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "contract-address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "quote-currency", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(USD,CAD,EUR,SGD,INR,JPY,VND,CNY,KRW,RUB,TRY,NGN,ARS,AUD,CHF,GBP)", options: ["default(USD)", "optional()"] } },
                { position: { key: "page-size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(100)", "optional()"] } },
                { position: { key: "page-number", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Get USDC transfers for Vitalik on Ethereum", chainName: "eth-mainnet", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "contract-address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatErc20Transfers" }
            ]
        },
        getTransactionSummary: {
            requestMethod: "GET",
            description: "Get a transaction summary for a wallet address on a specific chain. Returns total transaction count and earliest/latest transaction timestamps.",
            route: "/:chainName/address/:walletAddress/transactions_summary/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["default(eth-mainnet)"] } },
                { position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(10)"] } }
            ],
            tests: [
                { _description: "Get transaction summary on Ethereum", chainName: "eth-mainnet", walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatBalances: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const tokens = raw.items
                .filter( ( item ) => {
                    const hasBalance = item.balance && item.balance !== '0'

                    return hasBalance
                } )
                .map( ( item ) => {
                    const decimals = item.contract_decimals || 0
                    const rawBalance = item.balance || '0'
                    const balance = decimals > 0 ? Number( rawBalance ) / Math.pow( 10, decimals ) : Number( rawBalance )

                    const result = {
                        name: item.contract_name,
                        symbol: item.contract_ticker_symbol,
                        address: item.contract_address,
                        balance,
                        quoteRate: item.quote_rate || null,
                        valueUsd: item.quote || null,
                        type: item.type || null,
                        isNative: item.native_token || false
                    }

                    return result
                } )

            struct.data = {
                source: "GoldRush Foundational API",
                address: raw.address,
                chainId: raw.chain_id,
                chainName: raw.chain_name,
                tokenCount: tokens.length,
                tokens
            }

            return { struct, payload }
        },

        formatTransactions: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const transactions = raw.items
                .map( ( tx ) => {
                    const result = {
                        txHash: tx.tx_hash,
                        blockHeight: tx.block_height,
                        blockSignedAt: tx.block_signed_at,
                        from: tx.from_address,
                        fromLabel: tx.from_address_label || null,
                        to: tx.to_address,
                        toLabel: tx.to_address_label || null,
                        value: tx.value,
                        valueQuote: tx.value_quote || null,
                        gasSpent: tx.gas_spent,
                        gasPrice: tx.gas_price,
                        feesPaid: tx.fees_paid || null,
                        successful: tx.successful
                    }

                    return result
                } )

            struct.data = {
                source: "GoldRush Foundational API",
                address: raw.address,
                chainId: raw.chain_id,
                chainName: raw.chain_name,
                transactionCount: transactions.length,
                transactions
            }

            return { struct, payload }
        },

        formatChains: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const chains = raw.items
                .map( ( chain ) => {
                    const result = {
                        name: chain.name,
                        chainId: chain.chain_id,
                        label: chain.label,
                        isTestnet: chain.is_testnet,
                        isAppchain: chain.is_appchain || false,
                        category: chain.category_label || null
                    }

                    return result
                } )

            const mainnets = chains
                .filter( ( c ) => {
                    const isMainnet = !c.isTestnet

                    return isMainnet
                } )

            struct.data = {
                source: "GoldRush Foundational API",
                totalChains: chains.length,
                mainnetCount: mainnets.length,
                testnetCount: chains.length - mainnets.length,
                chains
            }

            return { struct, payload }
        },

        formatTokenHolders: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const holders = raw.items
                .map( ( holder ) => {
                    const decimals = holder.contract_decimals || 0
                    const rawBalance = holder.balance || '0'
                    const balance = decimals > 0 ? Number( rawBalance ) / Math.pow( 10, decimals ) : Number( rawBalance )

                    const result = {
                        address: holder.address,
                        balance,
                        totalSupply: holder.total_supply || null
                    }

                    return result
                } )

            const pagination = raw.pagination || {}

            struct.data = {
                source: "GoldRush Foundational API",
                tokenName: raw.items[ 0 ]?.contract_name || null,
                tokenSymbol: raw.items[ 0 ]?.contract_ticker_symbol || null,
                holderCount: holders.length,
                totalCount: pagination.total_count || null,
                hasMore: pagination.has_more || false,
                holders
            }

            return { struct, payload }
        },

        formatTokenPrice: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) || raw.length === 0 ) { return { struct, payload } }

            const tokenData = raw[ 0 ]
            const prices = ( tokenData.prices || [] )
                .map( ( p ) => {
                    const result = {
                        date: p.date,
                        price: p.price,
                        prettyPrice: p.pretty_price || null
                    }

                    return result
                } )

            struct.data = {
                source: "GoldRush Foundational API",
                contractName: tokenData.contract_name,
                contractSymbol: tokenData.contract_ticker_symbol,
                contractAddress: tokenData.contract_address,
                quoteCurrency: tokenData.quote_currency,
                priceCount: prices.length,
                prices
            }

            return { struct, payload }
        },

        formatAddressActivity: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const chains = raw.items
                .map( ( item ) => {
                    const result = {
                        chainName: item.name || item.extends?.name,
                        chainId: item.chain_id || item.extends?.chain_id,
                        label: item.label || item.extends?.label,
                        isTestnet: item.is_testnet || item.extends?.is_testnet || false,
                        lastSeenAt: item.last_seen_at
                    }

                    return result
                } )

            struct.data = {
                source: "GoldRush Foundational API",
                address: raw.address,
                activeChainCount: chains.length,
                chains
            }

            return { struct, payload }
        },

        formatErc20Transfers: async ( { struct, payload } ) => {
            const raw = struct?.data?.data
            if( !raw || !raw.items ) { return { struct, payload } }

            const transfers = raw.items
                .reduce( ( acc, item ) => {
                    const innerTransfers = ( item.transfers || [] )
                        .map( ( t ) => {
                            const decimals = t.contract_decimals || 0
                            const rawDelta = t.delta || '0'
                            const amount = decimals > 0 ? Number( rawDelta ) / Math.pow( 10, decimals ) : Number( rawDelta )

                            const result = {
                                txHash: item.tx_hash,
                                blockSignedAt: item.block_signed_at,
                                from: t.from_address,
                                fromLabel: t.from_address_label || null,
                                to: t.to_address,
                                toLabel: t.to_address_label || null,
                                tokenName: t.contract_name,
                                tokenSymbol: t.contract_ticker_symbol,
                                amount,
                                transferType: t.transfer_type,
                                quoteRate: t.quote_rate || null,
                                valueUsd: t.delta_quote || null
                            }

                            return result
                        } )

                    acc.push( ...innerTransfers )

                    return acc
                }, [] )

            struct.data = {
                source: "GoldRush Foundational API",
                address: raw.address,
                chainId: raw.chain_id,
                chainName: raw.chain_name,
                transferCount: transfers.length,
                transfers
            }

            return { struct, payload }
        }
    }
}
