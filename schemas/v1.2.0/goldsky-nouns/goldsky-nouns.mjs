const schema = {
    namespace: "goldskyNouns",
    name: "Nouns DAO Subgraph",
    description: "Query Nouns DAO governance data from the Goldsky subgraph — proposals, candidate proposals, auctions, individual Noun details, top delegates, and active proposers.",
    docs: ["https://docs.goldsky.com", "https://nouns.wtf"],
    tags: ["production", "dao", "governance", "nft", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/prod/gn",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
        getRecentProposals: {
            requestMethod: "POST",
            description: "Retrieve recent proposals with detailed voting information via Goldsky. Returns structured JSON response data.",
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
            description: "Get current and recent auction data with bid information via Goldsky. Returns structured JSON response data.",
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
            description: "Get detailed Noun information including traits, owner, and voting history. Required: nounId.",
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
            description: "Get delegates with the highest voting power in the Nouns DAO. Returns structured JSON response data.",
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
        },
        getCandidateProposals: {
            requestMethod: "POST",
            description: "Retrieve up to 1000 candidate proposals from the subgraph via Goldsky. Returns structured JSON response data.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "default(1000)"] } }
            ],
            tests: [
                { _description: "Fetch candidate proposals", first: 1000 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetCandidateProposals" }
            ]
        },
        getActivePendingUpdatableProposers: {
            requestMethod: "POST",
            description: "Get proposers with ACTIVE or PENDING proposals where endBlock is still in the future.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "default(1000)"] } },
            ],
            tests: [
                { _description: "Fetch active and pending proposals", first: 1000 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetActivePendingUpdatableProposers" }
            ]
        },
        getLatestAuctions: {
            requestMethod: "POST",
            description: "Fetch up to 1000 latest auctions and their bid data via Goldsky. Returns structured JSON response data.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "default(1000)"] } },
                { position: { key: "skip", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["default(0)"] } }
            ],
            tests: [
                { _description: "Fetch 1000 latest auctions", first: 1000, skip: 0 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetLatestAuctions" }
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
        },
        buildGetCandidateProposals: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            payload.url = payload.url.replace(/\/$/, '');
            payload.body = {
                operationName: "GetCandidateProposals",
                variables: { first },
                query: `query GetCandidateProposals($first: Int!) {
  proposalCandidates(first: $first) {
    id
    slug
    proposer
    lastUpdatedTimestamp
    createdTransactionHash
    canceled
    versions {
      content { title __typename }
      __typename
    }
    latestVersion {
      content {
        title
        description
        targets
        values
        signatures
        calldatas
        encodedProposalHash
        proposalIdToUpdate
        contentSignatures {
          id
          signer {
            id
            proposals { id __typename }
            __typename
          }
          sig
          expirationTimestamp
          canceled
          reason
          __typename
        }
        matchingProposalIds
        __typename
      }
      __typename
    }
    __typename
  }
}`
            };
            return { struct, payload };
        },
        buildGetActivePendingUpdatableProposers: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            payload.url = payload.url.replace(/\/$/, '');
            payload.body = {
                operationName: "GetActivePendingUpdatableProposers",
                variables: { first },
                query: `query GetActivePendingUpdatableProposers($first: Int!) {
  proposals(
    first: $first
    where: {
      status_in: [ACTIVE, PENDING]
    }
  ) {
    id
    title
    status
    proposer { id __typename }
    __typename
  }
}`
            };
            return { struct, payload };
        },
        buildGetLatestAuctions: async ({ struct, payload, userParams }) => {
            const { first, skip } = userParams;
            payload.url = payload.url.replace(/\/$/, '');
            payload.body = {
                variables: { first, skip },
                query: `query GetLatestAuctions($first: Int = 1000, $skip: Int = 0) {
  auctions(orderBy: startTime, orderDirection: desc, first: $first, skip: $skip) {
    id
    amount
    settled
    bidder { id }
    startTime
    endTime
    noun {
      id
      owner { id }
    }
    bids {
      id
      amount
      blockNumber
      blockTimestamp
      txHash
      txIndex
      bidder { id }
    }
  }
}`
            };
            return { struct, payload };
        }
    }
};


export { schema };