export const main = {
    namespace: 'inaturalist',
    name: 'Inaturalist',
    description: 'Access iNaturalist nature observation data — search species observations, browse taxa, look up places, and retrieve species counts from the world\'s largest citizen science platform.',
    docs: ['https://api.inaturalist.org/v1/docs/', 'https://www.inaturalist.org/pages/api+reference'],
    tags: ['nature', 'biodiversity', 'species', 'citizenscience', 'observations', 'ecology', 'cacheTtlFrequent'],
    version: '2.0.0',
    root: 'https://api.inaturalist.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        getObservations: {
            method: 'GET',
            path: '/v1/observations',
            description: 'Search nature observations filtered by taxon, location, date range, quality grade, and user. Returns geolocated sightings with photos and identifications.',
            parameters: [
                { position: { key: 'taxon_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'taxon_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'place_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'quality_grade', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'photos', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'identified', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'd1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'd2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'radius', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search research-grade monarch butterfly observations', taxon_name: 'Danaus plexippus', quality_grade: 'research', per_page: 10 },
                { _description: 'Search observations near San Francisco with photos', lat: 37.7749, lng: -122.4194, radius: 10, photos: true, per_page: 10 },
                { _description: 'Search wolf observations in 2024', taxon_name: 'Canis lupus', d1: '2024-01-01', d2: '2024-12-31', per_page: 10 },
                { _description: 'Search recent bird observations with identification', taxon_name: 'Falco peregrinus', quality_grade: 'research', per_page: 5 }
            ],
        },
        getSpeciesCounts: {
            method: 'GET',
            path: '/v1/observations/species_counts',
            description: 'Get a ranked list of species (taxa) observed, ordered by observation count. Supports same filters as observations endpoint.',
            parameters: [
                { position: { key: 'taxon_name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'place_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'quality_grade', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'd1', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'd2', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'iconic_taxa', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Top observed bird species in California (place_id 14)', place_id: 14, iconic_taxa: 'Aves', quality_grade: 'research', per_page: 10 },
                { _description: 'Top observed plant species globally in 2024', iconic_taxa: 'Plantae', d1: '2024-01-01', d2: '2024-12-31', per_page: 10 },
                { _description: 'Top observed reptile species', iconic_taxa: 'Reptilia', quality_grade: 'research', per_page: 10 }
            ],
        },
        searchTaxa: {
            method: 'GET',
            path: '/v1/taxa',
            description: 'Search the iNaturalist taxonomic database for species and higher taxa. Returns taxonomy details, common names, conservation status, and Wikipedia links.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rank', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'taxon_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'is_active', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Search for wolf taxa', q: 'Canis lupus', rank: 'species', per_page: 5 },
                { _description: 'Search for oak tree species', q: 'Quercus', rank: 'genus', per_page: 10 },
                { _description: 'Search for eagle taxa at species rank', q: 'eagle', rank: 'species', per_page: 10 }
            ],
        },
        getTaxonById: {
            method: 'GET',
            path: '/v1/taxa/:id',
            description: 'Get detailed taxonomy information for a specific taxon by its iNaturalist ID, including classification, conservation status, and photos.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get taxon details for Homo sapiens (taxon ID 43584)', id: 43584 },
                { _description: 'Get taxon details for Panthera leo (lion, taxon ID 41944)', id: 41944 }
            ],
        },
        getPlacesAutocomplete: {
            method: 'GET',
            path: '/v1/places/autocomplete',
            description: 'Search iNaturalist places by name for use in filtering observations. Returns place IDs needed for the observations endpoint.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'per_page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(1)', 'max(20)'] } }
            ],
            tests: [
                { _description: 'Search for places named California', q: 'California', per_page: 5 },
                { _description: 'Search for places named Amazon', q: 'Amazon', per_page: 5 },
                { _description: 'Search for places named Yellowstone', q: 'Yellowstone', per_page: 3 }
            ],
        }
    },
}