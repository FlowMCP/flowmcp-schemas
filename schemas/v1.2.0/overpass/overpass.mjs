const schema = {
    namespace: 'overpass',
    name: 'Overpass API',
    description: 'OpenStreetMap Overpass API for querying geographic data like POIs, buildings, roads, and boundaries',
    docs: [ 'https://wiki.openstreetmap.org/wiki/Overpass_API' ],
    tags: [ 'maps', 'geodata', 'openstreetmap', 'poi' ],
    flowMCP: '1.2.0',
    root: 'https://overpass-api.de/api',
    requiredServerParams: [],
    headers: {},
    routes: {
        query: {
            requestMethod: 'GET',
            description: 'Execute an Overpass QL query to find OpenStreetMap data. Supports nodes, ways, relations, and areas.',
            route: '/interpreter',
            parameters: [
                { position: { key: 'data', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Find cafes in Berlin center', data: '[out:json][timeout:25];node["amenity"="cafe"](52.50,13.37,52.53,13.41);out body;' },
                { _description: 'Find hospitals in Munich', data: '[out:json][timeout:25];node["amenity"="hospital"](48.10,11.50,48.20,11.60);out body;' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatOverpass' }
            ]
        },
        status: {
            requestMethod: 'GET',
            description: 'Get the current status of the Overpass API server including version, timestamp, and load.',
            route: '/status',
            parameters: [],
            tests: [
                { _description: 'Check Overpass server status' }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatOverpass: async ( { struct, payload } ) => {
            const data = struct[ 'data' ]

            if( data[ 'elements' ] ) {
                struct[ 'data' ] = data[ 'elements' ]
                    .map( ( element ) => {
                        const formatted = {
                            type: element[ 'type' ],
                            id: element[ 'id' ],
                            lat: element[ 'lat' ] || null,
                            lon: element[ 'lon' ] || null,
                            name: element[ 'tags' ] ? element[ 'tags' ][ 'name' ] || null : null,
                            tags: element[ 'tags' ] || {}
                        }

                        return formatted
                    } )
            }

            return { struct, payload }
        }
    }
}


export { schema }
