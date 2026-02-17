// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'reisewarnungen',
    name: 'Reisewarnungen API',
    description: 'German Federal Foreign Office (Auswaertiges Amt) travel warnings and safety advisories for all countries worldwide',
    version: '2.0.0',
    docs: ['https://reisewarnungen.api.bund.dev/'],
    tags: ['travel', 'warnings', 'germany', 'safety', 'cacheTtlDaily'],
    root: 'https://www.auswaertiges-amt.de/opendata',
    routes: {
        getAllWarnings: {
            method: 'GET',
            path: '/travelwarning',
            description: 'Get travel warnings and safety advisories for all countries. Returns country code, warning status, and last modification date.',
            parameters: []
        },
        getCountryWarning: {
            method: 'GET',
            path: '/travelwarning/:contentId',
            description: 'Get detailed travel warning for a specific country by content ID. Returns full advisory text, warning level, and safety information.',
            parameters: [
                { position: { key: 'contentId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getAllWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.response ) { return { response }}

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

            response = {
            countryCount: entries.length,
            countries: entries
            }

            return { response }
        }
    },
    getCountryWarning: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.response ) { return { response }}

            const entries = Object.entries( raw.response )
            if( entries.length === 0 ) { return { response }}

            const [ id, entry ] = entries[ 0 ]
            response = {
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

            return { response }
        }
    }
} )
