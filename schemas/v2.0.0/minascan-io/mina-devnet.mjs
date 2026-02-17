// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "minascanDevnet" -> "minascandevnet"

export const main = {
    namespace: 'minascandevnet',
    name: 'MinaScan Devnet GraphQL API',
    description: 'Access Mina Protocol devnet blockchain data through MinaScan\'s GraphQL endpoint.',
    version: '2.0.0',
    docs: ['https://api.minascan.io', 'https://minaprotocol.com'],
    tags: ['production', 'blockchain', 'explorer', 'mina', 'cacheTtlDaily'],
    root: 'https://api.minascan.io/node/devnet/v1/graphql',
    headers: {
        'Content-Type': 'application/json'
    },
    routes: {
        getMinaDevnetSchema: {
            method: 'POST',
            path: '/',
            description: 'Get the complete GraphQL schema structure from MinaScan devnet endpoint. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Fetch MinaScan devnet GraphQL schema introspection', query: '{ __schema { queryType { name } } }' }
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
        getMinaDevnetQuery: {
            method: 'POST',
            path: '/',
            description: 'Execute a custom GraphQL query against the MinaScan devnet endpoint. Required: query.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Get network sync status',
                    query: '{ syncStatus daemonStatus { chainId blockchainLength uptimeSecs stateHash } }'
                },
                {
                    _description: 'Get best chain blocks',
                    query: '{ bestChain(maxLength: 3) { stateHash protocolState { consensusState { blockHeight } } } }'
                }
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
    getMinaDevnetSchema: {
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
    getMinaDevnetQuery: {
        preRequest: async ( { struct, payload } ) => {
            const { query } = payload;
            struct.body = {
            query: query
            };
            return { struct }
        }
    }
} )
