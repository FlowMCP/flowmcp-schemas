export const main = {
    namespace: 'discogs',
    name: 'Discogs',
    description: 'Search and browse the Discogs music database with 19M+ releases, 9.9M+ artists, and 2.2M+ labels. Get detailed release, artist, and label information.',
    version: '2.0.0',
    docs: ['https://www.discogs.com/developers'],
    tags: ['music', 'releases', 'artists', 'vinyl', 'database', 'cacheTtlDaily'],
    root: 'https://api.discogs.com',
    requiredServerParams: [],
    headers: {
        'User-Agent': 'FlowMCP/1.0'
    },
    routes: {
        search: {
            method: 'GET',
            path: '/database/search',
            description: 'Search the Discogs database for releases, artists, and labels. Supports filtering by type, title, artist, and more.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(release,master,artist,label)', options: ['optional()'] } },
                { position: { key: 'genre', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'style', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for Nirvana artists', q: 'Nirvana', type: 'artist', per_page: 5, page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object', properties: { page: { type: 'number' }, pages: { type: 'number' }, per_page: { type: 'number' }, items: { type: 'number' } } },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, type: { type: 'string' }, title: { type: 'string' }, uri: { type: 'string' }, resource_url: { type: 'string' } } } }
                    }
                }
            },
        },
        getRelease: {
            method: 'GET',
            path: '/releases/:releaseId',
            description: 'Get detailed information for a specific release including tracklist, artists, labels, formats, and community statistics.',
            parameters: [
                { position: { key: 'releaseId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Rick Astley - Never Gonna Give You Up (release 249504)', releaseId: 249504 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        year: { type: 'number' },
                        status: { type: 'string' },
                        artists: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, id: { type: 'number' } } } },
                        labels: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, catno: { type: 'string' } } } },
                        genres: { type: 'array' },
                        styles: { type: 'array' },
                        tracklist: { type: 'array', items: { type: 'object', properties: { position: { type: 'string' }, title: { type: 'string' }, duration: { type: 'string' } } } }
                    }
                }
            },
        },
        getMasterRelease: {
            method: 'GET',
            path: '/masters/:masterId',
            description: 'Get the master release which groups all versions of a release. Returns main release ID, tracklist, and version count.',
            parameters: [
                { position: { key: 'masterId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get master release for Never Gonna Give You Up (master 96559)', masterId: 96559 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        main_release: { type: 'number' },
                        most_recent_release: { type: 'number' },
                        num_for_sale: { type: 'number' },
                        lowest_price: { type: 'number' },
                        year: { type: 'number' },
                        artists: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, id: { type: 'number' } } } },
                        genres: { type: 'array' },
                        styles: { type: 'array' },
                        tracklist: { type: 'array', items: { type: 'object', properties: { position: { type: 'string' }, title: { type: 'string' }, duration: { type: 'string' } } } }
                    }
                }
            },
        },
        getArtist: {
            method: 'GET',
            path: '/artists/:artistId',
            description: 'Get detailed information for a specific artist including profile, name variations, URLs, and images.',
            parameters: [
                { position: { key: 'artistId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get artist Nickelback (ID 108713)', artistId: 108713 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        profile: { type: 'string' },
                        uri: { type: 'string' },
                        releases_url: { type: 'string' },
                        namevariations: { type: 'array' },
                        urls: { type: 'array' },
                        members: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, active: { type: 'boolean' } } } }
                    }
                }
            },
        },
        getArtistReleases: {
            method: 'GET',
            path: '/artists/:artistId/releases',
            description: 'Get a paginated list of releases by a specific artist. Includes masters, releases, and appearances.',
            parameters: [
                { position: { key: 'artistId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(year,title,format)', options: ['optional()', 'default(year)'] } },
                { position: { key: 'sort_order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()', 'default(asc)'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get Nickelback releases sorted by year', artistId: 108713, sort: 'year', sort_order: 'desc', per_page: 5, page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        pagination: { type: 'object', properties: { page: { type: 'number' }, pages: { type: 'number' }, per_page: { type: 'number' }, items: { type: 'number' } } },
                        releases: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, type: { type: 'string' }, year: { type: 'number' }, artist: { type: 'string' }, role: { type: 'string' }, resource_url: { type: 'string' } } } }
                    }
                }
            },
        },
        getLabel: {
            method: 'GET',
            path: '/labels/:labelId',
            description: 'Get detailed information for a specific record label including profile, contact info, and sub-labels.',
            parameters: [
                { position: { key: 'labelId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get label Planet E (ID 1)', labelId: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        profile: { type: 'string' },
                        uri: { type: 'string' },
                        releases_url: { type: 'string' },
                        contact_info: { type: 'string' },
                        sublabels: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' } } } },
                        urls: { type: 'array' }
                    }
                }
            },
        }
    }
}
