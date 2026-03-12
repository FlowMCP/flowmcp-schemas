export const main = {
    namespace: 'opennotify',
    name: 'Open Notify',
    description: 'Real-time International Space Station position tracking and list of people currently in space across all spacecraft.',
    version: '3.0.0',
    docs: ['http://open-notify.org/Open-Notify-API/'],
    tags: ['space', 'iss', 'astronauts', 'tracking', 'cacheTtlRealtime'],
    root: 'http://api.open-notify.org',
    requiredServerParams: [],
    headers: {},
    tools: {
        getIssPosition: {
            method: 'GET',
            path: '/iss-now.json',
            description: 'Get the current geographic position (latitude and longitude) of the International Space Station in real-time.',
            parameters: [],
            tests: [
                { _description: 'Get current ISS position' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        timestamp: { type: 'number' },
                        iss_position: { type: 'object', properties: { latitude: { type: 'string' }, longitude: { type: 'string' } } }
                    }
                }
            },
        },
        getPeopleInSpace: {
            method: 'GET',
            path: '/astros.json',
            description: 'Get the list of all people currently in space, including their names and the spacecraft they are aboard.',
            parameters: [],
            tests: [
                { _description: 'Get all people currently in space' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        number: { type: 'number' },
                        people: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, craft: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}
