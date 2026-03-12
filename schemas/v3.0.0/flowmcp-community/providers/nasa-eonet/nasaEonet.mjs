export const main = {
    namespace: 'nasaeonet',
    name: 'NASA EONET',
    description: 'NASA Earth Observatory Natural Event Tracker (EONET). Tracks natural events worldwide including wildfires, severe storms, volcanoes, earthquakes, floods, sea ice, and more. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://eonet.gsfc.nasa.gov/docs/v3'],
    tags: ['nasa', 'environment', 'disasters', 'geospatial', 'cacheTtlFrequent'],
    root: 'https://eonet.gsfc.nasa.gov/api/v3',
    requiredServerParams: [],
    headers: {},
    tools: {
        getEvents: {
            method: 'GET',
            path: '/events',
            description: 'Get natural events worldwide. Filter by status (open/closed), category, date range, source, and limit. Returns event geometry (points/polygons) and metadata.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'status', value: '{{STATUS}}', location: 'query' }, z: { primitive: 'enum(open,closed)', options: ['optional()'] } },
                { position: { key: 'category', value: '{{CATEGORY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'source', value: '{{SOURCE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'days', value: '{{DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get 5 currently open events', LIMIT: '5', STATUS: 'open' },
                { _description: 'Get wildfire events from last 7 days', CATEGORY: 'wildfires', DAYS: '7', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        events: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    categories: { type: 'array', items: { type: 'object' } },
                                    sources: { type: 'array', items: { type: 'object' } },
                                    geometry: { type: 'array', items: { type: 'object' } }
                                }
                            }
                        }
                    }
                }
            }
        },
        getEventById: {
            method: 'GET',
            path: '/events/:eventId',
            description: 'Get a single natural event by its EONET ID. Returns full event details including all geometry points over time, categories, and source references.',
            parameters: [
                { position: { key: 'eventId', value: '{{EVENT_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific wildfire event', EVENT_ID: 'EONET_6690' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        categories: { type: 'array', items: { type: 'object' } },
                        sources: { type: 'array', items: { type: 'object' } },
                        geometry: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getCategories: {
            method: 'GET',
            path: '/categories',
            description: 'List all available EONET event categories (e.g., wildfires, severe storms, volcanoes, earthquakes, floods, sea/lake ice, drought).',
            parameters: [],
            tests: [
                { _description: 'List all event categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getEventsByCategory: {
            method: 'GET',
            path: '/categories/:categoryId',
            description: 'Get all events for a specific category (e.g., wildfires, severeStorms, volcanoes). Supports the same filters as the main events endpoint.',
            parameters: [
                { position: { key: 'categoryId', value: '{{CATEGORY_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'status', value: '{{STATUS}}', location: 'query' }, z: { primitive: 'enum(open,closed)', options: ['optional()'] } },
                { position: { key: 'days', value: '{{DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get recent volcano events', CATEGORY_ID: 'volcanoes', LIMIT: '5' },
                { _description: 'Get severe storms from last 30 days', CATEGORY_ID: 'severeStorms', DAYS: '30', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        events: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getSources: {
            method: 'GET',
            path: '/sources',
            description: 'List all data sources that contribute events to EONET (NASA, USGS, GDACS, NOAA, etc.).',
            parameters: [],
            tests: [
                { _description: 'List all EONET data sources' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        sources: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    source: { type: 'string' },
                                    link: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
