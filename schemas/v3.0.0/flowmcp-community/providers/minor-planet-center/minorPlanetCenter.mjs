export const main = {
    namespace: 'minorplanetcenter',
    name: 'MinorPlanetCenter',
    description: 'Query IAU Minor Planet Center asteroid and comet orbital data — search by orbital parameters, physical properties, and designations.',
    version: '3.0.0',
    docs: ['https://minorplanetcenter.net/web_service/'],
    tags: ['astronomy', 'asteroids', 'space', 'science', 'cacheTtlDaily'],
    root: 'https://www.minorplanetcenter.net',
    requiredServerParams: [],
    headers: {
        'Authorization': 'Basic bXBjX3dzOm1wYyEhd3M='
    },
    tools: {
        searchOrbits: {
            method: 'POST',
            path: '/web_service/search_orbits',
            description: 'Search minor planet orbital data with flexible filtering by orbital elements, physical properties, and designations. Supports range queries with _min/_max suffixes.',
            parameters: [
                { position: { key: 'json', value: '1', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'number', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'designation', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order_by_desc', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'return', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for asteroid Ceres by name', name: 'Ceres', limit: 1 },
                { _description: 'Get 10 asteroids sorted by largest semi-major axis', order_by_desc: 'semimajor_axis', limit: 10, return: 'name,number,semimajor_axis,eccentricity,inclination' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of minor planet objects with orbital and physical properties',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', description: 'Minor planet name' },
                            number: { type: 'string', description: 'Minor planet number' },
                            designation: { type: 'string', description: 'Provisional designation' },
                            semimajor_axis: { type: 'number', description: 'Semi-major axis in AU' },
                            eccentricity: { type: 'number', description: 'Orbital eccentricity' },
                            inclination: { type: 'number', description: 'Orbital inclination in degrees' },
                            absolute_magnitude: { type: 'number', description: 'Absolute magnitude H' },
                            orbit_type: { type: 'number', description: 'Orbit type code' }
                        }
                    }
                }
            }
        },
        searchByOrbitalElements: {
            method: 'POST',
            path: '/web_service/search_orbits',
            description: 'Search asteroids by orbital element ranges — eccentricity, inclination, semi-major axis. Use _min and _max suffixes for range queries.',
            parameters: [
                { position: { key: 'json', value: '1', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'eccentricity_min', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)', 'max(1)'] } },
                { position: { key: 'eccentricity_max', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)', 'max(1)'] } },
                { position: { key: 'inclination_min', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)', 'max(180)'] } },
                { position: { key: 'inclination_max', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)', 'max(180)'] } },
                { position: { key: 'semimajor_axis_min', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)'] } },
                { position: { key: 'semimajor_axis_max', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'min(0)'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'return', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Find near-circular low-inclination asteroids (potential targets)', eccentricity_max: 0.1, inclination_max: 4, semimajor_axis_max: 1.5, limit: 10, return: 'name,number,semimajor_axis,eccentricity,inclination' },
                { _description: 'Find highly eccentric asteroids (comet-like orbits)', eccentricity_min: 0.9, limit: 10, order_by: 'eccentricity', return: 'name,number,eccentricity,semimajor_axis,inclination' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            number: { type: 'string' },
                            semimajor_axis: { type: 'number' },
                            eccentricity: { type: 'number' },
                            inclination: { type: 'number' }
                        }
                    }
                }
            }
        },
        searchNearEarthObjects: {
            method: 'POST',
            path: '/web_service/search_orbits',
            description: 'Search for Near-Earth Objects (NEOs) by orbit type. Orbit types: 1=Atira, 2=Aten, 3=Apollo, 4=Amor, 5=Mars-crosser, 6=Hungaria, 7=Phocaea, 8=Hilda, 9=Jupiter Trojan, 10=Distant.',
            parameters: [
                { position: { key: 'json', value: '1', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'orbit_type', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(1,2,3,4,5,6,7,8,9,10)', options: [] } },
                { position: { key: 'order_by_desc', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'return', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Find Apollo-type NEOs (Earth-crossers) sorted by absolute magnitude', orbit_type: '3', order_by_desc: 'absolute_magnitude', limit: 20, return: 'name,number,designation,absolute_magnitude,semimajor_axis,eccentricity' },
                { _description: 'Find Aten-type asteroids (orbit inside Earth)', orbit_type: '2', limit: 20, return: 'name,number,semimajor_axis,eccentricity,inclination' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            number: { type: 'string' },
                            designation: { type: 'string' },
                            absolute_magnitude: { type: 'number' },
                            semimajor_axis: { type: 'number' },
                            eccentricity: { type: 'number' }
                        }
                    }
                }
            }
        },
        searchByMagnitude: {
            method: 'POST',
            path: '/web_service/search_orbits',
            description: 'Search asteroids by absolute magnitude (H) range. Lower H values indicate larger objects. H < 22 are potentially hazardous.',
            parameters: [
                { position: { key: 'json', value: '1', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'absolute_magnitude_min', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'absolute_magnitude_max', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'return', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Find brightest (largest) asteroids with H < 5', absolute_magnitude_max: 5, order_by: 'absolute_magnitude', limit: 20, return: 'name,number,absolute_magnitude,semimajor_axis,eccentricity' },
                { _description: 'Find faint asteroids with H between 25 and 30', absolute_magnitude_min: 25, absolute_magnitude_max: 30, limit: 10, return: 'name,designation,absolute_magnitude' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            number: { type: 'string' },
                            absolute_magnitude: { type: 'number' },
                            semimajor_axis: { type: 'number' },
                            eccentricity: { type: 'number' }
                        }
                    }
                }
            }
        }
    }
}
