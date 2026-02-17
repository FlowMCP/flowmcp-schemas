// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'arbeitsagentur',
    name: 'Arbeitsagentur Ausbildungssuche API',
    description: 'German Federal Employment Agency apprenticeship and training search API providing access to vocational training offers across Germany with filtering options',
    version: '2.0.0',
    docs: ['https://ausbildungssuche.api.bund.dev/'],
    tags: ['education', 'germany', 'apprenticeship', 'training', 'cacheTtlDaily'],
    root: 'https://rest.arbeitsagentur.de/infosysbub/absuche',
    headers: {
        'X-API-Key': 'infosysbub-absuche'
    },
    routes: {
        searchApprenticeships: {
            method: 'GET',
            path: '/pc/v1/ausbildungsangebot?spipiinaktiv=0',
            description: 'Search for apprenticeship and vocational training offers in Germany. Returns training title, provider, location, duration, and content description.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Get first page of apprenticeships', size: 5 }
            ],
        },
        searchStudyPrograms: {
            method: 'GET',
            path: '/studiensuche',
            description: 'Search for university study programs in Germany by subject keyword. Uses the Studiensuche API. Returns program name, university, location, degree type, and study format.',
            parameters: [
                { position: { key: 'sw', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for computer science programs', sw: 'informatik', size: 5 }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchApprenticeships: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            const list = raw?._embedded?.termine
            if( !Array.isArray( list ) ) { return { response }}

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

            response = {
            apprenticeshipCount: apprenticeships.length,
            apprenticeships
            }

            return { response }
        }
    },
    searchStudyPrograms: {
        executeRequest: async ( { struct, payload } ) => {
            const { userParams } = payload
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

            return { struct }}

            struct.data = await response.json()

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { response }}

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

            response = {
            programCount: programs.length,
            programs
            }

            return { response }
        }
    }
} )
