export const schema = {
    namespace: "arbeitsagentur",
    name: "Arbeitsagentur Ausbildungssuche API",
    description: "German Federal Employment Agency apprenticeship and training search API providing access to vocational training offers across Germany with filtering options",
    docs: ["https://ausbildungssuche.api.bund.dev/"],
    tags: ["education", "germany", "apprenticeship", "training", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://rest.arbeitsagentur.de/infosysbub/absuche",
    requiredServerParams: [],
    headers: {
        "X-API-Key": "infosysbub-absuche"
    },
    routes: {
        searchApprenticeships: {
            requestMethod: "GET",
            description: "Search for apprenticeship and vocational training offers in Germany. Returns training title, provider, location, duration, and content description.",
            route: "/pc/v1/ausbildungsangebot",
            parameters: [
                { position: { key: "spipiinaktiv", value: "0", location: "query" } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } }
            ],
            tests: [
                { _description: "Get first page of apprenticeships", size: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatApprenticeships" }
            ]
        },
        searchStudyPrograms: {
            requestMethod: "GET",
            description: "Search for university study programs in Germany by subject keyword. Uses the Studiensuche API. Returns program name, university, location, degree type, and study format.",
            route: "/studiensuche",
            parameters: [
                { position: { key: "sw", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for computer science programs", sw: "informatik", size: 5 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchStudyPrograms" },
                { phase: "post", handlerName: "formatStudyPrograms" }
            ]
        }
    },
    handlers: {
        fetchStudyPrograms: async ( { struct, payload, userParams } ) => {
            const { sw, page, size } = userParams
            const params = new URLSearchParams()
            params.set( 'sw', sw )
            if( page !== undefined ) { params.set( 'page', String( page ) ) }
            if( size !== undefined ) { params.set( 'size', String( size ) ) }

            const url = `https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?${params.toString()}`
            const response = await fetch( url, {
                headers: { 'X-API-Key': 'infosysbub-studisu' }
            } )

            if( !response.ok ) {
                struct.status = false
                struct.messages.push( `Studiensuche API error: ${response.status}` )

                return { struct, payload }
            }

            struct.data = await response.json()

            return { struct, payload }
        },
        formatApprenticeships: async ( { struct, payload } ) => {
            const raw = struct?.data
            const list = raw?._embedded?.termine
            if( !Array.isArray( list ) ) { return { struct, payload } }

            const apprenticeships = list
                .map( ( item ) => {
                    const offer = item.angebot || {}
                    const result = {
                        id: item.id || null,
                        title: offer.titel || null,
                        provider: offer.anbieter?.name || null,
                        teachingFormat: item.unterrichtsform?.bezeichnung || null,
                        duration: item.dauer?.bezeichnung || null
                    }

                    return result
                } )

            struct.data = {
                apprenticeshipCount: apprenticeships.length,
                apprenticeships
            }

            return { struct, payload }
        },
        formatStudyPrograms: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const programs = raw.items
                .map( ( item ) => {
                    const offer = item.studienangebot || {}
                    const result = {
                        id: offer.id || null,
                        name: offer.studiBezeichnung || null,
                        university: offer.studienanbieter?.name || null,
                        city: offer.studienort?.ort || null,
                        degree: offer.abschlussgrad?.label || null,
                        format: offer.studienform?.label || null,
                        type: offer.hochschulart?.label || null,
                        start: offer.studiBeginn || null
                    }

                    return result
                } )

            struct.data = {
                programCount: programs.length,
                programs
            }

            return { struct, payload }
        }
    }
}
