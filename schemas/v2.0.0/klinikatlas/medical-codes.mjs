// Split from hospitals.mjs — ICD and OPS code search/lookup
// Category: handlers-clean
// Note: The API serves static JSON files — no server-side filtering.
// All search/filter routes fetch the full dataset and filter client-side.
// executeRequest handlers receive userParams via payload.userParams (not payload directly).

export const main = {
    namespace: 'klinikatlas',
    name: 'Klinikatlas Medical Codes',
    description: 'Search and lookup ICD diagnostic codes and OPS procedure codes from the German Federal Hospital Atlas (Bundes-Klinik-Atlas)',
    version: '2.0.0',
    docs: ['https://klinikatlas.api.bund.dev/'],
    tags: ['healthcare', 'germany', 'medical', 'icd', 'ops', 'cacheTtlDaily'],
    root: 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json',
    routes: {
        searchIcdCodes: {
            method: 'GET',
            path: '/icd_codes.json',
            description: 'Search ICD diagnostic codes by code prefix or keyword in description. Filtering happens client-side on the full dataset.',
            parameters: [
                { position: { key: 'code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(50)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'ICD diagnostic codes (~2.1MB, ~16K entries, static reference data)'
            },
            tests: [
                { _description: 'ICD codes starting with I10', code: 'I10' },
                { _description: 'ICD codes about diabetes', q: 'diabetes', limit: 10 }
            ]
        },
        getIcdCode: {
            method: 'GET',
            path: '/icd_codes.json',
            description: 'Exact ICD code lookup. Returns the matching code and description.',
            parameters: [
                { position: { key: 'code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters for exact code match'
            },
            tests: [
                { _description: 'Exact ICD code I10', code: 'I10' }
            ]
        },
        searchOpsCodes: {
            method: 'GET',
            path: '/ops_codes.json',
            description: 'Search OPS procedure codes by code prefix or keyword in description. Filtering happens client-side on the full dataset.',
            parameters: [
                { position: { key: 'code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)', 'optional()'] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(50)', 'optional()'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'OPS procedure codes (~6.3MB, ~37K entries, static reference data)'
            },
            tests: [
                { _description: 'OPS codes starting with 5-820', code: '5-820' },
                { _description: 'OPS codes about knee', q: 'knie', limit: 10 }
            ]
        },
        getOpsCode: {
            method: 'GET',
            path: '/ops_codes.json',
            description: 'Exact OPS code lookup. Returns the matching code and description.',
            parameters: [
                { position: { key: 'code', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            preload: {
                enabled: true,
                ttl: 604800,
                description: 'Fetches full dataset, filters for exact code match'
            },
            tests: [
                { _description: 'Exact OPS code 5-820.0', code: '5-820.0' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const _cacheIcd = { data: null, timestamp: null, ttl: 3600000 }
    const _cacheOps = { data: null, timestamp: null, ttl: 3600000 }

    const fetchIcdCodes = async () => {
        const now = Date.now()
        if( _cacheIcd.data && _cacheIcd.timestamp && ( now - _cacheIcd.timestamp ) < _cacheIcd.ttl ) {
            return { codes: _cacheIcd.data, fromCache: true }
        }

        const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/icd_codes.json' )
        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()
        _cacheIcd.data = data
        _cacheIcd.timestamp = now

        return { codes: data, fromCache: false }
    }

    const fetchOpsCodes = async () => {
        const now = Date.now()
        if( _cacheOps.data && _cacheOps.timestamp && ( now - _cacheOps.timestamp ) < _cacheOps.ttl ) {
            return { codes: _cacheOps.data, fromCache: true }
        }

        const response = await fetch( 'https://klinikatlas.api.proxy.bund.dev/fileadmin/json/ops_codes.json' )
        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()
        _cacheOps.data = data
        _cacheOps.timestamp = now

        return { codes: data, fromCache: false }
    }

    const normalizeCode = ( { item, type } ) => {
        const codeField = type === 'icd' ? 'icdcode' : 'opscode'
        const normalized = {
            code: item[codeField] || null,
            description: item.description || null
        }

        return normalized
    }

    return {
        searchIcdCodes: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { codes, fromCache } = await fetchIcdCodes()

                    if( !Array.isArray( codes ) ) {
                        struct.data = codes
                        return { struct }
                    }

                    const codePrefix = ( userParams.code || '' ).toUpperCase()
                    const q = ( userParams.q || '' ).toLowerCase()
                    const limit = userParams.limit || 50

                    const filtered = codes
                        .filter( ( item ) => {
                            const itemCode = ( item.icdcode || '' ).toUpperCase()
                            const itemDesc = ( item.description || '' ).toLowerCase()

                            if( codePrefix && !itemCode.startsWith( codePrefix ) ) { return false }
                            if( q && !itemDesc.includes( q ) ) { return false }

                            return true
                        } )
                        .slice( 0, limit )
                        .map( ( item ) => normalizeCode( { item, type: 'icd' } ) )

                    struct.data = {
                        source: 'Klinikatlas ICD Codes',
                        query: { code: codePrefix || null, q: q || null },
                        totalCount: codes.length,
                        matchCount: filtered.length,
                        limit,
                        fromCache,
                        codes: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error searching ICD codes: ${error.message}` )
                }

                return { struct }
            }
        },
        getIcdCode: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { codes, fromCache } = await fetchIcdCodes()

                    if( !Array.isArray( codes ) ) {
                        struct.data = codes
                        return { struct }
                    }

                    const targetCode = ( userParams.code || '' ).toUpperCase()
                    const match = codes
                        .find( ( item ) => ( item.icdcode || '' ).toUpperCase() === targetCode )

                    if( !match ) {
                        struct.data = {
                            source: 'Klinikatlas ICD Codes',
                            query: { code: targetCode },
                            found: false,
                            fromCache,
                            code: null
                        }

                        return { struct }
                    }

                    struct.data = {
                        source: 'Klinikatlas ICD Codes',
                        query: { code: targetCode },
                        found: true,
                        fromCache,
                        code: normalizeCode( { item: match, type: 'icd' } )
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error looking up ICD code: ${error.message}` )
                }

                return { struct }
            }
        },
        searchOpsCodes: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { codes, fromCache } = await fetchOpsCodes()

                    if( !Array.isArray( codes ) ) {
                        struct.data = codes
                        return { struct }
                    }

                    const codePrefix = ( userParams.code || '' ).toUpperCase()
                    const q = ( userParams.q || '' ).toLowerCase()
                    const limit = userParams.limit || 50

                    const filtered = codes
                        .filter( ( item ) => {
                            const itemCode = ( item.opscode || '' ).toUpperCase()
                            const itemDesc = ( item.description || '' ).toLowerCase()

                            if( codePrefix && !itemCode.startsWith( codePrefix ) ) { return false }
                            if( q && !itemDesc.includes( q ) ) { return false }

                            return true
                        } )
                        .slice( 0, limit )
                        .map( ( item ) => normalizeCode( { item, type: 'ops' } ) )

                    struct.data = {
                        source: 'Klinikatlas OPS Codes',
                        query: { code: codePrefix || null, q: q || null },
                        totalCount: codes.length,
                        matchCount: filtered.length,
                        limit,
                        fromCache,
                        codes: filtered
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error searching OPS codes: ${error.message}` )
                }

                return { struct }
            }
        },
        getOpsCode: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams } = payload
                    const { codes, fromCache } = await fetchOpsCodes()

                    if( !Array.isArray( codes ) ) {
                        struct.data = codes
                        return { struct }
                    }

                    const targetCode = ( userParams.code || '' ).toUpperCase()
                    const match = codes
                        .find( ( item ) => ( item.opscode || '' ).toUpperCase() === targetCode )

                    if( !match ) {
                        struct.data = {
                            source: 'Klinikatlas OPS Codes',
                            query: { code: targetCode },
                            found: false,
                            fromCache,
                            code: null
                        }

                        return { struct }
                    }

                    struct.data = {
                        source: 'Klinikatlas OPS Codes',
                        query: { code: targetCode },
                        found: true,
                        fromCache,
                        code: normalizeCode( { item: match, type: 'ops' } )
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error looking up OPS code: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
