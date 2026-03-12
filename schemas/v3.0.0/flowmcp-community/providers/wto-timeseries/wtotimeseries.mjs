export const main = {
    namespace: 'wtotimeseries',
    name: 'WTO Timeseries',
    description: 'Access World Trade Organization trade statistics — merchandise trade, trade in services, tariffs, and non-tariff indicators for 160+ economies.',
    version: '3.0.0',
    docs: ['https://apiportal.wto.org/'],
    tags: ['trade', 'economics', 'statistics', 'tariffs', 'wto', 'cacheTtlDaily'],
    root: 'https://api.wto.org/timeseries/v1',
    requiredServerParams: ['WTO_API_KEY'],
    headers: {
        'Ocp-Apim-Subscription-Key': '{{SERVER_PARAM:WTO_API_KEY}}'
    },
    tools: {
        getTopics: {
            method: 'GET',
            path: '/topics',
            description: 'List all available data topics that group indicators (e.g. Merchandise trade, Services trade, Tariffs).',
            parameters: [
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'List all topics in English', lang: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of topic objects',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Topic ID' },
                            name: { type: 'string', description: 'Topic name' },
                            sortOrder: { type: 'number' }
                        }
                    }
                }
            }
        },
        getIndicators: {
            method: 'GET',
            path: '/indicators',
            description: 'List available indicators optionally filtered by indicator group, topic, or product classification. Indicators define the data series (e.g. HS_M_0010 for merchandise imports).',
            parameters: [
                { position: { key: 'ig', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 't', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'List all indicators', lang: 1 },
                { _description: 'List indicators for topic 1 (Merchandise trade)', t: '1', lang: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            code: { type: 'string', description: 'Indicator code e.g. HS_M_0010' },
                            name: { type: 'string', description: 'Indicator name' },
                            categoryCode: { type: 'string' },
                            categoryLabel: { type: 'string' },
                            subcategoryCode: { type: 'string' },
                            subcategoryLabel: { type: 'string' }
                        }
                    }
                }
            }
        },
        getReportingEconomies: {
            method: 'GET',
            path: '/reporters',
            description: 'List available reporting economies (countries and customs territories) that submit trade data to the WTO.',
            parameters: [
                { position: { key: 'ig', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'List all reporting economies', lang: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            code: { type: 'string', description: 'ISO economy code' },
                            name: { type: 'string', description: 'Economy name' },
                            iso3A: { type: 'string', description: 'ISO 3-letter code' },
                            displayOrder: { type: 'number' }
                        }
                    }
                }
            }
        },
        getPartnerEconomies: {
            method: 'GET',
            path: '/partners',
            description: 'List available partner economies for bilateral trade data queries.',
            parameters: [
                { position: { key: 'ig', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'List all partner economies', lang: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            code: { type: 'string', description: 'Partner economy code' },
                            name: { type: 'string', description: 'Partner economy name' },
                            iso3A: { type: 'string' },
                            displayOrder: { type: 'number' }
                        }
                    }
                }
            }
        },
        getTimeseries: {
            method: 'GET',
            path: '/data',
            description: 'Retrieve timeseries data points for a specific indicator, reporting economy, and time range. Core endpoint for WTO trade statistics.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'r', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ps', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'spc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fmt', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'full', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(500)', 'min(1)', 'max(10000)'] } }
            ],
            tests: [
                { _description: 'Get US merchandise imports (HS total) for 2020-2023', i: 'HS_M_0010', r: '840', ps: '2020-2023' },
                { _description: 'Get Germany total merchandise exports', i: 'HS_X_0010', r: '276', ps: '2019-2023' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Dataset: {
                            type: 'array',
                            description: 'Array of timeseries data points',
                            items: {
                                type: 'object',
                                properties: {
                                    ReportingEconomy: { type: 'string' },
                                    ReportingEconomyCode: { type: 'string' },
                                    PartnerEconomy: { type: 'string' },
                                    PartnerEconomyCode: { type: 'string' },
                                    ProductOrSector: { type: 'string' },
                                    ProductOrSectorCode: { type: 'string' },
                                    Indicator: { type: 'string' },
                                    IndicatorCode: { type: 'string' },
                                    Year: { type: 'string' },
                                    Period: { type: 'string' },
                                    Frequency: { type: 'string' },
                                    Unit: { type: 'string' },
                                    Value: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getDataCount: {
            method: 'GET',
            path: '/data_count',
            description: 'Get the number of data points matching a query before fetching the full data. Useful for estimating result size.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'r', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ps', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pc', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Count US merchandise import data points', i: 'HS_M_0010', r: '840' },
                { _description: 'Count all merchandise export data for 2023', i: 'HS_X_0010', ps: '2023' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number', description: 'Number of matching data points' }
                    }
                }
            }
        },
        getMetadata: {
            method: 'GET',
            path: '/metadata',
            description: 'Get metadata for a timeseries query including available dimensions, indicator details, and period coverage.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'r', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get metadata for merchandise imports indicator', i: 'HS_M_0010' },
                { _description: 'Get metadata for services exports indicator', i: 'BT_X_S' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        indicatorCategoryCode: { type: 'string' },
                        indicatorCode: { type: 'string' },
                        indicatorLabel: { type: 'string' },
                        frequencyCode: { type: 'string' },
                        numberOfDecimals: { type: 'number' },
                        unitCode: { type: 'string' },
                        unitLabel: { type: 'string' },
                        startYear: { type: 'number' },
                        endYear: { type: 'number' }
                    }
                }
            }
        },
        getFrequencies: {
            method: 'GET',
            path: '/frequencies',
            description: 'List available data frequencies (annual, quarterly, monthly) for the WTO timeseries dataset.',
            parameters: [
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'List all available frequencies', lang: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            code: { type: 'string', description: 'Frequency code (A=Annual, Q=Quarterly, M=Monthly)' },
                            name: { type: 'string', description: 'Frequency name' }
                        }
                    }
                }
            }
        }
    }
}
