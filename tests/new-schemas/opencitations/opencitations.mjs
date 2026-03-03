export const main = {
    namespace: 'opencitations',
    name: 'OpenCitations',
    description: 'Access open citation data from the OpenCitations Index. Query DOI-to-DOI citation links, reference lists, citation counts, and bibliographic metadata. All data is CC0 licensed.',
    version: '2.0.0',
    docs: ['https://opencitations.net/index/coci/api/v1'],
    tags: ['science', 'citations', 'openaccess', 'doi', 'research', 'cacheTtlDaily'],
    root: 'https://api.opencitations.net/index/v1',
    requiredServerParams: [],
    headers: {},
    routes: {
        getCitations: {
            method: 'GET',
            path: '/citations/:doi',
            description: 'Get all incoming citations for a DOI. Returns a list of citing works with open citation identifiers, creation dates, and timespan between publication and citation.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get citations for a Nature article', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'object', properties: { oci: { type: 'string' }, citing: { type: 'string' }, cited: { type: 'string' }, creation: { type: 'string' }, timespan: { type: 'string' } } }
                }
            },
        },
        getReferences: {
            method: 'GET',
            path: '/references/:doi',
            description: 'Get all outgoing references from a DOI. Returns a list of cited works with open citation identifiers, creation dates, and timespan.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get references for a Nature article', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'object', properties: { oci: { type: 'string' }, citing: { type: 'string' }, cited: { type: 'string' }, creation: { type: 'string' }, timespan: { type: 'string' } } }
                }
            },
        },
        getCitationCount: {
            method: 'GET',
            path: '/citation-count/:doi',
            description: 'Get the number of incoming citations for a DOI. Returns a single count value.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get citation count for a Nature article', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'object', properties: { count: { type: 'string' }, doi: { type: 'string' } } }
                }
            },
        },
        getReferenceCount: {
            method: 'GET',
            path: '/reference-count/:doi',
            description: 'Get the number of outgoing references from a DOI. Returns a single count value.',
            parameters: [
                { position: { key: 'doi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get reference count for a Nature article', doi: '10.1038/nature12373' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'object', properties: { count: { type: 'string' }, doi: { type: 'string' } } }
                }
            },
        },
        getCitation: {
            method: 'GET',
            path: '/citation/:oci',
            description: 'Get metadata for a specific citation by its Open Citation Identifier (OCI). Returns citing DOI, cited DOI, creation date, timespan, and self-citation flags.',
            parameters: [
                { position: { key: 'oci', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific citation by OCI', oci: '06101801781-06120344846' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: { type: 'object', properties: { oci: { type: 'string' }, citing: { type: 'string' }, cited: { type: 'string' }, creation: { type: 'string' }, timespan: { type: 'string' }, author_sc: { type: 'string' }, journal_sc: { type: 'string' } } }
                }
            },
        }
    }
}
