export const schema = {
    namespace: "arbeitsagentur",
    name: "Arbeitsagentur Jobsuche API",
    description: "German Federal Employment Agency (Bundesagentur fuer Arbeit) job search API providing access to Germany's largest job database with filtering by profession, location, employer, and job type",
    docs: ["https://jobsuche.api.bund.dev/"],
    tags: ["jobs", "germany", "employment", "labor", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service",
    requiredServerParams: [],
    headers: {
        "X-API-Key": "jobboerse-jobsuche"
    },
    routes: {
        searchJobs: {
            requestMethod: "GET",
            description: "Search for job listings by keyword, location, profession field, employer, or job type. Returns job title, employer, location with coordinates, and publication date.",
            route: "/pc/v4/jobs",
            parameters: [
                { position: { key: "was", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "wo", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "berufsfeld", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "arbeitgeber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "angebotsart", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search software jobs in Berlin", was: "software", wo: "berlin", size: 5 },
                { _description: "Search all jobs", size: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatJobs" }
            ]
        },
        searchJobsByEmployer: {
            requestMethod: "GET",
            description: "Search for job listings by a specific employer name. Returns matching jobs with title, location, and publication date.",
            route: "/pc/v4/jobs",
            parameters: [
                { position: { key: "arbeitgeber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } }
            ],
            tests: [
                { _description: "Search Deutsche Bahn jobs", arbeitgeber: "Deutsche Bahn", size: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatJobs" }
            ]
        }
    },
    handlers: {
        formatJobs: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.stellenangebote ) { return { struct, payload } }

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

            struct.data = {
                maxResults: raw.maxErgebnisse || null,
                jobCount: jobs.length,
                jobs
            }

            return { struct, payload }
        }
    }
}
