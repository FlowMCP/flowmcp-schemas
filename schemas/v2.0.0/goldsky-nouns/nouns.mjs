// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "goldskyNouns" -> "goldskynouns"

export const main = {
    namespace: 'goldskynouns',
    name: 'Nouns DAO Subgraph',
    description: 'Query Nouns DAO candidate proposals and auction data from the Goldsky subgraph — pending proposals, active proposers, and latest auction bids.',
    version: '2.0.0',
    docs: ['https://docs.goldsky.com', 'https://nouns.wtf'],
    tags: ['production', 'dao', 'governance', 'nft', 'cacheTtlDaily'],
    root: 'https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/prod/gn',
    headers: {
        'Content-Type': 'application/json'
    },
    routes: {
        getCandidateProposals: {
            method: 'POST',
            path: '/',
            description: 'Retrieve up to 1000 candidate proposals from the subgraph via Goldsky. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'default(1000)'] } }
            ],
            tests: [
                { _description: 'Fetch candidate proposals', first: 1000 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { proposalCandidates: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, slug: { type: 'string' }, proposer: { type: 'string' }, lastUpdatedTimestamp: { type: 'string' }, canceled: { type: 'boolean' }, versions: { type: 'array', items: { type: 'object' } }, latestVersion: { type: 'object' } } } } } }
                    }
                }
            },
        },
        getActivePendingUpdatableProposers: {
            method: 'POST',
            path: '/',
            description: 'Get proposers with ACTIVE or PENDING proposals where endBlock is still in the future.',
            parameters: [
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'default(1000)'] } }
            ],
            tests: [
                { _description: 'Fetch active and pending proposals', first: 1000 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { proposals: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, status: { type: 'string' }, proposer: { type: 'object', properties: { id: { type: 'string' } } } } } } } }
                    }
                }
            },
        },
        getLatestAuctions: {
            method: 'POST',
            path: '/',
            description: 'Fetch up to 1000 latest auctions and their bid data via Goldsky. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'default(1000)'] } },
                { position: { key: 'skip', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['default(0)'] } }
            ],
            tests: [
                { _description: 'Fetch 1000 latest auctions', first: 1000, skip: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { auctions: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, amount: { type: 'string' }, settled: { type: 'boolean' }, bidder: { type: 'object', properties: { id: { type: 'string' } } }, startTime: { type: 'string' }, endTime: { type: 'string' }, noun: { type: 'object', properties: { id: { type: 'string' }, owner: { type: 'object', properties: { id: { type: 'string' } } } } }, bids: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, amount: { type: 'string' }, blockNumber: { type: 'string' }, blockTimestamp: { type: 'string' }, txHash: { type: 'string' }, bidder: { type: 'object', properties: { id: { type: 'string' } } } } } } } } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getCandidateProposals: {
        preRequest: async ( { struct, payload } ) => {
            const { first } = payload;
            struct.url = struct.url.replace(/\/$/, '');
            struct.body = {
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
            return { struct }
        }
    },
    getActivePendingUpdatableProposers: {
        preRequest: async ( { struct, payload } ) => {
            const { first } = payload;
            struct.url = struct.url.replace(/\/$/, '');
            struct.body = {
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
            return { struct }
        }
    },
    getLatestAuctions: {
        preRequest: async ( { struct, payload } ) => {
            const { first, skip } = payload;
            struct.url = struct.url.replace(/\/$/, '');
            struct.body = {
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
            return { struct }
        }
    }
} )
