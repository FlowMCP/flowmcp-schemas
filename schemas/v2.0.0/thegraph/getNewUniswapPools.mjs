// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { EVM_CHAINS } from '../_shared/evmChains.mjs'
// Module-level code: 13 lines

export const main = {
    namespace: 'thegraph',
    name: 'UniswapPools',
    description: 'Fetch recently created Uniswap V3 trading pools across multiple blockchains via The Graph — discover new liquidity pools with token pairs and creation timestamps.',
    version: '2.0.0',
    docs: ['https://thegraph.com/docs/en/'],
    tags: ['defi', 'uniswap', 'graphql', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'evmChains', version: '2.0.0' }
    ],
    root: 'https://gateway.thegraph.com',
    requiredServerParams: ['THEGRAPH_API_KEY'],
    headers: {
        Authorization: 'Bearer {{THEGRAPH_API_KEY}}'
    },
    routes: {
        getNewPools: {
            method: 'POST',
            path: '/api/{{THEGRAPH_API_KEY}}/subgraphs/id/--subgraph-id--',
            description: 'List new Uniswap V3 pools by chain and order criteria within a time range. Required: chain, orderBy, time_range_seconds, limit.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ETHEREUM_MAINNET,BASE_MAINNET,OPTIMISM_MAINNET,ARBITRUM_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_MAINNET,CELO_MAINNET,BLAST_MAINNET)', options: ['default(ETHEREUM_MAINNET)'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(timestamp,txcount,volume,tvl)', options: ['default(timestamp)'] } },
                { position: { key: 'time_range_seconds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(60)', 'max(86400)', 'default(300)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(100)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object',properties:{pools:{type:'array',items:{type:'object',properties:{id:{type:'string'},token0:{type:'object'},token1:{type:'object'},feeTier:{type:'string'}}}}}}}}},
            tests: [
                {
                    _description: 'Fetch most recent pools on Optimism ordered by volume',
                    chain: 'OPTIMISM_MAINNET',
                    orderBy: 'volume',
                    time_range_seconds: 70777,
                    limit: 567
                }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const EVM_CHAINS = sharedLists['evmChains']

    const theGraphChains = EVM_CHAINS
        .filter( ( c ) => c.theGraphSlug !== undefined )
    const aliasToSlug = theGraphChains
        .reduce( ( acc, c ) => {
            acc[ c.alias ] = c.theGraphSlug
            return acc
        }, {} )
    const poolChainAliases = [
        'ETHEREUM_MAINNET', 'BASE_MAINNET', 'OPTIMISM_MAINNET',
        'ARBITRUM_MAINNET', 'POLYGON_MAINNET', 'BINANCE_MAINNET',
        'AVALANCHE_MAINNET', 'CELO_MAINNET', 'BLAST_MAINNET'
    ]
    const poolChainEnum = 'enum(' + poolChainAliases.join( ',' ) + ')'

    return {
        getNewPools: {
            preRequest: async ( { struct, payload } ) => {
                const SUBGRAPH_URLS = {
                ethereum: `5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
                base: `GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz`,
                optimism: `Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj`,
                arbitrum: `FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM`,
                polygon: `3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm`,
                bsc: `A1fvJWQLBeUAggX2WQTMm3FKjXTekNXo77ZySun4YN2m`,
                avalanche: `GVH9h9KZ9CqheUEL93qMbq7QwgoBu32QXQDPR6bev4Eo`,
                celo: `ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4`,
                blast: `2LHovKznvo8YmKC9ZprPjsYAZDCc4K5q4AYz8s3cnQn1`
                }

                const { chain, orderBy, time_range_seconds, limit } = payload
                struct['url'] = struct['url'].replace(
                '--subgraph-id--',
                SUBGRAPH_URLS[ chain ]
                )

                const ORDER_BY_OPTIONS = {
                'timestamp': "createdAtTimestamp",
                'txcount': "txCount",
                'volume': "volumeUSD",
                'tvl': "totalValueLockedUSD"
                }

                const timestamp = Math.floor( Date.now() / 1000 ) - time_range_seconds
                const orderField = ORDER_BY_OPTIONS[ orderBy ]
                const query = `
                query RecentPools($timestamp: BigInt!, $limit: Int!) {
                pools(
                where: { createdAtTimestamp_gt: $timestamp }
                orderBy: ${orderField}
                orderDirection: desc
                first: $limit
                ) {
                id
                token0 { symbol }
                token1 { symbol }
                createdAtTimestamp
                createdAtBlockNumber
                txCount
                volumeUSD
                totalValueLockedUSD
                }
                }
                `

                const variables = {
                'timestamp': String(timestamp),
                limit
                }
                struct['body'] = { query, variables }


                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const { time_range_seconds, limit } = payload
                const mins = Math.floor(time_range_seconds / 60)
                const { data } = struct
                const pools = data.data?.pools || []

                if( Array.isArray( data.errors ) ) {
                throw new Error( ...data.errors.map( error => error.message ) )
                }

                if( !pools.length ) {
                throw new Error( `No pools created in the last ${mins} minutes.` )
                }

                let output = `Newly Created Trading Pools (Last ${mins} Minutes, Limit: ${limit}):\n\n`
                for( const pool of pools ) {
                const createdAt = new Date( pool.createdAtTimestamp * 1000 )
                .toISOString()
                .replace( "T", " " )
                .split( "." )[ 0 ]
                const volume = parseFloat( pool.volumeUSD ).toFixed( 2 )
                const tvl = parseFloat( pool.totalValueLockedUSD ).toFixed( 2 )

                output += `Pool Address: ${pool.id}
                Tokens: ${pool.token0.symbol}/${pool.token1.symbol}
                Created At: ${createdAt}
                Block: ${pool.createdAtBlockNumber}
                Tx Count: ${pool.txCount}
                Volume (USD): $${volume}
                TVL (USD): $${tvl}\n\n`;
                }
                response = output

                return { response }
            }
        }
    }
}
