const schema = {
    namespace: "goldskyNouns",
    name: "Nouns DAO Subgraph",
    description: "Access various views into Nouns DAO data from the Goldsky-hosted subgraph.",
    docs: ["https://docs.goldsky.com", "https://nouns.wtf"],
    tags: ["production", "dao", "governance", "nft"],
    flowMCP: "1.2.0",
    root: "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/prod/gn",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
        getRecentProposals: {
            requestMethod: "POST",
            description: "Retrieve recent proposals with detailed voting information.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } }
            ],
            tests: [
                { _description: "Fetch recent proposals", first: 10 },
                { _description: "Fetch 5 proposals", first: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetRecentProposals" }
            ]
        },
        getCurrentAuctions: {
            requestMethod: "POST",
            description: "Get current and recent auction data with bid information.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(5)"] } }
            ],
            tests: [
                { _description: "Fetch recent auctions", first: 5 },
                { _description: "Fetch 3 auctions", first: 3 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetCurrentAuctions" }
            ]
        },
        getNounDetails: {
            requestMethod: "POST",
            description: "Get detailed Noun information including traits, owner, and voting history.",
            route: "/",
            parameters: [
                { position: { key: "nounId", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get details for Noun #1", nounId: "1" },
                { _description: "Get details for Noun #100", nounId: "100" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetNounDetails" }
            ]
        },
        getTopDelegates: {
            requestMethod: "POST",
            description: "Get delegates with the highest voting power in the Nouns DAO.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(10)"] } }
            ],
            tests: [
                { _description: "Get top 10 delegates", first: 10 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetTopDelegates" }
            ]
        }
    },
    handlers: {
        buildGetRecentProposals: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            
            // Remove trailing slash from URL
            payload.url = payload.url.replace(/\/$/, '');
            
            const query = `
                query GetRecentProposals($first: Int!) {
                    proposals(first: $first, orderBy: createdTimestamp, orderDirection: desc) {
                        id
                        title
                        description
                        status
                        createdTimestamp
                        proposer {
                            id
                        }
                        forVotes
                        againstVotes
                        abstainVotes
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { first } 
            };
            
            return { struct, payload };
        },
        
        buildGetCurrentAuctions: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            
            // Remove trailing slash from URL
            payload.url = payload.url.replace(/\/$/, '');
            
            const query = `
                query GetCurrentAuctions($first: Int!) {
                    auctions(first: $first, orderBy: startTime, orderDirection: desc) {
                        id
                        noun {
                            id
                        }
                        amount
                        startTime
                        endTime
                        bidder {
                            id
                        }
                        settled
                        bids(first: 5, orderBy: amount, orderDirection: desc) {
                            id
                            amount
                            bidder {
                                id
                            }
                            blockTimestamp
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
        
        buildGetNounDetails: async ({ struct, payload, userParams }) => {
            const { nounId } = userParams;
            
            // Remove trailing slash from URL
            payload.url = payload.url.replace(/\/$/, '');
            
            const query = `
                query GetNounDetails($nounId: String!) {
                    noun(id: $nounId) {
                        id
                        owner {
                            id
                        }
                        seed {
                            background
                            body
                            accessory
                            head
                            glasses
                        }
                        votes(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
                            id
                            support
                            votes
                            proposal {
                                id
                                title
                            }
                        }
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { nounId } 
            };
            
            return { struct, payload };
        },
        
        buildGetTopDelegates: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            
            // Remove trailing slash from URL
            payload.url = payload.url.replace(/\/$/, '');
            
            const query = `
                query GetTopDelegates($first: Int!) {
                    delegates(first: $first, orderBy: delegatedVotes, orderDirection: desc) {
                        id
                        delegatedVotes
                        tokenHoldersRepresentedAmount
                        proposals(first: 3) {
                            id
                            title
                        }
                        votes(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
                            id
                            support
                            proposal {
                                id
                                title
                            }
                        }
                    }
                }
            `;
            
            payload.body = { 
                query, 
                variables: { first } 
            };
            
            return { struct, payload };
        }
    }
};


export { schema };