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
            ]
        },
        getRateBySlug: {
            method: 'GET',
            path: '/rates/:slug',
            description: 'Retrieve a specific conversion rate by slug via CoinCap — query by slug. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}
