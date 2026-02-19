import { GERMAN_BUNDESLAENDER } from '../_shared/germanBundeslaender.mjs'

const bundeslandEnum = 'enum(' + GERMAN_BUNDESLAENDER.map( ( b ) => b.code ).join( ',' ) + ')'


export const schema = {
    namespace: "zvgPortal",
    name: "ZVG Portal Zwangsversteigerungen",
    description: "Search German foreclosure auctions (Zwangsversteigerungen) from the official ZVG portal of German courts",
    docs: ["https://www.zvg-portal.de"],
    tags: ["immobilien", "auktionen", "justiz", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://www.zvg-portal.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        searchAuctions: {
            requestMethod: "POST",
            description: "Search for foreclosure auctions by federal state, court, property type, location, and date range",
            route: "/index.php?button=Suchen",
            parameters: [
                { position: { key: "land_abk", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: bundeslandEnum, options: [] } },
                { position: { key: "ger_id", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["default(0)", "optional()"] } },
                { position: { key: "art", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(-1,0,1,2,3,4,5,6,7,8)", options: ["optional()"] } },
                { position: { key: "obj_arr", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19)", options: ["optional()"] } },
                { position: { key: "plz", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "ort", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "ortsteil", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "str", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "vtermin", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "btermin", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "order_by", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(1,2,3)", options: ["default(2)", "optional()"] } }
            ],
            tests: [
                { _description: "Search auctions in Berlin", land_abk: "be" },
                { _description: "Search auctions in Bavaria", land_abk: "by" },
                { _description: "Search auctions in NRW", land_abk: "nw" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "executeSearch" }
            ]
        }
    },
    handlers: {
        executeSearch: async ( { struct, payload } ) => {
            try {
                const url = new URL( payload.url )
                const bodyParams = payload.options?.body || {}

                const formData = new URLSearchParams()
                formData.append( 'ession', '' )
                formData.append( 'cmd', 'suchen' )

                Object.entries( bodyParams )
                    .forEach( ( [ key, value ] ) => {
                        const formKey = key === 'obj_arr' ? 'obj_arr[]' : key
                        formData.append( formKey, String( value ) )
                    } )

                const response = await fetch( url.toString(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': 'Mozilla/5.0 (compatible; FlowMCP/1.0)'
                    },
                    body: formData.toString()
                } )

                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                    return { struct, payload }
                }

                const html = await response.text()

                const auctions = []
                const rowRegex = /<tr[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/tr>/gi
                const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
                const rows = html.match( rowRegex ) || []

                rows
                    .forEach( ( row ) => {
                        const cells = []
                        let cellMatch = cellRegex.exec( row )

                        const resetRegex = () => {
                            cellRegex.lastIndex = 0
                        }

                        resetRegex()
                        cellMatch = cellRegex.exec( row )

                        const extractCells = () => {
                            const maxCells = 20
                            let count = 0

                            cellRegex.lastIndex = 0
                            let m = cellRegex.exec( row )

                            const loop = () => {
                                if( !m || count >= maxCells ) { return }
                                const text = m[1].replace( /<[^>]*>/g, '' ).trim()
                                cells.push( text )
                                count = count + 1
                                m = cellRegex.exec( row )
                                loop()
                            }

                            loop()
                        }

                        extractCells()

                        if( cells.length >= 4 ) {
                            const auction = {
                                aktenzeichen: cells[0] || '',
                                amtsgericht: cells[1] || '',
                                objekt: cells[2] || '',
                                termin: cells[3] || '',
                                verkehrswert: cells[4] || ''
                            }

                            auctions.push( auction )
                        }
                    } )

                struct.data = {
                    source: "ZVG Portal - Zwangsversteigerungen",
                    resultCount: auctions.length,
                    auctions
                }

            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error fetching auction data: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
