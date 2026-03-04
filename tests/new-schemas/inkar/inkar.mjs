export const main = {
    namespace: 'inkar',
    name: 'INKAR Regional Indicators',
    description: 'Access German regional statistics from INKAR (Indikatoren und Karten zur Raum- und Stadtentwicklung) by BBSR. Query 600+ indicators across unemployment, housing, demographics, economy, education, health, and more for all German states (Bundeslaender), districts (Kreise), and municipalities (Gemeinden). Free, no API key required.',
    version: '2.0.0',
    docs: ['https://www.inkar.de/'],
    tags: ['statistics', 'germany', 'opendata', 'demographics', 'cacheTtlDaily'],
    root: 'https://www.inkar.de',
    requiredServerParams: [],
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    routes: {
        listCategories: {
            method: 'POST',
            path: '/Wizard/GetBereiche',
            description: 'List all 48 indicator categories (Bereiche) such as Arbeitslosigkeit, Bauen und Wohnen, Bevoelkerung, Bildung, Einkommen, Gesundheit, etc. Each category has subcategories and indicator counts. Use category IDs with getIndicatorsByCategory.',
            parameters: [],
            tests: [
                { _description: 'List all INKAR indicator categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Bereiche: { type: 'array', items: { type: 'object', properties: { ID: { type: 'string' }, Bereich: { type: 'string' }, Unterbereich: { type: 'string' }, Anzahl: { type: 'string' } } } } } }
            }
        },
        getIndicatorsByCategory: {
            method: 'POST',
            path: '/Wizard/GetIndikatorenZuBereich',
            description: 'List all indicators within a category. Category IDs: 011=Arbeitslosigkeit Allgemein, 021=Bauen und Wohnen, 031=Beschaeftigung, 041=Bevoelkerung Alter, 042=Bevoelkerung Struktur, 051=Bildung, 060=Einkommen, 071=Erreichbarkeit, 081=Finanzen, 090=Flaechennutzung, 100=Gesundheit, 110=Gleichwertigkeit, 121=Siedlungsstruktur, 131=Soziales, 140=Umwelt, 150=Verkehr, 160=Wirtschaft, 171=Zentrale Orte. Returns Gruppe IDs needed for data queries.',
            parameters: [
                { position: { key: 'bereichsID', value: '{{CATEGORY_ID}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'wiz', value: '{{WIZ}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()', 'default()'] } }
            ],
            tests: [
                { _description: 'List unemployment indicators', bereichsID: '011', wiz: '' },
                { _description: 'List population indicators', bereichsID: '041', wiz: '' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Indikatoren: { type: 'array', items: { type: 'object', properties: { KurznamePlus: { type: 'string' }, Bereich: { type: 'string' }, Gruppe: { type: 'string' }, BU: { type: 'string' }, Zeitreihe: { type: 'string' } } } } } }
            }
        },
        searchIndicators: {
            method: 'POST',
            path: '/Wizard/SearchIndicators',
            description: 'Search for indicators by keyword. Returns matching category (Bereich) and group (Gruppe) IDs. Use extended=true for broader search including descriptions.',
            parameters: [
                { position: { key: 'text', value: '{{SEARCH_TEXT}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'extended', value: '{{EXTENDED}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for unemployment indicators', text: 'Arbeitslosenquote', extended: false },
                { _description: 'Search for population indicators (extended)', text: 'Bevoelkerung', extended: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Search: { type: 'array', items: { type: 'object', properties: { Bereich: { type: 'string' }, Gruppe: { type: 'string' } } } } } }
            }
        },
        getIndicatorInfo: {
            method: 'GET',
            path: '/Wizard/GetIndikatorInfo/:gruppeId',
            description: 'Get detailed information about a specific indicator by its Gruppe ID. Returns full name, short name, algorithm/formula, data source, and notes. Gruppe IDs come from getIndicatorsByCategory or searchIndicators.',
            parameters: [
                { position: { key: 'gruppeId', value: '{{GRUPPE_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Arbeitslosenquote info (Gruppe 12)', gruppeId: '12' },
                { _description: 'Get Bodenflaeche info (Gruppe 1)', gruppeId: '1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Info: { type: 'array', items: { type: 'object', properties: { Name: { type: 'string' }, Kurzname: { type: 'string' }, Algorithmus: { type: 'string' }, Quelle: { type: 'string' }, Anmerkungen: { type: 'string' }, ID: { type: 'string' } } } } } }
            }
        },
        getTimePeriods: {
            method: 'GET',
            path: '/Table/GetZeiten',
            description: 'List all available time periods for data queries. Returns IDs and labels from 1980 to present, plus multi-year ranges (e.g. 2012-2017). Use these time IDs in the getData route.',
            parameters: [],
            tests: [
                { _description: 'List all available time periods' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Zeiten: { type: 'array', items: { type: 'object', properties: { ID: { type: 'string' }, Name: { type: 'string' } } } } } }
            }
        },
        getData: {
            method: 'POST',
            path: '/Table/GetDataTable',
            description: 'Query actual indicator data. Provide a Gruppe ID (from getIndicatorsByCategory), time period (year like 2022), and spatial level (BL=Bundeslaender, KRE=Kreise, GVB=Gemeindeverbaende). The handler constructs the required WizardSelections JSON. Returns values per region. Key Gruppe IDs: 12=Arbeitslosenquote, 1=Bodenflaeche, 547=BIP je Einwohner.',
            parameters: [
                { position: { key: 'gruppe', value: '{{GRUPPE}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()', 'default(12)'] } },
                { position: { key: 'time', value: '{{TIME}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()', 'default(2022)'] } },
                { position: { key: 'level', value: '{{LEVEL}}', location: 'body' }, z: { primitive: 'enum(BU,BL,KRE,GVB,GEM,ROR,N2)', options: ['optional()', 'default(BL)'] } }
            ],
            tests: [
                { _description: 'Arbeitslosenquote 2022 all states', gruppe: '12', time: '2022', level: 'BL' },
                { _description: 'Bodenflaeche 2022 all states', gruppe: '1', time: '2022', level: 'BL' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Daten: { type: 'array', items: { type: 'object', properties: { Schluessel: { type: 'string' }, Raumbezug: { type: 'string' }, ZeitID: { type: 'string' }, Indikator: { type: 'string' }, Wert: { type: 'number' }, ID: { type: 'string' } } } } } }
            }
        },
        getRegions: {
            method: 'POST',
            path: '/Table/GetGebiete',
            description: 'Get the list of regions/areas for a spatial level. Returns region keys (Schluessel), names, aggregate level, and spatial reference type. Levels: BL=16 Bundeslaender, KRE=~400 Kreise, GVB=Gemeindeverbaende, GEM=Gemeinden.',
            parameters: [
                { position: { key: 'level', value: '{{LEVEL}}', location: 'body' }, z: { primitive: 'enum(BU,BL,KRE,GVB,GEM,ROR,N2)', options: ['optional()', 'default(BL)'] } }
            ],
            tests: [
                { _description: 'Get all Bundeslaender', level: 'BL' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { Gebiete: { type: 'array', items: { type: 'object', properties: { Schluessel: { type: 'string' }, Name: { type: 'string' }, Aggregat: { type: 'string' }, Raumbezug: { type: 'string' } } } } } }
            }
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {
    const BUNDESLAENDER = [
        { level: 'BL', key: '01', name: 'Schleswig-Holstein' },
        { level: 'BL', key: '02', name: 'Hamburg' },
        { level: 'BL', key: '03', name: 'Niedersachsen' },
        { level: 'BL', key: '04', name: 'Bremen' },
        { level: 'BL', key: '05', name: 'Nordrhein-Westfalen' },
        { level: 'BL', key: '06', name: 'Hessen' },
        { level: 'BL', key: '07', name: 'Rheinland-Pfalz' },
        { level: 'BL', key: '08', name: 'Baden-Wuerttemberg' },
        { level: 'BL', key: '09', name: 'Bayern' },
        { level: 'BL', key: '10', name: 'Saarland' },
        { level: 'BL', key: '11', name: 'Berlin' },
        { level: 'BL', key: '12', name: 'Brandenburg' },
        { level: 'BL', key: '13', name: 'Mecklenburg-Vorpommern' },
        { level: 'BL', key: '14', name: 'Sachsen' },
        { level: 'BL', key: '15', name: 'Sachsen-Anhalt' },
        { level: 'BL', key: '16', name: 'Thueringen' }
    ]

    const buildMinimalWiz = () => {
        const wiz = {
            IndicatorCollection: [],
            TimeCollection: [],
            SpaceCollection: [],
            Title: '',
            pageorder: 1,
            currentpage: 0,
            modified: false
        }

        return JSON.stringify( wiz )
    }

    const buildWizJson = ( { gruppe, indicatorId, level, time, spaces } ) => {
        const wiz = {
            IndicatorCollection: [
                { KurznamePlus: '', Gruppe: String( gruppe ) }
            ],
            TimeCollection: [
                { indicator: String( indicatorId || gruppe ), group: String( gruppe ), level, time: String( time ), selected: true }
            ],
            SpaceCollection: spaces || BUNDESLAENDER,
            Title: 'Query',
            pageorder: 1,
            currentpage: 4,
            modified: true
        }

        return JSON.stringify( wiz )
    }

    const parseDoubleJson = ( response ) => {
        if( typeof response === 'string' ) {
            try {
                return JSON.parse( response )
            } catch( e ) {
                return response
            }
        }

        return response
    }

    return {
        listCategories: {
            preRequest: async ( { struct, payload } ) => {
                const body = buildMinimalWiz()
                struct['requestBody'] = body

                return { struct, payload }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        getIndicatorsByCategory: {
            preRequest: async ( { struct, payload } ) => {
                const { bereichsID, wiz } = payload
                const wizEscaped = ( wiz || buildMinimalWiz() ).replace( /"/g, '§' )
                const body = JSON.stringify( { bereichsID, wiz: wizEscaped } )
                struct['requestBody'] = body

                return { struct, payload }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        searchIndicators: {
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        getIndicatorInfo: {
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        getTimePeriods: {
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        getData: {
            preRequest: async ( { struct, payload } ) => {
                const { gruppe, indicatorId, level, time, spaces } = payload
                const _gruppe = gruppe || '12'
                const _level = level || 'BL'
                const _time = time || '2022'
                const _spaces = spaces || BUNDESLAENDER
                const body = buildWizJson( { gruppe: _gruppe, indicatorId: indicatorId || _gruppe, level: _level, time: _time, spaces: _spaces } )
                struct['requestBody'] = body

                return { struct, payload }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        },
        getRegions: {
            preRequest: async ( { struct, payload } ) => {
                const { gruppe, indicatorId, level, time, spaces } = payload || {}
                const _gruppe = gruppe || '12'
                const _level = level || 'BL'
                const _time = time || '2022'
                const _spaces = spaces || BUNDESLAENDER
                const body = buildWizJson( { gruppe: _gruppe, indicatorId: indicatorId || _gruppe, level: _level, time: _time, spaces: _spaces } )
                struct['requestBody'] = body

                return { struct, payload }
            },
            postRequest: async ( { response, struct, payload } ) => {
                const parsed = parseDoubleJson( response )

                return { response: parsed }
            }
        }
    }
}
