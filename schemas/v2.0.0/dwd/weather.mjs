// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'dwd',
    name: 'DWD WarnWetter API',
    description: 'German Weather Service (Deutscher Wetterdienst) weather forecasts and station data via the WarnWetter app API',
    version: '2.0.0',
    docs: ['https://dwd.api.bund.dev/'],
    tags: ['weather', 'germany', 'forecast', 'cacheTtlFrequent'],
    root: 'https://app-prod-ws.warnwetter.de/v30',
    routes: {
        getStationOverview: {
            method: 'GET',
            path: '/stationOverviewExtended',
            description: 'Get extended weather forecast overview for a station. Returns hourly forecasts, daily summaries, warnings, and three-hour summaries.',
            parameters: [
                { position: { key: 'stationIds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("10382")'] } }
            ],
            tests: [
                { _description: 'Get Berlin Tegel station forecast', stationIds: '10382' },
                { _description: 'Get Hamburg station forecast', stationIds: '10147' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        '10382': { type: 'object', properties: { forecast1: { type: 'object', properties: { stationId: { type: 'string' }, start: { type: 'number' }, timeStep: { type: 'number' }, temperature: { type: 'array', items: { type: 'number' } }, windSpeed: { type: 'string', nullable: true }, windDirection: { type: 'string', nullable: true }, windGust: { type: 'string', nullable: true }, precipitationTotal: { type: 'array', items: { type: 'number' } }, sunshine: { type: 'array', items: { type: 'number' } }, dewPoint2m: { type: 'array', items: { type: 'number' } }, surfacePressure: { type: 'array', items: { type: 'number' } }, humidity: { type: 'array', items: { type: 'number' } }, isDay: { type: 'array', items: { type: 'boolean' } }, cloudCoverTotal: { type: 'array', items: { type: 'string' } }, temperatureStd: { type: 'array', items: { type: 'number' } }, icon: { type: 'array', items: { type: 'number' } }, icon1h: { type: 'array', items: { type: 'number' } }, precipitationProbablity: { type: 'string', nullable: true }, precipitationProbablityIndex: { type: 'number', nullable: true } } }, days: { type: 'array', items: { type: 'object' } }, forecast2: { type: 'object', properties: { stationId: { type: 'string' }, start: { type: 'number' }, timeStep: { type: 'number' }, temperature: { type: 'array', items: { type: 'string' } }, windSpeed: { type: 'string', nullable: true }, windDirection: { type: 'string', nullable: true }, windGust: { type: 'string', nullable: true }, precipitationTotal: { type: 'array', items: { type: 'number' } }, sunshine: { type: 'array', items: { type: 'number' } }, dewPoint2m: { type: 'array', items: { type: 'number' } }, surfacePressure: { type: 'array', items: { type: 'number' } }, humidity: { type: 'array', items: { type: 'number' } }, isDay: { type: 'array', items: { type: 'boolean' } }, cloudCoverTotal: { type: 'array', items: { type: 'string' } }, temperatureStd: { type: 'array', items: { type: 'string' } }, icon: { type: 'array', items: { type: 'number' } }, icon1h: { type: 'array', items: { type: 'number' } }, precipitationProbablity: { type: 'string', nullable: true }, precipitationProbablityIndex: { type: 'number', nullable: true } } }, forecastStart: { type: 'string', nullable: true }, warnings: { type: 'array', items: { type: 'object' } }, threeHourSummaries: { type: 'string', nullable: true } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getStationOverview: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { response }}

            const stations = Object.entries( raw )
            .map( ( [ stationId, data ] ) => {
            const result = {
            stationId,
            forecastStart: data.forecastStart || null,
            days: data.days || null,
            warnings: data.warnings || []
            }

            return result
            } )

            response = {
            stationCount: stations.length,
            stations
            }

            return { response }
        }
    }
} )
