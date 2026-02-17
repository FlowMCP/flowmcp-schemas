// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'coincap',
    name: 'CoinCapRates',
    description: 'Access fiat and cryptocurrency conversion rates from CoinCap — list all available exchange rates or look up a specific currency rate by slug.',
    version: '2.0.0',
    docs: ['https://pro.coincap.io/api-docs'],
    tags: ['crypto', 'rates', 'conversion', 'cacheTtlRealtime'],
    root: 'https://rest.coincap.io/v3',
    requiredServerParams: ['COINCAP_API_KEY'],
    headers: {
        Authorization: 'Bearer {{COINCAP_API_KEY}}'
    },
    routes: {
        listRates: {
            method: 'GET',
            path: '/rates',
            description: 'Retrieve all conversion rates or filter by comma-separated slugs. Optional filters: ids.',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all rates' },
                { _description: 'Filter rates by bitcoin,ethereum', ids: 'bitcoin,ethereum' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, symbol: { type: 'string' }, currencySymbol: { type: 'string' }, type: { type: 'string' }, rateUsd: { type: 'string' } } } }
                    }
                }
            },
        },
        getRateBySlug: {
            method: 'GET',
            path: '/rates/:slug',
            description: 'Retrieve a specific conversion rate by slug via CoinCap — query by slug. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get bitcoin rate', slug: 'bitcoin' },
                { _description: 'Get invalid rate', slug: 'invalid-slug' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'number' },
                        data: { type: 'object', properties: { id: { type: 'string' }, symbol: { type: 'string' }, currencySymbol: { type: 'string' }, rateUsd: { type: 'string' }, type: { type: 'string' } } }
                    }
                }
            },
        }
    }
}
