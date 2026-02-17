// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "digitaleVerwaltung" -> "digitaleverwaltung"

export const main = {
    namespace: 'digitaleverwaltung',
    name: 'Digitale Verwaltung API',
    description: 'German Digital Administration API providing online government services catalog with OZG status, administrative region codes, and service availability across federal states',
    version: '2.0.0',
    docs: ['https://digitale-verwaltung.api.bund.dev/'],
    tags: ['government', 'germany', 'administration', 'services', 'cacheTtlDaily'],
    root: 'https://digitale-verwaltung.api.proxy.bund.dev/api/v1',
    routes: {
        getServices: {
            method: 'GET',
            path: '/data',
            description: 'Get digital government services with pagination. Returns service name, OZG category, online status, URL, and administrative region. Filter by ARS code for specific regions.',
            parameters: [
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'default(1)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } },
                { position: { key: 'ars', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get first page of services' },
                { _description: 'Get services for Schleswig-Holstein', ars: '010000000000' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        content: { type: 'array', items: { type: 'object', properties: { leika_key: { type: 'string' }, leika_name: { type: 'string' }, ars: { type: 'string' }, ars_name: { type: 'string' }, ars_federal_state: { type: 'string' }, bundesland: { type: 'string' }, leika_bezeichnung: { type: 'string' }, ozgid: { type: 'number' }, ozg_bezeichnung: { type: 'string' }, url: { type: 'string' }, online_status: { type: 'string' }, aktiv: { type: 'string' }, art_flaechendeckung: { type: 'string' } } } },
                        pageable: { type: 'object', properties: { pageNumber: { type: 'number' }, pageSize: { type: 'number' }, sort: { type: 'object', properties: { sorted: { type: 'boolean' }, unsorted: { type: 'boolean' }, empty: { type: 'boolean' } } }, offset: { type: 'number' }, unpaged: { type: 'boolean' }, paged: { type: 'boolean' } } },
                        totalElements: { type: 'number' },
                        totalPages: { type: 'number' },
                        last: { type: 'boolean' },
                        numberOfElements: { type: 'number' },
                        size: { type: 'number' },
                        number: { type: 'number' },
                        sort: { type: 'object', properties: { sorted: { type: 'boolean' }, unsorted: { type: 'boolean' }, empty: { type: 'boolean' } } },
                        first: { type: 'boolean' },
                        empty: { type: 'boolean' }
                    }
                }
            },
        },
        getAdminRegions: {
            method: 'GET',
            path: '/ars',
            description: 'Get all administrative region codes (Amtlicher Regionalschluessel / ARS) with their names. Use these codes to filter services by region.',
            parameters: [],
            tests: [
                { _description: 'Get all administrative region codes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        content: { type: 'array', items: { type: 'object', properties: { ars: { type: 'string' }, ars_name: { type: 'string' } } } },
                        pageable: { type: 'object', properties: { pageNumber: { type: 'number' }, pageSize: { type: 'number' }, sort: { type: 'object', properties: { sorted: { type: 'boolean' }, unsorted: { type: 'boolean' }, empty: { type: 'boolean' } } }, offset: { type: 'number' }, unpaged: { type: 'boolean' }, paged: { type: 'boolean' } } },
                        totalElements: { type: 'number' },
                        totalPages: { type: 'number' },
                        last: { type: 'boolean' },
                        numberOfElements: { type: 'number' },
                        size: { type: 'number' },
                        number: { type: 'number' },
                        sort: { type: 'object', properties: { sorted: { type: 'boolean' }, unsorted: { type: 'boolean' }, empty: { type: 'boolean' } } },
                        first: { type: 'boolean' },
                        empty: { type: 'boolean' }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getServices: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.content ) { return { response }}

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

            response = {
            serviceCount: services.length,
            services
            }

            return { response }
        }
    },
    getAdminRegions: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.content ) { return { response }}

            const regions = raw.content
            .slice( 0, 200 )
            .map( ( r ) => {
            const result = {
            ars: r.ars,
            name: r.ars_name
            }

            return result
            } )

            response = {
            totalRegions: raw.content.length,
            regionCount: regions.length,
            regions
            }

            return { response }
        }
    }
} )
