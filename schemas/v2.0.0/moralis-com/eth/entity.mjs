// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'moralis',
    name: 'Moralis entity API',
    description: 'Retrieve entity classification categories from Moralis for categorizing wallet addresses and on-chain entities across EVM chains.',
    version: '2.0.0',
    docs: ['https://docs.moralis.com'],
    tags: ['evm', 'identity', 'entities', 'cacheTtlDaily'],
    root: 'https://deep-index.moralis.io/api/v2.2',
    requiredServerParams: ['MORALIS_API_KEY'],
    headers: {
        'X-API-Key': '{{MORALIS_API_KEY}}'
    },
    routes: {
        '/entities/categories': {
            method: 'GET',
            path: '/entities/categories',
            description: 'Get Entity Categories via Moralis. Supports limit filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ]
        }
    }
}
