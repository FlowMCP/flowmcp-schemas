export const main = {
    namespace: 'offeneregister',
    name: 'OffeneRegister German Companies',
    description: 'Search and retrieve German company registrations and officers from the OffeneRegister database (5.3M+ companies, 4.8M+ officers).',
    version: '3.0.0',
    docs: ['https://offeneregister.de'],
    tags: ['germany', 'companies', 'handelsregister', 'opendata'],
    root: 'local://offeneregister',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {
        companiesDb: {
            source: 'sqlite',
            mode: 'in-memory',
            origin: 'global',
            name: 'offeneregister-companies.db',
            description: 'German trade register with 5.3M+ companies. Supports full-text search by name and lookup by company_number.',
            queries: {
                getSchema: {
                    sql: "SELECT name, sql FROM sqlite_master WHERE type='table'",
                    description: 'Returns the database schema'
                },
                searchCompanies: {
                    sql: "SELECT c.company_number, c.name, c.current_status, c.registered_address, c.federal_state, c.registrar, c.register_art, c.register_nummer FROM company_fts fts JOIN company c ON c.rowid = fts.rowid WHERE company_fts MATCH ? LIMIT ?",
                    description: 'Full-text search for German companies by name. Uses FTS5 index for fast matching across 5.3M+ records.',
                    parameters: [
                        { position: { key: 'query', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Search for Siemens companies', query: 'Siemens' },
                        { _description: 'Search for BMW', query: 'BMW', limit: 5 }
                    ]
                },
                getCompany: {
                    sql: "SELECT * FROM company WHERE company_number = ?",
                    description: 'Get detailed information about a specific German company by its unique company_number.',
                    parameters: [
                        { position: { key: 'company_number', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: [] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get company by number', company_number: 'K1101R_HRB150148' }
                    ]
                }
            }
        },
        officersDb: {
            source: 'sqlite',
            mode: 'in-memory',
            origin: 'global',
            name: 'offeneregister-officers.db',
            description: 'German company officers (Geschaeftsfuehrer, Prokuristen, Vorstand) with 4.8M+ records. Search by name or get all officers for a company.',
            queries: {
                getSchema: {
                    sql: "SELECT name, sql FROM sqlite_master WHERE type='table'",
                    description: 'Returns the database schema'
                },
                searchOfficers: {
                    sql: "SELECT o.name, o.firstname, o.lastname, o.position, o.start_date, o.end_date, o.dismissed, o.city, o.company_id, o.type FROM officer_fts fts JOIN officer o ON o.rowid = fts.rowid WHERE officer_fts MATCH ? LIMIT ?",
                    description: 'Full-text search for company officers by name across 4.8M+ records.',
                    parameters: [
                        { position: { key: 'query', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Search for officers named Mueller', query: 'Mueller' },
                        { _description: 'Search for officers named Schmidt', query: 'Schmidt', limit: 5 }
                    ]
                },
                getCompanyOfficers: {
                    sql: "SELECT name, firstname, lastname, position, start_date, end_date, dismissed, city, type, title, flag FROM officer WHERE company_id = ? ORDER BY start_date DESC",
                    description: 'Get all officers (current and former) of a specific company by company_number.',
                    parameters: [
                        { position: { key: 'company_number', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: [] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get officers for company', company_number: 'K1101R_HRB150148' }
                    ]
                }
            }
        }
    }
}
