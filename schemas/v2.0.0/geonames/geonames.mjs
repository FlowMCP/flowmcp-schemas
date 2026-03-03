export const main = {
    namespace: 'geonames',
    name: 'GeoNames',
    description: 'Access 11M+ geographic names, postal codes, elevations, and timezone data. Search places, reverse geocode coordinates, and retrieve country information.',
    version: '2.0.0',
    docs: ['https://www.geonames.org/export/web-services.html'],
    tags: ['geography', 'geocoding', 'places', 'postalcodes', 'timezone', 'elevation', 'cacheTtlDaily'],
    root: 'https://secure.geonames.org',
    requiredServerParams: ['GEONAMES_USERNAME'],
    headers: {},
    routes: {
        search: {
            method: 'GET',
            path: '/searchJSON',
            description: 'Full text search over all GeoNames attributes including place name, country name, and admin codes. Returns matching places with coordinates and metadata.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'name_equals', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'featureClass', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(A,H,L,P,R,S,T,U,V)', options: ['optional()'] } },
                { position: { key: 'featureCode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'style', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(SHORT,MEDIUM,LONG,FULL)', options: ['optional()', 'default(MEDIUM)'] } },
                { position: { key: 'maxRows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'startRow', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'orderby', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(population,elevation,relevance)', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for Berlin', q: 'Berlin', maxRows: 5 },
                { _description: 'Search for cities in Japan', q: 'Tokyo', country: 'JP', maxRows: 3 },
                { _description: 'Search for mountains in Switzerland', q: 'Matterhorn', country: 'CH', featureClass: 'T', maxRows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalResultsCount: { type: 'number' },
                        geonames: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    geonameId: { type: 'number' },
                                    name: { type: 'string' },
                                    toponymName: { type: 'string' },
                                    lat: { type: 'string' },
                                    lng: { type: 'string' },
                                    countryCode: { type: 'string' },
                                    countryName: { type: 'string' },
                                    population: { type: 'number' },
                                    fcl: { type: 'string' },
                                    fcode: { type: 'string' },
                                    adminName1: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        get: {
            method: 'GET',
            path: '/getJSON',
            description: 'Retrieve detailed attributes for a specific geographic feature by its GeoNames ID.',
            parameters: [
                { position: { key: 'geonameId', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'style', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(SHORT,MEDIUM,LONG,FULL)', options: ['optional()', 'default(MEDIUM)'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get details for Berlin (geonameId 2950159)', geonameId: 2950159 },
                { _description: 'Get details for Tokyo with full style', geonameId: 1850147, style: 'FULL' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        geonameId: { type: 'number' },
                        name: { type: 'string' },
                        toponymName: { type: 'string' },
                        lat: { type: 'string' },
                        lng: { type: 'string' },
                        countryCode: { type: 'string' },
                        countryName: { type: 'string' },
                        population: { type: 'number' },
                        elevation: { type: 'number' },
                        fcl: { type: 'string' },
                        fcode: { type: 'string' },
                        adminName1: { type: 'string' },
                        adminCode1: { type: 'string' },
                        timezone: {
                            type: 'object',
                            properties: {
                                gmtOffset: { type: 'number' },
                                timeZoneId: { type: 'string' },
                                dstOffset: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        postalCodeSearch: {
            method: 'GET',
            path: '/postalCodeSearchJSON',
            description: 'Search for postal codes and associated places by postal code or location name.',
            parameters: [
                { position: { key: 'postalcode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'placename', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'maxRows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'style', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(SHORT,MEDIUM,LONG,FULL)', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for postal code 10115 in Germany', postalcode: '10115', country: 'DE', maxRows: 5 },
                { _description: 'Search for postal codes in Zurich', placename: 'Zurich', country: 'CH', maxRows: 5 },
                { _description: 'Search for US postal code 90210', postalcode: '90210', country: 'US', maxRows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        postalCodes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    postalCode: { type: 'string' },
                                    placeName: { type: 'string' },
                                    countryCode: { type: 'string' },
                                    lat: { type: 'number' },
                                    lng: { type: 'number' },
                                    adminName1: { type: 'string' },
                                    adminCode1: { type: 'string' },
                                    adminName2: { type: 'string' },
                                    adminCode2: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        countryInfo: {
            method: 'GET',
            path: '/countryInfoJSON',
            description: 'Get country information including capital, population, area, bounding box, languages, and currency.',
            parameters: [
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get info for Germany', country: 'DE' },
                { _description: 'Get info for Japan in English', country: 'JP', lang: 'en' },
                { _description: 'Get info for all countries (no filter)', lang: 'en' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        geonames: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    countryCode: { type: 'string' },
                                    countryName: { type: 'string' },
                                    capital: { type: 'string' },
                                    population: { type: 'string' },
                                    areaInSqKm: { type: 'string' },
                                    continent: { type: 'string' },
                                    currencyCode: { type: 'string' },
                                    languages: { type: 'string' },
                                    isoAlpha3: { type: 'string' },
                                    geonameId: { type: 'number' },
                                    north: { type: 'number' },
                                    south: { type: 'number' },
                                    east: { type: 'number' },
                                    west: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        },
        timezone: {
            method: 'GET',
            path: '/timezoneJSON',
            description: 'Get timezone information for coordinates including current time, sunrise/sunset, and GMT offset.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Timezone for Berlin coordinates', lat: 52.52, lng: 13.405 },
                { _description: 'Timezone for New York coordinates', lat: 40.7128, lng: -74.006 },
                { _description: 'Timezone for Tokyo coordinates', lat: 35.6762, lng: 139.6503 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        countryCode: { type: 'string' },
                        countryName: { type: 'string' },
                        timezoneId: { type: 'string' },
                        time: { type: 'string' },
                        sunrise: { type: 'string' },
                        sunset: { type: 'string' },
                        rawOffset: { type: 'number' },
                        gmtOffset: { type: 'number' },
                        dstOffset: { type: 'number' },
                        lat: { type: 'number' },
                        lng: { type: 'number' }
                    }
                }
            }
        },
        findNearbyPlaceName: {
            method: 'GET',
            path: '/findNearbyPlaceNameJSON',
            description: 'Find the closest populated place for given coordinates. Reverse geocoding for place names.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'maxRows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)'] } },
                { position: { key: 'lang', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'style', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(SHORT,MEDIUM,LONG,FULL)', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Find places near Eiffel Tower', lat: 48.8584, lng: 2.2945, maxRows: 3 },
                { _description: 'Find places near Times Square', lat: 40.758, lng: -73.9855, maxRows: 3 },
                { _description: 'Find places near Sydney Opera House', lat: -33.8568, lng: 151.2153, maxRows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        geonames: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    geonameId: { type: 'number' },
                                    name: { type: 'string' },
                                    toponymName: { type: 'string' },
                                    lat: { type: 'string' },
                                    lng: { type: 'string' },
                                    countryCode: { type: 'string' },
                                    countryName: { type: 'string' },
                                    distance: { type: 'string' },
                                    fcl: { type: 'string' },
                                    fcode: { type: 'string' },
                                    adminName1: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        elevation: {
            method: 'GET',
            path: '/srtm3JSON',
            description: 'Get elevation data (SRTM3, ~90m resolution) for given coordinates. Returns elevation in meters.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Elevation at Mount Everest base', lat: 27.9881, lng: 86.925 },
                { _description: 'Elevation at Death Valley', lat: 36.2326, lng: -116.8168 },
                { _description: 'Elevation at Berlin', lat: 52.52, lng: 13.405 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        srtm3: { type: 'number' },
                        lat: { type: 'number' },
                        lng: { type: 'number' }
                    }
                }
            }
        },
        weather: {
            method: 'GET',
            path: '/findNearByWeatherJSON',
            description: 'Find the nearest weather station and its most recent weather observation for given coordinates.',
            parameters: [
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'username', value: '{{SERVER_PARAM:GEONAMES_USERNAME}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Weather near Berlin', lat: 52.52, lng: 13.405 },
                { _description: 'Weather near London', lat: 51.5074, lng: -0.1278 },
                { _description: 'Weather near Tokyo', lat: 35.6762, lng: 139.6503 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        weatherObservation: {
                            type: 'object',
                            properties: {
                                observation: { type: 'string' },
                                ICAO: { type: 'string' },
                                stationName: { type: 'string' },
                                temperature: { type: 'string' },
                                humidity: { type: 'number' },
                                windSpeed: { type: 'string' },
                                windDirection: { type: 'number' },
                                clouds: { type: 'string' },
                                cloudsCode: { type: 'string' },
                                weatherCondition: { type: 'string' },
                                hectoPascAltimeter: { type: 'number' },
                                datetime: { type: 'string' },
                                lat: { type: 'number' },
                                lng: { type: 'number' },
                                countryCode: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
}
