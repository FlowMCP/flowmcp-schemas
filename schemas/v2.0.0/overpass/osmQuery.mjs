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
            ]
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
            ]
        },
        status: {
            method: 'GET',
            path: '/status',
            description: 'Get the current status of the Overpass API server. Returns structured JSON response data.',
            parameters: []
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
