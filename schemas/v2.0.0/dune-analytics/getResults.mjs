// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "duneAnalytics" -> "duneanalytics"

export const main = {
    namespace: 'duneanalytics',
    name: 'DuneAnalytics',
    description: 'Retrieve results from Dune Analytics queries — fetch the latest cached result for any public Dune query by its numeric query ID. Returns structured row data.',
    version: '2.0.0',
    docs: ['https://docs.dune.com/api-reference/overview/introduction'],
    tags: ['analytics', 'queries', 'data', 'cacheTtlDaily'],
    root: 'https://api.dune.com/api/v1',
    requiredServerParams: ['DUNE_API_KEY'],
    headers: {
        'X-Dune-API-Key': '{{DUNE_API_KEY}}'
    },
    routes: {
        getLatestResult: {
            method: 'GET',
            path: '/query/:query_id/results',
            description: 'Fetch latest result for a Dune query ID (returns CSV string). Required: query_id.',
            parameters: [
                { position: { key: 'query_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getLatestResult: {
        postRequest: async ( { response, struct, payload } ) => {
            struct.csv = payload?.content?.[0]?.text || "";
            return { response }
        }
    }
} )
