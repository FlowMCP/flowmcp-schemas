export const schema = {
    namespace: "berlinvergabe",
    name: "Berlin Vergabeplattform RSS",
    description: "RSS feed of public procurement notices from the Berlin Vergabeplattform providing current tender announcements for goods, services, and construction contracts",
    docs: ["https://www.berlin.de/vergabeplattform/"],
    tags: ["procurement", "berlin", "germany", "opendata", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://www.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getProcurementNotices: {
            requestMethod: "GET",
            description: "Get current public procurement notices from the Berlin Vergabeplattform. Returns tender announcements including title, description, link, and publication date.",
            route: "/vergabeplattform/veroeffentlichungen/bekanntmachungen/feed.rss",
            parameters: [],
            tests: [
                { _description: "Get all current Berlin procurement notices" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        }
    },
    handlers: {
        fetchRss: async ( { struct, payload } ) => {
            const url = `https://www.berlin.de/vergabeplattform/veroeffentlichungen/bekanntmachungen/feed.rss`
            const response = await fetch( url )

            if( !response.ok ) {
                struct.status = false
                struct.messages.push( `RSS feed error: ${response.status}` )
                return { struct, payload }
            }

            const xml = await response.text()
            const items = []
            const itemRegex = /<item>([\s\S]*?)<\/item>/g
            let match

            match = itemRegex.exec( xml )
            Array.from( { length: 100 } )
                .forEach( () => {
                    if( !match ) { return }

                    const extract = ( tag ) => {
                        const tagRegex = new RegExp( `<${tag}><!\\[CDATA\\[\\s*([\\s\\S]*?)\\s*\\]\\]><\\/${tag}>|<${tag}>([^<]*)<\\/${tag}>` )
                        const found = match[ 1 ].match( tagRegex )
                        const result = found ? ( found[ 1 ] || found[ 2 ] || '' ).trim() : null

                        return result
                    }

                    items.push( {
                        title: extract( 'title' ),
                        description: extract( 'description' ),
                        link: extract( 'link' ),
                        pubDate: extract( 'pubDate' ),
                        guid: extract( 'guid' )
                    } )

                    match = itemRegex.exec( xml )
                } )

            struct.data = { items }

            return { struct, payload }
        },
        formatItems: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const notices = raw.items
                .map( ( item ) => {
                    const result = {
                        title: item.title || null,
                        description: item.description ? item.description.substring( 0, 500 ) : null,
                        url: item.link || null,
                        publishedDate: item.pubDate || null,
                        guid: item.guid || null
                    }

                    return result
                } )

            struct.data = {
                noticeCount: notices.length,
                notices
            }

            return { struct, payload }
        }
    }
}
