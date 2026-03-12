export const main = {
    namespace: 'hochwasserzentralen',
    name: 'Hochwasserzentralen',
    description: 'Query the German cross-state flood portal (Laenderuebergreifendes Hochwasser Portal) for real-time gauge station data, flood warnings, and gauge locations across all German federal states.',
    version: '3.0.0',
    docs: ['https://www.hochwasserzentralen.de/developers/', 'https://www.hochwasserzentralen.de/developers/api-docs'],
    tags: ['floods', 'hydrology', 'germany', 'geospatial', 'cacheTtlFrequent'],
    root: 'https://www.hochwasserzentralen.de',
    requiredServerParams: [],
    headers: {},
    tools: {
        getGaugeInfo: {
            method: 'POST',
            path: '/webservices/get_infospegel.php',
            description: 'Get detailed information for a specific gauge station by its identifier. Returns water level, alert status, and station metadata.',
            parameters: [
                { position: { key: 'pgnr', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get gauge info for a Hessen gauge station', pgnr: 'HE_24820206' },
                { _description: 'Get gauge info for a Bayern gauge station', pgnr: 'BY_16005701' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pgnr: { type: 'string', description: 'Gauge station identifier' },
                        name: { type: 'string', description: 'Station name' },
                        gewaesser: { type: 'string', description: 'Water body name' },
                        bundesland: { type: 'string', description: 'Federal state' },
                        km: { type: 'string', description: 'River kilometer' },
                        messwert: { type: 'string', description: 'Current measurement value' },
                        datum: { type: 'string', description: 'Measurement timestamp' },
                        tendenz: { type: 'string', description: 'Trend (rising, falling, stable)' },
                        meldestufe: { type: 'string', description: 'Alert level' }
                    }
                }
            }
        },
        getStateInfoPost: {
            method: 'POST',
            path: '/webservices/get_infosbundesland.php',
            description: 'Get flood situation overview for a specific German federal state. Returns gauge stations, alert levels, and current warnings for the requested state.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(BW,BY,BE,BB,HB,HH,HE,MV,NI,NW,RP,SL,SN,ST,SH,TH)', options: [] } }
            ],
            tests: [
                { _description: 'Get flood situation for Hessen', id: 'HE' },
                { _description: 'Get flood situation for Bayern', id: 'BY' },
                { _description: 'Get flood situation for Sachsen', id: 'SN' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        bundesland: { type: 'string', description: 'Federal state name' },
                        id: { type: 'string', description: 'Federal state abbreviation' },
                        meldestufe: { type: 'string', description: 'Highest alert level in the state' },
                        pegel: {
                            type: 'array',
                            description: 'Array of gauge stations with current data',
                            items: {
                                type: 'object',
                                properties: {
                                    pgnr: { type: 'string' },
                                    name: { type: 'string' },
                                    gewaesser: { type: 'string' },
                                    messwert: { type: 'string' },
                                    meldestufe: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getStateInfoGet: {
            method: 'GET',
            path: '/webservices/get_infosbundesland.php',
            description: 'Get flood situation for a federal state via GET request. Also returns connected border areas (bundesland_extra). Omit the id parameter to get all states.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BW,BY,BE,BB,HB,HH,HE,MV,NI,NW,RP,SL,SN,ST,SH,TH)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get flood situation for Nordrhein-Westfalen', id: 'NW' },
                { _description: 'Get flood situation for all federal states' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        bundesland: { type: 'array', description: 'Array of federal states with flood data' },
                        bundesland_extra: { type: 'array', description: 'Connected border areas and cross-state flood regions' }
                    }
                }
            }
        },
        getGaugeLocations: {
            method: 'GET',
            path: '/webservices/get_lagepegel.php',
            description: 'Get geographic locations and identifiers for all gauge stations across Germany. Returns station positions for mapping and cross-referencing.',
            parameters: [],
            tests: [
                { _description: 'Get all gauge station locations' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pegel: {
                            type: 'array',
                            description: 'Array of gauge stations with location data',
                            items: {
                                type: 'object',
                                properties: {
                                    pgnr: { type: 'string', description: 'Gauge station identifier' },
                                    name: { type: 'string', description: 'Station name' },
                                    lat: { type: 'number', description: 'Latitude' },
                                    lon: { type: 'number', description: 'Longitude' },
                                    bundesland: { type: 'string', description: 'Federal state abbreviation' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
