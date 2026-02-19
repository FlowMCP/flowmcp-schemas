// DESTATIS GENESIS API — Data Retrieval
// Category: handlers-clean
// Note: All endpoints use POST with form-encoded body + username/password headers.
// Auth credential (STATISTISCHES_BUNDESAMT) is used as both username and password.
// All routes require authentication — no guest access for data retrieval.
// executeRequest handlers receive userParams via payload.userParams (not payload directly).

export const main = {
    namespace: 'destatis',
    name: 'DESTATIS Data',
    description: 'Retrieve statistical data tables and variable metadata from the German Federal Statistical Office (DESTATIS) GENESIS database',
    version: '2.0.0',
    docs: ['https://destatis.api.bund.dev/', 'https://www-genesis.destatis.de/genesisWS/rest/2020/application.wadl'],
    tags: ['statistics', 'germany', 'government', 'opendata', 'destatis'],
    root: 'https://www-genesis.destatis.de/genesisWS/rest/2020',
    routes: {
        getTableData: {
            method: 'POST',
            path: '/data/table',
            description: 'Retrieve actual data from a DESTATIS table. Returns structured data with values, column/row definitions, and metadata. Filter by year range, region, and classifying variables.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'startyear', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endyear', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'regionalkey', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'regionalvariable', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Population 2023', name: '12411-0001', startyear: '2023', endyear: '2023' },
                { _description: 'Population by state 2023', name: '12411-0010', startyear: '2023', endyear: '2023' }
            ]
        },
        getVariableMetadata: {
            method: 'POST',
            path: '/metadata/variable',
            description: 'Get metadata for a specific variable including its possible values, type, and description.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Population variable', name: 'BEVSTD' },
                { _description: 'Gender variable', name: 'GES' }
            ]
        },
        listVariables: {
            method: 'POST',
            path: '/catalogue/variables',
            description: 'Browse available variables by code pattern (e.g. "BEV*" for population variables, "GES*" for gender).',
            parameters: [
                { position: { key: 'selection', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("*")', 'optional()'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(100)', 'optional()'] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("free")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Population variables', selection: 'BEV*', pagelength: 10 },
                { _description: 'All variables', selection: '*', pagelength: 5 }
            ]
        },
        listValues: {
            method: 'POST',
            path: '/catalogue/values',
            description: 'Get possible values for a specific variable (e.g. all federal state codes for the regional variable).',
            parameters: [
                { position: { key: 'selection', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'pagelength', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(2500)', 'default(100)', 'optional()'] } },
                { position: { key: 'area', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['default("free")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Values for population stand', selection: 'BEVSTD*', pagelength: 10 }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const genesisPost = async ( { url, params, credential } ) => {
        const body = Object.entries( params )
            .filter( ( [ , v ] ) => v !== undefined && v !== null && v !== '' )
            .map( ( [ k, v ] ) => `${encodeURIComponent( k )}=${encodeURIComponent( v )}` )
            .join( '&' )

        const response = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'username': credential,
                'password': credential
            },
            body
        } )

        if( !response.ok ) {
            throw new Error( `HTTP ${response.status}: ${response.statusText}` )
        }

        const data = await response.json()

        if( data.Code === 15 ) {
            throw new Error( 'Authentication failed — check STATISTISCHES_BUNDESAMT credential' )
        }

        return data
    }

    const parseTableContent = ( { content } ) => {
        if( !content || typeof content !== 'string' ) { return { title: null, rows: [] } }

        const lines = content.split( '\n' ).filter( ( l ) => l.trim() !== '' )
        const title = lines[ 0 ] || null
        const headerLine = lines.find( ( l ) => l.startsWith( ';' ) )
        const headers = headerLine ? headerLine.split( ';' ).filter( ( h ) => h.trim() !== '' ) : []

        const dataRows = lines
            .filter( ( l ) => !l.startsWith( 'Tabelle:' ) && !l.startsWith( ';' ) && !l.startsWith( '__' ) && !l.startsWith( '"' ) && !l.startsWith( '©' ) && !l.startsWith( 'Stand:' ) && l.includes( ';' ) )
            .map( ( l ) => {
                const parts = l.split( ';' )
                const label = parts[ 0 ] || null
                const values = parts.slice( 1 )
                    .map( ( v ) => {
                        const trimmed = v.trim()
                        const num = parseFloat( trimmed )

                        return isNaN( num ) ? trimmed : num
                    } )

                return { label, values }
            } )

        return { title, headers, rows: dataRows }
    }

    return {
        getTableData: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams, serverParams } = payload
                    const credential = serverParams?.STATISTISCHES_BUNDESAMT

                    if( !credential ) {
                        throw new Error( 'STATISTISCHES_BUNDESAMT credential required for data access' )
                    }

                    const raw = await genesisPost( {
                        url: 'https://www-genesis.destatis.de/genesisWS/rest/2020/data/table',
                        params: {
                            name: userParams.name,
                            startyear: userParams.startyear || '',
                            endyear: userParams.endyear || '',
                            regionalvariable: userParams.regionalvariable || '',
                            regionalkey: userParams.regionalkey || '',
                            language: 'de'
                        },
                        credential
                    } )

                    const obj = raw.Object || {}
                    const parsed = parseTableContent( { content: obj.Content } )
                    const structure = obj.Structure || {}
                    const head = structure.Head || {}
                    const columns = ( structure.Columns || [] )
                        .map( ( c ) => ( { code: c.Code, name: c.Content, type: c.Type } ) )
                    const rows = ( structure.Rows || [] )
                        .map( ( r ) => ( { code: r.Code, name: r.Content, type: r.Type } ) )

                    struct.data = {
                        source: 'DESTATIS GENESIS',
                        query: {
                            name: userParams.name,
                            startyear: userParams.startyear || null,
                            endyear: userParams.endyear || null
                        },
                        table: {
                            statisticCode: head.Code || null,
                            statisticName: head.Content || null,
                            title: parsed.title,
                            headers: parsed.headers,
                            dataRows: parsed.rows,
                            columnDefinitions: columns,
                            rowDefinitions: rows
                        },
                        copyright: raw.Copyright || null
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error fetching table data: ${error.message}` )
                }

                return { struct }
            }
        },
        getVariableMetadata: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams, serverParams } = payload
                    const credential = serverParams?.STATISTISCHES_BUNDESAMT

                    if( !credential ) {
                        throw new Error( 'STATISTISCHES_BUNDESAMT credential required for metadata access' )
                    }

                    const raw = await genesisPost( {
                        url: 'https://www-genesis.destatis.de/genesisWS/rest/2020/metadata/variable',
                        params: {
                            name: userParams.name,
                            language: 'de'
                        },
                        credential
                    } )

                    const obj = raw.Object || {}
                    const validity = obj.Validity || {}

                    struct.data = {
                        source: 'DESTATIS GENESIS',
                        query: { name: userParams.name },
                        variable: {
                            code: obj.Code || null,
                            name: obj.Content || null,
                            type: obj.Type || null,
                            valueCount: parseInt( obj.Values ) || null,
                            validFrom: validity.From || null,
                            validTo: validity.To || null,
                            stock: obj.Stock === 'true',
                            summable: obj.Summable === 'true',
                            updated: obj.Updated || null
                        },
                        information: obj.Information || null,
                        copyright: raw.Copyright || null
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error fetching variable metadata: ${error.message}` )
                }

                return { struct }
            }
        },
        listVariables: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams, serverParams } = payload
                    const credential = serverParams?.STATISTISCHES_BUNDESAMT

                    if( !credential ) {
                        throw new Error( 'STATISTISCHES_BUNDESAMT credential required for catalogue access' )
                    }

                    const raw = await genesisPost( {
                        url: 'https://www-genesis.destatis.de/genesisWS/rest/2020/catalogue/variables',
                        params: {
                            selection: userParams.selection || '*',
                            pagelength: String( userParams.pagelength || 100 ),
                            area: userParams.area || 'free',
                            language: 'de'
                        },
                        credential
                    } )

                    const list = ( raw.List || [] )
                        .map( ( v ) => ( { code: v.Code, name: v.Content, type: v.Type || null } ) )

                    struct.data = {
                        source: 'DESTATIS GENESIS',
                        filter: { selection: userParams.selection || '*' },
                        variableCount: list.length,
                        variables: list,
                        copyright: raw.Copyright || null
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error listing variables: ${error.message}` )
                }

                return { struct }
            }
        },
        listValues: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const { userParams, serverParams } = payload
                    const credential = serverParams?.STATISTISCHES_BUNDESAMT

                    if( !credential ) {
                        throw new Error( 'STATISTISCHES_BUNDESAMT credential required for catalogue access' )
                    }

                    const raw = await genesisPost( {
                        url: 'https://www-genesis.destatis.de/genesisWS/rest/2020/catalogue/values',
                        params: {
                            selection: userParams.selection,
                            pagelength: String( userParams.pagelength || 100 ),
                            area: userParams.area || 'free',
                            language: 'de'
                        },
                        credential
                    } )

                    const list = ( raw.List || [] )
                        .map( ( v ) => ( { code: v.Code, name: v.Content } ) )

                    struct.data = {
                        source: 'DESTATIS GENESIS',
                        filter: { selection: userParams.selection },
                        valueCount: list.length,
                        values: list,
                        copyright: raw.Copyright || null
                    }
                } catch( error ) {
                    struct.status = false
                    struct.messages.push( `Error listing values: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
