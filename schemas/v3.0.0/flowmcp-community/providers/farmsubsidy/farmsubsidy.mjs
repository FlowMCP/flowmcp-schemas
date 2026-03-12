// Schema for #311 — FarmSubsidy EU CAP Payments

export const main = {
    namespace: 'farmsubsidy',
    name: 'FarmSubsidy',
    description: 'EU Common Agricultural Policy farm subsidy payments across 28 European countries. Search recipients, schemes, payments, and locations. Data from 2013-2022 covering billions in agricultural subsidies. API by Open Knowledge Foundation Germany.',
    version: '3.0.0',
    docs: ['https://farmsubsidy.org', 'https://github.com/okfde/farmsubsidy-store'],
    tags: ['agriculture', 'subsidies', 'eu', 'government', 'finance', 'cacheTtlDaily'],
    root: 'https://farmsubsidy-api.idio.run',
    requiredServerParams: ['FARMSUBSIDY_API_KEY'],
    tools: {
        searchRecipients: {
            method: 'GET',
            path: '/recipients',
            description: 'Search EU farm subsidy recipients by name. Filter by country and year. Returns recipient name, location, total amount received, number of payments, and active years.',
            parameters: [
                { position: { key: 'recipient_fingerprint__ilike', value: '%{{USER_PARAM}}%', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(-amount_sum)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(100)'] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'recipient_name__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amount__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api_key', value: '{{FARMSUBSIDY_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for Nestle subsidies', recipient_fingerprint__ilike: 'Nestl', country: 'DE', limit: 5 },
                { _description: 'Top recipients in France 2020', country: 'FR', year: 2020, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        item_count: { type: 'number' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'array' },
                                    address: { type: 'array' },
                                    country: { type: 'string' },
                                    amount_sum: { type: 'number' },
                                    total_payments: { type: 'number' },
                                    years: { type: 'array' }
                                }
                            }
                        }
                    }
                }
            }
        },
        listCountries: {
            method: 'GET',
            path: '/countries',
            description: 'List all EU countries with farm subsidy data. Returns country code, total recipients, total payments, available years, and amount statistics.',
            parameters: [
                { position: { key: 'recipient_name__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amount__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api_key', value: '{{FARMSUBSIDY_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List all countries with subsidy data' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        item_count: { type: 'number' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    country: { type: 'string' },
                                    name: { type: 'string' },
                                    total_recipients: { type: 'number' },
                                    total_payments: { type: 'number' },
                                    years: { type: 'array' },
                                    amount_sum: { type: 'number' },
                                    amount_avg: { type: 'number' },
                                    amount_max: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchSchemes: {
            method: 'GET',
            path: '/schemes',
            description: 'Search EU farm subsidy payment schemes by name. Filter by country and year.',
            parameters: [
                { position: { key: 'scheme__ilike', value: '%{{USER_PARAM}}%', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(-amount_sum)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(100)'] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'recipient_name__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amount__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'scheme_id__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api_key', value: '{{FARMSUBSIDY_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for direct payment schemes in Germany', scheme__ilike: 'Direkt', country: 'DE', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        item_count: { type: 'number' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    country: { type: 'string' },
                                    total_recipients: { type: 'number' },
                                    total_payments: { type: 'number' },
                                    amount_sum: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchPayments: {
            method: 'GET',
            path: '/payments',
            description: 'Search individual EU farm subsidy payments. Filter by recipient, country, year, or scheme.',
            parameters: [
                { position: { key: 'recipient_fingerprint__ilike', value: '%{{USER_PARAM}}%', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'scheme', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(year)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(100)'] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'recipient_name__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'amount__null', value: 'false', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'api_key', value: '{{FARMSUBSIDY_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Payments in Germany 2020', country: 'DE', year: 2020, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        item_count: { type: 'number' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    recipient_name: { type: 'string' },
                                    recipient_address: { type: 'string' },
                                    country: { type: 'string' },
                                    year: { type: 'number' },
                                    scheme: { type: 'string' },
                                    amount: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
