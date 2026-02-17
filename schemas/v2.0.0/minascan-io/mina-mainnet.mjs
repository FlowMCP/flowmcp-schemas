// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "minascanMainnet" -> "minascanmainnet"

export const main = {
    namespace: 'minascanmainnet',
    name: 'MinaScan Mainnet GraphQL API',
    description: 'Access Mina Protocol mainnet blockchain data through MinaScan\'s GraphQL endpoint.',
    version: '2.0.0',
    docs: ['https://api.minascan.io', 'https://minaprotocol.com'],
    tags: ['production', 'blockchain', 'explorer', 'mina', 'cacheTtlDaily'],
    root: 'https://api.minascan.io/node/mainnet/v1/graphql',
    headers: {
        'Content-Type': 'application/json'
    },
    routes: {
        getMinaMainnetSchema: {
            method: 'POST',
            path: '/',
            description: 'Get the complete GraphQL schema structure from MinaScan mainnet endpoint. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch MinaScan mainnet GraphQL schema introspection', query: '{ __schema { queryType { name } } }' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { __schema: { type: 'object', properties: { queryType: { type: 'object' } } } } }
                    }
                }
            },
        },
        getMinaMainnetQuery: {
            method: 'POST',
            path: '/',
            description: 'Execute a custom GraphQL query against the MinaScan mainnet endpoint. Required: query.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get mainnet sync status',
                    query: '{ syncStatus daemonStatus { chainId blockchainLength uptimeSecs stateHash } }'
                },
                {
                    _description: 'Get mainnet best chain blocks',
                    query: '{ bestChain(maxLength: 3) { stateHash protocolState { consensusState { blockHeight } } } }'
                },
                { _description: 'Get mainnet genesis constants', query: '{ genesisConstants { accountCreationFee coinbase } }' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { syncStatus: { type: 'string' }, daemonStatus: { type: 'object', properties: { chainId: { type: 'string' }, blockchainLength: { type: 'number' }, uptimeSecs: { type: 'number' }, stateHash: { type: 'string' } } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getMinaMainnetSchema: {
        preRequest: async ( { struct, payload } ) => {
            struct.body = {
            query: `query IntrospectionQuery {
            __schema {
            queryType {
            name
            fields {
            name
            description
            type {
            name
            kind
            ofType {
            name
            kind
            }
            }
            args {
            name
            description
            type {
            name
            kind
            ofType {
            name
            kind
            }
            }
            defaultValue
            }
            }
            }
            types {
            kind
            name
            description
            fields {
            name
            description
            type {
            name
            kind
            ofType {
            name
            kind
            }
            }
            }
            }
            }
            }`
            };
            return { struct }
        }
    },
    getMinaMainnetQuery: {
        preRequest: async ( { struct, payload } ) => {
            const { query } = payload;
            struct.body = {
            query: query
            };
            return { struct }
        }
    }
} )
