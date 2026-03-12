export const main = {
    namespace: 'dailymed',
    name: 'DailyMed',
    description: 'Search FDA drug labels, SPL documents, drug names, NDC codes, and drug classes via the NLM DailyMed REST API.',
    version: '3.0.0',
    docs: ['https://dailymed.nlm.nih.gov/dailymed/app-support-web-services.cfm'],
    tags: ['health', 'drugs', 'fda', 'pharmacy', 'labels', 'cacheTtlDaily'],
    root: 'https://dailymed.nlm.nih.gov/dailymed/services/v2',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchSpls: {
            method: 'GET',
            path: '/spls.json',
            description: 'Search SPL (Structured Product Labeling) documents. Returns a paginated list of drug labels with set IDs, titles, and metadata.',
            parameters: [
                { position: { key: 'drug_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'setid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ndc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagesize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for aspirin labels', drug_name: 'aspirin', pagesize: 5 },
                { _description: 'Search for ibuprofen labels', drug_name: 'ibuprofen', pagesize: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        metadata: { type: 'object', properties: { total_elements: { type: 'number' }, elements_per_page: { type: 'number' }, current_page: { type: 'number' }, total_pages: { type: 'number' } } },
                        data: { type: 'array', items: { type: 'object', properties: { setid: { type: 'string' }, spl_version: { type: 'number' }, title: { type: 'string' }, published_date: { type: 'string' } } } }
                    }
                }
            },
        },
        getSplById: {
            method: 'GET',
            path: '/spls/:setId.json',
            description: 'Get detailed SPL document information for a specific SET ID including title, sponsor, product names, and active ingredients.',
            parameters: [
                { position: { key: 'setId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get aspirin SPL by set ID', setId: 'bca21783-08f5-41a1-99de-32a76419a46e' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { setid: { type: 'string' }, title: { type: 'string' }, effective_time: { type: 'string' }, products: { type: 'array' } } }
                    }
                }
            },
        },
        getDrugNames: {
            method: 'GET',
            path: '/drugnames.json',
            description: 'Retrieve drug names indexed in DailyMed. Supports filtering by drug name prefix.',
            parameters: [
                { position: { key: 'drug_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagesize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for drug names starting with amox', drug_name: 'amox', pagesize: 5 },
                { _description: 'Search for metformin', drug_name: 'metformin', pagesize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        metadata: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { drug_name: { type: 'string' } } } }
                    }
                }
            },
        },
        getDrugClasses: {
            method: 'GET',
            path: '/drugclasses.json',
            description: 'Retrieve all drug classification types indexed in DailyMed (pharmacologic class, chemical structure, mechanism of action, etc.).',
            parameters: [
                { position: { key: 'drug_class_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagesize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for antibiotic drug classes', drug_class_name: 'antibiotic', pagesize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        metadata: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { drug_class_name: { type: 'string' }, drug_class_coding_system: { type: 'string' } } } }
                    }
                }
            },
        },
        getNdcs: {
            method: 'GET',
            path: '/ndcs.json',
            description: 'Retrieve National Drug Code (NDC) numbers. Supports filtering by drug name.',
            parameters: [
                { position: { key: 'drug_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagesize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get NDC codes for aspirin', drug_name: 'aspirin', pagesize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        metadata: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { ndc: { type: 'string' }, drug_name: { type: 'string' } } } }
                    }
                }
            },
        },
        getUniis: {
            method: 'GET',
            path: '/uniis.json',
            description: 'Retrieve UNII (Unique Ingredient Identifier) codes for substances indexed in DailyMed.',
            parameters: [
                { position: { key: 'unii', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagesize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get first 5 UNII codes', pagesize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        metadata: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { unii: { type: 'string' }, substance_name: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}
