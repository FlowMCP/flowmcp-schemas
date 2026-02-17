// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'pflanzenschutzmittel',
    name: 'BVL Pflanzenschutzmittel API',
    description: 'German Federal Office of Consumer Protection (BVL) pesticide registration database with approved products, active ingredients, companies, and usage restrictions',
    version: '2.0.0',
    docs: ['https://pflanzenschutzmittelzulassung.api.bund.dev/'],
    tags: ['agriculture', 'germany', 'pesticides', 'regulation', 'cacheTtlDaily'],
    root: 'https://psm-api.bvl.bund.de/ords/psm/api-v1',
    routes: {
        getProducts: {
            method: 'GET',
            path: '/mittel/',
            description: 'Get approved pesticide products with registration number, name, formulation type, and approval dates. Use kennr parameter to look up a specific product.',
            parameters: [
                { position: { key: 'kennr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getActiveIngredients: {
            method: 'GET',
            path: '/wirkstoff/',
            description: 'Get all active ingredients (Wirkstoffe) used in pesticides with approval status and English names.',
            parameters: [
                { position: { key: 'wirknr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getCompanies: {
            method: 'GET',
            path: '/adresse/',
            description: 'Get pesticide distribution companies, applicants, and importers with addresses and contact details.',
            parameters: [
                { position: { key: 'adresse_nr', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        getRestrictions: {
            method: 'GET',
            path: '/auflagen/',
            description: 'Get usage restrictions and conditions (Auflagen) for approved pesticide products.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getProducts: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { response }}

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

            response = {
            totalProducts: raw.items.length,
            productCount: products.length,
            products
            }

            return { response }
        }
    },
    getActiveIngredients: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { response }}

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

            response = {
            totalIngredients: raw.items.length,
            ingredientCount: ingredients.length,
            ingredients
            }

            return { response }
        }
    },
    getCompanies: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { response }}

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

            response = {
            totalCompanies: raw.items.length,
            companyCount: companies.length,
            companies
            }

            return { response }
        }
    },
    getRestrictions: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.items ) { return { response }}

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

            response = {
            totalRestrictions: raw.items.length,
            restrictionCount: restrictions.length,
            restrictions
            }

            return { response }
        }
    }
} )
