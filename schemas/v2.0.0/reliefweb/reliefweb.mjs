export const main = {
    namespace: 'reliefweb',
    name: 'ReliefWeb',
    description: 'Access UN OCHA\'s ReliefWeb humanitarian data including crisis reports, disaster information, job listings, and training opportunities from 4000+ sources covering global humanitarian situations since 1996.',
    docs: ['https://apidoc.reliefweb.int/'],
    tags: ['humanitarian', 'disasters', 'crises', 'unocha', 'opendata', 'news', 'cacheTtlHourly'],
    version: '2.0.0',
    root: 'https://api.reliefweb.int',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchReports: {
            method: 'GET',
            path: '/v2/reports',
            description: 'Search humanitarian situation reports, assessments, and analysis from ReliefWeb. Filter by keywords, country, or date.',
            parameters: [
                { position: { key: 'appname', value: 'flowmcp', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(flowmcp)'] } },
                { position: { key: 'query[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[field]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'sort[]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search reports about earthquake', 'query[value]': 'earthquake', limit: 5 },
                { _description: 'Search reports about flooding in 2024', 'query[value]': 'flooding 2024', limit: 5 },
                { _description: 'Search latest cholera outbreak reports', 'query[value]': 'cholera outbreak', limit: 5 }
            ],
        },
        searchDisasters: {
            method: 'GET',
            path: '/v2/disasters',
            description: 'Search active and historical disasters in ReliefWeb. Returns disaster names, types, affected countries, and GLIDE numbers going back to 1981.',
            parameters: [
                { position: { key: 'appname', value: 'flowmcp', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(flowmcp)'] } },
                { position: { key: 'query[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[field]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for earthquake disasters', 'query[value]': 'earthquake', limit: 5 },
                { _description: 'Search for flood disasters', 'query[value]': 'flood', limit: 5 },
                { _description: 'Search for cyclone disasters', 'query[value]': 'cyclone', limit: 5 }
            ],
        },
        searchJobs: {
            method: 'GET',
            path: '/v2/jobs',
            description: 'Search humanitarian job listings on ReliefWeb. Find NGO, UN, and humanitarian organization positions classified by type, category, and location.',
            parameters: [
                { position: { key: 'appname', value: 'flowmcp', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(flowmcp)'] } },
                { position: { key: 'query[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[field]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for field coordinator jobs', 'query[value]': 'field coordinator', limit: 5 },
                { _description: 'Search for logistics jobs', 'query[value]': 'logistics', limit: 5 },
                { _description: 'Search for data analyst positions in humanitarian sector', 'query[value]': 'data analyst', limit: 5 }
            ],
        },
        getReportById: {
            method: 'GET',
            path: '/v2/reports/:id',
            description: 'Get a specific humanitarian report by its ReliefWeb ID. Returns full report details including title, body text, sources, countries, and attachments.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'appname', value: 'flowmcp', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(flowmcp)'] } }
            ],
            tests: [
                { _description: 'Get a specific report by ID', id: '3903218' },
                { _description: 'Get another report by ID', id: '4023456' }
            ],
        },
        searchCountries: {
            method: 'GET',
            path: '/v2/countries',
            description: 'Search ReliefWeb countries and territories with humanitarian presence. Returns geographic identifiers used to filter other ReliefWeb content.',
            parameters: [
                { position: { key: 'appname', value: 'flowmcp', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(flowmcp)'] } },
                { position: { key: 'query[value]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for Syria country entry', 'query[value]': 'Syria', limit: 5 },
                { _description: 'Search for Yemen country entry', 'query[value]': 'Yemen', limit: 5 },
                { _description: 'List countries starting with A', 'query[value]': 'Afghanistan', limit: 5 }
            ],
        }
    },
}