import { inflateRawSync } from 'zlib'


export const schema = {
    namespace: "oeffentlichevergabe",
    name: "Oeffentliche Vergabe API",
    description: "German public procurement notice service (Bekanntmachungsservice) providing tender notices in OCDS format with buyer, title, CPV codes, and delivery location",
    docs: ["https://oeffentlichevergabe.de/documentation/swagger-ui/opendata/index.html"],
    tags: ["procurement", "germany", "tenders", "government"],
    flowMCP: "1.2.0",
    root: "https://oeffentlichevergabe.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        getNoticesByDay: {
            requestMethod: "GET",
            description: "Get all public procurement notices published on a specific day. Format: YYYY-MM-DD. Returns tender title, buyer, CPV classification, delivery location. Data available from 2022-12-01 onwards, not today or future dates.",
            route: "/api/notice-exports",
            parameters: [
                { position: { key: "pubDay", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } }
            ],
            tests: [
                { _description: "Get notices from Jan 30 2026", pubDay: "2026-01-30" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchAndUnzip" },
                { phase: "post", handlerName: "formatNotices" }
            ]
        },
        getNoticesByMonth: {
            requestMethod: "GET",
            description: "Get all public procurement notices published in a specific month. Format: YYYY-MM. Returns tender title, buyer, CPV classification, delivery location. Data available from 2022-12 onwards.",
            route: "/api/notice-exports",
            parameters: [
                { position: { key: "pubMonth", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(7)"] } }
            ],
            tests: [
                { _description: "Get notices from Dec 2025", pubMonth: "2025-12" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "fetchAndUnzip" },
                { phase: "post", handlerName: "formatNotices" }
            ]
        }
    },
    handlers: {
        fetchAndUnzip: async ( { struct, payload, userParams } ) => {
            const { pubDay, pubMonth } = userParams
            const params = new URLSearchParams()
            if( pubDay ) { params.set( 'pubDay', pubDay ) }
            if( pubMonth ) { params.set( 'pubMonth', pubMonth ) }
            params.set( 'format', 'ocds.zip' )

            const url = `https://oeffentlichevergabe.de/api/notice-exports?${params.toString()}`
            const response = await fetch( url )

            if( !response.ok ) {
                struct.status = false
                struct.messages.push( `API error: ${response.status}` )

                return { struct, payload }
            }

            const arrayBuf = await response.arrayBuffer()
            const buffer = Buffer.from( arrayBuf )

            let eocdOffset = -1
            const eocdSig = 0x06054b50
            for( let i = buffer.length - 22; i >= 0; i-- ) {
                if( buffer.readUInt32LE( i ) === eocdSig ) { eocdOffset = i; break }
            }

            if( eocdOffset === -1 ) {
                struct.data = { totalNotices: 0, notices: [] }

                return { struct, payload }
            }

            const totalEntries = buffer.readUInt16LE( eocdOffset + 10 )
            const cdOffset = buffer.readUInt32LE( eocdOffset + 16 )
            const maxEntries = Math.min( totalEntries, 50 )

            const notices = []
            let cdPos = cdOffset
            const cdSig = 0x02014b50

            Array.from( { length: maxEntries } )
                .forEach( ( _, i ) => {
                    if( cdPos >= buffer.length || buffer.readUInt32LE( cdPos ) !== cdSig ) { return }

                    const compMethod = buffer.readUInt16LE( cdPos + 10 )
                    const compSize = buffer.readUInt32LE( cdPos + 20 )
                    const nameLen = buffer.readUInt16LE( cdPos + 28 )
                    const extraLen = buffer.readUInt16LE( cdPos + 30 )
                    const commentLen = buffer.readUInt16LE( cdPos + 32 )
                    const localHeaderOffset = buffer.readUInt32LE( cdPos + 42 )

                    const localNameLen = buffer.readUInt16LE( localHeaderOffset + 26 )
                    const localExtraLen = buffer.readUInt16LE( localHeaderOffset + 28 )
                    const dataStart = localHeaderOffset + 30 + localNameLen + localExtraLen

                    try {
                        const compressed = buffer.subarray( dataStart, dataStart + compSize )
                        let content
                        if( compMethod === 8 ) {
                            content = inflateRawSync( compressed ).toString( 'utf8' )
                        } else {
                            content = compressed.toString( 'utf8' )
                        }

                        const json = JSON.parse( content )
                        notices.push( json )
                    } catch( e ) {
                        // skip malformed entries
                    }

                    cdPos += 46 + nameLen + extraLen + commentLen
                } )

            struct.data = { totalEntries, notices }

            return { struct, payload }
        },
        formatNotices: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.notices ) { return { struct, payload } }

            const formatted = raw.notices
                .map( ( notice ) => {
                    const release = notice.releases?.[ 0 ]
                    if( !release ) { return null }

                    const tender = release.tender || {}
                    const item = tender.items?.[ 0 ] || {}

                    const result = {
                        id: release.id || null,
                        title: tender.title || null,
                        description: tender.description ? tender.description.substring( 0, 200 ) : null,
                        buyer: release.buyer?.name || null,
                        cpvCode: item.classification?.id || null,
                        locality: item.deliveryAddress?.locality || null,
                        region: item.deliveryAddress?.region || null,
                        country: item.deliveryAddress?.countryName || null,
                        publishedDate: notice.publishedDate || null,
                        type: release.tag?.[ 0 ] || null
                    }

                    return result
                } )
                .filter( ( n ) => n !== null )

            struct.data = {
                totalNotices: raw.totalEntries || formatted.length,
                noticeCount: formatted.length,
                notices: formatted
            }

            return { struct, payload }
        }
    }
}
