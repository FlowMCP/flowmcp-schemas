const schema = {
    namespace: "aave",
    name: "AAVE Protocol API",
    description: "Fetch and analyze liquidity and account data from AAVE v3 via The Graph subgraph",
    docs: ["https://thegraph.com/explorer/subgraphs/aave/protocol-v3", "https://docs.aave.com/developers/"],
    tags: ["defi", "lending", "protocol"],
    flowMCP: "1.2.0",
    root: "https://gateway.thegraph.com",
    requiredServerParams: ["THEGRAPH_API_KEY"],
    headers: { Authorization: "Bearer {{THEGRAPH_API_KEY}}" },
    routes: {
        getReserves: {
            requestMethod: "POST",
            description: "Returns AAVE reserves data including symbols, liquidity, rates, and timestamps from Ethereum mainnet.",
            route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)"] } }
            ],
            tests: [
                { _description: "Fetch top 20 AAVE reserves", first: 20 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildReservesQuery" }
            ]
        },
        getUserData: {
            requestMethod: "POST",
            description: "Fetches user-specific reserve data like debt and balances from AAVE subgraph. Required: userAddress, first.",
            route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g",
            parameters: [
                { position: { key: "userAddress", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["length(42)"] } },
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(10)"] } }
            ],
            tests: [
                { _description: "Get user reserves data", userAddress: "0x1234567890abcdef1234567890abcdef12345678", first: 10 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildUserDataQuery" }
            ]
        },
        getProtocolData: {
            requestMethod: "POST",
            description: "Get general AAVE protocol statistics and market overview. Returns structured JSON response data.",
            route: "/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g",
            parameters: [],
            tests: [
                { _description: "Get protocol statistics" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildProtocolDataQuery" }
            ]
        }
    },
    handlers: {
        buildReservesQuery: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            
            const query = `
                query GetReserves($first: Int!) {
                    reserves(first: $first, orderBy: totalLiquidity, orderDirection: desc) {
                        id
                        underlyingAsset
                        symbol
                        name
                        decimals
                        totalLiquidity
                        availableLiquidity
                        liquidityRate
                        variableBorrowRate
                        stableBorrowRate
                        lastUpdateTimestamp
                        price {
                            priceInEth
                        }
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { first } 
            };
            
            return { struct, payload };
        },
        
        buildUserDataQuery: async ({ struct, payload, userParams }) => {
            const { userAddress, first } = userParams;
            
            const query = `
                query GetUserData($userAddress: String!, $first: Int!) {
                    userReserves(where: { user: $userAddress }, first: $first) {
                        reserve {
                            symbol
                            underlyingAsset
                            liquidityRate
                            variableBorrowRate
                            stableBorrowRate
                        }
                        currentATokenBalance
                        currentTotalDebt
                        scaledVariableDebt
                        principalStableDebt
                        lastUpdateTimestamp
                    }
                    user(id: $userAddress) {
                        id
                        borrowedReservesCount
                        unclaimedRewards
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { userAddress: userAddress.toLowerCase(), first } 
            };
            
            return { struct, payload };
        },
        
        buildProtocolDataQuery: async ({ struct, payload }) => {
            const query = `
                query GetProtocolData {
                    protocol(id: "1") {
                        id
                        pools
                    }
                    reserves(first: 5, orderBy: totalLiquidity, orderDirection: desc) {
                        symbol
                        totalLiquidity
                        totalCurrentVariableDebt
                        utilizationRate
                    }
                }
            `;
            
            payload.body = { query };
            
            return { struct, payload };
        }
    }
};


export { schema };