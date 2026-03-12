export const main = {
    namespace: 'diseasesh',
    name: 'Disease.sh Epidemic Data',
    description: 'Access global epidemic data from disease.sh (formerly NovelCOVID). Get COVID-19 statistics for 200+ countries, US states, and historical timelines. Also covers influenza and vaccine data. Updated every 10 minutes from Johns Hopkins, Worldometers, and government sources. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://disease.sh/docs/'],
    tags: ['health', 'covid', 'statistics', 'opendata', 'cacheTtlFrequent'],
    root: 'https://disease.sh',
    requiredServerParams: [],
    headers: {},
    tools: {
        getGlobalStats: {
            method: 'GET',
            path: '/v3/covid-19/all',
            description: 'Get global COVID-19 statistics. Returns total cases, deaths, recovered, active, critical, tests, population, and today\'s numbers.',
            parameters: [],
            tests: [
                { _description: 'Get global COVID-19 stats' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { updated: { type: 'number' }, cases: { type: 'number' }, todayCases: { type: 'number' }, deaths: { type: 'number' }, todayDeaths: { type: 'number' }, recovered: { type: 'number' }, active: { type: 'number' }, critical: { type: 'number' }, casesPerOneMillion: { type: 'number' }, deathsPerOneMillion: { type: 'number' }, tests: { type: 'number' }, population: { type: 'number' }, activePerOneMillion: { type: 'number' }, affectedCountries: { type: 'number' } } }
            }
        },
        getCountryStats: {
            method: 'GET',
            path: '/v3/covid-19/countries/:country',
            description: 'Get COVID-19 statistics for a specific country. Use country name, ISO2, ISO3, or country ID. Returns cases, deaths, recovered, tests, and per-million metrics.',
            parameters: [
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Germany COVID stats', country: 'germany' },
                { _description: 'USA COVID stats', country: 'usa' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { updated: { type: 'number' }, country: { type: 'string' }, countryInfo: { type: 'object', properties: { iso2: { type: 'string' }, iso3: { type: 'string' }, flag: { type: 'string' } } }, cases: { type: 'number' }, todayCases: { type: 'number' }, deaths: { type: 'number' }, todayDeaths: { type: 'number' }, recovered: { type: 'number' }, active: { type: 'number' }, critical: { type: 'number' }, casesPerOneMillion: { type: 'number' }, tests: { type: 'number' }, population: { type: 'number' }, continent: { type: 'string' } } }
            }
        },
        getAllCountries: {
            method: 'GET',
            path: '/v3/covid-19/countries',
            description: 'Get COVID-19 statistics for all countries. Can be sorted by cases, deaths, recovered, active, critical, or tests. Returns 200+ countries.',
            parameters: [
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(cases,todayCases,deaths,todayDeaths,recovered,active,critical,tests)', options: ['optional()', 'default(cases)'] } }
            ],
            tests: [
                { _description: 'Countries sorted by cases', sort: 'cases' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { country: { type: 'string' }, countryInfo: { type: 'object', properties: { iso2: { type: 'string' }, flag: { type: 'string' } } }, cases: { type: 'number' }, deaths: { type: 'number' }, recovered: { type: 'number' }, active: { type: 'number' }, population: { type: 'number' } } } }
            }
        },
        getHistorical: {
            method: 'GET',
            path: '/v3/covid-19/historical/:country',
            description: 'Get historical COVID-19 data for a country. Returns daily cases, deaths, and recovered over time. Use lastdays parameter to limit (default 30, max 9999 for all data).',
            parameters: [
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'lastdays', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)'] } }
            ],
            tests: [
                { _description: 'Germany last 7 days', country: 'germany', lastdays: 7 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { country: { type: 'string' }, province: { type: 'array' }, timeline: { type: 'object', properties: { cases: { type: 'object' }, deaths: { type: 'object' }, recovered: { type: 'object' } } } } }
            }
        },
        getContinentStats: {
            method: 'GET',
            path: '/v3/covid-19/continents/:continent',
            description: 'Get COVID-19 statistics for a specific continent. Returns aggregated data for all countries in the continent.',
            parameters: [
                { position: { key: 'continent', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(North America,South America,Europe,Asia,Africa,Oceania)', options: [] } }
            ],
            tests: [
                { _description: 'Europe COVID stats', continent: 'Europe' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { updated: { type: 'number' }, continent: { type: 'string' }, cases: { type: 'number' }, deaths: { type: 'number' }, recovered: { type: 'number' }, active: { type: 'number' }, critical: { type: 'number' }, population: { type: 'number' }, countries: { type: 'array', items: { type: 'string' } } } }
            }
        }
    }
}
