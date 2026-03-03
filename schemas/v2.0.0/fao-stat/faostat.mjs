export const main = {
    namespace: 'faostat',
    name: 'FAOSTAT',
    description: 'Access UN Food and Agriculture Organization statistics covering food production, trade, land use, emissions, and food security across 245 countries.',
    version: '2.0.0',
    docs: ['https://fenixservices.fao.org/faostat/api/v1/', 'https://github.com/FAOSTAT/faostat-api'],
    tags: ['agriculture', 'food', 'statistics', 'international', 'cacheTtlDaily'],
    root: 'https://fenixservices.fao.org/faostat/api/v1',
    requiredServerParams: [],
    headers: {},
    routes: {
        getData: {
            method: 'GET',
            path: '/en/data/:domainCode',
            description: 'Retrieve statistical data for a FAOSTAT domain. Filter by area, item, element, and year.',
            parameters: [
                { position: { key: 'domainCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'item', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'element', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'show_codes', value: 'true', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get crop production data for wheat in Germany', domainCode: 'QCL', area: '79', item: '15', year: '2020' },
                { _description: 'Get food balance data for USA', domainCode: 'FBS', area: '231', year: '2020' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { Area: { type: 'string' }, Item: { type: 'string' }, Element: { type: 'string' }, Year: { type: 'number' }, Value: { type: 'number' }, Unit: { type: 'string' } } } } } }
            },
        },
        listDomains: {
            method: 'GET',
            path: '/en/definitions/domain',
            description: 'List all available FAOSTAT data domains (e.g., crop production, trade, land use, emissions).',
            parameters: [],
            tests: [
                { _description: 'List all FAOSTAT domains' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { code: { type: 'string' }, label: { type: 'string' } } } } } }
            },
        },
        getAreaCodes: {
            method: 'GET',
            path: '/en/definitions/types/area',
            description: 'List all country/area codes available in FAOSTAT for filtering data queries.',
            parameters: [],
            tests: [
                { _description: 'List all FAOSTAT area codes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { code: { type: 'string' }, label: { type: 'string' } } } } } }
            },
        },
        getItemCodes: {
            method: 'GET',
            path: '/en/definitions/types/item',
            description: 'List all item codes (commodities, products) available in FAOSTAT.',
            parameters: [],
            tests: [
                { _description: 'List all FAOSTAT item codes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { code: { type: 'string' }, label: { type: 'string' } } } } } }
            },
        }
    }
}
