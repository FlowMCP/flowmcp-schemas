// Lebensmittelwarnungen API — Food & Product Safety Warnings (BVL)
// Requires API key (documented at github.com/bundesAPI/lebensmittelwarnung-api)
// Source: lebensmittelwarnung.de

export const main = {
    namespace: 'lebensmittelwarnungen',
    name: 'Lebensmittelwarnungen (Food Safety Warnings)',
    description: 'Query German food and product safety warnings from BVL (Bundesamt fuer Verbraucherschutz und Lebensmittelsicherheit) — food recalls, contamination alerts, and product safety notices across all 16 federal states.',
    version: '2.0.0',
    docs: ['https://lebensmittelwarnung.api.bund.dev/', 'https://github.com/bundesAPI/lebensmittelwarnung-api'],
    tags: ['government', 'food', 'safety', 'consumer', 'germany', 'opendata', 'cacheTtlFrequent'],
    root: 'https://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api',
    requiredServerParams: ['LEBENSMITTELWARNUNGEN_API_KEY'],
    headers: {
        'Authorization': 'baystmuv-vi-1.0 os=ios, key={{LEBENSMITTELWARNUNGEN_API_KEY}}'
    },
    routes: {
        getWarnings: {
            method: 'POST',
            path: '/warnings/merged',
            description: 'Get merged food and product safety warnings. Supports pagination via start offset and row count. Returns warning title, category, affected states, product details, and image URLs.',
            parameters: [
                { position: { key: 'rows', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(500)', 'default(50)'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get latest 50 food warnings', rows: 50, start: 0 },
                { _description: 'Get next page of warnings', rows: 50, start: 50 }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getWarnings: {
        preRequest: async ( { struct, payload } ) => {
            const { rows, start } = payload

            struct.body = {
                food: {
                    rows: Number( rows ),
                    sort: 'publishedDate desc, title asc',
                    start: Number( start ),
                    fq: []
                },
                products: {
                    rows: Number( rows ),
                    sort: 'publishedDate desc',
                    start: Number( start ),
                    fq: []
                }
            }

            return { struct }
        }
    }
} )
