// Hochwasserzentralen API — Flood Monitoring (LHP)
// Free public API, no auth required, CC BY 4.0
// Source: hochwasserzentralen.de

export const main = {
    namespace: 'hochwasserzentralen',
    name: 'Hochwasserzentralen (Flood Monitoring)',
    description: 'Real-time flood monitoring data from the German cross-state flood portal (LHP) — current flood situation at ~1,200 gauging stations and active regional flood warnings across all 16 federal states.',
    version: '2.0.0',
    docs: ['https://www.hochwasserzentralen.de/developers/api-docs', 'https://hochwasserzentralen.api.bund.dev/'],
    tags: ['government', 'environment', 'flood', 'weather', 'germany', 'opendata', 'cacheTtlRealtime'],
    root: 'https://api.hochwasserzentralen.de/public/v1',
    requiredServerParams: [],
    routes: {
        getStations: {
            method: 'GET',
            path: '/data/stations',
            description: 'Get current flood situation at all gauging stations in Germany. Returns station name, river, flood class (0-4), coordinates, and link to state portal. Filter by federal states.',
            parameters: [
                { position: { key: 'states', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all stations across Germany' },
                { _description: 'Get stations in Bavaria and Baden-Wuerttemberg', states: 'BY,BW' },
                { _description: 'Get stations in Nordrhein-Westfalen', states: 'NW' }
            ]
        },
        getAlerts: {
            method: 'GET',
            path: '/data/alerts',
            description: 'Get active regional flood warnings from all German federal states. Returns alert area, warning headline, flood class, and polygon geometry. Filter by federal states.',
            parameters: [
                { position: { key: 'states', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all active flood alerts' },
                { _description: 'Get flood alerts for Sachsen and Thueringen', states: 'SN,TH' }
            ]
        }
    }
}
