// Schema for #378 — RAND Fighting Disinformation Tools Database

export const main = {
    namespace: 'fightingdisinformation',
    name: 'RAND Fighting Disinformation',
    description: 'Database of 82 tools fighting online disinformation, maintained by RAND Corporation Truth Decay project. Search tools by keyword or category (bot detection, credibility scoring, verification, etc.). Returns tool name, description, type, and detail page URL.',
    version: '2.0.0',
    docs: ['https://www.rand.org/research/projects/truth-decay/fighting-disinformation/search.html'],
    tags: ['disinformation', 'factcheck', 'media', 'research', 'catalog', 'cacheTtlWeekly'],
    root: 'https://www.rand.org',
    routes: {
        searchTools: {
            method: 'GET',
            path: '/research/projects/truth-decay/fighting-disinformation/search.html',
            description: 'Search disinformation-fighting tools by keyword or category. Categories: Bot/spam detection, Codes and standards, Credibility scoring, Disinformation tracking, Education/training, Verification, Whitelisting. Returns all matching tools with name, description, and category.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'typeOfTool', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Bot/spam detection,Codes and standards,Credibility scoring,Disinformation tracking,Education/training,Verification,Whitelisting)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for bot detection tools', q: 'bot' },
                { _description: 'List all verification tools', typeOfTool: 'Verification' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        source: { type: 'string' },
                        totalCount: { type: 'number' },
                        tools: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    typeOfTool: { type: 'array' },
                                    detailUrl: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getToolDetail: {
            method: 'GET',
            path: '/research/projects/truth-decay/fighting-disinformation/search/items/{{SLUG}}.html',
            description: 'Get full details of a specific disinformation-fighting tool by its URL slug. Returns website, founding year, status, cost, intended users, method/technology, founding organization, and evaluation information.',
            parameters: [
                { position: { key: 'SLUG', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Botometer tool details', SLUG: 'botometer' },
                { _description: 'Get Snopes tool details', SLUG: 'snopes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        website: { type: 'string' },
                        founded: { type: 'string' },
                        description: { type: 'string' },
                        toolType: { type: 'string' },
                        status: { type: 'string' },
                        intendedUsers: { type: 'string' },
                        cost: { type: 'string' },
                        toolFocus: { type: 'string' },
                        method: { type: 'string' },
                        automated: { type: 'string' },
                        foundingOrganization: { type: 'string' },
                        founder: { type: 'string' }
                    }
                }
            }
        }
    }
}


export const handlers = () => {
    const _fetchHeaders = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
    }

    const _stripHtml = ( str ) => {
        const cleaned = str
            .replace( /<[^>]*>/g, '' )
            .replace( /&nbsp;/g, ' ' )
            .replace( /&amp;/g, '&' )
            .replace( /&lt;/g, '<' )
            .replace( /&gt;/g, '>' )
            .replace( /&quot;/g, '"' )
            .replace( /&#039;/g, "'" )
            .replace( /&#x27;/g, "'" )
            .replace( /\s+/g, ' ' )
            .trim()

        return cleaned
    }

    const _parseSearchHTML = ( html, query, typeFilter ) => {
        const tools = []
        const itemRegex = /<li[^>]*>\s*<div[^>]*class="item-detail"[^>]*>([\s\S]*?)<\/li>/gi
        let match = itemRegex.exec( html )

        const collectItems = () => {
            if( !match ) { return }

            const block = match[1]
            const titleMatch = block.match( /<h3[^>]*>\s*<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/i )
            const descMatch = block.match( /<p[^>]*>([\s\S]*?)<\/p>/i )

            if( titleMatch ) {
                const href = titleMatch[1]
                const title = _stripHtml( titleMatch[2] )
                const description = descMatch ? _stripHtml( descMatch[1] ) : ''
                const slugMatch = href.match( /\/items\/([^/.]+)/ )
                const slug = slugMatch ? slugMatch[1] : ''

                tools.push( {
                    title,
                    description,
                    typeOfTool: [],
                    detailUrl: 'https://www.rand.org' + href,
                    slug
                } )
            }

            match = itemRegex.exec( html )
            collectItems()
        }

        collectItems()

        let filtered = tools
        if( query ) {
            const q = query.toLowerCase()
            filtered = filtered
                .filter( ( tool ) => {
                    const inTitle = tool.title.toLowerCase().includes( q )
                    const inDesc = tool.description.toLowerCase().includes( q )

                    return inTitle || inDesc
                } )
        }

        return { totalCount: filtered.length, tools: filtered }
    }

    const _parseDetailHTML = ( html ) => {
        const detail = {}

        const titleMatch = html.match( /<h1[^>]*>([^<]*)<\/h1>/i )
        if( titleMatch ) { detail.title = _stripHtml( titleMatch[1] ) }

        const dlMatch = html.match( /<dl[^>]*>([\s\S]*?)<\/dl>/i )
        if( !dlMatch ) { return detail }

        const dlContent = dlMatch[1]
        const fieldMap = {
            'Website': 'website',
            'Founded': 'founded',
            'Description': 'description',
            'Tool type': 'toolType',
            'Status': 'status',
            'Intended users': 'intendedUsers',
            'Cost': 'cost',
            'Tool focus': 'toolFocus',
            'Method or technology': 'method',
            'Is the tool automated': 'automated',
            'Founding organization': 'foundingOrganization',
            'Founder': 'founder'
        }

        Object.entries( fieldMap )
            .forEach( ( [ label, key ] ) => {
                const regex = new RegExp( '<dt[^>]*>[^<]*' + label + '[^<]*<\\/dt>\\s*<dd[^>]*>([\\s\\S]*?)<\\/dd>', 'i' )
                const fieldMatch = dlContent.match( regex )

                if( fieldMatch ) {
                    const linkMatch = fieldMatch[1].match( /href="([^"]*)"/ )
                    if( key === 'website' && linkMatch ) {
                        detail[key] = linkMatch[1]
                    } else {
                        detail[key] = _stripHtml( fieldMatch[1] )
                    }
                }
            } )

        return detail
    }

    return {
        searchTools: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const url = new URL( payload.url )
                    const query = url.searchParams.get( 'q' ) || ''

                    const response = await fetch( 'https://www.rand.org/research/projects/truth-decay/fighting-disinformation/search.html', {
                        headers: _fetchHeaders
                    } )

                    if( !response.ok ) {
                        struct['status'] = false
                        struct['messages'].push( `HTTP ${response.status}: ${response.statusText}` )

                        return { struct }
                    }

                    const html = await response.text()
                    const { totalCount, tools } = _parseSearchHTML( html, query, null )

                    struct['data'] = {
                        source: 'rand.org/truth-decay',
                        totalCount,
                        tools: tools
                            .map( ( { slug, ...rest } ) => rest )
                    }
                } catch( error ) {
                    struct['status'] = false
                    struct['messages'].push( `Error searching tools: ${error.message}` )
                }

                return { struct }
            }
        },
        getToolDetail: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                    const response = await fetch( payload.url, {
                        headers: _fetchHeaders
                    } )

                    if( !response.ok ) {
                        struct['status'] = false
                        struct['messages'].push( `HTTP ${response.status}: ${response.statusText}` )

                        return { struct }
                    }

                    const html = await response.text()
                    const detail = _parseDetailHTML( html )

                    struct['data'] = {
                        source: 'rand.org/truth-decay',
                        ...detail
                    }
                } catch( error ) {
                    struct['status'] = false
                    struct['messages'].push( `Error fetching tool detail: ${error.message}` )
                }

                return { struct }
            }
        }
    }
}
