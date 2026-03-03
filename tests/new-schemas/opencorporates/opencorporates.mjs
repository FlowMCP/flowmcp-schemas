export const main = {
    namespace: 'opencorporates',
    name: 'OpenCorporates',
    description: 'Search and retrieve company registrations from 200M+ companies across 140+ jurisdictions worldwide. Look up officers, company details, and browse available jurisdictions via the OpenCorporates API.',
    version: '2.0.0',
    docs: ['https://api.opencorporates.com/documentation/API-Reference', 'https://knowledge.opencorporates.com/'],
    tags: ['companies', 'corporate', 'registry', 'business', 'compliance', 'cacheTtlDaily'],
    root: 'https://api.opencorporates.com/v0.4',
    requiredServerParams: ['OPENCORPORATES_API_KEY'],
    headers: {},
    routes: {
        searchCompanies: {
            method: 'GET',
            path: '/companies/search',
            description: 'Search for companies by name across all jurisdictions. Supports filtering by jurisdiction, status, and pagination. Returns company name, number, jurisdiction, status, and registration dates.',
            parameters: [
                { position: { key: 'api_token', value: '{{SERVER_PARAM:OPENCORPORATES_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'jurisdiction_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'current_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(score,incorporation_date)', options: ['optional()'] } },
                { position: { key: 'sparse', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for OpenCorporates company', q: 'OpenCorporates' },
                { _description: 'Search UK companies named Barclays', q: 'Barclays', jurisdiction_code: 'gb', per_page: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        api_version: { type: 'string' },
                        results: { type: 'object', properties: {
                            companies: { type: 'array', items: { type: 'object', properties: { company: { type: 'object', properties: { name: { type: 'string' }, company_number: { type: 'string' }, jurisdiction_code: { type: 'string' }, incorporation_date: { type: 'string' }, dissolution_date: { type: 'string' }, company_type: { type: 'string' }, registry_url: { type: 'string' }, current_status: { type: 'string' }, opencorporates_url: { type: 'string' } } } } } },
                            page: { type: 'number' },
                            per_page: { type: 'number' },
                            total_pages: { type: 'number' },
                            total_count: { type: 'number' }
                        } }
                    }
                }
            },
        },
        getCompany: {
            method: 'GET',
            path: '/companies/:jurisdiction_code/:company_number',
            description: 'Fetch full details for a specific company by jurisdiction code and company number. Returns registration data, addresses, officers, filings, and corporate structure.',
            parameters: [
                { position: { key: 'api_token', value: '{{SERVER_PARAM:OPENCORPORATES_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'jurisdiction_code', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'company_number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sparse', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get OpenCorporates Ltd details', jurisdiction_code: 'gb', company_number: '07444723' },
                { _description: 'Get Apple Inc details (California)', jurisdiction_code: 'us_ca', company_number: 'C0806592' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        api_version: { type: 'string' },
                        results: { type: 'object', properties: {
                            company: { type: 'object', properties: {
                                name: { type: 'string' },
                                company_number: { type: 'string' },
                                jurisdiction_code: { type: 'string' },
                                incorporation_date: { type: 'string' },
                                dissolution_date: { type: 'string' },
                                company_type: { type: 'string' },
                                registry_url: { type: 'string' },
                                current_status: { type: 'string' },
                                opencorporates_url: { type: 'string' },
                                registered_address_in_full: { type: 'string' },
                                registered_address: { type: 'object', properties: { street_address: { type: 'string' }, locality: { type: 'string' }, region: { type: 'string' }, postal_code: { type: 'string' }, country: { type: 'string' } } },
                                officers: { type: 'array', items: { type: 'object' } },
                                filings: { type: 'array', items: { type: 'object' } },
                                industry_codes: { type: 'array', items: { type: 'object' } },
                                previous_names: { type: 'array', items: { type: 'object' } },
                                alternative_names: { type: 'array', items: { type: 'object' } }
                            } }
                        } }
                    }
                }
            },
        },
        searchOfficers: {
            method: 'GET',
            path: '/officers/search',
            description: 'Search for company officers (directors, secretaries, agents) by name. Returns officer positions, associated companies, and appointment dates.',
            parameters: [
                { position: { key: 'api_token', value: '{{SERVER_PARAM:OPENCORPORATES_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'jurisdiction_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(score)', options: ['optional()'] } },
                { position: { key: 'inactive', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for officer named John Smith', q: 'John Smith' },
                { _description: 'Search UK officers named Branson', q: 'Branson', jurisdiction_code: 'gb', per_page: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        api_version: { type: 'string' },
                        results: { type: 'object', properties: {
                            officers: { type: 'array', items: { type: 'object', properties: { officer: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, position: { type: 'string' }, start_date: { type: 'string' }, end_date: { type: 'string' }, occupation: { type: 'string' }, nationality: { type: 'string' }, opencorporates_url: { type: 'string' }, company: { type: 'object', properties: { name: { type: 'string' }, jurisdiction_code: { type: 'string' }, company_number: { type: 'string' }, opencorporates_url: { type: 'string' } } } } } } } },
                            page: { type: 'number' },
                            per_page: { type: 'number' },
                            total_pages: { type: 'number' },
                            total_count: { type: 'number' }
                        } }
                    }
                }
            },
        },
        getCompanyFilings: {
            method: 'GET',
            path: '/companies/:jurisdiction_code/:company_number/filings',
            description: 'Retrieve filing history for a specific company. Returns regulatory filings, annual returns, and other official documents.',
            parameters: [
                { position: { key: 'api_token', value: '{{SERVER_PARAM:OPENCORPORATES_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'jurisdiction_code', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'company_number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get filings for OpenCorporates Ltd', jurisdiction_code: 'gb', company_number: '07444723' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        api_version: { type: 'string' },
                        results: { type: 'object', properties: {
                            filings: { type: 'array', items: { type: 'object', properties: { filing: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, date: { type: 'string' }, filing_type: { type: 'string' }, filing_code: { type: 'string' }, url: { type: 'string' }, opencorporates_url: { type: 'string' } } } } } },
                            page: { type: 'number' },
                            per_page: { type: 'number' },
                            total_pages: { type: 'number' },
                            total_count: { type: 'number' }
                        } }
                    }
                }
            },
        },
        searchByRegisteredAddress: {
            method: 'GET',
            path: '/companies/search',
            description: 'Search for companies by registered address. Useful for due diligence to find all companies at a specific address.',
            parameters: [
                { position: { key: 'api_token', value: '{{SERVER_PARAM:OPENCORPORATES_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'registered_address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'jurisdiction_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search companies at a London address', q: '*', registered_address: 'Aston House Cornwall Avenue London', jurisdiction_code: 'gb' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        api_version: { type: 'string' },
                        results: { type: 'object', properties: {
                            companies: { type: 'array', items: { type: 'object', properties: { company: { type: 'object', properties: { name: { type: 'string' }, company_number: { type: 'string' }, jurisdiction_code: { type: 'string' }, registered_address_in_full: { type: 'string' }, current_status: { type: 'string' }, opencorporates_url: { type: 'string' } } } } } },
                            total_count: { type: 'number' }
                        } }
                    }
                }
            },
        }
    }
}
