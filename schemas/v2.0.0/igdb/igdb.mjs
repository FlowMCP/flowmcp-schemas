export const main = {
    namespace: 'igdb',
    name: 'IGDB',
    description: 'Internet Game Database with 200K+ video games. Query games, platforms, genres, companies, franchises, and cover art using Apicalypse query syntax via the Twitch/IGDB API v4. Rate limit: 4 requests/second.',
    version: '2.0.0',
    docs: [
        'https://api-docs.igdb.com/',
        'https://api-docs.igdb.com/#endpoints',
        'https://api-docs.igdb.com/#authentication'
    ],
    tags: [
        'games',
        'entertainment',
        'database',
        'platforms',
        'twitch',
        'cacheTtlDaily'
    ],
    root: 'https://api.igdb.com/v4',
    requiredServerParams: ['IGDB_CLIENT_ID', 'IGDB_ACCESS_TOKEN'],
    headers: {
        'Client-ID': '{{SERVER_PARAM:IGDB_CLIENT_ID}}',
        'Authorization': 'Bearer {{SERVER_PARAM:IGDB_ACCESS_TOKEN}}'
    },
    routes: {
        searchGames: {
            method: 'POST',
            path: '/games',
            description: 'Search and query video games. Send Apicalypse query syntax in the body to filter, sort, and select fields like name, rating, platforms, genres, and release dates.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Search for games named Zelda with ratings',
                    body: 'search "Zelda"; fields name,rating,first_release_date,summary,platforms.name; limit 10;'
                },
                {
                    _description: 'Top rated games with high vote count',
                    body: 'fields name,rating,rating_count,summary; where rating_count > 100; sort rating desc; limit 10;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            rating: { type: 'number' },
                            first_release_date: { type: 'number' },
                            summary: { type: 'string' },
                            platforms: { type: 'array' }
                        }
                    }
                }
            }
        },
        searchPlatforms: {
            method: 'POST',
            path: '/platforms',
            description: 'Query gaming platforms including consoles, PC, and mobile devices. Returns name, generation, platform family, and summary.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Get platforms sorted by generation',
                    body: 'fields name,generation,platform_family.name,summary; sort generation desc; limit 20;'
                },
                {
                    _description: 'Search for PlayStation platforms',
                    body: 'search "PlayStation"; fields name,generation,abbreviation; limit 10;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            generation: { type: 'number' },
                            platform_family: { type: 'object' },
                            abbreviation: { type: 'string' },
                            summary: { type: 'string' }
                        }
                    }
                }
            }
        },
        searchCompanies: {
            method: 'POST',
            path: '/companies',
            description: 'Query game companies including developers and publishers. Returns company details, country code, and associated games.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Search for Nintendo company info',
                    body: 'search "Nintendo"; fields name,description,country,developed.name,published.name; limit 5;'
                },
                {
                    _description: 'Search for Valve',
                    body: 'search "Valve"; fields name,description,country,start_date; limit 5;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            country: { type: 'number' },
                            developed: { type: 'array' },
                            published: { type: 'array' }
                        }
                    }
                }
            }
        },
        searchGenres: {
            method: 'POST',
            path: '/genres',
            description: 'Query all available game genres. Returns genre names and URL slugs for use as game filters.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'List all game genres',
                    body: 'fields name,slug; limit 50;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            slug: { type: 'string' }
                        }
                    }
                }
            }
        },
        searchGameEngines: {
            method: 'POST',
            path: '/game_engines',
            description: 'Query game engines like Unreal, Unity, and Godot. Returns engine details and associated development companies.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Search for Unreal Engine',
                    body: 'search "Unreal"; fields name,description,companies.name; limit 5;'
                },
                {
                    _description: 'List game engines',
                    body: 'fields name,description; limit 20;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            companies: { type: 'array' }
                        }
                    }
                }
            }
        },
        searchFranchises: {
            method: 'POST',
            path: '/franchises',
            description: 'Query game franchises like Mario, Final Fantasy, or Pokemon. Returns franchise names and lists of associated games.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Search for Mario franchise',
                    body: 'search "Mario"; fields name,games.name,slug; limit 5;'
                },
                {
                    _description: 'Search for Final Fantasy franchise',
                    body: 'search "Final Fantasy"; fields name,games.name; limit 5;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            games: { type: 'array' },
                            slug: { type: 'string' }
                        }
                    }
                }
            }
        },
        getGameCovers: {
            method: 'POST',
            path: '/covers',
            description: 'Query game cover art images. Returns image IDs and thumbnail URLs for constructing full-size image links at images.igdb.com.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Get covers for specific game IDs',
                    body: 'fields game,url,image_id,width,height; where game = (1942,1074); limit 10;'
                },
                {
                    _description: 'Recent game covers with game names',
                    body: 'fields game.name,url,image_id,width,height; sort id desc; limit 10;'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            game: { type: 'number' },
                            url: { type: 'string' },
                            image_id: { type: 'string' },
                            width: { type: 'number' },
                            height: { type: 'number' }
                        }
                    }
                }
            }
        },
        multiQuery: {
            method: 'POST',
            path: '/multiquery',
            description: 'Execute up to 10 queries in a single request, each targeting a different endpoint with its own Apicalypse filters and result name.',
            parameters: [
                {
                    position: { key: 'body', value: '{{USER_PARAM}}', location: 'body' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                {
                    _description: 'Multi-query for top games and platforms',
                    body: 'query games "Top Games" { fields name,rating; sort rating desc; limit 5; }; query platforms "All Platforms" { fields name,generation; limit 10; };'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            result: { type: 'array' },
                            count: { type: 'number' }
                        }
                    }
                }
            }
        }
    }
}
