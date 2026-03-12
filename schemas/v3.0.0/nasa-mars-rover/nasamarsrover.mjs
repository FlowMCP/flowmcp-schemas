export const main = {
    namespace: 'nasamarsrover',
    name: 'NasaMarsRover',
    description: 'Access NASA Mars Rover Photos — retrieve images from Curiosity, Perseverance, Opportunity, and Spirit filtered by Martian sol, Earth date, or camera type, plus mission manifests.',
    docs: ['https://api.nasa.gov/', 'https://github.com/corincerami/mars-photo-api'],
    tags: ['nasa', 'mars', 'rover', 'space', 'images', 'science', 'cacheTtlDaily'],
    version: '3.0.0',
    root: 'https://api.nasa.gov',
    requiredServerParams: ['SERVER_PARAM:NASA_API_KEY'],
    headers: {},
    tools: {
        getPhotosBySol: {
            method: 'GET',
            description: 'Get Mars rover photos for a specific Martian sol (day since landing), optionally filtered by camera type. Returns photo IDs, image URLs, Earth date, camera info, and rover metadata. via nasamarsrover.',
            path: '/mars-photos/api/v1/rovers/:rover/photos',
            parameters: [
                { position: { key: 'rover', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(curiosity,perseverance,opportunity,spirit)', options: [] } },
                { position: { key: 'sol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)'] } },
                { position: { key: 'camera', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Curiosity rover photos from sol 1000', rover: 'curiosity', sol: 1000 },
                { _description: 'Get Curiosity front hazard camera photos from sol 1500', rover: 'curiosity', sol: 1500, camera: 'fhaz' },
                { _description: 'Get Perseverance rover photos from sol 100', rover: 'perseverance', sol: 100 }
            ],
        },
        getPhotosByEarthDate: {
            method: 'GET',
            description: 'Get Mars rover photos taken on a specific Earth date, optionally filtered by camera. Returns photo URLs, sol number, and camera details. via nasamarsrover.',
            path: '/mars-photos/api/v1/rovers/:rover/photos',
            parameters: [
                { position: { key: 'rover', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(curiosity,perseverance,opportunity,spirit)', options: [] } },
                { position: { key: 'earth_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'camera', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Curiosity photos taken on a specific Earth date', rover: 'curiosity', earth_date: '2023-06-15' },
                { _description: 'Get Perseverance navigation camera photos on a specific date', rover: 'perseverance', earth_date: '2024-01-10', camera: 'navcam_left' }
            ],
        },
        getLatestPhotos: {
            method: 'GET',
            description: 'Get the most recently available photos from a Mars rover across all cameras. Returns the newest sol imagery available. via nasamarsrover.',
            path: '/mars-photos/api/v1/rovers/:rover/latest_photos',
            parameters: [
                { position: { key: 'rover', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(curiosity,perseverance,opportunity,spirit)', options: [] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get latest available photos from Curiosity', rover: 'curiosity' },
                { _description: 'Get latest available photos from Perseverance', rover: 'perseverance' }
            ],
        },
        getMissionManifest: {
            method: 'GET',
            description: 'Get the mission manifest for a Mars rover including launch date, landing date, mission status, max sol, total photos, and per-sol photo counts. via nasamarsrover.',
            path: '/mars-photos/api/v1/manifests/:rover',
            parameters: [
                { position: { key: 'rover', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(curiosity,perseverance,opportunity,spirit)', options: [] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get mission manifest for Curiosity rover', rover: 'curiosity' },
                { _description: 'Get mission manifest for Perseverance rover', rover: 'perseverance' },
                { _description: 'Get mission manifest for Opportunity rover', rover: 'opportunity' }
            ],
        }
    },
}
