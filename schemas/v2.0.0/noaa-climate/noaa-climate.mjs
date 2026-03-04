export const main = {
    namespace: 'noaaclimate',
    name: 'NOAA Climate Data',
    description: 'Access US and global climate data from NOAA National Centers for Environmental Information (NCEI). Query daily weather summaries, global station data, and climate normals. Covers 10,000+ weather stations worldwide with temperature, precipitation, wind, and other observations. Two APIs available: CDO Web Services (requires free API key) and NCEI Data Services (no key required).',
    version: '2.0.0',
    docs: ['https://www.ncei.noaa.gov/support/access-data-service-api-user-documentation'],
    tags: ['weather', 'climate', 'science', 'usa', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.ncei.noaa.gov',
    requiredServerParams: [],
    headers: {},
    routes: {
        getDailySummaries: {
            method: 'GET',
            path: '/access/services/data/v1',
            description: 'Get daily weather summaries from NOAA stations. Returns temperature (TMAX, TMIN, TAVG in tenths of degrees Celsius), precipitation (PRCP in tenths of mm), snowfall (SNOW in mm), and more. Station IDs follow GHCN format (e.g., USW00094728 for Central Park NYC). No API key required.',
            parameters: [
                { position: { key: 'dataset', value: 'daily-summaries', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'stations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dataTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(TMAX,TMIN,PRCP)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'units', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(standard,metric)', options: ['optional()', 'default(standard)'] } }
            ],
            tests: [
                { _description: 'NYC Central Park Jan 2024', stations: 'USW00094728', startDate: '2024-01-01', endDate: '2024-01-03', dataTypes: 'TMAX,TMIN,PRCP' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { DATE: { type: 'string' }, STATION: { type: 'string' }, TMAX: { type: 'string' }, TMIN: { type: 'string' }, PRCP: { type: 'string' }, SNOW: { type: 'string' }, TAVG: { type: 'string' } } } }
            }
        },
        getGlobalSummary: {
            method: 'GET',
            path: '/access/services/data/v1',
            description: 'Get global summary of the day (GSOD) from worldwide weather stations. Returns temperature (TEMP in Fahrenheit), dew point (DEWP), sea level pressure (SLP), visibility (VISIB), wind speed (WDSP in knots), precipitation (PRCP in inches), max/min temperature. Station IDs use USAF-WBAN format (e.g., 72503014732 for LaGuardia Airport).',
            parameters: [
                { position: { key: 'dataset', value: 'global-summary-of-the-day', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'stations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dataTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'LaGuardia Airport Jan 2024', stations: '72503014732', startDate: '2024-01-01', endDate: '2024-01-03' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { DATE: { type: 'string' }, STATION: { type: 'string' }, TEMP: { type: 'string' }, DEWP: { type: 'string' }, SLP: { type: 'string' }, VISIB: { type: 'string' }, WDSP: { type: 'string' }, MXSPD: { type: 'string' }, GUST: { type: 'string' }, MAX: { type: 'string' }, MIN: { type: 'string' }, PRCP: { type: 'string' }, SNDP: { type: 'string' }, FRSHTT: { type: 'string' } } } }
            }
        },
        getGlobalHourly: {
            method: 'GET',
            path: '/access/services/data/v1',
            description: 'Get hourly weather observations from global stations (Integrated Surface Database). Returns wind direction/speed, temperature, dew point, sea level pressure, visibility, and weather type. High temporal resolution data for detailed analysis.',
            parameters: [
                { position: { key: 'dataset', value: 'global-hourly', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'stations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dataTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'JFK Airport hourly Jan 1 2024', stations: '72503014732', startDate: '2024-01-01', endDate: '2024-01-01' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { DATE: { type: 'string' }, STATION: { type: 'string' }, TMP: { type: 'string' }, DEW: { type: 'string' }, SLP: { type: 'string' }, WND: { type: 'string' }, VIS: { type: 'string' }, AA1: { type: 'string' } } } }
            }
        },
        getClimateNormals: {
            method: 'GET',
            path: '/access/services/data/v1',
            description: 'Get 30-year climate normals (1991-2020) for US stations. Returns average temperatures, precipitation, heating/cooling degree days, and other statistical normals. Useful for comparing current conditions to historical averages.',
            parameters: [
                { position: { key: 'dataset', value: 'normals-daily', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'stations', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'dataTypes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(DLY-TMAX-NORMAL,DLY-TMIN-NORMAL,DLY-PRCP-PCTALL-GE001HI)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'NYC normals for January', stations: 'USW00094728', startDate: '2010-01-01', endDate: '2010-01-31', dataTypes: 'DLY-TMAX-NORMAL,DLY-TMIN-NORMAL' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { DATE: { type: 'string' }, STATION: { type: 'string' } } } }
            }
        }
    }
}
