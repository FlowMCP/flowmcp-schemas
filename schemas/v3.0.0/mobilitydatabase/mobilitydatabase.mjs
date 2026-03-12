// Schema for #236 — MobilityData Feed API (GTFS/GBFS catalog)

export const main = {
    namespace: 'mobilitydatabase',
    name: 'Mobility Database',
    description: 'Global catalog of 6,000+ public transit data feeds (GTFS, GTFS-RT, GBFS) from 75+ countries. Search feeds by location, provider, or country. Requires free API token from mobilitydatabase.org.',
    version: '3.0.0',
    docs: ['https://mobilitydata.github.io/mobility-feed-api/SwaggerUI/index.html', 'https://github.com/MobilityData/mobility-feed-api'],
    tags: ['transport', 'transit', 'gtfs', 'geospatial', 'catalog', 'cacheTtlDaily'],
    root: 'https://api.mobilitydatabase.org/v1',
    requiredServerParams: ['MOBILITY_DB_TOKEN'],
    headers: {
        'Authorization': 'Bearer {{MOBILITY_DB_TOKEN}}'
    },
    tools: {
        searchFeeds: {
            method: 'GET',
            path: '/search',
            description: 'Full-text search across all feeds by name, provider, or location. Supports filtering by data type (GTFS, GTFS-RT, GBFS), status, and official designation.',
            parameters: [
                { position: { key: 'search_query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'data_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(gtfs,gtfs_rt,gbfs)', options: ['optional()'] } },
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(active,deprecated,inactive,development,future)', options: ['optional()'] } },
                { position: { key: 'is_official', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(3500)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for Berlin transit feeds', search_query: 'Berlin', data_type: 'gtfs', limit: 5 },
                { _description: 'Search for active GBFS feeds', search_query: 'bike', data_type: 'gbfs', status: 'active', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'array', items: { type: 'object' } },
                        total: { type: 'number' }
                    }
                }
            }
        },
        listGtfsFeeds: {
            method: 'GET',
            path: '/gtfs_feeds',
            description: 'List GTFS (schedule) feeds from the catalog. Filter by country, subdivision, municipality, provider, or geographic bounding box.',
            parameters: [
                { position: { key: 'country_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'subdivision_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'municipality', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'is_official', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(2500)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'GTFS feeds from Germany', country_code: 'DE', limit: 5 },
                { _description: 'Official GTFS feeds from France', country_code: 'FR', is_official: true, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            provider: { type: 'string' },
                            feed_name: { type: 'string' },
                            status: { type: 'string' },
                            locations: { type: 'array' },
                            latest_dataset: { type: 'object' }
                        }
                    }
                }
            }
        },
        getGtfsFeed: {
            method: 'GET',
            path: '/gtfs_feeds/{{FEED_ID}}',
            description: 'Get detailed information for a specific GTFS feed including provider, locations, latest dataset, and validation reports.',
            parameters: [
                { position: { key: 'FEED_ID', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific GTFS feed', FEED_ID: 'mdb-10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        provider: { type: 'string' },
                        feed_name: { type: 'string' },
                        status: { type: 'string' },
                        locations: { type: 'array' },
                        latest_dataset: { type: 'object' },
                        source_info: { type: 'object' }
                    }
                }
            }
        },
        listGtfsRtFeeds: {
            method: 'GET',
            path: '/gtfs_rt_feeds',
            description: 'List GTFS Realtime feeds providing live vehicle positions, trip updates, or service alerts. Filter by country, entity type, or provider.',
            parameters: [
                { position: { key: 'country_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'entity_types', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(vp,tu,sa)', options: ['optional()'] } },
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'is_official', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'GTFS-RT vehicle position feeds from US', country_code: 'US', entity_types: 'vp', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            provider: { type: 'string' },
                            entity_types: { type: 'array' },
                            status: { type: 'string' },
                            locations: { type: 'array' }
                        }
                    }
                }
            }
        },
        listGbfsFeeds: {
            method: 'GET',
            path: '/gbfs_feeds',
            description: 'List GBFS (bike/scooter sharing) feeds. Filter by country, city, system ID, or version.',
            parameters: [
                { position: { key: 'country_code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'municipality', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'provider', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'system_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(500)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'GBFS feeds from Germany', country_code: 'DE', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            provider: { type: 'string' },
                            system_id: { type: 'string' },
                            status: { type: 'string' },
                            locations: { type: 'array' }
                        }
                    }
                }
            }
        },
        getMetadata: {
            method: 'GET',
            path: '/metadata',
            description: 'Get API metadata including version information and available features.',
            parameters: [],
            tests: [
                { _description: 'Get API metadata' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        version: { type: 'string' }
                    }
                }
            }
        }
    }
}
