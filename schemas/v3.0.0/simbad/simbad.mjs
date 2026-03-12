export const main = {
    namespace: 'simbad',
    name: 'SIMBAD Astronomical Database',
    description: 'Query the SIMBAD astronomical database via TAP (Table Access Protocol). Access 17M+ astronomical objects with coordinates, object types, spectral types, magnitudes, and cross-identifications. Uses ADQL query language. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://simbad.cds.unistra.fr/simbad/sim-tap', 'https://simbad.cds.unistra.fr/guide/sim-url.htx'],
    tags: ['astronomy', 'science', 'opendata', 'cacheTtlDaily'],
    root: 'https://simbad.cds.unistra.fr',
    requiredServerParams: [],
    headers: {},
    tools: {
        coneSearch: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'Search astronomical objects within a radius around given coordinates (cone search). Returns object name, position, type, and spectral type. Coordinates in ICRS (RA in degrees, Dec in degrees), radius in degrees.',
            parameters: [
                { position: { key: 'ra', value: '{{RA}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(360)'] } },
                { position: { key: 'dec', value: '{{DEC}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'radius', value: '{{RADIUS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0.1)', 'min(0.001)', 'max(5)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Objects near Orion Nebula (RA=83.82, Dec=-5.39)', ra: 83.82, dec: -5.39, radius: 0.1, limit: 10 },
                { _description: 'Objects near Andromeda Galaxy (RA=10.68, Dec=41.27)', ra: 10.68, dec: 41.27, radius: 0.2, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { main_id: { type: 'string' }, ra: { type: 'number' }, dec: { type: 'number' }, otype_txt: { type: 'string' }, sp_type: { type: 'string' } } } } } }
            }
        },
        objectByType: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'List astronomical objects by type code. Common types: Psr (Pulsar), QSO (Quasar), SNR (Supernova Remnant), PN (Planetary Nebula), GlC (Globular Cluster), OpC (Open Cluster), HII (HII Region), WD* (White Dwarf).',
            parameters: [
                { position: { key: 'objectType', value: '{{OBJECT_TYPE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'List pulsars', objectType: 'Psr', limit: 10 },
                { _description: 'List quasars', objectType: 'QSO', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { main_id: { type: 'string' }, ra: { type: 'number' }, dec: { type: 'number' }, otype_txt: { type: 'string' } } } } } }
            }
        },
        objectTypeStats: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'Get statistics on object types in the SIMBAD database. Returns object type codes and their counts, ordered by frequency.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Top 20 object types', limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { otype_txt: { type: 'string' }, count: { type: 'number' } } } } } }
            }
        },
        objectMagnitudes: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'Get multi-band photometric magnitudes (U, B, V, R, I, J, H, K) for a specific SIMBAD object. Use exact SIMBAD main_id format (e.g. "* alf CMa" for Sirius, "M  31" for Andromeda).',
            parameters: [
                { position: { key: 'mainId', value: '{{MAIN_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Magnitudes for Sirius', mainId: '* alf CMa' },
                { _description: 'Magnitudes for Betelgeuse', mainId: '* alf Ori' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { main_id: { type: 'string' }, U: { type: 'number' }, B: { type: 'number' }, V: { type: 'number' }, R: { type: 'number' }, I: { type: 'number' }, J: { type: 'number' }, H: { type: 'number' }, K: { type: 'number' } } } } } }
            }
        },
        objectIdentifiers: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'Get all known identifiers/catalog names for a specific astronomical object. Returns cross-identifications from multiple catalogs (HD, HR, HIP, 2MASS, etc.).',
            parameters: [
                { position: { key: 'mainId', value: '{{MAIN_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(200)'] } }
            ],
            tests: [
                { _description: 'Identifiers for Sirius', mainId: '* alf CMa', limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' } } } } } }
            }
        },
        queryAdql: {
            method: 'GET',
            path: '/simbad/sim-tap/sync',
            description: 'Execute a custom ADQL query against the SIMBAD TAP service. Main tables: basic (objects), allfluxes (magnitudes), ident (identifiers), mesVelocities, mesPLX (parallax), mesSpT (spectral types). Join measurement tables via oidref = basic.oid.',
            parameters: [
                { position: { key: 'query', value: '{{ADQL_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Basic object query', query: 'SELECT TOP 5 main_id, ra, dec, otype_txt FROM basic' },
                { _description: 'Velocity of M31', query: "SELECT TOP 5 v.velvalue, v.veltype, v.bibcode FROM mesVelocities AS v JOIN basic AS b ON b.oid = v.oidref WHERE b.main_id = 'M  31'" }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { metadata: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, datatype: { type: 'string' } } } }, data: { type: 'array', items: { type: 'array' } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    coneSearch: {
        preRequest: async ( { struct, payload } ) => {
            const { ra, dec } = payload
            const radius = payload?.radius || 0.1
            const limit = payload?.limit || 20
            const adql = `SELECT TOP ${limit} main_id, ra, dec, otype_txt, sp_type FROM basic WHERE CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', ${ra}, ${dec}, ${radius})) = 1`
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: adql }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const meta = response?.metadata || []
            const rows = response?.data || []
            const results = rows
                .map( ( row ) => {
                    const item = {}
                    meta.forEach( ( col, i ) => { item[col.name] = row[i] } )

                    return item
                } )

            return { response: { results } }
        }
    },
    objectByType: {
        preRequest: async ( { struct, payload } ) => {
            const { objectType } = payload
            const limit = payload?.limit || 20
            const adql = `SELECT TOP ${limit} main_id, ra, dec, otype_txt FROM basic WHERE otype_txt = '${objectType}'`
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: adql }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const meta = response?.metadata || []
            const rows = response?.data || []
            const results = rows
                .map( ( row ) => {
                    const item = {}
                    meta.forEach( ( col, i ) => { item[col.name] = row[i] } )

                    return item
                } )

            return { response: { results } }
        }
    },
    objectTypeStats: {
        preRequest: async ( { struct, payload } ) => {
            const limit = payload?.limit || 50
            const adql = `SELECT otype_txt, COUNT(*) AS cnt FROM basic GROUP BY otype_txt ORDER BY cnt DESC`
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: adql }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const limit = payload?.limit || 50
            const rows = response?.data || []
            const results = rows
                .slice( 0, limit )
                .map( ( row ) => {
                    const item = { otype_txt: row[0], count: row[1] }

                    return item
                } )

            return { response: { results } }
        }
    },
    objectMagnitudes: {
        preRequest: async ( { struct, payload } ) => {
            const { mainId } = payload
            const adql = `SELECT b.main_id, a.U, a.B, a.V, a.R, a.I, a.J, a.H, a.K FROM allfluxes a JOIN basic b ON b.oid = a.oidref WHERE b.main_id = '${mainId}'`
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: adql }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const meta = response?.metadata || []
            const rows = response?.data || []
            const results = rows
                .map( ( row ) => {
                    const item = {}
                    meta.forEach( ( col, i ) => { item[col.name] = row[i] } )

                    return item
                } )

            return { response: { results } }
        }
    },
    objectIdentifiers: {
        preRequest: async ( { struct, payload } ) => {
            const { mainId } = payload
            const limit = payload?.limit || 50
            const adql = `SELECT TOP ${limit} i.id FROM ident i JOIN basic b ON b.oid = i.oidref WHERE b.main_id = '${mainId}'`
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: adql }

            return { struct }
        },
        postRequest: async ( { response, struct, payload } ) => {
            const rows = response?.data || []
            const results = rows
                .map( ( row ) => {
                    const item = { id: row[0] }

                    return item
                } )

            return { response: { results } }
        }
    },
    queryAdql: {
        preRequest: async ( { struct, payload } ) => {
            const { query } = payload
            struct['queryParams'] = { REQUEST: 'doQuery', LANG: 'ADQL', FORMAT: 'json', QUERY: query }

            return { struct }
        }
    }
} )
