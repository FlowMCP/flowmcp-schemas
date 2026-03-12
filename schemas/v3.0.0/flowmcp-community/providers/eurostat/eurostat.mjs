export const main = {
    namespace: 'eurostat',
    name: 'Eurostat',
    description: 'Access EU statistical data from Eurostat covering demographics, economy, trade, environment, and more via the SDMX 2.1 REST API.',
    version: '3.0.0',
    docs: ['https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/api-getting-started'],
    tags: ['statistics', 'europe', 'economy', 'demographics', 'cacheTtlDaily'],
    root: 'https://ec.europa.eu/eurostat/api/dissemination',
    requiredServerParams: [],
    headers: {},
    tools: {
        getDataset: {
            method: 'GET',
            path: '/statistics/1.0/data/:datasetCode',
            description: 'Retrieve statistical data for a Eurostat dataset in JSON-stat format. Supports dimension filtering via query parameters.',
            parameters: [
                { position: { key: 'datasetCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'geo', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'time', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(en,fr,de)', options: ['optional()', 'default(en)'] } }
            ],
            tests: [
                { _description: 'Get EU population data for Germany', datasetCode: 'tps00001', geo: 'DE' },
                { _description: 'Get GDP data for France', datasetCode: 'tec00001', geo: 'FR' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { version: { type: 'string' }, label: { type: 'string' }, id: { type: 'array' }, size: { type: 'array' }, dimension: { type: 'object' }, value: { type: 'object' } } }
            },
        },
        listDataflows: {
            method: 'GET',
            path: '/sdmx/2.1/dataflow/ESTAT/all/latest',
            description: 'List all available Eurostat dataflows (datasets). Returns SDMX metadata with dataset codes and descriptions.',
            parameters: [
                { position: { key: 'detail', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(full,allstubs,referencestubs)', options: ['optional()', 'default(allstubs)'] } }
            ],
            tests: [
                { _description: 'List all Eurostat dataflows as stubs', detail: 'allstubs' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: { type: 'object', properties: { Structure: { type: 'object' } } }
            },
        },
        getDataStructure: {
            method: 'GET',
            path: '/sdmx/2.1/datastructure/ESTAT/:datasetCode',
            description: 'Get the data structure definition for a Eurostat dataset, including available dimensions, codes, and their descriptions.',
            parameters: [
                { position: { key: 'datasetCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get structure for population dataset', datasetCode: 'tps00001' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: { type: 'object', properties: { Structure: { type: 'object' } } }
            },
        }
    }
}
