// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"

export const main = {
    namespace: 'luksonetwork',
    name: 'LuksoMainnetSubgraph',
    description: 'Query the LUKSO Mainnet blockchain via GraphQL — introspect the schema and run custom queries against the LUKSO subgraph explorer.',
    version: '2.0.0',
    docs: ['https://explorer.execution.testnet.lukso.network/graphiql', 'https://explorer.execution.mainnet.lukso.network/graphiql'],
    tags: ['lukso', 'graphql', 'explorer', 'cacheTtlDaily'],
    root: 'https://explorer.execution.mainnet.lukso.network/api',
    routes: {
        getLuksoExplorerSchema: {
            method: 'POST',
            path: '/v1/graphql',
            description: 'Execute a GraphQL query against the LUKSO mainnet subgraph via LUKSO BlockScout.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Simple entity fetch', query: 'query { _meta { block { number } } }' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        errors: { type: 'array', items: { type: 'object', properties: { message: { type: 'string' }, locations: { type: 'array', items: { type: 'object' } } } } }
                    }
                }
            },
        },
        fectchLuksoExplorer: {
            method: 'POST',
            path: '/v1/graphql',
            description: 'Run a raw GraphQL query on a lukso explorer via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Sample query for entity data',
                    query: 'query { transaction(hash: "0x4bfc02eff230de3ae789102369bc302569ed23822f9cb253af9020851e7766ac") { hash fromAddressHash toAddressHash value gasUsed status blockNumber } }'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { transaction: { type: 'object', properties: { blockNumber: { type: 'number' }, fromAddressHash: { type: 'string' }, gasUsed: { type: 'string' }, hash: { type: 'string' }, status: { type: 'string' }, toAddressHash: { type: 'string' }, value: { type: 'string' } } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getLuksoExplorerSchema: {
        preRequest: async ( { struct, payload } ) => {
            const query = `
            query IntrospectionQuery {
            __schema {
            types {
            name
            kind
            fields {
            name
            }
            }
            }
            }
            `
            struct['body'] = { query }
            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct?.data?.data || {};
            if (!data.__schema) {
            struct.status = false
            struct.messages = ["No schema returned."];
            } else {
            struct.status = true;
            response = data.__schema;
            }
            return { response }
        }
    },
    fectchLuksoExplorer: {
        postRequest: async ( { response, struct, payload } ) => {
            if( response?.errors ) {
            struct.status = false
            struct.messages = response?.errors.map(e => e.message)
            }

            return { response }
        }
    }
} )
