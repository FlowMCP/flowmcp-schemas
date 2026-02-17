// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'vag',
    name: 'VAG Nuernberg Transit API',
    description: 'Real-time public transit data for Nuremberg (VAG) including stops, departures, and service information for buses, trams, and subway',
    version: '2.0.0',
    docs: ['https://bundesapi.github.io/vag-api/'],
    tags: ['transit', 'germany', 'realtime', 'nuremberg', 'cacheTtlStatic'],
    root: 'https://start.vag.de/dm/api/v1',
    routes: {
        getStops: {
            method: 'GET',
            path: '/haltestellen.json/VGN',
            description: 'Get all public transit stops in the Nuremberg VGN network. Returns stop name, coordinates, and available transport modes.',
            parameters: []
        },
        getDepartures: {
            method: 'GET',
            path: '/abfahrten.json/VGN/:stopId',
            description: 'Get real-time departures for a specific stop. Use VGN stop ID from getStops. Returns line, direction, scheduled and actual departure times.',
            parameters: [
                { position: { key: 'stopId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['default("510")'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getStops: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.Haltestellen ) { return { response }}

            const stops = raw.Haltestellen
            .map( ( stop ) => {
            const result = {
            name: stop.Haltestellenname,
            vagId: stop.VAGKennung,
            vgnId: stop.VGNKennung,
            longitude: stop.Longitude,
            latitude: stop.Latitude,
            products: stop.Produkte
            }

            return result
            } )

            response = {
            stopCount: stops.length,
            stops
            }

            return { response }
        }
    },
    getDepartures: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.Abfahrten ) { return { response }}

            const departures = raw.Abfahrten
            .map( ( dep ) => {
            const result = {
            line: dep.Linienname,
            direction: dep.Richtungstext,
            scheduledTime: dep.AbfahrtszeitSoll,
            actualTime: dep.AbfahrtszeitIst,
            product: dep.Produkt,
            platform: dep.HaltesteigText || null,
            delay: dep.Prognose === true
            }

            return result
            } )

            response = {
            stopName: raw.Haltestellenname || null,
            departureCount: departures.length,
            departures,
            serviceInfo: raw.Sonderinformationen || []
            }

            return { response }
        }
    }
} )
