export const schema = {
    namespace: "berlinkriminalitaet",
    name: "Berlin Kriminalitaetsatlas API",
    description: "Berlin crime atlas data from the police crime statistics (PKS). Provides frequency rates (cases per 100,000 residents) and absolute case numbers for 17 crime categories across 12 districts and 143 district regions, covering 2015-2024.",
    docs: ["https://www.kriminalitaetsatlas.berlin.de/", "https://daten.berlin.de/datensaetze/kriminalitatsatlas-berlin"],
    tags: ["berlin", "crime", "opendata", "statistics", "police", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://www.kriminalitaetsatlas.berlin.de/K-Atlas",
    requiredServerParams: [],
    headers: {},
    routes: {
        getDistrictStatistics: {
            requestMethod: "GET",
            description: "Get crime statistics for all 12 Berlin districts (Bezirke). Returns frequency rates (HZ, cases per 100,000 residents) and absolute case numbers for 17 crime categories across 10 years (2015-2024). Data is a static JSON file from the Berlin Kriminalitaetsatlas InstantAtlas application.",
            route: "/bezirke/data.js",
            parameters: [],
            tests: [
                { _description: "Get all district-level crime statistics" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatDistrictStatistics" }
            ]
        },
        getRegionStatistics: {
            requestMethod: "GET",
            description: "Get crime statistics for all 143 Berlin district regions (Bezirksregionen). Returns frequency rates (HZ, cases per 100,000 residents) and absolute case numbers for 17 crime categories across 10 years (2015-2024). Data is a static JSON file from the Berlin Kriminalitaetsatlas InstantAtlas application.",
            route: "/data.js",
            parameters: [],
            tests: [
                { _description: "Get all region-level crime statistics" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatRegionStatistics" }
            ]
        }
    },
    handlers: {
        formatDistrictStatistics: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.geographies ) { return { struct, payload } }

            const { features, themes } = raw.geographies[0]
            const indicators = themes[0]?.indicators || []

            const categories = new Map()
            indicators
                .forEach( ( indicator ) => {
                    const { name, date, values, associates } = indicator
                    const year = parseInt( date.replace( 'HZ ', '' ), 10 )
                    const cases = associates?.[0]?.values || []

                    if( !categories.has( name ) ) {
                        categories.set( name, [] )
                    }

                    const yearData = features
                        .map( ( feature, index ) => {
                            const result = {
                                id: feature.id,
                                name: feature.name,
                                frequencyRate: values[index] ?? null,
                                cases: cases[index] ?? null
                            }

                            return result
                        } )

                    categories.get( name ).push( { year, districts: yearData } )
                } )

            const formatted = [ ...categories.entries() ]
                .map( ( [ category, years ] ) => {
                    const result = { category, years }

                    return result
                } )

            struct.data = {
                level: 'district',
                districtCount: features.length,
                categoryCount: categories.size,
                yearRange: '2015-2024',
                categories: formatted
            }

            return { struct, payload }
        },
        formatRegionStatistics: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.geographies ) { return { struct, payload } }

            const { features, themes } = raw.geographies[0]
            const indicators = themes[0]?.indicators || []

            const categories = new Map()
            indicators
                .forEach( ( indicator ) => {
                    const { name, date, values, associates } = indicator
                    const year = parseInt( date.replace( 'HZ ', '' ), 10 )
                    const cases = associates?.[0]?.values || []

                    if( !categories.has( name ) ) {
                        categories.set( name, [] )
                    }

                    const yearData = features
                        .map( ( feature, index ) => {
                            const district = feature.filters?.[0]?.name || null
                            const result = {
                                id: feature.id,
                                name: feature.name,
                                district,
                                frequencyRate: values[index] ?? null,
                                cases: cases[index] ?? null
                            }

                            return result
                        } )

                    categories.get( name ).push( { year, regions: yearData } )
                } )

            const formatted = [ ...categories.entries() ]
                .map( ( [ category, years ] ) => {
                    const result = { category, years }

                    return result
                } )

            struct.data = {
                level: 'region',
                regionCount: features.length,
                categoryCount: categories.size,
                yearRange: '2015-2024',
                categories: formatted
            }

            return { struct, payload }
        }
    }
}
