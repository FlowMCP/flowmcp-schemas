export const main = {
    namespace: 'gbif',
    name: 'GBIF',
    description: 'Access the Global Biodiversity Information Facility (GBIF) database with 2+ billion occurrence records and species information. Search species, match scientific names to the GBIF backbone taxonomy, and retrieve biodiversity occurrence data worldwide.',
    docs: ['https://www.gbif.org/developer/summary', 'https://techdocs.gbif.org/en/openapi/'],
    tags: ['biodiversity', 'species', 'ecology', 'science', 'opendata', 'taxonomy', 'cacheTtlDaily'],
    version: '2.0.0',
    root: 'https://api.gbif.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        matchSpeciesName: {
            method: 'GET',
            path: '/v1/species/match',
            description: 'Match a scientific or common name to the GBIF backbone taxonomy. Returns the best matching taxon with its GBIF key, rank, status, and classification.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rank', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(KINGDOM,PHYLUM,CLASS,ORDER,FAMILY,GENUS,SPECIES)', options: ['optional()'] } },
                { position: { key: 'kingdom', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'phylum', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'class', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'family', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'genus', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'verbose', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Match house sparrow by scientific name', name: 'Passer domesticus' },
                { _description: 'Match polar bear with higher taxonomy context', name: 'Ursus maritimus', kingdom: 'Animalia', order: 'Carnivora' },
                { _description: 'Match a plant species name', name: 'Quercus robur', rank: 'SPECIES' }
            ],
        },
        searchSpecies: {
            method: 'GET',
            path: '/v1/species/search',
            description: 'Search species in the GBIF backbone taxonomy by name, rank, or higher taxon key. Returns paginated list of matching taxa with their classification.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rank', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(KINGDOM,PHYLUM,CLASS,ORDER,FAMILY,GENUS,SPECIES)', options: ['optional()'] } },
                { position: { key: 'highertaxon_key', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ACCEPTED,SYNONYM,DOUBTFUL)', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Search for eagle species', q: 'eagle', rank: 'SPECIES', limit: 10 },
                { _description: 'Search for Panthera genus species', q: 'Panthera', rank: 'SPECIES', limit: 10 },
                { _description: 'Search for accepted oak species', q: 'Quercus', rank: 'SPECIES', status: 'ACCEPTED', limit: 10 }
            ],
        },
        searchOccurrences: {
            method: 'GET',
            path: '/v1/occurrence/search',
            description: 'Search biodiversity occurrence records in GBIF. Find where species have been observed, with location, date, and observer information. Returns paginated results.',
            parameters: [
                { position: { key: 'scientificName', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'taxonKey', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'basisOfRecord', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(HUMAN_OBSERVATION,MACHINE_OBSERVATION,PRESERVED_SPECIMEN,FOSSIL_SPECIMEN,OBSERVATION)', options: ['optional()'] } },
                { position: { key: 'hasCoordinate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(true)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(300)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Find wolf occurrences in Germany with coordinates', scientificName: 'Canis lupus', country: 'DE', hasCoordinate: 'true', limit: 10 },
                { _description: 'Find polar bear observations in recent years', scientificName: 'Ursus maritimus', basisOfRecord: 'HUMAN_OBSERVATION', limit: 10 },
                { _description: 'Find giant panda occurrences in China', scientificName: 'Ailuropoda melanoleuca', country: 'CN', hasCoordinate: 'true', limit: 10 }
            ],
        },
        getSpeciesById: {
            method: 'GET',
            path: '/v1/species/:key',
            description: 'Get detailed information about a species using its GBIF taxon key. Returns full taxonomic classification, synonyms, vernacular names, and links to related information.',
            parameters: [
                { position: { key: 'key', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get species info for house sparrow (key: 5231190)', key: 5231190 },
                { _description: 'Get species info for common chimpanzee (key: 2436436)', key: 2436436 },
                { _description: 'Get species info for giant panda (key: 5219645)', key: 5219645 }
            ],
        },
        getSpeciesVernacularNames: {
            method: 'GET',
            path: '/v1/species/:key/vernacularNames',
            description: 'Get all vernacular (common) names for a species from the GBIF backbone. Returns names in multiple languages with their sources.',
            parameters: [
                { position: { key: 'key', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } }
            ],
            tests: [
                { _description: 'Get all common names for the house sparrow', key: 5231190, limit: 20 },
                { _description: 'Get common names for common chimpanzee', key: 2436436, limit: 20 },
                { _description: 'Get common names for European robin', key: 5787060, limit: 20 }
            ],
        }
    },
}