export const main = {
    namespace: 'familysearch',
    name: 'FamilySearch Places',
    description: 'Query the FamilySearch Places API — search global genealogical place names, resolve jurisdictions, and browse place types for historical and modern locations.',
    version: '2.0.0',
    docs: ['https://www.familysearch.org/developers/docs/api/places/Places_Search_resource', 'https://www.familysearch.org/developers/docs/guides/places'],
    tags: ['genealogy', 'history', 'places', 'geography', 'cacheTtlStatic'],
    root: 'https://api.familysearch.org',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/x-gedcomx-atom+json'
    },
    routes: {
        searchPlaces: {
            method: 'GET',
            path: '/platform/places/search',
            description: 'Search for places by name with optional fuzzy matching, date filtering, and jurisdiction constraints. Returns standardized place descriptions with coordinates and jurisdictional hierarchy.',
            parameters: [
                { position: { key: 'q', value: 'name:{{PLACE_NAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Search for Berlin', PLACE_NAME: 'Berlin' },
                { _description: 'Search for Paris with pagination', PLACE_NAME: 'Paris', count: 5 },
                { _description: 'Search for London', PLACE_NAME: 'London' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'number', description: 'Total number of matching places' },
                        entries: {
                            type: 'array',
                            description: 'Array of matching place entries',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Unique place identifier' },
                                    score: { type: 'number', description: 'Match relevance score (0-100)' },
                                    content: {
                                        type: 'object',
                                        description: 'Place content with GEDCOM-X data',
                                        properties: {
                                            gedcomx: {
                                                type: 'object',
                                                properties: {
                                                    places: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                names: { type: 'array', description: 'Place names in different languages' },
                                                                type: { type: 'string', description: 'Place type URI' },
                                                                latitude: { type: 'number', description: 'Latitude coordinate' },
                                                                longitude: { type: 'number', description: 'Longitude coordinate' },
                                                                jurisdiction: { type: 'object', description: 'Parent jurisdiction hierarchy' }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchPlacesFuzzy: {
            method: 'GET',
            path: '/platform/places/search',
            description: 'Search for places using fuzzy name matching with the ~ operator. Useful for historical place names with variant spellings.',
            parameters: [
                { position: { key: 'q', value: 'name:{{PLACE_NAME}}~', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Fuzzy search for Breslau (historical name for Wroclaw)', PLACE_NAME: 'Breslau' },
                { _description: 'Fuzzy search for Koenigsberg', PLACE_NAME: 'Koenigsberg' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'number', description: 'Total number of fuzzy matches' },
                        entries: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Place identifier' },
                                    score: { type: 'number', description: 'Fuzzy match score' },
                                    content: { type: 'object', description: 'GEDCOM-X place content' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchByJurisdiction: {
            method: 'GET',
            path: '/platform/places/search',
            description: 'Search for places within a specific parent jurisdiction. Use parentId to limit results to a country or administrative region.',
            parameters: [
                { position: { key: 'q', value: 'name:{{PLACE_NAME}} parentId:{{PARENT_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Search for Springfield within a US state', PLACE_NAME: 'Springfield', PARENT_ID: '325' },
                { _description: 'Search for Munich in Germany', PLACE_NAME: 'Munich', PARENT_ID: '155' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'number', description: 'Total number of matches within jurisdiction' },
                        entries: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Place identifier' },
                                    score: { type: 'number', description: 'Match relevance score' },
                                    content: { type: 'object', description: 'GEDCOM-X place content with jurisdiction hierarchy' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchByCoordinates: {
            method: 'GET',
            path: '/platform/places/search',
            description: 'Search for places near geographic coordinates within a given distance in kilometers.',
            parameters: [
                { position: { key: 'q', value: 'latitude:{{LATITUDE}} longitude:{{LONGITUDE}} distance:{{DISTANCE_KM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Search places near Berlin coordinates (25km radius)', LATITUDE: '52.52', LONGITUDE: '13.405', DISTANCE_KM: '25' },
                { _description: 'Search places near Rome (50km radius)', LATITUDE: '41.9028', LONGITUDE: '12.4964', DISTANCE_KM: '50' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'number', description: 'Total matches within radius' },
                        entries: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Place identifier' },
                                    score: { type: 'number', description: 'Match relevance score' },
                                    content: { type: 'object', description: 'GEDCOM-X place content with coordinates' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getPlaceTypes: {
            method: 'GET',
            path: '/platform/places/types',
            description: 'List all available place types used in the FamilySearch places database (country, state, county, city, parish, etc.).',
            parameters: [],
            tests: [
                { _description: 'Get all available place types' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        types: {
                            type: 'array',
                            description: 'Array of place type definitions',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Place type identifier' },
                                    name: { type: 'string', description: 'Place type name' },
                                    description: { type: 'string', description: 'Place type description' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchByTypeAndDate: {
            method: 'GET',
            path: '/platform/places/search',
            description: 'Search for places that existed at a specific historical date. Useful for genealogical research where administrative boundaries changed over time.',
            parameters: [
                { position: { key: 'q', value: 'name:{{PLACE_NAME}} date:{{DATE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Search for Danzig as it existed in 1900', PLACE_NAME: 'Danzig', DATE: '1900' },
                { _description: 'Search for Constantinople in 1400', PLACE_NAME: 'Constantinople', DATE: '1400' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: { type: 'number', description: 'Total matches for historical period' },
                        entries: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Place identifier' },
                                    score: { type: 'number', description: 'Match relevance score' },
                                    content: { type: 'object', description: 'GEDCOM-X place content with temporal context' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
