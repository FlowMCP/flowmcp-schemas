export const schema = {
    namespace: 'berlinSolar',
    name: 'Berlin Solarkataster API',
    description: 'Berlin solar energy data via WFS from the Energieatlas. Provides PV installation locations, installed capacity, feed-in data, solar potential per building/district, and expansion coverage rates.',
    docs: ['https://daten.berlin.de/datensaetze/solaranlagen-photovoltaik-umweltatlas-wfs-dfb86f73', 'https://energieatlas.berlin.de/'],
    tags: ['berlin', 'solar', 'energy', 'environment', 'geodata', 'opendata', 'cacheTtlDaily'],
    flowMCP: '1.2.0',
    root: 'https://gdi.berlin.de',
    requiredServerParams: [],
    headers: {},
    routes: {
        getSolarByDistrict: {
            requestMethod: 'GET',
            description: 'Get PV installation summary per Berlin district (Bezirk). Returns number of installations, installed capacity in MWp, and city-wide totals. 12 districts total.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:f_sp08_09_1pvsummebez', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get PV summary for all Berlin districts' },
                { _description: 'Get PV summary for Mitte district', CQL_FILTER: "bezirk = 'Mitte'", COUNT: '1' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatDistrictSummary' }
            ]
        },
        getSolarByPostalCode: {
            requestMethod: 'GET',
            description: 'Get PV installation summary per postal code (PLZ). Returns number of installations, installed capacity in kWp, and city-wide totals. About 190 postal code areas.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:g_sp08_09_1pvsummeplz', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("20")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get PV summary for first 5 postal codes', COUNT: '5' },
                { _description: 'Get PV summary for postal code 10115', CQL_FILTER: "plz = '10115'", COUNT: '1' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatPostalCodeSummary' }
            ]
        },
        getLargePvInstallations: {
            requestMethod: 'GET',
            description: 'Get individual large PV installations (over 30 kWp) in Berlin. Returns address, installed capacity, number of modules, orientation, feed-in type, and commissioning date. About 1900 installations.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:a_sp08_09_1pvstandgr30kw', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("20")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get first 5 large PV installations', COUNT: '5' },
                { _description: 'Get large PV installations in postal code 12489', CQL_FILTER: "plz = '12489'", COUNT: '5' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatLargeInstallations' }
            ]
        },
        getPublicPvInstallations: {
            requestMethod: 'GET',
            description: 'Get PV installations on public institution buildings in Berlin. Returns address, capacity, institution name, operator, contract type, green roof status, and commissioning year. About 1000 installations.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:c_sp08_09_1pvstand_oeh', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("20")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get first 5 public PV installations', COUNT: '5' },
                { _description: 'Get public PV installations in postal code 10115', CQL_FILTER: "plz = '10115'", COUNT: '5' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatPublicInstallations' }
            ]
        },
        getSolarPotentialByDistrict: {
            requestMethod: 'GET',
            description: 'Get theoretical PV potential per Berlin district. Returns total buildings, heritage building share, suitable roof area in million m2, and PV potential in MWp. 12 districts.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:m_sp_08_09_1solarpv_pot_bez', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get PV potential for all Berlin districts' },
                { _description: 'Get PV potential for Mitte', CQL_FILTER: "bezirk = 'Mitte'", COUNT: '1' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatSolarPotential' }
            ]
        },
        getPvCoverageByDistrict: {
            requestMethod: 'GET',
            description: 'Get PV expansion coverage rate per Berlin district. Compares installed capacity against theoretical potential and shows the percentage of untapped solar potential. 12 districts.',
            route: '/services/wfs/ua_solaranlagen_pv',
            parameters: [
                { position: { key: 'SERVICE', value: 'WFS', location: 'query' } },
                { position: { key: 'REQUEST', value: 'GetFeature', location: 'query' } },
                { position: { key: 'VERSION', value: '2.0.0', location: 'query' } },
                { position: { key: 'TYPENAMES', value: 'ua_solaranlagen_pv:l_sp_08_09_01_pvdeckungbez', location: 'query' } },
                { position: { key: 'OUTPUTFORMAT', value: 'application/json', location: 'query' } },
                { position: { key: 'SRSNAME', value: 'EPSG:4326', location: 'query' } },
                { position: { key: 'COUNT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default("12")', 'optional()'] } },
                { position: { key: 'CQL_FILTER', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get PV coverage rate for all Berlin districts' },
                { _description: 'Get PV coverage rate for Mitte', CQL_FILTER: "bezirk = 'Mitte'", COUNT: '1' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatPvCoverage' }
            ]
        }
    },
    handlers: {
        formatDistrictSummary: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const districts = raw.features
                .map( ( feature ) => {
                    const { properties } = feature
                    const result = {
                        district: properties.bezirk,
                        installationCount: properties.anzahl,
                        installedCapacityMWp: properties.inst_leistung,
                        cityTotalCount: properties.stadt_ges_anzahl,
                        cityTotalCapacityMWp: properties.stadt_ges_inst_leistung
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: districts.length,
                districts
            }

            return { struct, payload }
        },
        formatPostalCodeSummary: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const postalCodes = raw.features
                .map( ( feature ) => {
                    const { properties } = feature
                    const result = {
                        postalCode: properties.plz,
                        installationCount: properties.anzahl,
                        installedCapacityKWp: properties.inst_leistung,
                        cityTotalCount: properties.stadt_ges_anzahl,
                        cityTotalCapacityMWp: properties.stadt_ges_inst_leistung
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: postalCodes.length,
                postalCodes
            }

            return { struct, payload }
        },
        formatLargeInstallations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const installations = raw.features
                .map( ( feature ) => {
                    const { properties, geometry } = feature
                    const coords = geometry?.coordinates?.[0] || []
                    const result = {
                        address: ( properties.strasse_flur_lang || '' ).trim(),
                        postalCode: properties.plz,
                        city: properties.ort_gemark,
                        installedCapacityKWp: properties.inst_leistung,
                        moduleCount: properties.enh_anzahlmodule,
                        orientation: properties.enh_hauptausrichtung,
                        feedInType: properties.enh_einspeisungsart,
                        commissioningDate: properties.inbetriebnahme,
                        longitude: coords[0] || null,
                        latitude: coords[1] || null
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: installations.length,
                installations
            }

            return { struct, payload }
        },
        formatPublicInstallations: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const installations = raw.features
                .map( ( feature ) => {
                    const { properties, geometry } = feature
                    const coords = geometry?.coordinates?.[0] || []
                    const result = {
                        address: ( properties.strasse_flur_lang || '' ).trim(),
                        postalCode: properties.plz,
                        city: properties.ort_gemark,
                        installedCapacityKWp: properties.inst_leistung,
                        commissioningYear: properties.inbetriebnahme,
                        institution: properties.institution,
                        operator: properties.anlagenbetreiber,
                        orientation: properties.hauptausrichtung,
                        feedInType: properties.einspeisungsart,
                        moduleCount: properties.anzahl_der_module,
                        operatingStatus: properties.betriebsstatus,
                        contractType: properties.vertragstyp,
                        greenRoof: properties.gruendach
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: installations.length,
                installations
            }

            return { struct, payload }
        },
        formatSolarPotential: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const districts = raw.features
                .map( ( feature ) => {
                    const { properties } = feature
                    const result = {
                        district: properties.bezirk,
                        totalBuildings: properties.gebaeude_gesamt,
                        heritageSharePercent: properties.denkmal_anteil_prozent,
                        eligibleBuildings: properties.gebaeude_anzahl_ohnedenkmal,
                        grossRoofAreaMillionM2: properties.brutto_dachfl_mio_m2,
                        suitableAreaMillionM2: properties.eignungsflaeche_mio_m2,
                        pvPotentialMWp: properties.pv_potential_mwp
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: districts.length,
                districts
            }

            return { struct, payload }
        },
        formatPvCoverage: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || !Array.isArray( raw.features ) ) { return { struct, payload } }

            const districts = raw.features
                .map( ( feature ) => {
                    const { properties } = feature
                    const result = {
                        district: properties.bezirk,
                        potentialKWp: properties.leist_potenzial,
                        installedKWp: properties.leist_bestand,
                        untappedPotentialKWp: properties.leist_potenzial_ungenutzt,
                        expansionRatePercent: properties.ausbau_proz
                    }

                    return result
                } )

            struct.data = {
                totalFeatures: raw.totalFeatures || 0,
                returnedCount: districts.length,
                districts
            }

            return { struct, payload }
        }
    }
}
