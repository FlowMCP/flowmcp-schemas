// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'overpass',
    name: 'Overpass OSM Query',
    description: 'Query OpenStreetMap data using the Overpass API for geographic searches and nearby point-of-interest lookups',
    version: '2.0.0',
    docs: ['https://wiki.openstreetmap.org/wiki/Overpass_API', 'https://overpass-turbo.eu/'],
    tags: ['openstreetmap', 'geodata', 'maps', 'cacheTtlDaily'],
    root: 'https://overpass-api.de/api',
    routes: {
        queryRaw: {
            method: 'GET',
            path: '/interpreter',
            description: 'Execute a raw OverpassQL query against OpenStreetMap data. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'data', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Find cafes in Berlin Mitte',
                    data: '[out:json][timeout:10];node[amenity=cafe](52.51,13.37,52.53,13.41);out body 5;'
                },
                {
                    _description: 'Find parks in Munich',
                    data: '[out:json][timeout:10];way[leisure=park](48.1,11.5,48.2,11.6);out center 5;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        version: { type: 'number' },
                        generator: { type: 'string' },
                        osm3s: { type: 'object', properties: { timestamp_osm_base: { type: 'string' }, copyright: { type: 'string' } } },
                        elements: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, id: { type: 'number' }, lat: { type: 'number' }, lon: { type: 'number' }, tags: { type: 'object' } } } }
                    }
                }
            },
        },
        findNearby: {
            method: 'GET',
            path: '/interpreter',
            description: 'Find nearby points of interest by coordinates, radius, and amenity type. Required: lat, lon, amenity. Optional filters: radius.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(50000)', 'default(500)', 'optional()'] } },
                { position: { key: 'amenity', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                {
                    _description: 'Find restaurants near Berlin Alexanderplatz',
                    lat: 52.5219,
                    lon: 13.4132,
                    radius: 500,
                    amenity: 'restaurant'
                },
                { _description: 'Find pharmacies near Brandenburg Gate', lat: 52.5163, lon: 13.3777, radius: 1000, amenity: 'pharmacy' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        version: { type: 'number' },
                        generator: { type: 'string' },
                        osm3s: { type: 'object', properties: { timestamp_osm_base: { type: 'string' }, copyright: { type: 'string' } } },
                        elements: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, id: { type: 'number' }, lat: { type: 'number' }, lon: { type: 'number' }, tags: { type: 'object' } } } }
                    }
                }
            },
        },
        status: {
            method: 'GET',
            path: '/status',
            description: 'Get the current status of the Overpass API server. Returns structured JSON response data.',
            parameters: [],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string', description: 'Plain text server status (connected database, slots, rate limits)' }
            },
            tests: [
                { _description: 'Check Overpass API status' }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    findNearby: {
        preRequest: async ( { struct, payload } ) => {
            const { lat, lon, radius = 500, amenity } = payload
            const query = `[out:json][timeout:25];node[amenity=${amenity}](around:${radius},${lat},${lon});out body;`

            const url = new URL( struct.url )
            const params = new URLSearchParams()
            params.set( 'data', query )
            url.search = params.toString()
            struct.url = url.toString()

            return { struct }
        }
    }
} )
