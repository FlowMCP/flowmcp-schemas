export const schema = {
    namespace: "arbeitsagentur",
    name: "Arbeitsagentur Berufenet API",
    description: "German Federal Employment Agency BERUFENET encyclopedia providing comprehensive information on over 3500 professions in Germany with classification and grouping",
    docs: ["https://berufenet.api.bund.dev/"],
    tags: ["professions", "germany", "employment", "education"],
    flowMCP: "1.2.0",
    root: "https://rest.arbeitsagentur.de/infosysbub/bnet",
    requiredServerParams: [],
    headers: {
        "X-API-Key": "infosysbub-berufenet"
    },
    routes: {
        searchProfessions: {
            requestMethod: "GET",
            description: "Search and browse all professions in Germany's BERUFENET database. Returns profession names with IDs and classification groups. Supports pagination.",
            route: "/pc/v1/berufe",
            parameters: [
                { position: { key: "spipiinaktiv", value: "0", location: "query" } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } }
            ],
            tests: [
                { _description: "Get first page of professions", size: 10 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatProfessions" }
            ]
        },
        getProfessionDetail: {
            requestMethod: "GET",
            description: "Get detailed information about a specific profession by its BERUFENET ID. Use IDs from searchProfessions results.",
            route: "/pc/v1/berufe/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get profession detail for 3-D-Artist", id: 27272 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatProfessionDetail" }
            ]
        }
    },
    handlers: {
        formatProfessions: async ( { struct, payload } ) => {
            const raw = struct?.data
            const list = raw?._embedded?.berufSucheList
            if( !Array.isArray( list ) ) { return { struct, payload } }

            const professions = list
                .map( ( item ) => {
                    const result = {
                        id: item.id || null,
                        name: item.kurzBezeichnungNeutral || null,
                        groupId: item.bkgr?.id || null,
                        type: item.bkgr?.typ?.id || null
                    }

                    return result
                } )

            struct.data = {
                totalProfessions: raw.page?.totalElements || professions.length,
                page: raw.page?.number || 0,
                totalPages: raw.page?.totalPages || 1,
                professionCount: professions.length,
                professions
            }

            return { struct, payload }
        },
        formatProfessionDetail: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { struct, payload } }

            const item = Array.isArray( raw ) ? raw[ 0 ] : raw
            if( !item ) { return { struct, payload } }

            struct.data = {
                id: item.id || null,
                name: item.kurzBezeichnungNeutral || item.bezeichnungNeutral || null,
                classificationCode: item.kldb2010 || null,
                codeNumber: item.codenr || null
            }

            return { struct, payload }
        }
    }
}
