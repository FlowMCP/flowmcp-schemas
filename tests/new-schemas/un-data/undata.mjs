export const main = {
    namespace: 'undata',
    name: 'UN Data SDMX',
    description: 'Access United Nations statistical data via the SDMX REST API. Query greenhouse gas emissions (UNFCCC), energy statistics, energy balance, development indicators, UNESCO education stats, and MDG indicators across 250+ countries. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://data.un.org/', 'https://sdmx.org/wp-content/uploads/SDMX_3-0-0_SECTION_7_WebServicesGuidelines_2023-10.pdf'],
    tags: ['statistics', 'environment', 'energy', 'education', 'opendata', 'sdmx', 'cacheTtlDaily'],
    root: 'https://data.un.org',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    routes: {
        listDataflows: {
            method: 'GET',
            path: '/ws/rest/dataflow/all/all',
            description: 'List all available UN Data dataflows (datasets). Returns dataflow IDs, names, agencies, and versions. Use these IDs to query specific datasets.',
            parameters: [],
            tests: [
                { _description: 'List all UN Data dataflows' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { dataflows: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, agencyId: { type: 'string' }, version: { type: 'string' } } } } } }
            }
        },
        ghgEmissions: {
            method: 'GET',
            path: '/ws/rest/data/UNSD,DF_UNData_UNFCC/:key',
            description: 'Query greenhouse gas emissions from UNFCCC data. Countries use ISO3 codes (USA, DEU, CHN, etc.). Indicators: EN_CLC_GHGE_XLULUCF (Total GHG excl. LULUCF), EN_ATM_CO2E_XLULUCF (CO2), EN_ATM_METH_XLULUCF (Methane), EN_ATM_NO2E_XLULUCF (N2O). Unit: Gg CO2 equivalent. 43 countries available.',
            parameters: [
                { position: { key: 'key', value: '{{KEY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{START_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{END_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lastNObservations', value: '{{LAST_N}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(50)'] } },
                { position: { key: 'detail', value: '{{DETAIL}}', location: 'query' }, z: { primitive: 'enum(dataonly,full)', options: ['optional()', 'default(dataonly)'] } }
            ],
            tests: [
                { _description: 'USA total GHG emissions last 5 years', key: 'A.EN_CLC_GHGE_XLULUCF.USA.Gg_CO2', lastNObservations: 5, detail: 'dataonly' },
                { _description: 'Germany and France CO2 emissions', key: 'A.EN_ATM_CO2E_XLULUCF.DEU+FRA.Gg_CO2', lastNObservations: 3, detail: 'dataonly' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { series: { type: 'array', items: { type: 'object', properties: { dimensions: { type: 'object' }, observations: { type: 'array', items: { type: 'object', properties: { period: { type: 'string' }, value: { type: 'number' } } } } } } } } }
            }
        },
        energyStatistics: {
            method: 'GET',
            path: '/ws/rest/data/UNSD,DF_UNDATA_ENERGY/:key',
            description: 'Query energy statistics by country, commodity, and transaction type. Countries use M49 numeric codes (840=USA, 276=Germany, 156=China). Commodities: 0100 (Hard Coal), 3000 (Natural Gas), 4100 (Crude Oil), 7100 (Solar), 7200 (Wind). Transactions: 01 (Production), 03 (Imports), 04 (Exports), 12 (Final consumption). 245 countries, 75 commodities.',
            parameters: [
                { position: { key: 'key', value: '{{KEY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{START_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{END_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lastNObservations', value: '{{LAST_N}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(50)'] } },
                { position: { key: 'detail', value: '{{DETAIL}}', location: 'query' }, z: { primitive: 'enum(dataonly,full)', options: ['optional()', 'default(dataonly)'] } }
            ],
            tests: [
                { _description: 'USA hard coal production', key: 'A.840.0100.01', lastNObservations: 5, detail: 'dataonly' },
                { _description: 'Germany natural gas imports', key: 'A.276.3000.03', lastNObservations: 3, detail: 'dataonly' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { series: { type: 'array', items: { type: 'object', properties: { dimensions: { type: 'object' }, observations: { type: 'array', items: { type: 'object', properties: { period: { type: 'string' }, value: { type: 'number' } } } } } } } } }
            }
        },
        energyBalance: {
            method: 'GET',
            path: '/ws/rest/data/UNSD,DF_UNData_EnergyBalance/:key',
            description: 'Query energy balance data by country, commodity, and transaction. Countries use M49 numeric codes (840=USA, 276=Germany). Commodities: B09_TE (Total energy), B00_CL (Coal), B02_PO (Primary Oil), B03_NG (Natural Gas). Transactions: B07_GA (Total supply), B01_01 (Production), B24_NA (Final consumption). Unit: Terajoules (HSO). 218 countries.',
            parameters: [
                { position: { key: 'key', value: '{{KEY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{START_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{END_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lastNObservations', value: '{{LAST_N}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(50)'] } },
                { position: { key: 'detail', value: '{{DETAIL}}', location: 'query' }, z: { primitive: 'enum(dataonly,full)', options: ['optional()', 'default(dataonly)'] } }
            ],
            tests: [
                { _description: 'USA total energy supply in TJ', key: '840.B09_TE.B07_GA.HSO', lastNObservations: 5 },
                { _description: 'Germany coal production', key: '276.B00_CL.B01_01.HSO', lastNObservations: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { series: { type: 'array', items: { type: 'object', properties: { dimensions: { type: 'object' }, observations: { type: 'array', items: { type: 'object', properties: { period: { type: 'string' }, value: { type: 'number' } } } } } } } } }
            }
        },
        countryIndicators: {
            method: 'GET',
            path: '/ws/rest/data/UNSD,DF_UNDATA_COUNTRYDATA/:key',
            description: 'Query UN development indicators by country. Uses ISO3 country codes and 8-dimension key: FREQ.SERIES.UNIT.LOCATION.AGE_GROUP.SEX.REF_AREA.SOURCE_TYPE. Key indicators: SH_DYN_IMRT (infant mortality), SI_POV_DAY1 (poverty $1.90/day), SP_DYN_LE00 (life expectancy). Use dots for wildcards. 227 indicators, 98 countries.',
            parameters: [
                { position: { key: 'key', value: '{{KEY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{START_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{END_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lastNObservations', value: '{{LAST_N}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(50)'] } },
                { position: { key: 'detail', value: '{{DETAIL}}', location: 'query' }, z: { primitive: 'enum(dataonly,full)', options: ['optional()', 'default(dataonly)'] } }
            ],
            tests: [
                { _description: 'Jordan infant mortality rate', key: '.SH_DYN_IMRT.....JOR.', lastNObservations: 3, detail: 'dataonly' },
                { _description: 'Mexico poverty headcount ratio', key: '.SI_POV_DAY1.....MEX.', lastNObservations: 5, detail: 'dataonly' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { series: { type: 'array', items: { type: 'object', properties: { dimensions: { type: 'object' }, observations: { type: 'array', items: { type: 'object', properties: { period: { type: 'string' }, value: { type: 'number' } } } } } } } } }
            }
        },
        educationStatistics: {
            method: 'GET',
            path: '/ws/rest/data/UIS,DF_UNData_UIS/:key',
            description: 'Query UNESCO education statistics. Uses ISO3 country codes and 8-dimension key: FREQ.SERIES.UNIT.LOCATION.AGE_GROUP.SEX.REF_AREA.SOURCE_TYPE. Key series: ROFST_1 (out-of-school rate), AIR_1 (intake rate), XGDP_FSGOV (gov. expenditure on education %). 333 indicators, 254 countries.',
            parameters: [
                { position: { key: 'key', value: '{{KEY}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startPeriod', value: '{{START_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endPeriod', value: '{{END_PERIOD}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lastNObservations', value: '{{LAST_N}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(50)'] } },
                { position: { key: 'detail', value: '{{DETAIL}}', location: 'query' }, z: { primitive: 'enum(dataonly,full)', options: ['optional()', 'default(dataonly)'] } }
            ],
            tests: [
                { _description: 'USA out-of-school rate (total)', key: '.ROFST_1....T.USA.', lastNObservations: 3, detail: 'dataonly' },
                { _description: 'Germany education expenditure % GDP', key: '.XGDP_FSGOV....T.DEU.', lastNObservations: 5, detail: 'dataonly' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { series: { type: 'array', items: { type: 'object', properties: { dimensions: { type: 'object' }, observations: { type: 'array', items: { type: 'object', properties: { period: { type: 'string' }, value: { type: 'number' } } } } } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const parseDataflows = ( response ) => {
        const structures = response?.structures || response
        const dfs = structures?.dataflows || []
        const dataflows = dfs
            .map( ( df ) => {
                const item = {
                    id: df.id || '',
                    name: typeof df.name === 'string' ? df.name : df.name?.en || Object.values( df.name || {} )[0] || '',
                    agencyId: df.agencyID || '',
                    version: df.version || ''
                }

                return item
            } )

        return { dataflows }
    }

    const parseSdmxData = ( response ) => {
        const dataSets = response?.dataSets || []
        const structure = response?.structure || {}
        const seriesDims = structure?.dimensions?.series || []
        const obsDims = structure?.dimensions?.observation || []
        const timeDim = obsDims[0] || {}
        const timePeriods = timeDim?.values || []

        if( dataSets.length === 0 ) { return { series: [] } }

        const seriesObj = dataSets[0]?.series || {}
        const seriesKeys = Object.keys( seriesObj )

        const series = seriesKeys
            .map( ( key ) => {
                const indices = key.split( ':' ).map( Number )
                const dimensions = {}
                indices
                    .forEach( ( idx, pos ) => {
                        const dim = seriesDims[pos]
                        if( dim && dim.values && dim.values[idx] ) {
                            dimensions[dim.id] = {
                                id: dim.values[idx].id,
                                name: dim.values[idx].name || dim.values[idx].id
                            }
                        }
                    } )

                const obsObj = seriesObj[key]?.observations || {}
                const obsKeys = Object.keys( obsObj ).sort( ( a, b ) => Number( a ) - Number( b ) )
                const observations = obsKeys
                    .map( ( obsKey ) => {
                        const idx = Number( obsKey )
                        const period = timePeriods[idx]?.id || ''
                        const value = obsObj[obsKey]?.[0] ?? null

                        return { period, value }
                    } )

                return { dimensions, observations }
            } )

        return { series }
    }

    const sdmxPostHandler = {
        postRequest: async ( { response, struct, payload } ) => {
            const parsed = parseSdmxData( response )

            return { response: parsed }
        }
    }

    return {
        listDataflows: {
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDataflows( response )

                return { response: parsed }
            }
        },
        ghgEmissions: sdmxPostHandler,
        energyStatistics: sdmxPostHandler,
        energyBalance: sdmxPostHandler,
        countryIndicators: sdmxPostHandler,
        educationStatistics: sdmxPostHandler
    }
}
