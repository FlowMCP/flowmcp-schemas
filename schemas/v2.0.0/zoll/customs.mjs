// Zoll API — Import Tariffs & Exchange Rates (Einfuhrzoll)
// Free public API, requires specific User-Agent header
// Source: zoll.api.bund.dev

export const main = {
    namespace: 'zoll',
    name: 'Zoll (Import Tariffs & Exchange Rates)',
    description: 'Query German customs data — import tariffs, product categories, countries, exchange rates, product groups, and units of measurement for customs calculations.',
    version: '2.0.0',
    docs: ['https://zoll.api.bund.dev/', 'https://github.com/bundesAPI/zoll-api'],
    tags: ['government', 'customs', 'tariffs', 'trade', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/Apps/retrieve',
    requiredServerParams: [],
    headers: {
        'User-Agent': 'zollundpost/2 CFNetwork/1220.1 Darwin/20.3.0'
    },
    routes: {
        getExchangeRates: {
            method: 'GET',
            path: '/Kurse/App/KursExport.txt',
            description: 'Get current currency exchange rates used for customs calculations. Returns all available exchange rates with currency codes and conversion values.',
            parameters: [
                { position: { key: 'view', value: 'jsonexportkurseZOLLWeb', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all exchange rates' }
            ]
        },
        getCategories: {
            method: 'GET',
            path: '/kategorien',
            description: 'Get product categories for customs tariff classification. Returns category tree with titles, descriptions, and modification dates.',
            parameters: [
                { position: { key: 'client', value: 'ZUP', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'view', value: 'renderJsonApp', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastModifiedDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all product categories' }
            ]
        },
        getProducts: {
            method: 'GET',
            path: '/produkte',
            description: 'Get products with customs tariff rates. Returns products with EU taxes, tariff details, and descriptions.',
            parameters: [
                { position: { key: 'client', value: 'ZUP', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'view', value: 'renderJsonApp', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastModifiedDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all products with tariff rates' }
            ]
        },
        getCountries: {
            method: 'GET',
            path: '/laender',
            description: 'Get list of countries and regions with EU membership status and tariff calculation flags for customs classification.',
            parameters: [
                { position: { key: 'client', value: 'ZUP', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'view', value: 'renderJsonApp', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastModifiedDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all countries' }
            ]
        },
        getProductGroups: {
            method: 'GET',
            path: '/produktgruppen',
            description: 'Get product group classifications used for customs tariff grouping with type identifiers and applicability flags.',
            parameters: [
                { position: { key: 'client', value: 'ZUP', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'view', value: 'renderJsonApp', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastModifiedDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all product groups' }
            ]
        },
        getProductUnits: {
            method: 'GET',
            path: '/produkteinheiten',
            description: 'Get units of measurement for customs product quantities with type and title information.',
            parameters: [
                { position: { key: 'client', value: 'ZUP', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'view', value: 'renderJsonApp', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastModifiedDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all product units' }
            ]
        }
    }
}
