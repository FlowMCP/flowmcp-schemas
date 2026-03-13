export const main = {
    namespace: 'overturemaps',
    name: 'Overture Maps Berlin POIs',
    description: 'Search 155K+ points of interest in Berlin from the Overture Maps Foundation dataset. Restaurants, shops, services, hotels, and more with coordinates, categories, addresses, and contact info. Requires local SQLite database at ~/.flowmcp/data/overture-berlin-pois.db',
    version: '3.0.0',
    docs: ['https://docs.overturemaps.org/'],
    tags: ['berlin', 'pois', 'opendata', 'geospatial'],
    root: 'local://overturemaps',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {
        placesDb: {
            source: 'sqlite',
            lifecycle: 'persistent',
            description: 'Berlin POIs from Overture Maps with 155K+ places. Supports full-text search by name, category filtering, and geographic bounding box queries.',
            database: '~/.flowmcp/data/overture-berlin-pois.db',
            queries: {
                getSchema: {
                    sql: "SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name",
                    description: 'Returns the database schema (table names and CREATE statements).',
                    parameters: [],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', description: 'Table name' },
                                    sql: { type: 'string', description: 'CREATE TABLE statement' }
                                }
                            }
                        }
                    },
                    tests: [
                        { _description: 'Get all table definitions' }
                    ]
                },
                searchPlaces: {
                    sql: "WITH search AS (SELECT ? AS term) SELECT id, name, category, lat, lon, address_freeform, address_locality, address_postcode, phone, website, brand_name FROM places, search WHERE name LIKE '%' || search.term || '%' OR address_locality LIKE '%' || search.term || '%' LIMIT ?",
                    description: 'Search for places by name or locality. 155K+ POIs in Berlin including restaurants, shops, services.',
                    parameters: [
                        { position: { key: 'query', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Search for cafes', query: 'cafe' },
                        { _description: 'Search for Alexanderplatz', query: 'Alexanderplatz', limit: 10 }
                    ]
                },
                getPlacesByCategory: {
                    sql: "SELECT id, name, category, lat, lon, address_freeform, address_locality, address_postcode, phone, website, brand_name FROM places WHERE category = ? LIMIT ?",
                    description: 'Get all places of a specific category (e.g., restaurant, cafe, hotel, bakery, supermarket, doctor, dentist).',
                    parameters: [
                        { position: { key: 'category', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get restaurants', category: 'restaurant', limit: 5 },
                        { _description: 'Get bakeries', category: 'bakery' }
                    ]
                },
                searchNearby: {
                    sql: "WITH center AS (SELECT ? AS lat_min, ? AS lat_max, ? AS lon_min, ? AS lon_max, ? AS clat, ? AS clon) SELECT id, name, category, lat, lon, address_freeform, address_locality, phone, website FROM places, center WHERE lat BETWEEN center.lat_min AND center.lat_max AND lon BETWEEN center.lon_min AND center.lon_max ORDER BY ((lat - center.clat) * (lat - center.clat) + (lon - center.clon) * (lon - center.clon)) ASC LIMIT ?",
                    description: 'Find places near a coordinate by bounding box. Calculate bounds: lat ± radius_km * 0.009, lon ± radius_km * 0.009 / cos(lat). Provide center for distance sorting.',
                    parameters: [
                        { position: { key: 'lat_min', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'lat_max', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'lon_min', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'lon_max', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'center_lat', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'center_lon', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Find places near Brandenburger Tor (500m)', lat_min: 52.511, lat_max: 52.520, lon_min: 13.373, lon_max: 13.383, center_lat: 52.5163, center_lon: 13.3777 }
                    ]
                },
                getCategories: {
                    sql: "SELECT category, COUNT(*) as count FROM places WHERE category IS NOT NULL GROUP BY category ORDER BY count DESC LIMIT ?",
                    description: 'List all available place categories with their count.',
                    parameters: [
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'max(200)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get top 20 categories', limit: 20 }
                    ]
                },
                freeQuery: {
                    sql: '{{DYNAMIC_SQL}}',
                    description: 'Execute a custom read-only SQL query against the Berlin POIs database. Only SELECT statements are allowed. Table: places (id, name, category, lat, lon, address_freeform, address_locality, address_postcode, phone, website, brand_name, confidence, operating_status).',
                    parameters: [
                        { position: { key: 'sql', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(6)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Count all places', sql: 'SELECT COUNT(*) as count FROM places', limit: 1 }
                    ]
                }
            }
        }
    }
}
