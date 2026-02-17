// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'snapshot',
    name: 'Snapshot DAO Proposals',
    description: 'Query the Snapshot governance protocol via GraphQL — list DAO spaces, browse proposals, and retrieve detailed proposal information including votes and outcomes.',
    version: '2.0.0',
    docs: ['https://docs.snapshot.org/'],
    tags: ['dao', 'governance', 'voting', 'cacheTtlDaily'],
    root: 'https://hub.snapshot.org/graphql',
    headers: {
        'content-type': 'application/json'
    },
    routes: {
        listSpaces: {
            method: 'POST',
            path: '/',
            description: 'Fetch a list of available Snapshot spaces. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } }
            ]
        },
        listProposals: {
            method: 'POST',
            path: '/',
            description: 'Fetch recent proposals for a given Snapshot space. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'space', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)'] } }
            ]
        },
        getProposalDetails: {
            method: 'POST',
            path: '/',
            description: 'Fetch detailed information for a specific proposal via Snapshot. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'proposalId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    listSpaces: {
        preRequest: async ( { struct, payload } ) => {
            const { first } = payload;
            struct.body = {
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
            return { struct }
        }
    },
    listProposals: {
        preRequest: async ( { struct, payload } ) => {
            const { space, first } = payload;
            struct.body = {
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
            return { struct }
        }
    },
    getProposalDetails: {
        preRequest: async ( { struct, payload } ) => {
            const { proposalId } = payload;
            struct.body = {
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
            return { struct }
        }
    }
} )
