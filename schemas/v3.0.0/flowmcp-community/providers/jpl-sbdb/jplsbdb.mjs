export const main = {
    namespace: 'jplsbdb',
    name: 'JplSbdb',
    description: 'Query the JPL Small-Body Database (SBDB) for detailed data on asteroids and comets — orbital elements, physical parameters, close approach records, and alternate designations.',
    docs: ['https://ssd-api.jpl.nasa.gov/doc/sbdb.html', 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html'],
    tags: ['jpl', 'nasa', 'asteroids', 'comets', 'space', 'planetarydefense', 'science', 'cacheTtlDaily'],
    version: '3.0.0',
    root: 'https://ssd-api.jpl.nasa.gov',
    requiredServerParams: [],
    headers: {},
    tools: {
        lookupBody: {
            method: 'GET',
            description: 'Look up a small body (asteroid or comet) by name, designation, or SPK-ID. Returns orbital elements, object classification, NEO/PHA status, and observation arc. via jplsbdb.',
            path: '/sbdb.api',
            parameters: [
                { position: { key: 'sstr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up asteroid 433 Eros by number', sstr: '433' },
                { _description: 'Look up Halley\'s Comet by name', sstr: 'Halley' },
                { _description: 'Look up the Apophis asteroid by name', sstr: 'Apophis' }
            ],
        },
        lookupBodyWithPhysics: {
            method: 'GET',
            description: 'Look up a small body and include physical parameters such as diameter, albedo, rotation period, and spectral type. via jplsbdb.',
            path: '/sbdb.api',
            parameters: [
                { position: { key: 'sstr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'phys-par', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Look up dwarf planet Ceres with physical parameters', sstr: 'Ceres', 'phys-par': true },
                { _description: 'Look up Vesta with physical data', sstr: 'Vesta', 'phys-par': true },
                { _description: 'Look up mission target Bennu with physical parameters', sstr: 'Bennu', 'phys-par': true }
            ],
        },
        lookupBodyWithCloseApproaches: {
            method: 'GET',
            description: 'Look up a small body and include its historical and future close approach records to Earth and other planets. via jplsbdb.',
            path: '/sbdb.api',
            parameters: [
                { position: { key: 'sstr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'ca-data', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Look up Apophis with its 2029 close approach record', sstr: 'Apophis', 'ca-data': true },
                { _description: 'Look up 2023 BU with close approach records', sstr: '2023 BU', 'ca-data': true }
            ],
        },
        searchByDesignation: {
            method: 'GET',
            description: 'Search for a small body using its precise designation (numbered or provisional) with optional alternate designation listing. via jplsbdb.',
            path: '/sbdb.api',
            parameters: [
                { position: { key: 'des', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'alt-des', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search by number for asteroid 99942 Apophis', des: '99942' },
                { _description: 'Search for asteroid with provisional designation and alternate names', des: '2015 AB', 'alt-des': true },
                { _description: 'Search for comet 67P with alternate designations', des: '67P', 'alt-des': true }
            ],
        }
    },
}
