export const main = {
    namespace: 'kba',
    name: 'KBA (Kraftfahrt-Bundesamt) Vehicle Statistics',
    description: 'Access German vehicle registration statistics from KBA. No direct API — data available via kba.de Excel downloads and ArcGIS Statistikportal with CSV/GeoJSON exports. Requires Playwright for navigation.',
    version: '3.0.0',
    docs: ['https://www.kba.de/DE/Statistik/statistik_node.html', 'https://das-kba-statistikportal.hub.arcgis.com/search'],
    tags: ['germany', 'vehicles', 'statistics', 'opendata', 'playwright'],
    root: 'https://www.kba.de',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {},
    skills: {
        'download-statistics': { file: './skills/download-statistics.mjs' }
    }
}
