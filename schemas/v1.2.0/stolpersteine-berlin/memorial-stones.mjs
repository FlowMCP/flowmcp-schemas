export const schema = {
    namespace: "stolpersteineBerl",
    name: "Stolpersteine Berlin API",
    description: "Access information about Stolpersteine (memorial stones) in Berlin commemorating victims of Nazi persecution",
    docs: ["https://www.stolpersteine-berlin.de/", "https://www.stolpersteine-berlin.de/de/api"],
    tags: ["memorial", "history", "berlin"],
    flowMCP: "1.2.0",
    root: "https://www.stolpersteine-berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getAllStones: {
            requestMethod: "GET",
            description: "Get all Stolpersteine in Berlin",
            route: "/de/api/json/stolpersteine.json",
            parameters: [
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(1000)", "default(100)", "optional()"] } },
                { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "First 50 Stolpersteine", limit: 50 }
            ],
            modifiers: [{ phase: "execute", handlerName: "parseStolpersteineJSON" }]
        },
        searchStones: {
            requestMethod: "GET",
            description: "Search Stolpersteine by person name, address, or other criteria",
            route: "/de/api/json/stolpersteine.json",
            parameters: [
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "name", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)", "optional()"] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)", "optional()"] } },
                { position: { key: "birth_year", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1800)", "max(1945)", "optional()"] } },
                { position: { key: "death_year", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1933)", "max(1945)", "optional()"] } },
                { position: { key: "persecution_reason", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Jude,politisch,Zeuge-Jehovas,Sinti-Roma,Homosexuell,Euthanasie,Widerstand)", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Search by name", name: "Cohen" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "formatSearchParameters" },
                { phase: "execute", handlerName: "parseStolpersteineJSON" }
            ]
        },
        getStonesByDistrict: {
            requestMethod: "GET",
            description: "Get Stolpersteine in specific Berlin districts",
            route: "/de/api/json/stolpersteine.json",
            parameters: [
                { position: { key: "bezirk", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(Mitte,Friedrichshain-Kreuzberg,Pankow,Charlottenburg-Wilmersdorf,Spandau,Steglitz-Zehlendorf,Tempelhof-Schoeneberg,Neukoelln,Treptow-Koepenick,Marzahn-Hellersdorf,Lichtenberg,Reinickendorf)", options: [] } },
                { position: { key: "ortsteil", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(name,address,installation_date,birth_year)", options: ["default(name)", "optional()"] } }
            ],
            tests: [
                { _description: "All stones in Mitte", bezirk: "Mitte" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "formatDistrictFilter" },
                { phase: "execute", handlerName: "parseStolpersteineJSON" }
            ]
        },
        getStonesByPerson: {
            requestMethod: "GET",
            description: "Get detailed information about specific victims commemorated by Stolpersteine",
            route: "/de/api/json/stolpersteine.json",
            parameters: [
                { position: { key: "person_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "age_at_death", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(child,youth,adult,elderly)", options: ["optional()"] } },
                { position: { key: "family_group", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["optional()"] } },
                { position: { key: "include_biography", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } }
            ],
            tests: [
                { _description: "Person by ID", person_id: "12345" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "formatPersonFilter" },
                { phase: "execute", handlerName: "parseStolpersteineJSON" }
            ]
        },
        getStonesByLocation: {
            requestMethod: "GET",
            description: "Get Stolpersteine near a specific location or coordinates",
            route: "/de/api/json/stolpersteine.json",
            parameters: [
                { position: { key: "lat", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(52.3)", "max(52.7)", "optional()"] } },
                { position: { key: "lon", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(13.0)", "max(13.8)", "optional()"] } },
                { position: { key: "radius", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0.1)", "max(5.0)", "default(1.0)", "optional()"] } },
                { position: { key: "street", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)", "optional()"] } }
            ],
            tests: [
                { _description: "Stones near Alexanderplatz", lat: 52.5200, lon: 13.4050, radius: 0.5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "formatLocationFilter" },
                { phase: "execute", handlerName: "parseStolpersteineJSON" }
            ]
        }
    },
    handlers: {
        // Simple in-memory cache for Stolpersteine data
        _cache: {
            data: null,
            timestamp: null,
            ttl: 3600000 // 1 hour in milliseconds
        },
        
        parseStolpersteineJSON: async ({ struct, payload }) => {
            try {
                // Check cache first
                const now = Date.now()
                const cache = schema.handlers._cache
                
                if( cache.data && cache.timestamp && (now - cache.timestamp) < cache.ttl ) {
                    // Use cached data
                    const data = cache.data
                    struct.data = {
                        source: "Stolpersteine Berlin (cached)",
                        stoneCount: data.length,
                        stolpersteine: data,
                        fromCache: true,
                        cachedAt: new Date(cache.timestamp).toISOString()
                    }
                    struct.status = true
                    return { struct, payload }
                }
                
                // Fetch fresh data
                const response = await fetch(payload.url)
                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                    return { struct, payload }
                }

                const data = await response.json()
                
                // Cache the raw data
                cache.data = data
                cache.timestamp = now
                
                if( Array.isArray( data ) ) {
                    const stolpersteine = data.map( stone => ({
                        id: stone.id || stone.nummer,
                        person: {
                            firstName: stone.first_name || stone.vorname,
                            lastName: stone.last_name || stone.nachname,
                            fullName: stone.full_name || stone.vollername,
                            birthDate: stone.birth_date || stone.geburtsdatum,
                            birthPlace: stone.birth_place || stone.geburtsort,
                            deathDate: stone.death_date || stone.todesdatum,
                            deathPlace: stone.death_place || stone.todesort,
                            ageAtDeath: stone.age_at_death || stone.alter_beim_tod
                        },
                        persecution: {
                            reason: stone.persecution_reason || stone.verfolgungsgrund,
                            deportationDate: stone.deportation_date || stone.deportation,
                            deportationDestination: stone.deportation_destination || stone.deportationsziel,
                            captureDate: stone.capture_date || stone.verhaftung,
                            escapeAttempt: stone.escape_attempt || stone.fluchtversuch
                        },
                        location: {
                            address: stone.address || stone.adresse,
                            district: stone.district || stone.bezirk,
                            neighborhood: stone.neighborhood || stone.ortsteil,
                            coordinates: {
                                lat: stone.lat || stone.latitude,
                                lon: stone.lon || stone.longitude
                            },
                            lastKnownAddress: stone.last_known_address || stone.letzte_adresse
                        },
                        memorial: {
                            installationDate: stone.installation_date || stone.verlegung,
                            artist: stone.artist || stone.kuenstler || "Gunter Demnig",
                            condition: stone.condition || stone.zustand,
                            verified: stone.verified || stone.verifiziert,
                            sponsor: stone.sponsor || stone.pate
                        },
                        biography: {
                            profession: stone.profession || stone.beruf,
                            family: stone.family || stone.familie || [],
                            education: stone.education || stone.bildung,
                            resistance: stone.resistance || stone.widerstand,
                            additionalInfo: stone.additional_info || stone.zusatzinfo
                        },
                        sources: stone.sources || stone.quellen || [],
                        lastUpdated: stone.last_updated || stone.aktualisiert
                    }) )

                    struct.data = {
                        source: "Stolpersteine Berlin",
                        stoneCount: stolpersteine.length,
                        stolpersteine: stolpersteine
                    }
                } else {
                    struct.data = data
                }

            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing Stolpersteine JSON: ${error.message}` )
            }

            return { struct, payload }
        },

        formatSearchParameters: async ({ struct, payload, userParams }) => {
            const { q, name, address, birth_year, death_year, persecution_reason } = userParams
            
            const searchParams = new URLSearchParams()
            
            if( q ) searchParams.append( 'search', q )
            if( name ) searchParams.append( 'name', name )
            if( address ) searchParams.append( 'address', address )
            if( birth_year ) searchParams.append( 'birth_year', birth_year.toString() )
            if( death_year ) searchParams.append( 'death_year', death_year.toString() )
            if( persecution_reason ) searchParams.append( 'persecution', persecution_reason )
            
            if( searchParams.toString() ) {
                payload.url += payload.url.includes('?') ? `&${searchParams.toString()}` : `?${searchParams.toString()}`
            }
            
            return { struct, payload }
        },

        formatDistrictFilter: async ({ struct, payload, userParams }) => {
            const { bezirk, ortsteil, sort_by } = userParams
            
            const filterParams = new URLSearchParams()
            
            if( bezirk ) filterParams.append( 'district', bezirk )
            if( ortsteil ) filterParams.append( 'neighborhood', ortsteil )
            if( sort_by ) filterParams.append( 'sort', sort_by )
            
            if( filterParams.toString() ) {
                payload.url += payload.url.includes('?') ? `&${filterParams.toString()}` : `?${filterParams.toString()}`
            }
            
            return { struct, payload }
        },

        formatPersonFilter: async ({ struct, payload, userParams }) => {
            const { person_id, age_at_death, family_group, include_biography } = userParams
            
            const personParams = new URLSearchParams()
            
            if( person_id ) personParams.append( 'person_id', person_id )
            if( age_at_death ) personParams.append( 'age_category', age_at_death )
            if( family_group !== undefined ) personParams.append( 'family_group', family_group.toString() )
            if( include_biography !== undefined ) personParams.append( 'biography', include_biography.toString() )
            
            if( personParams.toString() ) {
                payload.url += payload.url.includes('?') ? `&${personParams.toString()}` : `?${personParams.toString()}`
            }
            
            return { struct, payload }
        },

        formatLocationFilter: async ({ struct, payload, userParams }) => {
            const { lat, lon, radius = 1.0, street } = userParams
            
            const locationParams = new URLSearchParams()
            
            if( lat && lon ) {
                locationParams.append( 'lat', lat.toString() )
                locationParams.append( 'lon', lon.toString() )
                locationParams.append( 'radius', radius.toString() )
            }
            if( street ) locationParams.append( 'street', street )
            
            if( locationParams.toString() ) {
                payload.url += payload.url.includes('?') ? `&${locationParams.toString()}` : `?${locationParams.toString()}`
            }
            
            return { struct, payload }
        }
    }
}