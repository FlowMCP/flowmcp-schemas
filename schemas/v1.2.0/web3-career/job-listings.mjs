export const schema = {
    namespace: "webcareer",
    name: "Web3 Career Job API",
    description: "Query job listings from the web3.career API with optional filters and markdown output.",
    docs: ["https://web3.career/developer-api"],
    tags: ["production", "jobs", "career", "crypto"],
    flowMCP: "1.2.0",
    root: "https://web3.career/api/v1",
    requiredServerParams: ["WEB3_CAREER_API_TOKEN"],
    headers: {},
    routes: {
        queryJobs: {
            requestMethod: "GET",
            description: "Returns Markdown-formatted job listings filtered by remote, country, tag, and limit.",
            route: "/",
            parameters: [
                { position: { key: "token", value: "{{WEB3_CAREER_API_TOKEN}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "remote", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(true,false)", options: ["optional()"] } },
                { position: { key: "country", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "tag", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(50)", "optional()"] } }
            ],
            tests: [
                { _description: "Fetch 5 remote jobs tagged with blockchain in Canada", remote: "true", tag: "blockchain", country: "canada", limit: 5 },
                { _description: "Fetch default jobs with no filters" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "queryJobsMarkdown" }
            ]
        }
    },
    handlers: {
        queryJobsMarkdown: async ({ struct, payload, userParams }) => {
            // Token is already included in the URL by FlowMCP, just make the request
            const res = await fetch(payload.url)
            if (!res.ok) {
                struct.status = false
                struct.messages.push(`HTTP ${res.status}: ${res.statusText}`)
                return { struct, payload }
            }

            const data = await res.json()
            const jobs = data.length > 2 ? data[2] : []
            const strip = txt => txt.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
            const md = jobs.map(job => {
                const desc = strip(job.description || "").slice(0, 100)
                return `- **Job ID**: ${job.id}\n  - **Title**: ${job.title}\n  - **Company**: ${job.company}\n  - **Location**: ${job.location}\n  - **Remote**: ${job.is_remote ? "Yes" : "No"}\n  - **Published At**: ${new Date(job.date_epoch * 1000).toISOString().slice(0, 10)}\n  - **Apply URL**: [Apply](${job.apply_url})\n  - **Description**: ${desc}...`
            }).join("\n\n")

            struct.data = { markdown: "# Web3 Job Listings\n\n" + md + "\n\n*Source: web3.career*" }
            return { struct, payload }
        }
    }
}