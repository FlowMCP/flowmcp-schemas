const schema = {
    namespace: 'tally',
    name: 'Tally Governance API',
    description: 'Tally DAO governance API for proposals, delegates, voting power, and Governor contract data via GraphQL',
    docs: [ 'https://docs.tally.xyz/tally-features/welcome' ],
    tags: [ 'governance', 'dao', 'proposals', 'voting' , "cacheTtlDaily"],
    flowMCP: '1.2.0',
    root: 'https://api.tally.xyz',
    requiredServerParams: [ 'TALLY_API_KEY' ],
    headers: {
        'Api-Key': '{{TALLY_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        getChains: {
            requestMethod: 'POST',
            description: 'Get all supported blockchain networks for DAO governance on Tally. Returns structured JSON response data.',
            route: '/query',
            parameters: [
                { position: { key: 'query', value: '{ chains { id name mediumName shortName blockTime isTestnet nativeCurrency { name symbol decimals } } }', location: 'body' } }
            ],
            tests: [
                { _description: 'Get all supported chains' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getGovernors: {
            requestMethod: 'POST',
            description: 'Get Governor contracts (DAOs) by organization. Returns governance details, token info, and proposal stats.',
            route: '/query',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("{ governors(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 } }) { nodes { id name slug chainId token { name symbol decimals } proposalStats { total active } } pageInfo { firstCursor lastCursor } } }")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Uniswap governors' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getProposals: {
            requestMethod: 'POST',
            description: 'Get governance proposals with status, votes, and timeline. Filter by governor or organization.',
            route: '/query',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("{ proposals(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 }, sort: { isDescending: true } }) { nodes { id title status { active } governor { id name } proposer { address ens } voteStats { type votesCount votersCount percent } } pageInfo { firstCursor lastCursor } } }")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Uniswap proposals' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        },
        getDelegates: {
            requestMethod: 'POST',
            description: 'Get delegates and their voting power for a specific DAO. Supports filtering by address and sorting.',
            route: '/query',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("{ delegates(input: { filters: { organizationId: \\"uniswap\\" }, page: { limit: 10 }, sort: { sortBy: votes, isDescending: true } }) { nodes { account { address ens name bio } votesCount delegatorsCount } pageInfo { firstCursor lastCursor } } }")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get top Uniswap delegates' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'extractGraphQL' }
            ]
        }
    },
    handlers: {
        extractGraphQL: async ( { struct, payload } ) => {
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

            return { struct, payload }
        }
    }
}


export { schema }
