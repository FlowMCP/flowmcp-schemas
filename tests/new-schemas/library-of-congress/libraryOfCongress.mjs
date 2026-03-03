export const main = {
    namespace: 'libraryofcongress',
    name: 'Library of Congress',
    description: 'Search and retrieve items from the Library of Congress digital collections — books, photos, maps, manuscripts, audio, and video across 170M+ catalog records.',
    version: '2.0.0',
    docs: ['https://www.loc.gov/apis/json-and-yaml/'],
    tags: ['library', 'books', 'archives', 'government', 'history', 'cacheTtlDaily'],
    root: 'https://www.loc.gov',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchAll: {
            method: 'GET',
            path: '/search/',
            description: 'Search across all Library of Congress digital collections. Returns items, newspapers, photos, manuscripts, maps, and more with faceted filtering.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'fa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sb', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(date,date_desc,title_s,title_s_desc)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for Shakespeare across all collections', q: 'shakespeare', c: 5 },
                { _description: 'Search for civil war photos', q: 'civil war', fa: 'original-format:photo,+print,+drawing', c: 5 },
                { _description: 'Search with date sort', q: 'moon landing', sb: 'date_desc', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: {
                            type: 'object',
                            properties: {
                                current: { type: 'number' },
                                from: { type: 'number' },
                                to: { type: 'number' },
                                of: { type: 'number', description: 'Total items across all pages' },
                                total: { type: 'number', description: 'Total pages available' },
                                perpage: { type: 'number' },
                                next: { type: 'string' },
                                previous: { type: 'string' }
                            }
                        },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    contributor: { type: 'array', items: { type: 'string' } },
                                    subject: { type: 'array', items: { type: 'string' } },
                                    language: { type: 'array', items: { type: 'string' } },
                                    digitized: { type: 'boolean' },
                                    image_url: { type: 'array', items: { type: 'string' } },
                                    location: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        },
                        facets: { type: 'array', description: 'Available facet filters with counts' }
                    }
                }
            }
        },
        searchBooks: {
            method: 'GET',
            path: '/books/',
            description: 'Search specifically within the Library of Congress book collections. Filters results to book-format items only.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'fa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sb', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(date,date_desc,title_s,title_s_desc)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for books about gatsby', q: 'gatsby', c: 5 },
                { _description: 'Search for English language books about astronomy', q: 'astronomy', fa: 'language:english', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    contributor: { type: 'array', items: { type: 'string' } },
                                    subject: { type: 'array', items: { type: 'string' } },
                                    language: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchPhotos: {
            method: 'GET',
            path: '/photos/',
            description: 'Search within the Library of Congress photo, print, and drawing collections. Returns digitized image items with thumbnails.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'fa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for photos of Washington DC', q: 'washington dc', c: 5 },
                { _description: 'Search for historical bridge photos', q: 'bridges', fa: 'location:washington+d.c.', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    image_url: { type: 'array', items: { type: 'string' } },
                                    location: { type: 'array', items: { type: 'string' } },
                                    subject: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchMaps: {
            method: 'GET',
            path: '/maps/',
            description: 'Search within the Library of Congress map collections. Returns digitized maps, atlases, and geographic materials.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'fa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for maps of California', q: 'california', c: 5 },
                { _description: 'Search for Civil War era maps', q: 'civil war', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    image_url: { type: 'array', items: { type: 'string' } },
                                    location: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        }
                    }
                }
            }
        },
        listCollections: {
            method: 'GET',
            path: '/collections/',
            description: 'List all digital collections available at the Library of Congress. Returns collection names, descriptions, item counts, and thumbnails.',
            parameters: [
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'List first 10 collections', c: 10 },
                { _description: 'List collections page 2', c: 10, sp: 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    count: { type: 'number', description: 'Number of items in collection' },
                                    image_url: { type: 'array', items: { type: 'string' } },
                                    digitized: { type: 'boolean' }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchCollection: {
            method: 'GET',
            path: '/collections/:collectionSlug/',
            description: 'Search within a specific Library of Congress collection by its URL slug. Returns items from that collection matching the query.',
            parameters: [
                { position: { key: 'collectionSlug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Browse Abraham Lincoln Papers collection', collectionSlug: 'abraham-lincoln-papers', c: 5 },
                { _description: 'Search within baseball card collection', collectionSlug: 'baseball-cards', q: 'babe ruth', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    image_url: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchNewspapers: {
            method: 'GET',
            path: '/newspapers/',
            description: 'Search the Chronicling America digitized newspaper collection at the Library of Congress. Returns historic newspaper pages and issues.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fo', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'c', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(150)'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'fa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search newspapers for titanic', q: 'titanic', c: 5 },
                { _description: 'Search newspapers about prohibition', q: 'prohibition', c: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object' },
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    date: { type: 'string' },
                                    description: { type: 'array', items: { type: 'string' } },
                                    language: { type: 'array', items: { type: 'string' } },
                                    location: { type: 'array', items: { type: 'string' } }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
