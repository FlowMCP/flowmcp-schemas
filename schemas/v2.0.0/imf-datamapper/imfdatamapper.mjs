export const main = {
    namespace: 'imfdatamapper',
    name: 'IMF DataMapper',
    description: 'Access international financial and economic data from the IMF DataMapper. 120+ indicators covering GDP, inflation, debt, trade, and more for 190+ countries. Free, no key required.',
    version: '2.0.0',
    docs: ['https://www.imf.org/external/datamapper/'],
    tags: ['economics', 'finance', 'macroeconomics', 'international', 'statistics', 'cacheTtlDaily'],
    root: 'https://www.imf.org/external/datamapper/api/v1',
    requiredServerParams: [],
    headers: {},
    routes: {
        listIndicators: {
            method: 'GET',
            path: '/indicators',
            description: 'List all 120+ available economic indicators with labels, descriptions, sources, units, and dataset names. Includes GDP, inflation, debt, trade, reserves, and more.',
            parameters: [],
            tests: [
                { _description: 'List all available IMF indicators' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        indicators: {
                            type: 'object',
                            properties: {
                                NGDP_RPCH: {
                                    type: 'object',
                                    properties: {
                                        label: { type: 'string' },
                                        description: { type: 'string' },
                                        source: { type: 'string' },
                                        unit: { type: 'string' },
                                        dataset: { type: 'string' }
                                    }
                                }
                            }
                        },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        listCountries: {
            method: 'GET',
            path: '/countries',
            description: 'List all 190+ countries with ISO 3-letter codes and labels. Use these codes as parameters for indicator data queries.',
            parameters: [],
            tests: [
                { _description: 'List all available countries' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        countries: {
                            type: 'object',
                            properties: {
                                USA: { type: 'object', properties: { label: { type: 'string' } } },
                                DEU: { type: 'object', properties: { label: { type: 'string' } } }
                            }
                        },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        listGroups: {
            method: 'GET',
            path: '/groups',
            description: 'List all 100+ country groups and regions (advanced economies, emerging markets, EU, G20, ASEAN, etc.) with labels. Use group codes for aggregate data queries.',
            parameters: [],
            tests: [
                { _description: 'List all country groups' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        groups: {
                            type: 'object',
                            properties: {
                                ADVEC: { type: 'object', properties: { label: { type: 'string' } } },
                                EU: { type: 'object', properties: { label: { type: 'string' } } }
                            }
                        },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        getIndicatorAllCountries: {
            method: 'GET',
            path: '/:indicator',
            description: 'Get time series data for a single indicator across ALL countries. Returns year-value pairs from 1980 to 2030 (forecast). Use indicator codes from /indicators endpoint.',
            parameters: [
                { position: { key: 'indicator', value: '{{INDICATOR}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get real GDP growth for all countries', indicator: 'NGDP_RPCH' },
                { _description: 'Get inflation rate for all countries', indicator: 'PCPIPCH' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        values: {
                            type: 'object',
                            properties: {
                                NGDP_RPCH: {
                                    type: 'object',
                                    properties: {
                                        USA: { type: 'object' },
                                        DEU: { type: 'object' }
                                    }
                                }
                            }
                        },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        getIndicatorByCountry: {
            method: 'GET',
            path: '/:indicator/:countries',
            description: 'Get time series data for a single indicator and one or more specific countries. Separate multiple country codes with +. Returns annual values from 1980 to 2030.',
            parameters: [
                { position: { key: 'indicator', value: '{{INDICATOR}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'countries', value: '{{COUNTRIES}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get real GDP growth for USA', indicator: 'NGDP_RPCH', countries: 'USA' },
                { _description: 'Get GDP per capita for Germany and France', indicator: 'NGDPDPC', countries: 'DEU+FRA' },
                { _description: 'Get unemployment rate for G7 countries', indicator: 'LUR', countries: 'USA+GBR+DEU+FRA+JPN+CAN+ITA' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        values: {
                            type: 'object',
                            properties: {
                                NGDP_RPCH: {
                                    type: 'object',
                                    properties: {
                                        USA: { type: 'object' }
                                    }
                                }
                            }
                        },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        getIndicatorByGroup: {
            method: 'GET',
            path: '/:indicator/groups/:group',
            description: 'Get time series data for an indicator filtered by a country group (e.g., advanced economies, EU, G20). Returns aggregate or per-member data by year.',
            parameters: [
                { position: { key: 'indicator', value: '{{INDICATOR}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'group', value: '{{GROUP}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get GDP growth for advanced economies', indicator: 'NGDP_RPCH', group: 'ADVEC' },
                { _description: 'Get inflation for EU countries', indicator: 'PCPIPCH', group: 'EU' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        values: { type: 'object' },
                        api: {
                            type: 'object',
                            properties: {
                                version: { type: 'string' },
                                'output-method': { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
}
