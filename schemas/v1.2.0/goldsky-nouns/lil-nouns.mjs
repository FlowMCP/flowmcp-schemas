const schema = {
    namespace: "goldskyLilNouns",
    name: "Lil Nouns Subgraph",
    description: "Fetches proposal data from the Lil Nouns subgraph hosted on Goldsky.",
    docs: ["https://lilnouns.wtf", "https://docs.goldsky.com"],
    tags: ["production", "data", "api"],
    flowMCP: "1.2.0",
    root: "https://api.goldsky.com/api/public/project_cldjvjgtylso13swq3dre13sf/subgraphs/lil-nouns-subgraph/1.0.6/gn",
    requiredServerParams: [],
    headers: { "Content-Type": "application/json" },
    routes: {
        getProposals: {
            requestMethod: "POST",
            description: "Retrieves the first 1000 proposals ordered by createdBlock in ascending order.",
            route: "/",
            parameters: [],
            tests: [
                { _description: "Fetch first 1000 proposals from Lil Nouns subgraph" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetProposalsQuery" }
            ]
        },
        getProposalById: {
            requestMethod: "POST",
            description: "Fetch a single proposal by its numeric ID.",
            route: "/",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["regex(^\\\\d+$)"] } }
            ],
            tests: [
                { _description: "Fetch proposal with ID 327", id: "327" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGetProposalByIdQuery" }
            ]
        }
    },
    handlers: {
        buildGetProposalsQuery: async ({ struct, payload }) => {
            payload.url = payload.url.replace(/\/$/, '');
            payload.body = {
                variables: {},
                query: `{
  proposals(first: 1000, orderBy: createdTimestamp, orderDirection: desc) {
    id
    title
    status
    forVotes
    againstVotes
    abstainVotes
    createdTimestamp
    startBlock
    endBlock
    proposer {
      id
    }
    __typename
  }
}`
            };
            return { struct, payload };
        },
        buildGetProposalByIdQuery: async ({ struct, payload, userParams }) => {
            const { id } = userParams;
            payload.url = payload.url.replace(/\/$/, '');
            payload.body = {
                variables: { id },
                query: `query GetProposalById($id: String!) {
  proposal(id: $id) {
    id
    title
    description
    status
    quorumVotes
    forVotes
    againstVotes
    abstainVotes
    createdTimestamp
    startBlock
    endBlock
    proposer {
      id
      __typename
    }
    __typename
  }
}`
            };
            return { struct, payload };
        }
    }
};

export { schema };