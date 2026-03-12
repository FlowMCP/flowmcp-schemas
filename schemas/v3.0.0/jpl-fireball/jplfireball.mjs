export const main = {
    namespace: 'jpl',
    name: 'JplFireball',
    description: 'Query NASA JPL fireball and bolide event data — atmospheric impacts detected by US Government sensors including date, location, energy, and velocity.',
    docs: ['https://ssd-api.jpl.nasa.gov/doc/fireball.html'],
    tags: ['nasa', 'space', 'science', 'fireball', 'meteor', 'planetarydefense', 'cacheTtlDaily'],
    version: '3.0.0',
    root: 'https://ssd-api.jpl.nasa.gov',
    requiredServerParams: [],
    headers: {},
    tools: {
        getFireballs: {
            method: 'GET',
            path: '/fireball.api',
            description: 'Retrieve fireball and bolide events detected by US Government sensors, optionally filtered by date range, energy thresholds, and altitude.',
            parameters: [
                { position: { key: 'date-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'energy-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'impact-e-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'req-loc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'req-alt', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'vel-comp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default("-date")'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get the 20 most recent fireball events', limit: 20 },
                { _description: 'Get fireballs since 2020 with location data required', 'date-min': '2020-01-01', 'req-loc': true, limit: 50 },
                { _description: 'Get high-energy fireballs above 10 kiloton impact energy', 'impact-e-min': '10', limit: 20 },
                { _description: 'Get fireballs in a specific year with velocity components', 'date-min': '2023-01-01', 'date-max': '2023-12-31', 'vel-comp': true }
            ],
        }
    },
}