export const main = {
    namespace: 'jikan',
    name: 'Jikan MyAnimeList API',
    description: 'Access anime and manga data from MyAnimeList via the Jikan API. Search 25,000+ anime and 60,000+ manga titles. Get detailed information including synopsis, ratings, episodes, characters, and recommendations. Covers anime, manga, characters, and people. Free, no API key required. Rate limit: 3 requests/second.',
    version: '3.0.0',
    docs: ['https://docs.api.jikan.moe/'],
    tags: ['entertainment', 'anime', 'manga', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.jikan.moe',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchAnime: {
            method: 'GET',
            path: '/v4/anime',
            description: 'Search anime by title, type, status, rating, or genre. Returns detailed anime information including score, episodes, synopsis, and images. Types: tv, movie, ova, special, ona, music.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(tv,movie,ova,special,ona,music)', options: ['optional()'] } },
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(airing,complete,upcoming)', options: ['optional()'] } },
                { position: { key: 'rating', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(g,pg,pg13,r17,r,rx)', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(score,rank,popularity,members,favorites)', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(25)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search Naruto', q: 'naruto', limit: 3 },
                { _description: 'Top rated anime movies', type: 'movie', order_by: 'score', sort: 'desc', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { mal_id: { type: 'number' }, title: { type: 'string' }, title_english: { type: 'string' }, type: { type: 'string' }, episodes: { type: 'number' }, status: { type: 'string' }, score: { type: 'number' }, scored_by: { type: 'number' }, rank: { type: 'number' }, synopsis: { type: 'string' }, year: { type: 'number' }, genres: { type: 'array' }, images: { type: 'object' } } } }, pagination: { type: 'object', properties: { last_visible_page: { type: 'number' }, has_next_page: { type: 'boolean' } } } } }
            }
        },
        getAnime: {
            method: 'GET',
            path: '/v4/anime/:id',
            description: 'Get detailed information about a specific anime by MAL ID. Returns complete metadata including synopsis, score, episodes, studios, producers, and streaming platforms.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Naruto (MAL 20)', id: 20 },
                { _description: 'Get Spirited Away (MAL 199)', id: 199 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'object', properties: { mal_id: { type: 'number' }, title: { type: 'string' }, title_english: { type: 'string' }, type: { type: 'string' }, episodes: { type: 'number' }, status: { type: 'string' }, score: { type: 'number' }, rank: { type: 'number' }, popularity: { type: 'number' }, synopsis: { type: 'string' }, studios: { type: 'array' }, genres: { type: 'array' }, themes: { type: 'array' }, streaming: { type: 'array' }, images: { type: 'object' } } } } }
            }
        },
        searchManga: {
            method: 'GET',
            path: '/v4/manga',
            description: 'Search manga by title, type, status, or genre. Types: manga, novel, lightnovel, oneshot, doujin, manhwa, manhua.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(manga,novel,lightnovel,oneshot,doujin,manhwa,manhua)', options: ['optional()'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(score,rank,popularity,members,favorites)', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(25)'] } }
            ],
            tests: [
                { _description: 'Search One Piece', q: 'one piece', limit: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { mal_id: { type: 'number' }, title: { type: 'string' }, title_english: { type: 'string' }, type: { type: 'string' }, chapters: { type: 'number' }, volumes: { type: 'number' }, status: { type: 'string' }, score: { type: 'number' }, synopsis: { type: 'string' }, genres: { type: 'array' }, images: { type: 'object' } } } }, pagination: { type: 'object' } } }
            }
        },
        getTopAnime: {
            method: 'GET',
            path: '/v4/top/anime',
            description: 'Get top-ranked anime from MyAnimeList. Filter by type and ranking criteria.',
            parameters: [
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(tv,movie,ova,special,ona,music)', options: ['optional()'] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(airing,upcoming,bypopularity,favorite)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(25)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Top 5 anime', limit: 5 },
                { _description: 'Top anime movies', type: 'movie', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { data: { type: 'array', items: { type: 'object', properties: { mal_id: { type: 'number' }, title: { type: 'string' }, score: { type: 'number' }, rank: { type: 'number' }, episodes: { type: 'number' }, type: { type: 'string' }, images: { type: 'object' } } } }, pagination: { type: 'object' } } }
            }
        }
    }
}
