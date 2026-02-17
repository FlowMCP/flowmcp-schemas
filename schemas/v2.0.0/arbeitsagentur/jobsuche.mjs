// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'arbeitsagentur',
    name: 'Arbeitsagentur Jobsuche',
    description: 'Search job listings from the German Federal Employment Agency (Bundesagentur fuer Arbeit) public job board API',
    version: '2.0.0',
    docs: ['https://jobsuche.api.bund.dev/'],
    tags: ['jobs', 'employment', 'germany', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service',
    headers: {
        'X-API-Key': 'jobboerse-jobsuche'
    },
    routes: {
        searchJobs: {
            method: 'GET',
            path: '/pc/v4/jobs',
            description: 'Search for job listings with filters for keywords, location, job type, and working hours',
            parameters: [
                { position: { key: 'was', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'wo', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'berufsfeld', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'arbeitgeber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'veroeffentlichtseit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(100)', 'optional()'] } },
                { position: { key: 'angebotsart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,4,34)', options: ['optional()'] } },
                { position: { key: 'arbeitszeit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(vz,tz,snw,ho,mj)', options: ['optional()'] } },
                { position: { key: 'befristung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2)', options: ['optional()'] } },
                { position: { key: 'zeitarbeit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'behinderung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'umkreis', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ]
        },
        searchJobsApp: {
            method: 'GET',
            path: '/pc/v4/app/jobs',
            description: 'Search for job listings via the app-optimized endpoint with the same filters via arbeitsagentur.',
            parameters: [
                { position: { key: 'was', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'wo', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'berufsfeld', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'arbeitgeber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'veroeffentlichtseit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(100)', 'optional()'] } },
                { position: { key: 'angebotsart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,4,34)', options: ['optional()'] } },
                { position: { key: 'arbeitszeit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(vz,tz,snw,ho,mj)', options: ['optional()'] } },
                { position: { key: 'befristung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2)', options: ['optional()'] } },
                { position: { key: 'zeitarbeit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'behinderung', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'umkreis', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ]
        }
    }
}
