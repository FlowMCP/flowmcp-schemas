export const main = {
    namespace: 'entgeltatlas',
    name: 'Entgeltatlas',
    description: 'Access median wages and salaries by occupation, region, gender, age group, and industry sector in Germany from the Federal Employment Agency (Bundesagentur fuer Arbeit).',
    version: '3.0.0',
    docs: ['https://github.com/bundesAPI/entgeltatlas-api'],
    tags: ['employment', 'wages', 'germany', 'government', 'statistics', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/infosysbub/entgeltatlas',
    requiredServerParams: ['ENTGELTATLAS_API_KEY'],
    headers: {
        'X-API-Key': '{{ENTGELTATLAS_API_KEY}}'
    },
    tools: {
        getSalaryByOccupation: {
            method: 'GET',
            path: '/pc/v1/entgelte/:kldb',
            description: 'Get median salary data for a specific occupation by KldB classification code. Optionally filter by performance level, region, gender, age group, and industry sector.',
            parameters: [
                { position: { key: 'kldb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'l', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,3,4)', options: ['optional()'] } },
                { position: { key: 'r', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(30)'] } },
                { position: { key: 'g', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,3)', options: ['optional()'] } },
                { position: { key: 'a', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,3,4)', options: ['optional()'] } },
                { position: { key: 'b', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(11)'] } }
            ],
            tests: [
                { _description: 'Get salary for software developers (KldB 43114)', kldb: '43114' },
                { _description: 'Get salary for nurses, female only', kldb: '81302', g: '3' },
                { _description: 'Get salary for mechanical engineers in Bavaria', kldb: '25104', r: '2' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { median: { type: 'number' }, q1: { type: 'number' }, q3: { type: 'number' }, anzahl: { type: 'number' } } }
            },
        },
        getRegions: {
            method: 'GET',
            path: '/pc/v1/regionen',
            description: 'List all available regions and cities with their codes for filtering salary queries.',
            parameters: [],
            tests: [
                { _description: 'List all regions' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } } }
            },
        },
        getIndustries: {
            method: 'GET',
            path: '/pc/v1/branchen',
            description: 'List all available industry sector classifications with their codes for filtering salary queries.',
            parameters: [],
            tests: [
                { _description: 'List all industry sectors' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } } }
            },
        },
        getAgeGroups: {
            method: 'GET',
            path: '/pc/v1/alter',
            description: 'List all available age group classifications with their codes for filtering salary queries.',
            parameters: [],
            tests: [
                { _description: 'List all age groups' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } } }
            },
        },
        getGenders: {
            method: 'GET',
            path: '/pc/v1/geschlechter',
            description: 'List all available gender categories with their codes for filtering salary queries.',
            parameters: [],
            tests: [
                { _description: 'List all gender categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } } }
            },
        },
        getMedianData: {
            method: 'GET',
            path: '/pc/v1/mediandaten',
            description: 'Get median salary overview data for one or more occupations by their DKZ IDs.',
            parameters: [
                { position: { key: 'dkzIds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get median data for software developer', dkzIds: '43114' },
                { _description: 'Get median data for multiple occupations', dkzIds: '43114,81302' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { dkzId: { type: 'string' }, median: { type: 'number' }, bezeichnung: { type: 'string' } } } }
            },
        },
    },
}
