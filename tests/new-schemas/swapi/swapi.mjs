export const main = {
    namespace: 'swapi',
    name: 'SWAPI Star Wars API',
    description: 'Access the Star Wars API (SWAPI), the world\'s first quantified and programmatically-accessible data source for all the Star Wars data. Get detailed information about people, films, starships, vehicles, species, and planets from the Star Wars universe. Covers all 6 original films. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://swapi.dev/documentation'],
    tags: ['entertainment', 'movies', 'opendata', 'cacheTtlStatic'],
    root: 'https://swapi.dev',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchPeople: {
            method: 'GET',
            path: '/api/people/',
            description: 'Search Star Wars characters by name. Returns character details including height, mass, hair color, birth year, gender, and homeworld.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Search Luke', search: 'luke' },
                { _description: 'Search Vader', search: 'vader' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { count: { type: 'number' }, next: { type: 'string' }, previous: { type: 'string' }, results: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, height: { type: 'string' }, mass: { type: 'string' }, hair_color: { type: 'string' }, skin_color: { type: 'string' }, eye_color: { type: 'string' }, birth_year: { type: 'string' }, gender: { type: 'string' }, homeworld: { type: 'string' }, films: { type: 'array' }, species: { type: 'array' }, starships: { type: 'array' } } } } } }
            }
        },
        getPerson: {
            method: 'GET',
            path: '/api/people/:id/',
            description: 'Get a specific Star Wars character by ID. Returns full character details with links to related films, species, vehicles, and starships.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Luke Skywalker (1)', id: 1 },
                { _description: 'Get Darth Vader (4)', id: 4 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { name: { type: 'string' }, height: { type: 'string' }, mass: { type: 'string' }, hair_color: { type: 'string' }, skin_color: { type: 'string' }, eye_color: { type: 'string' }, birth_year: { type: 'string' }, gender: { type: 'string' }, homeworld: { type: 'string' }, films: { type: 'array' }, species: { type: 'array' }, vehicles: { type: 'array' }, starships: { type: 'array' } } }
            }
        },
        getFilm: {
            method: 'GET',
            path: '/api/films/:id/',
            description: 'Get a Star Wars film by ID. Returns title, episode number, opening crawl, director, producer, release date, and links to characters, planets, and starships.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get A New Hope (1)', id: 1 },
                { _description: 'Get Empire Strikes Back (2)', id: 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { title: { type: 'string' }, episode_id: { type: 'number' }, opening_crawl: { type: 'string' }, director: { type: 'string' }, producer: { type: 'string' }, release_date: { type: 'string' }, characters: { type: 'array' }, planets: { type: 'array' }, starships: { type: 'array' }, vehicles: { type: 'array' }, species: { type: 'array' } } }
            }
        },
        getPlanet: {
            method: 'GET',
            path: '/api/planets/:id/',
            description: 'Get a Star Wars planet by ID. Returns name, climate, terrain, population, diameter, gravity, orbital period, and links to residents and films.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Tatooine (1)', id: 1 },
                { _description: 'Get Alderaan (2)', id: 2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { name: { type: 'string' }, rotation_period: { type: 'string' }, orbital_period: { type: 'string' }, diameter: { type: 'string' }, climate: { type: 'string' }, gravity: { type: 'string' }, terrain: { type: 'string' }, surface_water: { type: 'string' }, population: { type: 'string' }, residents: { type: 'array' }, films: { type: 'array' } } }
            }
        },
        getStarship: {
            method: 'GET',
            path: '/api/starships/:id/',
            description: 'Get a Star Wars starship by ID. Returns name, model, manufacturer, cost, length, crew, passengers, cargo capacity, hyperdrive rating, and speed.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Millennium Falcon (10)', id: 10 },
                { _description: 'Get X-wing (12)', id: 12 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { name: { type: 'string' }, model: { type: 'string' }, manufacturer: { type: 'string' }, cost_in_credits: { type: 'string' }, length: { type: 'string' }, max_atmosphering_speed: { type: 'string' }, crew: { type: 'string' }, passengers: { type: 'string' }, cargo_capacity: { type: 'string' }, consumables: { type: 'string' }, hyperdrive_rating: { type: 'string' }, starship_class: { type: 'string' }, pilots: { type: 'array' }, films: { type: 'array' } } }
            }
        }
    }
}
