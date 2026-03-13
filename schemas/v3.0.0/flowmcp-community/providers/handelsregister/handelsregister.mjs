export const main = {
    namespace: 'handelsregister',
    name: 'Handelsregister (German Commercial Register)',
    description: 'Search German commercial register entries at handelsregister.de. No API available — requires Playwright browser automation. Free search, full extracts cost EUR 4.50.',
    version: '3.0.0',
    docs: ['https://www.handelsregister.de/', 'https://handelsregister.de/rp_web/normalesuche/welcome.xhtml'],
    tags: ['germany', 'legal', 'companies', 'register', 'playwright'],
    root: 'https://www.handelsregister.de',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {},
    prompts: {
        about: {
            name: 'about',
            version: 'flowmcp-prompt/1.0.0',
            namespace: 'handelsregister',
            description: 'Overview of Handelsregister — what data is available, how to search, limitations',
            dependsOn: [],
            references: [],
            contentFile: './prompts/about.mjs'
        },
        searchCompany: {
            name: 'search-company',
            version: 'flowmcp-prompt/1.0.0',
            namespace: 'handelsregister',
            description: 'Step-by-step Playwright workflow to search for a company in the German commercial register',
            dependsOn: [],
            references: [],
            contentFile: './prompts/search-company.mjs'
        }
    }
}
