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
            ]
        },
        searchJobsByEmployer: {
            method: 'GET',
            path: '/pc/v4/jobs',
            description: 'Search for job listings by a specific employer name. Returns matching jobs with title, location, and publication date.',
            parameters: [
                { position: { key: 'arbeitgeber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } }
            ]
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
