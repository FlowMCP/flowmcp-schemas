// Entgeltatlas API — Wage & Salary Data (Bundesagentur fuer Arbeit)
// Requires API key (documented at github.com/bundesAPI/entgeltatlas-api)
// Source: entgeltatlas.api.bund.dev

export const main = {
    namespace: 'arbeitsagentur',
    name: 'Entgeltatlas (Wage Data)',
    description: 'Query German wage and salary data from the Entgeltatlas of Bundesagentur fuer Arbeit — median salaries by occupation (KldB code), region, gender, age group, and industry sector.',
    version: '2.0.0',
    docs: ['https://entgeltatlas.api.bund.dev/', 'https://github.com/bundesAPI/entgeltatlas-api'],
    tags: ['government', 'employment', 'wages', 'salary', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/infosysbub/entgeltatlas/pc/v1',
    requiredServerParams: ['ENTGELTATLAS_API_KEY'],
    headers: {
        'X-API-Key': '{{ENTGELTATLAS_API_KEY}}'
    },
    routes: {
        getEntgelte: {
            method: 'GET',
            path: '/entgelte/:kldb',
            description: 'Get wage data for an occupation by KldB code (Klassifikation der Berufe 2010, 3-5 digits). Filter by performance level, region, gender, age, and industry. Returns median, quartiles, and sample size.',
            parameters: [
                { position: { key: 'kldb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^\\d{3,5}$)'] } },
                { position: { key: 'l', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(1,2,3,4)', 'optional()'] } },
                { position: { key: 'r', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(30)', 'optional()'] } },
                { position: { key: 'g', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(1,2,3)', 'optional()'] } },
                { position: { key: 'a', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(1,2,3,4)', 'optional()'] } },
                { position: { key: 'b', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(1,2,3,4,5,6,7,8,9,10,11)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get wages for software developers (84304)', kldb: '84304' },
                { _description: 'Get expert-level wages for software developers in Germany', kldb: '84304', l: '4', r: 1, a: '1', b: '1' }
            ]
        },
        getMediandaten: {
            method: 'GET',
            path: '/mediandaten',
            description: 'Get median wage data by DKZ IDs (comma-separated). Returns median salary values for specified occupation identifiers.',
            parameters: [
                { position: { key: 'dkzIds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get median data for DKZ ID 77878', dkzIds: '77878' }
            ]
        },
        getPrimaererMedian: {
            method: 'GET',
            path: '/primaerer-median/:id',
            description: 'Get primary median wage value for a specific occupation identifier.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get primary median for ID 77878', id: '77878' }
            ]
        },
        getRegionen: {
            method: 'GET',
            path: '/regionen',
            description: 'Get reference list of all available regions for wage data filtering. Includes Germany overall, East/West, federal states, and major cities.',
            parameters: [],
            tests: [
                { _description: 'Get all regions' }
            ]
        },
        getGeschlechter: {
            method: 'GET',
            path: '/geschlechter',
            description: 'Get reference list of gender filter options (total, male, female).',
            parameters: [],
            tests: [
                { _description: 'Get gender options' }
            ]
        },
        getAlter: {
            method: 'GET',
            path: '/alter',
            description: 'Get reference list of age group filter options (total, under 25, 25-54, 55+).',
            parameters: [],
            tests: [
                { _description: 'Get age group options' }
            ]
        },
        getBranchen: {
            method: 'GET',
            path: '/branchen',
            description: 'Get reference list of industry sector filter options (agriculture, manufacturing, construction, trade, IT, finance, etc.).',
            parameters: [],
            tests: [
                { _description: 'Get industry sector options' }
            ]
        }
    }
}
