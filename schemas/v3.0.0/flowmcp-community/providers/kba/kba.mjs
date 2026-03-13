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
    prompts: {
        about: {
            name: 'about',
            version: 'flowmcp-prompt/1.0.0',
            namespace: 'kba',
            description: 'Overview of KBA data sources — website downloads, ArcGIS portal, open data via Mobilithek',
            dependsOn: [],
            references: [],
            contentFile: './prompts/about.mjs'
        },
        downloadStatistics: {
            name: 'download-statistics',
            version: 'flowmcp-prompt/1.0.0',
            namespace: 'kba',
            description: 'Step-by-step Playwright workflow to navigate KBA and download vehicle statistics as Excel/CSV',
            dependsOn: [],
            references: [],
            contentFile: './prompts/download-statistics.mjs'
        }
    }
}
