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
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{type:{type:'string'},features:{type:'array',items:{type:'object',properties:{type:{type:'string'},properties:{type:'object'},geometry:{type:'object',properties:{type:{type:'string'},coordinates:{type:'array',items:{type:'number'}}}}}}}}}},
            tests: [
                { _description: 'Geocode Berlin address', text: 'Brandenburger Tor, Berlin' },
                { _description: 'Geocode with language', text: 'Eiffel Tower, Paris', lang: 'en', limit: 3 }
            ],
        },
        reverseGeocode: {
            method: 'GET',
            path: '/v1/geocode/reverse?apiKey={{GEOAPIFY_API_KEY}}',
            description: 'Convert geographic coordinates into an address via Geoapify. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{type:{type:'string'},features:{type:'array',items:{type:'object',properties:{type:{type:'string'},properties:{type:'object'},geometry:{type:'object'}}}}}}},
            tests: [
                { _description: 'Reverse geocode Berlin coordinates', lat: 52.5163, lon: 13.3777 }
            ],
        },
        autocomplete: {
            method: 'GET',
            path: '/v1/geocode/autocomplete?apiKey={{GEOAPIFY_API_KEY}}',
            description: 'Get address suggestions as you type for autocomplete functionality. Required: text. Optional filters: lang, limit.',
            parameters: [
                { position: { key: 'text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{type:{type:'string'},features:{type:'array',items:{type:'object',properties:{type:{type:'string'},properties:{type:'object'},geometry:{type:'object'}}}}}}},
            tests: [
                { _description: 'Autocomplete Berlin address', text: 'Alexanderpl' },
                { _description: 'Autocomplete with limit', text: 'Münch', lang: 'de', limit: 5 }
            ],
        }
    }
}
