// Marktstammdatenregister API — Energy Market Master Data (BNetzA)
// Free public API, no auth required
// Source: marktstammdaten.api.bund.dev

export const main = {
    namespace: 'marktstammdaten',
    name: 'Marktstammdatenregister (Energy Market Data)',
    description: 'Query the German energy market master data register (MaStR) from Bundesnetzagentur — public data on 8.4M+ electricity and gas generation/consumption units with filtering and pagination.',
    version: '2.0.0',
    docs: ['https://marktstammdaten.api.bund.dev/', 'https://github.com/bundesAPI/marktstammdaten-api'],
    tags: ['government', 'energy', 'electricity', 'gas', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.marktstammdatenregister.de/MaStR',
    requiredServerParams: [],
    routes: {
        getStromerzeugung: {
            method: 'GET',
            path: '/Einheit/EinheitJson/GetErweiterteOeffentlicheEinheitStromerzeugung',
            description: 'Get extended public data on electricity generation units. Supports filtering (e.g. "In Betrieb~eq~35" for active units) and pagination. Returns unit details, capacity, location, and operator info.',
            parameters: [
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'default(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(5000)', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get first page of electricity generation units', page: 1, pageSize: 5 },
                { _description: 'Get active electricity generation units', filter: 'In Betrieb~eq~35', page: 1, pageSize: 5 }
            ]
        },
        getFilterColumnsStromerzeugung: {
            method: 'GET',
            path: '/Einheit/EinheitJson/GetFilterColumnsErweiterteOeffentlicheEinheitStromerzeugung',
            description: 'Get available filter columns and their possible values for electricity generation unit queries. Use this to discover valid filter parameters.',
            parameters: [],
            tests: [
                { _description: 'Get filter columns for electricity generation' }
            ]
        },
        getFilterColumnsStromverbrauch: {
            method: 'GET',
            path: '/Einheit/EinheitJson/GetFilterColumnsErweiterteOeffentlicheEinheitStromverbrauch',
            description: 'Get available filter columns and their possible values for electricity consumption unit queries.',
            parameters: [],
            tests: [
                { _description: 'Get filter columns for electricity consumption' }
            ]
        },
        getFilterColumnsGaserzeugung: {
            method: 'GET',
            path: '/Einheit/EinheitJson/GetFilterColumnsErweiterteOeffentlicheEinheitGaserzeugung',
            description: 'Get available filter columns and their possible values for gas generation unit queries.',
            parameters: [],
            tests: [
                { _description: 'Get filter columns for gas generation' }
            ]
        },
        getFilterColumnsGasverbrauch: {
            method: 'GET',
            path: '/Einheit/EinheitJson/GetFilterColumnsErweiterteOeffentlicheEinheitGasverbrauch',
            description: 'Get available filter columns and their possible values for gas consumption unit queries.',
            parameters: [],
            tests: [
                { _description: 'Get filter columns for gas consumption' }
            ]
        }
    }
}
