// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'arbeitsagentur',
    name: 'Arbeitsagentur Jobsuche API',
    description: 'German Federal Employment Agency (Bundesagentur fuer Arbeit) job search API providing access to Germany\'s largest job database with filtering by profession, location, employer, and job type',
    version: '2.0.0',
    docs: ['https://jobsuche.api.bund.dev/'],
    tags: ['jobs', 'germany', 'employment', 'labor', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service',
    headers: {
        'X-API-Key': 'jobboerse-jobsuche'
    },
    routes: {
        searchJobs: {
            method: 'GET',
            path: '/pc/v4/jobs',
            description: 'Search for job listings by keyword, location, profession field, employer, or job type. Returns job title, employer, location with coordinates, and publication date.',
            parameters: [
                { position: { key: 'was', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'wo', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'berufsfeld', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'arbeitgeber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'angebotsart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search software jobs in Berlin', was: 'software', wo: 'berlin', size: 5 },
                { _description: 'Search all jobs', size: 5 }
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
                        facetten: { type: 'object', properties: { befristung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, verguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, externestellenboersen: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, behinderung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, berufsfeld: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, pav: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, veroeffentlichtseit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsart: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, weitereberufe: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, schulbildung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitsort_plz: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitgeber: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, beruf: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, ausbildungsverguetung: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, quereinstieg: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, branche: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, arbeitszeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, eintrittsdatum: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } }, zeitarbeit: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } } } }
                    }
                }
            },
        },
        searchJobsByEmployer: {
            method: 'GET',
            path: '/pc/v4/jobs',
            description: 'Search for job listings by a specific employer name. Returns matching jobs with title, location, and publication date.',
            parameters: [
                { position: { key: 'arbeitgeber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search Deutsche Bahn jobs', arbeitgeber: 'Deutsche Bahn', size: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        maxErgebnisse: { type: 'number' },
                        page: { type: 'number' },
                        size: { type: 'number' },
                        facetten: { type: 'object', properties: { arbeitgeber: { type: 'object', properties: { counts: { type: 'object' }, maxCount: { type: 'number' } } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchJobs: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.stellenangebote ) { return { response }}

            const jobs = raw.stellenangebote
            .map( ( job ) => {
            const result = {
            refnr: job.refnr || null,
            title: job.titel || null,
            profession: job.beruf || null,
            employer: job.arbeitgeber || null,
            location: job.arbeitsort?.ort || null,
            region: job.arbeitsort?.region || null,
            publishedDate: job.aktuelleVeroeffentlichungsdatum || null,
            entryDate: job.eintrittsdatum || null
            }

            return result
            } )

            response = {
            maxResults: raw.maxErgebnisse || null,
            jobCount: jobs.length,
            jobs
            }

            return { response }
        }
    },
    searchJobsByEmployer: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.stellenangebote ) { return { response }}

            const jobs = raw.stellenangebote
            .map( ( job ) => {
            const result = {
            refnr: job.refnr || null,
            title: job.titel || null,
            profession: job.beruf || null,
            employer: job.arbeitgeber || null,
            location: job.arbeitsort?.ort || null,
            region: job.arbeitsort?.region || null,
            publishedDate: job.aktuelleVeroeffentlichungsdatum || null,
            entryDate: job.eintrittsdatum || null
            }

            return result
            } )

            response = {
            maxResults: raw.maxErgebnisse || null,
            jobCount: jobs.length,
            jobs
            }

            return { response }
        }
    }
} )
