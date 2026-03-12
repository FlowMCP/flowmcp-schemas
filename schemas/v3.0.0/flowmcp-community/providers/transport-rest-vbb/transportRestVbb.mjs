export const main = {
    namespace: 'transportrestvbb',
    name: 'transport.rest VBB',
    description: 'Access Berlin-Brandenburg public transit data (VBB) via the transport.rest API. Search stations, get real-time departures and arrivals for S-Bahn, U-Bahn, tram, bus, and regional trains, plan journeys, and retrieve trip details. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://v6.vbb.transport.rest/', 'https://github.com/public-transport/hafas-rest-api'],
    tags: ['transport', 'public-transit', 'berlin', 'germany', 'timetable', 'cacheTtlFrequent'],
    root: 'https://v6.vbb.transport.rest',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchLocations: {
            method: 'GET',
            path: '/locations',
            description: 'Search for stops, stations, and addresses in the VBB network by name. Returns matching locations with coordinates, available transport products (S-Bahn, U-Bahn, tram, bus, ferry, regional), and station weight.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'results', value: '{{RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(50)'] } },
                { position: { key: 'fuzzy', value: '{{FUZZY}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Search for Alexanderplatz', query: 'Alexanderplatz', results: 5 },
                { _description: 'Search for Potsdam stations', query: 'Potsdam', results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, type: { type: 'string' }, location: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' } } }, products: { type: 'object' }, stationDHID: { type: 'string' } } } }
            }
        },
        getStop: {
            method: 'GET',
            path: '/stops/:stopId',
            description: 'Get detailed information about a specific stop/station by its VBB stop ID including name, coordinates, available products, and connected lines.',
            parameters: [
                { position: { key: 'stopId', value: '{{STOP_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Alexanderplatz station details', stopId: '900100003' },
                { _description: 'Get Zoologischer Garten station details', stopId: '900023201' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, type: { type: 'string' }, location: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' } } }, products: { type: 'object' }, stationDHID: { type: 'string' } } }
            }
        },
        getDepartures: {
            method: 'GET',
            path: '/stops/:stopId/departures',
            description: 'Get real-time departures from a VBB stop/station. Returns scheduled and actual departure times, platform, line name, direction, delay, and transport mode for all VBB services.',
            parameters: [
                { position: { key: 'stopId', value: '{{STOP_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'duration', value: '{{DURATION}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)'] } },
                { position: { key: 'results', value: '{{RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(50)'] } },
                { position: { key: 'suburban', value: '{{SUBURBAN}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'subway', value: '{{SUBWAY}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'tram', value: '{{TRAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'bus', value: '{{BUS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Get departures from Alexanderplatz', stopId: '900100003', results: 5 },
                { _description: 'Get S-Bahn only departures from Friedrichstr', stopId: '900100001', suburban: true, subway: false, tram: false, bus: false, results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { departures: { type: 'array', items: { type: 'object', properties: { tripId: { type: 'string' }, stop: { type: 'object' }, when: { type: 'string' }, plannedWhen: { type: 'string' }, delay: { type: 'number' }, platform: { type: 'string' }, direction: { type: 'string' }, line: { type: 'object', properties: { name: { type: 'string' }, mode: { type: 'string' }, product: { type: 'string' } } } } } } } }
            }
        },
        getArrivals: {
            method: 'GET',
            path: '/stops/:stopId/arrivals',
            description: 'Get real-time arrivals at a VBB stop/station. Returns scheduled and actual arrival times, origin, platform, delay, and line information.',
            parameters: [
                { position: { key: 'stopId', value: '{{STOP_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'duration', value: '{{DURATION}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)'] } },
                { position: { key: 'results', value: '{{RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(50)'] } }
            ],
            tests: [
                { _description: 'Get arrivals at Alexanderplatz', stopId: '900100003', results: 5 },
                { _description: 'Get arrivals at Hauptbahnhof', stopId: '900003201', results: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { arrivals: { type: 'array', items: { type: 'object', properties: { tripId: { type: 'string' }, stop: { type: 'object' }, when: { type: 'string' }, plannedWhen: { type: 'string' }, delay: { type: 'number' }, platform: { type: 'string' }, provenance: { type: 'string' }, line: { type: 'object', properties: { name: { type: 'string' }, mode: { type: 'string' }, product: { type: 'string' } } } } } } } }
            }
        },
        planJourney: {
            method: 'GET',
            path: '/journeys',
            description: 'Plan a journey between two VBB stops/stations. Returns journey options with legs, transfers, duration, and real-time delay information. Use stop IDs from searchLocations.',
            parameters: [
                { position: { key: 'from', value: '{{FROM_STOP_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'to', value: '{{TO_STOP_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'results', value: '{{RESULTS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(3)', 'min(1)', 'max(10)'] } },
                { position: { key: 'transfers', value: '{{MAX_TRANSFERS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'suburban', value: '{{SUBURBAN}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'subway', value: '{{SUBWAY}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'tram', value: '{{TRAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'bus', value: '{{BUS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(true)'] } }
            ],
            tests: [
                { _description: 'Plan journey Alexanderplatz to Zoo', from: '900100003', to: '900023201', results: 2 },
                { _description: 'Plan U-Bahn only journey', from: '900100003', to: '900078101', subway: true, suburban: false, tram: false, bus: false, results: 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { journeys: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, legs: { type: 'array', items: { type: 'object', properties: { origin: { type: 'object' }, destination: { type: 'object' }, departure: { type: 'string' }, arrival: { type: 'string' }, line: { type: 'object' }, direction: { type: 'string' } } } } } } } } }
            }
        }
    }
}
