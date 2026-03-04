export const main = {
    namespace: 'ergast',
    name: 'Ergast Formula 1 API',
    description: 'Access historical Formula 1 data via the Ergast API (hosted on Jolpi). Get race results, driver and constructor standings, circuit information, and season schedules from 1950 to present. Covers 1,000+ races, 850+ drivers, and 200+ constructors. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://api.jolpi.ca/ergast/'],
    tags: ['sports', 'motorsport', 'statistics', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.jolpi.ca',
    requiredServerParams: [],
    headers: {},
    routes: {
        getSeasonSchedule: {
            method: 'GET',
            path: '/ergast/f1/:season.json',
            description: 'Get the race schedule for a specific F1 season. Returns all races with circuit info, dates, and round numbers.',
            parameters: [
                { position: { key: 'season', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get 2024 season', season: '2024' },
                { _description: 'Get 2023 season', season: '2023' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { MRData: { type: 'object', properties: { total: { type: 'string' }, RaceTable: { type: 'object', properties: { season: { type: 'string' }, Races: { type: 'array', items: { type: 'object', properties: { season: { type: 'string' }, round: { type: 'string' }, raceName: { type: 'string' }, Circuit: { type: 'object', properties: { circuitName: { type: 'string' }, Location: { type: 'object' } } }, date: { type: 'string' } } } } } } } } } }
            }
        },
        getRaceResults: {
            method: 'GET',
            path: '/ergast/f1/:season/results.json',
            description: 'Get race results for an entire F1 season. Returns finishing positions, drivers, constructors, times, and points for each race.',
            parameters: [
                { position: { key: 'season', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(30)', 'max(100)'] } }
            ],
            tests: [
                { _description: '2024 race results', season: '2024', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { MRData: { type: 'object', properties: { total: { type: 'string' }, RaceTable: { type: 'object', properties: { season: { type: 'string' }, Races: { type: 'array' } } } } } } }
            }
        },
        getDriverStandings: {
            method: 'GET',
            path: '/ergast/f1/:season/driverstandings.json',
            description: 'Get the driver championship standings for a season. Returns driver positions, points, wins, and team information.',
            parameters: [
                { position: { key: 'season', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: '2024 driver standings', season: '2024' },
                { _description: '2023 driver standings', season: '2023' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { MRData: { type: 'object', properties: { StandingsTable: { type: 'object', properties: { season: { type: 'string' }, StandingsLists: { type: 'array', items: { type: 'object', properties: { season: { type: 'string' }, round: { type: 'string' }, DriverStandings: { type: 'array' } } } } } } } } } }
            }
        },
        getConstructorStandings: {
            method: 'GET',
            path: '/ergast/f1/:season/constructorstandings.json',
            description: 'Get the constructor (team) championship standings for a season. Returns team positions, points, and wins.',
            parameters: [
                { position: { key: 'season', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: '2024 constructor standings', season: '2024' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { MRData: { type: 'object', properties: { StandingsTable: { type: 'object', properties: { season: { type: 'string' }, StandingsLists: { type: 'array' } } } } } } }
            }
        },
        getDriver: {
            method: 'GET',
            path: '/ergast/f1/drivers/:driverId.json',
            description: 'Get information about a specific F1 driver by driver ID. Returns full name, date of birth, nationality, and Wikipedia link.',
            parameters: [
                { position: { key: 'driverId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Verstappen', driverId: 'max_verstappen' },
                { _description: 'Get Hamilton', driverId: 'hamilton' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { MRData: { type: 'object', properties: { DriverTable: { type: 'object', properties: { driverId: { type: 'string' }, Drivers: { type: 'array', items: { type: 'object', properties: { driverId: { type: 'string' }, givenName: { type: 'string' }, familyName: { type: 'string' }, dateOfBirth: { type: 'string' }, nationality: { type: 'string' } } } } } } } } } }
            }
        }
    }
}
