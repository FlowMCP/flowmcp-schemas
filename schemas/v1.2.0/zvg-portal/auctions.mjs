import { GERMAN_BUNDESLAENDER } from '../_shared/germanBundeslaender.mjs'

const bundeslandEnum = 'enum(' + GERMAN_BUNDESLAENDER.map( ( b ) => b.code ).join( ',' ) + ')'


const schema = {
    namespace: 'zvgPortal',
    name: 'ZVG Portal Foreclosure Auctions',
    description: 'German foreclosure auction portal (Zwangsversteigerungsportal) for searching property auction listings across all 16 German states. Returns structured data from zvg-portal.de including auction dates, property details, valuations, and court information.',
    docs: [ 'https://www.zvg-portal.de' ],
    tags: [ 'immobilien', 'auktionen', 'justiz' , "cacheTtlDaily"],
    flowMCP: '1.2.0',
    root: 'https://www.zvg-portal.de',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchAuctions: {
            requestMethod: 'GET',
            description: 'Search foreclosure auction listings by German state (Bundesland). Supports filtering by court, city, ZIP code, street, property type, and auction type. State codes: bw=Baden-Wuerttemberg, by=Bayern, be=Berlin, br=Brandenburg, hb=Bremen, hh=Hamburg, he=Hessen, mv=Mecklenburg-Vorpommern, ni=Niedersachsen, nw=Nordrhein-Westfalen, rp=Rheinland-Pfalz, sl=Saarland, sn=Sachsen, st=Sachsen-Anhalt, sh=Schleswig-Holstein, th=Thueringen. Property types (obj_art): 1=Reihenhaus, 2=Doppelhaushälfte, 3=Einfamilienhaus, 4=Mehrfamilienhaus, 5=ETW 1-2 Zi, 6=ETW 3-4 Zi, 7=ETW 5+ Zi, 8=Gewerbeeinheit, 9=Garage, 10=Kfz-Stellplatz, 13=Wohn-/Geschäftshaus, 14=Gewerbegrundstück, 15=Baugrundstück, 16=Unbebautes Grundstück, 17=Land-/Forstwirtschaft, 18=Sonstiges. Sort (order_by): 2=Termin, 1=Aktualisierung, 3=Aktenzeichen.',
            route: '/index.php',
            parameters: [
                { position: { key: 'land_abk', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: bundeslandEnum, options: [] } },
                { position: { key: 'ger_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("0")' ] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("2")' ] } },
                { position: { key: 'plz', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'ort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'str', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'art', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'obj_art', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Search Berlin auctions', land_abk: 'be', ger_id: '0', order_by: '2' },
                { _description: 'Search Bayern auctions', land_abk: 'by', ger_id: '0', order_by: '2' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'executeSearch' }
            ]
        },
        getAuctionDetail: {
            requestMethod: 'GET',
            description: 'Get full details of a specific foreclosure auction including property description, valuation (Verkehrswert), court info, auction venue, and links to documents (Bekanntmachung, Exposee, Gutachten, photos). Use the zvg_id and land_abk from searchAuctions results.',
            route: '/index.php',
            parameters: [
                { position: { key: 'button', value: 'showZvg', location: 'query' } },
                { position: { key: 'zvg_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(1)' ] } },
                { position: { key: 'land_abk', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'min(2)', 'max(2)' ] } }
            ],
            tests: [
                { _description: 'Get Berlin auction detail', zvg_id: '14171', land_abk: 'be' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'executeDetail' }
            ]
        }
    },
    handlers: {
        _fetchHeaders: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Referer': 'https://www.zvg-portal.de/index.php?button=Suchen',
            'Accept': 'text/html,application/xhtml+xml'
        },
        _decodeEntities: ( text ) => {
            const result = text
                .replace( /&amp;/g, '&' )
                .replace( /&nbsp;/g, ' ' )
                .replace( /&szlig;/g, 'ß' )
                .replace( /&ouml;/g, 'ö' )
                .replace( /&uuml;/g, 'ü' )
                .replace( /&auml;/g, 'ä' )
                .replace( /&Ouml;/g, 'Ö' )
                .replace( /&Uuml;/g, 'Ü' )
                .replace( /&Auml;/g, 'Ä' )
                .replace( /&sup2;/g, '²' )
                .replace( /&#\d+;/g, '' )

            return result
        },
        _stripTags: ( html ) => {
            const result = html
                .replace( /<!--[\s\S]*?-->/g, '' )
                .replace( /<[^>]*>/g, '' )

            return result
        },
        executeSearch: async ( { struct, payload } ) => {
            try {
                const url = new URL( payload.url )
                const params = url.searchParams

                const formData = new URLSearchParams()
                formData.append( 'land_abk', params.get( 'land_abk' ) || '' )
                formData.append( 'ger_id', params.get( 'ger_id' ) || '0' )
                formData.append( 'ger_name', '' )
                formData.append( 'order_by', params.get( 'order_by' ) || '2' )
                formData.append( 'az1', '' )
                formData.append( 'az2', '' )
                formData.append( 'az3', '' )
                formData.append( 'az4', '' )
                formData.append( 'art', params.get( 'art' ) || '' )
                formData.append( 'obj', '' )
                formData.append( 'str', params.get( 'str' ) || '' )
                formData.append( 'hnr', '' )
                formData.append( 'plz', params.get( 'plz' ) || '' )
                formData.append( 'ort', params.get( 'ort' ) || '' )
                formData.append( 'ortsteil', '' )
                formData.append( 'vtermin', '' )
                formData.append( 'btermin', '' )

                const objArt = params.get( 'obj_art' )
                if( objArt ) {
                    formData.append( 'obj_arr[]', objArt )
                }

                const response = await fetch( 'https://www.zvg-portal.de/index.php?button=Suchen', {
                    method: 'POST',
                    headers: {
                        ...schema.handlers._fetchHeaders,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                } )

                if( !response.ok ) {
                    struct['status'] = false
                    struct['messages'].push( `HTTP ${response.status}: ${response.statusText}` )

                    return { struct, payload }
                }

                const html = await response.text()
                const { totalCount, auctions } = schema.handlers._parseSearchHTML( html )

                struct['data'] = {
                    source: 'zvg-portal.de',
                    totalCount,
                    resultCount: auctions.length,
                    auctions
                }
            } catch( error ) {
                struct['status'] = false
                struct['messages'].push( `Error searching auctions: ${error.message}` )
            }

            return { struct, payload }
        },
        executeDetail: async ( { struct, payload } ) => {
            try {
                const response = await fetch( payload.url, {
                    headers: schema.handlers._fetchHeaders
                } )

                if( !response.ok ) {
                    struct['status'] = false
                    struct['messages'].push( `HTTP ${response.status}: ${response.statusText}` )

                    return { struct, payload }
                }

                const html = await response.text()
                const url = new URL( payload.url )
                const landAbk = url.searchParams.get( 'land_abk' )
                const zvgId = url.searchParams.get( 'zvg_id' )
                const detail = schema.handlers._parseDetailHTML( html, landAbk, zvgId )

                struct['data'] = {
                    source: 'zvg-portal.de',
                    ...detail
                }
            } catch( error ) {
                struct['status'] = false
                struct['messages'].push( `Error fetching auction detail: ${error.message}` )
            }

            return { struct, payload }
        },
        _parseSearchHTML: ( html ) => {
            const countMatch = html.match( /Insgesamt\s+(\d+)/ )
            const totalCount = countMatch ? parseInt( countMatch[1], 10 ) : 0

            const blocks = html.split( /<hr[^>]*>/i )
            const auctions = []
            const decode = schema.handlers._decodeEntities
            const strip = schema.handlers._stripTags

            blocks.forEach( ( block ) => {
                if( !block.includes( 'Aktenzeichen' ) ) {
                    return
                }

                const entry = {}

                const azMatch = block.match( /<nobr>(\d{4}\s+K\s+\d{4}\/\d{4})/i )
                if( azMatch ) {
                    entry['aktenzeichen'] = azMatch[1].trim()
                }

                const linkMatch = block.match( /showZvg&zvg_id=(\d+)&land_abk=(\w+)/i )
                if( linkMatch ) {
                    entry['zvgId'] = linkMatch[1]
                    entry['landAbk'] = linkMatch[2]
                    entry['detailUrl'] = `https://www.zvg-portal.de/index.php?button=showZvg&zvg_id=${linkMatch[1]}&land_abk=${linkMatch[2]}`
                }

                const updateMatch = block.match( /letzte Aktualisierung\s+([\d-]+\s+[\d:]+)/ )
                if( updateMatch ) {
                    entry['lastUpdate'] = updateMatch[1]
                }

                const courtMatch = block.match( /Amtsgericht<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i )
                if( courtMatch ) {
                    entry['amtsgericht'] = decode( strip( courtMatch[1] ) ).trim()
                }

                const objMatch = block.match( /Objekt\/Lage<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i )
                if( objMatch ) {
                    const objText = decode( strip( objMatch[1] ) ).trim()
                    const colonIdx = objText.indexOf( ':' )
                    if( colonIdx > -1 ) {
                        entry['objektTyp'] = objText.substring( 0, colonIdx ).trim()
                        entry['lage'] = objText.substring( colonIdx + 1 ).trim()
                    } else {
                        entry['objektLage'] = objText
                    }
                }

                const wertMatch = block.match( /Verkehrswert[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i )
                if( wertMatch ) {
                    entry['verkehrswert'] = strip( wertMatch[1] ).replace( /[€\s]/g, '' ).trim()
                }

                const terminMatch = block.match( />Termin<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i )
                if( terminMatch ) {
                    const terminText = decode( strip( terminMatch[1] ) ).trim()
                    entry['termin'] = terminText
                    entry['aufgehoben'] = terminText.includes( 'aufgehoben' )
                }

                const pdfMatch = block.match( /showAnhang&land_abk=(\w+)&file_id=(\d+)&zvg_id=(\d+)/ )
                if( pdfMatch ) {
                    entry['bekanntmachungUrl'] = `https://www.zvg-portal.de/index.php?button=showAnhang&land_abk=${pdfMatch[1]}&file_id=${pdfMatch[2]}&zvg_id=${pdfMatch[3]}`
                }

                if( entry['aktenzeichen'] ) {
                    auctions.push( entry )
                }
            } )

            return { totalCount, auctions }
        },
        _parseDetailHTML: ( html, landAbk, zvgId ) => {
            const detail = {
                zvgId,
                landAbk,
                attachments: []
            }
            const decode = schema.handlers._decodeEntities
            const strip = schema.handlers._stripTags

            const azMatch = html.match( /(\d{4})&nbsp;K&nbsp;(\d{4})\/&nbsp;(\d{4})/ )
            if( azMatch ) {
                detail['aktenzeichen'] = `${azMatch[1]} K ${azMatch[2]}/${azMatch[3]}`
            }

            const updateMatch = html.match( /letzte Aktualisierung:\s*([\d-]+\s+[\d:]+)/ )
            if( updateMatch ) {
                detail['lastUpdate'] = updateMatch[1]
            }

            const tableMatch = html.match( /id=anzeige>([\s\S]*?)<\/table>/i )
            if( !tableMatch ) {
                return detail
            }

            const tableHtml = tableMatch[1]
            const rowRegex = /<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi
            const matches = [ ...tableHtml.matchAll( rowRegex ) ]

            matches.forEach( ( match ) => {
                const rawLabel = decode( strip( match[1] ) ).trim().replace( /:\s*$/, '' ).replace( /\s+/g, ' ' )
                const valueCell = match[2]
                const value = decode( strip( valueCell ) ).trim()

                const linkMatch = valueCell.match( /href="([^"]*)"[^>]*\/>([\s\S]*?)<\/a>/i )
                    || valueCell.match( /href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i )

                switch( true ) {
                    case rawLabel.includes( 'Art der Versteigerung' ):
                        detail['artDerVersteigerung'] = value
                        break
                    case rawLabel.includes( 'Grundbuch' ):
                        detail['grundbuch'] = value
                        break
                    case rawLabel.includes( 'Objekt/Lage' ): {
                        const colonIdx = value.indexOf( ':' )
                        if( colonIdx > -1 ) {
                            detail['objektTyp'] = value.substring( 0, colonIdx ).trim()
                            detail['lage'] = value.substring( colonIdx + 1 ).trim()
                        } else {
                            detail['objektLage'] = value
                        }
                        break
                    }
                    case rawLabel.includes( 'Beschreibung' ):
                        detail['beschreibung'] = value
                        break
                    case rawLabel.includes( 'Verkehrswert' ):
                        detail['verkehrswert'] = value.replace( /€/g, '' ).trim()
                        break
                    case rawLabel === 'Termin':
                        detail['termin'] = value
                        break
                    case rawLabel.includes( 'Ort der Versteigerung' ):
                        detail['ortDerVersteigerung'] = value
                        break
                    case rawLabel.includes( 'zum Gl' ):
                        detail['glaeubiger'] = value
                        break
                    case rawLabel === 'GeoServer':
                        if( linkMatch ) {
                            detail['mapsUrl'] = linkMatch[1]
                        }
                        break
                    case rawLabel.includes( 'Bekanntmachung' ):
                    case rawLabel.includes( 'Exposee' ):
                    case rawLabel.includes( 'Gutachten' ):
                    case rawLabel.includes( 'Foto' ): {
                        if( linkMatch ) {
                            const fileUrl = linkMatch[1].trim()
                            const fileName = strip( linkMatch[2] ).trim()
                            const sizeMatch = value.match( /([\d.]+)\s*kB/ )

                            detail['attachments'].push( {
                                type: rawLabel,
                                name: fileName,
                                size: sizeMatch ? `${sizeMatch[1]} kB` : null,
                                url: fileUrl.startsWith( '?' )
                                    ? `https://www.zvg-portal.de/index.php${fileUrl}`
                                    : fileUrl
                            } )
                        }
                        break
                    }
                }
            } )

            return detail
        }
    }
}


export { schema }
