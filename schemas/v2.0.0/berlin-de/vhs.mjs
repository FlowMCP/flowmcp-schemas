// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'berlinvhs',
    name: 'Berlin VHS API',
    description: 'Access to Berlin Volkshochschule (VHS) course catalog with detailed course information',
    version: '2.0.0',
    docs: ['https://www.vhsit.berlin.de/'],
    tags: ['berlin', 'education', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.vhsit.berlin.de',
    routes: {
        all_courses: {
            method: 'GET',
            path: '/VHSKURSE/OpenData/Kurse.json',
            description: 'Complete catalog of VHS courses across all Berlin districts via Berlin.de. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all VHS courses from Berlin' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        veranstaltungen: { type: 'object', properties: { veranstaltung: { type: 'array', items: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}
