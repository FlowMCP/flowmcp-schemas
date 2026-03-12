export const main = {
    namespace: 'tmdb',
    name: 'The Movie Database (TMDB)',
    description: 'Search and browse movies, TV shows, and people from The Movie Database with 900K+ movies. Get details, credits, trending, and popular content.',
    version: '3.0.0',
    docs: ['https://developer.themoviedb.org/reference/intro/getting-started'],
    tags: ['movies', 'tv', 'entertainment', 'media', 'cacheTtlDaily'],
    root: 'https://api.themoviedb.org',
    requiredServerParams: ['TMDB_API_KEY'],
    headers: {
        'Authorization': 'Bearer {{TMDB_API_KEY}}'
    },
    tools: {
        searchMovies: {
            method: 'GET',
            path: '/3/search/movie',
            description: 'Search for movies by title. Returns paginated results with poster paths, release dates, ratings, and overviews.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for Inception', query: 'Inception', language: 'en-US', page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        total_results: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, overview: { type: 'string' }, release_date: { type: 'string' }, vote_average: { type: 'number' }, popularity: { type: 'number' }, poster_path: { type: 'string' } } } }
                    }
                }
            },
        },
        searchTvShows: {
            method: 'GET',
            path: '/3/search/tv',
            description: 'Search for TV shows by name. Returns paginated results with first air dates, ratings, and overviews.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search for Breaking Bad', query: 'Breaking Bad', language: 'en-US', page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        total_results: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, overview: { type: 'string' }, first_air_date: { type: 'string' }, vote_average: { type: 'number' }, popularity: { type: 'number' }, poster_path: { type: 'string' } } } }
                    }
                }
            },
        },
        getMovieDetails: {
            method: 'GET',
            path: '/3/movie/:movieId',
            description: 'Get detailed information for a specific movie including genres, runtime, budget, revenue, and production companies.',
            parameters: [
                { position: { key: 'movieId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } }
            ],
            tests: [
                { _description: 'Get details for Inception (ID 27205)', movieId: 27205, language: 'en-US' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        overview: { type: 'string' },
                        release_date: { type: 'string' },
                        runtime: { type: 'number' },
                        vote_average: { type: 'number' },
                        budget: { type: 'number' },
                        revenue: { type: 'number' },
                        genres: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' } } } },
                        poster_path: { type: 'string' },
                        status: { type: 'string' }
                    }
                }
            },
        },
        getMovieCredits: {
            method: 'GET',
            path: '/3/movie/:movieId/credits',
            description: 'Get the cast and crew for a specific movie. Returns actor names, characters, and crew roles.',
            parameters: [
                { position: { key: 'movieId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get credits for Inception (ID 27205)', movieId: 27205 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        cast: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, character: { type: 'string' }, profile_path: { type: 'string' } } } },
                        crew: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, name: { type: 'string' }, job: { type: 'string' }, department: { type: 'string' } } } }
                    }
                }
            },
        },
        getTrendingMovies: {
            method: 'GET',
            path: '/3/trending/movie/:timeWindow',
            description: 'Get the trending movies on TMDB for a given time window (day or week).',
            parameters: [
                { position: { key: 'timeWindow', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(day,week)', options: [] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } }
            ],
            tests: [
                { _description: 'Get trending movies this week', timeWindow: 'week', language: 'en-US' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        total_results: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, overview: { type: 'string' }, release_date: { type: 'string' }, vote_average: { type: 'number' }, popularity: { type: 'number' }, poster_path: { type: 'string' } } } }
                    }
                }
            },
        },
        getPopularMovies: {
            method: 'GET',
            path: '/3/movie/popular',
            description: 'Get a list of movies ordered by popularity. Updated daily.',
            parameters: [
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'region', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get popular movies page 1', language: 'en-US', page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        total_results: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, overview: { type: 'string' }, release_date: { type: 'string' }, vote_average: { type: 'number' }, popularity: { type: 'number' }, poster_path: { type: 'string' } } } }
                    }
                }
            },
        },
        discoverMovies: {
            method: 'GET',
            path: '/3/discover/movie',
            description: 'Discover movies by filters like genre, year, rating, and sort order. Useful for building curated movie lists.',
            parameters: [
                { position: { key: 'sort_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(popularity.asc,popularity.desc,revenue.asc,revenue.desc,primary_release_date.asc,primary_release_date.desc,vote_average.asc,vote_average.desc)', options: ['optional()', 'default(popularity.desc)'] } },
                { position: { key: 'with_genres', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'primary_release_year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'vote_average.gte', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(en-US)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Discover highly rated sci-fi movies from 2023', sort_by: 'vote_average.desc', primary_release_year: 2023, 'vote_average.gte': 7, language: 'en-US', page: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        total_results: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, overview: { type: 'string' }, release_date: { type: 'string' }, vote_average: { type: 'number' }, popularity: { type: 'number' }, genre_ids: { type: 'array' } } } }
                    }
                }
            },
        }
    }
}
