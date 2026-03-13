// Token Search — Query local SQLite token database
// No external API calls — searches 73,800+ tokens across 33 chains

export const main = {
    namespace: 'indicators',
    name: 'Token Search',
    description: 'Search for tokens by symbol or chain across 34 EVM blockchains. Uses a local SQLite database with 9.5M+ tokens from DeFi pool data, ranked by swap activity. No API key required.',
    version: '3.0.0',
    docs: [],
    tags: ['tokens', 'search', 'defi', 'evm', 'blockchain'],
    root: 'https://localhost',
    requiredLibraries: ['better-sqlite3'],
    tools: {
        searchBySymbol: {
            method: 'GET',
            path: '/',
            description: 'Search tokens by symbol (case-insensitive). Returns all matching tokens across all chains with address, chain, and decimals. Example: "WETH" returns 46 results across 34 chains.',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } }
            ],
            tests: [
                {
                    _description: 'Search for WETH across all chains',
                    symbol: 'WETH',
                    limit: 10
                }
            ]
        },
        searchByAddress: {
            method: 'GET',
            path: '/address',
            description: 'Search tokens by contract address (exact match, case-insensitive). Returns token symbol, chain, and decimals.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Search for USDC on Ethereum',
                    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
                }
            ]
        },
        getChainStats: {
            method: 'GET',
            path: '/stats',
            description: 'Get token count statistics per chain. Returns all chains sorted by token count.',
            parameters: [],
            tests: [
                {
                    _description: 'Get chain statistics'
                }
            ]
        }
    }
}


import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __homedir = process.env.HOME || process.env.USERPROFILE
const __dbPath = join( __homedir, '.flowmcp', 'data', 'tokens.db' )


export const handlers = ( { sharedLists, libraries } ) => {
    const Database = libraries['better-sqlite3']

    return {
        searchBySymbol: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { symbol, chain, limit = 100 } = userParams

                try {
                    const dbPath = __dbPath
                    const db = new Database( dbPath, { readonly: true } )

                    let rows
                    if( chain ) {
                        rows = db.prepare(
                            'SELECT symbol, address, chain, decimals, total_swaps, pool_count, is_core FROM tokens WHERE UPPER(symbol) = UPPER(?) AND chain = ? ORDER BY total_swaps DESC LIMIT ?'
                        ).all( symbol, chain, limit )
                    } else {
                        rows = db.prepare(
                            'SELECT symbol, address, chain, decimals, total_swaps, pool_count, is_core FROM tokens WHERE UPPER(symbol) = UPPER(?) ORDER BY total_swaps DESC LIMIT ?'
                        ).all( symbol, limit )
                    }

                    db.close()

                    struct['data'] = {
                        symbol: symbol.toUpperCase(),
                        totalResults: rows.length,
                        chains: [ ...new Set( rows.map( ( r ) => r.chain ) ) ],
                        tokens: rows
                    }
                    struct['status'] = true
                } catch( e ) {
                    struct['status'] = false
                    struct['messages'].push( `Token search error: ${e.message}` )
                }

                return { struct }
            }
        },
        searchByAddress: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { address } = userParams

                try {
                    const dbPath = __dbPath
                    const db = new Database( dbPath, { readonly: true } )

                    const rows = db.prepare(
                        'SELECT symbol, address, chain, decimals, total_swaps, pool_count, is_core FROM tokens WHERE LOWER(address) = LOWER(?) ORDER BY total_swaps DESC'
                    ).all( address )

                    db.close()

                    struct['data'] = {
                        address: address.toLowerCase(),
                        totalResults: rows.length,
                        tokens: rows
                    }
                    struct['status'] = true
                } catch( e ) {
                    struct['status'] = false
                    struct['messages'].push( `Token search error: ${e.message}` )
                }

                return { struct }
            }
        },
        getChainStats: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const dbPath = __dbPath
                    const db = new Database( dbPath, { readonly: true } )

                    const chainStats = db.prepare(
                        'SELECT chain, COUNT(*) as tokenCount FROM tokens GROUP BY chain ORDER BY tokenCount DESC'
                    ).all()

                    const totalTokens = db.prepare( 'SELECT COUNT(*) as count FROM tokens' ).get().count
                    const uniqueSymbols = db.prepare( 'SELECT COUNT(DISTINCT symbol) as count FROM tokens' ).get().count

                    db.close()

                    struct['data'] = {
                        totalTokens,
                        uniqueSymbols,
                        totalChains: chainStats.length,
                        chains: chainStats
                    }
                    struct['status'] = true
                } catch( e ) {
                    struct['status'] = false
                    struct['messages'].push( `Stats error: ${e.message}` )
                }

                return { struct }
            }
        }
    }
}
