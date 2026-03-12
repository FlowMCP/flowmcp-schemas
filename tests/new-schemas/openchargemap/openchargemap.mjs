export const main = {
    namespace: 'openchargemap',
    name: 'OpenChargeMap',
    description: 'Access the worlds largest open registry of EV charging station locations with 300K+ stations across 100+ countries. Search for charging points by location, filter by connector type, operator, power level, and availability status.',
    version: '2.0.0',
    docs: ['https://openchargemap.org/site/develop/api'],
    tags: ['ev', 'charging', 'transport', 'geolocation', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.openchargemap.io/v3',
    requiredServerParams: ['OPENCHARGEMAP_API_KEY'],
    headers: {
        'X-API-Key': '{{OPENCHARGEMAP_API_KEY}}'
    },
    routes: {
        searchChargingStations: {
            method: 'GET',
            path: '/poi',
            description: 'Search for EV charging stations near a location. Returns detailed information including address, connector types, power levels, operator, availability status, and usage restrictions. Filter by distance, country, connector type, operator, and more.',
            parameters: [
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'distance', value: '{{DISTANCE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'distanceunit', value: '{{DISTANCE_UNIT}}', location: 'query' }, z: { primitive: 'enum(KM,Miles)', options: ['optional()', 'default(KM)'] } },
                { position: { key: 'maxresults', value: '{{MAX_RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(500)'] } },
                { position: { key: 'countrycode', value: '{{COUNTRY_CODE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'compact', value: '{{COMPACT}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'verbose', value: '{{VERBOSE}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search charging stations near London', latitude: 51.5074, longitude: -0.1278, distance: 5, maxresults: 10 },
                { _description: 'Search charging stations near Berlin', latitude: 52.52, longitude: 13.405, distance: 10, countrycode: 'DE', maxresults: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { ID: { type: 'number' }, UUID: { type: 'string' }, AddressInfo: { type: 'object', properties: { Title: { type: 'string' }, AddressLine1: { type: 'string' }, Town: { type: 'string' }, StateOrProvince: { type: 'string' }, Postcode: { type: 'string' }, Latitude: { type: 'number' }, Longitude: { type: 'number' }, Distance: { type: 'number' } } }, Connections: { type: 'array', items: { type: 'object', properties: { ConnectionTypeID: { type: 'number' }, PowerKW: { type: 'number' }, Quantity: { type: 'number' } } } }, NumberOfPoints: { type: 'number' }, UsageCost: { type: 'string' }, StatusTypeID: { type: 'number' }, OperatorID: { type: 'number' } } } }
            }
        },
        searchByCountry: {
            method: 'GET',
            path: '/poi',
            description: 'Search for EV charging stations in a specific country. Useful for browsing all stations in a country without requiring coordinates. Filter by connector type, operator, power level, and status.',
            parameters: [
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'countrycode', value: '{{COUNTRY_CODE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxresults', value: '{{MAX_RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(500)'] } },
                { position: { key: 'connectiontypeid', value: '{{CONNECTION_TYPE_ID}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'operatorid', value: '{{OPERATOR_ID}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'levelid', value: '{{LEVEL_ID}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'statustypeid', value: '{{STATUS_TYPE_ID}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'compact', value: '{{COMPACT}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Search stations in Switzerland', countrycode: 'CH', maxresults: 10 },
                { _description: 'Search stations in Netherlands', countrycode: 'NL', maxresults: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { ID: { type: 'number' }, AddressInfo: { type: 'object', properties: { Title: { type: 'string' }, Town: { type: 'string' }, Latitude: { type: 'number' }, Longitude: { type: 'number' } } }, Connections: { type: 'array' }, NumberOfPoints: { type: 'number' }, StatusTypeID: { type: 'number' }, OperatorID: { type: 'number' } } } }
            }
        },
        getStationById: {
            method: 'GET',
            path: '/poi',
            description: 'Get detailed information for a specific charging station by its OCM ID. Returns full details including address, connections, operator info, user comments, and media items.',
            parameters: [
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'chargepointid', value: '{{CHARGE_POINT_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'includecomments', value: '{{INCLUDE_COMMENTS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'verbose', value: 'true', location: 'query' }, z: { primitive: 'boolean()', options: [] } }
            ],
            tests: [
                { _description: 'Get charging station details by ID', chargepointid: '1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { ID: { type: 'number' }, UUID: { type: 'string' }, AddressInfo: { type: 'object' }, Connections: { type: 'array' }, OperatorInfo: { type: 'object' }, UsageType: { type: 'object' }, StatusType: { type: 'object' }, UserComments: { type: 'array' }, MediaItems: { type: 'array' }, NumberOfPoints: { type: 'number' }, GeneralComments: { type: 'string' }, UsageCost: { type: 'string' } } } }
            }
        },
        getReferenceData: {
            method: 'GET',
            path: '/referencedata',
            description: 'Get all core reference data used for looking up IDs. Returns connection types, operators, countries, status types, usage types, charger levels, and more. Use this data to resolve IDs from POI results into human-readable names.',
            parameters: [
                { position: { key: 'countryid', value: '{{COUNTRY_ID}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all reference data' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { ChargerTypes: { type: 'array' }, ConnectionTypes: { type: 'array' }, Countries: { type: 'array' }, CurrentTypes: { type: 'array' }, DataProviders: { type: 'array' }, Operators: { type: 'array' }, StatusTypes: { type: 'array' }, UsageTypes: { type: 'array' } } }
            }
        }
    }
}
