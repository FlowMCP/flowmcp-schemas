// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'berlinfunds',
    name: 'Berlin Funds API',
    description: 'Access Berlin city funding data — search available funding opportunities and continuing education programs from the Berlin.de portal (German language).',
    version: '2.0.0',
    docs: ['https://www.berlin.de/'],
    tags: ['berlin', 'funding', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.berlin.de',
    routes: {
        funding_opportunities: {
            method: 'GET',
            path: '/ba-treptow-koepenick/politik-und-verwaltung/beauftragte/integration/foerderungen-finanzen/simplesearch/index.php/index/all.json',
            description: 'Funding opportunities from Berlin-Treptow-Köpenick district via Berlin.de. Returns structured JSON response data.',
            parameters: []
        },
        continuing_education: {
            method: 'GET',
            path: '/sen/arbeit/weiterbildung/bildungszeit/suche/index.php/index/all.json',
            description: 'Continuing education and professional development courses (Bildungszeit) via Berlin.de.',
            parameters: []
        }
    }
}
