// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'feiertage',
    name: 'Feiertage API',
    description: 'German public holidays API providing holiday dates for all federal states with optional state filtering',
    version: '2.0.0',
    docs: ['https://feiertage-api.de/'],
    tags: ['holidays', 'germany', 'calendar', 'cacheTtlStatic'],
    root: 'https://feiertage-api.de/api',
    routes: {
        getAllHolidays: {
            method: 'GET',
            path: '/',
            description: 'Get public holidays for all German federal states for a given year. Returns holiday name, date, and optional notes per state.',
            parameters: [
                { position: { key: 'jahr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("2026")', 'optional()'] } }
            ]
        },
        getStateHolidays: {
            method: 'GET',
            path: '/',
            description: 'Get public holidays for a specific German federal state. States: BW, BY, BE, BB, HB, HH, HE, MV, NI, NW, RP, SL, SN, ST, SH, TH.',
            parameters: [
                { position: { key: 'jahr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("2026")', 'optional()'] } },
                { position: { key: 'nur_land', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'max(2)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getAllHolidays: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { response }}

            const states = Object.entries( raw )
            .map( ( [ state, holidays ] ) => {
            const holidayList = Object.entries( holidays )
            .map( ( [ name, info ] ) => {
            const result = { name, date: info.datum, note: info.hinweis || null }

            return result
            } )

            return { state, holidayCount: holidayList.length, holidays: holidayList }
            } )

            response = {
            stateCount: states.length,
            states
            }

            return { response }
        }
    },
    getStateHolidays: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw || typeof raw !== 'object' ) { return { response }}

            const holidays = Object.entries( raw )
            .map( ( [ name, info ] ) => {
            const result = { name, date: info.datum, note: info.hinweis || null }

            return result
            } )

            response = {
            holidayCount: holidays.length,
            holidays
            }

            return { response }
        }
    }
} )
