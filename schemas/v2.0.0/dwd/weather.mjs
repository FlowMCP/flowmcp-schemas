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
            ]
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
