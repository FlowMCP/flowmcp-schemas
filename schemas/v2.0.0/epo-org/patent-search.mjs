// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Import: import { ISO_LANGUAGE_CODES } from '../_shared/isoLanguageCodes.mjs'
// Module-level code: 5 lines

export const main = {
    namespace: 'epo',
    name: 'European Patent Office RSS Search',
    description: 'Search European patents via RSS from the European Patent Office — query by technology class (IPC/CPC), keywords, date ranges, or combined filters.',
    version: '2.0.0',
    docs: ['https://register.epo.org/', 'https://www.epo.org/searching-for-patents/'],
    tags: ['patents', 'research', 'search', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'isoLanguageCodes', version: '2.0.0' }
    ],
    root: 'https://register.epo.org',
    routes: {
        searchPatents: {
            method: 'GET',
            path: '/rssSearch',
            description: 'Search for patents using custom query and language via European Patent Office. Supports lng filters.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en,fr)', options: ['default(en)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for AI patents in English', query: 'txt = artificial and txt = intelligence', lng: 'en' },
                { _description: 'Search for blockchain patents in German', query: 'txt = blockchain', lng: 'de' },
                { _description: 'Search for renewable energy patents', query: 'txt = renewable and txt = energy', lng: 'en' }
            ],
        },
        searchByTechnology: {
            method: 'GET',
            path: '/rssSearch',
            description: 'Search patents by predefined technology areas via European Patent Office. Supports lng filters.',
            parameters: [
                { position: { key: 'technology', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(artificial intelligence,machine learning,blockchain,renewable energy,biotechnology,nanotechnology,quantum computing,robotics,autonomous vehicles,5G)', options: [] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en,fr)', options: ['default(en)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search AI technology patents', technology: 'artificial intelligence', lng: 'en' },
                { _description: 'Search blockchain technology patents', technology: 'blockchain', lng: 'en' },
                { _description: 'Search quantum computing patents in German', technology: 'quantum computing', lng: 'de' }
            ],
        },
        searchByKeywords: {
            method: 'GET',
            path: '/rssSearch',
            description: 'Search patents using multiple keywords with AND/OR operators. Required: keywords. Optional filters: operator, field, lng.',
            parameters: [
                { position: { key: 'keywords', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['min(1)'] } },
                { position: { key: 'operator', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(AND,OR)', options: ['default(AND)', 'optional()'] } },
                { position: { key: 'field', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(txt,ti,ab,in)', options: ['default(txt)', 'optional()'] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en,fr)', options: ['default(en)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'Search patents with multiple keywords',
                    keywords: ['neural', 'network', 'deep'],
                    operator: 'AND',
                    field: 'txt',
                    lng: 'en'
                },
                { _description: 'Search by title keywords', keywords: ['solar', 'panel'], operator: 'AND', field: 'ti', lng: 'en' },
                {
                    _description: 'Search abstract with OR operator',
                    keywords: ['battery', 'fuel cell'],
                    operator: 'OR',
                    field: 'ab',
                    lng: 'de'
                }
            ],
        },
        searchByDate: {
            method: 'GET',
            path: '/rssSearch',
            description: 'Search patents within specific date ranges via European Patent Office. Supports from_date, to_date, lng filters.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'from_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to_date', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'lng', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(de,en,fr)', options: ['default(en)', 'optional()'] } }
            ],
            tests: [
                {
                    _description: 'Search recent AI patents',
                    query: 'txt = artificial intelligence',
                    from_date: '2023-01-01',
                    to_date: '2024-12-31',
                    lng: 'en'
                },
                {
                    _description: 'Search historical blockchain patents',
                    query: 'txt = blockchain',
                    from_date: '2008-01-01',
                    to_date: '2020-12-31',
                    lng: 'en'
                }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ISO_LANGUAGE_CODES = sharedLists['isoLanguageCodes']

    const epoLanguageAliases = [ 'de', 'en', 'fr' ]
    const epoLanguageEnum = 'enum(' + ISO_LANGUAGE_CODES
        .filter( ( c ) => epoLanguageAliases.includes( c.code ) )
        .map( ( c ) => c.code )
        .join( ',' ) + ')'

    return {
        searchPatents: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                const response = await fetch(payload.url)
                if( !response.ok ) {
                struct.status = false
                struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                return { struct }}

                const xmlText = await response.text()

                // Simple XML parsing for RSS items
                const itemRegex = /<item>(.*?)<\/item>/gs
                const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s
                const linkRegex = /<link>(.*?)<\/link>/s
                const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s
                const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s
                const guidRegex = /<guid.*?>(.*?)<\/guid>/s

                const patents = []
                let match
                while( (match = itemRegex.exec(xmlText)) !== null ) {
                const itemXml = match[1]

                const titleMatch = titleRegex.exec(itemXml)
                const linkMatch = linkRegex.exec(itemXml)
                const pubDateMatch = pubDateRegex.exec(itemXml)
                const descriptionMatch = descriptionRegex.exec(itemXml)
                const guidMatch = guidRegex.exec(itemXml)

                const patent = {
                title: titleMatch ? titleMatch[1] : null,
                link: linkMatch ? linkMatch[1] : null,
                pubDate: pubDateMatch ? pubDateMatch[1] : null,
                description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 300) + '...' : null,
                patentId: guidMatch ? guidMatch[1].split('/').pop() : null
                }

                patents.push(patent)
                }

                struct.data = {
                source: "European Patent Office",
                feedUrl: payload.url,
                patentCount: patents.length,
                patents: patents
                }

                } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing patent RSS feed: ${error.message}` )
                }

                return { struct }
            }
        },
        searchByTechnology: {
            preRequest: async ( { struct, payload } ) => {
                const { technology } = payload
                const formattedQuery = `txt = ${technology.replace(/\s+/g, ' and txt = ')}`

                struct.url = struct.url.replace(/query=[^&]*/, `query=${encodeURIComponent(formattedQuery)}`)

                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                try {
                const response = await fetch(payload.url)
                if( !response.ok ) {
                struct.status = false
                struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                return { struct }}

                const xmlText = await response.text()

                // Simple XML parsing for RSS items
                const itemRegex = /<item>(.*?)<\/item>/gs
                const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s
                const linkRegex = /<link>(.*?)<\/link>/s
                const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s
                const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s
                const guidRegex = /<guid.*?>(.*?)<\/guid>/s

                const patents = []
                let match
                while( (match = itemRegex.exec(xmlText)) !== null ) {
                const itemXml = match[1]

                const titleMatch = titleRegex.exec(itemXml)
                const linkMatch = linkRegex.exec(itemXml)
                const pubDateMatch = pubDateRegex.exec(itemXml)
                const descriptionMatch = descriptionRegex.exec(itemXml)
                const guidMatch = guidRegex.exec(itemXml)

                const patent = {
                title: titleMatch ? titleMatch[1] : null,
                link: linkMatch ? linkMatch[1] : null,
                pubDate: pubDateMatch ? pubDateMatch[1] : null,
                description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 300) + '...' : null,
                patentId: guidMatch ? guidMatch[1].split('/').pop() : null
                }

                patents.push(patent)
                }

                struct.data = {
                source: "European Patent Office",
                feedUrl: payload.url,
                patentCount: patents.length,
                patents: patents
                }

                } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing patent RSS feed: ${error.message}` )
                }

                return { struct }
            }
        },
        searchByKeywords: {
            preRequest: async ( { struct, payload } ) => {
                const { keywords, operator = 'AND', field = 'txt' } = payload
                const connector = operator === 'AND' ? ' and ' : ' or '
                const formattedQuery = keywords.map( keyword => `${field} = ${keyword}` ).join( connector )

                struct.url = struct.url.replace(/keywords=[^&]*/, `query=${encodeURIComponent(formattedQuery)}`)

                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                try {
                const response = await fetch(payload.url)
                if( !response.ok ) {
                struct.status = false
                struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                return { struct }}

                const xmlText = await response.text()

                // Simple XML parsing for RSS items
                const itemRegex = /<item>(.*?)<\/item>/gs
                const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s
                const linkRegex = /<link>(.*?)<\/link>/s
                const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s
                const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s
                const guidRegex = /<guid.*?>(.*?)<\/guid>/s

                const patents = []
                let match
                while( (match = itemRegex.exec(xmlText)) !== null ) {
                const itemXml = match[1]

                const titleMatch = titleRegex.exec(itemXml)
                const linkMatch = linkRegex.exec(itemXml)
                const pubDateMatch = pubDateRegex.exec(itemXml)
                const descriptionMatch = descriptionRegex.exec(itemXml)
                const guidMatch = guidRegex.exec(itemXml)

                const patent = {
                title: titleMatch ? titleMatch[1] : null,
                link: linkMatch ? linkMatch[1] : null,
                pubDate: pubDateMatch ? pubDateMatch[1] : null,
                description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 300) + '...' : null,
                patentId: guidMatch ? guidMatch[1].split('/').pop() : null
                }

                patents.push(patent)
                }

                struct.data = {
                source: "European Patent Office",
                feedUrl: payload.url,
                patentCount: patents.length,
                patents: patents
                }

                } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing patent RSS feed: ${error.message}` )
                }

                return { struct }
            }
        },
        searchByDate: {
            preRequest: async ( { struct, payload } ) => {
                const { query, from_date, to_date } = payload
                let formattedQuery = query

                if( from_date ) {
                formattedQuery += ` and pd >= ${from_date}`
                }
                if( to_date ) {
                formattedQuery += ` and pd <= ${to_date}`
                }

                struct.url = struct.url.replace(/query=[^&]*/, `query=${encodeURIComponent(formattedQuery)}`)

                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                try {
                const response = await fetch(payload.url)
                if( !response.ok ) {
                struct.status = false
                struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                return { struct }}

                const xmlText = await response.text()

                // Simple XML parsing for RSS items
                const itemRegex = /<item>(.*?)<\/item>/gs
                const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s
                const linkRegex = /<link>(.*?)<\/link>/s
                const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s
                const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s
                const guidRegex = /<guid.*?>(.*?)<\/guid>/s

                const patents = []
                let match
                while( (match = itemRegex.exec(xmlText)) !== null ) {
                const itemXml = match[1]

                const titleMatch = titleRegex.exec(itemXml)
                const linkMatch = linkRegex.exec(itemXml)
                const pubDateMatch = pubDateRegex.exec(itemXml)
                const descriptionMatch = descriptionRegex.exec(itemXml)
                const guidMatch = guidRegex.exec(itemXml)

                const patent = {
                title: titleMatch ? titleMatch[1] : null,
                link: linkMatch ? linkMatch[1] : null,
                pubDate: pubDateMatch ? pubDateMatch[1] : null,
                description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 300) + '...' : null,
                patentId: guidMatch ? guidMatch[1].split('/').pop() : null
                }

                patents.push(patent)
                }

                struct.data = {
                source: "European Patent Office",
                feedUrl: payload.url,
                patentCount: patents.length,
                patents: patents
                }

                } catch( error ) {
                struct.status = false
                struct.messages.push( `Error parsing patent RSS feed: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
