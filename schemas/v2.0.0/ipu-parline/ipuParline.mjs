export const main = {
    namespace: 'ipuparline',
    name: 'IpuParline',
    description: 'Query IPU Parline global parliamentary data — countries, parliaments, chambers, elections, and specialized bodies for 190+ countries.',
    version: '2.0.0',
    docs: ['https://data.ipu.org/data-tools/api/'],
    tags: ['politics', 'parliament', 'democracy', 'elections', 'cacheTtlDaily'],
    root: 'https://api.data.ipu.org',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    routes: {
        listCountries: {
            method: 'GET',
            path: '/v1/countries',
            description: 'List all countries in the Parline database with parliamentary metadata including official name, ISO codes, IPU membership status, and population data.',
            parameters: [
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(200)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'List first 20 countries', 'page[size]': 20, 'page[number]': 1 },
                { _description: 'List all countries in one request', 'page[size]': 200 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number', description: 'Total number of countries' },
                                row_count: { type: 'number', description: 'Number of rows in current page' }
                            }
                        },
                        links: {
                            type: 'object',
                            properties: {
                                self: { type: 'string' },
                                next: { type: 'string' },
                                last: { type: 'string' }
                            }
                        },
                        data: {
                            type: 'array',
                            description: 'Array of country objects with attributes',
                            items: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string' },
                                    id: { type: 'string', description: 'ISO 2-letter country code' },
                                    attributes: { type: 'object' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getCountry: {
            method: 'GET',
            path: '/v1/countries/:countryCode',
            description: 'Get detailed information about a specific country including official name, ISO codes, currency, IPU membership, and population history.',
            parameters: [
                { position: { key: 'countryCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)', 'max(2)'] } }
            ],
            tests: [
                { _description: 'Get country data for Germany', countryCode: 'DE' },
                { _description: 'Get country data for United States', countryCode: 'US' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: {
                            type: 'object',
                            properties: {
                                type: { type: 'string' },
                                id: { type: 'string' },
                                attributes: { type: 'object', description: 'Country attributes including name, codes, membership, population' }
                            }
                        }
                    }
                }
            }
        },
        listParliaments: {
            method: 'GET',
            path: '/v1/parliaments',
            description: 'List all parliaments with detailed structural data including type (unicameral/bicameral), assent rules, dissolution powers, and legislative procedures.',
            parameters: [
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'List first 10 parliaments', 'page[size]': 10 },
                { _description: 'Get second page of parliaments', 'page[size]': 10, 'page[number]': 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { total: { type: 'number' }, row_count: { type: 'number' } } },
                        links: { type: 'object' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string', description: 'Always Parliament' },
                                    id: { type: 'string', description: 'Country code' },
                                    attributes: { type: 'object', description: 'Parliament structure, powers, and procedures' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getParliament: {
            method: 'GET',
            path: '/v1/parliaments/:countryCode',
            description: 'Get detailed parliament data for a specific country including type, chambers, assent rules, dissolution powers, and oversight mechanisms.',
            parameters: [
                { position: { key: 'countryCode', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)', 'max(2)'] } }
            ],
            tests: [
                { _description: 'Get German Bundestag parliament data', countryCode: 'DE' },
                { _description: 'Get UK Parliament data', countryCode: 'GB' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: {
                            type: 'object',
                            properties: {
                                type: { type: 'string' },
                                id: { type: 'string' },
                                attributes: { type: 'object' }
                            }
                        }
                    }
                }
            }
        },
        listChambers: {
            method: 'GET',
            path: '/v1/chambers',
            description: 'List all parliamentary chambers worldwide with composition data, election systems, term lengths, and membership statistics.',
            parameters: [
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'List first 10 chambers', 'page[size]': 10 },
                { _description: 'Get all chambers in one page', 'page[size]': 200 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { total: { type: 'number' }, row_count: { type: 'number' } } },
                        links: { type: 'object' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string', description: 'Always Chamber' },
                                    id: { type: 'string', description: 'Chamber identifier' },
                                    attributes: { type: 'object', description: 'Chamber name, type, seats, election system, term length' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getElections: {
            method: 'GET',
            path: '/v1/reports/elections',
            description: 'Get election reports filtered by year, month, and parliamentary structure. Returns election results, voter turnout, and seat distribution.',
            parameters: [
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1900)', 'max(2030)'] } },
                { position: { key: 'month', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(1)', 'max(12)'] } },
                { position: { key: 'struct_parl_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(lower_chamber,upper_chamber,unicameral)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all elections in 2024', year: 2024 },
                { _description: 'Get lower chamber elections in January 2025', year: 2025, month: 1, struct_parl_status: 'lower_chamber' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: {
                            type: 'array',
                            description: 'Array of election report objects',
                            items: {
                                type: 'object',
                                properties: {
                                    country_code: { type: 'string' },
                                    country_name: { type: 'string' },
                                    election_code: { type: 'string' },
                                    election_title: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
