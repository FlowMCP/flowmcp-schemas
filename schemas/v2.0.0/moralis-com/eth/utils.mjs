// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'moralis',
    name: 'Moralis utils API',
    description: 'Moralis platform utility endpoints for API introspection. Check endpoint costs, rate limits, and the current Moralis Web3 API version.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'utilities', 'conversion', 'cacheTtlDaily'],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/info/endpointWeights': {
            method: 'GET',
            path: '/info/endpointWeights',
            description: 'Get the cost and rate limit for each API endpoint via Moralis. Returns structured JSON response data.',
            parameters: []
        },
        '/web3/version': {
            method: 'GET',
            path: '/web3/version',
            description: 'Get the current version of the Moralis Web3 API. Returns structured JSON response data.',
            parameters: []
        }
    }
}
