export const main = {
    namespace: 'emsc',
    name: 'EMSC Seismic Portal',
    description: 'Query the European-Mediterranean Seismological Centre earthquake catalog via the FDSN web service. Search events by magnitude, location, depth, and time range.',
    version: '2.0.0',
    docs: ['https://www.seismicportal.eu/fdsn-wsevent.html', 'https://www.seismicportal.eu/webservices.html'],
    tags: ['earthquake', 'seismology', 'geology', 'hazards', 'cacheTtlFrequent'],
    root: 'https://www.seismicportal.eu',
    requiredServerParams: [],
    headers: {},
    routes: {
        queryEvents: {
            method: 'GET',
            path: '/fdsnws/event/1/query',
            description: 'Search earthquake events with filters for magnitude, location, depth, and time range. Returns event data in JSON, text, or QuakeML format.',
            parameters: [
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(12000)'] } },
                { position: { key: 'minmag', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'maxmag', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'minlat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'maxlat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get last 10 earthquakes above magnitude 5', limit: 10, minmag: 5 },
                { _description: 'Get earthquakes in Mediterranean region in 2024', minlat: 30, maxlat: 46, start: '2024-01-01', end: '2024-12-31', minmag: 4, limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { type: { type: 'string' }, features: { type: 'array', items: { type: 'object', properties: { type: { type: 'string' }, id: { type: 'string' }, geometry: { type: 'object' }, properties: { type: 'object' } } } } } }
            },
        },
        getEventById: {
            method: 'GET',
            path: '/fdsnws/event/1/query',
            description: 'Get a specific earthquake event by its EMSC event ID.',
            parameters: [
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'eventid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get specific earthquake event', eventid: '20190330_0000065' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { type: { type: 'string' }, features: { type: 'array' } } }
            },
        }
    }
}
