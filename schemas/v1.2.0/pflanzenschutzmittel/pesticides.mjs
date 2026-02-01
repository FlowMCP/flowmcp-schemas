export const schema = {
    namespace: "pflanzenschutzmittel",
    name: "BVL Pflanzenschutzmittel API",
    description: "German Federal Office of Consumer Protection (BVL) pesticide registration database with approved products, active ingredients, companies, and usage restrictions",
    docs: ["https://pflanzenschutzmittelzulassung.api.bund.dev/"],
    tags: ["agriculture", "germany", "pesticides", "regulation"],
    flowMCP: "1.2.0",
    root: "https://psm-api.bvl.bund.de/ords/psm/api-v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getProducts: {
            requestMethod: "GET",
            description: "Get approved pesticide products with registration number, name, formulation type, and approval dates. Use kennr parameter to look up a specific product.",
            route: "/mittel/",
            parameters: [
                { position: { key: "kennr", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all approved pesticide products" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatProducts" }
            ]
        },
        getActiveIngredients: {
            requestMethod: "GET",
            description: "Get all active ingredients (Wirkstoffe) used in pesticides with approval status and English names.",
            route: "/wirkstoff/",
            parameters: [
                { position: { key: "wirknr", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all active ingredients" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatIngredients" }
            ]
        },
        getCompanies: {
            requestMethod: "GET",
            description: "Get pesticide distribution companies, applicants, and importers with addresses and contact details.",
            route: "/adresse/",
            parameters: [
                { position: { key: "adresse_nr", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all pesticide companies" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatCompanies" }
            ]
        },
        getRestrictions: {
            requestMethod: "GET",
            description: "Get usage restrictions and conditions (Auflagen) for approved pesticide products.",
            route: "/auflagen/",
            parameters: [],
            tests: [
                { _description: "Get all pesticide restrictions" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatRestrictions" }
            ]
        }
    },
    handlers: {
        formatProducts: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const products = raw.items
                .slice( 0, 200 )
                .map( ( item ) => {
                    const result = {
                        registrationNumber: item.kennr || null,
                        name: item.mittelname || null,
                        formulationType: item.formulierung_art || null,
                        approvedSince: item.zul_erstmalig_am || null,
                        approvalEnd: item.zul_ende || null,
                        lowRisk: item.mittel_mit_geringem_risiko || null
                    }

                    return result
                } )

            struct.data = {
                totalProducts: raw.items.length,
                productCount: products.length,
                products
            }

            return { struct, payload }
        },
        formatIngredients: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const ingredients = raw.items
                .slice( 0, 200 )
                .map( ( item ) => {
                    const result = {
                        id: item.wirknr || null,
                        name: item.wirkstoffname || null,
                        nameEn: item.wirkstoffname_en || null,
                        category: item.kategorie || null,
                        approved: item.genehmigt || null
                    }

                    return result
                } )

            struct.data = {
                totalIngredients: raw.items.length,
                ingredientCount: ingredients.length,
                ingredients
            }

            return { struct, payload }
        },
        formatCompanies: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const companies = raw.items
                .slice( 0, 200 )
                .map( ( item ) => {
                    const result = {
                        id: item.adresse_nr || null,
                        company: item.firma || null,
                        companyName: item.firmenname || null,
                        country: item.land || null,
                        address: item.anschrift_5 || null,
                        city: item.anschrift_6 || null
                    }

                    return result
                } )

            struct.data = {
                totalCompanies: raw.items.length,
                companyCount: companies.length,
                companies
            }

            return { struct, payload }
        },
        formatRestrictions: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { struct, payload } }

            const restrictions = raw.items
                .slice( 0, 200 )
                .map( ( item ) => {
                    const result = {
                        restriction: item.auflage || null,
                        level: item.ebene || null,
                        usageCondition: item.anwendbest || null,
                        id: item.auflagenr || null
                    }

                    return result
                } )

            struct.data = {
                totalRestrictions: raw.items.length,
                restrictionCount: restrictions.length,
                restrictions
            }

            return { struct, payload }
        }
    }
}
