export const main = {
    namespace: 'internetarchive',
    name: 'Internet Archive',
    description: 'Search and access 40M+ items in the Internet Archive digital library. Search across books, audio, video, software, and web pages. Retrieve full item metadata, file listings, and view statistics.',
    version: '2.0.0',
    docs: ['https://archive.org/developers/', 'https://archive.org/developers/md-read.html'],
    tags: ['archive', 'library', 'books', 'media', 'search', 'opendata', 'cacheTtlDaily'],
    root: 'https://archive.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchItems: {
            method: 'GET',
            path: '/advancedsearch.php',
            description: 'Search the Internet Archive catalog with full-text queries. Supports Lucene query syntax with field filters like collection, mediatype, creator, date. Returns matching items with selected metadata fields.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fl[]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(identifier,title,description,mediatype,date,creator)'] } },
                { position: { key: 'rows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'sort[]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for open source texts', q: 'collection:opensource AND mediatype:texts', rows: 3 },
                { _description: 'Search for NASA audio recordings', q: 'creator:NASA AND mediatype:audio', rows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        responseHeader: {
                            type: 'object',
                            properties: {
                                status: { type: 'number' },
                                QTime: { type: 'number' }
                            }
                        },
                        response: {
                            type: 'object',
                            properties: {
                                numFound: { type: 'number' },
                                start: { type: 'number' },
                                docs: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            },
        },
        getMetadata: {
            method: 'GET',
            path: '/metadata/:identifier',
            description: 'Retrieve the complete metadata record for an Internet Archive item by its unique identifier. Returns item metadata, file listings with checksums, server information, and file count.',
            parameters: [
                { position: { key: 'identifier', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get metadata for the Prelinger Archives', identifier: 'prelinger' },
                { _description: 'Get metadata for a public domain book', identifier: 'adventuresofali00craigoog' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        created: { type: 'number' },
                        d1: { type: 'string' },
                        d2: { type: 'string' },
                        dir: { type: 'string' },
                        files: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, format: { type: 'string' }, size: { type: 'string' }, md5: { type: 'string' } } } },
                        files_count: { type: 'number' },
                        item_last_updated: { type: 'number' },
                        item_size: { type: 'number' },
                        metadata: { type: 'object' },
                        server: { type: 'string' },
                        uniq: { type: 'number' }
                    }
                }
            },
        },
        getMetadataField: {
            method: 'GET',
            path: '/metadata/:identifier/:field',
            description: 'Retrieve a specific metadata field for an Internet Archive item. Use to fetch only the metadata, files, or other top-level fields without downloading the full record.',
            parameters: [
                { position: { key: 'identifier', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'field', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(metadata,files,files_count,item_size,item_last_updated,created,server,dir)', options: [] } }
            ],
            tests: [
                { _description: 'Get only file listings for an item', identifier: 'prelinger', field: 'files' },
                { _description: 'Get only metadata for an item', identifier: 'prelinger', field: 'metadata' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'object' }
                    }
                }
            },
        },
        getFilesSlice: {
            method: 'GET',
            path: '/metadata/:identifier/files',
            description: 'Retrieve a paginated slice of the file listing for an Internet Archive item. Useful for items with many files where you need to page through the list.',
            parameters: [
                { position: { key: 'identifier', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get first 5 files of an item', identifier: 'prelinger', start: 0, count: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, format: { type: 'string' }, size: { type: 'string' } } } }
                    }
                }
            },
        },
        checkAvailability: {
            method: 'GET',
            path: '/wayback/available',
            description: 'Check if a URL has been archived in the Wayback Machine. Returns the closest available snapshot with its archive URL and timestamp. Quick availability check without full CDX query.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'timestamp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Check if example.com is archived', url: 'example.com' },
                { _description: 'Check archive near specific date', url: 'google.com', timestamp: '20100101' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        url: { type: 'string' },
                        archived_snapshots: {
                            type: 'object',
                            properties: {
                                closest: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string' },
                                        available: { type: 'boolean' },
                                        url: { type: 'string' },
                                        timestamp: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    }
}
