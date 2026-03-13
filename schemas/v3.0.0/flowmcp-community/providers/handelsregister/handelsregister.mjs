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
    skills: {
        'search-company': { file: './skills/search-company.mjs' }
    }
}
