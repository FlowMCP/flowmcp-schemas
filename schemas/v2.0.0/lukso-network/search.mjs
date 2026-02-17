// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "luksoNetwork" -> "luksonetwork"

export const main = {
    namespace: 'luksonetwork',
    name: 'LUKSO BlockScout Search',
    description: 'Search the LUKSO blockchain via BlockScout — full-text search across addresses, transactions, blocks, and tokens with redirect support.',
    version: '2.0.0',
    docs: ['https://explorer.execution.mainnet.lukso.network/api-docs', 'https://explorer.execution.testnet.lukso.network/api-docs'],
    tags: ['lukso', 'search', 'explorer', 'cacheTtlDaily'],
    root: 'https://explorer.execution.--chain--.lukso.network/api/v2',
    routes: {
        search: {
            method: 'GET',
            path: '/search',
            description: 'Search across tokens, addresses, blocks and transactions via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'search_query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Search for USDT on mainnet', chainName: 'LUKSO_MAINNET', search_query: 'USDT' },
                { _description: 'Search for LYX on testnet', chainName: 'LUKSO_TESTNET', search_query: 'LYX' }
            ],
        },
        searchRedirect: {
            method: 'GET',
            path: '/search/check-redirect',
            description: 'Check if search redirects to a specific resource via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'search_query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Redirect check for USDT', chainName: 'LUKSO_MAINNET', search_query: 'USDT' },
                { _description: 'Redirect check for LYX', chainName: 'LUKSO_TESTNET', search_query: 'LYX' }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    search: {
        preRequest: async ( { struct, payload } ) => {
            const alias = {
            'LUKSO_MAINNET': 'mainnet',
            'LUKSO_TESTNET': 'testnet'
            }
            const { chainName } = payload
            const chain = alias[ chainName ]
            struct['url'] = struct['url']
            .replace( 'search_query=', 'q=' )
            .replace( '--chain--', chain )

            return { struct }
        }
    },
    searchRedirect: {
        preRequest: async ( { struct, payload } ) => {
            const alias = {
            'LUKSO_MAINNET': 'mainnet',
            'LUKSO_TESTNET': 'testnet'
            }
            const { chainName } = payload
            const chain = alias[ chainName ]
            struct['url'] = struct['url']
            .replace( 'search_query=', 'q=' )
            .replace( '--chain--', chain )

            return { struct }
        }
    }
} )
