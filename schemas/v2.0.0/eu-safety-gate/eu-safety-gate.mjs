export const main = {
    namespace: 'eusafetygate',
    name: 'EU Safety Gate Product Recalls',
    description: 'Access the EU Safety Gate (formerly RAPEX) system for dangerous product notifications across the European Economic Area. Query product recall alerts, weekly reports, risk types, product categories, and country data. Covers 250+ countries, 20+ risk types, and 30+ product categories. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://ec.europa.eu/safety-gate-alerts/'],
    tags: ['consumer-safety', 'eu', 'product-recalls', 'opendata', 'cacheTtlDaily'],
    root: 'https://ec.europa.eu/safety-gate-alerts/public/api',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    routes: {
        listLanguages: {
            method: 'GET',
            path: '/languages',
            description: 'List all supported languages in the EU Safety Gate system. Returns 28 languages including all EU official languages plus Norwegian, Icelandic, Ukrainian, Arabic, and Irish.',
            parameters: [],
            tests: [
                { _description: 'List all supported languages' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' } } } }
            }
        },
        listCountries: {
            method: 'GET',
            path: '/country/list',
            description: 'List all countries tracked by EU Safety Gate. Returns 250+ countries with EU/EEA membership flags, useful for filtering notifications by origin or reporting country.',
            parameters: [],
            tests: [
                { _description: 'List all countries with EU/EEA flags' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, propertyKey: { type: 'string' }, name: { type: 'string' }, orderIndex: { type: 'number' }, euCountry: { type: 'boolean' }, eeaCountry: { type: 'boolean' } } } }
            }
        },
        listEnums: {
            method: 'GET',
            path: '/enum/list',
            description: 'Get all enumeration values used for filtering product safety notifications. Returns risk types (22 categories like FIRE, CHEMICAL, CHOKING, ELECTRIC_SHOCK) and product categories (34 types like TOYS, COSMETICS, MOTOR_VEHICLES, ELECTRICAL_APPLIANCES).',
            parameters: [],
            tests: [
                { _description: 'List all risk types and product categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { riskTypeEnum: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' } } } }, productCategoryEnum: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' } } } } } }
            }
        },
        listReportYears: {
            method: 'GET',
            path: '/webreport/years/all',
            description: 'Get all available years for weekly safety reports. Returns years from 2005 to present, useful for building time-based queries and understanding data coverage.',
            parameters: [],
            tests: [
                { _description: 'List all available report years' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'number' } }
            }
        },
        getLatestReport: {
            method: 'GET',
            path: '/webreport/last',
            description: 'Get the most recent weekly safety report reference. Returns the year of the latest published report as a plain number.',
            parameters: [],
            tests: [
                { _description: 'Get latest weekly report' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            }
        },
        listReports: {
            method: 'POST',
            path: '/webreport/all',
            description: 'Get paginated list of all weekly safety reports. Each report contains product recall notifications published during that week. Supports pagination with pageNumber (0-based) and pageSize.',
            parameters: [
                { position: { key: 'pageNumber', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get first page of weekly reports', pageNumber: 0, pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { content: { type: 'array' }, pageable: { type: 'object', properties: { pageNumber: { type: 'number' }, pageSize: { type: 'number' } } }, totalElements: { type: 'number' }, totalPages: { type: 'number' }, last: { type: 'boolean' }, first: { type: 'boolean' }, empty: { type: 'boolean' } } }
            }
        }
    }
}
