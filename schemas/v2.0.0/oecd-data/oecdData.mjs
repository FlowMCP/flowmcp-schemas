export const main = {
    namespace: 'oecd',
    name: 'OecdData',
    description: 'Query OECD statistical data via SDMX REST API — economic outlook projections, consumer price indices, house prices, and key short-term economic indicators for OECD member countries.',
    version: '2.0.0',
    docs: ['https://data-explorer.oecd.org/', 'https://sdmx.oecd.org/public/rest'],
    tags: ['economics', 'statistics', 'government', 'international', 'cacheTtlDaily'],
    root: 'https://sdmx.oecd.org/public/rest',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/vnd.sdmx.data+json'
    },
    routes: {
        getEconomicOutlook: {
            method: 'GET',
            path: '/data/OECD.ECO.MAD,DSD_EO@DF_EO,1.4/:refArea.:measure.:freq',
            description: 'Get OECD Economic Outlook data — GDP, unemployment, inflation, and other macroeconomic projections. Dimensions: REF_AREA (country code, e.g. USA, DEU, JPN, GBR, FRA), MEASURE (e.g. GDP, GDPV_ANNPCT, UNR, CPI, GGFL), FREQ (A for annual, Q for quarterly).',
            parameters: [
                { position: { key: 'refArea', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'measure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'freq', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(A,Q)', options: ['default(A)'] } },
                { position: { key: 'startPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get US GDP nominal value 2020-2026', refArea: 'USA', measure: 'GDP', freq: 'A', startPeriod: '2020', endPeriod: '2026' },
                { _description: 'Get US unemployment rate 2020-2026', refArea: 'USA', measure: 'UNR', freq: 'A', startPeriod: '2020', endPeriod: '2026' },
                { _description: 'Get Germany CPI index 2020-2026', refArea: 'DEU', measure: 'CPI', freq: 'A', startPeriod: '2020', endPeriod: '2026' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                schema: { type: 'string' },
                                id: { type: 'string' },
                                prepared: { type: 'string' }
                            }
                        },
                        data: {
                            type: 'object',
                            properties: {
                                dataSets: {
                                    type: 'array',
                                    description: 'Array of dataset objects with series and observations',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            action: { type: 'string' },
                                            series: { type: 'object', description: 'Series keyed by dimension index' }
                                        }
                                    }
                                },
                                structures: {
                                    type: 'array',
                                    description: 'Structural metadata including dimension values and attributes',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            dimensions: { type: 'object' },
                                            attributes: { type: 'object' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getConsumerPrices: {
            method: 'GET',
            path: '/data/OECD.SDD.TPS,DSD_PRICES@DF_PRICES_ALL,1.0/:refArea.:freq.:methodology.:measure.:unitMeasure.:expenditure.:adjustment.:transformation',
            description: 'Get OECD consumer price indices (CPIs, HICPs) by COICOP 1999 divisions. Dimensions: REF_AREA (e.g. USA, DEU), FREQ (M=monthly, Q=quarterly), METHODOLOGY (N=national), MEASURE (CPI), UNIT_MEASURE (PA=percent per annum, IX=index), EXPENDITURE (_T=total), ADJUSTMENT (N=not adjusted), TRANSFORMATION (GY=growth over 1 year, _Z=no transformation).',
            parameters: [
                { position: { key: 'refArea', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'freq', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(M,Q,A)', options: ['default(M)'] } },
                { position: { key: 'methodology', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(N)'] } },
                { position: { key: 'measure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(CPI)'] } },
                { position: { key: 'unitMeasure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(PA)'] } },
                { position: { key: 'expenditure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(_T)'] } },
                { position: { key: 'adjustment', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(N)'] } },
                { position: { key: 'transformation', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(GY)'] } },
                { position: { key: 'startPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get US monthly CPI growth rate 2024-2025', refArea: 'USA', freq: 'M', methodology: 'N', measure: 'CPI', unitMeasure: 'PA', expenditure: '_T', adjustment: 'N', transformation: 'GY', startPeriod: '2024-01', endPeriod: '2025-06' }
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
                                dataSets: { type: 'array', items: { type: 'object' } },
                                structures: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        },
        getHousePrices: {
            method: 'GET',
            path: '/data/OECD.ECO.MPD,DSD_AN_HOUSE_PRICES@DF_HOUSE_PRICES,1.0/:refArea.:freq.:measure.:unitMeasure',
            description: 'Get OECD analytical house price indicators — real and nominal residential property price indices, rental prices, and price-to-rent/income ratios. Dimensions: REF_AREA (e.g. USA, GBR), FREQ (A=annual, Q=quarterly), MEASURE (RHP=real house prices, NHP=nominal house prices, RENT=rental prices, PRR=price-to-rent ratio, PIR=price-to-income ratio), UNIT_MEASURE (IX=index, GP=growth previous period, GY=growth year).',
            parameters: [
                { position: { key: 'refArea', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'freq', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(A,Q)', options: ['default(Q)'] } },
                { position: { key: 'measure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(RHP)'] } },
                { position: { key: 'unitMeasure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(IX)'] } },
                { position: { key: 'startPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get US annual real house prices 2020-2025', refArea: 'USA', freq: 'A', measure: 'RHP', unitMeasure: 'IX', startPeriod: '2020', endPeriod: '2025' },
                { _description: 'Get Germany quarterly nominal house prices', refArea: 'DEU', freq: 'Q', measure: 'NHP', unitMeasure: 'IX', startPeriod: '2023', endPeriod: '2025' }
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
                                dataSets: { type: 'array', items: { type: 'object' } },
                                structures: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        },
        getKeyEconomicIndicators: {
            method: 'GET',
            path: '/data/OECD.SDD.STES,DSD_KEI@DF_KEI,4.0/:refArea.:freq.:measure.:unitMeasure.:activity.:adjustment.:transformation',
            description: 'Get OECD Key Short-Term Economic Indicators (KEI) — composite leading indicators, industrial production, retail trade, and more. Dimensions: REF_AREA (e.g. USA, OECD), FREQ (M=monthly, Q=quarterly), MEASURE, UNIT_MEASURE, ACTIVITY (TOTAL, etc.), ADJUSTMENT (SA=seasonally adjusted, N=not adjusted), TRANSFORMATION.',
            parameters: [
                { position: { key: 'refArea', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'freq', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(M,Q)', options: ['default(M)'] } },
                { position: { key: 'measure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'unitMeasure', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'activity', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(TOTAL)'] } },
                { position: { key: 'adjustment', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(SA)'] } },
                { position: { key: 'transformation', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default(GY)'] } },
                { position: { key: 'startPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get OECD area monthly KEI data Jan-Feb 2025', refArea: '.', freq: 'M', measure: '.', unitMeasure: '.', activity: '.', adjustment: '.', transformation: '.', startPeriod: '2025-01', endPeriod: '2025-02' }
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
                                dataSets: { type: 'array', items: { type: 'object' } },
                                structures: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        }
    }
}
