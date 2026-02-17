// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'nina',
    name: 'NINA Warn-App API',
    description: 'German federal warning system (NINA) providing DWD weather warnings, MOWAS civil protection alerts, BIWAPP and KATWARN notifications',
    version: '2.0.0',
    docs: ['https://nina.api.bund.dev/'],
    tags: ['warnings', 'germany', 'safety', 'cacheTtlFrequent'],
    root: 'https://warnung.bund.de/api31',
    routes: {
        getDwdWarnings: {
            method: 'GET',
            path: '/dwd/mapData.json',
            description: 'Get current DWD (Deutscher Wetterdienst) weather warnings across Germany via nina.',
            parameters: [],
            tests: [
                { _description: 'Get all DWD weather warnings' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            version: { type: 'number' },
                            startDate: { type: 'string' },
                            expiresDate: { type: 'string' },
                            severity: { type: 'string' },
                            urgency: { type: 'string' },
                            type: { type: 'string' },
                            i18nTitle: { type: 'object', properties: { de: { type: 'string' }, en: { type: 'string' }, ar: { type: 'string' }, es: { type: 'string' }, fr: { type: 'string' }, pl: { type: 'string' }, ru: { type: 'string' }, tr: { type: 'string' } } }
                        }
                    }
                }
            },
        },
        getMowasWarnings: {
            method: 'GET',
            path: '/mowas/mapData.json',
            description: 'Get current MOWAS (Modulares Warnsystem) official civil protection warnings via nina.',
            parameters: [],
            tests: [
                { _description: 'Get all MOWAS civil protection warnings' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            version: { type: 'number' },
                            startDate: { type: 'string' },
                            severity: { type: 'string' },
                            urgency: { type: 'string' },
                            type: { type: 'string' },
                            i18nTitle: { type: 'object', properties: { de: { type: 'string' } } },
                            transKeys: { type: 'object', properties: { event: { type: 'string' } } }
                        }
                    }
                }
            },
        },
        getBiwappWarnings: {
            method: 'GET',
            path: '/biwapp/mapData.json',
            description: 'Get current BIWAPP (Buerger Info und Warn App) municipal warnings Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all BIWAPP municipal warnings' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            version: { type: 'number' },
                            startDate: { type: 'string' },
                            expiresDate: { type: 'string' },
                            severity: { type: 'string' },
                            urgency: { type: 'string' },
                            type: { type: 'string' },
                            i18nTitle: { type: 'object', properties: { de: { type: 'string' } } }
                        }
                    }
                }
            },
        },
        getKatwarnWarnings: {
            method: 'GET',
            path: '/katwarn/mapData.json',
            description: 'Get current KATWARN alerts for disaster and crisis situations Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all KATWARN alerts' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'string' }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getDwdWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

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

            response = {
            warningCount: warnings.length,
            warnings
            }

            return { response }
        }
    },
    getMowasWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

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

            response = {
            warningCount: warnings.length,
            warnings
            }

            return { response }
        }
    },
    getBiwappWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

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

            response = {
            warningCount: warnings.length,
            warnings
            }

            return { response }
        }
    },
    getKatwarnWarnings: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

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

            response = {
            warningCount: warnings.length,
            warnings
            }

            return { response }
        }
    }
} )
