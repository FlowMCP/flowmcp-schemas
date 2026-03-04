export const main = {
    namespace: 'collegescorecard',
    name: 'College Scorecard US Education',
    description: 'Access the US Department of Education College Scorecard API. Search and compare 6,000+ US colleges and universities. Get data on admissions, costs, graduation rates, earnings after graduation, and student demographics. Uses DEMO_KEY for testing. Free government data.',
    version: '2.0.0',
    docs: ['https://collegescorecard.ed.gov/data/documentation/'],
    tags: ['education', 'government', 'statistics', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.data.gov',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchSchools: {
            method: 'GET',
            path: '/ed/collegescorecard/v1/schools.json',
            description: 'Search colleges by name, state, or other criteria. Returns school details including costs, admissions, and outcomes. Use fields parameter to limit response size. DEMO_KEY allows 1,000 requests/hour.',
            parameters: [
                { position: { key: 'api_key', value: 'DEMO_KEY', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'school.name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'school.state', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fields', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(school.name,school.city,school.state,latest.admissions.admission_rate.overall,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.student.size)'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search Harvard', api_key: 'DEMO_KEY', 'school.name': 'harvard', per_page: 3 },
                { _description: 'Schools in Massachusetts', api_key: 'DEMO_KEY', 'school.state': 'MA', per_page: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { metadata: { type: 'object', properties: { total: { type: 'number' }, page: { type: 'number' }, per_page: { type: 'number' } } }, results: { type: 'array', items: { type: 'object' } } } }
            }
        }
    }
}
