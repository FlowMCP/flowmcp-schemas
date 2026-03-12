export const main = {
    namespace: 'electricitymaps',
    name: 'Electricity Maps',
    description: 'Access real-time and historical carbon intensity and power breakdown data for electricity grids worldwide. Get CO2 emissions per kWh, power production/consumption by source type (solar, wind, coal, etc.), and forecasts for 200+ zones. The /zones endpoint is free; other endpoints require an API key.',
    version: '2.0.0',
    docs: ['https://static.electricitymaps.com/api/docs/index.html', 'https://www.electricitymaps.com/free-tier-api'],
    tags: ['energy', 'carbon', 'climate', 'electricity', 'emissions', 'cacheTtlFrequent'],
    root: 'https://api.electricitymap.org/v3',
    requiredServerParams: ['ELECTRICITYMAPS_API_TOKEN'],
    headers: {
        'auth-token': '{{ELECTRICITYMAPS_API_TOKEN}}'
    },
    routes: {
        getZones: {
            method: 'GET',
            path: '/zones',
            description: 'List all available zones (countries and sub-regions) with their display names. This endpoint is free and does not require authentication. Use zone keys (e.g. DE, US-CAL-CISO, FR) as identifiers for other endpoints.',
            parameters: [],
            tests: [
                { _description: 'Get all available zones' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', description: 'Object with zone keys as properties, each containing zoneName and countryName' }
            }
        },
        getCarbonIntensityLatest: {
            method: 'GET',
            path: '/carbon-intensity/latest',
            description: 'Get the latest carbon intensity (gCO2eq/kWh) of electricity consumed in a zone. Can query by zone key or by latitude/longitude geolocation.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lon', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'emissionFactorType', value: '{{EMISSION_FACTOR_TYPE}}', location: 'query' }, z: { primitive: 'enum(lifecycle,direct)', options: ['optional()', 'default(lifecycle)'] } },
                { position: { key: 'disableEstimations', value: '{{DISABLE_ESTIMATIONS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get latest carbon intensity for Germany', zone: 'DE' },
                { _description: 'Get latest carbon intensity for California', zone: 'US-CAL-CISO' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { zone: { type: 'string' }, carbonIntensity: { type: 'number' }, datetime: { type: 'string' }, updatedAt: { type: 'string' }, emissionFactorType: { type: 'string' }, isEstimated: { type: 'boolean' }, estimationMethod: { type: 'string' } } }
            }
        },
        getCarbonIntensityHistory: {
            method: 'GET',
            path: '/carbon-intensity/history',
            description: 'Get the last 24 hours of carbon intensity (gCO2eq/kWh) for a zone at 60-minute resolution. Can query by zone key or by geolocation.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lon', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'emissionFactorType', value: '{{EMISSION_FACTOR_TYPE}}', location: 'query' }, z: { primitive: 'enum(lifecycle,direct)', options: ['optional()', 'default(lifecycle)'] } },
                { position: { key: 'disableEstimations', value: '{{DISABLE_ESTIMATIONS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get carbon intensity history for France', zone: 'FR' },
                { _description: 'Get carbon intensity history for Denmark', zone: 'DK-DK1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { zone: { type: 'string' }, history: { type: 'array', items: { type: 'object', properties: { zone: { type: 'string' }, carbonIntensity: { type: 'number' }, datetime: { type: 'string' }, updatedAt: { type: 'string' }, isEstimated: { type: 'boolean' }, emissionFactorType: { type: 'string' } } } } } }
            }
        },
        getCarbonIntensityForecast: {
            method: 'GET',
            path: '/carbon-intensity/forecast',
            description: 'Get the forecasted carbon intensity (gCO2eq/kWh) for a zone. Returns hourly forecasts for the upcoming period.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lon', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get carbon intensity forecast for Germany', zone: 'DE' },
                { _description: 'Get carbon intensity forecast for Sweden', zone: 'SE-SE3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { zone: { type: 'string' }, forecast: { type: 'array', items: { type: 'object', properties: { carbonIntensity: { type: 'number' }, datetime: { type: 'string' } } } }, updatedAt: { type: 'string' } } }
            }
        },
        getPowerBreakdownLatest: {
            method: 'GET',
            path: '/power-breakdown/latest',
            description: 'Get the latest power consumption and production breakdown by source type (solar, wind, hydro, nuclear, coal, gas, etc.) for a zone in MW. Includes fossil-free and renewable percentages.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lon', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'disableEstimations', value: '{{DISABLE_ESTIMATIONS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get power breakdown for Germany', zone: 'DE' },
                { _description: 'Get power breakdown for Norway', zone: 'NO-NO1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { zone: { type: 'string' }, datetime: { type: 'string' }, updatedAt: { type: 'string' }, fossilFreePercentage: { type: 'number' }, renewablePercentage: { type: 'number' }, powerConsumptionTotal: { type: 'number' }, powerProductionTotal: { type: 'number' }, powerImportTotal: { type: 'number' }, powerExportTotal: { type: 'number' }, powerConsumptionBreakdown: { type: 'object' }, powerProductionBreakdown: { type: 'object' }, isEstimated: { type: 'boolean' } } }
            }
        },
        getPowerBreakdownHistory: {
            method: 'GET',
            path: '/power-breakdown/history',
            description: 'Get the last 24 hours of power consumption and production breakdown by source type for a zone at 60-minute resolution. Shows how the electricity mix changes over time.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lon', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'disableEstimations', value: '{{DISABLE_ESTIMATIONS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get power breakdown history for France', zone: 'FR' },
                { _description: 'Get power breakdown history for Spain', zone: 'ES' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { zone: { type: 'string' }, history: { type: 'array', items: { type: 'object', properties: { datetime: { type: 'string' }, fossilFreePercentage: { type: 'number' }, renewablePercentage: { type: 'number' }, powerConsumptionTotal: { type: 'number' }, powerProductionTotal: { type: 'number' }, powerConsumptionBreakdown: { type: 'object' }, powerProductionBreakdown: { type: 'object' }, isEstimated: { type: 'boolean' } } } } } }
            }
        }
    }
}
