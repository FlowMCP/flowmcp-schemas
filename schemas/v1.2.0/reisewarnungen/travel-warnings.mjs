export const schema = {
    namespace: "reisewarnungen",
    name: "Reisewarnungen API",
    description: "German Federal Foreign Office (Auswaertiges Amt) travel warnings and safety advisories for all countries worldwide",
    docs: ["https://reisewarnungen.api.bund.dev/"],
    tags: ["travel", "warnings", "germany", "safety"],
    flowMCP: "1.2.0",
    root: "https://www.auswaertiges-amt.de/opendata",
    requiredServerParams: [],
    headers: {},
    routes: {
        getAllWarnings: {
            requestMethod: "GET",
            description: "Get travel warnings and safety advisories for all countries. Returns country code, warning status, and last modification date.",
            route: "/travelwarning",
            parameters: [],
            tests: [
                { _description: "Get all travel warnings" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatWarningList" }
            ]
        },
        getCountryWarning: {
            requestMethod: "GET",
            description: "Get detailed travel warning for a specific country by content ID. Returns full advisory text, warning level, and safety information.",
            route: "/travelwarning/:contentId",
            parameters: [
                { position: { key: "contentId", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get travel warning for Poland", contentId: "199124" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatCountryDetail" }
            ]
        }
    },
    handlers: {
        formatWarningList: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.response ) { return { struct, payload } }

            const entries = Object.entries( raw.response )
                .map( ( [ id, entry ] ) => {
                    const result = {
                        contentId: id,
                        countryCode: entry.countryCode || null,
                        countryName: entry.countryName || null,
                        title: entry.title || null,
                        warning: entry.warning || false,
                        partialWarning: entry.partialWarning || false,
                        situationWarning: entry.situationWarning || false,
                        lastModified: entry.lastModified || null
                    }

                    return result
                } )

            struct.data = {
                countryCount: entries.length,
                countries: entries
            }

            return { struct, payload }
        },
        formatCountryDetail: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.response ) { return { struct, payload } }

            const entries = Object.entries( raw.response )
            if( entries.length === 0 ) { return { struct, payload } }

            const [ id, entry ] = entries[ 0 ]
            struct.data = {
                contentId: id,
                countryCode: entry.countryCode || null,
                iso3CountryCode: entry.iso3CountryCode || null,
                countryName: entry.countryName || null,
                title: entry.title || null,
                warning: entry.warning || false,
                partialWarning: entry.partialWarning || false,
                situationWarning: entry.situationWarning || false,
                lastModified: entry.lastModified || null,
                lastChanges: entry.lastChanges || null,
                content: entry.content || null
            }

            return { struct, payload }
        }
    }
}
