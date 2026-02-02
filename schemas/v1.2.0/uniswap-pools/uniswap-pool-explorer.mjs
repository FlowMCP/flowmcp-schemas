const schema = {
    namespace: "uniswap",
    name: "Uniswap Pool Explorer",
    description: "Query Uniswap V2, V3, and V4 pools for a given token address or pool ID using The Graph subgraphs.",
    docs: ["https://thegraph.com/explorer/subgraphs?id=A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum", "https://thegraph.com/explorer"],
    tags: ["production"],
    flowMCP: "1.2.0",
    root: "https://gateway.thegraph.com",
    requiredServerParams: ["THEGRAPH_API_KEY"],
    headers: { Authorization: "Bearer {{THEGRAPH_API_KEY}}" },
    routes: {
        getTokenPools: {
            requestMethod: "POST",
            description: "Returns Uniswap V3 pools for a given token address using TheGraph subgraph. Required: token_address, chain.",
            route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/--subgraph-id--",
            parameters: [
                { position: { key: "token_address", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(ethereum,arbitrum,optimism,polygon,base,bsc,celo)", options: ["default(ethereum)"] } }
            ],
            tests: [
                { _description: "Query USDC pools on Ethereum", token_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", chain: "ethereum" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildTokenPoolsQuery" }
            ]
        },
        getPoolData: {
            requestMethod: "POST",
            description: "Fetch details for a specific Uniswap pool by ID using TheGraph subgraph. Required: pool_id, chain.",
            route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/--subgraph-id--",
            parameters: [
                { position: { key: "pool_id", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "chain", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(ethereum,arbitrum,optimism,polygon,base,bsc,celo)", options: ["default(ethereum)"] } }
            ],
            tests: [
                { _description: "Get data for USDC/ETH pool", pool_id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8", chain: "ethereum" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildPoolDataQuery" }
            ]
        }
    },
    handlers: {
        buildTokenPoolsQuery: async ({ struct, payload, userParams }) => {
            const { token_address, chain } = userParams;
            
            // Uniswap V3 subgraph IDs for different chains
            const SUBGRAPH_IDS = {
                ethereum: "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
                arbitrum: "FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM", 
                optimism: "Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj",
                polygon: "3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm",
                base: "GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz",
                bsc: "A1fvJWQLBeUAggX2WQTMm3FKjXTekNXo77ZySun4YN2m",
                celo: "ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4"
            };
            
            payload.url = payload.url.replace('--subgraph-id--', SUBGRAPH_IDS[chain]);
            
            const query = `
                query GetTokenPools($tokenAddress: String!) {
                    pools(
                        where: {
                            or: [
                                { token0: $tokenAddress },
                                { token1: $tokenAddress }
                            ]
                        }
                        orderBy: volumeUSD
                        orderDirection: desc
                        first: 50
                    ) {
                        id
                        token0 { symbol id }
                        token1 { symbol id }
                        feeTier
                        volumeUSD
                        totalValueLockedUSD
                        txCount
                        createdAtTimestamp
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { tokenAddress: token_address.toLowerCase() } 
            };
            
            return { struct, payload };
        },
        
        buildPoolDataQuery: async ({ struct, payload, userParams }) => {
            const { pool_id, chain } = userParams;
            
            const SUBGRAPH_IDS = {
                ethereum: "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
                arbitrum: "FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM", 
                optimism: "Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj",
                polygon: "3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm",
                base: "GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz",
                bsc: "A1fvJWQLBeUAggX2WQTMm3FKjXTekNXo77ZySun4YN2m",
                celo: "ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4"
            };
            
            payload.url = payload.url.replace('--subgraph-id--', SUBGRAPH_IDS[chain]);
            
            const query = `
                query GetPoolData($poolId: String!) {
                    pool(id: $poolId) {
                        id
                        token0 { 
                            symbol 
                            id 
                            name 
                            decimals 
                        }
                        token1 { 
                            symbol 
                            id 
                            name 
                            decimals 
                        }
                        feeTier
                        volumeUSD
                        totalValueLockedUSD
                        txCount
                        createdAtTimestamp
                        createdAtBlockNumber
                        tick
                        sqrtPrice
                        liquidity
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { poolId: pool_id.toLowerCase() } 
            };
            
            return { struct, payload };
        }
    }
};

export { schema };