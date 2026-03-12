export const main = {
    namespace: 'electricitymaps',
    name: 'Electricity Maps',
    description: 'Real-time and historical carbon intensity, power breakdown, and generation data for electricity grids worldwide. Covers 200+ zones across 160+ countries. Free tier available with API key.',
    version: '3.0.0',
    docs: ['https://static.electricitymaps.com/api/docs/index.html', 'https://app.electricitymaps.com/'],
    tags: ['energy', 'carbon', 'electricity', 'climate', 'cacheTtlFrequent'],
    root: 'https://api.electricitymap.org/v3',
    requiredServerParams: ['ELECTRICITYMAPS_AUTH_TOKEN'],
    headers: {
        'auth-token': '{{ELECTRICITYMAPS_AUTH_TOKEN}}'
    },
    tools: {
        listZones: {
            method: 'GET',
            path: '/zones',
            description: 'List all available electricity zones worldwide with zone names, country codes, sub-zones, and commercial availability tier. Does not require authentication.',
            parameters: [],
            tests: [
                { _description: 'List all electricity zones' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object'
                }
            }
        },
        getLatestCarbonIntensity: {
            method: 'GET',
            path: '/carbon-intensity/latest',
            description: 'Get the latest carbon intensity value (gCO2eq/kWh) for a specific electricity zone. Returns lifecycle and direct emission factors.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get carbon intensity for Germany', ZONE: 'DE' },
                { _description: 'Get carbon intensity for France', ZONE: 'FR' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        zone: { type: 'string' },
                        carbonIntensity: { type: 'number' },
                        datetime: { type: 'string' },
                        updatedAt: { type: 'string' },
                        emissionFactorType: { type: 'string' },
                        isEstimated: { type: 'boolean' },
                        estimationMethod: { type: 'string' }
                    }
                }
            }
        },
        getCarbonIntensityHistory: {
            method: 'GET',
            path: '/carbon-intensity/history',
            description: 'Get historical carbon intensity data for a zone. Returns hourly values for the last 24 hours by default.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get carbon intensity history for Germany', ZONE: 'DE' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        zone: { type: 'string' },
                        history: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    carbonIntensity: { type: 'number' },
                                    datetime: { type: 'string' },
                                    isEstimated: { type: 'boolean' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getLatestPowerBreakdown: {
            method: 'GET',
            path: '/power-breakdown/latest',
            description: 'Get the latest power generation and consumption breakdown by source (wind, solar, nuclear, gas, coal, hydro, etc.) for a zone in MW.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get power breakdown for Germany', ZONE: 'DE' },
                { _description: 'Get power breakdown for California', ZONE: 'US-CAL-CISO' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        zone: { type: 'string' },
                        datetime: { type: 'string' },
                        powerConsumptionBreakdown: { type: 'object' },
                        powerProductionBreakdown: { type: 'object' },
                        powerImportBreakdown: { type: 'object' },
                        powerExportBreakdown: { type: 'object' },
                        fossilFreePercentage: { type: 'number' },
                        renewablePercentage: { type: 'number' }
                    }
                }
            }
        },
        getPowerBreakdownHistory: {
            method: 'GET',
            path: '/power-breakdown/history',
            description: 'Get historical power breakdown data for a zone. Returns hourly production and consumption by source for the last 24 hours.',
            parameters: [
                { position: { key: 'zone', value: '{{ZONE}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get power breakdown history for France', ZONE: 'FR' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        zone: { type: 'string' },
                        history: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    datetime: { type: 'string' },
                                    powerConsumptionBreakdown: { type: 'object' },
                                    powerProductionBreakdown: { type: 'object' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
