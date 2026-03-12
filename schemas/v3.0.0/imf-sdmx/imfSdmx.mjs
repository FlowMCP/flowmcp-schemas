export const main = {
    namespace: 'imf',
    name: 'IMF Data',
    description: 'Access International Monetary Fund economic data including balance of payments, fiscal indicators, exchange rates, and monetary statistics via the SDMX JSON REST API.',
    version: '3.0.0',
    docs: ['https://dataservices.imf.org/REST/SDMX_JSON.svc/', 'https://data.imf.org/en/Resource-Pages/IMF-API'],
    tags: ['economics', 'finance', 'statistics', 'international', 'cacheTtlDaily'],
    root: 'https://dataservices.imf.org/REST/SDMX_JSON.svc',
    requiredServerParams: [],
    headers: {},
    tools: {
        listDataflows: {
            method: 'GET',
            path: '/Dataflow',
            description: 'List all available IMF dataflows (databases). Returns database IDs, names, and descriptions for use with CompactData queries.',
            parameters: [],
            tests: [
                { _description: 'List all IMF dataflows' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Structure: { type: 'object', properties: { Dataflows: { type: 'object' } } } } }
            },
        },
        getCompactData: {
            method: 'GET',
            path: '/CompactData/:databaseId/:dimensions',
            description: 'Retrieve IMF data series. Dimensions are dot-separated codes (e.g., frequency.country.indicator). Use startPeriod/endPeriod for time filtering.',
            parameters: [
                { position: { key: 'databaseId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dimensions', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get US GDP data from IFS', databaseId: 'IFS', dimensions: 'Q.US.NGDP_SA_XDC', startPeriod: '2020', endPeriod: '2024' },
                { _description: 'Get Germany CPI from IFS', databaseId: 'IFS', dimensions: 'A.DE.PCPI_IX', startPeriod: '2015', endPeriod: '2024' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { CompactData: { type: 'object', properties: { DataSet: { type: 'object' } } } } }
            },
        },
        getDataStructure: {
            method: 'GET',
            path: '/DataStructure/:databaseId',
            description: 'Get the structure of an IMF database including available dimensions, codes, and code descriptions.',
            parameters: [
                { position: { key: 'databaseId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get structure of IFS database', databaseId: 'IFS' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Structure: { type: 'object', properties: { CodeLists: { type: 'object' } } } } }
            },
        },
        getCodeList: {
            method: 'GET',
            path: '/CodeList/:codeListId',
            description: 'Get all codes and descriptions for a specific code list (e.g., country codes, indicator codes).',
            parameters: [
                { position: { key: 'codeListId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get list of country codes', codeListId: 'CL_AREA_IFS' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Structure: { type: 'object', properties: { CodeLists: { type: 'object' } } } } }
            },
        }
    }
}
