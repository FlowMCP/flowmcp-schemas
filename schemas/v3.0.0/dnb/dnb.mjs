export const main = {
    namespace: 'dnb',
    name: 'Deutsche Nationalbibliothek',
    description: 'Search the German National Library catalog and GND authority data via SRU. Access 50M+ bibliographic records (books, dissertations, music, online resources) and the GND authority file (persons, organizations, subjects). XML responses parsed to JSON. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://www.dnb.de/EN/Professionell/Metadatendienste/Datenbezug/SRU/sru_node.html'],
    tags: ['library', 'bibliography', 'germany', 'opendata', 'cacheTtlDaily'],
    root: 'https://services.dnb.de',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchByTitle: {
            method: 'GET',
            path: '/sru/dnb',
            description: 'Search DNB catalog by title. Returns bibliographic records with title, author, publisher, year, ISBN, and subject classification. Supports wildcards (e.g. "Faust*").',
            parameters: [
                { position: { key: 'title', value: '{{TITLE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maximumRecords', value: '{{MAX_RECORDS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'startRecord', value: '{{START_RECORD}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Search for Faust', title: 'Faust', maximumRecords: 5 },
                { _description: 'Search for Kafka', title: 'Kafka', maximumRecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, records: { type: 'array', items: { type: 'object', properties: { idn: { type: 'string' }, title: { type: 'string' }, creator: { type: 'string' }, publisher: { type: 'string' }, date: { type: 'string' }, language: { type: 'string' }, isbn: { type: 'string' }, subjects: { type: 'array', items: { type: 'string' } } } } } } }
            }
        },
        searchByAuthor: {
            method: 'GET',
            path: '/sru/dnb',
            description: 'Search DNB catalog by author name. Returns all bibliographic records by the specified author.',
            parameters: [
                { position: { key: 'author', value: '{{AUTHOR}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maximumRecords', value: '{{MAX_RECORDS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'startRecord', value: '{{START_RECORD}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Books by Goethe', author: 'Goethe', maximumRecords: 5 },
                { _description: 'Books by Thomas Mann', author: 'Mann, Thomas', maximumRecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, records: { type: 'array', items: { type: 'object', properties: { idn: { type: 'string' }, title: { type: 'string' }, creator: { type: 'string' }, publisher: { type: 'string' }, date: { type: 'string' }, isbn: { type: 'string' } } } } } }
            }
        },
        searchByIsbn: {
            method: 'GET',
            path: '/sru/dnb',
            description: 'Look up a specific book by ISBN (10 or 13 digits, with or without hyphens).',
            parameters: [
                { position: { key: 'isbn', value: '{{ISBN}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up by ISBN-13', isbn: '978-3-518-42812-0' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, records: { type: 'array', items: { type: 'object', properties: { idn: { type: 'string' }, title: { type: 'string' }, creator: { type: 'string' }, publisher: { type: 'string' }, date: { type: 'string' }, isbn: { type: 'string' }, subjects: { type: 'array', items: { type: 'string' } } } } } } }
            }
        },
        searchBySubject: {
            method: 'GET',
            path: '/sru/dnb',
            description: 'Search DNB catalog by subject keyword (Schlagwort). Uses intellectual subject headings (RSWK) assigned by librarians.',
            parameters: [
                { position: { key: 'subject', value: '{{SUBJECT}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maximumRecords', value: '{{MAX_RECORDS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'startRecord', value: '{{START_RECORD}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Books about artificial intelligence', subject: 'Kuenstliche Intelligenz', maximumRecords: 5 },
                { _description: 'Books about climate change', subject: 'Klimawandel', maximumRecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, records: { type: 'array', items: { type: 'object', properties: { idn: { type: 'string' }, title: { type: 'string' }, creator: { type: 'string' }, date: { type: 'string' }, subjects: { type: 'array', items: { type: 'string' } } } } } } }
            }
        },
        searchAuthorities: {
            method: 'GET',
            path: '/sru/authorities',
            description: 'Search the GND (Gemeinsame Normdatei) authority file for persons, organizations, subjects, and geographic names. Returns GND IDs and authority data.',
            parameters: [
                { position: { key: 'searchTerm', value: '{{SEARCH_TERM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'type', value: '{{TYPE}}', location: 'query' }, z: { primitive: 'enum(persons,subjects,corperations,geographics)', options: ['optional()', 'default(persons)'] } },
                { position: { key: 'maximumRecords', value: '{{MAX_RECORDS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search for person Goethe', searchTerm: 'Goethe', type: 'persons', maximumRecords: 5 },
                { _description: 'Search for subject Physik', searchTerm: 'Physik', type: 'subjects', maximumRecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { totalResults: { type: 'number' }, records: { type: 'array', items: { type: 'object', properties: { gndId: { type: 'string' }, name: { type: 'string' }, type: { type: 'string' } } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const parseDcRecords = ( xml ) => {
        const totalResults = parseInt( xml.match( /<numberOfRecords>(\d+)</ )?.[1] || '0' )
        const recordBlocks = xml.split( '<recordData>' ).slice( 1 )
        const records = recordBlocks
            .map( ( block ) => {
                const idn = block.match( /type="dnb:IDN">(.*?)</ )?.[1] || ''
                const title = ( block.match( /<dc:title>([\s\S]*?)<\/dc:title>/ )?.[1] || '' ).trim()
                const creator = ( block.match( /<dc:creator>([\s\S]*?)<\/dc:creator>/ )?.[1] || '' ).trim()
                const publisher = ( block.match( /<dc:publisher>([\s\S]*?)<\/dc:publisher>/ )?.[1] || '' ).trim()
                const date = block.match( /<dc:date>(.*?)<\/dc:date>/ )?.[1] || ''
                const language = block.match( /<dc:language>(.*?)<\/dc:language>/ )?.[1] || ''
                const isbnMatches = [ ...block.matchAll( /type="tel:ISBN">(.*?)</g ) ]
                const isbn = isbnMatches.length > 0 ? isbnMatches[0][1].split( ' : ' )[0] : ''
                const subjects = [ ...block.matchAll( /<dc:subject>(.*?)<\/dc:subject>/g ) ].map( ( m ) => m[1] )

                const item = { idn, title, creator, publisher, date, language, isbn, subjects }

                return item
            } )

        return { totalResults, records }
    }

    const parseMarcAuthorities = ( xml ) => {
        const totalResults = parseInt( xml.match( /<numberOfRecords>(\d+)</ )?.[1] || '0' )
        const recordBlocks = xml.split( '<recordData>' ).slice( 1 )
        const records = recordBlocks
            .map( ( block ) => {
                const gndId = block.match( /tag="001">(.*?)</ )?.[1] || ''
                const name = block.match( /tag="100"[^>]*>[\s\S]*?<subfield code="a">(.*?)</ )?.[1]
                    || block.match( /tag="110"[^>]*>[\s\S]*?<subfield code="a">(.*?)</ )?.[1]
                    || block.match( /tag="150"[^>]*>[\s\S]*?<subfield code="a">(.*?)</ )?.[1]
                    || block.match( /tag="151"[^>]*>[\s\S]*?<subfield code="a">(.*?)</ )?.[1]
                    || ''
                const typeCode = block.match( /tag="075"[^>]*>[\s\S]*?<subfield code="b">(.*?)</ )?.[1] || ''
                const typeMap = { p: 'person', b: 'corporate', s: 'subject', g: 'geographic', u: 'work', f: 'event' }
                const type = typeMap[typeCode] || typeCode

                const item = { gndId, name, type }

                return item
            } )

        return { totalResults, records }
    }

    return {
        searchByTitle: {
            preRequest: async ( { struct, payload } ) => {
                const { title } = payload
                const maximumRecords = payload?.maximumRecords || 10
                const startRecord = payload?.startRecord || 1
                struct['queryParams'] = { version: '1.1', operation: 'searchRetrieve', query: `tit=${title}`, recordSchema: 'oai_dc', maximumRecords, startRecord }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseDcRecords( xml )

                return { response: parsed }
            }
        },
        searchByAuthor: {
            preRequest: async ( { struct, payload } ) => {
                const { author } = payload
                const maximumRecords = payload?.maximumRecords || 10
                const startRecord = payload?.startRecord || 1
                struct['queryParams'] = { version: '1.1', operation: 'searchRetrieve', query: `atr=${author}`, recordSchema: 'oai_dc', maximumRecords, startRecord }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseDcRecords( xml )

                return { response: parsed }
            }
        },
        searchByIsbn: {
            preRequest: async ( { struct, payload } ) => {
                const { isbn } = payload
                struct['queryParams'] = { version: '1.1', operation: 'searchRetrieve', query: `num=${isbn}`, recordSchema: 'oai_dc', maximumRecords: 5 }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseDcRecords( xml )

                return { response: parsed }
            }
        },
        searchBySubject: {
            preRequest: async ( { struct, payload } ) => {
                const { subject } = payload
                const maximumRecords = payload?.maximumRecords || 10
                const startRecord = payload?.startRecord || 1
                struct['queryParams'] = { version: '1.1', operation: 'searchRetrieve', query: `sw=${subject}`, recordSchema: 'oai_dc', maximumRecords, startRecord }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseDcRecords( xml )

                return { response: parsed }
            }
        },
        searchAuthorities: {
            preRequest: async ( { struct, payload } ) => {
                const { searchTerm } = payload
                const type = payload?.type || 'persons'
                const maximumRecords = payload?.maximumRecords || 10
                struct['queryParams'] = { version: '1.1', operation: 'searchRetrieve', query: `${searchTerm} AND mat=${type}`, recordSchema: 'MARC21-xml', maximumRecords }

                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const xml = typeof response === 'string' ? response : ''
                const parsed = parseMarcAuthorities( xml )

                return { response: parsed }
            }
        }
    }
}
