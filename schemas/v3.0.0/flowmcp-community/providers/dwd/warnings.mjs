export const main = {
    namespace: 'dwd',
    name: 'DWD Warnwetter',
    description: 'Access German Weather Service (DWD) weather warnings, forecasts, and station data via the official Warnwetter API. Complements Bright Sky with direct station-based queries and warning data.',
    version: '3.0.0',
    docs: ['https://dwd.api.bund.dev/'],
    tags: ['weather', 'germany', 'warnings', 'opendata'],
    root: 'https://app-prod-ws.warnwetter.de/v30',
    requiredServerParams: [],
    headers: {},
    tools: {
        getStationWeather: {
            method: 'GET',
            path: '/stationOverviewExtended',
            description: 'Get current weather data and forecast for specific DWD weather stations. Requires DWD station IDs (e.g. 10865 for Frankfurt, G005 for Munich).',
            parameters: [
                { position: { key: 'stationIds', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get weather for Frankfurt station', stationIds: '10865' },
                { _description: 'Get weather for multiple stations', stationIds: '10865,G005' }
            ],
        },
        getWeatherWarnings: {
            method: 'GET',
            path: '/warnings.json',
            description: 'Get all current severe weather warnings for German regions. Returns warning level, type, affected regions, and time period.',
            parameters: [],
            tests: [
                { _description: 'Get all current weather warnings' }
            ],
        }
    }
}

export const handlers = () => {
    return {
        getWeatherWarnings: {
            executeRequest: async ( { struct, payload } ) => {
                const url = 'https://www.dwd.de/DWD/warnungen/warnapp/json/warnings.json'
                const response = await fetch( url )
                const text = await response.text()
                const jsonStr = text.replace( /^warnWetter\.loadWarnings\(/, '' ).replace( /\);?\s*$/, '' )
                const data = JSON.parse( jsonStr )

                struct['status'] = true
                struct['data'] = {
                    source: 'dwd-warnwetter',
                    timestamp: data['time'],
                    warningCount: Object.keys( data['warnings'] || {} ).length,
                    warnings: data['warnings'] || {}
                }

                return { struct }
            }
        }
    }
}
