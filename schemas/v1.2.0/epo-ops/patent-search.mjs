export const schema = {
    namespace: 'epoOPS',
    name: 'EPO Open Patent Services',
    description: 'Search and retrieve European and international patent data from the EPO OPS API v3.2 — bibliographic data, abstracts, patent families, legal status, and CQL-based search across EP, WO, DE, and 100+ national patent offices.',
    docs: ['https://developers.epo.org/', 'https://www.epo.org/en/searching-for-patents/data/web-services/ops'],
    tags: ['patents', 'research', 'intellectualProperty', 'europe', 'germany', 'cacheTtlDaily'],
    flowMCP: '1.2.0',
    root: 'https://ops.epo.org/3.2/rest-services',
    requiredServerParams: ['EPO_CONSUMER_KEY', 'EPO_CONSUMER_SECRET'],
    headers: {
        'X-EPO-Consumer-Key': '{{EPO_CONSUMER_KEY}}',
        'X-EPO-Consumer-Secret': '{{EPO_CONSUMER_SECRET}}'
    },
    routes: {
        searchPatents: {
            requestMethod: 'GET',
            description: 'Search patents using CQL (Contextual Query Language). Supports title, abstract, applicant, inventor, publication date, CPC class, and more. Returns bibliographic data for matching patents. Max 100 results per request, max 2000 total.',
            route: '/published-data/search/biblio',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'Range', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("1-10")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for solar energy patents', q: 'ti=solar AND ta=energy', Range: '1-5' },
                { _description: 'Search for German patent applications', q: 'pn=DE AND pd>=2024', Range: '1-5' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseSearchResults' }
            ]
        },
        getPatentBiblio: {
            requestMethod: 'GET',
            description: 'Get bibliographic data for a specific patent by publication number. Use EPODOC format (e.g. EP1000000, DE102020001234, WO2024001234). Returns title, applicant, inventor, IPC/CPC classes, priority, and application data.',
            route: '/published-data/publication/epodoc/:number/biblio',
            parameters: [
                { position: { key: 'number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get biblio for a European patent', number: 'EP1000000' },
                { _description: 'Get biblio for a German patent', number: 'DE102019008007' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseBiblioData' }
            ]
        },
        getPatentAbstract: {
            requestMethod: 'GET',
            description: 'Get the abstract text for a specific patent by publication number. Use EPODOC format (e.g. EP1000000, DE102020001234).',
            route: '/published-data/publication/epodoc/:number/abstract',
            parameters: [
                { position: { key: 'number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get abstract for a European patent', number: 'EP1000000' },
                { _description: 'Get abstract for a German patent', number: 'DE102019008007' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseAbstractData' }
            ]
        },
        getPatentFamily: {
            requestMethod: 'GET',
            description: 'Get INPADOC patent family members for a specific patent. Shows all related applications and publications across jurisdictions. Use EPODOC format.',
            route: '/published-data/publication/epodoc/:number/family/biblio',
            parameters: [
                { position: { key: 'number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get family for a European patent', number: 'EP1000000' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseFamilyData' }
            ]
        },
        getPatentLegalStatus: {
            requestMethod: 'GET',
            description: 'Get legal status events for a specific patent. Shows grant, opposition, lapse, and other procedural events. Use EPODOC format.',
            route: '/published-data/publication/epodoc/:number/legal',
            parameters: [
                { position: { key: 'number', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(2)'] } }
            ],
            tests: [
                { _description: 'Get legal status for a European patent', number: 'EP1000000' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseLegalStatus' }
            ]
        },
        searchRegister: {
            requestMethod: 'GET',
            description: 'Search the EPO Register for procedural information on European patent applications. CQL query for register data including status, applicant, and dates.',
            route: '/register/search/biblio',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'Range', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("1-10")', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search register for Siemens applications', q: 'pa=Siemens', Range: '1-5' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'authenticatedFetch' },
                { phase: 'post', handlerName: 'parseRegisterResults' }
            ]
        }
    },
    handlers: {
        authenticatedFetch: async ( { struct, payload } ) => {
            const { serverParams } = payload
            const consumerKey = serverParams?.['EPO_CONSUMER_KEY']
            const consumerSecret = serverParams?.['EPO_CONSUMER_SECRET']

            if( !consumerKey || !consumerSecret ) {
                struct.status = false
                struct.messages.push( 'Missing EPO_CONSUMER_KEY or EPO_CONSUMER_SECRET. Register at https://developers.epo.org/' )

                return { struct, payload }
            }

            try {
                const credentials = btoa( `${consumerKey}:${consumerSecret}` )
                const tokenResponse = await fetch( 'https://ops.epo.org/3.2/auth/accesstoken', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'grant_type=client_credentials'
                } )

                if( !tokenResponse.ok ) {
                    struct.status = false
                    struct.messages.push( `OAuth token request failed: HTTP ${tokenResponse.status}` )

                    return { struct, payload }
                }

                const tokenData = await tokenResponse.json()
                const accessToken = tokenData.access_token

                if( !accessToken ) {
                    struct.status = false
                    struct.messages.push( 'No access_token in OAuth response' )

                    return { struct, payload }
                }

                const dataResponse = await fetch( payload.url, {
                    method: payload.method || 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/xml'
                    }
                } )

                if( !dataResponse.ok ) {
                    struct.status = false
                    struct.messages.push( `EPO API request failed: HTTP ${dataResponse.status}` )

                    return { struct, payload }
                }

                const xml = await dataResponse.text()
                struct.data = xml
                struct.status = true
            } catch( error ) {
                struct.status = false
                struct.messages.push( `EPO API error: ${error.message}` )
            }

            return { struct, payload }
        },
        parseSearchResults: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const totalMatch = xml.match( /total-result-count="(\d+)"/ )
                const totalResults = totalMatch ? parseInt( totalMatch[1], 10 ) : 0

                const entries = xml.split( /<exchange-document/ ).slice( 1 )
                const patents = entries
                    .map( ( entry ) => {
                        const country = entry.match( /country="([^"]+)"/ )
                        const docNumber = entry.match( /doc-number="([^"]+)"/ )
                        const kind = entry.match( /kind="([^"]+)"/ )

                        const getTag = ( tag ) => {
                            const match = entry.match( new RegExp( `<${tag}[^>]*>([\\s\\S]*?)</${tag}>` ) )
                            const result = match ? match[1].trim() : null

                            return result
                        }

                        const titleMatch = entry.match( /<invention-title[^>]*lang="en"[^>]*>([^<]+)<\/invention-title>/ )
                            || entry.match( /<invention-title[^>]*>([^<]+)<\/invention-title>/ )

                        const applicantNames = [ ...entry.matchAll( /<applicant[^>]*data-format="epodoc"[^>]*>[\s\S]*?<name>([^<]+)<\/name>/g ) ]
                            .map( ( m ) => m[1].trim() )

                        const inventorNames = [ ...entry.matchAll( /<inventor[^>]*data-format="epodoc"[^>]*>[\s\S]*?<name>([^<]+)<\/name>/g ) ]
                            .map( ( m ) => m[1].trim() )

                        const ipcClasses = [ ...entry.matchAll( /<classification-ipcr[^>]*>[\s\S]*?<text>([^<]+)<\/text>/g ) ]
                            .map( ( m ) => m[1].trim() )

                        const pubDateMatch = entry.match( /<date>(\d{8})<\/date>/ )
                        const pubDate = pubDateMatch
                            ? `${pubDateMatch[1].slice( 0, 4 )}-${pubDateMatch[1].slice( 4, 6 )}-${pubDateMatch[1].slice( 6, 8 )}`
                            : null

                        const result = {
                            publicationNumber: country ? `${country[1]}${docNumber ? docNumber[1] : ''}${kind ? kind[1] : ''}` : null,
                            country: country ? country[1] : null,
                            docNumber: docNumber ? docNumber[1] : null,
                            kind: kind ? kind[1] : null,
                            title: titleMatch ? titleMatch[1].trim() : null,
                            date: pubDate,
                            applicants: applicantNames.length > 0 ? applicantNames : null,
                            inventors: inventorNames.length > 0 ? inventorNames : null,
                            ipcClasses: ipcClasses.length > 0 ? ipcClasses : null
                        }

                        return result
                    } )

                struct.data = {
                    source: 'EPO Open Patent Services',
                    totalResults,
                    patentCount: patents.length,
                    patents
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO search results: ${error.message}` )
            }

            return { struct, payload }
        },
        parseBiblioData: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const country = xml.match( /<exchange-document[^>]*country="([^"]+)"/ )
                const docNumber = xml.match( /<exchange-document[^>]*doc-number="([^"]+)"/ )
                const kind = xml.match( /<exchange-document[^>]*kind="([^"]+)"/ )

                const titleMatch = xml.match( /<invention-title[^>]*lang="en"[^>]*>([^<]+)<\/invention-title>/ )
                    || xml.match( /<invention-title[^>]*>([^<]+)<\/invention-title>/ )

                const abstractMatch = xml.match( /<abstract[^>]*lang="en"[^>]*>([\s\S]*?)<\/abstract>/ )
                    || xml.match( /<abstract[^>]*>([\s\S]*?)<\/abstract>/ )
                const abstractText = abstractMatch
                    ? abstractMatch[1].replace( /<[^>]+>/g, '' ).replace( /\s+/g, ' ' ).trim()
                    : null

                const applicantNames = [ ...xml.matchAll( /<applicant[^>]*data-format="epodoc"[^>]*>[\s\S]*?<name>([^<]+)<\/name>/g ) ]
                    .map( ( m ) => m[1].trim() )

                const inventorNames = [ ...xml.matchAll( /<inventor[^>]*data-format="epodoc"[^>]*>[\s\S]*?<name>([^<]+)<\/name>/g ) ]
                    .map( ( m ) => m[1].trim() )

                const ipcClasses = [ ...xml.matchAll( /<classification-ipcr[^>]*>[\s\S]*?<text>([^<]+)<\/text>/g ) ]
                    .map( ( m ) => m[1].trim() )

                const cpcClasses = [ ...xml.matchAll( /<patent-classification>[\s\S]*?<classification-scheme[^>]*scheme="CPC"[\s\S]*?<section>([^<]*)<\/section>[\s\S]*?<class>([^<]*)<\/class>[\s\S]*?<subclass>([^<]*)<\/subclass>/g ) ]
                    .map( ( m ) => `${m[1]}${m[2]}${m[3]}`.trim() )

                const priorityClaims = [ ...xml.matchAll( /<priority-claim[^>]*>[\s\S]*?<country>([^<]*)<\/country>[\s\S]*?<doc-number>([^<]*)<\/doc-number>[\s\S]*?<date>(\d{8})<\/date>/g ) ]
                    .map( ( m ) => {
                        const result = {
                            country: m[1],
                            number: m[2],
                            date: `${m[3].slice( 0, 4 )}-${m[3].slice( 4, 6 )}-${m[3].slice( 6, 8 )}`
                        }

                        return result
                    } )

                const pubDateMatch = xml.match( /<exchange-document[^>]*date-publ="(\d{8})"/ )
                const pubDate = pubDateMatch
                    ? `${pubDateMatch[1].slice( 0, 4 )}-${pubDateMatch[1].slice( 4, 6 )}-${pubDateMatch[1].slice( 6, 8 )}`
                    : null

                struct.data = {
                    source: 'EPO Open Patent Services',
                    publicationNumber: country ? `${country[1]}${docNumber ? docNumber[1] : ''}${kind ? kind[1] : ''}` : null,
                    country: country ? country[1] : null,
                    docNumber: docNumber ? docNumber[1] : null,
                    kind: kind ? kind[1] : null,
                    publicationDate: pubDate,
                    title: titleMatch ? titleMatch[1].trim() : null,
                    abstract: abstractText,
                    applicants: applicantNames.length > 0 ? applicantNames : null,
                    inventors: inventorNames.length > 0 ? inventorNames : null,
                    ipcClasses: ipcClasses.length > 0 ? ipcClasses : null,
                    cpcClasses: cpcClasses.length > 0 ? cpcClasses : null,
                    priorityClaims: priorityClaims.length > 0 ? priorityClaims : null
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO biblio data: ${error.message}` )
            }

            return { struct, payload }
        },
        parseAbstractData: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const country = xml.match( /<exchange-document[^>]*country="([^"]+)"/ )
                const docNumber = xml.match( /<exchange-document[^>]*doc-number="([^"]+)"/ )

                const abstracts = [ ...xml.matchAll( /<abstract[^>]*lang="([^"]*)"[^>]*>([\s\S]*?)<\/abstract>/g ) ]
                    .map( ( m ) => {
                        const text = m[2].replace( /<[^>]+>/g, '' ).replace( /\s+/g, ' ' ).trim()
                        const result = { language: m[1], text }

                        return result
                    } )

                struct.data = {
                    source: 'EPO Open Patent Services',
                    publicationNumber: country ? `${country[1]}${docNumber ? docNumber[1] : ''}` : null,
                    abstractCount: abstracts.length,
                    abstracts
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO abstract data: ${error.message}` )
            }

            return { struct, payload }
        },
        parseFamilyData: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const familyMembers = xml.split( /<family-member/ ).slice( 1 )
                const members = familyMembers
                    .map( ( member ) => {
                        const pubCountry = member.match( /<publication-reference[^>]*>[\s\S]*?<country>([^<]+)<\/country>/ )
                        const pubNumber = member.match( /<publication-reference[^>]*>[\s\S]*?<doc-number>([^<]+)<\/doc-number>/ )
                        const pubKind = member.match( /<publication-reference[^>]*>[\s\S]*?<kind>([^<]+)<\/kind>/ )
                        const pubDate = member.match( /<publication-reference[^>]*>[\s\S]*?<date>(\d{8})<\/date>/ )

                        const appCountry = member.match( /<application-reference[^>]*>[\s\S]*?<country>([^<]+)<\/country>/ )
                        const appNumber = member.match( /<application-reference[^>]*>[\s\S]*?<doc-number>([^<]+)<\/doc-number>/ )

                        const titleMatch = member.match( /<invention-title[^>]*lang="en"[^>]*>([^<]+)<\/invention-title>/ )
                            || member.match( /<invention-title[^>]*>([^<]+)<\/invention-title>/ )

                        const result = {
                            publicationNumber: pubCountry ? `${pubCountry[1]}${pubNumber ? pubNumber[1] : ''}${pubKind ? pubKind[1] : ''}` : null,
                            country: pubCountry ? pubCountry[1] : null,
                            kind: pubKind ? pubKind[1] : null,
                            publicationDate: pubDate ? `${pubDate[1].slice( 0, 4 )}-${pubDate[1].slice( 4, 6 )}-${pubDate[1].slice( 6, 8 )}` : null,
                            applicationNumber: appCountry ? `${appCountry[1]}${appNumber ? appNumber[1] : ''}` : null,
                            title: titleMatch ? titleMatch[1].trim() : null
                        }

                        return result
                    } )

                struct.data = {
                    source: 'EPO Open Patent Services',
                    familySize: members.length,
                    members
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO family data: ${error.message}` )
            }

            return { struct, payload }
        },
        parseLegalStatus: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const legalEntries = xml.split( /<legal/ ).slice( 1 )
                const events = legalEntries
                    .map( ( entry ) => {
                        const code = entry.match( /code="([^"]+)"/ )
                        const desc = entry.match( /desc="([^"]+)"/ )
                        const date = entry.match( /<date>(\d{8})<\/date>/ )
                        const country = entry.match( /<country>([^<]+)<\/country>/ )

                        const getInnerTag = ( tag ) => {
                            const match = entry.match( new RegExp( `<${tag}>([^<]*)</${tag}>` ) )
                            const result = match ? match[1].trim() : null

                            return result
                        }

                        const result = {
                            code: code ? code[1] : null,
                            description: desc ? desc[1] : null,
                            date: date ? `${date[1].slice( 0, 4 )}-${date[1].slice( 4, 6 )}-${date[1].slice( 6, 8 )}` : null,
                            country: country ? country[1] : null,
                            text: getInnerTag( 'text' )
                        }

                        return result
                    } )

                struct.data = {
                    source: 'EPO Open Patent Services',
                    eventCount: events.length,
                    events
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO legal status: ${error.message}` )
            }

            return { struct, payload }
        },
        parseRegisterResults: async ( { struct, payload } ) => {
            const xml = struct?.data
            if( typeof xml !== 'string' ) { return { struct, payload } }

            try {
                const entries = xml.split( /<register-document/ ).slice( 1 )
                const documents = entries
                    .map( ( entry ) => {
                        const country = entry.match( /country="([^"]+)"/ )
                        const docNumber = entry.match( /doc-number="([^"]+)"/ )
                        const kind = entry.match( /kind="([^"]+)"/ )
                        const status = entry.match( /status="([^"]+)"/ )

                        const titleMatch = entry.match( /<invention-title[^>]*lang="en"[^>]*>([^<]+)<\/invention-title>/ )
                            || entry.match( /<invention-title[^>]*>([^<]+)<\/invention-title>/ )

                        const applicantNames = [ ...entry.matchAll( /<applicant[^>]*>[\s\S]*?<name>([^<]+)<\/name>/g ) ]
                            .map( ( m ) => m[1].trim() )

                        const result = {
                            publicationNumber: country ? `${country[1]}${docNumber ? docNumber[1] : ''}${kind ? kind[1] : ''}` : null,
                            status: status ? status[1] : null,
                            title: titleMatch ? titleMatch[1].trim() : null,
                            applicants: applicantNames.length > 0 ? applicantNames : null
                        }

                        return result
                    } )

                struct.data = {
                    source: 'EPO Register',
                    documentCount: documents.length,
                    documents
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing EPO register results: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
