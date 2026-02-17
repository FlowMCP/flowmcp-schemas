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
            ],
            tests: [
                { _description: 'Search for IT jobs in Berlin', was: 'Informatik', wo: 'Berlin', size: 5 },
                { _description: 'Search for remote jobs', arbeitszeit: 'ho', size: 5 },
                { _description: 'Search for permanent engineering jobs', was: 'Ingenieur', befristung: 2, size: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stellenangebote: { type: 'array', items: { type: 'object', properties: { beruf: { type: 'string' }, titel: { type: 'string' }, refnr: { type: 'string' }, arbeitsort: { type: 'object' }, arbeitgeber: { type: 'string' }, aktuelleVeroeffentlichungsdatum: { type: 'string' }, modifikationsTimestamp: { type: 'string' }, eintrittsdatum: { type: 'string' }, kundennummerHash: { type: 'string' } } } },
                        maxErgebnisse: { type: 'number' },
                        page: { type: 'number' },
                        size: { type: 'number' },
                        woOutput: { type: 'object', properties: { bereinigterOrt: { type: 'string' }, suchmodus: { type: 'string' }, koordinaten: { type: 'array', items: { type: 'object' } } } },
                        facetten: { type: 'object', properties: { befristung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, verguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, externestellenboersen: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, behinderung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, pav: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, berufsfeld: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsart: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, veroeffentlichtseit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, weitereberufe: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, schulbildung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort_plz: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitgeber: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, beruf: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsverguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, branche: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, quereinstieg: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitszeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, eintrittsdatum: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, zeitarbeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } } } }
                    }
                }
            },
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
            ],
            tests: [
                { _description: 'Search app endpoint for jobs in Munich', was: 'Software', wo: 'München', size: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stellenangebote: { type: 'array', items: { type: 'object', properties: { beruf: { type: 'string' }, titel: { type: 'string' }, refnr: { type: 'string' }, arbeitsort: { type: 'object' }, arbeitgeber: { type: 'string' }, aktuelleVeroeffentlichungsdatum: { type: 'string' }, modifikationsTimestamp: { type: 'string' }, eintrittsdatum: { type: 'string' }, kundennummerHash: { type: 'string' } } } },
                        maxErgebnisse: { type: 'number' },
                        page: { type: 'number' },
                        size: { type: 'number' },
                        woOutput: { type: 'object', properties: { bereinigterOrt: { type: 'string' }, suchmodus: { type: 'string' }, koordinaten: { type: 'array', items: { type: 'object' } } } },
                        facetten: { type: 'object', properties: { verguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, externestellenboersen: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsart: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, schulbildung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitgeber: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, angebotsart: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, bundesland: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, plz_ebene_2: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitszeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, plz_ebene_4: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, plz_ebene_3: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, plz_ebene_5: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, zeitarbeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, befristung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, behinderung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, berufsfeld: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, pav: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, veroeffentlichtseit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort_plz: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, beruf: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsverguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, branche: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, quereinstieg: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, eintrittsdatum: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } } } }
                    }
                }
            },
        }
    }
}
