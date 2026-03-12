export const main = {
    namespace: 'eeawaterbase',
    name: 'EEA DISCODATA',
    description: 'Query European Environment Agency datasets via the DISCODATA SQL-to-JSON API. Access environmental data on CO2 emissions, biodiversity (EUNIS), and climate policies using Transact-SQL queries. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://discodata.eea.europa.eu/Help.html'],
    tags: ['environment', 'europe', 'opendata', 'science', 'climate', 'cacheTtlDaily'],
    root: 'https://discodata.eea.europa.eu',
    requiredServerParams: [],
    headers: {},
    tools: {
        runQuery: {
            method: 'GET',
            path: '/sql',
            description: 'Execute a Transact-SQL SELECT query against EEA DISCODATA and return JSON results. Use [Database].[version].[Table] format. Known databases: EUNIS (biodiversity), CO2Emission (vehicle emissions), GHGPAMS (climate policies). Only DQL allowed, no DDL.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'nrOfHits', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(10000)'] } }
            ],
            tests: [
                { _description: 'Query EUNIS species at Austrian site', query: "SELECT TOP 5 * FROM [EUNIS].[v1].[Site_Species] WHERE code_site = 'AT1101112'", p: 1, nrOfHits: 5 },
                { _description: 'Count EUNIS species records', query: 'SELECT count(*) as total FROM [EUNIS].[v1].[Site_Species]', p: 1, nrOfHits: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object' } }
                    }
                }
            },
        },
        queryCo2Cars: {
            method: 'GET',
            path: '/sql',
            description: 'Query CO2 emissions data for passenger cars in Europe from the CO2Emission database. Provide a full SQL query targeting [CO2Emission].[latest].[co2cars]. Columns include MS (country), Mk (make), Cn (model), Ft (fuel type), Enedc/Ewltp (g/km), Ep (KW), year, status.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'nrOfHits', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(10000)'] } }
            ],
            tests: [
                { _description: 'Get 10 Volkswagen cars from 2019', query: "SELECT TOP 10 MS, Mk, Cn, Ft, [Ewltp (g/km)], [Ep (KW)] FROM [CO2Emission].[latest].[co2cars] WHERE year = 2019 AND Mk = 'VOLKSWAGEN'", p: 1, nrOfHits: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { MS: { type: 'string' }, Mk: { type: 'string' }, Cn: { type: 'string' }, Ft: { type: 'string' } } } }
                    }
                }
            },
        },
        queryClimatePolicies: {
            method: 'GET',
            path: '/sql',
            description: 'Query EU climate change policies and measures (PAMs) from the GHGPAMS database. Provide a full SQL query targeting [GHGPAMS].[latest].[PAMs_Viewer_Flat_file_final_elasticsearch]. Columns include Country, Name_of_policy_or_measure, Status_of_implementation, Type_of_policy_instrument, Sector_s__affected.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'nrOfHits', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(10000)'] } }
            ],
            tests: [
                { _description: 'Get Austrian climate policies', query: "SELECT TOP 10 Country, Name_of_policy_or_measure, Status_of_implementation, Type_of_policy_instrument FROM [GHGPAMS].[latest].[PAMs_Viewer_Flat_file_final_elasticsearch] WHERE Country = 'Austria'", p: 1, nrOfHits: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { Country: { type: 'string' }, Name_of_policy_or_measure: { type: 'string' }, Status_of_implementation: { type: 'string' }, Type_of_policy_instrument: { type: 'string' } } } }
                    }
                }
            },
        },
        queryEunisSpecies: {
            method: 'GET',
            path: '/sql',
            description: 'Query EUNIS biodiversity data for species at European protected sites. Provide a full SQL query targeting [EUNIS].[v1].[Site_Species]. Columns include code_site, id_eunis, code_2000, species_name, species_group_name, picture_url.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'p', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'nrOfHits', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(10000)'] } }
            ],
            tests: [
                { _description: 'Get species at Austrian site', query: "SELECT * FROM [EUNIS].[v1].[Site_Species] WHERE code_site = 'AT1101112'", p: 1, nrOfHits: 10 },
                { _description: 'Get flowering plants across sites', query: "SELECT TOP 10 code_site, species_name FROM [EUNIS].[v1].[Site_Species] WHERE species_group_name = 'Flowering Plants'", p: 1, nrOfHits: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object', properties: { code_site: { type: 'string' }, id_eunis: { type: 'number' }, species_name: { type: 'string' }, species_group_name: { type: 'string' }, picture_url: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}
