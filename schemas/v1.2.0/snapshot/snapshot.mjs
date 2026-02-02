const schema = {
    namespace: "snapshot",
    name: "Snapshot DAO Proposals",
    description: "Query the Snapshot governance protocol via GraphQL — list DAO spaces, browse proposals, and retrieve detailed proposal information including votes and outcomes.",
    docs: ["https://docs.snapshot.org/"],
    tags: ["dao", "governance", "voting", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://hub.snapshot.org/graphql",
    requiredServerParams: [],
    headers: { "content-type": "application/json" },
    routes: {
        listSpaces: {
            requestMethod: "POST",
            description: "Fetch a list of available Snapshot spaces. Returns structured JSON response data.",
            route: "/",
            parameters: [
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } }
            ],
            tests: [ { _description: "Test list of Snapshot spaces", first: 10 } ],
            modifiers: [ { phase: "pre", handlerName: "buildListSpaces" } ]
        },
        listProposals: {
            requestMethod: "POST",
            description: "Fetch recent proposals for a given Snapshot space. Returns structured JSON response data.",
            route: "/",
            parameters: [
                { position: { key: "space", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "first", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } }
            ],
            tests: [ { _description: "Fetch proposals for ENS space", space: "ens.eth", first: 10 } ],
            modifiers: [ { phase: "pre", handlerName: "buildListProposals" } ]
        },
        getProposalDetails: {
            requestMethod: "POST",
            description: "Fetch detailed information for a specific proposal via Snapshot. Returns structured JSON response data.",
            route: "/",
            parameters: [
                { position: { key: "proposalId", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [ { _description: "Fetch proposal details for a known proposal ID", proposalId: "0x123abc456def" } ],
            modifiers: [ { phase: "pre", handlerName: "buildGetProposalDetails" } ]
        }
    },
    handlers: {
        buildListSpaces: async ({ struct, payload, userParams }) => {
            const { first } = userParams;
            payload.body = {
                query: `query Spaces($first: Int!) {
  spaces(first: $first, orderBy: "created", orderDirection: desc) {
    id
    name
    about
    network
    admins
    members
    proposalsCount
    followersCount
  }
}`,
                variables: { first }
            };
            return { struct, payload };
        },
        buildListProposals: async ({ struct, payload, userParams }) => {
            const { space, first } = userParams;
            payload.body = {
                query: `query Proposals($space: String!, $first: Int!) {
  proposals(first: $first, orderBy: "created", orderDirection: desc, where: { space: $space }) {
    id
    title
    body
    state
    created
    end
    choices
    scores
    votes
    author
    space {
      id
      name
    }
  }
}`,
                variables: { space, first }
            };
            return { struct, payload };
        },
        buildGetProposalDetails: async ({ struct, payload, userParams }) => {
            const { proposalId } = userParams;
            payload.body = {
                query: `query Proposal($id: String!) {
  proposal(id: $id) {
    id
    title
    body
    state
    created
    end
    choices
    scores
    votes
    author
    space {
      id
      name
    }
    strategies {
      name
      params
    }
  }
}`,
                variables: { id: proposalId }
            };
            return { struct, payload };
        }
    }
};


export { schema };