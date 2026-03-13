export const main = {
    namespace: 'gtfsde',
    name: 'GTFS-DE German Public Transit',
    description: 'Search German public transit stops, routes, and agencies from the official GTFS-DE dataset. 680K+ stops, 24K+ routes covering all German public transport. Requires local SQLite database at ~/.flowmcp/data/gtfs-de.db',
    version: '3.0.0',
    docs: ['https://gtfs.de/en/feeds/de_full/'],
    tags: ['germany', 'transit', 'opendata', 'mobility'],
    root: 'local://gtfsde',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {
        transitDb: {
            source: 'sqlite',
            lifecycle: 'persistent',
            description: 'German public transit data with 680K+ stops and 24K+ routes. Supports full-text search for stops and route lookup.',
            database: '~/.flowmcp/data/gtfs-de.db',
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
                searchStops: {
                    sql: "SELECT s.stop_id, s.stop_name, s.stop_lat, s.stop_lon, s.location_type, s.parent_station FROM stops_fts fts JOIN stops s ON s.rowid = fts.rowid WHERE stops_fts MATCH ? LIMIT ?",
                    description: 'Full-text search for public transit stops by name. 680K+ stops including train stations, bus stops, tram stops across Germany.',
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
                        { _description: 'Search for Berlin Hauptbahnhof', query: 'Berlin Hauptbahnhof' },
                        { _description: 'Search for Muenchen stations', query: 'München', limit: 10 }
                    ]
                },
                searchStopsNearby: {
                    sql: "WITH center AS (SELECT ? AS lat_min, ? AS lat_max, ? AS lon_min, ? AS lon_max, ? AS clat, ? AS clon) SELECT stop_id, stop_name, stop_lat, stop_lon, location_type FROM stops, center WHERE stop_lat BETWEEN center.lat_min AND center.lat_max AND stop_lon BETWEEN center.lon_min AND center.lon_max AND location_type = 1 ORDER BY ((stop_lat - center.clat) * (stop_lat - center.clat) + (stop_lon - center.clon) * (stop_lon - center.clon)) ASC LIMIT ?",
                    description: 'Find public transit stops near a geographic coordinate by bounding box. Calculate bounds: lat ± radius_km * 0.009, lon ± radius_km * 0.009 / cos(lat). Provide center lat/lon for distance sorting.',
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
                        { _description: 'Find stops near Berlin Mitte (1km radius)', lat_min: 52.511, lat_max: 52.529, lon_min: 13.395, lon_max: 13.415, center_lat: 52.520, center_lon: 13.405 }
                    ]
                },
                searchRoutes: {
                    sql: "WITH search AS (SELECT ? AS term) SELECT r.route_id, r.route_short_name, r.route_long_name, r.route_type, r.agency_id, a.agency_name FROM routes r LEFT JOIN agency a ON a.agency_id = r.agency_id, search WHERE r.route_short_name LIKE '%' || search.term || '%' OR r.route_long_name LIKE '%' || search.term || '%' LIMIT ?",
                    description: 'Search for transit routes/lines by name or number. 24K+ routes covering all German public transport. Returns route name, type, and agency.',
                    parameters: [
                        { position: { key: 'query', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(1)'] } },
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
                        { _description: 'Search for S-Bahn routes', query: 'S1' },
                        { _description: 'Search for U-Bahn routes', query: 'U', limit: 10 }
                    ]
                },
                getRoutesAtStop: {
                    sql: "WITH target AS (SELECT ? AS sid) SELECT DISTINCT r.route_id, r.route_short_name, r.route_long_name, r.route_type, a.agency_name FROM stop_times st JOIN trips t ON t.trip_id = st.trip_id JOIN routes r ON r.route_id = t.route_id LEFT JOIN agency a ON a.agency_id = r.agency_id WHERE st.stop_id IN (SELECT stop_id FROM stops, target WHERE parent_station = target.sid OR stop_id = target.sid) LIMIT 50",
                    description: 'Get all transit routes serving a specific stop. Returns route names, types, and agencies for all lines at the given station.',
                    parameters: [
                        { position: { key: 'stop_id', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: [] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get routes at a stop', stop_id: '175272' }
                    ]
                },
                freeQuery: {
                    sql: '{{DYNAMIC_SQL}}',
                    description: 'Execute a custom read-only SQL query against the GTFS-DE database. Only SELECT statements are allowed. Tables: stops, routes, trips, stop_times, agency, calendar, calendar_dates.',
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
                        { _description: 'Count all stops', sql: 'SELECT COUNT(*) as count FROM stops', limit: 1 }
                    ]
                }
            }
        }
    }
}
