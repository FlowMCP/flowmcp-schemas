// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'geoapify',
    name: 'Geoapify Geocoding',
    description: 'Forward geocoding, reverse geocoding, and address autocomplete via Geoapify — convert addresses to coordinates, coordinates to addresses, and type-ahead suggestions.',
    version: '2.0.0',
    docs: ['https://apidocs.geoapify.com/docs/geocoding/'],
    tags: ['geocoding', 'maps', 'places', 'cacheTtlDaily'],
    root: 'https://api.geoapify.com',
    requiredServerParams: ['GEOAPIFY_API_KEY'],
    routes: {
        forwardGeocode: {
            method: 'GET',
            path: '/v1/geocode/search?apiKey={{GEOAPIFY_API_KEY}}',
            description: 'Convert an address or place name into geographic coordinates. Required: text. Optional filters: lang, limit.',
            parameters: [
                { position: { key: 'text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'optional()'] } }
            ]
        },
        reverseGeocode: {
            method: 'GET',
            path: '/v1/geocode/reverse?apiKey={{GEOAPIFY_API_KEY}}',
            description: 'Convert geographic coordinates into an address via Geoapify. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } }
            ]
        },
        autocomplete: {
            method: 'GET',
            path: '/v1/geocode/autocomplete?apiKey={{GEOAPIFY_API_KEY}}',
            description: 'Get address suggestions as you type for autocomplete functionality. Required: text. Optional filters: lang, limit.',
            parameters: [
                { position: { key: 'text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'optional()'] } }
            ]
        }
    }
}
