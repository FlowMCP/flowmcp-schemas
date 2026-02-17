// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "goldskyLilNouns" -> "goldskylilnouns"

export const main = {
    namespace: 'goldskylilnouns',
    name: 'Lil Nouns Subgraph',
    description: 'Fetch governance proposal data from the Lil Nouns DAO subgraph on Goldsky — list all proposals or retrieve a specific proposal by ID with vote details.',
    version: '2.0.0',
    docs: ['https://lilnouns.wtf', 'https://docs.goldsky.com'],
    tags: ['production', 'data', 'api', 'cacheTtlDaily'],
    root: 'https://api.goldsky.com/api/public/project_cldjvjgtylso13swq3dre13sf/subgraphs/lil-nouns-subgraph/1.0.6/gn',
    headers: {
        'Content-Type': 'application/json'
    },
    routes: {
        getProposals: {
            method: 'POST',
            path: '/',
            description: 'Retrieves the first 1000 proposals ordered by createdBlock in ascending order. via Goldsky.',
            parameters: []
        },
        getProposalById: {
            method: 'POST',
            path: '/',
            description: 'Fetch a single proposal by its numeric ID via Goldsky. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['regex(^\\\\d+$)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getProposals: {
        preRequest: async ( { struct, payload } ) => {
            struct.url = struct.url.replace(/\/$/, '');
            struct.body = {
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
            return { struct }
        }
    },
    getProposalById: {
        preRequest: async ( { struct, payload } ) => {
            const { id } = payload;
            struct.url = struct.url.replace(/\/$/, '');
            struct.body = {
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
            return { struct }
        }
    }
} )
