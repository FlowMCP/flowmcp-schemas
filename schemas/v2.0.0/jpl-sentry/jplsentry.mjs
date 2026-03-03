export const main = {
    namespace: 'jplsentry',
    name: 'JPL Sentry',
    description: 'Access NASA JPL Sentry system for near-Earth object impact risk assessment — retrieve impact probability data, Palermo scale ratings, and virtual impactor details.',
    version: '2.0.0',
    docs: ['https://ssd-api.jpl.nasa.gov/doc/sentry.html'],
    tags: ['nasa', 'space', 'asteroid', 'impact', 'neo', 'science', 'cacheTtlDaily'],
    root: 'https://ssd-api.jpl.nasa.gov',
    requiredServerParams: [],
    headers: {},
    routes: {
        getSentryObject: {
            method: 'GET',
            path: '/sentry.api',
            description: 'Retrieve Sentry impact risk data for a specific near-Earth object by designation.',
            parameters: [
                { position: { key: 'des', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get impact risk data for Apophis (99942)', des: '99942' },
                { _description: 'Get impact risk data for 2000 SG344', des: '2000 SG344' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        signature: { type: 'object', description: 'API version and source info' },
                        summary: { type: 'object', description: 'Summary risk data for the object' },
                        data: { type: 'array', description: 'Individual virtual impactor records' }
                    }
                }
            }
        },
        getSentryObjectBySpk: {
            method: 'GET',
            path: '/sentry.api',
            description: 'Retrieve Sentry impact risk data for a specific near-Earth object by SPK-ID.',
            parameters: [
                { position: { key: 'spk', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get impact risk data for Apophis by SPK-ID', spk: 2099942 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        signature: { type: 'object', description: 'API version and source info' },
                        summary: { type: 'object', description: 'Summary risk data for the object' },
                        data: { type: 'array', description: 'Individual virtual impactor records' }
                    }
                }
            }
        },
        getSentrySummary: {
            method: 'GET',
            path: '/sentry.api',
            description: 'Retrieve summary data for all objects in the Sentry impact risk catalog, optionally filtered by magnitude, Palermo scale, impact probability, or observation recency.',
            parameters: [
                { position: { key: 'h-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(-10)', 'max(100)'] } },
                { position: { key: 'ps-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(-20)', 'max(20)'] } },
                { position: { key: 'ip-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'days', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all Sentry objects summary' },
                { _description: 'Get Sentry objects with high impact probability', 'ip-min': 1e-3 },
                { _description: 'Get Sentry objects with Palermo scale >= -2', 'ps-min': -2 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        signature: { type: 'object', description: 'API version and source info' },
                        count: { type: 'string', description: 'Number of objects returned' },
                        data: { type: 'array', description: 'Array of Sentry summary records' }
                    }
                }
            }
        },
        getVirtualImpactors: {
            method: 'GET',
            path: '/sentry.api',
            description: 'Retrieve virtual impactor data for all Sentry objects, optionally filtered by magnitude, Palermo scale, or impact probability.',
            parameters: [
                { position: { key: 'all', value: '1', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'h-max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(-10)', 'max(100)'] } },
                { position: { key: 'ps-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'min(-20)', 'max(20)'] } },
                { position: { key: 'ip-min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all virtual impactors with high impact probability', 'ip-min': 1e-3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        signature: { type: 'object', description: 'API version and source info' },
                        count: { type: 'string', description: 'Number of virtual impactors returned' },
                        data: { type: 'array', description: 'Array of virtual impactor records with date, energy, and probability' }
                    }
                }
            }
        },
        getRemovedObjects: {
            method: 'GET',
            path: '/sentry.api',
            description: 'Retrieve the list of objects that have been removed from the Sentry impact risk catalog.',
            parameters: [
                { position: { key: 'removed', value: '1', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all removed Sentry objects' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        signature: { type: 'object', description: 'API version and source info' },
                        count: { type: 'string', description: 'Number of removed objects' },
                        data: { type: 'array', description: 'Array of removed object records with designation and removal date' }
                    }
                }
            }
        }
    }
}
