export const schema = {
    namespace: "arbeitsagentur",
    name: "Arbeitsagentur Jobsuche",
    description: "Search German federal job listings via the Arbeitsagentur Jobsuche API. No API key required — uses public clientId.",
    docs: ["https://jobsuche.api.bund.dev/"],
    tags: ["jobs", "career", "germany"],
    flowMCP: "1.2.0",
    root: "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service",
    requiredServerParams: [],
    headers: {
        "X-API-Key": "jobboerse-jobsuche"
    },
    routes: {
        searchJobs: {
            requestMethod: "GET",
            description: "Search job listings with filters for title, location, employer, field, work schedule, and more.",
            route: "/pc/v4/jobs",
            parameters: [
                { position: { key: "was", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "wo", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "berufsfeld", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "arbeitgeber", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "umkreis", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
                { position: { key: "veroeffentlichtseit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(100)", "optional()"] } },
                { position: { key: "angebotsart", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2,4,34)", options: ["optional()"] } },
                { position: { key: "arbeitszeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(vz,tz,snw,ho,mj)", options: ["optional()"] } },
                { position: { key: "befristung", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(1,2)", options: ["optional()"] } },
                { position: { key: "zeitarbeit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(true,false)", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search for software developer jobs in Berlin", was: "Software Entwickler", wo: "Berlin", size: 5 },
                { _description: "Search for remote jobs published in last 7 days", arbeitszeit: "ho", veroeffentlichtseit: 7, size: 5 },
                { _description: "Search for full-time jobs in Munich", wo: "München", arbeitszeit: "vz", size: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatJobs" }
            ]
        }
    },
    handlers: {
        formatJobs: async ( { struct, payload } ) => {
            if( !struct['data'] || !struct['data']['stellenangebote'] ) {
                return { struct, payload }
            }

            const { maxErgebnisse, stellenangebote } = struct['data']

            const jobs = stellenangebote
                .map( ( entry ) => {
                    const { titel, refnr, beruf, arbeitgeber, arbeitsort, eintrittsdatum, aktuelleVeroeffentlichungsdatum, modifikationsTimestamp } = entry

                    return {
                        title: titel || null,
                        refNumber: refnr || null,
                        profession: beruf || null,
                        employer: arbeitgeber || null,
                        location: arbeitsort ? `${arbeitsort.ort || ''}, ${arbeitsort.plz || ''} ${arbeitsort.region || ''}`.trim() : null,
                        startDate: eintrittsdatum || null,
                        publishedAt: aktuelleVeroeffentlichungsdatum || null,
                        modifiedAt: modifikationsTimestamp || null
                    }
                } )

            struct['data'] = { totalResults: maxErgebnisse, count: jobs.length, jobs }

            return { struct, payload }
        }
    }
}
