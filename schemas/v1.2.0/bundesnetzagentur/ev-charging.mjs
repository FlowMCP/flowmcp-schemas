export const schema = {
    namespace: "bundesnetzagentur",
    name: "Bundesnetzagentur EV Charging API",
    description: "German Federal Network Agency (Bundesnetzagentur) EV charging station registry providing station locations, operators, connector types, and power ratings via ArcGIS FeatureServer",
    docs: ["https://ladestationen.api.bund.dev/", "https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/E-Mobilitaet/start.html"],
    tags: ["ev", "charging", "germany", "infrastructure", "energy", "mobility", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Ladesaeulen_in_Deutschland/FeatureServer/0",
    requiredServerParams: [],
    headers: {},
    routes: {
        getStations: {
            requestMethod: "GET",
            description: "Query EV charging stations with optional limit. Returns station name, operator, address, connector types, and power rating. Maximum 2000 results per request.",
            route: "/query",
            parameters: [
                { position: { key: "where", value: "1=1", location: "query" } },
                { position: { key: "outFields", value: "*", location: "query" } },
                { position: { key: "outSR", value: "4326", location: "query" } },
                { position: { key: "f", value: "json", location: "query" } },
                { position: { key: "resultRecordCount", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(2000)", "default(20)"] } },
                { position: { key: "resultOffset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Get first 5 charging stations", resultRecordCount: 5 },
                { _description: "Get stations with offset", resultRecordCount: 3, resultOffset: 10 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatStations" }
            ]
        },
        getStationById: {
            requestMethod: "GET",
            description: "Get a single charging station by its OBJECTID. Returns full station details including all connector types and power ratings.",
            route: "/query",
            parameters: [
                { position: { key: "where", value: "1=1", location: "query" } },
                { position: { key: "outFields", value: "*", location: "query" } },
                { position: { key: "outSR", value: "4326", location: "query" } },
                { position: { key: "f", value: "json", location: "query" } },
                { position: { key: "objectId", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get charging station with OBJECTID 1", objectId: 1 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildWhereById" },
                { phase: "post", handlerName: "formatStationDetail" }
            ]
        },
        getStationsByCity: {
            requestMethod: "GET",
            description: "Get charging stations filtered by city name or postal code (PLZ). Use city for city name filter, plz for postal code filter. At least one must be provided.",
            route: "/query",
            parameters: [
                { position: { key: "where", value: "1=1", location: "query" } },
                { position: { key: "outFields", value: "*", location: "query" } },
                { position: { key: "outSR", value: "4326", location: "query" } },
                { position: { key: "f", value: "json", location: "query" } },
                { position: { key: "resultRecordCount", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(2000)", "default(50)"] } },
                { position: { key: "city", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "plz", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get charging stations in Berlin", city: "Berlin", resultRecordCount: 5 },
                { _description: "Get charging stations by PLZ 10115", plz: "10115", resultRecordCount: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildWhereByCity" },
                { phase: "post", handlerName: "formatStations" }
            ]
        },
        getStationsByRadius: {
            requestMethod: "GET",
            description: "Find charging stations within a radius around a geographic point. Coordinates in WGS84 (latitude/longitude). Radius in meters.",
            route: "/query",
            parameters: [
                { position: { key: "where", value: "1=1", location: "query" } },
                { position: { key: "outFields", value: "*", location: "query" } },
                { position: { key: "outSR", value: "4326", location: "query" } },
                { position: { key: "f", value: "json", location: "query" } },
                { position: { key: "geometryType", value: "esriGeometryPoint", location: "query" } },
                { position: { key: "spatialRel", value: "esriSpatialRelIntersects", location: "query" } },
                { position: { key: "inSR", value: "4326", location: "query" } },
                { position: { key: "units", value: "esriSRUnit_Meter", location: "query" } },
                { position: { key: "latitude", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(47)", "max(56)"] } },
                { position: { key: "longitude", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(5)", "max(16)"] } },
                { position: { key: "distance", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(100)", "max(50000)", "default(5000)"] } },
                { position: { key: "resultRecordCount", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(2000)", "default(20)"] } }
            ],
            tests: [
                { _description: "Get stations within 2km of Berlin center", latitude: 52.52, longitude: 13.405, distance: 2000, resultRecordCount: 5 },
                { _description: "Get stations within 5km of Munich center", latitude: 48.137, longitude: 11.576, distance: 5000, resultRecordCount: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildGeometryQuery" },
                { phase: "post", handlerName: "formatStations" }
            ]
        }
    },
    handlers: {
        buildWhereById: async ( { struct, payload } ) => {
            const { userParams } = payload
            const id = userParams?.objectId
            if( id !== undefined ) {
                const url = new URL( payload.url )
                url.searchParams.set( 'where', `OBJECTID=${id}` )
                url.searchParams.delete( 'objectId' )
                payload.url = url.toString()
            }

            return { struct, payload }
        },
        buildWhereByCity: async ( { struct, payload } ) => {
            const { userParams } = payload
            const { city, plz } = userParams || {}

            const conditions = []
            if( city ) { conditions.push( `Ort='${city}'` ) }
            if( plz ) { conditions.push( `Postleitzahl='${plz}'` ) }

            const whereClause = conditions.length > 0
                ? conditions.join( ' AND ' )
                : '1=1'

            const url = new URL( payload.url )
            url.searchParams.set( 'where', whereClause )
            url.searchParams.delete( 'city' )
            url.searchParams.delete( 'plz' )
            payload.url = url.toString()

            return { struct, payload }
        },
        buildGeometryQuery: async ( { struct, payload } ) => {
            const { userParams } = payload
            const { latitude, longitude } = userParams || {}

            if( latitude !== undefined && longitude !== undefined ) {
                const geometry = JSON.stringify( { x: longitude, y: latitude } )

                const url = new URL( payload.url )
                url.searchParams.set( 'geometry', geometry )
                url.searchParams.delete( 'latitude' )
                url.searchParams.delete( 'longitude' )
                payload.url = url.toString()
            }

            return { struct, payload }
        },
        formatStations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.features ) { return { struct, payload } }

            const stations = raw.features
                .map( ( feature ) => {
                    const a = feature.attributes
                    const connectors = buildConnectors( a )

                    const result = {
                        objectId: a.OBJECTID,
                        stationId: a.Ladeeinrichtungs_ID,
                        name: a.Anzeigename__Karte_ || a.Betreiber,
                        operator: a.Betreiber,
                        status: a.Status,
                        type: a.Art_der_Ladeeinrichtung,
                        chargingPoints: a.Anzahl_Ladepunkte,
                        totalPowerKw: a.Nennleistung_Ladeeinrichtung__k,
                        commissionedDate: a.Inbetriebnahmedatum ? new Date( a.Inbetriebnahmedatum ).toISOString().split( 'T' )[ 0 ] : null,
                        address: {
                            street: a['Straße'],
                            houseNumber: a.Hausnummer,
                            postalCode: a.Postleitzahl,
                            city: a.Ort,
                            district: a.Kreis_kreisfreie_Stadt,
                            state: a.Bundesland
                        },
                        coordinates: {
                            latitude: a.Breitengrad,
                            longitude: a['Längengrad']
                        },
                        paymentSystems: a.Bezahlsysteme || null,
                        openingHours: a['Öffnungszeiten'] || null,
                        connectors
                    }

                    return result
                } )

            struct.data = {
                stationCount: stations.length,
                stations
            }

            return { struct, payload }
        },
        formatStationDetail: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.features || raw.features.length === 0 ) { return { struct, payload } }

            const feature = raw.features[ 0 ]
            const a = feature.attributes
            const connectors = buildConnectors( a )

            struct.data = {
                objectId: a.OBJECTID,
                stationId: a.Ladeeinrichtungs_ID,
                name: a.Anzeigename__Karte_ || a.Betreiber,
                operator: a.Betreiber,
                status: a.Status,
                type: a.Art_der_Ladeeinrichtung,
                chargingPoints: a.Anzahl_Ladepunkte,
                totalPowerKw: a.Nennleistung_Ladeeinrichtung__k,
                commissionedDate: a.Inbetriebnahmedatum ? new Date( a.Inbetriebnahmedatum ).toISOString().split( 'T' )[ 0 ] : null,
                address: {
                    street: a['Straße'],
                    houseNumber: a.Hausnummer,
                    additionalInfo: a.Adresszusatz || null,
                    postalCode: a.Postleitzahl,
                    city: a.Ort,
                    district: a.Kreis_kreisfreie_Stadt,
                    state: a.Bundesland
                },
                coordinates: {
                    latitude: a.Breitengrad,
                    longitude: a['Längengrad']
                },
                locationDescription: a.Standortbezeichnung || null,
                parkingInfo: a.Informationen_zum_Parkraum || null,
                paymentSystems: a.Bezahlsysteme || null,
                openingHours: a['Öffnungszeiten'] || null,
                openingDays: a['Öffnungszeiten__Wochentage'] || null,
                openingTimes: a['Öffnungszeiten__Tageszeiten'] || null,
                connectors
            }

            return { struct, payload }
        }
    }
}


function buildConnectors( attributes ) {
    const connectors = []
    const indices = [ 1, 2, 3, 4, 5, 6 ]

    indices
        .forEach( ( i ) => {
            const connectorType = attributes[ `Steckertypen${i}` ]
            if( !connectorType ) { return }

            const connector = {
                slot: i,
                type: connectorType,
                powerKw: attributes[ `Nennleistung_Stecker${i}` ] || null,
                evseId: attributes[ `EVSE_ID${i}` ] || null
            }

            connectors.push( connector )
        } )

    return connectors
}
