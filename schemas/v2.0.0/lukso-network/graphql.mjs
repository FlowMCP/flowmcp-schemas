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
            ]
        },
        fectchLuksoExplorer: {
            method: 'POST',
            path: '/v1/graphql',
            description: 'Run a raw GraphQL query on a lukso explorer via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ]
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
