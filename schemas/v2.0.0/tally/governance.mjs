// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'tally',
    name: 'Tally Governance API',
    description: 'Tally DAO governance API for proposals, delegates, voting power, and Governor contract data via GraphQL',
    version: '2.0.0',
    docs: ['https://docs.tally.xyz/tally-features/welcome'],
    tags: ['governance', 'dao', 'proposals', 'voting', 'cacheTtlDaily'],
    root: 'https://api.tally.xyz',
    requiredServerParams: ['TALLY_API_KEY'],
    headers: {
        'Api-Key': '{{TALLY_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        getChains: {
            method: 'POST',
            path: '/query',
            description: 'Get all supported blockchain networks for DAO governance on Tally. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all supported chains' }
            ],
        },
        getGovernors: {
            method: 'POST',
            path: '/query',
            description: 'Get Governor contracts (DAOs) by organization. Returns governance details, token info, and proposal stats.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("{ governors(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 } }) { nodes { id name slug chainId token { name symbol decimals } proposalStats { total active } } pageInfo { firstCursor lastCursor } } }")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get Uniswap governors' }
            ],
        },
        getProposals: {
            method: 'POST',
            path: '/query',
            description: 'Get governance proposals with status, votes, and timeline. Filter by governor or organization.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("{ proposals(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 }, sort: { isDescending: true } }) { nodes { id title status { active } governor { id name } proposer { address ens } voteStats { type votesCount votersCount percent } } pageInfo { firstCursor lastCursor } } }")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get Uniswap proposals' }
            ],
        },
        getDelegates: {
            method: 'POST',
            path: '/query',
            description: 'Get delegates and their voting power for a specific DAO. Supports filtering by address and sorting.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("{ delegates(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 }, sort: { sortBy: votes, isDescending: true } }) { nodes { account { address ens name bio } votesCount delegatorsCount } pageInfo { firstCursor lastCursor } } }")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get top Uniswap delegates' }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getChains: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'data' ] ) {
            struct[ 'data' ] = data[ 'data' ]
            }

            if( data[ 'errors' ] ) {
            struct[ 'status' ] = false
            const messages = data[ 'errors' ]
            .map( ( error ) => {
            const msg = error[ 'message' ]

            return msg
            } )
            struct[ 'messages' ] = messages
            }

            return { response }
        }
    },
    getGovernors: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'data' ] ) {
            struct[ 'data' ] = data[ 'data' ]
            }

            if( data[ 'errors' ] ) {
            struct[ 'status' ] = false
            const messages = data[ 'errors' ]
            .map( ( error ) => {
            const msg = error[ 'message' ]

            return msg
            } )
            struct[ 'messages' ] = messages
            }

            return { response }
        }
    },
    getProposals: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'data' ] ) {
            struct[ 'data' ] = data[ 'data' ]
            }

            if( data[ 'errors' ] ) {
            struct[ 'status' ] = false
            const messages = data[ 'errors' ]
            .map( ( error ) => {
            const msg = error[ 'message' ]

            return msg
            } )
            struct[ 'messages' ] = messages
            }

            return { response }
        }
    },
    getDelegates: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'data' ] ) {
            struct[ 'data' ] = data[ 'data' ]
            }

            if( data[ 'errors' ] ) {
            struct[ 'status' ] = false
            const messages = data[ 'errors' ]
            .map( ( error ) => {
            const msg = error[ 'message' ]

            return msg
            } )
            struct[ 'messages' ] = messages
            }

            return { response }
        }
    }
} )
