export const schema = {
    namespace: "klinikatlas",
    name: "Bundes-Klinik-Atlas API",
    description: "German Federal Hospital Atlas (Bundes-Klinik-Atlas) providing hospital locations, medical procedure codes, ICD diagnostic codes, and state-level healthcare statistics",
    docs: ["https://klinikatlas.api.bund.dev/"],
    tags: ["healthcare", "germany", "hospitals", "medical"],
    flowMCP: "1.2.0",
    root: "https://klinikatlas.api.proxy.bund.dev/fileadmin/json",
    requiredServerParams: [],
    headers: {},
    routes: {
        getLocations: {
            requestMethod: "GET",
            description: "Get all hospital locations in Germany with name, address, bed count, coordinates, and link to detail page.",
            route: "/locations.json",
            parameters: [],
            tests: [
                { _description: "Get all hospital locations" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatLocations" }
            ]
        },
        getIcdCodes: {
            requestMethod: "GET",
            description: "Get all ICD diagnostic codes used in German hospitals with code and description.",
            route: "/icd_codes.json",
            parameters: [],
            tests: [
                { _description: "Get all ICD codes" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatCodes" }
            ]
        },
        getOpsCodes: {
            requestMethod: "GET",
            description: "Get all OPS procedure codes (Operationen- und Prozedurenschluessel) used in German hospitals.",
            route: "/ops_codes.json",
            parameters: [],
            tests: [
                { _description: "Get all OPS procedure codes" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatCodes" }
            ]
        },
        getStateStatistics: {
            requestMethod: "GET",
            description: "Get healthcare statistics per federal state including case numbers, caregiver counts, and hospital counts.",
            route: "/states.json",
            parameters: [],
            tests: [
                { _description: "Get state-level healthcare statistics" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStates" }
            ]
        },
        getGermanPlaces: {
            requestMethod: "GET",
            description: "Get German cities and places with postal code, municipality, district, and coordinates for hospital location lookup.",
            route: "/german-places.json",
            parameters: [],
            tests: [
                { _description: "Get German places with coordinates" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatPlaces" }
            ]
        },
        getGermanStates: {
            requestMethod: "GET",
            description: "Get all 16 German federal states with their geographic center coordinates. via klinikatlas.",
            route: "/german-states.json",
            parameters: [],
            tests: [
                { _description: "Get German states with coordinates" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatGermanStates" }
            ]
        }
    },
    handlers: {
        formatLocations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

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

            struct.data = {
                totalLocations: raw.length,
                locationCount: locations.length,
                locations
            }

            return { struct, payload }
        },
        formatCodes: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const codes = raw
                .slice( 0, 200 )
                .map( ( item ) => {
                    const result = {
                        code: item.icdcode || item.opscode || null,
                        description: item.description || null
                    }

                    return result
                } )

            struct.data = {
                totalCodes: raw.length,
                codeCount: codes.length,
                codes
            }

            return { struct, payload }
        },
        formatStates: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

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

            struct.data = {
                stateCount: states.length,
                states
            }

            return { struct, payload }
        },
        formatPlaces: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

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

            struct.data = {
                totalPlaces: raw.length,
                placeCount: places.length,
                places
            }

            return { struct, payload }
        },
        formatGermanStates: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const states = raw
                .map( ( s ) => {
                    const result = {
                        name: s.state,
                        latitude: s.lat || null,
                        longitude: s.lon || null
                    }

                    return result
                } )

            struct.data = {
                stateCount: states.length,
                states
            }

            return { struct, payload }
        }
    }
}
