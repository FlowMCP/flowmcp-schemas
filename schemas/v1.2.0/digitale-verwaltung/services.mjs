export const schema = {
    namespace: "digitaleVerwaltung",
    name: "Digitale Verwaltung API",
    description: "German Digital Administration API providing online government services catalog with OZG status, administrative region codes, and service availability across federal states",
    docs: ["https://digitale-verwaltung.api.bund.dev/"],
    tags: ["government", "germany", "administration", "services"],
    flowMCP: "1.2.0",
    root: "https://digitale-verwaltung.api.proxy.bund.dev/api/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getServices: {
            requestMethod: "GET",
            description: "Get digital government services with pagination. Returns service name, OZG category, online status, URL, and administrative region. Filter by ARS code for specific regions.",
            route: "/data",
            parameters: [
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "default(1)", "optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } },
                { position: { key: "ars", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get first page of services" },
                { _description: "Get services for Schleswig-Holstein", ars: "010000000000" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatServices" }
            ]
        },
        getAdminRegions: {
            requestMethod: "GET",
            description: "Get all administrative region codes (Amtlicher Regionalschluessel / ARS) with their names. Use these codes to filter services by region.",
            route: "/ars",
            parameters: [],
            tests: [
                { _description: "Get all administrative region codes" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatRegions" }
            ]
        }
    },
    handlers: {
        formatServices: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.content ) { return { struct, payload } }

            const services = raw.content
                .map( ( svc ) => {
                    const result = {
                        leikaKey: svc.leika_key || null,
                        name: svc.leika_name || null,
                        category: svc.ozg_bezeichnung || null,
                        region: svc.ars_name || null,
                        federalState: svc.bundesland || null,
                        onlineStatus: svc.online_status || null,
                        active: svc.aktiv || null,
                        url: svc.url || null
                    }

                    return result
                } )

            struct.data = {
                serviceCount: services.length,
                services
            }

            return { struct, payload }
        },
        formatRegions: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.content ) { return { struct, payload } }

            const regions = raw.content
                .slice( 0, 200 )
                .map( ( r ) => {
                    const result = {
                        ars: r.ars,
                        name: r.ars_name
                    }

                    return result
                } )

            struct.data = {
                totalRegions: raw.content.length,
                regionCount: regions.length,
                regions
            }

            return { struct, payload }
        }
    }
}
