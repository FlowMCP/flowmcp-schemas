export const main = {
    namespace: 'googlebooks',
    name: 'Google Books',
    description: 'Search and retrieve book metadata from the Google Books catalog — millions of volumes with previews, ratings, and purchase info.',
    version: '3.0.0',
    docs: ['https://developers.google.com/books/docs/v1/using'],
    tags: ['books', 'library', 'literature', 'search', 'cacheTtlDaily'],
    root: 'https://www.googleapis.com/books/v1',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchVolumes: {
            method: 'GET',
            path: '/volumes',
            description: 'Search for books by keyword, title, author, publisher, subject, or ISBN. Supports pagination, filtering by availability, and sorting.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'startIndex', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'maxResults', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(40)'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,newest)', options: ['optional()', 'default(relevance)'] } },
                { position: { key: 'printType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(all,books,magazines)', options: ['optional()', 'default(all)'] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(partial,full,free-ebooks,paid-ebooks,ebooks)', options: ['optional()'] } },
                { position: { key: 'langRestrict', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'projection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(full,lite)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for books about machine learning', q: 'machine learning', maxResults: 5 },
                { _description: 'Search by author — Stephen King', q: 'inauthor:Stephen King', maxResults: 5 },
                { _description: 'Search free ebooks about philosophy', q: 'philosophy', filter: 'free-ebooks', maxResults: 5 },
                { _description: 'Search by ISBN', q: 'isbn:9780141439518', maxResults: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string', description: 'Resource type, e.g. books#volumes' },
                        totalItems: { type: 'number', description: 'Total matching results' },
                        items: {
                            type: 'array',
                            description: 'Array of volume resources',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Unique volume identifier' },
                                    selfLink: { type: 'string', description: 'URL to this volume resource' },
                                    volumeInfo: {
                                        type: 'object',
                                        properties: {
                                            title: { type: 'string' },
                                            authors: { type: 'array', items: { type: 'string' } },
                                            publisher: { type: 'string' },
                                            publishedDate: { type: 'string' },
                                            description: { type: 'string' },
                                            pageCount: { type: 'number' },
                                            categories: { type: 'array', items: { type: 'string' } },
                                            averageRating: { type: 'number' },
                                            ratingsCount: { type: 'number' },
                                            language: { type: 'string' },
                                            imageLinks: { type: 'object' },
                                            industryIdentifiers: { type: 'array', items: { type: 'object' } }
                                        }
                                    },
                                    saleInfo: { type: 'object', description: 'Purchase and pricing info' },
                                    accessInfo: { type: 'object', description: 'Viewing permissions and format availability' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getVolume: {
            method: 'GET',
            path: '/volumes/:volumeId',
            description: 'Retrieve detailed metadata for a single volume by its Google Books volume ID. Returns full bibliographic data, sale info, and access details.',
            parameters: [
                { position: { key: 'volumeId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Pride and Prejudice volume', volumeId: 's1gVAAAAYAAJ' },
                { _description: 'Get The Art of War volume', volumeId: '5RjPHgW5RGEC' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string', description: 'Resource type, e.g. books#volume' },
                        id: { type: 'string' },
                        selfLink: { type: 'string' },
                        volumeInfo: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                subtitle: { type: 'string' },
                                authors: { type: 'array', items: { type: 'string' } },
                                publisher: { type: 'string' },
                                publishedDate: { type: 'string' },
                                description: { type: 'string' },
                                pageCount: { type: 'number' },
                                categories: { type: 'array', items: { type: 'string' } },
                                averageRating: { type: 'number' },
                                ratingsCount: { type: 'number' },
                                maturityRating: { type: 'string' },
                                language: { type: 'string' },
                                previewLink: { type: 'string' },
                                infoLink: { type: 'string' },
                                imageLinks: { type: 'object' },
                                industryIdentifiers: { type: 'array', items: { type: 'object' } }
                            }
                        },
                        saleInfo: { type: 'object' },
                        accessInfo: { type: 'object' }
                    }
                }
            }
        },
        searchByTitle: {
            method: 'GET',
            path: '/volumes',
            description: 'Search for books by title keyword using the intitle: prefix. Convenience route for title-specific searches.',
            parameters: [
                { position: { key: 'q', value: 'intitle:{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxResults', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(40)'] } },
                { position: { key: 'langRestrict', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for books titled 1984', q: '1984', maxResults: 5 },
                { _description: 'Search for Dune books', q: 'Dune', maxResults: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        totalItems: { type: 'number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        searchByAuthor: {
            method: 'GET',
            path: '/volumes',
            description: 'Search for books by a specific author using the inauthor: prefix. Convenience route for author-specific searches.',
            parameters: [
                { position: { key: 'q', value: 'inauthor:{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxResults', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(40)'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,newest)', options: ['optional()', 'default(relevance)'] } }
            ],
            tests: [
                { _description: 'Search books by George Orwell', q: 'George Orwell', maxResults: 5 },
                { _description: 'Search books by Tolkien newest first', q: 'Tolkien', maxResults: 5, orderBy: 'newest' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        totalItems: { type: 'number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        searchBySubject: {
            method: 'GET',
            path: '/volumes',
            description: 'Search for books in a specific subject category using the subject: prefix. Useful for topic-based discovery.',
            parameters: [
                { position: { key: 'q', value: 'subject:{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxResults', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(40)'] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(partial,full,free-ebooks,paid-ebooks,ebooks)', options: ['optional()'] } },
                { position: { key: 'orderBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,newest)', options: ['optional()', 'default(relevance)'] } }
            ],
            tests: [
                { _description: 'Search books about science fiction', q: 'science fiction', maxResults: 5 },
                { _description: 'Search free ebooks about history', q: 'history', filter: 'free-ebooks', maxResults: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        totalItems: { type: 'number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        searchByIsbn: {
            method: 'GET',
            path: '/volumes',
            description: 'Look up a book by its ISBN (ISBN-10 or ISBN-13) using the isbn: prefix. Returns the exact edition matching the identifier.',
            parameters: [
                { position: { key: 'q', value: 'isbn:{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up Dune by ISBN-13', q: '9780441013593' },
                { _description: 'Look up Pride and Prejudice by ISBN', q: '9780141439518' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        totalItems: { type: 'number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        listPublicBookshelves: {
            method: 'GET',
            path: '/users/:userId/bookshelves',
            description: 'List all public bookshelves for a specified user. Returns shelf IDs, titles, and volume counts.',
            parameters: [
                { position: { key: 'userId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List bookshelves for a public user', userId: '113126699738747738498' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string', description: 'Resource type, e.g. books#bookshelves' },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    kind: { type: 'string' },
                                    id: { type: 'number' },
                                    title: { type: 'string' },
                                    volumeCount: { type: 'number' },
                                    selfLink: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getBookshelfVolumes: {
            method: 'GET',
            path: '/users/:userId/bookshelves/:shelfId/volumes',
            description: 'List all volumes in a specific public bookshelf. Returns the books a user has added to a particular shelf.',
            parameters: [
                { position: { key: 'userId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'shelfId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get volumes from Favorites shelf', userId: '113126699738747738498', shelfId: '0' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        kind: { type: 'string' },
                        totalItems: { type: 'number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        }
    }
}
