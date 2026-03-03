export const main = {
    namespace: 'aviationstack',
    name: 'Aviationstack',
    description: 'Real-time flight tracking, airport lookup, airline data, and aviation reference information worldwide. Covers 10,000+ airports, 13,000+ airlines, and global flight status data.',
    version: '2.0.0',
    docs: ['https://aviationstack.com/documentation'],
    tags: ['aviation', 'flights', 'airports', 'airlines', 'cacheTtlFrequent'],
    root: 'https://api.aviationstack.com',
    requiredServerParams: ['AVIATIONSTACK_API_KEY'],
    headers: {},
    routes: {
        getFlights: {
            method: 'GET',
            path: '/v1/flights',
            description: 'Get real-time flight tracking data. Filter by departure/arrival airport, airline, flight number, or flight status. Returns flight details including departure, arrival, airline, and codeshare information.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'flight_status', value: '{{FLIGHT_STATUS}}', location: 'query' }, z: { primitive: 'enum(scheduled,active,landed,cancelled,incident,diverted)', options: ['optional()'] } },
                { position: { key: 'flight_date', value: '{{FLIGHT_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dep_iata', value: '{{DEP_IATA}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'arr_iata', value: '{{ARR_IATA}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'airline_iata', value: '{{AIRLINE_IATA}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'flight_iata', value: '{{FLIGHT_IATA}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get active flights departing from JFK', DEP_IATA: 'JFK', FLIGHT_STATUS: 'active', LIMIT: '10' },
                { _description: 'Get Lufthansa flights', AIRLINE_IATA: 'LH', LIMIT: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getAirports: {
            method: 'GET',
            path: '/v1/airports',
            description: 'Get global airport data including name, IATA/ICAO codes, geolocation, timezone, country, and city information.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search', value: '{{SEARCH}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get first 10 airports', LIMIT: '10' },
                { _description: 'Search airports by name', SEARCH: 'Munich', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getAirlines: {
            method: 'GET',
            path: '/v1/airlines',
            description: 'Get global airline data including name, IATA/ICAO codes, callsign, fleet size, fleet age, founding date, hub, and country of origin.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search', value: '{{SEARCH}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get first 10 airlines', LIMIT: '10' },
                { _description: 'Search airlines', SEARCH: 'Lufthansa', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getCities: {
            method: 'GET',
            path: '/v1/cities',
            description: 'Get destination city data including IATA codes, geolocation, timezone, GMT offset, and country information.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search', value: '{{SEARCH}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get first 10 cities', LIMIT: '10' },
                { _description: 'Search cities', SEARCH: 'Berlin', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getCountries: {
            method: 'GET',
            path: '/v1/countries',
            description: 'Get country data including ISO codes, capital, currency, continent, population, and phone prefix.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search', value: '{{SEARCH}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get first 10 countries', LIMIT: '10' },
                { _description: 'Search countries', SEARCH: 'Germany', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getAirplanes: {
            method: 'GET',
            path: '/v1/airplanes',
            description: 'Get airplane and aircraft data including registration number, model, production line, engine details, airline, owner, age, and status.',
            parameters: [
                { position: { key: 'access_key', value: '{{SERVER_PARAM:AVIATIONSTACK_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'search', value: '{{SEARCH}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get first 10 airplanes', LIMIT: '10' },
                { _description: 'Search airplanes', SEARCH: 'Boeing', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        data: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        }
    }
}
