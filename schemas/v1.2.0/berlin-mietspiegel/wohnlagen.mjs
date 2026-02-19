export const schema = {
    namespace: 'berlinMietspiegel',
    name: 'Berlin Mietspiegel Wohnlagen API',
    description: 'Berlin residential area classifications (Wohnlagen) for the Mietspiegel 2024 via WFS. Provides address-level quality ratings (einfach/mittel/gut) for all Berlin addresses.',
    docs: ['https://daten.berlin.de/datensaetze/wohnlagen-nach-adressen-zum-berliner-mietspiegel-2024-wfs-eddbff85'],
    tags: ['berlin', 'housing', 'geodata', 'opendata', 'cacheTtlDaily'],
    flowMCP: '1.2.0',
    root: 'https://gdi.berlin.de',
    requiredServerParams: [],
    headers: {},
    routes: {
        getWohnlagen: {
            requestMethod: 'GET',
            description: 'Get residential area classifications for Berlin addresses. Filter by bounding box, district, street, postal code, or Wohnlage category. Returns address, classification, district, and coordinates.',
            route: '/services/wfs/wohnlagenadr2024',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'wohnlagenadr2024', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("50")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'BBOX', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get Wohnlagen in Berlin Mitte area', BBOX: '13.37,52.51,13.42,52.53,EPSG:4326', COUNT: '5' },
                { _description: 'Get addresses with Wohnlage gut in Mitte', CQL_FILTER: "bezname = 'Mitte' AND wol = 'gut'", COUNT: '5' },
                { _description: 'Get Wohnlagen on Unter den Linden', CQL_FILTER: "strasse = 'Unter den Linden'", COUNT: '5' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatWohnlagen' }
            ]
        },
        getWohnlageByAddress: {
            requestMethod: 'GET',
            description: 'Get the Wohnlage classification for a specific Berlin address. Provide street name and house number (zero-padded to 3 digits, e.g. 001, 012, 077). Returns einfach, mittel, or gut.',
            route: '/services/wfs/wohnlagenadr2024',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'wohnlagenadr2024', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get Wohnlage for Unter den Linden 77', CQL_FILTER: "strasse = 'Unter den Linden' AND hnr = '077'" },
                { _description: 'Get Wohnlage for Aachener Strasse 1', CQL_FILTER: "strasse = 'Aachener Straße' AND hnr = '001'" }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatWohnlagen' }
            ]
        }
    },
    handlers: {
        formatWohnlagen: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const addresses = raw.features
                .map( ( feature ) => {
                    const { properties, geometry } = feature
                    const result = {
                        strasse: properties.strasse,
                        hausnummer: properties.hnr,
                        plz: properties.plz,
                        bezirk: properties.bezname,
                        stadtteil: properties.stadtteil,
                        planungsraum: properties.plr_name,
                        wohnlage: properties.wol,
                        longitude: geometry?.coordinates?.[0] || null,
                        latitude: geometry?.coordinates?.[1] || null
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: addresses.length,
                addresses
            }

            return { struct, payload }
        }
    }
}
