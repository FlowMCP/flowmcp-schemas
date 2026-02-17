// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'berlinevents',
    name: 'Berlin Events API',
    description: 'Access to Berlin city events data including markets, festivals, and public assemblies',
    version: '2.0.0',
    docs: ['https://www.berlin.de/'],
    tags: ['berlin', 'events', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.berlin.de',
    routes: {
        markets_festivals: {
            method: 'GET',
            path: '/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json',
            description: 'Weekly and flea markets in Berlin via Berlin.de. Returns structured JSON response data.',
            parameters: []
        },
        street_festivals: {
            method: 'GET',
            path: '/sen/web/service/maerkte-feste/strassen-volksfeste/index.php/index/all.json',
            description: 'Street and folk festivals in Berlin via Berlin.de. Returns structured JSON response data.',
            parameters: []
        },
        christmas_markets: {
            method: 'GET',
            path: '/sen/web/service/maerkte-feste/weihnachtsmaerkte/index.php/index/all.json',
            description: 'Christmas markets in Berlin via Berlin.de. Returns structured JSON response data.',
            parameters: []
        },
        police_assemblies: {
            method: 'GET',
            path: '/polizei/service/versammlungsbehoerde/versammlungen-aufzuege/index.php/index/all.json',
            description: 'Police registered assemblies and demonstrations in Berlin via Berlin.de. Returns structured JSON response data.',
            parameters: []
        }
    }
}
