const schema = {
    namespace: "goldskyNouns",
    name: "Nouns DAO Subgraph",
    description: "Query Nouns DAO candidate proposals and auction data from the Goldsky subgraph — pending proposals, active proposers, and latest auction bids.",
    docs: ["https://docs.goldsky.com", "https://nouns.wtf"],
    tags: ["production", "dao", "governance", "nft", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/prod/gn",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
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