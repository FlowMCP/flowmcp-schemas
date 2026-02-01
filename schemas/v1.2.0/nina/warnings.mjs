export const schema = {
    namespace: "nina",
    name: "NINA Warn-App API",
    description: "German federal warning system (NINA) providing DWD weather warnings, MOWAS civil protection alerts, BIWAPP and KATWARN notifications",
    docs: ["https://nina.api.bund.dev/"],
    tags: ["warnings", "germany", "safety"],
    flowMCP: "1.2.0",
    root: "https://warnung.bund.de/api31",
    requiredServerParams: [],
    headers: {},
    routes: {
        getDwdWarnings: {
            requestMethod: "GET",
            description: "Get current DWD (Deutscher Wetterdienst) weather warnings across Germany",
            route: "/dwd/mapData.json",
            parameters: [],
            tests: [
                { _description: "Get all DWD weather warnings" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarnings" }
            ]
        },
        getMowasWarnings: {
            requestMethod: "GET",
            description: "Get current MOWAS (Modulares Warnsystem) official civil protection warnings",
            route: "/mowas/mapData.json",
            parameters: [],
            tests: [
                { _description: "Get all MOWAS civil protection warnings" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarnings" }
            ]
        },
        getBiwappWarnings: {
            requestMethod: "GET",
            description: "Get current BIWAPP (Buerger Info und Warn App) municipal warnings",
            route: "/biwapp/mapData.json",
            parameters: [],
            tests: [
                { _description: "Get all BIWAPP municipal warnings" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarnings" }
            ]
        },
        getKatwarnWarnings: {
            requestMethod: "GET",
            description: "Get current KATWARN alerts for disaster and crisis situations",
            route: "/katwarn/mapData.json",
            parameters: [],
            tests: [
                { _description: "Get all KATWARN alerts" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarnings" }
            ]
        }
    },
    handlers: {
        formatWarnings: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const warnings = raw
                .map( ( warning ) => {
                    const { id, severity, urgency, type, startDate, expiresDate, i18nTitle } = warning
                    const title = i18nTitle?.de || i18nTitle?.en || null

                    return {
                        id,
                        title,
                        severity,
                        urgency,
                        type,
                        startDate,
                        expiresDate
                    }
                } )

            struct.data = {
                warningCount: warnings.length,
                warnings
            }

            return { struct, payload }
        }
    }
}
