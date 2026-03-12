export const main = {
    namespace: 'nasaeonet',
    name: 'NASA EONET',
    description: 'Track natural events on Earth using NASA Earth Observatory Natural Event Tracker (EONET). Access data on wildfires, severe storms, volcanoes, earthquakes, floods, and other natural events with geographic coordinates and temporal data.',
    version: '2.0.0',
    docs: ['https://eonet.gsfc.nasa.gov/docs/v3'],
    tags: ['nasa', 'natural-events', 'disasters', 'wildfires', 'earthquakes', 'volcanoes', 'storms', 'geospatial', 'cacheTtlDaily'],
    root: 'https://eonet.gsfc.nasa.gov/api/v3',
    requiredServerParams: [],
    headers: {},
    routes: {
        getEvents: {
            method: 'GET',
            path: '/events',
            description: 'Get a list of natural events tracked by EONET. Filter by category, source, status, date range, or bounding box. Returns event metadata with geographic coordinates.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'status', value: '{{STATUS}}', location: 'query' }, z: { primitive: 'enum(open,closed,all)', options: ['optional()', 'default(open)'] } },
                { position: { key: 'category', value: '{{CATEGORY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'source', value: '{{SOURCE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'days', value: '{{DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'bbox', value: '{{BBOX}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get 3 recent open events', limit: 3 },
                { _description: 'Get wildfire events from last 30 days', limit: 5, category: 'wildfires', days: 30 },
                { _description: 'Get closed events', limit: 3, status: 'closed' }
            ]
        },
        getEventsGeoJSON: {
            method: 'GET',
            path: '/events/geojson',
            description: 'Get natural events in GeoJSON format for direct use with mapping libraries. Supports the same filters as the events endpoint.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'status', value: '{{STATUS}}', location: 'query' }, z: { primitive: 'enum(open,closed,all)', options: ['optional()', 'default(open)'] } },
                { position: { key: 'category', value: '{{CATEGORY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'days', value: '{{DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get 3 events as GeoJSON', limit: 3 },
                { _description: 'Get volcano events as GeoJSON', limit: 3, category: 'volcanoes' }
            ]
        },
        getEventById: {
            method: 'GET',
            path: '/events/:eventId',
            description: 'Get detailed information about a specific natural event by its EONET event ID. Returns full event data including all geometry points and temporal data.',
            parameters: [
                { position: { key: 'eventId', value: '{{EVENT_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific wildfire event', eventId: 'EONET_6690' }
            ]
        },
        getCategories: {
            method: 'GET',
            path: '/categories',
            description: 'Get all available event categories (e.g. wildfires, severe storms, volcanoes, earthquakes, floods, sea and lake ice, drought).',
            parameters: [],
            tests: [
                { _description: 'List all event categories' }
            ]
        },
        getCategoryEvents: {
            method: 'GET',
            path: '/categories/:categoryId',
            description: 'Get events filtered by a specific category ID. Supports the same query parameters as the main events endpoint.',
            parameters: [
                { position: { key: 'categoryId', value: '{{CATEGORY_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'status', value: '{{STATUS}}', location: 'query' }, z: { primitive: 'enum(open,closed,all)', options: ['optional()', 'default(open)'] } }
            ],
            tests: [
                { _description: 'Get 3 wildfire events', categoryId: 'wildfires', limit: 3 },
                { _description: 'Get 3 severe storm events', categoryId: 'severeStorms', limit: 3 }
            ]
        },
        getSources: {
            method: 'GET',
            path: '/sources',
            description: 'Get all available event data sources that feed into EONET (e.g. InciWeb, NASA, USGS, GDACS).',
            parameters: [],
            tests: [
                { _description: 'List all event sources' }
            ]
        }
    }
}
