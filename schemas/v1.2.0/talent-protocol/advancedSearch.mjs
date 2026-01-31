export const schema = {
    namespace: "talentprotocol",
    name: "Talent Protocol - Advanced Profile Search",
    description: "Search Profiles with rich filters, sorting, and pagination (page-based or point-in-time).",
    docs: ["https://api.talentprotocol.com"],
    tags: ["identity", "talent", "profiles"],
    flowMCP: "1.2.0",
    root: "https://api.talentprotocol.com",
    requiredServerParams: ["TALENT_API_KEY"],
    headers: { "Accept": "application/json", "X-API-KEY": "{{TALENT_API_KEY}}" },
    routes: {
        searchAdvancedProfiles: {
            requestMethod: "GET",
            description: "Get profiles that match input query and sort specification.",
            route: "/search/advanced/profiles",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "aggregations", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "returnItems", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: ["default(true)", "optional()"] } },
                { position: { key: "sort", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
                { position: { key: "per_page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(250)", "optional()"] } },
                { position: { key: "keep_alive_minutes", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(60)", "optional()"] } },
                { position: { key: "point_in_time_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "search_after", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "view", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(normal,minimal,scores_minimal)", options: ["default(normal)", "optional()"] } },
                { position: { key: "debug", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Top Builder Score (page-based)", query: "{}", sort: "{\"score\":{\"order\":\"desc\"},\"id\":{\"order\":\"desc\"}}", page: 1, per_page: 25 },
                { _description: "Human checkmark and credential filter", query: "{\"humanCheckmark\":true,\"credentials\":[{\"slug\":\"base_basename\",\"valueRange\":{\"min\":1}}]}", sort: "{\"score\":{\"order\":\"desc\"},\"id\":{\"order\":\"desc\"}}", page: 1, per_page: 3 },
                { _description: "Point-in-time first page", query: "{\"identity\":\"ens:vitalik.eth\",\"exactMatch\":true}", sort: "{\"id\":{\"order\":\"asc\"}}", keep_alive_minutes: 5, per_page: 50, view: "minimal" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "encodeJsonParams" }
            ]
        },
        getDefaultFields: {
            requestMethod: "GET",
            description: "Returns the fields that are allowed in customQuery for profiles (paying API keys only).",
            route: "/search/advanced/metadata/fields/profiles/default",
            parameters: [],
            tests: [
                { _description: "Fetch default metadata fields" }
            ],
            modifiers: []
        }
    },
    handlers: {
        encodeJsonParams: async ( { struct, payload } ) => {
            try {
                const jsonKeys = ['query', 'aggregations', 'sort', 'search_after']
                const urlObj = new URL( payload.url )

                jsonKeys
                    .forEach( ( k ) => {
                        if( urlObj.searchParams.has( k ) ) {
                            const raw = urlObj.searchParams.get( k )
                            let parsed = raw

                            try {
                                parsed = JSON.parse( raw )
                            } catch {
                                parsed = raw
                            }

                            const valueStr = typeof parsed === 'string' ? parsed : JSON.stringify( parsed )
                            urlObj.searchParams.set( k, valueStr )
                        }
                    } )

                const page = Number( urlObj.searchParams.get( 'page' ) )
                if( !isNaN( page ) && page < 1 ) {
                    urlObj.searchParams.set( 'page', '1' )
                }

                const perPage = Number( urlObj.searchParams.get( 'per_page' ) )
                if( !isNaN( perPage ) ) {
                    const clamped = Math.max( 1, Math.min( 250, perPage ) )
                    urlObj.searchParams.set( 'per_page', String( clamped ) )
                }

                const keepAlive = Number( urlObj.searchParams.get( 'keep_alive_minutes' ) )
                if( !isNaN( keepAlive ) ) {
                    const clamped = Math.max( 1, Math.min( 60, keepAlive ) )
                    urlObj.searchParams.set( 'keep_alive_minutes', String( clamped ) )
                }

                if( !urlObj.searchParams.get( 'view' ) ) {
                    urlObj.searchParams.set( 'view', 'normal' )
                }

                payload.url = urlObj.toString()
            } catch( e ) {
                struct.status = false
                struct.messages.push( `encodeJsonParams error: ${e?.message ?? e}` )
            }

            return { struct, payload }
        }
    }
}
