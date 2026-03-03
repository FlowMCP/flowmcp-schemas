export const main = {
    namespace: 'ckandatagov',
    name: 'CKAN data.gov',
    description: 'US Government open data portal (data.gov) powered by CKAN. Access 250K+ federal datasets, organizations, groups, and resources. Same CKAN API standard works with 15+ government portals worldwide.',
    version: '2.0.0',
    docs: ['https://docs.ckan.org/en/latest/api/index.html', 'https://catalog.data.gov/'],
    tags: ['government', 'opendata', 'datasets', 'usa', 'cacheTtlDaily'],
    root: 'https://catalog.data.gov/api/3',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchDatasets: {
            method: 'GET',
            path: '/action/package_search',
            description: 'Search datasets by keyword query with Solr syntax. Returns dataset metadata, resources, tags, and organization info. Supports sorting, filtering, and faceting.',
            parameters: [
                { position: { key: 'q', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(score desc)'] } },
                { position: { key: 'fq', value: '{{FILTER_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for education datasets', QUERY: 'education', ROWS: '3' },
                { _description: 'Search for climate data from EPA', QUERY: 'climate', FILTER_QUERY: 'organization:epa-gov', ROWS: '3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: {
                            type: 'object',
                            properties: {
                                count: { type: 'number' },
                                results: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        },
        getDataset: {
            method: 'GET',
            path: '/action/package_show',
            description: 'Get full metadata for a single dataset by its ID or name. Returns title, description, resources (download URLs), tags, organization, and license information.',
            parameters: [
                { position: { key: 'id', value: '{{DATASET_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get a specific dataset', DATASET_ID: 'food-environment-atlas' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'object' }
                    }
                }
            }
        },
        listOrganizations: {
            method: 'GET',
            path: '/action/organization_list',
            description: 'List all organizations (federal agencies) that publish datasets. Returns organization names or full details with dataset counts.',
            parameters: [
                { position: { key: 'all_fields', value: '{{ALL_FIELDS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'List first 5 organizations with details', ALL_FIELDS: 'true', LIMIT: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array' }
                    }
                }
            }
        },
        listTags: {
            method: 'GET',
            path: '/action/tag_list',
            description: 'List all dataset tags or search for tags by name. Tags describe dataset topics and can be used for filtering.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for health-related tags', QUERY: 'health' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array', items: { type: 'string' } }
                    }
                }
            }
        },
        listGroups: {
            method: 'GET',
            path: '/action/group_list',
            description: 'List all dataset groups (thematic collections). Groups organize datasets by topic area.',
            parameters: [
                { position: { key: 'all_fields', value: '{{ALL_FIELDS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)'] } }
            ],
            tests: [
                { _description: 'List all groups with details', ALL_FIELDS: 'true', LIMIT: '10' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array' }
                    }
                }
            }
        },
        searchResources: {
            method: 'GET',
            path: '/action/resource_search',
            description: 'Search for individual data resources (files, APIs) across all datasets. Filter by name, description, or format.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for CSV resources about population', QUERY: 'name:population', LIMIT: '3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: {
                            type: 'object',
                            properties: {
                                count: { type: 'number' },
                                results: { type: 'array', items: { type: 'object' } }
                            }
                        }
                    }
                }
            }
        }
    }
}
