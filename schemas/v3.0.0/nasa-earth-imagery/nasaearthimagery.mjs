export const main = {
    namespace: 'nasaearthimagery',
    name: 'NASA Earth Imagery',
    description: 'Access NASA Landsat 8 satellite imagery — retrieve Earth observation images and asset metadata for any location and date using the planetary/earth API.',
    version: '3.0.0',
    docs: ['https://api.nasa.gov/', 'https://github.com/nasa/earth-imagery-api'],
    tags: ['nasa', 'earth', 'satellite', 'imagery', 'landsat', 'science', 'cacheTtlDaily'],
    root: 'https://api.nasa.gov',
    requiredServerParams: ['NASA_API_KEY'],
    headers: {},
    tools: {
        getEarthImagery: {
            method: 'GET',
            path: '/planetary/earth/imagery',
            description: 'Retrieve Landsat 8 satellite imagery for a specific latitude, longitude, and date. Returns the closest available image within a 30-day lookback window.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dim', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0.025)'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get satellite image of Houston TX', lat: 29.67, lon: -95.21, date: '2024-01-01' },
                { _description: 'Get satellite image of San Francisco with custom dimension', lat: 37.77, lon: -122.42, date: '2024-06-15', dim: 0.1 }
            ],
            output: {
                mimeType: 'image/png',
                schema: {
                    type: 'string',
                    description: 'PNG satellite image data'
                }
            }
        },
        getEarthAssets: {
            method: 'GET',
            path: '/planetary/earth/assets',
            description: 'Retrieve available Landsat 8 imagery dates and asset URLs for a specific location. Returns a list of acquisition dates with persistent image URLs.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dim', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0.025)'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get available imagery dates for Houston TX', lat: 29.67, lon: -95.21, date: '2024-01-01' },
                { _description: 'Get available imagery dates for Singapore', lat: 1.5, lon: 100.75, date: '2024-07-01' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        date: { type: 'string', description: 'Date of the closest available image' },
                        id: { type: 'string', description: 'Landsat scene identifier' },
                        resource: { type: 'object', description: 'Resource details including dataset and planet' },
                        service_version: { type: 'string', description: 'API service version' },
                        url: { type: 'string', description: 'URL to the image asset' }
                    }
                }
            }
        }
    }
}
