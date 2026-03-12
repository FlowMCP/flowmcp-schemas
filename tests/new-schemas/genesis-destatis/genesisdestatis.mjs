export const main = {
    namespace: 'genesisdestatis',
    name: 'GENESIS-Destatis',
    description: 'Access official German federal statistics from GENESIS-Online (Destatis) — browse the statistical catalogue, search tables, retrieve population, economy, housing, and trade data from the Federal Statistical Office.',
    version: '2.0.0',
    docs: ['https://www.destatis.de/EN/Service/OpenData/api-webservice.html', 'https://destatis.api.bund.dev/'],
    tags: ['statistics', 'germany', 'government', 'economy', 'population', 'cacheTtlDaily'],
    root: 'https://www-genesis.destatis.de/genesisWS/rest/2020',
    requiredServerParams: [],
    headers: {},
    routes: {
        findTerm: {
            method: 'GET',
            path: '/find/find',
            description: 'Full-text search across the GENESIS database. Search for statistics, tables, time series, and variables by keyword. Returns categorized results.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(all,tables,statistics,variables,cubes,timeseries)', options: ['optional()', 'default(all)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'Search for population data', term: 'Bevoelkerung', language: 'de', pagelength: '10' },
                { _description: 'Search for GDP tables', term: 'Bruttoinlandsprodukt', category: 'tables', pagelength: '5' },
                { _description: 'Search in English', term: 'population', language: 'en', pagelength: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status with code and content' },
                        Tables: { type: 'object', description: 'Matching tables with code and description' },
                        Statistics: { type: 'object', description: 'Matching statistics' },
                        Variables: { type: 'object', description: 'Matching variables' },
                        Cubes: { type: 'object', description: 'Matching data cubes' },
                        Timeseries: { type: 'object', description: 'Matching time series' }
                    }
                }
            }
        },
        catalogueTables: {
            method: 'GET',
            path: '/catalogue/tables',
            description: 'Browse the GENESIS table catalogue. List available data tables with optional filtering by code or keyword. Returns table codes, descriptions, and time ranges.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'selection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'searchcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Content)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'sortcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Name)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'List first 10 available tables', pagelength: '10' },
                { _description: 'Search for population tables by code', selection: '12*', pagelength: '10' },
                { _description: 'List tables in English', language: 'en', pagelength: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status with code and content' },
                        List: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Code: { type: 'string', description: 'Table code e.g. 12411-0001' },
                                    Content: { type: 'string', description: 'Table description' },
                                    Time: { type: 'string', description: 'Available time range' }
                                }
                            }
                        }
                    }
                }
            }
        },
        catalogueStatistics: {
            method: 'GET',
            path: '/catalogue/statistics',
            description: 'Browse the GENESIS statistics catalogue. List available official statistics with codes, descriptions, and metadata.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'selection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'searchcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Content)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'sortcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Name)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'List first 10 statistics', pagelength: '10' },
                { _description: 'Search for population statistics', selection: '12*', pagelength: '10' },
                { _description: 'List statistics in English', language: 'en', pagelength: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status' },
                        List: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Code: { type: 'string', description: 'Statistic code e.g. 12411' },
                                    Content: { type: 'string', description: 'Statistic description' }
                                }
                            }
                        }
                    }
                }
            }
        },
        catalogueVariables: {
            method: 'GET',
            path: '/catalogue/variables',
            description: 'Browse available variables (dimensions) in the GENESIS database. Variables define the axes of statistical tables (e.g. year, region, age group).',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'selection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'searchcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Content)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'sortcriterion', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Code,Name)', options: ['optional()', 'default(Code)'] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Alle,Sachmerkmale,Raeumlich,Zeitlich,Klassifizierend)', options: ['optional()', 'default(Alle)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'List first 10 variables', pagelength: '10' },
                { _description: 'List spatial variables', type: 'Raeumlich', pagelength: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status' },
                        List: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Code: { type: 'string', description: 'Variable code' },
                                    Content: { type: 'string', description: 'Variable description' },
                                    Type: { type: 'string', description: 'Variable type' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getTableData: {
            method: 'GET',
            path: '/data/table',
            description: 'Retrieve actual data from a specific GENESIS table. Returns flat CSV-like data with headers and values. Use startyear/endyear to limit the time range.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'startyear', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endyear', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'regionalvariable', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'regionalkey', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'compress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'Get population by federal state (2020-2023)', name: '12411-0010', startyear: '2020', endyear: '2023' },
                { _description: 'Get consumer price index data', name: '61111-0001', startyear: '2022', endyear: '2023' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status with code and content' },
                        Object: { type: 'object', description: 'Table metadata including structure and content description' },
                        Parameter: { type: 'object', description: 'Applied filter parameters' },
                        Structure: { type: 'object', description: 'Table structure (heads, columns, rows)' },
                        Data: { type: 'string', description: 'Flat CSV-format table data with headers and values' }
                    }
                }
            }
        },
        getMetadataTable: {
            method: 'GET',
            path: '/metadata/table',
            description: 'Get detailed metadata for a specific GENESIS table including structure, variables, time range, and content description.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'Get metadata for population table', name: '12411-0001' },
                { _description: 'Get metadata in English', name: '12411-0001', language: 'en' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status' },
                        Object: {
                            type: 'object',
                            properties: {
                                Code: { type: 'string', description: 'Table code' },
                                Content: { type: 'string', description: 'Table description' },
                                Time: { type: 'string', description: 'Available time range' },
                                Variables: { type: 'array', description: 'List of dimensions/variables used in this table' }
                            }
                        }
                    }
                }
            }
        },
        getMetadataStatistic: {
            method: 'GET',
            path: '/metadata/statistic',
            description: 'Get detailed metadata for a specific statistic including description, frequency, and associated tables and variables.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'Get metadata for population statistic', name: '12411' },
                { _description: 'Get metadata for GDP statistic', name: '81000' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status' },
                        Object: {
                            type: 'object',
                            properties: {
                                Code: { type: 'string', description: 'Statistic code' },
                                Content: { type: 'string', description: 'Statistic description' },
                                Frequency: { type: 'string', description: 'Update frequency' },
                                Updated: { type: 'string', description: 'Last update date' }
                            }
                        }
                    }
                }
            }
        },
        getTablesForStatistic: {
            method: 'GET',
            path: '/catalogue/tables2statistic',
            description: 'List all data tables belonging to a specific statistic. Useful for discovering available table breakdowns for a statistic code.',
            parameters: [
                { position: { key: 'username', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'password', value: 'GAST', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(free,all)', options: ['optional()', 'default(free)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en)', options: ['optional()', 'default(de)'] } }
            ],
            tests: [
                { _description: 'List tables for population statistic 12411', name: '12411', pagelength: '10' },
                { _description: 'List tables for GDP statistic', name: '81000', pagelength: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Status: { type: 'object', description: 'Response status' },
                        List: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Code: { type: 'string', description: 'Table code' },
                                    Content: { type: 'string', description: 'Table description' },
                                    Time: { type: 'string', description: 'Available time range' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
