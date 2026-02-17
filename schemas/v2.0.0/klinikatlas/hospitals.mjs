// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'klinikatlas',
    name: 'Bundes-Klinik-Atlas API',
    description: 'German Federal Hospital Atlas (Bundes-Klinik-Atlas) providing hospital locations, medical procedure codes, ICD diagnostic codes, and state-level healthcare statistics',
    version: '2.0.0',
    docs: ['https://klinikatlas.api.bund.dev/'],
    tags: ['healthcare', 'germany', 'hospitals', 'medical', 'cacheTtlDaily'],
    root: 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json',
    routes: {
        getLocations: {
            method: 'GET',
            path: '/locations.json',
            description: 'Get all hospital locations in Germany with name, address, bed count, coordinates, and link to detail page.',
            parameters: []
        },
        getIcdCodes: {
            method: 'GET',
            path: '/icd_codes.json',
            description: 'Get all ICD diagnostic codes used in German hospitals with code and description.',
            parameters: []
        },
        getOpsCodes: {
            method: 'GET',
            path: '/ops_codes.json',
            description: 'Get all OPS procedure codes (Operationen- und Prozedurenschluessel) used in German hospitals.',
            parameters: []
        },
        getStateStatistics: {
            method: 'GET',
            path: '/states.json',
            description: 'Get healthcare statistics per federal state including case numbers, caregiver counts, and hospital counts.',
            parameters: []
        },
        getGermanPlaces: {
            method: 'GET',
            path: '/german-places.json',
            description: 'Get German cities and places with postal code, municipality, district, and coordinates for hospital location lookup.',
            parameters: []
        },
        getGermanStates: {
            method: 'GET',
            path: '/german-states.json',
            description: 'Get all 16 German federal states with their geographic center coordinates. via klinikatlas.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getLocations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const locations = raw
            .slice( 0, 200 )
            .map( ( loc ) => {
            const result = {
            name: loc.name || null,
            street: loc.street || null,
            city: loc.city || null,
            zip: loc.zip || null,
            beds: loc.beds_number || null,
            latitude: loc.latitude || null,
            longitude: loc.longitude || null,
            link: loc.link || null
            }

            return result
            } )

            response = {
            totalLocations: raw.length,
            locationCount: locations.length,
            locations
            }

            return { response }
        }
    },
    getIcdCodes: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const codes = raw
            .slice( 0, 200 )
            .map( ( item ) => {
            const result = {
            code: item.icdcode || item.opscode || null,
            description: item.description || null
            }

            return result
            } )

            response = {
            totalCodes: raw.length,
            codeCount: codes.length,
            codes
            }

            return { response }
        }
    },
    getOpsCodes: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const codes = raw
            .slice( 0, 200 )
            .map( ( item ) => {
            const result = {
            code: item.icdcode || item.opscode || null,
            description: item.description || null
            }

            return result
            } )

            response = {
            totalCodes: raw.length,
            codeCount: codes.length,
            codes
            }

            return { response }
        }
    },
    getStateStatistics: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const states = raw
            .map( ( s ) => {
            const result = {
            name: s.name,
            cases: s.cases_number || 0,
            caregivers: s.caregivers_number || 0,
            hospitals: s.location_number || 0
            }

            return result
            } )

            response = {
            stateCount: states.length,
            states
            }

            return { response }
        }
    },
    getGermanPlaces: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const places = raw
            .slice( 0, 200 )
            .map( ( p ) => {
            const result = {
            postalCode: p.p || null,
            city: p.c || null,
            municipality: p.m || null,
            district: p.d || null,
            latitude: p.lt || null,
            longitude: p.ln || null
            }

            return result
            } )

            response = {
            totalPlaces: raw.length,
            placeCount: places.length,
            places
            }

            return { response }
        }
    },
    getGermanStates: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const states = raw
            .map( ( s ) => {
            const result = {
            name: s.state,
            latitude: s.lat || null,
            longitude: s.lon || null
            }

            return result
            } )

            response = {
            stateCount: states.length,
            states
            }

            return { response }
        }
    }
} )
