export const main = {
    namespace: 'etsi',
    name: 'ETSI IPR Database (Standard Essential Patents)',
    description: 'Search Standard Essential Patent (SEP) declarations at ipr.etsi.org. Covers 134K+ patent families from 432 companies across 3G/4G/5G/WiFi standards. No API — requires Playwright browser automation. Free read-only access, CSV export available.',
    version: '3.0.0',
    docs: ['https://ipr.etsi.org/', 'https://ipr.etsi.org/UserGuide/UserGuide_Anonymous.htm'],
    tags: ['patents', 'standards', 'telecom', '5g', 'wifi', 'sep', 'playwright'],
    root: 'https://ipr.etsi.org',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {},
    skills: {
        'search-declarations': { file: './skills/search-declarations.mjs' }
    }
}
