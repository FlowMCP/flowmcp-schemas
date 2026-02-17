// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'webcareer',
    name: 'Web3 Career Job API',
    description: 'Query job listings from the web3.career API with optional filters and markdown output.',
    version: '2.0.0',
    docs: ['https://web3.career/developer-api'],
    tags: ['production', 'jobs', 'career', 'crypto', 'cacheTtlDaily'],
    root: 'https://web3.career/api/v1',
    requiredServerParams: ['WEB3_CAREER_API_TOKEN'],
    routes: {
        queryJobs: {
            method: 'GET',
            path: '/?token={{WEB3_CAREER_API_TOKEN}}',
            description: 'Returns Markdown-formatted job listings filtered by remote, country, tag, and limit.',
            parameters: [
                { position: { key: 'remote', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'tag', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(50)', 'optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    queryJobs: {
        executeRequest: async ( { struct, payload } ) => {
            const { userParams } = payload
            // Token is already included in the URL by FlowMCP, just make the request
            const res = await fetch(payload.url)
            if (!res.ok) {
            struct.status = false
            struct.messages.push(`HTTP ${res.status}: ${res.statusText}`)
            return { struct }}

            const data = await res.json()
            const jobs = data.length > 2 ? data[2] : []
            const strip = txt => txt.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
            const md = jobs.map(job => {
            const desc = strip(job.description || "").slice(0, 100)
            return `- **Job ID**: ${job.id}\n  - **Title**: ${job.title}\n  - **Company**: ${job.company}\n  - **Location**: ${job.location}\n  - **Remote**: ${job.is_remote ? "Yes" : "No"}\n  - **Published At**: ${new Date(job.date_epoch * 1000).toISOString().slice(0, 10)}\n  - **Apply URL**: [Apply](${job.apply_url})\n  - **Description**: ${desc}...`
            }).join("\n\n")

            struct.data = { markdown: "# Web3 Job Listings\n\n" + md + "\n\n*Source: web3.career*" }
            return { struct }
        }
    }
} )
