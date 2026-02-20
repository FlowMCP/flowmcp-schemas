// Bundeshaushalt API — Federal Budget Data (BMF)
// Free public API, no auth required
// Source: bundeshaushalt.de

export const main = {
    namespace: 'bundeshaushalt',
    name: 'Bundeshaushalt (Federal Budget)',
    description: 'Query the German federal budget data from 2012-2025 — expenses and income by Einzelplan, functional classification, or expenditure group with hierarchical drill-down.',
    version: '2.0.0',
    docs: ['https://github.com/bundesAPI/bundeshaushalt-api', 'https://www.bundeshaushalt.de/'],
    tags: ['government', 'finance', 'budget', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://bundeshaushalt.de/internalapi',
    requiredServerParams: [],
    routes: {
        getBudgetByEinzelplan: {
            method: 'GET',
            path: '/budgetData',
            description: 'Get federal budget data by Einzelplan (ministry/department). Use id to drill down: Level 0 = all Einzelplaene, Level 1 = Kapitel, Level 2 = Titel, Level 3 = Detail with PDF links.',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2012)', 'max(2025)', 'default(2024)'] } },
                { position: { key: 'account', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(expenses,income)', 'default(expenses)'] } },
                { position: { key: 'quota', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(target,actual)', 'default(target)'] } },
                { position: { key: 'unit', value: 'single', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all Einzelplaene expenses 2024', year: 2024, account: 'expenses', quota: 'target' },
                { _description: 'Drill into Ministry of Labor (11)', year: 2024, account: 'expenses', quota: 'target', id: '11' }
            ]
        },
        getBudgetByFunction: {
            method: 'GET',
            path: '/budgetData',
            description: 'Get federal budget data by functional classification (Funktionenplan). Use id with F- prefix to drill down: Level 0 = Hauptfunktionen, Level 1+ = sub-functions (e.g. F-2, F-22, F-221).',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2012)', 'max(2025)', 'default(2024)'] } },
                { position: { key: 'account', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(expenses,income)', 'default(expenses)'] } },
                { position: { key: 'quota', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(target,actual)', 'default(target)'] } },
                { position: { key: 'unit', value: 'function', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all Hauptfunktionen expenses 2024', year: 2024, account: 'expenses', quota: 'target' },
                { _description: 'Drill into social security (F-2)', year: 2024, account: 'expenses', quota: 'target', id: 'F-2' }
            ]
        },
        getBudgetByGroup: {
            method: 'GET',
            path: '/budgetData',
            description: 'Get federal budget data by expenditure group (Gruppierungsplan). Use id with G- prefix to drill down: Level 0 = Hauptgruppen, Level 1+ = sub-groups (e.g. G-6, G-63, G-636).',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(2012)', 'max(2025)', 'default(2024)'] } },
                { position: { key: 'account', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(expenses,income)', 'default(expenses)'] } },
                { position: { key: 'quota', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum()', options: ['values(target,actual)', 'default(target)'] } },
                { position: { key: 'unit', value: 'group', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all Hauptgruppen expenses 2024', year: 2024, account: 'expenses', quota: 'target' },
                { _description: 'Drill into transfers (G-6)', year: 2024, account: 'expenses', quota: 'target', id: 'G-6' }
            ]
        }
    }
}
