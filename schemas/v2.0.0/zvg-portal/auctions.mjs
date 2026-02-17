// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Namespace: "zvgPortal" -> "zvgportal"
// Import: import { GERMAN_BUNDESLAENDER } from '../_shared/germanBundeslaender.mjs'
// Module-level code: 1 lines

export const main = {
    namespace: 'zvgportal',
    name: 'ZVG Portal Foreclosure Auctions',
    description: 'German foreclosure auction portal (Zwangsversteigerungsportal) for searching property auction listings across all 16 German states. Returns structured data from zvg-portal.de including auction dates, property details, valuations, and court information.',
    version: '2.0.0',
    docs: ['https://www.zvg-portal.de'],
    tags: ['immobilien', 'auktionen', 'justiz', 'cacheTtlDaily'],
    sharedLists: [
        { ref: 'germanBundeslaender', version: '2.0.0' }
    ],
    root: 'https://www.zvg-portal.de',
    routes: {
        searchAuctions: {
            method: 'GET',
            path: '/index.php',
            description: 'Search foreclosure auction listings by German state (Bundesland). Supports filtering by court, city, ZIP code, street, property type, and auction type. State codes: bw=Baden-Wuerttemberg, by=Bayern, be=Berlin, br=Brandenburg, hb=Bremen, hh=Hamburg, he=Hessen, mv=Mecklenburg-Vorpommern, ni=Niedersachsen, nw=Nordrhein-Westfalen, rp=Rheinland-Pfalz, sl=Saarland, sn=Sachsen, st=Sachsen-Anhalt, sh=Schleswig-Holstein, th=Thueringen. Property types (obj_art): 1=Reihenhaus, 2=Doppelhaushälfte, 3=Einfamilienhaus, 4=Mehrfamilienhaus, 5=ETW 1-2 Zi, 6=ETW 3-4 Zi, 7=ETW 5+ Zi, 8=Gewerbeeinheit, 9=Garage, 10=Kfz-Stellplatz, 13=Wohn-/Geschäftshaus, 14=Gewerbegrundstück, 15=Baugrundstück, 16=Unbebautes Grundstück, 17=Land-/Forstwirtschaft, 18=Sonstiges. Sort (order_by): 2=Termin, 1=Aktualisierung, 3=Aktenzeichen.',
            parameters: [
                { position: { key: 'land_abk', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(bw,by,be,br,hb,hh,he,mv,ni,nw,rp,sl,sn,st,sh,th)', options: [] } },
                { position: { key: 'ger_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("0")'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("2")'] } },
                { position: { key: 'plz', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'str', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'art', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'obj_art', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getAuctionDetail: {
            method: 'GET',
            path: '/index.php?button=showZvg',
            description: 'Get full details of a specific foreclosure auction including property description, valuation (Verkehrswert), court info, auction venue, and links to documents (Bekanntmachung, Exposee, Gutachten, photos). Use the zvg_id and land_abk from searchAuctions results.',
            parameters: [
                { position: { key: 'zvg_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'land_abk', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(2)', 'max(2)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const GERMAN_BUNDESLAENDER = sharedLists['germanBundeslaender']

    const bundeslandEnum = 'enum(' + GERMAN_BUNDESLAENDER.map( ( b ) => b.code ).join( ',' ) + ')'

    return {
        searchAuctions: {
            executeRequest: async ( { struct, payload } ) => {
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

                return { struct }}

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

                return { struct }
            }
        },
        getAuctionDetail: {
            executeRequest: async ( { struct, payload } ) => {
                try {
                const response = await fetch( payload.url, {
                headers: schema.handlers._fetchHeaders
                } )

                if( !response.ok ) {
                struct['status'] = false
                struct['messages'].push( `HTTP ${response.status}: ${response.statusText}` )

                return { struct }}

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

                return { struct }
            }
        }
    }
}
