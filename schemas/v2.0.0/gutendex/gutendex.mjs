export const main = {
    namespace: 'gutendex',
    name: 'Gutendex',
    description: 'Browse and search the Project Gutenberg catalog of 70,000+ free ebooks with filtering by author, language, subject, and download popularity.',
    version: '2.0.0',
    docs: ['https://gutendex.com/'],
    tags: ['books', 'ebooks', 'literature', 'gutenberg', 'cacheTtlDaily'],
    root: 'https://gutendex.com',
    requiredServerParams: [],
    headers: {},
    routes: {
        listBooks: {
            method: 'GET',
            path: '/books',
            description: 'List books from the Project Gutenberg catalog with optional filtering. Returns paginated results sorted by download popularity by default.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'topic', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'languages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(popular,ascending,descending)', options: ['optional()', 'default(popular)'] } },
                { position: { key: 'copyright', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List most downloaded books', sort: 'popular' },
                { _description: 'Search for books by Shakespeare', search: 'shakespeare' },
                { _description: 'List books in German language', languages: 'de' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number', description: 'Total number of matching books' },
                        next: { type: 'string', description: 'URL for next page of results (null if last page)' },
                        previous: { type: 'string', description: 'URL for previous page of results (null if first page)' },
                        results: {
                            type: 'array',
                            description: 'Array of book objects (up to 32 per page)',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number', description: 'Project Gutenberg book ID' },
                                    title: { type: 'string' },
                                    subjects: { type: 'array', items: { type: 'string' } },
                                    authors: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                name: { type: 'string' },
                                                birth_year: { type: 'number' },
                                                death_year: { type: 'number' }
                                            }
                                        }
                                    },
                                    translators: { type: 'array', items: { type: 'object' } },
                                    bookshelves: { type: 'array', items: { type: 'string' } },
                                    languages: { type: 'array', items: { type: 'string' } },
                                    copyright: { type: 'boolean', description: 'Copyright status (null = unknown)' },
                                    media_type: { type: 'string' },
                                    formats: { type: 'object', description: 'MIME type to URL mapping for download formats' },
                                    download_count: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getBookById: {
            method: 'GET',
            path: '/books/:id',
            description: 'Retrieve a specific book by its Project Gutenberg ID number. Returns full metadata including all available download formats.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Pride and Prejudice (ID 1342)', id: 1342 },
                { _description: 'Get Adventures of Huckleberry Finn (ID 76)', id: 76 },
                { _description: 'Get Moby Dick (ID 2701)', id: 2701 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        subjects: { type: 'array', items: { type: 'string' } },
                        authors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    birth_year: { type: 'number' },
                                    death_year: { type: 'number' }
                                }
                            }
                        },
                        summaries: { type: 'array', items: { type: 'string' } },
                        translators: { type: 'array', items: { type: 'object' } },
                        bookshelves: { type: 'array', items: { type: 'string' } },
                        languages: { type: 'array', items: { type: 'string' } },
                        copyright: { type: 'boolean' },
                        media_type: { type: 'string' },
                        formats: {
                            type: 'object',
                            description: 'Available download formats mapped by MIME type',
                            additionalProperties: { type: 'string', description: 'Download URL' }
                        },
                        download_count: { type: 'number' }
                    }
                }
            }
        },
        searchByTopic: {
            method: 'GET',
            path: '/books',
            description: 'Search books by subject or bookshelf topic. Case-insensitive search across both subjects and bookshelves.',
            parameters: [
                { position: { key: 'topic', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'languages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(popular,ascending,descending)', options: ['optional()', 'default(popular)'] } }
            ],
            tests: [
                { _description: 'Search books on detective fiction topic', topic: 'detective fiction' },
                { _description: 'Search books on science fiction in English', topic: 'science fiction', languages: 'en' },
                { _description: 'Search books on philosophy', topic: 'philosophy', sort: 'popular' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        next: { type: 'string' },
                        previous: { type: 'string' },
                        results: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        searchByAuthorLifespan: {
            method: 'GET',
            path: '/books',
            description: 'Filter books by the birth/death years of their authors. Useful for finding works by authors from a specific historical period.',
            parameters: [
                { position: { key: 'author_year_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'author_year_end', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'languages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(popular,ascending,descending)', options: ['optional()', 'default(popular)'] } }
            ],
            tests: [
                { _description: 'Books by authors born in the 1800s', author_year_start: 1800, author_year_end: 1900 },
                { _description: 'Books by Victorian-era authors in English', author_year_start: 1837, author_year_end: 1901, languages: 'en' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        next: { type: 'string' },
                        previous: { type: 'string' },
                        results: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        getBooksByIds: {
            method: 'GET',
            path: '/books',
            description: 'Retrieve multiple specific books by their Project Gutenberg ID numbers in a single request.',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Pride and Prejudice, Moby Dick, and Huck Finn', ids: '1342,2701,76' },
                { _description: 'Get specific classic books by ID', ids: '84,11,98' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        next: { type: 'string' },
                        previous: { type: 'string' },
                        results: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        }
    }
}
