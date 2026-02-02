const schema = {
    namespace: "thegraph",
    name: "UniswapPools",
    description: "Fetch recently created Uniswap V3 trading pools across multiple blockchains via The Graph — discover new liquidity pools with token pairs and creation timestamps.",
    docs: ["https://thegraph.com/docs/en/"],
    tags: ["defi", "uniswap", "graphql", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://gateway.thegraph.com",
    requiredServerParams: ["THEGRAPH_API_KEY"],
    headers: {
      Authorization: "Bearer {{THEGRAPH_API_KEY}}"
    },
    routes: {
      getNewPools: {
        requestMethod: "POST",
        description: "List new Uniswap V3 pools by chain and order criteria within a time range. Required: chain, orderBy, time_range_seconds, limit.",
        route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/--subgraph-id--",
        parameters: [
          {
            position: { key: "chain", value: "{{USER_PARAM}}", location: "query" },
            z: {
              primitive: "enum(ethereum,base,optimism,arbitrum,polygon,bsc,avalanche,celo,blast)",
              options: [ "default(ethereum)"]
            }
          },
          {
            position: { key: "orderBy", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "enum(timestamp,txcount,volume,tvl)", options: ["default(timestamp)"] }
          },
          {
            position: { key: "time_range_seconds", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(60)", "max(86400)", "default(300)"] }
          },
          {
            position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
            z: { primitive: "number()", options: ["min(1)", "max(100)", "default(100)"] }
          }
        ],
        tests: [
          {
            _description: "Fetch most recent pools on Optimism ordered by volume",
            chain: "optimism",
            orderBy: "volume",
            time_range_seconds: 70777,
            limit: 567
          }
        ],
        modifiers: [
          { phase: "pre", handlerName: "setEnums" },
          { phase: "post", handlerName: "formatResult" }
        ]
      }
    },
    handlers: {
      setEnums: async( { struct, payload, userParams } ) => {

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

        const { chain, orderBy, time_range_seconds, limit } = userParams
        payload['url'] = payload['url'].replace( 
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
        payload['body'] = { query, variables }


        return { struct, payload }
      },
      formatResult: async( { struct, payload, userParams } ) => {
        const { time_range_seconds, limit } = userParams
        const mins = Math.floor(time_range_seconds / 60)
        const { data } = struct
        const pools = data.data?.pools || []

        if( Array.isArray( data.errors ) ) {
          struct['status'] = false
          struct['messages'].push( ...data.errors.map( error => error.message ) )
          return { struct, payload }
        }

        if( !pools.length ) { 
          struct['status'] = false
          struct['messages'].push( `No pools created in the last ${mins} minutes.` )
          return { struct, payload }
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
        struct['data'] = output

        return { struct, payload }
      }
    }
  }
  

export { schema }