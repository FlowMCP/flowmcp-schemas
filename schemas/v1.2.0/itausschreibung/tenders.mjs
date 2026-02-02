export const schema = {
    namespace: "itausschreibung",
    name: "IT-Ausschreibung.de RSS Feed",
    description: "German IT procurement and tender platform providing RSS feeds for IT-related tenders across categories like software, hardware, internet, telecom, and consulting",
    docs: ["https://www.it-ausschreibung.de/rss"],
    tags: ["procurement", "germany", "tenders", "it", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://www.it-ausschreibung.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getAllTenders: {
            requestMethod: "GET",
            description: "Get all recent IT tenders and procurement notices across all categories. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_ausschreibungen.xml",
            parameters: [],
            tests: [
                { _description: "Get all recent IT tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        },
        getSoftwareTenders: {
            requestMethod: "GET",
            description: "Get recent IT tenders in the software development category. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_software.xml",
            parameters: [],
            tests: [
                { _description: "Get software tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        },
        getHardwareTenders: {
            requestMethod: "GET",
            description: "Get recent IT tenders in the hardware category. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_hardware.xml",
            parameters: [],
            tests: [
                { _description: "Get hardware tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        },
        getInternetTenders: {
            requestMethod: "GET",
            description: "Get recent IT tenders in the internet, multimedia, and marketing category. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_internet_multimedia_marketing.xml",
            parameters: [],
            tests: [
                { _description: "Get internet and multimedia tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        },
        getTelecomTenders: {
            requestMethod: "GET",
            description: "Get recent IT tenders in the telecommunications category. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_telekommunikation_tk.xml",
            parameters: [],
            tests: [
                { _description: "Get telecom tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        },
        getConsultingTenders: {
            requestMethod: "GET",
            description: "Get recent IT tenders in the training and consulting category. Returns title, description, link, and publication date.",
            route: "/ausschreibungen-auftraege/rss_schulung_beratung.xml",
            parameters: [],
            tests: [
                { _description: "Get consulting and training tenders" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchRss" },
                { phase: "post", handlerName: "formatItems" }
            ]
        }
    },
    handlers: {
        fetchRss: async ( { struct, payload, routeName } ) => {
            const feedMap = {
                getAllTenders: 'rss_ausschreibungen.xml',
                getSoftwareTenders: 'rss_software.xml',
                getHardwareTenders: 'rss_hardware.xml',
                getInternetTenders: 'rss_internet_multimedia_marketing.xml',
                getTelecomTenders: 'rss_telekommunikation_tk.xml',
                getConsultingTenders: 'rss_schulung_beratung.xml'
            }

            const file = feedMap[ routeName ]
            if( !file ) {
                struct.status = false
                struct.messages.push( `Unknown route: ${routeName}` )

                return { struct, payload }
            }

            const url = `https://www.it-ausschreibung.de/ausschreibungen-auftraege/${file}`
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

            const tenders = raw.items
                .map( ( item ) => {
                    const idMatch = item.link ? item.link.match( /\/ausschreibung\/(\d+)\// ) : null

                    const result = {
                        id: idMatch ? idMatch[ 1 ] : null,
                        title: item.title || null,
                        description: item.description ? item.description.substring( 0, 300 ) : null,
                        url: item.link || null,
                        publishedDate: item.pubDate || null
                    }

                    return result
                } )

            struct.data = {
                tenderCount: tenders.length,
                tenders
            }

            return { struct, payload }
        }
    }
}
