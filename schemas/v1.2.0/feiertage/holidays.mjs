export const schema = {
    namespace: "feiertage",
    name: "Feiertage API",
    description: "German public holidays API providing holiday dates for all federal states with optional state filtering",
    docs: ["https://feiertage-api.de/"],
    tags: ["holidays", "germany", "calendar"],
    flowMCP: "1.2.0",
    root: "https://feiertage-api.de/api",
    requiredServerParams: [],
    headers: {},
    routes: {
        getAllHolidays: {
            requestMethod: "GET",
            description: "Get public holidays for all German federal states for a given year. Returns holiday name, date, and optional notes per state.",
            route: "/",
            parameters: [
                { position: { key: "jahr", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"2026\")", "optional()"] } }
            ],
            tests: [
                { _description: "Get all holidays for 2026" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatAllHolidays" }
            ]
        },
        getStateHolidays: {
            requestMethod: "GET",
            description: "Get public holidays for a specific German federal state. States: BW, BY, BE, BB, HB, HH, HE, MV, NI, NW, RP, SL, SN, ST, SH, TH.",
            route: "/",
            parameters: [
                { position: { key: "jahr", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(\"2026\")", "optional()"] } },
                { position: { key: "nur_land", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)", "max(2)"] } }
            ],
            tests: [
                { _description: "Get holidays for Bavaria 2026", nur_land: "BY" },
                { _description: "Get holidays for NRW 2026", nur_land: "NW" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStateHolidays" }
            ]
        }
    },
    handlers: {
        formatAllHolidays: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { struct, payload } }

            const states = Object.entries( raw )
                .map( ( [ state, holidays ] ) => {
                    const holidayList = Object.entries( holidays )
                        .map( ( [ name, info ] ) => {
                            const result = { name, date: info.datum, note: info.hinweis || null }

                            return result
                        } )

                    return { state, holidayCount: holidayList.length, holidays: holidayList }
                } )

            struct.data = {
                stateCount: states.length,
                states
            }

            return { struct, payload }
        },
        formatStateHolidays: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { struct, payload } }

            const holidays = Object.entries( raw )
                .map( ( [ name, info ] ) => {
                    const result = { name, date: info.datum, note: info.hinweis || null }

                    return result
                } )

            struct.data = {
                holidayCount: holidays.length,
                holidays
            }

            return { struct, payload }
        }
    }
}
