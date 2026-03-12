export const main = {
    namespace: 'opensensemap',
    name: 'openSenseMap',
    description: 'Access community-driven environmental sensor data from 14K+ senseBox stations worldwide. Retrieve air quality, temperature, humidity, and other measurements from the openSenseMap citizen science platform.',
    version: '2.0.0',
    docs: ['https://docs.opensensemap.org/', 'https://api.opensensemap.org/'],
    tags: ['environment', 'sensors', 'air-quality', 'temperature', 'humidity', 'citizen-science', 'opendata', 'cacheTtlFrequent'],
    root: 'https://api.opensensemap.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        getStats: {
            method: 'GET',
            path: '/stats',
            description: 'Get global openSenseMap statistics including total number of boxes, measurements, and active sensors.',
            parameters: [],
            tests: [
                { _description: 'Get global statistics' }
            ]
        },
        getBoxes: {
            method: 'GET',
            path: '/boxes',
            description: 'List senseBox stations with optional filters by phenomenon, date, exposure, or bounding box. Returns station metadata including sensors, location, and last measurement.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'phenomenon', value: '{{PHENOMENON}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'exposure', value: '{{EXPOSURE}}', location: 'query' }, z: { primitive: 'enum(indoor,outdoor,mobile,unknown)', options: ['optional()'] } },
                { position: { key: 'bbox', value: '{{BBOX}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List 3 outdoor stations', limit: 3, exposure: 'outdoor' },
                { _description: 'List stations measuring temperature', limit: 3, phenomenon: 'temperature' }
            ]
        },
        getBox: {
            method: 'GET',
            path: '/boxes/:senseBoxId',
            description: 'Get detailed information about a specific senseBox station including all sensors, location, and latest measurements.',
            parameters: [
                { position: { key: 'senseBoxId', value: '{{SENSEBOX_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get details of a specific senseBox', senseBoxId: '5a8d1c13c4e741001a876f4e' }
            ]
        },
        getBoxSensors: {
            method: 'GET',
            path: '/boxes/:senseBoxId/sensors',
            description: 'Get the latest measurements for all sensors of a specific senseBox station.',
            parameters: [
                { position: { key: 'senseBoxId', value: '{{SENSEBOX_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get latest sensor data for a senseBox', senseBoxId: '5a8d1c13c4e741001a876f4e' }
            ]
        },
        getSensorData: {
            method: 'GET',
            path: '/boxes/:senseBoxId/data/:sensorId',
            description: 'Get historical measurement data for a specific sensor. Supports time range filtering with from-date and to-date parameters.',
            parameters: [
                { position: { key: 'senseBoxId', value: '{{SENSEBOX_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sensorId', value: '{{SENSOR_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'from-date', value: '{{FROM_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to-date', value: '{{TO_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get recent sensor data', senseBoxId: '5a8d1c13c4e741001a876f4e', sensorId: '5a8d1c13c4e741001a876f53' }
            ]
        },
        getTags: {
            method: 'GET',
            path: '/tags',
            description: 'Get a list of all tags used across senseBox stations for filtering and discovery.',
            parameters: [],
            tests: [
                { _description: 'Get all available tags' }
            ]
        }
    }
}
