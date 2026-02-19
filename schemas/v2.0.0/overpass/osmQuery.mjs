// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Note: Overpass API has strict rate limits (2 concurrent slots per IP).
// Shared executeRequest with retry/backoff handles 429 and 504 errors.

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


export const handlers = ( { sharedLists, libraries } ) => {
    const fetchWithRetry = async ( { struct } ) => {
        const maxRetries = 3
        const baseDelay = 2000
        let lastError = null

        const attempts = Array.from( { length: maxRetries }, ( _, i ) => i )

        const tryFetch = async ( { attempt } ) => {
            if( attempt > 0 ) {
                const delay = baseDelay * Math.pow( 2, attempt - 1 )
                await new Promise( ( resolve ) => setTimeout( resolve, delay ) )
            }

            const response = await fetch( struct.url, {
                method: struct.method || 'GET',
                headers: struct.headers || {}
            } )

            if( response.status === 429 || response.status === 504 ) {
                const err = new Error( `Overpass API rate limited (HTTP ${response.status}), attempt ${attempt + 1}/${maxRetries}` )
                err.retryable = true

                throw err
            }

            if( !response.ok ) {
                throw new Error( `HTTP ${response.status}: ${response.statusText}` )
            }

            const contentType = response.headers.get( 'content-type' ) || ''
            const data = contentType.includes( 'json' )
                ? await response.json()
                : await response.text()

            return data
        }

        let result = null
        let succeeded = false

        await attempts
            .reduce( async ( previousAttempt, attempt ) => {
                await previousAttempt
                if( succeeded ) { return }

                try {
                    result = await tryFetch( { attempt } )
                    succeeded = true
                } catch( error ) {
                    lastError = error
                    if( !error.retryable ) { succeeded = false; throw error }
                }
            }, Promise.resolve() )

        if( !succeeded ) {
            throw lastError || new Error( 'All retry attempts failed' )
        }

        return result
    }

    return {
        queryRaw: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const data = await fetchWithRetry( { struct } )
                    struct.data = data
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Overpass query failed: ${error.message}` )
                }

                return { struct }
            }
        },
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
            },
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const data = await fetchWithRetry( { struct } )
                    struct.data = data
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Overpass nearby query failed: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
