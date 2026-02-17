// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'swaggerhub',
    name: 'SwaggerHub API',
    description: 'FlowMCP interface for SwaggerHub registry API, supporting search, metadata listing, and Swagger definition retrieval.',
    version: '2.0.0',
    docs: ['https://swaggerhub.com/api/swagger-hub/registry-api/1.0.0'],
    tags: ['production', 'api', 'documentation', 'registry', 'cacheTtlDaily'],
    root: 'https://api.swaggerhub.com/apis',
    routes: {
        searchApis: {
            method: 'GET',
            path: '/',
            description: 'Searches SwaggerHub public APIs using query parameters like `query`, `state`, `tag`, etc.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'state', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(PUBLISHED,UNPUBLISHED)', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        },
        listApiVersions: {
            method: 'GET',
            path: '/:owner/:api',
            description: 'Returns metadata for all versions of a specified API via swaggerhub — query by owner and api.',
            parameters: [
                { position: { key: 'owner', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'api', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}
