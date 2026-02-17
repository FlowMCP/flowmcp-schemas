// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'bicscan',
    name: 'BICScan API',
    description: 'Assess blockchain address risk scores and scan held assets via BICScan — get compliance risk ratings and token portfolio details for any wallet address.',
    version: '2.0.0',
    docs: ['https://api.bicscan.io/docs'],
    tags: ['security', 'risk', 'scanning', 'cacheTtlDaily'],
    root: 'https://api.bicscan.io/v1/scan',
    requiredServerParams: ['BICSCAN_API_KEY'],
    headers: {
        'X-Api-Key': '{{BICSCAN_API_KEY}}'
    },
    routes: {
        getRiskScore: {
            method: 'POST',
            path: '/',
            description: 'Retrieves a risk score from 0 (safe) to 100 (high risk) for a given crypto address or domain.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(3)'] } }
            ]
        },
        getAssets: {
            method: 'POST',
            path: '/',
            description: 'Fetches the asset holdings of a given crypto address using OFAC engine. Required: query, engines.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['min(3)'] } },
                { position: { key: 'engines', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['default(["ofac"])'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getRiskScore: {
        preRequest: async ( { struct, payload } ) => {
            const { query } = payload;
            struct.body = { query, sync: true, assets: false };
            return { struct }
        }
    },
    getAssets: {
        preRequest: async ( { struct, payload } ) => {
            const { query, engines } = payload;
            struct.body = { query, sync: true, assets: true, engines };
            return { struct }
        }
    }
} )
