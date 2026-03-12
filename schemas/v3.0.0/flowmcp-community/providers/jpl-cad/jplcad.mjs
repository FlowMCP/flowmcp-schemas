export const main = {
    namespace: 'jplcad',
    name: 'JplCad',
    description: 'Query the JPL Close Approach Data (CAD) API for near-Earth object close approaches to Earth — filter by date range, maximum distance, object type (PHA, NEO, comet), specific designation, or absolute magnitude.',
    docs: ['https://ssd-api.jpl.nasa.gov/doc/cad.html', 'https://ssd.jpl.nasa.gov/tools/cad.html'],
    tags: ['jpl', 'nasa', 'asteroids', 'closeapproach', 'planetarydefense', 'science', 'cacheTtlDaily'],
    version: '3.0.0',
    root: 'https://ssd-api.jpl.nasa.gov',
    requiredServerParams: [],
    headers: {},
    tools: {
        getCloseApproaches: {
            method: 'GET',
            description: 'Get near-Earth object close approaches to Earth within a date range. Returns fields array and data records with designation, closest approach date, distance (AU, LD), relative velocity, and magnitude. via jplcad.',
            path: '/cad.api',
            parameters: [
                { position: { key: 'date-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dist-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get close approaches to Earth in January 2024 within 0.05 AU', 'date-min': '2024-01-01', 'date-max': '2024-01-31', 'dist-max': '0.05' },
                { _description: 'Get all close approaches within 1 lunar distance in a week', 'date-min': '2024-06-01', 'date-max': '2024-06-07', 'dist-max': '0.0025' },
                { _description: 'Get the 100 closest approaches in all of 2024', 'date-min': '2024-01-01', 'date-max': '2024-12-31', limit: 100 }
            ],
        },
        getPotentiallyHazardous: {
            method: 'GET',
            description: 'Get close approaches for potentially hazardous asteroids (PHAs) only. PHAs have an absolute magnitude of 22 or brighter and approach within 0.05 AU of Earth\'s orbit. via jplcad.',
            path: '/cad.api',
            parameters: [
                { position: { key: 'date-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pha', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'dist-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get PHA close approaches in 2024 within 0.1 AU', 'date-min': '2024-01-01', 'date-max': '2024-12-31', pha: true, 'dist-max': '0.1' },
                { _description: 'Get PHA close approaches over the next decade', 'date-min': '2024-01-01', 'date-max': '2034-12-31', pha: true, limit: 100 }
            ],
        },
        getByObject: {
            method: 'GET',
            description: 'Get all close approaches for a specific small body identified by its designation. Optionally include the full object name in results. via jplcad.',
            path: '/cad.api',
            parameters: [
                { position: { key: 'des', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'date-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fullname', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get all close approaches for Apophis (99942) with full name', des: '99942', fullname: true },
                { _description: 'Get close approaches for Bennu through the 21st century', des: '101955', 'date-min': '2000-01-01', 'date-max': '2100-12-31' },
                { _description: 'Get close approaches for 2023 BU that flew very close to Earth', des: '2023 BU', fullname: true }
            ],
        },
        getByMagnitude: {
            method: 'GET',
            description: 'Get close approaches filtered by absolute magnitude range (H). Lower H values mean larger objects. H<=22 is roughly 140m+, H<=18 is roughly 1km+. via jplcad.',
            path: '/cad.api',
            parameters: [
                { position: { key: 'date-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'h-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'h-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'dist-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get large asteroid close approaches (H <= 22, 140m+) in 2024 within 0.2 AU', 'date-min': '2024-01-01', 'date-max': '2024-12-31', 'h-max': 22, 'dist-max': '0.2' },
                { _description: 'Get 1km+ asteroid approaches (H <= 18) through 2030', 'date-min': '2024-01-01', 'date-max': '2030-12-31', 'h-max': 18 }
            ],
        }
    },
}
