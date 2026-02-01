const schema = {
    namespace: 'geoapify',
    name: 'Geoapify Geocoding',
    description: 'Geoapify Geocoding API for forward and reverse geocoding',
    docs: [ 'https://apidocs.geoapify.com/docs/geocoding/' ],
    tags: [ 'geocoding', 'maps', 'location' ],
    flowMCP: '1.2.0',
    root: 'https://api.geoapify.com/v1',
    requiredServerParams: [ 'GEOAPIFY_API_KEY' ],
    headers: {},
    routes: {
        forwardGeocode: {
            requestMethod: 'GET',
            description: 'Convert an address or place name into geographic coordinates (latitude/longitude).',
            route: '/geocode/search',
            parameters: [
                { position: { key: 'apiKey', value: '{{GEOAPIFY_API_KEY}}', location: 'query' } },
                { position: { key: 'text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("en")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(40)', 'default(5)', 'optional()' ] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'bias', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'format', value: 'json', location: 'query' } }
            ],
            tests: [
                { _description: 'Geocode Berlin', text: 'Berlin, Germany' },
                { _description: 'Geocode specific address', text: 'Alexanderplatz 1, Berlin' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatGeocode' }
            ]
        },
        reverseGeocode: {
            requestMethod: 'GET',
            description: 'Convert geographic coordinates (latitude/longitude) into a human-readable address.',
            route: '/geocode/reverse',
            parameters: [
                { position: { key: 'apiKey', value: '{{GEOAPIFY_API_KEY}}', location: 'query' } },
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(-90)', 'max(90)' ] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(-180)', 'max(180)' ] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("en")', 'optional()' ] } },
                { position: { key: 'format', value: 'json', location: 'query' } }
            ],
            tests: [
                { _description: 'Reverse geocode Berlin center', lat: 52.5200, lon: 13.4050 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatGeocode' }
            ]
        },
        autocomplete: {
            requestMethod: 'GET',
            description: 'Get address suggestions as you type for autocomplete functionality.',
            route: '/geocode/autocomplete',
            parameters: [
                { position: { key: 'apiKey', value: '{{GEOAPIFY_API_KEY}}', location: 'query' } },
                { position: { key: 'text', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("en")', 'optional()' ] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(40)', 'default(5)', 'optional()' ] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'bias', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'format', value: 'json', location: 'query' } }
            ],
            tests: [
                { _description: 'Autocomplete Berlin', text: 'Berl' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatGeocode' }
            ]
        }
    },
    handlers: {
        formatGeocode: async ( { struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'results' ] ) {
                struct[ 'data' ] = data[ 'results' ]
                    .map( ( result ) => {
                        const formatted = {
                            formatted: result[ 'formatted' ],
                            lat: result[ 'lat' ],
                            lon: result[ 'lon' ],
                            city: result[ 'city' ] || null,
                            state: result[ 'state' ] || null,
                            country: result[ 'country' ] || null,
                            countryCode: result[ 'country_code' ] || null,
                            postcode: result[ 'postcode' ] || null,
                            street: result[ 'street' ] || null,
                            housenumber: result[ 'housenumber' ] || null,
                            resultType: result[ 'result_type' ] || null
                        }

                        return formatted
                    } )
            } else if( data[ 'features' ] ) {
                struct[ 'data' ] = data[ 'features' ]
                    .map( ( feature ) => {
                        const props = feature[ 'properties' ]
                        const formatted = {
                            formatted: props[ 'formatted' ],
                            lat: props[ 'lat' ],
                            lon: props[ 'lon' ],
                            city: props[ 'city' ] || null,
                            state: props[ 'state' ] || null,
                            country: props[ 'country' ] || null,
                            countryCode: props[ 'country_code' ] || null,
                            postcode: props[ 'postcode' ] || null,
                            street: props[ 'street' ] || null,
                            housenumber: props[ 'housenumber' ] || null,
                            resultType: props[ 'result_type' ] || null
                        }

                        return formatted
                    } )
            }

            return { struct, payload }
        }
    }
}


export { schema }
