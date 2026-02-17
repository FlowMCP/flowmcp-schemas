// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'arbeitsagentur',
    name: 'Arbeitsagentur Berufenet API',
    description: 'German Federal Employment Agency BERUFENET encyclopedia providing comprehensive information on over 3500 professions in Germany with classification and grouping',
    version: '2.0.0',
    docs: ['https://berufenet.api.bund.dev/'],
    tags: ['professions', 'germany', 'employment', 'education', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/infosysbub/bnet',
    headers: {
        'X-API-Key': 'infosysbub-berufenet'
    },
    routes: {
        searchProfessions: {
            method: 'GET',
            path: '/pc/v1/berufe?spipiinaktiv=0',
            description: 'Search and browse all professions in Germany\'s BERUFENET database. Returns profession names with IDs and classification groups. Supports pagination.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } }
            ]
        },
        getProfessionDetail: {
            method: 'GET',
            path: '/pc/v1/berufe/:id',
            description: 'Get detailed information about a specific profession by its BERUFENET ID. Use IDs from searchProfessions results.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchProfessions: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            const list = raw?._embedded?.berufSucheList
            if( !Array.isArray( list ) ) { return { response }}

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

            response = {
            totalProfessions: raw.page?.totalElements || professions.length,
            page: raw.page?.number || 0,
            totalPages: raw.page?.totalPages || 1,
            professionCount: professions.length,
            professions
            }

            return { response }
        }
    },
    getProfessionDetail: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { response }}

            const item = Array.isArray( raw ) ? raw[ 0 ] : raw
            if( !item ) { return { response }}

            response = {
            id: item.id || null,
            name: item.kurzBezeichnungNeutral || item.bezeichnungNeutral || null,
            classificationCode: item.kldb2010 || null,
            codeNumber: item.codenr || null
            }

            return { response }
        }
    }
} )
