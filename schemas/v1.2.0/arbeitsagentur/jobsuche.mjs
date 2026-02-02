export const schema = {
    namespace: "arbeitsagentur",
    name: "Arbeitsagentur Jobsuche",
    description: "Search job listings from the German Federal Employment Agency (Bundesagentur fuer Arbeit) public job board API",
    docs: ["https://jobsuche.api.bund.dev/"],
    tags: ["jobs", "employment", "germany"],
    flowMCP: "1.2.0",
    root: "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service",
    requiredServerParams: [],
    headers: {
        "X-API-Key": "jobboerse-jobsuche"
    },
    routes: {
        searchJobs: {
            requestMethod: "GET",
            description: "Search for job listings with filters for keywords, location, job type, and working hours",
            route: "/pc/v4/jobs",
            parameters: [
                { position: { key: "was", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "wo", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "berufsfeld", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "arbeitgeber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "veroeffentlichtseit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(100)", "optional()"] } },
                { position: { key: "angebotsart", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2,4,34)", options: ["optional()"] } },
                { position: { key: "arbeitszeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(vz,tz,snw,ho,mj)", options: ["optional()"] } },
                { position: { key: "befristung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2)", options: ["optional()"] } },
                { position: { key: "zeitarbeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "behinderung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "umkreis", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search for IT jobs in Berlin", was: "Informatik", wo: "Berlin", size: 5 },
                { _description: "Search for remote jobs", arbeitszeit: "ho", size: 5 },
                { _description: "Search for permanent engineering jobs", was: "Ingenieur", befristung: 2, size: 5 }
            ],
            modifiers: []
        },
        searchJobsApp: {
            requestMethod: "GET",
            description: "Search for job listings via the app-optimized endpoint with the same filters via arbeitsagentur.",
            route: "/pc/v4/app/jobs",
            parameters: [
                { position: { key: "was", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "wo", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "berufsfeld", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "arbeitgeber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "veroeffentlichtseit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(100)", "optional()"] } },
                { position: { key: "angebotsart", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2,4,34)", options: ["optional()"] } },
                { position: { key: "arbeitszeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(vz,tz,snw,ho,mj)", options: ["optional()"] } },
                { position: { key: "befristung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2)", options: ["optional()"] } },
                { position: { key: "zeitarbeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "behinderung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "umkreis", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search app endpoint for jobs in Munich", was: "Software", wo: "München", size: 5 }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
